import * as React from "react";
import { Button, Input, Select, SelectItem, Switch, Text, Textarea } from "@hudbird/ui";
import {
  DEFAULT_CTA_IMAGE,
  DEFAULT_CTA_VIDEO,
  getEffectiveAuthConfig,
  getEffectiveDashboardConfig,
  getEffectiveNotFoundConfig,
  getEffectiveSharedSections,
  MODULAR_ARRAY_DEFAULTS,
  readInlineContent,
  resolveLinkTarget,
  resolvePageContent,
  updateInlineContent,
  updateSectionContentOverride,
  type WebsitePage,
  type WebsiteProjectConfig,
} from "@hudbird/marketing";
import type {
  LandingSectionType,
  SectionAppearanceSettings,
  WebsiteLinkTarget,
} from "@hudbird/schemas";
import {
  CardBadgeCoreEditor,
  CoreDrilldownHeader,
  GridCoreEditor,
  MediaCoreEditor,
  TypographyCoreEditor,
  ButtonCoreEditor,
  type SelectedCoreNode,
} from "./CoreComponentEditors";
import {
  CodeIllustrationWidget,
  IconBrandPickerWidget,
  SectionColorPickerWidget,
  VideoMediaWidget,
} from "./SectionScannerWidgets";
import { SelectedItemIndexProvider } from "./SectionItemCrudList";
import type { MediaPresetOption } from "./MediaUploadField";
import type { ResolvedWidgetPlan, WidgetAtomId } from "./widgetEngine";

export interface ModularFieldDefinition {
  key: string;
  label: string;
  placeholder?: string;
  multiline?: boolean;
}

export interface ModularSpecDefinition {
  title: string;
  subtitle: string;
  fields: ModularFieldDefinition[];
}

export interface UniversalWidgetRendererProps {
  plan: ResolvedWidgetPlan;
  project: WebsiteProjectConfig;
  page: WebsitePage;
  displayMode: "drawer" | "popover";
  onChange: React.Dispatch<React.SetStateAction<WebsiteProjectConfig>>;
  onSelectNode?: (node: SelectedCoreNode) => void;
  onSelectPage: (pageId: string) => void;
  onClosePopover?: () => void;
  mediaPresets: MediaPresetOption[];
  appearance: SectionAppearanceSettings;
  onAppearanceChange: (patch: Partial<SectionAppearanceSettings>) => void;
  onResetCoreNode?: (node: SelectedCoreNode) => void;
  showGridOverlay?: boolean;
  onToggleGridOverlay?: () => void;
  modularSpec?: ModularSpecDefinition;
  renderLegacyPrimaryButton?: () => React.ReactNode;
  renderLegacySecondaryButton?: () => React.ReactNode;
  renderLegacyMedia?: () => React.ReactNode;
  renderLegacyBadge?: () => React.ReactNode;
  renderLegacyItems?: () => React.ReactNode;
  renderLegacyTypographyText?: () => React.ReactNode;
  renderHeroRemitStats?: () => React.ReactNode;
  renderSpecialSection?: (
    target: "announcement" | "auth" | "dashboard" | "not-found"
  ) => React.ReactNode;
  renderModularSectionFull?: () => React.ReactNode;
  renderSectionLinks?: () => React.ReactNode;
  renderSectionBrand?: () => React.ReactNode;
  renderMotion?: () => React.ReactNode;
  renderVisibilityAnchor?: () => React.ReactNode;
  renderSpacingSurface?: () => React.ReactNode;
}

function formatEditFieldLabel(editPath: string): string {
  const colonIdx = editPath.indexOf(":");
  const rawField = colonIdx >= 0 ? editPath.slice(colonIdx + 1) : editPath;
  const parts = rawField.split(".").filter((seg) => !/^\d+$/.test(seg));
  const last = parts[parts.length - 1] ?? rawField;
  return last.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, (c) => c.toUpperCase());
}

function inferLinkTargetFromHref(project: WebsiteProjectConfig, href?: string): WebsiteLinkTarget {
  if (!href || href === "#") return { kind: "section", section: "features" };
  if (href.startsWith("#")) {
    return {
      kind: "section",
      section: href.slice(1) as LandingSectionType,
    };
  }
  const matchedPage = project.pages.find((p) => p.path === href);
  if (matchedPage) {
    return { kind: "page", pageId: matchedPage.id };
  }
  return { kind: "external", href };
}

function WidgetSectionFrame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2.5 rounded-xl border border-zinc-200/80 bg-zinc-50/45 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]">
      <Text
        variant="small"
        className="text-[11px] font-semibold tracking-[0.06em] text-zinc-500 uppercase dark:text-zinc-400"
      >
        {title}
      </Text>
      {children}
    </div>
  );
}

/**
 * Renders the exact resolved set of editing widgets for any Page -> Section -> Item
 * across both floating contextual popovers and the right-hand inspector drawer.
 */
