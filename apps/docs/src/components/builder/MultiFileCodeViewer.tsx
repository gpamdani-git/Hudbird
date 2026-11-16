import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  createModularWebsiteProjectFiles,
  resolvePageFilePath,
  resolveSectionFilePath,
  WebsiteProjectPage,
  type WebsiteExportFile,
  type WebsiteProjectConfig,
} from "@hudbird/marketing";
import {
  AlertTriangle,
  Check,
  ChevronDown,
  ChevronRight,
  Columns2,
  Copy,
  Download,
  Eye,
  FileCode2,
  FileJson,
  FileType,
  FolderOpen,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import { IframePreview } from "../IframePreview";
import {
  applyLiveCodeChange,
  revertCustomFileToSynced,
  type CodeSyncDiagnostic,
} from "./liveCodeSync";
import { createSandboxRenderHooks } from "./liveSandboxRenderer";
import { BUTTON_PRESS_CLASS, popoverTransition } from "./motionPresets";

const LazyCodeMirrorEditor = React.lazy(() => import("./LazyCodeMirrorEditor"));

export interface MultiFileCodeViewerProps {
  project: WebsiteProjectConfig;
  onChangeProject?: (updater: (prev: WebsiteProjectConfig) => WebsiteProjectConfig) => void;
  initialFilePath?: string;
  activePageId?: string;
  onSelectPage?: (pageId: string) => void;
  themeMode?: "light" | "dark";
}

function downloadTextFile(filename: string, content: string, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

interface GroupedFiles {
  id: string;
  label: string;
  files: WebsiteExportFile[];
}

function groupProjectFiles(files: WebsiteExportFile[]): GroupedFiles[] {
  const entryFiles: WebsiteExportFile[] = [];
  const pageFiles: WebsiteExportFile[] = [];
  const sectionFolders = new Map<string, WebsiteExportFile[]>();
  const styleAndDataFiles: WebsiteExportFile[] = [];

  for (const f of files) {
    if (
      f.path === "src/App.tsx" ||
      f.path === "src/StandaloneApp.tsx" ||
      f.path === "src/routes.ts"
    ) {
      entryFiles.push(f);
    } else if (f.path.startsWith("src/pages/")) {
      pageFiles.push(f);
    } else if (f.path.startsWith("src/sections/")) {
      const parts = f.path.split("/");
      const folder = parts[2] ?? "misc";
      if (!sectionFolders.has(folder)) sectionFolders.set(folder, []);
      sectionFolders.get(folder)!.push(f);
    } else {
      styleAndDataFiles.push(f);
    }
  }

  const groups: GroupedFiles[] = [];
  if (entryFiles.length) groups.push({ id: "entry", label: "App & Routes", files: entryFiles });
  if (pageFiles.length) groups.push({ id: "pages", label: "Pages", files: pageFiles });
  for (const [folder, list] of sectionFolders.entries()) {
    groups.push({
      id: `sec-${folder}`,
      label: folder === "shared" ? "Shared Sections" : `Sections / ${folder}`,
      files: list,
    });
  }
  if (styleAndDataFiles.length) {
    groups.push({ id: "tokens", label: "Tokens & Recipe", files: styleAndDataFiles });
  }
  return groups;
}

export function MultiFileCodeViewer({
  project,
  onChangeProject,
  initialFilePath,
  activePageId,
  onSelectPage,
  themeMode = "dark",
}: MultiFileCodeViewerProps) {
  const reduced = useReducedMotion();
  const files = React.useMemo(() => createModularWebsiteProjectFiles(project), [project]);
  const groups = React.useMemo(() => groupProjectFiles(files), [files]);

  const fallbackPath = React.useMemo(() => {
    if (initialFilePath && files.some((f) => f.path === initialFilePath)) return initialFilePath;
    if (activePageId) {
      const p = resolvePageFilePath(project, activePageId);
      if (files.some((f) => f.path === p)) return p;
    }
    return files[0]?.path ?? "src/App.tsx";
  }, [initialFilePath, activePageId, project, files]);

  const [activePath, setActivePath] = React.useState(fallbackPath);
  const [copiedPath, setCopiedPath] = React.useState<string | null>(null);
  const [splitPreview, setSplitPreview] = React.useState(true);
  const [mobilePane, setMobilePane] = React.useState<"code" | "preview">("code");
  const [collapsedGroups, setCollapsedGroups] = React.useState<Record<string, boolean>>({});

  React.useEffect(() => {
    if (initialFilePath && files.some((f) => f.path === initialFilePath)) {
      setActivePath(initialFilePath);
    }
  }, [initialFilePath, files]);

  const activeFile = files.find((f) => f.path === activePath) ?? files[0];

  const [draftCode, setDraftCode] = React.useState(activeFile.content);
  const [diagnostic, setDiagnostic] = React.useState<CodeSyncDiagnostic | null>(null);
  const [lastValidProject, setLastValidProject] = React.useState<WebsiteProjectConfig>(project);
  const debounceTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const activePathRef = React.useRef(activeFile.path);
  const lastCommittedRef = React.useRef<string>(activeFile.content);

  // Sync draft when switching active file OR when external Visual Builder modifies active file cleanly
  React.useEffect(() => {
    const switchedFile = activePathRef.current !== activeFile.path;
    activePathRef.current = activeFile.path;
    if (switchedFile || (!diagnostic && activeFile.content !== lastCommittedRef.current)) {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
      setDraftCode(activeFile.content);
      lastCommittedRef.current = activeFile.content;
      setDiagnostic(null);
    }
  }, [activeFile.path, activeFile.content, diagnostic]);

  React.useEffect(() => {
    if (!diagnostic) {
      setLastValidProject(project);
    }
  }, [project, diagnostic]);

  const commitCodeChange = React.useCallback(
    (codeToApply: string, fileMeta: WebsiteExportFile) => {
      if (!onChangeProject) return;
      const result = applyLiveCodeChange(project, fileMeta, codeToApply);
      if (result.status === "error") {
        setDiagnostic(
          result.diagnostic ?? { message: "Syntax or validation error in edited file", line: 1 }
        );
        return;
      }
      setDiagnostic(null);
      lastCommittedRef.current = codeToApply;
      setLastValidProject(result.project);
      onChangeProject(() => result.project);
    },
    [onChangeProject, project]
  );

  const handleEditorChange = React.useCallback(
    (nextVal: string) => {
      setDraftCode(nextVal);
      if (!onChangeProject) return;
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
      const capturedFile = activeFile;
      debounceTimerRef.current = setTimeout(() => {
        commitCodeChange(nextVal, capturedFile);
      }, 340);
    },
    [activeFile, commitCodeChange, onChangeProject]
  );

  const handleSaveImmediate = React.useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    commitCodeChange(draftCode, activeFile);
  }, [activeFile, commitCodeChange, draftCode]);

  const handleRevertToSynced = () => {
    if (!onChangeProject) return;
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    const reverted = revertCustomFileToSynced(project, activeFile.path);
    const cleanText = activeFile.syncedContent ?? activeFile.content;
    lastCommittedRef.current = cleanText;
    setDraftCode(cleanText);
    setDiagnostic(null);
    onChangeProject(() => reverted);
  };

  React.useEffect(
    () => () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    },
    []
  );

  const handleCopyFile = async () => {
    await navigator.clipboard.writeText(draftCode);
    setCopiedPath(activeFile.path);
    window.setTimeout(() => setCopiedPath(null), 1800);
  };

  const handleDownloadBundle = () => {
    const bundle = {
      schema: "hudbird.multipage.modular-bundle.v2",
      projectName: project.name,
      generatedAt: new Date().toISOString(),
      files: Object.fromEntries(files.map((f) => [f.path, f.content])),
    };
    const slug = project.brand.id || "hudbird-website";
    downloadTextFile(
      `${slug}-modular-bundle.json`,
      JSON.stringify(bundle, null, 2),
      "application/json"
    );
  };

  const lineCount = React.useMemo(() => draftCode.split("\n").length, [draftCode]);
  const previewProject = diagnostic ? lastValidProject : project;
  const previewPageId =
    activeFile.pageId ?? activePageId ?? previewProject.activePageId ?? previewProject.pages[0]?.id;
  const sandboxHooks = React.useMemo(
    () => createSandboxRenderHooks(previewProject),
    [previewProject]
  );

  const statusPill = diagnostic ? (
    <span className="inline-flex items-center gap-1 rounded-full border border-rose-500/35 bg-rose-500/12 px-2 py-0.5 text-[10px] font-semibold text-rose-600 dark:text-rose-300">
      <AlertTriangle className="h-3 w-3" />
      <span>{diagnostic.line ? `Error · Line ${diagnostic.line}` : "Syntax Error"}</span>
    </span>
  ) : activeFile.isCustomOverride ? (
    <span className="inline-flex items-center gap-1 rounded-full border border-indigo-500/35 bg-indigo-500/12 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-300">
      <Sparkles className="h-3 w-3" />
      <span>Custom TSX</span>
    </span>
  ) : onChangeProject ? (
    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/35 bg-emerald-500/12 px-2 py-0.5 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      <span>Live 2-Way Sync</span>
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 rounded-full border border-zinc-300/60 bg-zinc-200/50 px-2 py-0.5 text-[10px] font-medium text-zinc-600 dark:border-white/10 dark:bg-white/[0.06] dark:text-zinc-400">
      Read-only
    </span>
  );

  // Quick helper to jump active file back to currently viewed section
  const activePageObj = project.pages.find((p) => p.id === previewPageId);
  const firstHeroPath = activePageObj
    ? resolveSectionFilePath(project, activePageObj.id, "hero")
    : null;

  return (
    <div className="flex h-[calc(100vh-148px)] min-h-[560px] w-full flex-col overflow-hidden rounded-2xl border border-zinc-200/85 bg-white shadow-xl dark:border-white/[0.08] dark:bg-[#111114]">
      {/* Top IDE Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-zinc-200/80 bg-zinc-50/95 px-3.5 py-2 dark:border-white/[0.08] dark:bg-[#161619]">
        <div className="flex min-w-0 items-center gap-2.5">
          <FolderOpen className="h-4 w-4 shrink-0 text-zinc-400" />
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                {activeFile.path}
              </span>
              {statusPill}
            </div>
            <div className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
              {activeFile.description} · {lineCount} lines
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {activeFile.isCustomOverride && onChangeProject && (
            <button
              type="button"
              onClick={handleRevertToSynced}
              title="Discard custom JSX override and revert back to Visual Builder synced source"
              className={`inline-flex h-7 items-center gap-1 rounded-lg border border-indigo-500/35 bg-indigo-500/10 px-2.5 text-[11px] font-medium text-indigo-600 hover:bg-indigo-500/20 dark:text-indigo-300 ${BUTTON_PRESS_CLASS}`}
            >
              <RotateCcw className="h-3 w-3" />
              <span>Revert to synced</span>
            </button>
          )}

          {/* Mobile Code/Preview Switch */}
          <div className="inline-flex h-7 items-center rounded-lg border border-zinc-200 bg-white p-0.5 lg:hidden dark:border-white/[0.1] dark:bg-white/[0.04]">
            <button
              type="button"
              onClick={() => setMobilePane("code")}
              className={`inline-flex h-6 items-center gap-1 rounded-md px-2 text-[11px] font-medium ${
                mobilePane === "code"
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                  : "text-zinc-600 dark:text-zinc-300"
              }`}
            >
              <FileCode2 className="h-3 w-3" />
              Code
            </button>
            <button
              type="button"
              onClick={() => setMobilePane("preview")}
              className={`inline-flex h-6 items-center gap-1 rounded-md px-2 text-[11px] font-medium ${
                mobilePane === "preview"
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950"
                  : "text-zinc-600 dark:text-zinc-300"
              }`}
            >
              <Eye className="h-3 w-3" />
              Live
            </button>
          </div>

          <button
            type="button"
            onClick={() => setSplitPreview((prev) => !prev)}
            aria-pressed={splitPreview}
            title="Toggle side-by-side Live Preview"
            className={`hidden h-7 items-center gap-1.5 rounded-lg border px-2.5 text-[11px] font-medium lg:inline-flex ${BUTTON_PRESS_CLASS} ${
              splitPreview
                ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-600 dark:border-indigo-400/40 dark:bg-indigo-500/15 dark:text-indigo-300"
                : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:bg-white/[0.08]"
            }`}
          >
            <Columns2 className="h-3 w-3" />
            <span>Split Preview</span>
          </button>

          <button
            type="button"
            onClick={() => {
              const filename = activeFile.path.split("/").pop() ?? "export.txt";
              downloadTextFile(filename, draftCode);
            }}
            className={`inline-flex h-7 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 text-[11px] font-medium text-zinc-700 hover:bg-zinc-50 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:bg-white/[0.08] ${BUTTON_PRESS_CLASS}`}
          >
            <Download className="h-3 w-3" />
            <span className="hidden sm:inline">Download</span>
          </button>

          <button
            type="button"
            onClick={handleCopyFile}
            className={`inline-flex h-7 items-center gap-1.5 rounded-lg bg-zinc-900 px-3 text-[11px] font-semibold text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 ${BUTTON_PRESS_CLASS}`}
          >
            {copiedPath === activeFile.path ? (
              <>
                <Check className="h-3 w-3 text-emerald-400 dark:text-emerald-600" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleDownloadBundle}
            className={`inline-flex h-7 items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-2.5 text-[11px] font-medium text-zinc-700 hover:bg-zinc-50 dark:border-white/[0.1] dark:bg-white/[0.04] dark:text-zinc-200 dark:hover:bg-white/[0.08] ${BUTTON_PRESS_CLASS}`}
          >
            <Download className="h-3 w-3" />
            <span>Bundle (.json)</span>
          </button>
        </div>
      </div>

      {/* Diagnostic Banner (preserves last valid preview frame below/beside editor) */}
      <AnimatePresence>
        {diagnostic && (
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -4 }}
            transition={popoverTransition(reduced)}
            role="status"
            className="flex items-center justify-between gap-2 border-b border-rose-500/30 bg-rose-500/10 px-4 py-1.5 text-[11px] text-rose-700 dark:text-rose-200"
          >
            <div className="flex min-w-0 items-center gap-2">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
              <span className="truncate font-mono">
                {diagnostic.line ? `L${diagnostic.line}: ` : ""}
                {diagnostic.message}
              </span>
            </div>
            <span className="shrink-0 text-[10px] opacity-80">Holding last valid preview</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Workspace: Explorer Tree + CodeMirror Editor + Split Live Preview */}
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        {/* Explorer File Tree */}
        <aside
          aria-label="Project source files"
          className="max-h-44 w-full shrink-0 overflow-y-auto border-b border-zinc-200/80 bg-zinc-50/70 p-2 md:max-h-none md:w-56 md:border-r md:border-b-0 dark:border-white/[0.08] dark:bg-[#131316]"
        >
          <div className="flex items-center justify-between px-2 py-1 text-[10px] font-bold tracking-wider text-zinc-400 uppercase">
            <span>Project Files ({files.length})</span>
            {firstHeroPath && files.some((f) => f.path === firstHeroPath) && (
              <button
                type="button"
                onClick={() => setActivePath(firstHeroPath)}
                className="font-mono text-[9px] text-indigo-500 hover:underline dark:text-indigo-400"
              >
                Hero
              </button>
            )}
          </div>

          <div className="space-y-1.5">
            {groups.map((group) => {
              const isCollapsed = Boolean(collapsedGroups[group.id]);
              return (
                <div key={group.id} className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      setCollapsedGroups((prev) => ({ ...prev, [group.id]: !prev[group.id] }))
                    }
                    className="flex w-full items-center gap-1 rounded-md px-1.5 py-1 text-left text-[10px] font-semibold tracking-wide text-zinc-500 uppercase hover:bg-zinc-200/40 dark:text-zinc-400 dark:hover:bg-white/[0.04]"
                  >
                    {isCollapsed ? (
                      <ChevronRight className="h-3 w-3 shrink-0 opacity-70" />
                    ) : (
                      <ChevronDown className="h-3 w-3 shrink-0 opacity-70" />
                    )}
                    <span className="truncate">{group.label}</span>
                  </button>

                  {!isCollapsed && (
                    <div className="space-y-0.5 pl-1">
                      {group.files.map((file) => {
                        const selected = file.path === activeFile.path;
                        const shortName = file.path
                          .replace(/^src\/sections\/[^/]+\//, "")
                          .replace(/^src\/pages\//, "")
                          .replace(/^src\/styles\//, "")
                          .replace(/^src\/data\//, "")
                          .replace(/^src\//, "");
                        const Icon =
                          file.language === "css"
                            ? FileType
                            : file.language === "json"
                              ? FileJson
                              : FileCode2;
                        const badgeColor =
                          file.language === "css"
                            ? "text-sky-500"
                            : file.language === "json"
                              ? "text-amber-500"
                              : "text-indigo-500";
                        return (
                          <button
                            key={file.path}
                            type="button"
                            onClick={() => {
                              setActivePath(file.path);
                              if (file.pageId && onSelectPage) {
                                onSelectPage(file.pageId);
                              }
                            }}
                            aria-current={selected ? "page" : undefined}
                            title={file.path}
                            className={`flex w-full items-center justify-between gap-1.5 rounded-lg px-2 py-1.5 text-left text-xs ${BUTTON_PRESS_CLASS} ${
                              selected
                                ? "bg-zinc-900 font-medium text-white shadow-2xs dark:bg-white/[0.12] dark:text-white"
                                : "text-zinc-600 hover:bg-zinc-200/50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.04] dark:hover:text-zinc-200"
                            }`}
                          >
                            <span className="flex min-w-0 items-center gap-1.5">
                              <Icon
                                className={`h-3.5 w-3.5 shrink-0 ${
                                  selected ? "text-current" : badgeColor
                                }`}
                              />
                              <span className="truncate font-mono text-[11px]">{shortName}</span>
                            </span>
                            <span className="flex shrink-0 items-center gap-1">
                              {file.isCustomOverride && (
                                <span
                                  className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                                  title="Custom TSX override"
                                />
                              )}
                              <span className="font-mono text-[9px] uppercase opacity-60">
                                {file.language}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </aside>

        {/* CodeMirror 6 IDE Viewport */}
        <div
          data-testid="live-code-editor-pane"
          className={`min-h-0 flex-1 overflow-hidden bg-white dark:bg-[#0d0d10] ${
            mobilePane === "preview" ? "hidden lg:block" : "block"
          }`}
        >
          <React.Suspense
            fallback={
              <div className="flex h-full items-center justify-center p-6 font-mono text-xs text-zinc-500 dark:text-zinc-400">
                Loading CodeMirror 6 IDE...
              </div>
            }
          >
            <LazyCodeMirrorEditor
              value={draftCode}
              language={activeFile.language}
              themeMode={themeMode}
              readOnly={!onChangeProject}
              diagnostic={diagnostic}
              onChange={handleEditorChange}
              onSaveShortcut={handleSaveImmediate}
            />
          </React.Suspense>
        </div>

        {/* Live Split Preview Canvas Pane */}
        {(splitPreview || mobilePane === "preview") && (
          <div
            data-testid="live-code-split-preview"
            className={`min-h-0 flex-col border-t border-zinc-200/80 bg-zinc-50/70 md:border-t-0 md:border-l dark:border-white/[0.08] dark:bg-[#141418] ${
              mobilePane === "preview"
                ? "flex flex-1 lg:w-[44%] lg:flex-none lg:shrink-0"
                : "hidden lg:flex lg:w-[44%] lg:shrink-0"
            }`}
          >
            <div className="flex items-center justify-between border-b border-zinc-200/80 bg-white/80 px-3 py-1.5 text-[11px] dark:border-white/[0.08] dark:bg-[#161619]">
              <span className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>
                  Live Preview ·{" "}
                  {previewProject.pages.find((p) => p.id === previewPageId)?.name ?? "Page"}
                </span>
              </span>
              <span className="font-mono text-[10px] text-zinc-400">
                {previewProject.pages.find((p) => p.id === previewPageId)?.path ?? "/"}
              </span>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-3">
              <IframePreview
                flush
                minHeight={420}
                themeMode={themeMode}
                interactionMode="navigate"
                virtualWidth={1280}
              >
                <WebsiteProjectPage
                  project={{
                    ...previewProject,
                    brand: { ...previewProject.brand, mode: themeMode },
                    themeMode,
                  }}
                  pageId={previewPageId ?? ""}
                  interactionMode="navigate"
                  renderCustomPage={sandboxHooks.renderCustomPage}
                  renderCustomSection={sandboxHooks.renderCustomSection}
                  onNavigate={(nextId) => {
                    onSelectPage?.(nextId);
                  }}
                />
              </IframePreview>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
