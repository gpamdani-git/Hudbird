import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Container,
  Grid,
  Heading,
  Input,
  Section,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Text,
  Textarea,
} from "@hudbird/ui";
import {
  applicationBlockLabels,
  ApplicationPageRenderer,
  applicationUiCatalog,
  createHudbirdStudioCode,
  createHudbirdStudioConfig,
  createHudbirdStudioRecipe,
  getApplicationCategory,
  getMarketingExampleDefinition,
  getSharedPageCategory,
  marketingExamplesCatalog,
  marketingExtendedBlockLabels,
  MarketingExamplePageRenderer,
  moveStudioBlock,
  parseHudbirdStudioConfig,
  pilotBrands,
  sharedBlockLabels,
  SharedPageRenderer,
  sharedPagesCatalog,
  switchStudioApplicationCategory,
  switchStudioMarketingExample,
  switchStudioSharedCategory,
} from "@hudbird/marketing";
import type {
  ApplicationExampleCategorySlug,
  HudbirdBlueprintDomain,
  HudbirdStudioBuilderConfig,
  MarketingExampleCategorySlug,
  SharedPageCategorySlug,
} from "@hudbird/schemas";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Code2,
  Copy,
  FileJson,
  Layers,
  LayoutDashboard,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { DocHeader } from "../components/DocHeader";

