import * as React from "react";
import { Checkbox, Input, Select, SelectItem } from "@hudbird/ui";
import { resolveLinkTarget, websiteTemplates, type WebsiteProjectConfig } from "@hudbird/marketing";
import type { LandingSectionType, WebsiteLinkTarget } from "@hudbird/schemas";
import { AlertTriangle, ArrowUpRight, ExternalLink, FileText, Hash, Link2, X } from "lucide-react";
import { BUTTON_PRESS_CLASS } from "./motionPresets";

const SECTION_LABELS: { id: LandingSectionType; label: string }[] = [
  { id: "hero", label: "Hero (#hero)" },
  { id: "logos", label: "Logo Cloud (#logos)" },
  { id: "benefits", label: "Benefits (#benefits)" },
  { id: "features", label: "Features (#features)" },
  { id: "how-it-works", label: "How it Works (#how-it-works)" },
  { id: "integrations", label: "Integrations (#integrations)" },
  { id: "testimonials", label: "Testimonials (#testimonials)" },
  { id: "pricing", label: "Pricing (#pricing)" },
  { id: "faq", label: "FAQ (#faq)" },
  { id: "cta", label: "Call to Action (#cta)" },
  { id: "footer", label: "Footer (#footer)" },
];

export interface LinkTargetPickerProps {
  label?: string;
  value: WebsiteLinkTarget | undefined;
  project: WebsiteProjectConfig;
  onChange: (next: WebsiteLinkTarget) => void;
  onClear?: () => void;
  onJumpToPage?: (pageId: string, sectionAnchor?: string) => void;
  helperText?: string;
}