export function UniversalWidgetRenderer({
  plan,
  project,
  page,
  displayMode,
  onChange,
  onSelectNode,
  onSelectPage,
  onClosePopover,
  mediaPresets,
  appearance,
  onAppearanceChange,
  onResetCoreNode,
  showGridOverlay,
  onToggleGridOverlay,
  modularSpec,
  renderLegacyPrimaryButton,
  renderLegacySecondaryButton,
  renderLegacyMedia,
  renderLegacyBadge,
  renderLegacyItems,
  renderLegacyTypographyText,
  renderHeroRemitStats,
  renderSpecialSection,
  renderModularSectionFull,
  renderSectionLinks,
  renderSectionBrand,
  renderMotion,
  renderVisibilityAnchor,
  renderSpacingSurface,
}: UniversalWidgetRendererProps) {
  const resolvedContent = React.useMemo(() => resolvePageContent(project, page), [project, page]);

  const [localItemIdx, setLocalItemIdx] = React.useState(plan.selectedItemIndex ?? 0);
  React.useEffect(() => {
    setLocalItemIdx(plan.selectedItemIndex ?? 0);
  }, [plan.selectedItemIndex, plan.normalizedTarget]);

  const applyInlineValue = React.useCallback(
    (path: string, nextValue: string) => {
      onChange((prev) => updateInlineContent(prev, page.id, path, nextValue));
    },
    [onChange, page.id]
  );

  const patchModularScope = React.useCallback(
    (scope: string, patch: Record<string, unknown>) => {
      onChange((prev) => ({
        ...prev,
        pages: prev.pages.map((p) => {
          if (p.id !== page.id) return p;
          const prevMod = p.modularOverrides ?? {};
          const prevScope = prevMod[scope] ?? {};
          return {
            ...p,
            modularOverrides: {
              ...prevMod,
              [scope]: {
                ...prevScope,
                ...patch,
              },
            },
          };
        }),
      }));
    },
    [onChange, page.id]
  );

  const patchLandingSection = React.useCallback(
    (section: LandingSectionType, patch: Record<string, unknown>) => {
      onChange((prev) => updateSectionContentOverride(prev, section, patch, { pageId: page.id }));
    },
    [onChange, page.id]
  );

  const renderInlineFieldAtom = () => {
    if (!plan.editPath) return null;
    const rawValue = readInlineContent(project, page.id, plan.editPath);
    const strValue = typeof rawValue === "string" ? rawValue : "";
    const fieldLabel = formatEditFieldLabel(plan.editPath);
    const isLong = plan.insight.isMultilineText || strValue.length > 80;

    return (
      <div className="space-y-1.5">
        {isLong ? (
          <Textarea
            label={fieldLabel}
            rows={3}
            value={strValue}
            onChange={(e) => applyInlineValue(plan.editPath!, e.target.value)}
          />
        ) : (
          <Input
            label={fieldLabel}
            value={strValue}
            onChange={(e) => applyInlineValue(plan.editPath!, e.target.value)}
          />
        )}
      </div>
    );
  };

  const renderComparisonCellAtom = () => {
    const editPath = plan.editPath;
    if (!editPath) {
      return renderModularSectionFull ? renderModularSectionFull() : null;
    }

    const colonIdx = editPath.indexOf(":");
    const scope = colonIdx >= 0 ? editPath.slice(0, colonIdx) : plan.normalizedTarget;
    const rawValue = readInlineContent(project, page.id, editPath);
    const isIncluded = rawValue === true || rawValue === "true" || rawValue === "✓";
    const isExcluded =
      rawValue === false || rawValue === "false" || rawValue === "—" || rawValue === "-";

    // Derive parent row label path (`feature` / `label`) and hint path (`pricing-compare`)
    const rowLabelPath =
      scope === "pricing" && plan.insight.itemIndex !== null
        ? `pricing:comparisons.${plan.insight.itemIndex}.label`
        : scope === "pricing-compare" &&
            plan.insight.itemIndex !== null &&
            plan.insight.subIndex !== null
          ? `pricing-compare:groups.${plan.insight.itemIndex}.rows.${plan.insight.subIndex}.feature`
          : null;

    const rowHintPath =
      scope === "pricing-compare" &&
      plan.insight.itemIndex !== null &&
      plan.insight.subIndex !== null
        ? `pricing-compare:groups.${plan.insight.itemIndex}.rows.${plan.insight.subIndex}.hint`
        : null;

    const currentRowLabel = rowLabelPath
      ? String(readInlineContent(project, page.id, rowLabelPath) ?? "")
      : "";
    const currentRowHint = rowHintPath
      ? String(readInlineContent(project, page.id, rowHintPath) ?? "")
      : "";
    const customStr =
      typeof rawValue === "boolean" ? (rawValue ? "✓" : "—") : String(rawValue ?? "");

    return (
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Text variant="small" className="font-medium text-zinc-700 dark:text-zinc-300">
            Cell state
          </Text>
          <div className="grid grid-cols-3 gap-1.5">
            <Button
              size="sm"
              variant={isIncluded ? "solid" : "outline"}
              onClick={() =>
                applyInlineValue(editPath, typeof rawValue === "boolean" ? "true" : "✓")
              }
            >
              Included (✓)
            </Button>
            <Button
              size="sm"
              variant={isExcluded ? "solid" : "outline"}
              onClick={() =>
                applyInlineValue(editPath, typeof rawValue === "boolean" ? "false" : "—")
              }
            >
              Excluded (—)
            </Button>
            <Button
              size="sm"
              variant={!isIncluded && !isExcluded ? "solid" : "outline"}
              onClick={() => applyInlineValue(editPath, "Custom limit")}
            >
              Custom
            </Button>
          </div>
        </div>

        <Input
          label="Custom cell value"
          placeholder="e.g. Unlimited, 99.99%, Custom SLA"
          value={customStr}
          onChange={(e) => applyInlineValue(editPath, e.target.value)}
        />

        {rowLabelPath && (
          <Input
            label="Feature row label"
            value={currentRowLabel}
            onChange={(e) => applyInlineValue(rowLabelPath, e.target.value)}
          />
        )}

        {rowHintPath && (
          <Input
            label="Feature tooltip hint"
            placeholder="Optional explanation..."
            value={currentRowHint}
            onChange={(e) => applyInlineValue(rowHintPath, e.target.value)}
          />
        )}
      </div>
    );
  };

  const renderIconPickerAtom = () => {
    const scope = plan.normalizedTarget;
    const activeIdx = plan.selectedItemIndex ?? localItemIdx;

    // Resolve the active item icon edit path regardless of whether clicked directly or via tree
    let iconPath =
      plan.editPath && plan.insight.isIcon ? plan.editPath : `${scope}:items.${activeIdx}.icon`;
    let itemCount = 0;

    if (scope === "pricing") {
      iconPath =
        plan.editPath && plan.insight.isIcon ? plan.editPath : `pricing:plans.${activeIdx}.icon`;
      itemCount = resolvedContent.pricing.plans.length;
    } else if (scope === "values") {
      const modArr =
        (page.modularOverrides?.values?.items as unknown[] | undefined) ??
        MODULAR_ARRAY_DEFAULTS["values.items"]?.() ??
        [];
      itemCount = modArr.length;
    } else if (
      scope === "benefits" ||
      scope === "features" ||
      scope === "how-it-works" ||
      scope === "integrations"
    ) {
      const items = (resolvedContent[scope] as { items?: Array<{ icon?: string }> }).items;
      itemCount = items?.length ?? 0;
    }

    const currentIcon = readInlineContent(project, page.id, iconPath);

    return (
      <div className="space-y-3">
        {itemCount > 1 && !plan.editPath && (
          <Select
            label="Target Item"
            value={String(activeIdx)}
            onValueChange={(nextVal) => {
              const parsed = Number.parseInt(nextVal, 10);
              if (Number.isFinite(parsed) && parsed >= 0) {
                setLocalItemIdx(parsed);
              }
            }}
          >
            {Array.from({ length: itemCount }).map((_, idx) => (
              <SelectItem key={String(idx)} value={String(idx)}>
                {`Item #${idx + 1}`}
              </SelectItem>
            ))}
          </Select>
        )}

        <IconBrandPickerWidget
          selectedIcon={typeof currentIcon === "string" ? currentIcon : undefined}
          targetLabel={plan.title}
          onSelectIcon={(iconId) => applyInlineValue(iconPath, iconId)}
        />
      </div>
    );
  };

  const renderSingleMediaAtom = () => {
    const editPath = plan.editPath;
    // Preserve full hero / benefits section media editors when no specific inline item path or when hero media is clicked
    if (!editPath || editPath === "hero:media.src") {
      return renderLegacyMedia ? renderLegacyMedia() : null;
    }

    const currentVal = readInlineContent(project, page.id, editPath);
    const src = typeof currentVal === "string" ? currentVal : "";

    return (
      <MediaCoreEditor
        src={src}
        alt={plan.title}
        presets={mediaPresets}
        onImageChange={(patch) => {
          if (patch.src !== undefined) {
            applyInlineValue(editPath, patch.src);
          }
        }}
        settings={appearance.media}
        onSettingsChange={(media) => onAppearanceChange({ media })}
      />
    );
  };

  const renderVideoMediaAtom = () => {
    const editPath = plan.editPath;
    if (!editPath || editPath === "hero:video.src") {
      return renderLegacyMedia ? renderLegacyMedia() : null;
    }

    if (editPath === "cta:videoUrl") {
      const ed = resolvedContent.cta.editorial ?? {};
      return (
        <VideoMediaWidget
          videoSrc={ed.videoUrl ?? DEFAULT_CTA_VIDEO}
          onVideoSrcChange={(videoUrl) => applyInlineValue("cta:videoUrl", videoUrl)}
          poster={ed.image ?? { src: DEFAULT_CTA_IMAGE, alt: resolvedContent.cta.title }}
          presets={mediaPresets}
          onPosterChange={(patch) =>
            patchLandingSection("cta", {
              editorial: {
                ...ed,
                image: {
                  ...(ed.image ?? { src: DEFAULT_CTA_IMAGE, alt: resolvedContent.cta.title }),
                  ...patch,
                },
              },
            })
          }
          mediaSettings={appearance.media}
          onMediaSettingsChange={(media) => onAppearanceChange({ media })}
          videoSettings={appearance.video}
          onVideoSettingsChange={(video) => onAppearanceChange({ video })}
        />
      );
    }

    if (editPath === "editorial-cta:videoUrl") {
      const videoUrl = String(
        readInlineContent(project, page.id, "editorial-cta:videoUrl") ?? DEFAULT_CTA_VIDEO
      );
      const imageSrc = String(
        readInlineContent(project, page.id, "editorial-cta:imageSrc") ?? DEFAULT_CTA_IMAGE
      );
      return (
        <VideoMediaWidget
          videoSrc={videoUrl}
          onVideoSrcChange={(nextUrl) => applyInlineValue("editorial-cta:videoUrl", nextUrl)}
          poster={{ src: imageSrc, alt: "Editorial CTA poster" }}
          presets={mediaPresets}
          onPosterChange={(patch) => {
            if (patch.src !== undefined) {
              applyInlineValue("editorial-cta:imageSrc", patch.src);
            }
          }}
          mediaSettings={appearance.media}
          onMediaSettingsChange={(media) => onAppearanceChange({ media })}
          videoSettings={appearance.video}
          onVideoSettingsChange={(video) => onAppearanceChange({ video })}
        />
      );
    }

    if (editPath === "about:videoUrl") {
      const mod = page.modularOverrides?.about ?? {};
      const videoUrl = typeof mod.videoUrl === "string" ? mod.videoUrl : DEFAULT_CTA_VIDEO;
      const posterSrc = typeof mod.posterSrc === "string" ? mod.posterSrc : DEFAULT_CTA_IMAGE;
      return (
        <VideoMediaWidget
          videoSrc={videoUrl}
          onVideoSrcChange={(nextUrl) => applyInlineValue("about:videoUrl", nextUrl)}
          poster={{ src: posterSrc, alt: "About video poster" }}
          presets={mediaPresets}
          onPosterChange={(patch) => {
            if (patch.src !== undefined) {
              patchModularScope("about", { posterSrc: patch.src });
            }
          }}
          mediaSettings={appearance.media}
          onMediaSettingsChange={(media) => onAppearanceChange({ media })}
          videoSettings={appearance.video}
          onVideoSettingsChange={(video) => onAppearanceChange({ video })}
        />
      );
    }

    // Testimonials video card (`testimonials:items.N.videoUrl`)
    const itemMatch = /^testimonials:items\.(\d+)\.videoUrl$/.exec(editPath);
    if (itemMatch) {
      const idx = Number(itemMatch[1]);
      const items = resolvedContent.testimonials.items;
      const item = items[idx];
      if (item) {
        return (
          <VideoMediaWidget
            videoSrc={item.videoUrl ?? ""}
            onVideoSrcChange={(nextUrl) => {
              const nextItems = items.map((entry, i) =>
                i === idx ? { ...entry, videoUrl: nextUrl } : entry
              );
              patchLandingSection("testimonials", { items: nextItems });
            }}
            poster={{
              src: item.image ?? item.avatar ?? mediaPresets[0]?.src ?? "",
              alt: item.source,
            }}
            presets={mediaPresets}
            onPosterChange={(patch) => {
              if (patch.src !== undefined) {
                const nextItems = items.map((entry, i) =>
                  i === idx ? { ...entry, image: patch.src } : entry
                );
                patchLandingSection("testimonials", { items: nextItems });
              }
            }}
            mediaSettings={appearance.media}
            onMediaSettingsChange={(media) => onAppearanceChange({ media })}
            videoSettings={appearance.video}
            onVideoSettingsChange={(video) => onAppearanceChange({ video })}
          />
        );
      }
    }

    const fallbackVideo = String(readInlineContent(project, page.id, editPath) ?? "");
    return (
      <VideoMediaWidget
        videoSrc={fallbackVideo}
        onVideoSrcChange={(nextUrl) => applyInlineValue(editPath, nextUrl)}
        poster={{ src: DEFAULT_CTA_IMAGE, alt: "Section video poster" }}
        presets={mediaPresets}
        onPosterChange={() => undefined}
        mediaSettings={appearance.media}
        onMediaSettingsChange={(media) => onAppearanceChange({ media })}
        videoSettings={appearance.video}
        onVideoSettingsChange={(video) => onAppearanceChange({ video })}
      />
    );
  };

  const renderButtonActionAtom = () => {
    const editPath = plan.editPath;
    const scope = plan.normalizedTarget;

    // Preserve full Hero / Navbar / CTA primary & Hero secondary link pickers when applicable
    if (
      scope === "hero" &&
      (plan.selectedNode === "primary-button" || editPath === "hero:primaryAction.label")
    ) {
      return renderLegacyPrimaryButton ? renderLegacyPrimaryButton() : null;
    }
    if (
      scope === "hero" &&
      (plan.selectedNode === "secondary-button" || editPath === "hero:secondaryAction.label")
    ) {
      return renderLegacySecondaryButton ? renderLegacySecondaryButton() : null;
    }
    if (scope === "navbar" && plan.selectedNode === "primary-button") {
      return renderLegacyPrimaryButton ? renderLegacyPrimaryButton() : null;
    }
    if (
      scope === "cta" &&
      editPath !== "cta:secondaryAction.label" &&
      (plan.selectedNode === "primary-button" || editPath === "cta:action.label")
    ) {
      return renderLegacyPrimaryButton ? renderLegacyPrimaryButton() : null;
    }

    // Secondary action on LandingCTA
    if (editPath === "cta:secondaryAction.label") {
      const secAction = resolvedContent.cta.secondaryAction ?? {
        label: "Watch overview",
        href: "#features",
      };
      return (
        <ButtonCoreEditor
          title="Secondary CTA Button"
          labelValue={secAction.label}
          onLabelChange={(label) =>
            patchLandingSection("cta", { secondaryAction: { ...secAction, label } })
          }
          targetValue={inferLinkTargetFromHref(project, secAction.href)}
          project={project}
          onTargetChange={(target) => {
            const href = resolveLinkTarget(project, target).href;
            patchLandingSection("cta", { secondaryAction: { ...secAction, href } });
          }}
          onJumpToPage={onSelectPage}
          settings={appearance.button}
          onSettingsChange={(button) => onAppearanceChange({ button })}
        />
      );
    }

    // Testimonials Featured CTA button
    if (scope === "testimonials" || editPath === "testimonials:featuredAction.label") {
      const featuredAction = resolvedContent.testimonials.featuredAction ?? {
        label: "See customer story",
        href: "#contact",
      };
      return (
        <ButtonCoreEditor
          title="Featured Customer Story Button"
          labelValue={featuredAction.label}
          onLabelChange={(label) =>
            patchLandingSection("testimonials", {
              featuredAction: { ...featuredAction, label },
            })
          }
          targetValue={inferLinkTargetFromHref(project, featuredAction.href)}
          project={project}
          onTargetChange={(target) => {
            const href = resolveLinkTarget(project, target).href;
            patchLandingSection("testimonials", {
              featuredAction: { ...featuredAction, href },
            });
          }}
          onJumpToPage={onSelectPage}
          settings={appearance.button}
          onSettingsChange={(button) => onAppearanceChange({ button })}
        />
      );
    }

    // Pricing Tier CTA buttons
    const pricingPlanIdx = scope === "pricing" ? (plan.selectedItemIndex ?? 0) : null;
    if (scope === "pricing" && pricingPlanIdx !== null) {
      const plans = resolvedContent.pricing.plans;
      const targetPlan = plans[pricingPlanIdx];
      if (targetPlan) {
        const planTarget = inferLinkTargetFromHref(project, targetPlan.action.href);
        return (
          <ButtonCoreEditor
            title={`${targetPlan.name} CTA Button`}
            labelValue={targetPlan.action.label}
            onLabelChange={(label) => {
              const nextPlans = plans.map((pl, i) =>
                i === pricingPlanIdx ? { ...pl, action: { ...pl.action, label } } : pl
              );
              patchLandingSection("pricing", { plans: nextPlans });
            }}
            targetValue={planTarget}
            project={project}
            onTargetChange={(target) => {
              const href = resolveLinkTarget(project, target).href;
              const nextPlans = plans.map((pl, i) =>
                i === pricingPlanIdx ? { ...pl, action: { ...pl.action, href } } : pl
              );
              patchLandingSection("pricing", { plans: nextPlans });
            }}
            onJumpToPage={onSelectPage}
            settings={appearance.button}
            onSettingsChange={(button) => onAppearanceChange({ button })}
          />
        );
      }
    }

    // How-It-Works / Features / Benefits Item Actions
    if (scope === "how-it-works" || scope === "features" || scope === "benefits") {
      const idx = plan.selectedItemIndex ?? 0;
      const sec = resolvedContent[scope];
      const items = sec.items;
      const item = items[idx];
      if (item) {
        const isSecondary = editPath?.endsWith(".secondaryLabel");
        const label = isSecondary
          ? (item.secondaryLabel ?? "Explore")
          : scope === "benefits"
            ? (item.href ?? "Learn more")
            : (item.actionLabel ?? "Learn more");
        const href = isSecondary
          ? (item.secondaryHref ?? "#features")
          : scope === "benefits"
            ? (item.href ?? "#features")
            : (item.actionHref ?? item.href ?? "#features");

        if (scope === "benefits") {
          return (
            <ButtonCoreEditor
              title={`Benefit #${idx + 1} Link`}
              labelValue={item.href ?? ""}
              onLabelChange={(nextHref) => {
                const nextItems = items.map((it, i) =>
                  i === idx ? { ...it, href: nextHref } : it
                );
                patchLandingSection("benefits", { items: nextItems });
              }}
              targetValue={inferLinkTargetFromHref(project, item.href)}
              project={project}
              onTargetChange={(target) => {
                const resolvedHref = resolveLinkTarget(project, target).href;
                const nextItems = items.map((it, i) =>
                  i === idx ? { ...it, href: resolvedHref } : it
                );
                patchLandingSection("benefits", { items: nextItems });
              }}
              onJumpToPage={onSelectPage}
              settings={appearance.button}
              onSettingsChange={(button) => onAppearanceChange({ button })}
            />
          );
        }

        return (
          <ButtonCoreEditor
            title={isSecondary ? "Step Secondary Button" : `${scope} Card Button`}
            labelValue={label}
            onLabelChange={(nextLabel) => {
              const nextItems = items.map((it, i) =>
                i === idx
                  ? {
                      ...it,
                      ...(isSecondary ? { secondaryLabel: nextLabel } : { actionLabel: nextLabel }),
                    }
                  : it
              );
              patchLandingSection(scope, { items: nextItems });
            }}
            targetValue={inferLinkTargetFromHref(project, href)}
            project={project}
            onTargetChange={(target) => {
              const resolvedHref = resolveLinkTarget(project, target).href;
              const nextItems = items.map((it, i) =>
                i === idx
                  ? {
                      ...it,
                      ...(isSecondary
                        ? { secondaryHref: resolvedHref }
                        : { actionHref: resolvedHref }),
                    }
                  : it
              );
              patchLandingSection(scope, { items: nextItems });
            }}
            onJumpToPage={onSelectPage}
            settings={appearance.button}
            onSettingsChange={(button) => onAppearanceChange({ button })}
          />
        );
      }
    }

    // Announcement Bar CTA Link
    if (scope === "announcement") {
      const ann = getEffectiveSharedSections(project).announcement!;
      return (
        <ButtonCoreEditor
          title="Announcement Link"
          labelValue={ann.linkLabel}
          onLabelChange={(linkLabel) =>
            onChange((prev) => ({
              ...prev,
              shared: {
                ...prev.shared,
                announcement: {
                  ...getEffectiveSharedSections(prev).announcement!,
                  linkLabel,
                },
              },
            }))
          }
          targetValue={ann.target ?? undefined}
          project={project}
          onTargetChange={(target) =>
            onChange((prev) => ({
              ...prev,
              shared: {
                ...prev.shared,
                announcement: {
                  ...getEffectiveSharedSections(prev).announcement!,
                  target,
                },
              },
            }))
          }
          onJumpToPage={onSelectPage}
          settings={undefined}
          onSettingsChange={() => undefined}
        />
      );
    }

    // Auth Submit Button
    if (scope === "auth") {
      const auth = getEffectiveAuthConfig(project);
      return (
        <div className="space-y-3">
          <Input
            label="Submit Button Label"
            placeholder="Sign in / Create account"
            value={auth.loginSubmitLabel ?? ""}
            onChange={(e) =>
              onChange((prev) => ({
                ...prev,
                authConfig: {
                  ...getEffectiveAuthConfig(prev),
                  loginSubmitLabel: e.target.value,
                },
              }))
            }
          />
          <Select
            label="Redirect After Auth"
            value={auth.postAuthPageId ?? "dashboard"}
            onValueChange={(nextId) => {
              onChange((prev) => ({
                ...prev,
                authConfig: {
                  ...getEffectiveAuthConfig(prev),
                  postAuthPageId: nextId,
                },
              }));
            }}
          >
            {project.pages.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {`${p.name} (${p.path})`}
              </SelectItem>
            ))}
          </Select>
        </div>
      );
    }

    // Dashboard Back Button
    if (scope === "dashboard") {
      const dash = getEffectiveDashboardConfig(project);
      return (
        <Input
          label="Back-to-site Button Label"
          value={dash.backToSiteLabel ?? "Back to website"}
          onChange={(e) =>
            onChange((prev) => ({
              ...prev,
              dashboardConfig: {
                ...getEffectiveDashboardConfig(prev),
                backToSiteLabel: e.target.value,
              },
            }))
          }
        />
      );
    }

    // 404 Primary & Secondary Recovery Buttons
    if (scope === "not-found") {
      const nf = getEffectiveNotFoundConfig(project);
      const isSecondary =
        plan.selectedNode === "secondary-button" || editPath === "notFound:secondaryActionLabel";
      return (
        <ButtonCoreEditor
          title={isSecondary ? "Secondary Recovery Button" : "Primary Recovery Button"}
          labelValue={
            isSecondary ? (nf.secondaryActionLabel ?? "Contact support") : nf.primaryActionLabel
          }
          onLabelChange={(val) =>
            onChange((prev) => ({
              ...prev,
              notFoundConfig: {
                ...getEffectiveNotFoundConfig(prev),
                ...(isSecondary ? { secondaryActionLabel: val } : { primaryActionLabel: val }),
              },
            }))
          }
          targetValue={
            (isSecondary ? nf.secondaryActionTarget : nf.primaryActionTarget) ?? undefined
          }
          project={project}
          onTargetChange={(target) =>
            onChange((prev) => ({
              ...prev,
              notFoundConfig: {
                ...getEffectiveNotFoundConfig(prev),
                ...(isSecondary
                  ? { secondaryActionTarget: target }
                  : { primaryActionTarget: target }),
              },
            }))
          }
          onJumpToPage={onSelectPage}
          settings={appearance.button}
          onSettingsChange={(button) => onAppearanceChange({ button })}
        />
      );
    }

    // Modular buttons (`about:actionLabel`, `editorial-cta:primaryLabel`, `pricing-compare:plans.N.ctaLabel`, etc.)
    const currentLabel = editPath
      ? String(readInlineContent(project, page.id, editPath) ?? "")
      : "";
    return (
      <div className="space-y-3">
        {editPath && (
          <Input
            label="Button Label"
            value={currentLabel}
            onChange={(e) => applyInlineValue(editPath, e.target.value)}
          />
        )}
        <ButtonCoreEditor
          title={plan.title}
          labelValue={currentLabel || "Action Button"}
          onLabelChange={(val) => {
            if (editPath) applyInlineValue(editPath, val);
          }}
          targetValue={undefined}
          project={project}
          onTargetChange={(target) => {
            const href = resolveLinkTarget(project, target).href;
            if (scope === "about" || scope === "editorial-cta") {
              patchModularScope(scope, { actionHref: href });
            }
          }}
          onJumpToPage={onSelectPage}
          settings={appearance.button}
          onSettingsChange={(button) => onAppearanceChange({ button })}
        />
      </div>
    );
  };

  const renderBadgeEditorAtom = () => {
    const scope = plan.normalizedTarget;
    if (plan.targetKind === "landing" && !plan.editPath && renderLegacyBadge) {
      return renderLegacyBadge();
    }

    const editPath = plan.editPath;
    const badgeValue = editPath
      ? String(readInlineContent(project, page.id, editPath) ?? "")
      : undefined;

    return (
      <CardBadgeCoreEditor
        anchorId={appearance.anchorId}
        defaultAnchorId={scope}
        onAnchorIdChange={(anchorId) => onAppearanceChange({ anchorId })}
        badgeText={badgeValue}
        onBadgeTextChange={editPath ? (nextVal) => applyInlineValue(editPath, nextVal) : undefined}
        badgeSettings={appearance.badgeStyle}
        onBadgeSettingsChange={(badgeStyle) => onAppearanceChange({ badgeStyle })}
        cardSettings={appearance.card}
        onCardSettingsChange={(card) => onAppearanceChange({ card })}
        showCard={false}
        showBadge={true}
        showAnchor={false}
      />
    );
  };

  const renderCardSurfaceAtom = () => (
    <CardBadgeCoreEditor
      anchorId={appearance.anchorId}
      defaultAnchorId={plan.normalizedTarget}
      onAnchorIdChange={(anchorId) => onAppearanceChange({ anchorId })}
      badgeSettings={appearance.badgeStyle}
      onBadgeSettingsChange={(badgeStyle) => onAppearanceChange({ badgeStyle })}
      cardSettings={appearance.card}
      onCardSettingsChange={(card) => onAppearanceChange({ card })}
      showCard={true}
      showBadge={false}
      showAnchor={false}
    />
  );

  const renderTypographyStyleAtom = () => {
    const focusField =
      plan.selectedNode === "heading" ? "heading" : plan.selectedNode === "text" ? "text" : "both";

    // In drawer mode without an item-level text override path, include the full section heading/description inputs
    if (displayMode === "drawer" && !plan.editPath && renderLegacyTypographyText) {
      return (
        <div className="space-y-4">
          {renderLegacyTypographyText()}
          <TypographyCoreEditor
            headingSettings={appearance.heading}
            onHeadingSettingsChange={(heading) => onAppearanceChange({ heading })}
            textSettings={appearance.text}
            onTextSettingsChange={(text) => onAppearanceChange({ text })}
            focusField={focusField}
          />
        </div>
      );
    }

    return (
      <TypographyCoreEditor
        headingSettings={appearance.heading}
        onHeadingSettingsChange={(heading) => onAppearanceChange({ heading })}
        textSettings={appearance.text}
        onTextSettingsChange={(text) => onAppearanceChange({ text })}
        focusField={focusField}
      />
    );
  };

  const renderColorPaletteAtom = () => {
    return (
      <SectionColorPickerWidget
        settings={appearance.color}
        onChange={(color) => onAppearanceChange({ color })}
        showScrim={
          plan.normalizedTarget === "hero" ||
          plan.normalizedTarget === "cta" ||
          plan.normalizedTarget === "editorial-cta"
        }
      />
    );
  };

  const renderModularFieldsAtom = () => {
    const scope = plan.normalizedTarget;
    const modOverrides = page.modularOverrides?.[scope] ?? {};

    return (
      <div className="space-y-3">
        {modularSpec && (
          <div className="space-y-3">
            {modularSpec.fields.map((field) => {
              const rawVal = modOverrides[field.key];
              const strVal = typeof rawVal === "string" ? rawVal : "";
              return field.multiline ? (
                <Textarea
                  key={field.key}
                  label={field.label}
                  placeholder={field.placeholder}
                  rows={3}
                  value={strVal}
                  onChange={(e) => patchModularScope(scope, { [field.key]: e.target.value })}
                />
              ) : (
                <Input
                  key={field.key}
                  label={field.label}
                  placeholder={field.placeholder}
                  value={strVal}
                  onChange={(e) => patchModularScope(scope, { [field.key]: e.target.value })}
                />
              );
            })}
          </div>
        )}

        {scope === "editorial-cta" && (
          <div className="flex items-center justify-between gap-2 rounded-lg border border-zinc-200/80 px-2.5 py-2 dark:border-white/[0.08]">
            <Text variant="small" className="text-zinc-600 dark:text-zinc-400">
              Show Video Trigger
            </Text>
            <Switch
              size="sm"
              checked={modOverrides.showVideo !== false}
              onChange={(e) => patchModularScope(scope, { showVideo: e.target.checked })}
            />
          </div>
        )}
      </div>
    );
  };

  const renderSectionItemsAtom = () => {
    if (plan.targetKind === "landing" && renderLegacyItems) {
      return renderLegacyItems();
    }

    // Modular item arrays (`meet-our-expert`, `values`, `contact-mail`, `contact-locations`, `blog-index`, `pricing-compare`)
    const scope = plan.normalizedTarget;
    const arrayKey =
      scope === "meet-our-expert"
        ? "experts"
        : scope === "contact-mail"
          ? "channels"
          : scope === "contact-locations"
            ? "offices"
            : scope === "blog-index"
              ? "posts"
              : scope === "pricing-compare"
                ? "plans"
                : scope === "values"
                  ? "items"
                  : null;

    if (!arrayKey) {
      return renderModularSectionFull ? renderModularSectionFull() : null;
    }

    const seedKey = `${scope}.${arrayKey}`;
    const currentOverrides = page.modularOverrides?.[scope] as Record<string, unknown> | undefined;
    const items = (
      Array.isArray(currentOverrides?.[arrayKey])
        ? currentOverrides?.[arrayKey]
        : (MODULAR_ARRAY_DEFAULTS[seedKey]?.() ?? [])
    ) as Array<Record<string, unknown>>;

    const activeIdx = Math.min(localItemIdx, Math.max(0, items.length - 1));
    const activeItem = items[activeIdx];
    if (!activeItem) return null;

    const editableTextKeys = Object.keys(activeItem).filter(
      (k) => typeof activeItem[k] === "string" && k !== "id" && k !== "slug" && k !== "icon"
    );

    return (
      <div className="space-y-3">
        {items.length > 1 && (
          <div className="flex flex-wrap gap-1">
            {items.map((entry, idx) => (
              <Button
                key={idx}
                size="sm"
                variant={idx === activeIdx ? "solid" : "outline"}
                onClick={() => setLocalItemIdx(idx)}
              >
                {String(entry.name ?? entry.title ?? entry.label ?? `#${idx + 1}`).slice(0, 18)}
              </Button>
            ))}
          </div>
        )}

        {editableTextKeys.slice(0, 5).map((k) => {
          const val = String(activeItem[k] ?? "");
          const path = `${scope}:${arrayKey}.${activeIdx}.${k}`;
          return val.length > 65 || k === "bio" || k === "description" || k === "summary" ? (
            <Textarea
              key={k}
              label={formatEditFieldLabel(path)}
              rows={2}
              value={val}
              onChange={(e) => applyInlineValue(path, e.target.value)}
            />
          ) : (
            <Input
              key={k}
              label={formatEditFieldLabel(path)}
              value={val}
              onChange={(e) => applyInlineValue(path, e.target.value)}
            />
          );
        })}
      </div>
    );
  };

  const renderAtom = (atom: WidgetAtomId, idx: number) => {
    switch (atom) {
      case "core-header":
        if (displayMode === "popover") {
          return (
            <div
              key={atom}
              className="flex items-center justify-between gap-2 border-b border-zinc-200/80 pb-2.5 dark:border-white/[0.08]"
            >
              <div className="min-w-0">
                <div className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                  {plan.title}
                </div>
                <div className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
                  {plan.subtitle}
                </div>
              </div>
              {onClosePopover && (
                <Button size="sm" variant="outline" onClick={onClosePopover}>
                  Done
                </Button>
              )}
            </div>
          );
        }
        return (
          <CoreDrilldownHeader
            key={atom}
            sectionTitle={plan.subtitle.split(" · ")[0] ?? plan.normalizedTarget}
            componentLabel={plan.title}
            onBackToSection={() => onSelectNode?.("section")}
            onReset={
              onResetCoreNode && plan.selectedNode !== "section"
                ? () => onResetCoreNode(plan.selectedNode)
                : undefined
            }
          />
        );

      case "inline-field":
        // Skip duplicate inline input if a specialized widget atom already owns this exact field
        if (
          plan.atoms.includes("badge-editor") ||
          plan.atoms.includes("button-action") ||
          plan.atoms.includes("single-media") ||
          plan.atoms.includes("video-media") ||
          plan.atoms.includes("slideshow-media") ||
          plan.atoms.includes("code-illustration") ||
          plan.atoms.includes("icon-picker") ||
          plan.atoms.includes("comparison-cell")
        ) {
          return null;
        }
        return <React.Fragment key={atom}>{renderInlineFieldAtom()}</React.Fragment>;

      case "typography-style":
        return (
          <WidgetSectionFrame key={atom} title="Typography & Formatting">
            {renderTypographyStyleAtom()}
          </WidgetSectionFrame>
        );

      case "button-action":
        return (
          <WidgetSectionFrame key={atom} title="Button & Link Action">
            {renderButtonActionAtom()}
          </WidgetSectionFrame>
        );

      case "icon-picker":
        return (
          <WidgetSectionFrame key={atom} title="Icon Selection">
            {renderIconPickerAtom()}
          </WidgetSectionFrame>
        );

      case "single-media":
        return (
          <WidgetSectionFrame key={atom} title="Image & Media Asset">
            {renderSingleMediaAtom()}
          </WidgetSectionFrame>
        );

      case "video-media":
        return (
          <WidgetSectionFrame key={atom} title="Video Stream & Poster">
            {renderVideoMediaAtom()}
          </WidgetSectionFrame>
        );

      case "slideshow-media":
        return (
          <WidgetSectionFrame key={atom} title="Slideshow Carousel">
            {renderLegacyMedia ? renderLegacyMedia() : null}
          </WidgetSectionFrame>
        );

      case "code-illustration":
        return (
          <WidgetSectionFrame key={atom} title="Code Illustration & Mockup">
            <CodeIllustrationWidget
              settings={appearance.illustration}
              onChange={(illustration) => onAppearanceChange({ illustration })}
              presets={plan.manifest?.visual.presets ?? []}
              mediaPresets={mediaPresets}
              illustrationLabel={plan.title}
            />
          </WidgetSectionFrame>
        );

      case "comparison-cell":
        return (
          <WidgetSectionFrame key={atom} title="Comparison Matrix">
            {renderComparisonCellAtom()}
          </WidgetSectionFrame>
        );

      case "badge-editor":
        return (
          <WidgetSectionFrame key={atom} title="Badge & Eyebrow">
            {renderBadgeEditorAtom()}
          </WidgetSectionFrame>
        );

      case "card-surface":
        return (
          <WidgetSectionFrame key={atom} title="Card Surface & Elevation">
            {renderCardSurfaceAtom()}
          </WidgetSectionFrame>
        );

      case "grid-layout":
        return (
          <WidgetSectionFrame key={atom} title="Grid & Column Layout">
            <GridCoreEditor
              settings={appearance.grid}
              onChange={(grid) => onAppearanceChange({ grid })}
              showGridOverlay={showGridOverlay}
              onToggleGridOverlay={onToggleGridOverlay}
            />
          </WidgetSectionFrame>
        );

      case "links-nav":
        return (
          <WidgetSectionFrame key={atom} title="Links & Navigation">
            {renderSectionLinks ? renderSectionLinks() : renderSpecialSection?.("auth")}
          </WidgetSectionFrame>
        );

      case "brand-identity":
        return (
          <WidgetSectionFrame key={atom} title="Brand Identity">
            {renderSectionBrand ? renderSectionBrand() : null}
          </WidgetSectionFrame>
        );

      case "color-palette":
        return (
          <WidgetSectionFrame key={atom} title="Color & Contrast">
            {renderColorPaletteAtom()}
          </WidgetSectionFrame>
        );

      case "hero-remit-stats":
        return (
          <WidgetSectionFrame key={atom} title="Live Metrics & Invoices">
            {renderHeroRemitStats ? renderHeroRemitStats() : renderInlineFieldAtom()}
          </WidgetSectionFrame>
        );

      case "section-items":
        return (
          <WidgetSectionFrame key={atom} title="Item & Collection Editor">
            {renderSectionItemsAtom()}
          </WidgetSectionFrame>
        );

      case "modular-fields":
        return (
          <WidgetSectionFrame key={atom} title={modularSpec?.title ?? "Section Content"}>
            {renderModularFieldsAtom()}
          </WidgetSectionFrame>
        );

      case "spacing-surface":
        return renderSpacingSurface ? (
          <React.Fragment key={atom}>{renderSpacingSurface()}</React.Fragment>
        ) : null;

      case "motion-reveal":
        return renderMotion ? <React.Fragment key={atom}>{renderMotion()}</React.Fragment> : null;

      case "visibility-anchor":
        return renderVisibilityAnchor ? (
          <React.Fragment key={atom}>{renderVisibilityAnchor()}</React.Fragment>
        ) : null;

      case "announcement-bar":
        return renderSpecialSection ? (
          <React.Fragment key={atom}>{renderSpecialSection("announcement")}</React.Fragment>
        ) : null;

      case "auth-config":
        return renderSpecialSection ? (
          <React.Fragment key={atom}>{renderSpecialSection("auth")}</React.Fragment>
        ) : null;

      case "dashboard-config":
        return renderSpecialSection ? (
          <React.Fragment key={atom}>{renderSpecialSection("dashboard")}</React.Fragment>
        ) : null;

      case "not-found-config":
        return renderSpecialSection ? (
          <React.Fragment key={atom}>{renderSpecialSection("not-found")}</React.Fragment>
        ) : null;

      default:
        return idx < 0 ? null : null;
    }
  };

  return (
    <SelectedItemIndexProvider selectedItemIndex={plan.selectedItemIndex}>
      <div className={displayMode === "popover" ? "space-y-3 pb-1" : "space-y-4 pb-6"}>
        {plan.atoms.map((atom, idx) => renderAtom(atom, idx))}
      </div>
    </SelectedItemIndexProvider>
  );
}
