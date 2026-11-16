import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Badge, Button, Heading, Text } from "@hudbird/ui";
import {
  collectLinkedPageIds,
  findOrphanPages,
  getEffectiveAuthConfig,
  getEffectiveDashboardConfig,
  getEffectiveNotFoundConfig,
  getEffectiveSharedSections,
  resolveLinkTarget,
  websiteTemplates,
  type WebsiteProjectConfig,
} from "@hudbird/marketing";
import { AlertTriangle, ArrowRight, CheckCircle2, GitBranch, Layers, Plus, X } from "lucide-react";
import { BUTTON_PRESS_CLASS, modalTransition } from "./motionPresets";

export interface SiteFlowModalProps {
  project: WebsiteProjectConfig;
  onSelectPage: (pageId: string) => void;
  onAddPageToNavbar: (pageId: string) => void;
  onClose: () => void;
}

export function SiteFlowModal({
  project,
  onSelectPage,
  onAddPageToNavbar,
  onClose,
}: SiteFlowModalProps) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const titleId = React.useId();
  const reduced = useReducedMotion();
  const [closing, setClosing] = React.useState(false);

  React.useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    ref.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  const linkedIds = React.useMemo(() => collectLinkedPageIds(project), [project]);
  const orphans = React.useMemo(() => findOrphanPages(project), [project]);
  const shared = React.useMemo(() => getEffectiveSharedSections(project), [project]);
  const auth = React.useMemo(() => getEffectiveAuthConfig(project), [project]);
  const dash = React.useMemo(() => getEffectiveDashboardConfig(project), [project]);
  const nf = React.useMemo(() => getEffectiveNotFoundConfig(project), [project]);

  const groups: ("Website" | "Account" | "Dashboard" | "System")[] = [
    "Website",
    "Account",
    "Dashboard",
    "System",
  ];

  const keyFlows = [
    {
      label: "Primary CTA",
      from: "Navbar & Hero",
      to: shared.navbar?.actionTarget
        ? (resolveLinkTarget(project, shared.navbar.actionTarget).page?.name ?? "Unlinked")
        : project.primaryActionPageId
          ? (project.pages.find((p) => p.id === project.primaryActionPageId)?.name ?? "None")
          : "None",
    },
    {
      label: "After Login / Sign Up",
      from: "Account Pages",
      to: auth.postAuthPageId
        ? (project.pages.find((p) => p.id === auth.postAuthPageId)?.name ?? "Not linked")
        : "Stay on form",
    },
    {
      label: "Dashboard Return",
      from: "Overview (/app)",
      to: dash.backToSitePageId
        ? (project.pages.find((p) => p.id === dash.backToSitePageId)?.name ?? "Home")
        : "Home",
    },
    {
      label: "404 Recovery",
      from: "Missing Route (/404)",
      to: resolveLinkTarget(project, nf.primaryActionTarget).page?.name ?? "Home",
    },
  ];

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        setClosing(true);
      }}
      className="fixed inset-0 m-auto max-h-[90dvh] w-[min(920px,calc(100%-32px))] max-w-none overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-0 text-zinc-900 shadow-2xl backdrop:bg-zinc-950/45 backdrop:backdrop-blur-sm dark:border-white/10 dark:bg-[#161618] dark:text-white"
    >
      <motion.div
        initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
        animate={{
          opacity: closing ? 0 : 1,
          scale: closing ? (reduced ? 1 : 0.96) : 1,
        }}
        transition={modalTransition(reduced)}
        onAnimationComplete={() => {
          if (closing) onClose();
        }}
        className="space-y-5 p-5 sm:p-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 text-primary flex h-9 w-9 shrink-0 items-center justify-center rounded-xl">
              <GitBranch className="h-4 w-4" />
            </div>
            <div>
              <Heading id={titleId} as="h2" size="h4">
                Site Flow &amp; Link Audit
              </Heading>
              <Text variant="muted" className="mt-0.5 text-xs">
                Inspect how pages connect across Website, Auth, Dashboard MVP, and 404 recovery.
                Click any page node to jump there.
              </Text>
            </div>
          </div>
          <Button
            variant="plain"
            isIconOnly
            size="sm"
            aria-label="Close site flow map"
            onClick={() => setClosing(true)}
          >
            <X size={16} />
          </Button>
        </div>

        {/* Key Cross-Page Journey Cards */}
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {keyFlows.map((flow) => (
            <div
              key={flow.label}
              className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]"
            >
              <div className="text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
                {flow.label}
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200">
                <span className="truncate">{flow.from}</span>
                <ArrowRight className="h-3 w-3 shrink-0 text-zinc-400" />
                <span className="text-primary truncate font-semibold">{flow.to}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Orphan Page Health Banner */}
        {orphans.length > 0 ? (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-300">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>
                {orphans.length} unreachable page{orphans.length > 1 ? "s" : ""} detected (not
                linked in navbar, footer, auth, or dashboard)
              </span>
            </div>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {orphans.map((page) => (
                <div
                  key={page.id}
                  className="flex items-center gap-2 rounded-lg border border-amber-500/25 bg-white/80 px-2.5 py-1 text-xs dark:bg-zinc-900/80"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPage(page.id);
                      setClosing(true);
                    }}
                    className="font-medium text-zinc-900 hover:underline dark:text-zinc-100"
                  >
                    {page.name}{" "}
                    <span className="font-mono text-[10px] text-zinc-400">({page.path})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onAddPageToNavbar(page.id)}
                    className={`bg-primary inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-semibold text-white hover:opacity-90 ${BUTTON_PRESS_CLASS}`}
                  >
                    <Plus className="h-2.5 w-2.5" />
                    Add to Navbar
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="h-4 w-4 shrink-0" />
            <span>Every page in this workspace is connected and reachable.</span>
          </div>
        )}

        {/* Architecture Node Columns */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((groupName) => {
            const pages = project.pages.filter(
              (p) => websiteTemplates.find((t) => t.id === p.template)?.group === groupName
            );
            return (
              <div
                key={groupName}
                className="flex flex-col gap-2 rounded-xl border border-zinc-200/80 bg-zinc-50/50 p-3 dark:border-white/[0.08] dark:bg-white/[0.02]"
              >
                <div className="flex items-center justify-between text-[11px] font-bold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
                  <span>{groupName}</span>
                  <span className="tabular-nums">{pages.length}</span>
                </div>
                {pages.length === 0 ? (
                  <p className="py-4 text-center text-[11px] text-zinc-400">No pages in group</p>
                ) : (
                  <div className="space-y-1.5">
                    {pages.map((p) => {
                      const isActive = p.id === project.activePageId;
                      const isLinked = linkedIds.has(p.id) || p.template === "not-found";
                      const inheritsHeader = (p.sharedMode?.navbar ?? "inherit") === "inherit";
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            onSelectPage(p.id);
                            setClosing(true);
                          }}
                          className={`w-full rounded-lg border p-2.5 text-left ${BUTTON_PRESS_CLASS} ${
                            isActive
                              ? "border-primary bg-primary/10 dark:border-primary/60 dark:bg-primary/15"
                              : "border-zinc-200/70 bg-white hover:border-zinc-300 dark:border-white/[0.06] dark:bg-[#1c1c20] dark:hover:border-white/[0.15]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-xs font-semibold text-zinc-900 dark:text-white">
                              {p.name}
                            </span>
                            {!isLinked && (
                              <Badge size="sm" variant="flat" color="warning">
                                Orphan
                              </Badge>
                            )}
                          </div>
                          <div className="mt-1 flex items-center justify-between gap-2 text-[10px] text-zinc-500 dark:text-zinc-400">
                            <span className="truncate font-mono">{p.path}</span>
                            {groupName === "Website" && (
                              <span
                                title="Global header status"
                                className="inline-flex shrink-0 items-center gap-0.5 text-[9px]"
                              >
                                <Layers className="h-2.5 w-2.5" />
                                {inheritsHeader ? "Synced" : (p.sharedMode?.navbar ?? "Synced")}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>
    </dialog>
  );
}
