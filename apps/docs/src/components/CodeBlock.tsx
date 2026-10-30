import React, { useState } from "react";
import { Check, Copy } from "lucide-react";
import { trackEvent } from "../lib/analytics";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  expandable?: boolean;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = "tsx",
  filename,
  expandable,
}) => {
  const lineCount = code.trim().split("\n").length;
  const isCollapsible = expandable !== undefined ? expandable : lineCount > 8;

  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!isCollapsible);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    trackEvent("copy_code", {
      filename: filename || "snippet",
      language,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleExpand = () => setIsExpanded((prev) => !prev);

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

  return (
    <div className="group relative my-4 overflow-hidden rounded-xl border border-zinc-200/80 bg-white text-sm shadow-sm dark:border-[#2E2F33] dark:bg-[#161618]">
      {filename && (
        <div className="flex items-center justify-between border-b border-zinc-200/80 bg-zinc-50/50 px-4 py-2 font-mono text-xs text-zinc-500 dark:border-[#2E2F33] dark:bg-[#161618] dark:text-[#828282]">
          <div className="flex items-center gap-2">
            <span className="rounded bg-zinc-200/50 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-800 dark:border dark:border-[#2E2F33] dark:bg-[#202124] dark:text-[#E5E5E5]">
              TS
            </span>
            <span>{filename}</span>
          </div>
          <div className="flex items-center gap-3">
            {isCollapsible && (
              <button
                onClick={toggleExpand}
                className="font-sans text-zinc-500 transition-colors hover:text-zinc-900 dark:text-[#828282] dark:hover:text-[#FFB1EE]"
              >
                {isExpanded ? "Collapse" : "Expand"}
              </button>
            )}
            <button
              onClick={handleCopy}
              aria-label="Copy code"
              className="text-zinc-500 transition-colors hover:text-zinc-900 dark:text-[#828282] dark:hover:text-white"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
      )}

      {!filename && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-3">
          {isCollapsible && (
            <button
              onClick={toggleExpand}
              className="rounded bg-white/80 px-2 py-1 text-xs font-medium text-zinc-500 opacity-0 shadow-xs backdrop-blur-sm transition-all group-hover:opacity-100 hover:text-zinc-900 dark:border dark:border-[#2E2F33] dark:bg-[#202124]/90 dark:text-[#828282] dark:hover:text-[#FFB1EE]"
            >
              {isExpanded ? "Collapse" : "Expand"}
            </button>
          )}
          <button
            onClick={handleCopy}
            aria-label="Copy code"
            className="rounded-lg border border-zinc-200/80 bg-white/80 p-1.5 text-zinc-400 opacity-0 shadow-xs backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:text-zinc-700 dark:border-[#2E2F33] dark:bg-[#202124]/90 dark:text-[#828282] dark:hover:text-white"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}

      <div
        className={`relative overflow-x-auto py-4 font-mono text-[13.6px] leading-[1.65] text-zinc-800 transition-all duration-300 dark:text-[#E5E5E5] ${!isExpanded ? "max-h-[300px] overflow-hidden" : ""}`}
      >
        <pre className="m-0 font-mono">{highlightCode(code)}</pre>

        {!isExpanded && (
          <div className="absolute right-0 bottom-0 left-0 flex h-32 items-end justify-center bg-gradient-to-t from-zinc-50 to-transparent pb-4 dark:from-[#161618]">
            <button
              onClick={toggleExpand}
              className="z-10 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 dark:border-[#2E2F33] dark:bg-[#202124] dark:text-[#E5E5E5] dark:hover:bg-[#2E2F33]"
            >
              Expand
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
