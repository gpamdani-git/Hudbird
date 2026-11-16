import * as React from "react";
import * as ReactJsxRuntime from "react/jsx-runtime";
import * as ReactDom from "react-dom";
import * as HudbirdUi from "@hudbird/ui";
import * as HudbirdMarketing from "@hudbird/marketing";
import * as LucideReact from "lucide-react";
import * as MotionReact from "motion/react";
import * as FramerMotion from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { transform } from "sucrase";
import { createModularWebsiteProjectFiles, type WebsiteProjectConfig } from "@hudbird/marketing";

export interface SandboxError {
  message: string;
  line?: number;
  column?: number;
}

export interface CompiledModuleSuccess {
  ok: true;
  exports: Record<string, unknown>;
  defaultComponent: React.ComponentType<Record<string, unknown>> | null;
}

export interface CompiledModuleFailure {
  ok: false;
  message: string;
  line?: number;
  column?: number;
}

export type CompiledModuleResult = CompiledModuleSuccess | CompiledModuleFailure;

export function isCompiledError(res: CompiledModuleResult): res is CompiledModuleFailure {
  return res.ok === false;
}

const EXTERNAL_MODULES: Record<string, unknown> = {
  react: { ...React, default: React },
  "react/jsx-runtime": ReactJsxRuntime,
  "react-dom": { ...ReactDom, default: ReactDom },
  "@hudbird/ui": HudbirdUi,
  "@hudbird/marketing": HudbirdMarketing,
  "@hudbird/schemas": {},
  "lucide-react": LucideReact,
  "motion/react": MotionReact,
  "framer-motion": FramerMotion,
  clsx: { clsx, default: clsx },
  "tailwind-merge": { twMerge },
};

function normalizeVirtualPath(fromFile: string, specifier: string): string | null {
  if (!specifier.startsWith(".")) return null;
  const baseParts = fromFile.split("/").slice(0, -1);
  for (const part of specifier.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") {
      baseParts.pop();
    } else {
      baseParts.push(part);
    }
  }
  return baseParts.join("/");
}

function resolveVirtualModulePath(
  fromFile: string,
  specifier: string,
  fileMap: Map<string, string>
): string | null {
  const joined = normalizeVirtualPath(fromFile, specifier);
  if (!joined) return null;
  const candidates = [
    joined,
    `${joined}.tsx`,
    `${joined}.ts`,
    `${joined}.json`,
    `${joined}/index.tsx`,
  ];
  return candidates.find((c) => fileMap.has(c)) ?? null;
}

function extractErrorLocation(err: unknown): { line?: number; column?: number; message: string } {
  if (err && typeof err === "object") {
    const obj = err as { message?: string; loc?: { line?: number; column?: number } };
    const message = String(obj.message || err);
    if (obj.loc && typeof obj.loc.line === "number") {
      return { line: obj.loc.line, column: obj.loc.column, message };
    }
    const lineColMatch = /\((\d+):(\d+)\)/.exec(message);
    if (lineColMatch) {
      return {
        line: Number(lineColMatch[1]),
        column: Number(lineColMatch[2]),
        message,
      };
    }
    return { message };
  }
  return { message: String(err) };
}

export function buildVirtualFileMap(
  project: WebsiteProjectConfig,
  overridePath?: string,
  overrideContent?: string
): Map<string, string> {
  const files = createModularWebsiteProjectFiles(project);
  const map = new Map<string, string>();
  for (const f of files) {
    map.set(f.path, f.content);
  }
  if (project.customFiles) {
    for (const [k, v] of Object.entries(project.customFiles)) {
      map.set(k, v);
    }
  }
  if (overridePath !== undefined && overrideContent !== undefined) {
    map.set(overridePath, overrideContent);
  }
  return map;
}

