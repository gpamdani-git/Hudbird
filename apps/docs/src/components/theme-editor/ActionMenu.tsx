import React, { useState } from "react";
import { useThemeEditor } from "./ThemeEditorContext";
import { Copy, Terminal, Check } from "lucide-react";
import { Button } from "@hudbird/ui/components/Button/Button";

export const ActionMenu = () => {
  const { getCssString, getCliCommand } = useThemeEditor();
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);

  const handleCopyCss = () => {
    navigator.clipboard.writeText(getCssString());
    setCopiedCss(true);
    setTimeout(() => setCopiedCss(false), 2000);
  };

  const handleCopyCli = () => {
    navigator.clipboard.writeText(getCliCommand());
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2">
      <Button
        variant="solid"
        color="dark"
        size="sm"
        className="flex w-full items-center justify-center gap-2 rounded-lg"
        onClick={handleCopyCli}
      >
        {copiedCli ? <Check className="h-3.5 w-3.5" /> : <Terminal className="h-3.5 w-3.5" />}
        Copy Init Command
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex w-full items-center justify-center gap-2 rounded-lg"
        onClick={handleCopyCss}
      >
        {copiedCss ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        Copy CSS (v4)
      </Button>
    </div>
  );
};
