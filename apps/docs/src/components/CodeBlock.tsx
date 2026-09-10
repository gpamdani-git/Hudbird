import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

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
  expandable = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!expandable);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  // Basic syntax highlighter for nice visual presentation
  const highlightCode = (rawCode: string) => {
    const lines = rawCode.trim().split("\n");

    return lines.map((line, i) => {
      // Tokenization for imports, keywords, tags, attributes, strings
      const parts: React.ReactNode[] = [];
      const remaining = line;

      // Handle comments
      if (remaining.trim().startsWith("//")) {
        return (
          <div key={i} className="text-zinc-400 italic dark:text-zinc-500">
            {line}
          </div>
        );
      }

      return (
        <div key={i} className="leading-relaxed">
          {renderLineTokens(line)}
        </div>
      );
    });
  };

  const renderLineTokens = (line: string) => {
    // Regex tokenizer for JS/TSX keywords
    const regex =
      /(import|export|from|function|return|const|let|var|interface|type|default|<[A-Z][a-zA-Z0-9]*|<\/[A-Z][a-zA-Z0-9]*>|<[a-z]+|<\/[a-z]+>|'[^']*'|"[^"]*"|\b(?:color|variant|size|disabled|outline|plain|href|isLoading|className|ref)\b)/g;

    const elements: React.ReactNode[] = [];
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
        ].includes(val)
      ) {
        elements.push(
          <span key={match.index} className="font-medium text-purple-600 dark:text-purple-400">
            {val}
          </span>
        );
      } else if (val.startsWith("'") || val.startsWith('"')) {
        elements.push(
          <span key={match.index} className="text-sky-600 dark:text-sky-400">
            {val}
          </span>
        );
      } else if (val.startsWith("<") && (val.endsWith(">") || !val.endsWith(">"))) {
        elements.push(
          <span key={match.index} className="font-semibold text-cyan-600 dark:text-cyan-400">
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
          <span key={match.index} className="text-emerald-600 dark:text-emerald-400">
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

    return elements;
  };

  return (
    <div className="group relative my-4 overflow-hidden rounded-xl border border-zinc-200/80 bg-zinc-950/5 text-sm dark:border-zinc-800/80 dark:bg-zinc-900/60">
      {filename && (
        <div className="flex items-center justify-between border-b border-zinc-200/80 px-4 py-2 font-mono text-xs text-zinc-500 dark:border-zinc-800/80 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="rounded bg-zinc-200/50 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-800 dark:bg-zinc-800/50 dark:text-zinc-200">
              TS
            </span>
            <span>{filename}</span>
          </div>
          <div className="flex items-center gap-3">
            {expandable && (
              <button
                onClick={toggleExpand}
                className="font-sans text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                {isExpanded ? "Collapse" : "Expand"}
              </button>
            )}
            <button
              onClick={handleCopy}
              aria-label="Copy code"
              className="text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
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
          {expandable && (
            <button
              onClick={toggleExpand}
              className="rounded bg-white/80 px-2 py-1 text-xs font-medium text-zinc-500 opacity-0 shadow-xs backdrop-blur-sm transition-all group-hover:opacity-100 hover:text-zinc-900 dark:bg-zinc-800/80 dark:hover:text-zinc-100"
            >
              {isExpanded ? "Collapse" : "Expand"}
            </button>
          )}
          <button
            onClick={handleCopy}
            aria-label="Copy code"
            className="rounded-lg border border-zinc-200/80 bg-white/80 p-1.5 text-zinc-400 opacity-0 shadow-xs backdrop-blur-sm transition-opacity group-hover:opacity-100 hover:text-zinc-700 dark:border-zinc-700/80 dark:bg-zinc-800/80 dark:hover:text-zinc-200"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      )}

      <div
        className={`relative overflow-x-auto p-4 font-mono text-[13px] text-zinc-800 transition-all duration-300 dark:text-zinc-200 ${!isExpanded ? "max-h-[300px] overflow-hidden" : ""}`}
      >
        <pre className="m-0 font-mono">{highlightCode(code)}</pre>

        {!isExpanded && (
          <div className="absolute right-0 bottom-0 left-0 flex h-32 items-end justify-center bg-gradient-to-t from-zinc-50 to-transparent pb-4 dark:from-zinc-900">
            <button
              onClick={toggleExpand}
              className="z-10 rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Expand
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
