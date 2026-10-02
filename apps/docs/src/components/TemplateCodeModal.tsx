import React, { useMemo, useState } from "react";
import { Dialog, DialogContent, Button } from "@hudbird/ui";
import { IdeCodeBlock } from "./IdeCodeBlock";
import { X, ArrowRight, Sparkles } from "lucide-react";
import { ProPricingModal } from "./ProPricingModal";

import AiStartupRaw from "./templates/AiStartupTemplate.tsx?raw";
import DigitalAgencyRaw from "./templates/DigitalAgencyTemplate.tsx?raw";
import ModernAppRaw from "./templates/ModernAppTemplate.tsx?raw";
import SaaSRaw from "./templates/SaaSTemplate.tsx?raw";
import EcommerceRaw from "./templates/EcommerceTemplate.tsx?raw";
import FintechRaw from "./templates/FintechTemplate.tsx?raw";


const TEMPLATE_CODE: Record<string, string> = {
  "ai-startup": AiStartupRaw,
  enterprise: DigitalAgencyRaw,
  "modern-app": ModernAppRaw,
  "saas-launchpad": SaaSRaw,
  ecommerce: EcommerceRaw,
  fintech: FintechRaw,

};

export const getCleanTemplateCode = (id: string) => {
  const raw = TEMPLATE_CODE[id] || "";
  return raw
    .replace(
      /import\s*\{\s*TemplateThemeToggle\s*\}\s*from\s*['"]\.\/TemplateThemeToggle['"];\n/g,
      ""
    )
    .replace(/import\s*\{\s*useTemplateTheme\s*\}\s*from\s*['"]\.\/TemplateThemeToggle['"];\n/g, "")
    .replace(/<TemplateThemeToggle\s*\/>\n/g, "")
    .replace(/const\s*\{\s*theme,\s*toggleTheme\s*\}\s*=\s*useTemplateTheme\(\);\n/g, "")
    .replace(/\s*theme=\{theme\}\s*toggleTheme=\{toggleTheme\}/g, "")
    .replace(/^\s*[\r\n]/gm, ""); // clean up empty lines if any
};

interface TemplateCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateId: string | null;
  templateName: string;
}

export const TemplateCodeModal: React.FC<TemplateCodeModalProps> = ({
  isOpen,
  onClose,
  templateId,
  templateName,
}) => {
  const [isProOpen, setIsProOpen] = useState(false);
  const code = useMemo(() => {
    if (!templateId) return "";
    return getCleanTemplateCode(templateId);
  }, [templateId]);

  return (
    <Dialog isOpen={isOpen} onClose={onClose} size="md">
      <DialogContent className="max-w-5xl overflow-hidden border-zinc-200 bg-white p-0 shadow-2xl dark:border-white/10 dark:bg-[#0a0a0b]">
        <div className="flex items-center justify-between border-b border-zinc-200 bg-zinc-50 px-4 py-3 dark:border-white/5 dark:bg-zinc-900">
          <div className="text-sm font-semibold text-zinc-900 dark:text-white">
            {templateName} Code
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-200 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Pro Banner */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-100 bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-white px-4 py-2.5 text-xs dark:border-blue-900/30 dark:from-blue-950/30 dark:via-indigo-950/20 dark:to-zinc-950">
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
              PRO
            </span>
            <span>
              Want the full ready-to-deploy Next.js & Vite starter repository with all components?
            </span>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              setIsProOpen(true);
            }}
            className="flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 font-semibold text-white shadow-xs transition-colors hover:bg-blue-700"
          >
            <span>Unlock All Templates ($49)</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        <div className="max-h-[80vh] overflow-y-auto">
          <IdeCodeBlock codeReact={code} activeFramework="React" />
        </div>
      </DialogContent>
      <ProPricingModal isOpen={isProOpen} onClose={() => setIsProOpen(false)} />
    </Dialog>
  );
};
