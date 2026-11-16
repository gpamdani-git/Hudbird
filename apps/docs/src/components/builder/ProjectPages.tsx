import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Badge,
  Button,
  Checkbox,
  Heading,
  Input,
  Select,
  SelectItem,
  Switch,
  Text,
  Textarea,
} from "@hudbird/ui";
import {
  findOrphanPages,
  getEffectiveSharedSections,
  isSectionPage,
  restoreWebsitePage,
  duplicateWebsitePage,
  deleteWebsitePage,
  normalizePagePath,
  websiteTemplates,
  type WebsiteProjectConfig,
  type WebsiteStarterPackId,
  type WebsiteTemplate,
  type WebsitePage,
} from "@hudbird/marketing";
import {
  ChevronDown,
  ChevronRight,
  Copy,
  CornerDownRight,
  File,
  Folder,
  Link2,
  GitBranch,
  Layers,
  Megaphone,
  PanelBottom,
  PanelTop,
  Plus,
  Search,
  Settings2,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

type Update = React.Dispatch<React.SetStateAction<WebsiteProjectConfig>>;
export function ProjectPages({
  project,
  onChange,
  onSelect,
  onAdd,
  onSettings,
  onEditShared,
  onOpenFlow,
}: {
  project: WebsiteProjectConfig;
  onChange: Update;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onSettings: () => void;
  onEditShared?: (slot: "announcement" | "navbar" | "footer") => void;
  onOpenFlow?: () => void;
}) {
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<string[]>([]);
  const [deleted, setDeleted] = useState<WebsiteProjectConfig | null>(null);
  const current = project.pages.find((p) => p.id === project.activePageId)!;
  const orphanIds = new Set(findOrphanPages(project).map((p) => p.id));
  const shared = getEffectiveSharedSections(project);
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <Input
        aria-label="Search pages"
        placeholder="Search pages…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        startContent={<Search size={14} />}
      />

      {/* Shared Header, Footer & Banner Shortcuts */}
      {onEditShared && (
        <div className="mt-4 space-y-2 border-t border-zinc-200 pt-3.5 dark:border-white/10">
          <div className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
            Global Sections
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button
              type="button"
              onClick={() => onEditShared("announcement")}
              className="flex min-h-8 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.07]"
            >
              <Megaphone
                size={12}
                className={shared.announcement?.enabled ? "text-emerald-500" : "text-zinc-400"}
              />
              <span>Banner</span>
            </button>
            <button
              type="button"
              onClick={() => onEditShared("navbar")}
              className="flex min-h-8 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.07]"
            >
              <PanelTop size={12} className="text-zinc-500 dark:text-zinc-400" />
              <span>Header</span>
            </button>
            <button
              type="button"
              onClick={() => onEditShared("footer")}
              className="flex min-h-8 items-center justify-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300 dark:hover:bg-white/[0.07]"
            >
              <PanelBottom size={12} className="text-zinc-500 dark:text-zinc-400" />
              <span>Footer</span>
            </button>
          </div>
        </div>
      )}

      <div className="my-3 flex items-center justify-between gap-2">
        <Text weight="semibold">
          Pages <span className="ml-1 text-xs text-zinc-400">{project.pages.length}</span>
        </Text>
        <div className="flex items-center gap-1">
          {onOpenFlow && (
            <Button
              variant="outline"
              size="sm"
              onClick={onOpenFlow}
              aria-label="Open multipage flow map"
              className="h-8 gap-1 px-2 text-[11px]"
            >
              <GitBranch size={13} />
              <span>Flow</span>
              {orphanIds.size > 0 && (
                <span className="ml-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500/20 px-1 text-[9px] font-bold text-amber-600 dark:text-amber-400">
                  {orphanIds.size}
                </span>
              )}
            </Button>
          )}
          <Button variant="outline" size="sm" isIconOnly onClick={onAdd} aria-label="Add page">
            <Plus size={16} />
          </Button>
        </div>
      </div>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto" aria-label="Project pages">
        {["Website", "Account", "Dashboard", "System"].map((group) => {
          const pages = project.pages.filter(
            (p) =>
              websiteTemplates.find((t) => t.id === p.template)?.group === group &&
              `${p.name} ${p.path}`.toLowerCase().includes(search.toLowerCase())
          );
          if (!pages.length) return null;
          const closed = !search && collapsed.includes(group);
          return (
            <div key={group}>
              <Button
                variant="plain"
                size="sm"
                className="w-full justify-start px-1"
                aria-expanded={!closed}
                onClick={() =>
                  setCollapsed((c) =>
                    c.includes(group) ? c.filter((g) => g !== group) : [...c, group]
                  )
                }
              >
                {closed ? <ChevronRight size={14} /> : <ChevronDown size={14} />}
                <Folder size={15} />
                {group}
              </Button>
              {!closed &&
                (() => {
                  const hasBlogParent = pages.some((item) => item.template === "blog");
                  const subPostPages = hasBlogParent
                    ? pages.filter((item) => item.template === "blog-post")
                    : [];
                  const topLevelPages = hasBlogParent
                    ? pages.filter((item) => item.template !== "blog-post")
                    : pages;
                  const firstBlogId = topLevelPages.find((item) => item.template === "blog")?.id;

                  const renderPageButton = (page: WebsitePage, nested = false) => (
                    <Button
                      key={page.id}
                      variant="plain"
                      className={`my-0.5 min-h-10 w-full min-w-0 justify-start gap-2 px-3 ${
                        nested ? "text-zinc-700 dark:text-zinc-300" : ""
                      } ${page.id === project.activePageId ? "bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300" : ""}`}
                      aria-current={page.id === project.activePageId ? "page" : undefined}
                      onClick={() => onSelect(page.id)}
                    >
                      {nested ? (
                        <CornerDownRight size={13} className="shrink-0 text-zinc-400" />
                      ) : (
                        <File size={14} className="shrink-0" />
                      )}
                      <span className="truncate text-xs">{page.name}</span>
                      {orphanIds.has(page.id) && (
                        <span
                          title="Not linked from navbar, footer, or auth flows"
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500"
                        />
                      )}
                      <span
                        className="ml-auto max-w-20 truncate text-[10px] font-normal text-zinc-500"
                        title={page.path}
                      >
                        {page.path}
                      </span>
                    </Button>
                  );

                  return topLevelPages.map((page) => (
                    <React.Fragment key={page.id}>
                      {renderPageButton(page, false)}
                      {page.id === firstBlogId && subPostPages.length > 0 && (
                        <div className="ml-4 border-l border-zinc-200/90 pl-2 dark:border-white/10">
                          {subPostPages.map((sub) => renderPageButton(sub, true))}
                        </div>
                      )}
                    </React.Fragment>
                  ));
                })()}
            </div>
          );
        })}
        {search &&
          !project.pages.some((p) =>
            `${p.name} ${p.path}`.toLowerCase().includes(search.toLowerCase())
          ) && <Text variant="muted">No pages match your search.</Text>}
      </div>
      <div className="mt-4 border-t border-zinc-200 pt-3 dark:border-white/10">
        <Text variant="small" className="mb-2 truncate">
          Selected: {current.name}
        </Text>
        <div className="flex items-center gap-1">
          <Button
            variant="plain"
            size="sm"
            startContent={<Settings2 size={14} />}
            onClick={onSettings}
          >
            Settings
          </Button>
          <Button
            variant="plain"
            size="sm"
            isIconOnly
            aria-label={`Duplicate ${current.name}`}
            onClick={() =>
              onChange((p) => duplicateWebsitePage(p, current.id, crypto.randomUUID()))
            }
          >
            <Copy size={14} />
          </Button>
          <Button
            variant="plain"
            size="sm"
            isIconOnly
            disabled={current.path === "/"}
            aria-label={`Delete ${current.name}`}
            title={current.path === "/" ? "Keep your home page" : "Delete page (can be undone)"}
            onClick={() => {
              setDeleted(project);
              onChange((p) => deleteWebsitePage(p, current.id));
            }}
          >
            <Trash2 size={14} />
          </Button>
        </div>
        {deleted && (
          <div role="status" className="mt-2 flex items-center justify-between text-xs">
            <span>Page deleted.</span>
            <Button
              size="sm"
              variant="plain"
              onClick={() => {
                onChange((current) => restoreWebsitePage(current, deleted));
                setDeleted(null);
              }}
            >
              Undo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export function PageSettings({
  project,
  onChange,
  onClose,
  embedded = false,
}: {
  project: WebsiteProjectConfig;
  onChange: Update;
  onClose: () => void;
  embedded?: boolean;
}) {
  const page = project.pages.find((p) => p.id === project.activePageId)!;
  const [name, setName] = useState(page.name);
  const [path, setPath] = useState(page.path);
  const [error, setError] = useState("");
  const patch = (update: Partial<WebsitePage>) =>
    onChange((p) => ({
      ...p,
      pages: p.pages.map((item) => (item.id === page.id ? { ...item, ...update } : item)),
    }));
  return (
    <div className="space-y-6">
      {!embedded && (
        <div className="flex items-center justify-between">
          <Heading as="h2" size="h5">
            Page settings
          </Heading>
          <Button
            variant="plain"
            size="sm"
            isIconOnly
            aria-label="Close page settings"
            onClick={onClose}
          >
            <X size={16} />
          </Button>
        </div>
      )}
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          const normalized = normalizePagePath(path);
          if (!name.trim()) return setError("Enter a page name.");
          if (!normalized)
            return setError("Use a path like /about with letters, numbers, and hyphens.");
          if (project.pages.some((p) => p.id !== page.id && p.path === normalized))
            return setError("Another page already uses this URL.");
          patch({ name: name.trim(), path: normalized });
          setPath(normalized);
          setError("");
        }}
      >
        <Input
          label="Page name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={60}
        />
        <Input
          label="URL"
          value={path}
          disabled={page.path === "/"}
          onChange={(e) => setPath(e.target.value)}
          description={
            page.path === "/"
              ? "Your home page always uses /."
              : "Internal page links update automatically."
          }
        />
        {error && (
          <Text variant="small" role="alert" className="text-red-600 dark:text-red-400">
            {error}
          </Text>
        )}
        <Button type="submit" variant="outline" size="sm">
          Save page
        </Button>
      </form>
      {page.template === "login" && (
        <div className="space-y-2">
          <Text variant="small">Layout</Text>
          <div className="flex gap-2">
            {(["split", "centered"] as const).map((layout) => (
              <Button
                key={layout}
                size="sm"
                variant={page.authLayout === layout ? "solid" : "outline"}
                onClick={() => patch({ authLayout: layout })}
              >
                {layout === "split" ? "Split" : "Centered"}
              </Button>
            ))}
          </div>
        </div>
      )}
      {isSectionPage(page) && (
        <div className="space-y-3 border-t border-zinc-200 pt-5 dark:border-white/10">
          <Heading as="h3" size="h6">
            Shared Header &amp; Footer
          </Heading>
          <div className="space-y-2">
            <div className="text-[11px] font-medium text-zinc-500">Global Navbar</div>
            <div className="grid grid-cols-3 gap-1">
              {(["inherit", "custom", "hidden"] as const).map((mode) => (
                <Button
                  key={mode}
                  size="sm"
                  variant={(page.sharedMode?.navbar ?? "inherit") === mode ? "solid" : "outline"}
                  onClick={() => patch({ sharedMode: { ...page.sharedMode, navbar: mode } })}
                  className="capitalize"
                >
                  {mode}
                </Button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-[11px] font-medium text-zinc-500">Global Footer</div>
            <div className="grid grid-cols-3 gap-1">
              {(["inherit", "custom", "hidden"] as const).map((mode) => (
                <Button
                  key={mode}
                  size="sm"
                  variant={(page.sharedMode?.footer ?? "inherit") === mode ? "solid" : "outline"}
                  onClick={() => patch({ sharedMode: { ...page.sharedMode, footer: mode } })}
                  className="capitalize"
                >
                  {mode}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3 border-t border-zinc-200 pt-5 dark:border-white/10">
        <Heading as="h3" size="h6">
          SEO Metadata
        </Heading>
        <Input
          size="sm"
          label="Meta Title"
          placeholder={`${page.name} — ${project.brand.name}`}
          value={page.seo?.title ?? ""}
          onChange={(e) => patch({ seo: { ...page.seo, title: e.target.value } })}
        />
        <Textarea
          label="Meta Description"
          rows={2}
          placeholder="Describe this page for search engines and social cards..."
          value={page.seo?.description ?? ""}
          onChange={(e) => patch({ seo: { ...page.seo, description: e.target.value } })}
        />
      </div>

      <div className="space-y-3 border-t border-zinc-200 pt-5 dark:border-white/10">
        <Heading as="h3" size="h6">
          Website navigation
        </Heading>
        <Text variant="small">
          Choose which pages appear in the website menu. Selection order sets menu order.
        </Text>
        {project.pages
          .filter((p) => p.template !== "not-found")
          .map((p) => (
            <Checkbox
              key={p.id}
              checked={project.navigation.includes(p.id)}
              onChange={(e) =>
                onChange((previous) => {
                  const nextNav = e.target.checked
                    ? [...previous.navigation, p.id]
                    : previous.navigation.filter((id) => id !== p.id);
                  const sharedItems = previous.shared?.navbar?.items;
                  return {
                    ...previous,
                    navigation: nextNav,
                    shared: previous.shared?.navbar
                      ? {
                          ...previous.shared,
                          navbar: {
                            ...previous.shared.navbar,
                            items: e.target.checked
                              ? [
                                  ...(sharedItems ?? []),
                                  ...(sharedItems?.some(
                                    (item) =>
                                      item.target.kind === "page" && item.target.pageId === p.id
                                  )
                                    ? []
                                    : [
                                        {
                                          id: `nav-${p.id}`,
                                          label: p.name,
                                          description: `Visit ${p.name}`,
                                          target: { kind: "page" as const, pageId: p.id },
                                        },
                                      ]),
                                ]
                              : sharedItems?.filter(
                                  (item) =>
                                    !(item.target.kind === "page" && item.target.pageId === p.id)
                                ),
                          },
                        }
                      : previous.shared,
                  };
                })
              }
            >
              {p.name}
            </Checkbox>
          ))}
        {!project.navigation.length && (
          <Text variant="small">Using the original section links.</Text>
        )}
      </div>
      <div className="space-y-2">
        <Select
          label="Primary button links to"
          value={project.primaryActionPageId ?? "original"}
          onValueChange={(value) =>
            onChange((p) => {
              const nextId = value === "original" ? null : value;
              const dest = nextId ? p.pages.find((pg) => pg.id === nextId) : undefined;
              return {
                ...p,
                primaryActionPageId: nextId,
                shared: p.shared?.navbar
                  ? {
                      ...p.shared,
                      navbar: {
                        ...p.shared.navbar,
                        actionLabel: dest ? dest.name : p.shared.navbar.actionLabel,
                        actionTarget: nextId ? { kind: "page", pageId: nextId } : null,
                      },
                    }
                  : p.shared,
              };
            })
          }
        >
          <SelectItem value="original">Original section link</SelectItem>
          {project.pages
            .filter((p) => p.template !== "not-found")
            .map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name} · {p.path}
              </SelectItem>
            ))}
        </Select>
        <Text variant="small">Applies to the navbar and hero button on website pages.</Text>
      </div>
      {["login", "signup", "recovery", "dashboard"].includes(page.template) && (
        <Text variant="small">
          Template preview. Authentication and live data are not connected.
        </Text>
      )}
    </div>
  );
}

export function AddPageDialog({
  onAdd,
  onApplyStarterPack,
  onClose,
}: {
  onAdd: (templates: WebsiteTemplate[]) => void;
  onApplyStarterPack?: (packId: WebsiteStarterPackId) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const title = useId();
  const reduced = useReducedMotion();
  const [closing, setClosing] = useState(false);
  const [group, setGroup] = useState("Website");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<WebsiteTemplate>("home");
  useEffect(() => {
    const previous = document.activeElement as HTMLElement;
    ref.current?.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);
  const templates = websiteTemplates.filter((t) =>
    search
      ? `${t.name} ${t.description}`.toLowerCase().includes(search.toLowerCase())
      : t.group === group
  );
  const validSelection = templates.some((t) => t.id === selected);
  return (
    <dialog
      ref={ref}
      aria-labelledby={title}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[min(960px,calc(100%-32px))] max-w-none overflow-y-auto rounded-3xl border border-zinc-200 bg-white p-0 text-zinc-900 shadow-2xl backdrop:bg-zinc-950/35 backdrop:backdrop-blur-sm dark:border-white/10 dark:bg-zinc-950 dark:text-white"
      onCancel={(e) => {
        e.preventDefault();
        setClosing(true);
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: reduced ? 0 : 12 }}
        animate={{ opacity: closing ? 0 : 1, y: closing && !reduced ? 8 : 0 }}
        transition={{ duration: reduced ? 0 : 0.18 }}
        onAnimationComplete={() => {
          if (closing) onClose();
        }}
        className="p-5 sm:p-6"
      >
        <div className="mb-4 flex justify-between gap-4">
          <div>
            <Heading id={title} as="h2" size="h3">
              Add a page
            </Heading>
            <Text variant="muted" className="mt-1">
              Start with a template. Make it yours.
            </Text>
          </div>
          <Button
            variant="plain"
            isIconOnly
            className="min-h-11 min-w-11 shrink-0"
            aria-label="Close add page"
            onClick={() => setClosing(true)}
          >
            <X size={18} />
          </Button>
        </div>
        {onApplyStarterPack && (
          <div className="mb-4 rounded-2xl border border-indigo-500/25 bg-indigo-500/[0.05] p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                <Sparkles size={14} />
                Quick Start: Replace Workspace with a Multipage Starter Kit
              </span>
              <Badge size="sm" variant="flat" color="primary">
                1-Click
              </Badge>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {[
                {
                  id: "saas-complete" as const,
                  name: "SaaS Complete",
                  detail: "11 pages · Landing, Pricing, About, Blog, Auth, Dashboard MVP, 404",
                },
                {
                  id: "startup-launch" as const,
                  name: "Startup Launch",
                  detail: "6 pages · Landing, Pricing, Blog, Login, Sign up, 404",
                },
                {
                  id: "product-studio" as const,
                  name: "Agency & Studio",
                  detail: "5 pages · Landing, About, Contact, Legal, 404",
                },
              ].map((pack) => (
                <button
                  key={pack.id}
                  type="button"
                  onClick={() => {
                    onApplyStarterPack(pack.id);
                    setClosing(true);
                  }}
                  className="rounded-xl border border-zinc-200/80 bg-white/85 p-2.5 text-left transition-colors hover:border-indigo-400 dark:border-white/10 dark:bg-zinc-900/70 dark:hover:border-indigo-400/50"
                >
                  <div className="text-xs font-semibold text-zinc-900 dark:text-white">
                    {pack.name}
                  </div>
                  <div className="mt-0.5 text-[10px] leading-snug text-zinc-500 dark:text-zinc-400">
                    {pack.detail}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
        <Input
          autoFocus
          aria-label="Search page templates"
          placeholder="Search page templates..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClear={() => setSearch("")}
          isClearable={Boolean(search)}
          startContent={<Search size={16} />}
        />
        <div className="my-3.5 flex flex-wrap gap-2" aria-label="Template categories">
          {["Website", "Account", "Dashboard", "System"].map((g) => (
            <Button
              key={g}
              size="sm"
              className="min-h-11 px-4 transition-transform duration-150 active:scale-[0.97]"
              variant={group === g && !search ? "solid" : "outline"}
              aria-pressed={group === g && !search}
              onClick={() => {
                setGroup(g);
                setSearch("");
                setSelected(websiteTemplates.find((t) => t.group === g)!.id);
              }}
            >
              {g}
            </Button>
          ))}
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={search ? `search-${search}` : group}
            initial={reduced ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: reduced ? 0 : 0.16, ease: [0.23, 1, 0.32, 1] }}
            className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
          >
            {templates.map((t) => (
              <Button
                key={t.id}
                variant="outline"
                className={`h-auto min-h-11 min-w-0 flex-col items-stretch p-3 text-left whitespace-normal transition-[border-color,box-shadow,transform] duration-150 active:scale-[0.985] ${
                  selected === t.id
                    ? "border-blue-500 ring-1 ring-blue-500"
                    : "hover:border-zinc-300 dark:hover:border-white/25"
                }`}
                aria-pressed={selected === t.id}
                onClick={() => setSelected(t.id)}
              >
                <div
                  aria-hidden="true"
                  className="mb-2.5 flex h-24 w-full items-center justify-center overflow-hidden rounded-xl bg-zinc-50 p-2.5 dark:bg-zinc-900"
                >
                  {t.group === "Account" ? (
                    <div className="flex w-28 flex-col items-center gap-1.5">
                      <span className="text-[10px] font-semibold">{t.name}</span>
                      <span className="h-2.5 w-full rounded border border-zinc-300 dark:border-zinc-700" />
                      <span className="h-2.5 w-full rounded border border-zinc-300 dark:border-zinc-700" />
                      <span className="mt-0.5 h-2.5 w-full rounded bg-blue-500" />
                    </div>
                  ) : t.id === "not-found" ? (
                    <span className="text-4xl font-semibold text-zinc-400">404</span>
                  ) : t.id === "blog" ? (
                    <div className="flex w-full max-w-[180px] flex-col gap-1.5">
                      <div className="flex items-center gap-1.5">
                        <span className="h-1.5 w-7 rounded-full bg-zinc-800 dark:bg-zinc-200" />
                        <span className="h-1.5 w-9 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                        <span className="h-1.5 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                      </div>
                      <div className="flex gap-1.5 rounded-md border border-zinc-200/80 bg-white p-1 dark:border-white/10 dark:bg-zinc-800/70">
                        <span className="h-7 w-11 shrink-0 rounded bg-zinc-300 dark:bg-zinc-600" />
                        <div className="flex flex-1 flex-col justify-center gap-1">
                          <span className="h-1.5 w-4/5 rounded bg-zinc-700 dark:bg-zinc-300" />
                          <span className="h-1 w-3/5 rounded bg-zinc-300 dark:bg-zinc-600" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        <div className="flex flex-col gap-1 rounded border border-zinc-200/70 bg-white p-1 dark:border-white/10 dark:bg-zinc-800/60">
                          <span className="h-3 w-full rounded-sm bg-zinc-200 dark:bg-zinc-700" />
                          <span className="h-1 w-3/4 rounded bg-zinc-300 dark:bg-zinc-600" />
                        </div>
                        <div className="flex flex-col gap-1 rounded border border-zinc-200/70 bg-white p-1 dark:border-white/10 dark:bg-zinc-800/60">
                          <span className="h-3 w-full rounded-sm bg-zinc-200 dark:bg-zinc-700" />
                          <span className="h-1 w-2/3 rounded bg-zinc-300 dark:bg-zinc-600" />
                        </div>
                      </div>
                    </div>
                  ) : t.id === "blog-post" ? (
                    <div className="flex w-full max-w-[164px] flex-col gap-1.5">
                      <span className="h-1 w-8 rounded bg-zinc-300 dark:bg-zinc-600" />
                      <span className="h-2 w-4/5 rounded bg-zinc-800 dark:bg-zinc-200" />
                      <span className="h-7 w-full rounded-md bg-zinc-300 dark:bg-zinc-700" />
                      <div className="border-l-2 border-zinc-800 pl-1.5 dark:border-zinc-200">
                        <span className="block h-1 w-5/6 rounded bg-zinc-400 dark:bg-zinc-500" />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                        <span className="h-1 w-14 rounded bg-zinc-200 dark:bg-zinc-700" />
                      </div>
                    </div>
                  ) : t.id === "contact" ? (
                    <div className="flex w-full max-w-[176px] gap-2">
                      <div className="flex w-5/12 flex-col justify-between gap-1.5">
                        <div className="space-y-1">
                          <span className="block h-1.5 w-full rounded bg-zinc-700 dark:bg-zinc-200" />
                          <span className="block h-1 w-4/5 rounded bg-zinc-300 dark:bg-zinc-600" />
                        </div>
                        <div className="flex h-7 items-center justify-center rounded-md border border-zinc-200/80 bg-zinc-200/60 dark:border-white/10 dark:bg-zinc-800">
                          <span className="h-2 w-2 rounded-full bg-blue-500" />
                        </div>
                      </div>
                      <div className="flex w-7/12 flex-col gap-1.5 rounded-md border border-zinc-200/80 bg-white p-1.5 dark:border-white/10 dark:bg-zinc-800/70">
                        <div className="flex gap-1.5 border-b border-zinc-200/80 pb-1 dark:border-white/10">
                          <span className="h-1 w-8 rounded-full bg-zinc-800 dark:bg-zinc-200" />
                          <span className="h-1 w-7 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                        </div>
                        <span className="h-2.5 w-full rounded border border-zinc-200 dark:border-zinc-700" />
                        <span className="h-2.5 w-full rounded border border-zinc-200 dark:border-zinc-700" />
                        <span className="h-3 w-full rounded bg-blue-500" />
                      </div>
                    </div>
                  ) : t.id === "legal" ? (
                    <div className="flex w-full max-w-[176px] flex-col gap-1.5">
                      <div className="flex items-center justify-between border-b border-zinc-200/80 pb-1 dark:border-white/10">
                        <div className="flex gap-1.5">
                          <span className="h-1 w-7 rounded-full bg-zinc-800 dark:bg-zinc-200" />
                          <span className="h-1 w-6 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                          <span className="h-1 w-6 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                        </div>
                        <span className="h-2 w-5 rounded bg-zinc-200 dark:bg-zinc-700" />
                      </div>
                      <div className="flex gap-2">
                        <div className="flex w-4/12 flex-col gap-1 rounded-md border border-zinc-200/80 bg-white p-1 dark:border-white/10 dark:bg-zinc-800/70">
                          <span className="h-1.5 w-full rounded bg-blue-500/85" />
                          <span className="h-1 w-4/5 rounded bg-zinc-300 dark:bg-zinc-600" />
                          <span className="h-1 w-5/6 rounded bg-zinc-200 dark:bg-zinc-700" />
                          <span className="h-1 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
                        </div>
                        <div className="flex w-8/12 flex-col gap-1.5 rounded-md border border-zinc-200/80 bg-white p-1.5 dark:border-white/10 dark:bg-zinc-800/70">
                          <span className="h-1.5 w-16 rounded bg-zinc-700 dark:bg-zinc-200" />
                          <div className="border-l-2 border-zinc-800 pl-1 dark:border-zinc-200">
                            <span className="block h-1 w-full rounded bg-zinc-300 dark:bg-zinc-600" />
                          </div>
                          <span className="h-1 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
                          <span className="h-1 w-4/5 rounded bg-zinc-200 dark:bg-zinc-700" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex w-full gap-3">
                      <div className="flex w-1/2 flex-col gap-2">
                        <span className="h-2 w-full rounded bg-zinc-300 dark:bg-zinc-600" />
                        <span className="h-2 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
                        <span className="mt-3 h-3 w-2/3 rounded bg-blue-500" />
                      </div>
                      <span className="h-16 flex-1 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                  )}
                </div>
                <span className="text-sm font-semibold">{t.name}</span>
                <span className="mt-1 text-xs leading-relaxed font-normal text-zinc-500 dark:text-zinc-400">
                  {t.description}
                </span>
              </Button>
            ))}
          </motion.div>
        </AnimatePresence>
        {!templates.length && (
          <Text variant="muted" className="py-10 text-center">
            No matching templates. Try “blog”, “legal”, or “pricing”.
          </Text>
        )}
        {group === "Website" && !search && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-4 dark:border-white/10">
            <div>
              <Text weight="medium">Want the complete blog flow?</Text>
              <Text variant="small">
                Add Blog index and Single Post together with navigation between them.
              </Text>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="min-h-11 px-4"
              startContent={<Link2 size={14} />}
              onClick={() => onAdd(["blog", "blog-post"])}
            >
              Add blog set
            </Button>
          </div>
        )}
        {group === "Account" && !search && (
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-4 dark:border-white/10">
            <div>
              <Text weight="medium">Need the full account flow?</Text>
              <Text variant="small">Add login, sign up, and recovery with links between them.</Text>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="min-h-11 px-4"
              startContent={<Link2 size={14} />}
              onClick={() => onAdd(["login", "signup", "recovery"])}
            >
              Add page set
            </Button>
          </div>
        )}
        <div className="mt-4 flex justify-end gap-2 border-t border-zinc-200 pt-4 dark:border-white/10">
          <Button variant="plain" className="min-h-11 px-4" onClick={() => setClosing(true)}>
            Cancel
          </Button>
          <Button
            color="primary"
            className="min-h-11 px-5"
            disabled={!validSelection}
            onClick={() => onAdd([selected])}
          >
            Add page
          </Button>
        </div>
      </motion.div>
    </dialog>
  );
}

export function PageSettingsDialog({
  project,
  onChange,
  onClose,
}: {
  project: WebsiteProjectConfig;
  onChange: Update;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <aside
      aria-label="Page settings"
      className="fixed top-16 right-3 bottom-3 z-40 w-[calc(100vw-24px)] max-w-[336px] overflow-y-auto rounded-2xl border border-zinc-200/80 bg-white/95 p-5 text-zinc-900 shadow-2xl backdrop-blur-xl sm:right-4 sm:bottom-4 dark:border-white/[0.08] dark:bg-[#161618]/95 dark:text-white"
    >
      <PageSettings
        key={project.activePageId}
        project={project}
        onChange={onChange}
        onClose={onClose}
      />
    </aside>
  );
}
