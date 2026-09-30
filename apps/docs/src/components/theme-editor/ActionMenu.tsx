import React, { useState } from "react";
import { useThemeEditor } from "./ThemeEditorContext";
import { Copy, Terminal, Check, Code } from "lucide-react";
import { Button } from "@hudbird/ui/components/Button/Button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@hudbird/ui/components/Dialog/Dialog";

export const ActionMenu = () => {
  const { getCssString, getCliCommand } = useThemeEditor();
  const [copiedCss, setCopiedCss] = useState(false);
  const [copiedCli, setCopiedCli] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

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
    <>
      <div className="flex flex-col gap-2">
        <Button
          variant="solid"
          color="dark"
          size="sm"
          className="flex w-full items-center justify-center gap-2 rounded-lg"
          onClick={() => setIsExportModalOpen(true)}
        >
          <Code className="h-3.5 w-3.5" />
          Export Theme
        </Button>
      </div>

      <Dialog isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} size="md">
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export Theme</DialogTitle>
            <DialogDescription>
              Copy the configuration below to apply the theme to your Hudbird UI project.
            </DialogDescription>
          </DialogHeader>

          <div className="custom-scrollbar flex max-h-[60vh] flex-col gap-4 overflow-y-auto pr-2">
            {/* CLI Command */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">1. Initialize Project</span>
                <Button variant="ghost" size="sm" onClick={handleCopyCli} className="h-7 text-xs">
                  {copiedCli ? (
                    <Check className="mr-1 h-3 w-3" />
                  ) : (
                    <Terminal className="mr-1 h-3 w-3" />
                  )}
                  {copiedCli ? "Copied!" : "Copy CLI"}
                </Button>
              </div>
              <div className="relative">
                <pre className="bg-muted text-muted-foreground border-border/50 overflow-x-auto rounded-xl border p-3 text-xs">
                  <code>{getCliCommand()}</code>
                </pre>
              </div>
            </div>

            {/* CSS Variables */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">2. Paste CSS Variables</span>
                <Button variant="ghost" size="sm" onClick={handleCopyCss} className="h-7 text-xs">
                  {copiedCss ? (
                    <Check className="mr-1 h-3 w-3" />
                  ) : (
                    <Copy className="mr-1 h-3 w-3" />
                  )}
                  {copiedCss ? "Copied!" : "Copy CSS"}
                </Button>
              </div>
              <div className="relative">
                <pre className="bg-muted text-muted-foreground border-border/50 overflow-x-auto rounded-xl border p-3 text-xs">
                  <code>{getCssString()}</code>
                </pre>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsExportModalOpen(false)}>
              Close
            </Button>
            <Button variant="solid" onClick={handleCopyCss}>
              <Copy className="mr-2 h-4 w-4" />
              Copy All CSS
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
