import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = "tsx", filename }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic syntax highlighter for nice visual presentation
  const highlightCode = (rawCode: string) => {
    const lines = rawCode.trim().split("\n");

    return lines.map((line, i) => {
      // Tokenization for imports, keywords, tags, attributes, strings
      const parts: React.ReactNode[] = [];
      let remaining = line;

      // Handle comments
      if (remaining.trim().startsWith("//")) {
        return (
          <div key={i} className="text-zinc-400 dark:text-zinc-500 italic">
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
    const regex = /(import|export|from|function|return|const|let|var|interface|type|default|<[A-Z][a-zA-Z0-9]*|<\/[A-Z][a-zA-Z0-9]*>|<[a-z]+|<\/[a-z]+>|'[^']*'|"[^"]*"|\b(?:color|variant|size|disabled|outline|plain|href|isLoading|className|ref)\b)/g;

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        elements.push(line.substring(lastIndex, match.index));
      }

      const val = match[0];

      if (["import", "export", "from", "function", "return", "const", "let", "var", "interface", "type", "default"].includes(val)) {
        elements.push(<span key={match.index} className="text-purple-600 dark:text-purple-400 font-medium">{val}</span>);
      } else if (val.startsWith("'") || val.startsWith('"')) {
        elements.push(<span key={match.index} className="text-sky-600 dark:text-sky-400">{val}</span>);
      } else if (val.startsWith("<") && (val.endsWith(">") || !val.endsWith(">"))) {
        elements.push(<span key={match.index} className="text-cyan-600 dark:text-cyan-400 font-semibold">{val}</span>);
      } else if (["color", "variant", "size", "disabled", "outline", "plain", "href", "isLoading", "className", "ref"].includes(val)) {
        elements.push(<span key={match.index} className="text-emerald-600 dark:text-emerald-400">{val}</span>);
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
    <div className="relative group my-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-950/5 dark:bg-zinc-900/60 overflow-hidden text-sm">
      {filename && (
        <div className="px-4 py-2 text-xs font-mono border-b border-zinc-200/80 dark:border-zinc-800/80 text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
          <span>{filename}</span>
          <span className="text-[10px] uppercase tracking-wider">{language}</span>
        </div>
      )}
      <div className="p-4 overflow-x-auto font-mono text-[13px] text-zinc-800 dark:text-zinc-200">
        <pre className="m-0 font-mono">{highlightCode(code)}</pre>
      </div>
      <button
        onClick={handleCopy}
        aria-label="Copy code"
        className="absolute top-3 right-3 p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 bg-white/80 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 shadow-xs backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
};
