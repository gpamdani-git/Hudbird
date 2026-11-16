import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { Button, Heading, Input, Text } from "@hudbird/ui";
import { landingSectionRegistry } from "@hudbird/marketing";
import type { LandingSectionSelection, LandingSectionType } from "@hudbird/schemas";
import { CheckCircle2, Plus, Search, X } from "lucide-react";
import { SectionWireframeSvg } from "../landing/SectionWireframeSvg";
import { BUTTON_PRESS_CLASS, modalTransition } from "./motionPresets";

export interface AddSectionDialogProps {
  pageSections: LandingSectionSelection[];
  insertAfterType?: LandingSectionType;
  onInsertSection: (sectionType: LandingSectionType, afterType?: LandingSectionType) => void;
  onClose: () => void;
}

export function AddSectionDialog({
  pageSections,
  insertAfterType,
  onInsertSection,
  onClose,
}: AddSectionDialogProps) {
  const ref = React.useRef<HTMLDialogElement>(null);
  const titleId = React.useId();
  const reduced = useReducedMotion();
  const [closing, setClosing] = React.useState(false);
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    ref.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  const bodyDefinitions = landingSectionRegistry.filter(
    (def) => def.type !== "navbar" && def.type !== "footer"
  );
  const filtered = bodyDefinitions.filter((def) =>
    `${def.title} ${def.description} ${def.type}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      onCancel={(e) => {
        e.preventDefault();
        setClosing(true);
      }}
      className="fixed inset-0 m-auto max-h-[88dvh] w-[min(820px,calc(100%-32px))] max-w-none overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-0 text-zinc-900 shadow-2xl backdrop:bg-zinc-950/40 backdrop:backdrop-blur-sm dark:border-white/10 dark:bg-[#161618] dark:text-white"
    >
      <motion.div
        initial={{ opacity: 0, scale: reduced ? 1 : 0.96 }}
        animate={{
          opacity: closing ? 0 : 1,
          scale: closing ? (reduced ? 1 : 0.96) : 1,
        }}
        transition={modalTransition(reduced)}
        onAnimationComplete={() => {
          if (closing) onClose();
        }}
        className="p-5 sm:p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <Heading id={titleId} as="h2" size="h4">
              Add section to page
            </Heading>
            <Text variant="muted" className="mt-1 text-xs">
              {insertAfterType && insertAfterType !== "footer"
                ? `Selected insertion anchor: right after "${insertAfterType}"`
                : "Enable or add a section to your current page layout."}
            </Text>
          </div>
          <Button
            variant="plain"
            isIconOnly
            size="sm"
            aria-label="Close add section dialog"
            onClick={() => setClosing(true)}
          >
            <X size={16} />
          </Button>
        </div>

        <Input
          autoFocus
          size="sm"
          aria-label="Search sections"
          placeholder="Search hero, features, pricing, testimonials, faq..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          startContent={<Search size={14} />}
          className="mb-4"
        />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((def) => {
            const current = pageSections.find((s) => s.type === def.type);
            const active = Boolean(current?.enabled);
            return (
              <button
                key={def.type}
                type="button"
                onClick={() => {
                  onInsertSection(def.type, insertAfterType);
                  setClosing(true);
                }}
                className={`group flex flex-col gap-2.5 rounded-xl border p-3 text-left ${BUTTON_PRESS_CLASS} ${
                  active
                    ? "border-primary/40 bg-primary/5 dark:border-primary/40 dark:bg-primary/10"
                    : "border-zinc-200/80 bg-zinc-50/70 hover:border-zinc-300 hover:bg-white dark:border-white/[0.08] dark:bg-white/[0.02] dark:hover:border-white/[0.16] dark:hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex h-16 w-full items-center justify-center overflow-hidden rounded-lg border border-zinc-200/60 bg-white dark:border-white/[0.06] dark:bg-[#0d0d0f]">
                  <SectionWireframeSvg type={def.type} variant={current?.variant} />
                </div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      {def.title}
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-zinc-500 dark:text-zinc-400">
                      {def.description}
                    </p>
                  </div>
                  <span
                    className={`mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      active
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : "bg-zinc-200/70 text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white dark:bg-white/[0.08] dark:text-zinc-300 dark:group-hover:bg-white dark:group-hover:text-zinc-950"
                    }`}
                  >
                    {active ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" />
                        Move
                      </>
                    ) : (
                      <>
                        <Plus className="h-3 w-3" />
                        Add
                      </>
                    )}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>
    </dialog>
  );
}