export function LinkTargetPicker({
  label,
  value,
  project,
  onChange,
  onClear,
  onJumpToPage,
  helperText,
}: LinkTargetPickerProps) {
  const mode: WebsiteLinkTarget["kind"] = value?.kind ?? "page";
  const resolved = resolveLinkTarget(project, value);
  const selectedDestPage =
    value?.kind === "page" ? project.pages.find((p) => p.id === value.pageId) : undefined;
  const availableAnchors = selectedDestPage
    ? selectedDestPage.sections.filter((s) => s.enabled && s.type !== "navbar").map((s) => s.type)
    : [];

  const switchMode = (kind: WebsiteLinkTarget["kind"]) => {
    if (kind === mode) return;
    if (kind === "page") {
      const home = project.pages.find((p) => p.path === "/") ?? project.pages[0];
      onChange({ kind: "page", pageId: home.id });
    } else if (kind === "section") {
      onChange({ kind: "section", section: "pricing" });
    } else {
      onChange({ kind: "external", href: "https://", openInNewTab: true });
    }
  };

  return (
    <div className="space-y-3">
      {(label || onClear) && (
        <div className="flex items-center justify-between gap-2">
          {label && (
            <span className="text-xs font-medium text-zinc-700 dark:text-zinc-200">{label}</span>
          )}
          {onClear && value && (
            <button
              type="button"
              onClick={onClear}
              aria-label={`Clear ${label ?? "link"}`}
              className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-xs font-medium text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/[0.06] dark:hover:text-white"
            >
              <X className="h-3 w-3" />
              Reset
            </button>
          )}
        </div>
      )}

      {/* High-frequency segmented switcher: instant toggle */}
      <div
        role="group"
        aria-label={label ? `${label} target type` : "Link target type"}
        className="grid grid-cols-3 gap-1 rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900/80"
      >
        {(
          [
            { id: "page", text: "Page", Icon: FileText },
            { id: "section", text: "Section", Icon: Hash },
            { id: "external", text: "URL", Icon: ExternalLink },
          ] as const
        ).map(({ id, text, Icon }) => {
          const active = mode === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => switchMode(id)}
              aria-pressed={active}
              className={`flex min-h-7 items-center justify-center gap-1.5 rounded-md px-2 text-xs font-medium ${BUTTON_PRESS_CLASS} ${
                active
                  ? "bg-white text-zinc-950 shadow-2xs dark:bg-[#27272b] dark:text-white"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              }`}
            >
              <Icon className="h-3 w-3 shrink-0" />
              {text}
            </button>
          );
        })}
      </div>

      {mode === "page" && (
        <div className="space-y-3">
          <Select
            aria-label={label ? `${label} destination page` : "Destination page"}
            value={value?.kind === "page" ? value.pageId : ""}
            onValueChange={(pageId) =>
              onChange({
                kind: "page",
                pageId,
                sectionAnchor: value?.kind === "page" ? value.sectionAnchor : undefined,
              })
            }
          >
            {project.pages.map((p) => {
              const group = websiteTemplates.find((t) => t.id === p.template)?.group ?? "Page";
              return (
                <SelectItem key={p.id} value={p.id}>
                  {`${p.name} (${p.path}) · ${group}`}
                </SelectItem>
              );
            })}
          </Select>

          {selectedDestPage && availableAnchors.length > 0 && (
            <Select
              aria-label="Scroll to section on target page"
              value={
                value?.kind === "page" && value.sectionAnchor ? value.sectionAnchor : "__top__"
              }
              onValueChange={(anchor) => {
                if (value?.kind !== "page") return;
                onChange({
                  kind: "page",
                  pageId: value.pageId,
                  sectionAnchor: anchor === "__top__" ? undefined : anchor,
                });
              }}
            >
              <SelectItem value="__top__">Scroll to: Top of page</SelectItem>
              {availableAnchors.map((sec) => (
                <SelectItem key={sec} value={sec}>
                  {`Scroll to: #${sec}`}
                </SelectItem>
              ))}
            </Select>
          )}

          {value?.kind === "page" && !resolved.valid && (
            <div className="flex items-center gap-1.5 rounded-lg bg-amber-500/10 px-2.5 py-1.5 text-xs font-medium text-amber-600 dark:text-amber-400">
              <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
              <span>Linked page was deleted. Select a valid destination.</span>
            </div>
          )}
        </div>
      )}

      {mode === "section" && (
        <Select
          aria-label="Section anchor target"
          value={value?.kind === "section" ? value.section : "pricing"}
          onValueChange={(sec) => onChange({ kind: "section", section: sec as LandingSectionType })}
        >
          {SECTION_LABELS.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.label}
            </SelectItem>
          ))}
        </Select>
      )}

      {mode === "external" && (
        <div className="space-y-2.5">
          <Input
            aria-label="External URL"
            placeholder="https://docs.example.com"
            value={value?.kind === "external" ? value.href : "https://"}
            onChange={(e) =>
              onChange({
                kind: "external",
                href: e.target.value,
                openInNewTab: value?.kind === "external" ? value.openInNewTab : true,
              })
            }
          />
          <Checkbox
            size="sm"
            checked={value?.kind === "external" ? Boolean(value.openInNewTab) : true}
            onChange={(e) =>
              onChange({
                kind: "external",
                href: value?.kind === "external" ? value.href : "https://",
                openInNewTab: e.target.checked,
              })
            }
          >
            <span className="text-xs text-zinc-600 dark:text-zinc-300">Open in new tab</span>
          </Checkbox>
        </div>
      )}

      {/* Clean single-line destination preview + quick jump */}
      <div className="flex items-center justify-between gap-2 text-xs text-zinc-500 dark:text-zinc-400">
        <span className="truncate">Destination: {resolved.href}</span>
        {value?.kind === "page" && resolved.valid && onJumpToPage && (
          <button
            type="button"
            onClick={() => onJumpToPage(value.pageId, value.sectionAnchor)}
            className="text-primary inline-flex shrink-0 items-center gap-1 font-medium hover:underline"
          >
            <span>Open</span>
            <ArrowUpRight className="h-3 w-3" />
          </button>
        )}
      </div>

      {helperText && (
        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{helperText}</p>
      )}
    </div>
  );
}