export function compileTsxSourceToModule(
  entryPath: string,
  fileMap: Map<string, string>,
  cache = new Map<string, Record<string, unknown>>(),
  visiting = new Set<string>()
): CompiledModuleResult {
  const source = fileMap.get(entryPath);
  if (typeof source !== "string") {
    return { ok: false, message: `File not found in workspace: ${entryPath}` };
  }
  if (cache.has(entryPath)) {
    const cached = cache.get(entryPath)!;
    const def = cached.default;
    return {
      ok: true,
      exports: cached,
      defaultComponent:
        typeof def === "function" ? (def as React.ComponentType<Record<string, unknown>>) : null,
    };
  }
  if (visiting.has(entryPath)) {
    return { ok: false, message: `Circular import detected at ${entryPath}` };
  }

  visiting.add(entryPath);
  try {
    const defaultExportMatches = source.match(/\bexport\s+default\b/g);
    if (defaultExportMatches && defaultExportMatches.length > 1) {
      return {
        ok: false,
        message: "Only one `export default` is allowed per file.",
        line: 1,
      };
    }
    const compiled = transform(source, {
      transforms: ["typescript", "jsx", "imports"],
      jsxRuntime: "classic",
      filePath: entryPath,
    });

    const moduleExports: Record<string, unknown> = {};
    const moduleObj = { exports: moduleExports };

    const customRequire = (specifier: string): unknown => {
      if (specifier in EXTERNAL_MODULES) {
        return EXTERNAL_MODULES[specifier];
      }
      if (specifier === "@hudbird/marketing/pilot.css" || specifier.endsWith(".css")) {
        return {};
      }
      if (specifier.startsWith(".")) {
        const resolved = resolveVirtualModulePath(entryPath, specifier, fileMap);
        if (!resolved) {
          throw new Error(`Cannot resolve relative module "${specifier}" from ${entryPath}`);
        }
        if (resolved.endsWith(".json")) {
          return JSON.parse(fileMap.get(resolved) ?? "{}");
        }
        const subResult = compileTsxSourceToModule(resolved, fileMap, cache, visiting);
        if (isCompiledError(subResult)) {
          throw new Error(`${resolved}: ${subResult.message}`);
        }
        return subResult.exports;
      }
      throw new Error(`Module "${specifier}" is not available inside browser live sandbox`);
    };

    const runner = new Function("exports", "require", "module", "React", compiled.code);
    runner(moduleExports, customRequire, moduleObj, React);

    const finalExports =
      moduleObj.exports && typeof moduleObj.exports === "object"
        ? (moduleObj.exports as Record<string, unknown>)
        : moduleExports;
    cache.set(entryPath, finalExports);
    const def = finalExports.default;
    return {
      ok: true,
      exports: finalExports,
      defaultComponent:
        typeof def === "function" ? (def as React.ComponentType<Record<string, unknown>>) : null,
    };
  } catch (err) {
    const loc = extractErrorLocation(err);
    return { ok: false, ...loc };
  } finally {
    visiting.delete(entryPath);
  }
}

export interface LiveTsxErrorBoundaryProps {
  resetKey: string;
  label: string;
  children: React.ReactNode;
}

interface LiveTsxErrorBoundaryState {
  error: Error | null;
}

export class LiveTsxErrorBoundary extends React.Component<
  LiveTsxErrorBoundaryProps,
  LiveTsxErrorBoundaryState
> {
  constructor(props: LiveTsxErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): LiveTsxErrorBoundaryState {
    return { error };
  }

  componentDidUpdate(prevProps: LiveTsxErrorBoundaryProps) {
    if (prevProps.resetKey !== this.props.resetKey && this.state.error) {
      this.setState({ error: null });
    }
  }

  render() {
    if (this.state.error) {
      return React.createElement(
        "div",
        {
          role: "alert",
          className:
            "mx-auto my-6 max-w-2xl rounded-xl border border-rose-500/40 bg-rose-500/10 p-4 text-xs text-rose-700 dark:text-rose-200",
        },
        React.createElement(
          "div",
          { className: "font-semibold" },
          `Runtime error in custom TSX (${this.props.label})`
        ),
        React.createElement(
          "pre",
          { className: "mt-1.5 overflow-x-auto font-mono text-[11px] opacity-90" },
          this.state.error.message
        )
      );
    }
    return this.props.children;
  }
}

export function renderCompiledCustomModule(
  filePath: string,
  fileMap: Map<string, string>,
  fallbackCode?: string
): React.ReactNode | undefined {
  const source = fileMap.get(filePath);
  if (!source) return undefined;
  const compiled = compileTsxSourceToModule(filePath, fileMap);
  if (!compiled.ok || !compiled.defaultComponent) {
    if (fallbackCode && fallbackCode !== source) {
      const backupMap = new Map(fileMap);
      backupMap.set(filePath, fallbackCode);
      const backup = compileTsxSourceToModule(filePath, backupMap);
      if (backup.ok && backup.defaultComponent) {
        const Comp = backup.defaultComponent;
        return React.createElement(LiveTsxErrorBoundary, {
          resetKey: `${filePath}:${fallbackCode.length}`,
          label: filePath,
          children: React.createElement(Comp, {}),
        });
      }
    }
    return undefined;
  }
  const Comp = compiled.defaultComponent;
  return React.createElement(LiveTsxErrorBoundary, {
    resetKey: `${filePath}:${source}`,
    label: filePath,
    children: React.createElement(Comp, {}),
  });
}
