import * as React from "react";
import CodeMirror, { keymap, type Extension } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { css } from "@codemirror/lang-css";
import { json } from "@codemirror/lang-json";
import { linter, type Diagnostic } from "@codemirror/lint";
import type { CodeSyncDiagnostic } from "./liveCodeSync";

export interface LazyCodeMirrorEditorProps {
  value: string;
  language: "tsx" | "css" | "json";
  themeMode: "light" | "dark";
  readOnly?: boolean;
  diagnostic?: CodeSyncDiagnostic | null;
  onChange: (value: string) => void;
  onSaveShortcut?: () => void;
}

export default function LazyCodeMirrorEditor({
  value,
  language,
  themeMode,
  readOnly = false,
  diagnostic = null,
  onChange,
  onSaveShortcut,
}: LazyCodeMirrorEditorProps) {
  const onSaveRef = React.useRef(onSaveShortcut);
  onSaveRef.current = onSaveShortcut;

  const diagnosticRef = React.useRef(diagnostic);
  diagnosticRef.current = diagnostic;

  const extensions = React.useMemo<Extension[]>(() => {
    const langExt =
      language === "css"
        ? css()
        : language === "json"
          ? json()
          : javascript({ jsx: true, typescript: true });

    const diagLinter = linter((view) => {
      const diag = diagnosticRef.current;
      if (!diag?.message) return [];
      const doc = view.state.doc;
      const lineNum = Math.min(Math.max(1, diag.line ?? 1), doc.lines);
      const lineObj = doc.line(lineNum);
      const result: Diagnostic[] = [
        {
          from: lineObj.from,
          to: Math.max(lineObj.from + 1, lineObj.to),
          severity: "error",
          message: diag.message,
        },
      ];
      return result;
    });

    const saveKeymap = keymap.of([
      {
        key: "Mod-s",
        preventDefault: true,
        run: () => {
          onSaveRef.current?.();
          return true;
        },
      },
    ]);

    return [langExt, diagLinter, saveKeymap];
  }, [language, diagnostic]);

  return (
    <CodeMirror
      value={value}
      height="100%"
      theme={themeMode === "dark" ? "dark" : "light"}
      readOnly={readOnly}
      extensions={extensions}
      onChange={onChange}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightActiveLine: true,
        foldGutter: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        searchKeymap: true,
        tabSize: 2,
      }}
      className="h-full w-full text-[12.5px] [&_.cm-editor]:h-full [&_.cm-editor]:outline-none [&_.cm-scroller]:font-mono"
    />
  );
}
