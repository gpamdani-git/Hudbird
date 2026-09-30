import React, { useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { trackEvent } from "../lib/analytics";

export type FrameworkType = "React" | "HTML" | "Vue";

interface IdeCodeBlockProps {
  codeReact?: string;
  codeHtml?: string;
  codeVue?: string;
  codeMarkdown?: string;
  activeFramework?: FrameworkType | "Markdown";
  onFrameworkChange?: (framework: FrameworkType | "Markdown") => void;
}

export const IdeCodeBlock: React.FC<IdeCodeBlockProps> = ({
  codeReact,
  codeHtml,
  codeVue,
  codeMarkdown,
  activeFramework: externalActiveFramework,
  onFrameworkChange,
}) => {
  const [internalFramework, setInternalFramework] = useState<FrameworkType | "Markdown">("React");
  const [copied, setCopied] = useState(false);

  const active = externalActiveFramework || internalFramework;

  const setActive = (val: FrameworkType | "Markdown") => {
    if (onFrameworkChange) onFrameworkChange(val);
    else setInternalFramework(val);
  };

  const getActiveCode = () => {
    switch (active) {
      case "React":
        return codeReact;
      case "HTML":
        return codeHtml;
      case "Vue":
        return codeVue;
      case "Markdown":
        return codeMarkdown;
      default:
        return codeReact;
    }
  };

  const getLanguage = () => {
    switch (active) {
      case "React":
        return "TypeScript React";
      case "HTML":
        return "HTML";
      case "Vue":
        return "Vue";
      case "Markdown":
        return "Markdown";
      default:
        return "JavaScript";
    }
  };

  const handleCopy = () => {
    const code = getActiveCode();
    if (code) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      trackEvent("copy_code", {
        framework: active,
        language: getLanguage(),
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const highlightCode = (rawCode: string) => {
    const lines = rawCode.trim().split("\n");

    return lines.map((line, i) => {
      const elements: React.ReactNode[] = [];
      const trimmed = line.trim();

      if (trimmed.startsWith("//") || trimmed.startsWith("/*") || trimmed.startsWith("<!--")) {
        elements.push(
          <span key={i} className="text-zinc-500 italic dark:text-[#75715e]">
            {line}
          </span>
        );
      } else {
        // Simple Tokenizer
        const regex =
          /(import|export|from|function|return|const|let|var|interface|type|default|class|extends|implements|<[A-Z][a-zA-Z0-9]*|<\/[A-Z][a-zA-Z0-9]*>|<[a-z]+|<\/[a-z]+>|'[^']*'|"[^"]*"|`[^`]*`|\b(?:color|variant|size|disabled|outline|plain|href|isLoading|className|ref)\b)/g;

        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            elements.push(line.substring(lastIndex, match.index));
          }

          const val = match[0];

          if (
            [
              "import",
              "export",
              "from",
              "function",
              "return",
              "const",
              "let",
              "var",
              "interface",
              "type",
              "default",
              "class",
              "extends",
              "implements",
            ].includes(val)
          ) {
            elements.push(
              <span key={match.index} className="text-blue-600 italic dark:text-[#66d9ef]">
                {val}
              </span>
            );
          } else if (val.startsWith("'") || val.startsWith('"') || val.startsWith("`")) {
            elements.push(
              <span key={match.index} className="text-red-600 dark:text-[#e6db74]">
                {val}
              </span>
            );
          } else if (val.startsWith("<") && (val.endsWith(">") || !val.endsWith(">"))) {
            // HTML Tags or React Components
            elements.push(
              <span key={match.index} className="text-teal-600 dark:text-[#a6e22e]">
                {val}
              </span>
            );
          } else if (
            [
              "color",
              "variant",
              "size",
              "disabled",
              "outline",
              "plain",
              "href",
              "isLoading",
              "className",
              "ref",
            ].includes(val)
          ) {
            elements.push(
              <span key={match.index} className="text-orange-600 dark:text-[#fd971f]">
                {val}
              </span>
            );
          } else {
            elements.push(val);
          }

          lastIndex = regex.lastIndex;
        }

        if (lastIndex < line.length) {
          elements.push(line.substring(lastIndex));
        }
      }

      return (
        <div key={i} className="flex px-4 leading-relaxed hover:bg-black/5 dark:hover:bg-white/5">
          <span className="mr-4 inline-block w-6 shrink-0 text-right text-zinc-400 select-none dark:text-zinc-600">
            {i + 1}
          </span>
          <span className="break-all whitespace-pre-wrap">{elements}</span>
        </div>
      );
    });
  };

  const tabs = [
    { id: "React", label: "main.tsx", hasCode: !!codeReact },
    { id: "HTML", label: "index.html", hasCode: !!codeHtml },
    { id: "Vue", label: "App.vue", hasCode: !!codeVue },
    { id: "Markdown", label: "Skill.md", hasCode: !!codeMarkdown },
  ].filter((t) => t.hasCode);

  const activeCode = getActiveCode();

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white font-mono text-[13px] shadow-sm dark:border-zinc-800 dark:bg-[#1e1e1e]">
      <div className="flex max-h-[600px] min-h-[300px] flex-1">
        {/* Editor Area */}
        <div className="flex flex-1 flex-col overflow-hidden bg-white dark:bg-[#1e1e1e]">
          {/* Tab Bar */}
          <div className="scrollbar-hide flex h-10 w-full items-center justify-between overflow-x-auto bg-zinc-100 dark:bg-[#181818]">
            <div className="flex h-full">
              {tabs.map((tab) => {
                const isActive = active === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActive(tab.id as FrameworkType | "Markdown")}
                    className={`flex h-full items-center gap-2 border-r border-zinc-200 px-4 text-xs transition-colors dark:border-zinc-800/80 ${
                      isActive
                        ? "border-t-2 border-t-blue-500 bg-white text-zinc-900 dark:bg-[#1e1e1e] dark:text-zinc-100"
                        : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200/50 dark:bg-[#181818] dark:text-zinc-500 dark:hover:bg-[#252526]"
                    }`}
                  >
                    <span>{tab.label}</span>
                    {isActive && <X size={12} className="ml-1 opacity-50 hover:opacity-100" />}
                  </button>
                );
              })}
            </div>
            <div className="flex items-center px-2">
              <button
                onClick={handleCopy}
                aria-label="Copy code"
                title="Copy code"
                className="flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              >
                {copied ? (
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                ) : (
                  <Copy className="h-3.5 w-3.5" />
                )}
                <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          {/* Code Pane */}
          <div className="scrollbar-hide flex-1 overflow-auto py-4 font-mono text-[13px] text-zinc-800 dark:text-[#f8f8f2]">
            {activeCode ? (
              <pre className="m-0 font-mono">{highlightCode(activeCode)}</pre>
            ) : (
              <div className="flex h-full items-center justify-center text-zinc-400 dark:text-zinc-600">
                <p>No code available for {active}.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