export default function StudioBuilderDoc() {
  const [searchParams] = useSearchParams();
  const [config, setConfig] = useState<HudbirdStudioBuilderConfig>(() =>
    createHudbirdStudioConfig()
  );
  const [copiedTarget, setCopiedTarget] = useState<"code" | "recipe" | null>(null);
  const [recipeInput, setRecipeInput] = useState("");
  const [importWarnings, setImportWarnings] = useState<string[]>([]);

  useEffect(() => {
    const domainParam = searchParams.get("domain") as HudbirdBlueprintDomain | null;
    const categoryParam = searchParams.get("category");
    const variantParam = searchParams.get("variant") ?? undefined;
    const exampleParam = searchParams.get("example") as MarketingExampleCategorySlug | null;

    if (domainParam === "application-ui" && categoryParam) {
      setConfig((prev) =>
        switchStudioApplicationCategory(
          prev,
          categoryParam as ApplicationExampleCategorySlug,
          variantParam
        )
      );
    } else if (domainParam === "shared-pages" && categoryParam) {
      setConfig((prev) =>
        switchStudioSharedCategory(prev, categoryParam as SharedPageCategorySlug, variantParam)
      );
    } else if (domainParam === "marketing") {
      setConfig((prev) => switchStudioMarketingExample(prev, exampleParam ?? "landing-pages"));
    }
  }, [searchParams]);

  const generatedCode = useMemo(() => createHudbirdStudioCode(config), [config]);
  const generatedRecipe = useMemo(
    () => JSON.stringify(createHudbirdStudioRecipe(config), null, 2),
    [config]
  );

  const handleCopy = async (type: "code" | "recipe", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedTarget(type);
      setTimeout(() => setCopiedTarget(null), 1800);
    } catch {
      setCopiedTarget(type);
    }
  };

  const activeAppCategory = getApplicationCategory(config.application.category);
  const activeSharedCategory = getSharedPageCategory(config.shared.category);
  const activeMarketingExample = getMarketingExampleDefinition(config.marketing.exampleSlug);

  return (
    <Container className="max-w-7xl space-y-10 py-10">
      <DocHeader
        title="Hudbird UI Multi-Domain Studio Page Builder"
        description="Assemble, reorder, customize, and export clean-room React blueprints across all 3 Untitled UI React architectural domains: 1. Application UI Examples, 2. Shared Page Examples, and 3. Marketing Components & Examples."
        breadcrumbs={[
          { label: "Docs", href: "/getting-started" },
          { label: "Studio Page Builder" },
        ]}
      />

      <Section id="studio-domain-selector" className="space-y-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <button
            type="button"
            data-studio-domain="application-ui"
            onClick={() => setConfig((prev) => ({ ...prev, domain: "application-ui" }))}
            className={`flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
              config.domain === "application-ui"
                ? "border-indigo-500 bg-indigo-500/[0.08] ring-1 ring-indigo-500/30"
                : "border-zinc-200/80 bg-white hover:border-zinc-300 dark:border-white/[0.08] dark:bg-[#141418]"
            }`}
          >
            <LayoutDashboard className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-zinc-950 dark:text-white">
                  1. Application UI Examples
                </span>
                <Badge size="sm" variant="flat" color="primary">
                  6 Categories
                </Badge>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Dashboards 01/02, Settings 01/02, and Informational 01/02 shells.
              </p>
            </div>
          </button>

          <button
            type="button"
            data-studio-domain="shared-pages"
            onClick={() => setConfig((prev) => ({ ...prev, domain: "shared-pages" }))}
            className={`flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
              config.domain === "shared-pages"
                ? "border-indigo-500 bg-indigo-500/[0.08] ring-1 ring-indigo-500/30"
                : "border-zinc-200/80 bg-white hover:border-zinc-300 dark:border-white/[0.08] dark:bg-[#141418]"
            }`}
          >
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-zinc-950 dark:text-white">
                  2. Shared Page Examples
                </span>
                <Badge size="sm" variant="flat" color="primary">
                  6 Categories
                </Badge>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Log in, Sign up, InputOTP Verification, Recovery, 404, & Email Templates.
              </p>
            </div>
          </button>

          <button
            type="button"
            data-studio-domain="marketing"
            onClick={() => setConfig((prev) => ({ ...prev, domain: "marketing" }))}
            className={`flex items-start gap-3.5 rounded-2xl border p-4 text-left transition-all ${
              config.domain === "marketing"
                ? "border-indigo-500 bg-indigo-500/[0.08] ring-1 ring-indigo-500/30"
                : "border-zinc-200/80 bg-white hover:border-zinc-300 dark:border-white/[0.08] dark:bg-[#141418]"
            }`}
          >
            <Layers className="mt-0.5 h-5 w-5 shrink-0 text-indigo-500" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-zinc-950 dark:text-white">
                  3. Marketing & Examples
                </span>
                <Badge size="sm" variant="flat" color="primary">
                  10 Templates
                </Badge>
              </div>
              <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                Landing, Pricing, About, Contact, Blog, Article, FAQ, Team, Legal, & 404.
              </p>
            </div>
          </button>
        </div>
      </Section>

      <Section id="studio-workspace" className="space-y-6">
        <Grid cols={1} className="gap-6 lg:grid-cols-12">
          {/* Left Controls Rail */}
          <div className="space-y-5 lg:col-span-4">
            <Card className="border border-zinc-200/80 dark:border-white/[0.08]">
              <CardHeader className="border-b border-zinc-200/70 p-4 dark:border-white/[0.08]">
                <Heading as="h4" className="text-sm font-bold">
                  Brand & Tenant Identity
                </Heading>
              </CardHeader>
              <CardBody className="space-y-3 p-4">
                <div className="flex flex-wrap gap-1.5">
                  {pilotBrands.map((preset) => (
                    <Button
                      key={preset.id}
                      size="sm"
                      variant={config.brand.id === preset.id ? "solid" : "bordered"}
                      color={config.brand.id === preset.id ? "primary" : "default"}
                      onClick={() =>
                        setConfig((prev) => ({
                          ...prev,
                          brand: { ...preset },
                        }))
                      }
                    >
                      {preset.name}
                    </Button>
                  ))}
                </div>
                <Input
                  size="sm"
                  label="Brand Name"
                  value={config.brand.name}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      brand: { ...prev.brand, name: e.target.value },
                    }))
                  }
                />
                <Input
                  size="sm"
                  label="Tenant Slug / Domain Prefix"
                  value={config.brand.id}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      brand: { ...prev.brand, id: e.target.value },
                    }))
                  }
                />
              </CardBody>
            </Card>

            {/* Domain-Specific Category & Slot Controls */}
            {config.domain === "application-ui" && (
              <Card className="border border-zinc-200/80 dark:border-white/[0.08]">
                <CardHeader className="flex items-center justify-between border-b border-zinc-200/70 p-4 dark:border-white/[0.08]">
                  <Heading as="h4" className="text-sm font-bold">
                    Application UI Blueprint & Slots
                  </Heading>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      setConfig((prev) =>
                        switchStudioApplicationCategory(prev, prev.application.category)
                      )
                    }
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </Button>
                </CardHeader>
                <CardBody className="space-y-4 p-4">
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                      Select Route Category
                    </span>
                    <div className="grid grid-cols-1 gap-1.5">
                      {applicationUiCatalog.map((cat) => (
                        <button
                          key={cat.slug}
                          type="button"
                          onClick={() =>
                            setConfig((prev) => switchStudioApplicationCategory(prev, cat.slug))
                          }
                          className={`flex items-center justify-between rounded-xl border px-3 py-2 text-left text-xs font-medium transition-all ${
                            config.application.category === cat.slug
                              ? "border-indigo-500 bg-indigo-500/10 font-bold text-indigo-600 dark:text-indigo-300"
                              : "border-zinc-200/70 hover:bg-zinc-100/70 dark:border-white/[0.08] dark:hover:bg-white/[0.04]"
                          }`}
                        >
                          <span>{cat.title}</span>
                          <Badge size="sm" variant="flat" color="primary">
                            {cat.navigationStyle}
                          </Badge>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                      Preset Blueprint Variant
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeAppCategory.variants.map((v) => (
                        <Button
                          key={v.id}
                          size="sm"
                          variant={config.application.variantId === v.id ? "solid" : "bordered"}
                          color={config.application.variantId === v.id ? "primary" : "default"}
                          onClick={() =>
                            setConfig((prev) =>
                              switchStudioApplicationCategory(prev, prev.application.category, v.id)
                            )
                          }
                        >
                          {v.name}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                      Composable Slot Stack (
                      {config.application.blocks.filter((b) => b.enabled).length} active)
                    </span>
                    {config.application.blocks.map((block, index) => {
                      const meta = applicationBlockLabels[block.type];
                      return (
                        <div
                          key={`${block.type}-${index}`}
                          className="space-y-2 rounded-xl border border-zinc-200/80 p-3 dark:border-white/[0.08]"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="text-xs font-bold text-zinc-900 dark:text-white">
                                {meta.label}
                              </p>
                              <p className="font-mono text-[10px] text-zinc-500">{block.type}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={index === 0}
                                onClick={() =>
                                  setConfig((prev) => ({
                                    ...prev,
                                    application: {
                                      ...prev.application,
                                      blocks: moveStudioBlock(prev.application.blocks, index, "up"),
                                    },
                                  }))
                                }
                              >
                                <ArrowUp className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={index === config.application.blocks.length - 1}
                                onClick={() =>
                                  setConfig((prev) => ({
                                    ...prev,
                                    application: {
                                      ...prev.application,
                                      blocks: moveStudioBlock(
                                        prev.application.blocks,
                                        index,
                                        "down"
                                      ),
                                    },
                                  }))
                                }
                              >
                                <ArrowDown className="h-3.5 w-3.5" />
                              </Button>
                              <Switch
                                size="sm"
                                checked={block.enabled}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  setConfig((prev) => ({
                                    ...prev,
                                    application: {
                                      ...prev.application,
                                      blocks: prev.application.blocks.map((item, idx) =>
                                        idx === index ? { ...item, enabled: checked } : item
                                      ),
                                    },
                                  }));
                                }}
                              />
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {meta.variants.map((v) => (
                              <button
                                key={v.id}
                                type="button"
                                onClick={() =>
                                  setConfig((prev) => ({
                                    ...prev,
                                    application: {
                                      ...prev.application,
                                      blocks: prev.application.blocks.map((item, idx) =>
                                        idx === index
                                          ? ({ ...item, variant: v.id } as typeof item)
                                          : item
                                      ),
                                    },
                                  }))
                                }
                                className={`rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${
                                  block.variant === v.id
                                    ? "bg-indigo-600 text-white"
                                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-white/[0.06] dark:text-zinc-300"
                                }`}
                              >
                                {v.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            )}

            {config.domain === "shared-pages" && (
              <Card className="border border-zinc-200/80 dark:border-white/[0.08]">
                <CardHeader className="flex items-center justify-between border-b border-zinc-200/70 p-4 dark:border-white/[0.08]">
                  <Heading as="h4" className="text-sm font-bold">
                    Shared Page Blueprint & Slots
                  </Heading>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      setConfig((prev) => switchStudioSharedCategory(prev, prev.shared.category))
                    }
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </Button>
                </CardHeader>
                <CardBody className="space-y-4 p-4">
                  <div className="grid grid-cols-2 gap-1.5">
                    {sharedPagesCatalog.map((cat) => (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() =>
                          setConfig((prev) => switchStudioSharedCategory(prev, cat.slug))
                        }
                        className={`rounded-xl border px-3 py-2 text-left text-xs font-medium transition-all ${
                          config.shared.category === cat.slug
                            ? "border-indigo-500 bg-indigo-500/10 font-bold text-indigo-600 dark:text-indigo-300"
                            : "border-zinc-200/70 hover:bg-zinc-100/70 dark:border-white/[0.08]"
                        }`}
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {activeSharedCategory.variants.map((v) => (
                      <Button
                        key={v.id}
                        size="sm"
                        variant={config.shared.variantId === v.id ? "solid" : "bordered"}
                        color={config.shared.variantId === v.id ? "primary" : "default"}
                        onClick={() =>
                          setConfig((prev) =>
                            switchStudioSharedCategory(prev, prev.shared.category, v.id)
                          )
                        }
                      >
                        {v.name}
                      </Button>
                    ))}
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {config.shared.blocks.map((block, index) => {
                      const meta = sharedBlockLabels[block.type];
                      return (
                        <div
                          key={`${block.type}-${index}`}
                          className="space-y-2 rounded-xl border border-zinc-200/80 p-3 dark:border-white/[0.08]"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="text-xs font-bold text-zinc-900 dark:text-white">
                                {meta.label}
                              </p>
                              <p className="font-mono text-[10px] text-zinc-500">{block.type}</p>
                            </div>
                            <Switch
                              size="sm"
                              checked={block.enabled}
                              onChange={(e) => {
                                const checked = e.target.checked;
                                setConfig((prev) => ({
                                  ...prev,
                                  shared: {
                                    ...prev.shared,
                                    blocks: prev.shared.blocks.map((item, idx) =>
                                      idx === index ? { ...item, enabled: checked } : item
                                    ),
                                  },
                                }));
                              }}
                            />
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {meta.variants.map((v) => (
                              <button
                                key={v.id}
                                type="button"
                                onClick={() =>
                                  setConfig((prev) => ({
                                    ...prev,
                                    shared: {
                                      ...prev.shared,
                                      blocks: prev.shared.blocks.map((item, idx) =>
                                        idx === index
                                          ? ({
                                              ...item,
                                              variant: v.id,
                                              enabled: true,
                                            } as typeof item)
                                          : item
                                      ),
                                    },
                                  }))
                                }
                                className={`rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${
                                  block.variant === v.id
                                    ? "bg-indigo-600 text-white"
                                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-white/[0.06] dark:text-zinc-300"
                                }`}
                              >
                                {v.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            )}

            {config.domain === "marketing" && (
              <Card className="border border-zinc-200/80 dark:border-white/[0.08]">
                <CardHeader className="flex items-center justify-between border-b border-zinc-200/70 p-4 dark:border-white/[0.08]">
                  <Heading as="h4" className="text-sm font-bold">
                    Marketing Example & Section Stack
                  </Heading>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() =>
                      setConfig((prev) =>
                        switchStudioMarketingExample(prev, prev.marketing.exampleSlug)
                      )
                    }
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                  </Button>
                </CardHeader>
                <CardBody className="space-y-4 p-4">
                  <div className="grid grid-cols-2 gap-1.5">
                    {marketingExamplesCatalog.map((ex) => (
                      <button
                        key={ex.slug}
                        type="button"
                        onClick={() =>
                          setConfig((prev) => switchStudioMarketingExample(prev, ex.slug))
                        }
                        className={`rounded-xl border px-3 py-2 text-left text-xs font-medium transition-all ${
                          config.marketing.exampleSlug === ex.slug
                            ? "border-indigo-500 bg-indigo-500/10 font-bold text-indigo-600 dark:text-indigo-300"
                            : "border-zinc-200/70 hover:bg-zinc-100/70 dark:border-white/[0.08]"
                        }`}
                      >
                        {ex.title}
                      </button>
                    ))}
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                      {activeMarketingExample.title} Section Stack
                    </span>
                    {config.marketing.extendedBlocks.map((block, index) => {
                      const meta = marketingExtendedBlockLabels[block.type];
                      return (
                        <div
                          key={`${block.type}-${index}`}
                          className="space-y-2 rounded-xl border border-zinc-200/80 p-3 dark:border-white/[0.08]"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div>
                              <p className="text-xs font-bold text-zinc-900 dark:text-white">
                                {meta?.label ?? block.type}
                              </p>
                              <p className="font-mono text-[10px] text-zinc-500">{block.type}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={index === 0}
                                onClick={() =>
                                  setConfig((prev) => ({
                                    ...prev,
                                    marketing: {
                                      ...prev.marketing,
                                      extendedBlocks: moveStudioBlock(
                                        prev.marketing.extendedBlocks,
                                        index,
                                        "up"
                                      ),
                                    },
                                  }))
                                }
                              >
                                <ArrowUp className="h-3.5 w-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={index === config.marketing.extendedBlocks.length - 1}
                                onClick={() =>
                                  setConfig((prev) => ({
                                    ...prev,
                                    marketing: {
                                      ...prev.marketing,
                                      extendedBlocks: moveStudioBlock(
                                        prev.marketing.extendedBlocks,
                                        index,
                                        "down"
                                      ),
                                    },
                                  }))
                                }
                              >
                                <ArrowDown className="h-3.5 w-3.5" />
                              </Button>
                              <Switch
                                size="sm"
                                checked={block.enabled}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  setConfig((prev) => ({
                                    ...prev,
                                    marketing: {
                                      ...prev.marketing,
                                      extendedBlocks: prev.marketing.extendedBlocks.map(
                                        (item, idx) =>
                                          idx === index ? { ...item, enabled: checked } : item
                                      ),
                                    },
                                  }));
                                }}
                              />
                            </div>
                          </div>

                          {meta?.variants && (
                            <div className="flex flex-wrap gap-1">
                              {meta.variants.map((v) => (
                                <button
                                  key={v.id}
                                  type="button"
                                  onClick={() =>
                                    setConfig((prev) => ({
                                      ...prev,
                                      marketing: {
                                        ...prev.marketing,
                                        extendedBlocks: prev.marketing.extendedBlocks.map(
                                          (item, idx) =>
                                            idx === index ? { ...item, variant: v.id } : item
                                        ),
                                      },
                                    }))
                                  }
                                  className={`rounded-lg px-2 py-1 text-[11px] font-medium transition-all ${
                                    block.variant === v.id
                                      ? "bg-indigo-600 text-white"
                                      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-white/[0.06] dark:text-zinc-300"
                                  }`}
                                >
                                  {v.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            )}
          </div>

          {/* Right Live Preview & Code/Recipe Export */}
          <div className="space-y-6 lg:col-span-8">
            <Card className="border border-zinc-200/80 dark:border-white/[0.08]">
              <CardHeader className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/70 p-4 dark:border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-indigo-500" />
                  <Heading as="h3" className="text-base font-bold">
                    Live Blueprint Canvas ({config.domain})
                  </Heading>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    size="sm"
                    variant="bordered"
                    onClick={() => handleCopy("recipe", generatedRecipe)}
                  >
                    {copiedTarget === "recipe" ? (
                      <>
                        <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-500" />
                        Copied Recipe JSON
                      </>
                    ) : (
                      <>
                        <FileJson className="mr-1.5 h-3.5 w-3.5" />
                        Copy Recipe JSON
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="solid"
                    color="primary"
                    onClick={() => handleCopy("code", generatedCode)}
                  >
                    {copiedTarget === "code" ? (
                      <>
                        <Check className="mr-1.5 h-3.5 w-3.5" />
                        Copied App.tsx
                      </>
                    ) : (
                      <>
                        <Copy className="mr-1.5 h-3.5 w-3.5" />
                        Copy React App.tsx
                      </>
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardBody className="p-4">
                <Tabs defaultValue="canvas" variant="solid" size="sm">
                  <TabList>
                    <Tab tabKey="canvas">Interactive Blueprint Preview</Tab>
                    <Tab tabKey="tsx">
                      <span className="inline-flex items-center gap-1">
                        <Code2 className="h-3.5 w-3.5" /> React App.tsx Export
                      </span>
                    </Tab>
                    <Tab tabKey="recipe">
                      <span className="inline-flex items-center gap-1">
                        <FileJson className="h-3.5 w-3.5" /> Studio Recipe JSON
                      </span>
                    </Tab>
                  </TabList>

                  <TabPanel tabKey="canvas" className="pt-4">
                    {config.domain === "application-ui" && (
                      <ApplicationPageRenderer
                        category={config.application.category}
                        blocks={config.application.blocks}
                        brand={config.brand}
                      />
                    )}
                    {config.domain === "shared-pages" && (
                      <SharedPageRenderer
                        category={config.shared.category}
                        blocks={config.shared.blocks}
                        brand={config.brand}
                      />
                    )}
                    {config.domain === "marketing" && (
                      <MarketingExamplePageRenderer
                        exampleSlug={config.marketing.exampleSlug}
                        blocks={config.marketing.extendedBlocks}
                        brand={config.brand}
                        landingConfig={config.marketing.landingConfig}
                      />
                    )}
                  </TabPanel>

                  <TabPanel tabKey="tsx" className="pt-4">
                    <pre className="overflow-x-auto rounded-2xl border border-zinc-200/80 bg-zinc-950 p-5 font-mono text-xs leading-relaxed text-zinc-100 dark:border-white/[0.08]">
                      <code>{generatedCode}</code>
                    </pre>
                  </TabPanel>

                  <TabPanel tabKey="recipe" className="space-y-4 pt-4">
                    <pre className="max-h-80 overflow-auto rounded-2xl border border-zinc-200/80 bg-zinc-950 p-5 font-mono text-xs leading-relaxed text-zinc-100 dark:border-white/[0.08]">
                      <code>{generatedRecipe}</code>
                    </pre>
                    <div className="space-y-2 border-t border-zinc-200/70 pt-4 dark:border-white/[0.08]">
                      <Textarea
                        label="Import Studio Recipe JSON"
                        rows={4}
                        placeholder="Paste a hudbird.studio.recipe JSON payload to restore..."
                        value={recipeInput}
                        onChange={(e) => setRecipeInput(e.target.value)}
                      />
                      {importWarnings.length > 0 && (
                        <Alert
                          variant="flat"
                          color="warning"
                          title="Recipe Import Notice"
                          description={importWarnings.join(" ")}
                        />
                      )}
                      <Button
                        size="sm"
                        variant="bordered"
                        onClick={() => {
                          const parsed = parseHudbirdStudioConfig(recipeInput);
                          setConfig(parsed.config);
                          setImportWarnings(parsed.warnings);
                        }}
                      >
                        Load Recipe into Studio
                      </Button>
                    </div>
                  </TabPanel>
                </Tabs>
              </CardBody>
            </Card>
          </div>
        </Grid>
      </Section>
    </Container>
  );
}
