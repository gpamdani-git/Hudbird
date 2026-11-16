"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Check,
  Copy,
  Download,
  FileText,
  Info,
  Printer,
  RotateCcw,
  Search,
  ShieldCheck,
} from "lucide-react";
import {
  Badge,
  Button,
  Container,
  Heading,
  Input,
  Section,
  Select,
  SelectItem,
  Switch,
  Tab,
  Tabs,
  Text,
  Textarea,
} from "@hudbird/ui";
import { cn } from "../../utils/cn";
import { ABOUT_EASE_OUT, useSafeSectionReveal } from "../AboutUsSection/shared";
import {
  DEFAULT_COOKIE_PREFERENCES,
  LEGAL_DOCUMENTS,
  LEGAL_DSAR_TYPES,
  LEGAL_VERSIONS,
  downloadLegalText,
  type CookiePreferenceState,
  type LegalDocKey,
  type LegalDocumentDefinition,
  type LegalVersionOption,
} from "./data";
import "./legal-section.css";

export type LegalSectionBlockId = "legal-hero" | "legal-reader" | "legal-preferences";

const CONSENT_STORAGE_KEY = "hb_consent_v2";

function resolveDocument(key: LegalDocKey): LegalDocumentDefinition {
  return LEGAL_DOCUMENTS.find((item) => item.key === key) ?? LEGAL_DOCUMENTS[0];
}

function resolveVersion(versionId: string): LegalVersionOption {
  return LEGAL_VERSIONS.find((item) => item.id === versionId) ?? LEGAL_VERSIONS[0];
}

export interface LegalHeroSectionProps {
  id?: string;
  className?: string;
  heading?: string;
  subheading?: string;
  brandName?: string;
  activeDoc?: LegalDocKey;
  onSelectDoc?: (docKey: LegalDocKey) => void;
  selectedVersionId?: string;
  onVersionChange?: (versionId: string) => void;
}

export function LegalHeroSection({
  id = "legal-hero",
  className,
  heading = "Legal & Compliance Center",
  subheading = "Clear terms governing how we process workspace data, structure commercial seats, and handle browser storage across your projects.",
  brandName = "Hudbird",
  activeDoc: controlledDoc,
  onSelectDoc,
  selectedVersionId: controlledVersionId,
  onVersionChange,
}: LegalHeroSectionProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const revealed = useSafeSectionReveal(rootRef);
  const prefersReducedMotion = useReducedMotion();

  const [internalDoc, setInternalDoc] = React.useState<LegalDocKey>("privacy");
  const [internalVersionId, setInternalVersionId] = React.useState<string>(LEGAL_VERSIONS[0].id);
  const [downloadedDoc, setDownloadedDoc] = React.useState<string | null>(null);

  const activeDoc = controlledDoc ?? internalDoc;
  const setActiveDoc = onSelectDoc ?? setInternalDoc;
  const selectedVersionId = controlledVersionId ?? internalVersionId;
  const setSelectedVersionId = onVersionChange ?? setInternalVersionId;

  const doc = React.useMemo(() => resolveDocument(activeDoc), [activeDoc]);
  const version = React.useMemo(() => resolveVersion(selectedVersionId), [selectedVersionId]);

  const revealInitial = (yOffset: number) =>
    prefersReducedMotion ? false : { opacity: 0, y: yOffset };
  const revealTarget = revealed || prefersReducedMotion ? { opacity: 1, y: 0 } : undefined;

  const handleDownload = () => {
    downloadLegalText(doc, version, brandName);
    setDownloadedDoc(`${doc.key}-${version.id}`);
    window.setTimeout(() => setDownloadedDoc(null), 2400);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div ref={rootRef} data-landing-section="legal-hero" className="w-full">
      <Section
        id={id}
        spacing="none"
        className={cn(
          "hb-legal-section bg-background text-foreground pt-12 pb-8 sm:pt-16 sm:pb-10",
          className
        )}
      >
        <Container size="xl" gutter="lg">
          <div className="mx-auto w-full max-w-6xl">
            <motion.div
              initial={revealInitial(12)}
              animate={revealTarget}
              transition={{ duration: 0.34, ease: ABOUT_EASE_OUT }}
              className="flex flex-col gap-6 min-[960px]:flex-row min-[960px]:items-end min-[960px]:justify-between"
            >
              <div className="max-w-2xl min-w-0">
                <Heading
                  as="h1"
                  size="inherit"
                  data-hb-node="heading"
                  data-hb-edit="legal-hero:heading"
                  className="text-foreground text-3xl font-semibold tracking-[-0.03em] sm:text-4xl lg:text-[42px] lg:leading-[1.12]"
                >
                  {heading}
                </Heading>
                <Text
                  variant="muted"
                  data-hb-node="text"
                  data-hb-edit="legal-hero:subheading"
                  className="mt-3 text-base leading-relaxed sm:text-lg"
                >
                  {subheading}
                </Text>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-500 sm:text-sm dark:text-zinc-400">
                  <span className="font-mono font-medium text-zinc-700 dark:text-zinc-300">
                    {doc.docCode}
                  </span>
                  <span aria-hidden="true">/</span>
                  <span>Effective {version.effectiveDate}</span>
                  <span aria-hidden="true">/</span>
                  <span>{doc.jurisdiction}</span>
                  <span aria-hidden="true">/</span>
                  <a
                    href={`mailto:${doc.contactEmail}`}
                    className="font-medium text-zinc-700 underline decoration-zinc-300 underline-offset-4 hover:text-zinc-950 dark:text-zinc-200 dark:decoration-zinc-700 dark:hover:text-white"
                  >
                    {doc.contactEmail}
                  </a>
                </div>
              </div>

              {/* Document Version & Export Controls */}
              <div className="hb-legal-no-print flex shrink-0 flex-col gap-2.5 min-[960px]:flex-col min-[960px]:items-end sm:flex-row sm:flex-wrap sm:items-end">
                <div className="w-full sm:w-52">
                  <Select
                    id="legal-version-select"
                    label="Revision history"
                    aria-label="Legal document version"
                    variant="bordered"
                    radius="lg"
                    value={selectedVersionId}
                    onValueChange={setSelectedVersionId}
                  >
                    {LEGAL_VERSIONS.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </Select>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    className="hb-legal-btn-tap min-h-11 gap-2"
                    onClick={handleDownload}
                  >
                    {downloadedDoc === `${doc.key}-${version.id}` ? (
                      <>
                        <Check
                          className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                          aria-hidden="true"
                        />
                        <span>Downloaded .txt</span>
                      </>
                    ) : (
                      <>
                        <Download className="h-4 w-4" aria-hidden="true" />
                        <span>Download .txt</span>
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    className="hb-legal-btn-tap min-h-11 gap-2"
                    onClick={handlePrint}
                  >
                    <Printer className="h-4 w-4" aria-hidden="true" />
                    <span>Print</span>
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Revision Change Summary Strip */}
            <div className="mt-6 flex items-start gap-2.5 rounded-xl border border-zinc-200/80 bg-zinc-50/80 px-4 py-3 text-xs leading-relaxed text-zinc-600 sm:text-sm dark:border-white/10 dark:bg-zinc-900/50 dark:text-zinc-300">
              <Info
                className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500 dark:text-zinc-400"
                aria-hidden="true"
              />
              <div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {version.label}:
                </span>{" "}
                <span>{version.summaryNote}</span>
              </div>
            </div>

            {/* Underline Document Tabs */}
            <div className="hb-legal-no-print mt-6 min-w-0">
              <Tabs
                variant="underlined"
                size="md"
                selectedKey={activeDoc}
                onSelectionChange={(key) => setActiveDoc(String(key) as LegalDocKey)}
                aria-label="Legal documents"
                classNames={{
                  tabList:
                    "w-full flex-wrap gap-x-4 gap-y-1 sm:gap-x-6 border-b border-zinc-200/80 dark:border-white/10 pb-0",
                  tab: "min-h-11 shrink-0 px-1 text-sm font-medium whitespace-nowrap",
                }}
              >
                {LEGAL_DOCUMENTS.map((item) => (
                  <Tab key={item.key} tabKey={item.key} title={item.tabLabel} />
                ))}
              </Tabs>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

export interface LegalReaderSectionProps {
  id?: string;
  className?: string;
  tocHeading?: string;
  activeDoc?: LegalDocKey;
  selectedVersionId?: string;
}

export function LegalReaderSection({
  id = "legal-reader",
  className,
  tocHeading = "On this document",
  activeDoc = "privacy",
  selectedVersionId = LEGAL_VERSIONS[0].id,
}: LegalReaderSectionProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const revealed = useSafeSectionReveal(rootRef);
  const prefersReducedMotion = useReducedMotion();

  const [clauseQuery, setClauseQuery] = React.useState("");
  const [plainSummaryMode, setPlainSummaryMode] = React.useState(true);
  const [copiedClauseId, setCopiedClauseId] = React.useState<string | null>(null);

  const doc = React.useMemo(() => resolveDocument(activeDoc), [activeDoc]);
  const version = React.useMemo(() => resolveVersion(selectedVersionId), [selectedVersionId]);

  const [activeClauseId, setActiveClauseId] = React.useState<string>(doc.clauses[0]?.id ?? "");

  React.useEffect(() => {
    setActiveClauseId(doc.clauses[0]?.id ?? "");
    setClauseQuery("");
  }, [doc]);

  const filteredClauses = React.useMemo(() => {
    const q = clauseQuery.trim().toLowerCase();
    if (!q) return doc.clauses;
    return doc.clauses.filter((clause) => {
      if (clause.title.toLowerCase().includes(q)) return true;
      if (clause.plainSummary.toLowerCase().includes(q)) return true;
      if (clause.paragraphs.some((p) => p.toLowerCase().includes(q))) return true;
      if (clause.table?.rows.some((r) => r.cells.some((c) => c.toLowerCase().includes(q)))) {
        return true;
      }
      return false;
    });
  }, [doc.clauses, clauseQuery]);

  const handleJumpClause = (clauseId: string) => {
    setActiveClauseId(clauseId);
    if (typeof document === "undefined") return;
    const ownerDoc = rootRef.current?.ownerDocument ?? document;
    const el = ownerDoc.getElementById(`clause-${clauseId}`);
    el?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleCopyClauseLink = async (clauseId: string) => {
    if (typeof window !== "undefined") {
      const targetUrl = `${window.location.origin}${window.location.pathname}#clause-${clauseId}`;
      try {
        await window.navigator?.clipboard?.writeText(targetUrl);
      } catch {
        // Clipboard permission can be unavailable inside sandboxed preview frames.
      }
    }
    setCopiedClauseId(clauseId);
    window.setTimeout(() => {
      setCopiedClauseId((prev) => (prev === clauseId ? null : prev));
    }, 2000);
  };

  const revealInitial = (yOffset: number) =>
    prefersReducedMotion ? false : { opacity: 0, y: yOffset };
  const revealTarget = revealed || prefersReducedMotion ? { opacity: 1, y: 0 } : undefined;

  return (
    <div ref={rootRef} data-landing-section="legal-reader" className="w-full">
      <Section
        id={id}
        spacing="none"
        className={cn("hb-legal-section bg-background text-foreground py-8 sm:py-12", className)}
      >
        <Container size="xl" gutter="lg">
          <div className="mx-auto w-full max-w-6xl border-t border-zinc-200/80 pt-8 sm:pt-10 dark:border-white/[0.08]">
            <motion.div
              initial={revealInitial(12)}
              animate={revealTarget}
              transition={{ duration: 0.36, ease: ABOUT_EASE_OUT }}
              className="grid grid-cols-1 gap-8 min-[960px]:grid-cols-12 min-[960px]:gap-10"
            >
              {/* Left Sticky Table of Contents & Plain Summary Toggle */}
              <aside className="hb-legal-no-print min-w-0 min-[960px]:sticky min-[960px]:top-24 min-[960px]:col-span-4 min-[960px]:self-start">
                <div className="space-y-5 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 sm:p-5 dark:border-white/10 dark:bg-[#141416]">
                  <div>
                    <Input
                      id="legal-clause-search"
                      label="Filter document clauses"
                      variant="bordered"
                      radius="lg"
                      isClearable
                      value={clauseQuery}
                      onChange={(e) => setClauseQuery(e.target.value)}
                      onClear={() => setClauseQuery("")}
                      placeholder="Search terms, retention, MIT..."
                      startContent={<Search className="h-4 w-4 text-zinc-400" aria-hidden="true" />}
                    />
                  </div>

                  <div className="rounded-xl border border-zinc-200/80 bg-white p-3.5 dark:border-white/[0.08] dark:bg-zinc-900/60">
                    <Switch
                      checked={plainSummaryMode}
                      onChange={(e) => setPlainSummaryMode(e.target.checked)}
                      label="Plain-language summary"
                      description="Display concise summaries alongside legal clauses."
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between px-1">
                      <span
                        data-hb-node="heading"
                        data-hb-edit="legal-reader:tocHeading"
                        className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400"
                      >
                        {tocHeading}
                      </span>
                      <span className="font-mono text-xs text-zinc-400">
                        {filteredClauses.length}/{doc.clauses.length}
                      </span>
                    </div>

                    <nav aria-label="Document table of contents" className="space-y-1">
                      {filteredClauses.map((clause) => {
                        const isActive = activeClauseId === clause.id;
                        return (
                          <button
                            key={clause.id}
                            type="button"
                            aria-current={isActive ? "true" : undefined}
                            onClick={() => handleJumpClause(clause.id)}
                            className={cn(
                              "hb-legal-toc-item flex min-h-11 w-full cursor-pointer items-start gap-2.5 rounded-xl px-3 py-2.5 text-left text-sm",
                              isActive
                                ? "bg-zinc-900 font-medium text-white dark:bg-white dark:text-zinc-950"
                                : "text-zinc-700 hover:bg-zinc-200/60 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-white"
                            )}
                          >
                            <span
                              className={cn(
                                "mt-0.5 shrink-0 font-mono text-xs",
                                isActive
                                  ? "text-zinc-300 dark:text-zinc-600"
                                  : "text-zinc-400 dark:text-zinc-500"
                              )}
                            >
                              0{clause.number}
                            </span>
                            <span className="leading-snug">{clause.title}</span>
                          </button>
                        );
                      })}
                    </nav>
                  </div>
                </div>
              </aside>

              {/* Right Column: Clauses */}
              <div className="min-w-0 min-[960px]:col-span-8">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={doc.key}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.18, ease: ABOUT_EASE_OUT }}
                    className="space-y-6"
                  >
                    {/* Active Document Overview Card */}
                    <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-5 sm:p-6 dark:border-white/10 dark:bg-[#141416]">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <Heading
                          as="h2"
                          size="inherit"
                          className="text-foreground text-2xl font-semibold tracking-[-0.02em] sm:text-3xl"
                        >
                          {doc.title}
                        </Heading>
                        <Badge variant="outline" size="sm" className="font-mono">
                          {version.id} · {doc.docCode}
                        </Badge>
                      </div>
                      <Text variant="muted" className="mt-2.5 text-sm leading-relaxed sm:text-base">
                        {doc.summary}
                      </Text>
                    </div>

                    {filteredClauses.length === 0 ? (
                      <div className="rounded-2xl border border-zinc-200/80 bg-white p-8 text-center dark:border-white/10 dark:bg-zinc-900/40">
                        <FileText className="mx-auto h-7 w-7 text-zinc-400" aria-hidden="true" />
                        <Heading
                          as="h3"
                          size="inherit"
                          className="text-foreground mt-3 text-lg font-semibold"
                        >
                          No matching clauses found
                        </Heading>
                        <Text variant="muted" className="mt-1 text-sm">
                          Try clearing your keyword filter to view all clauses in {doc.title}.
                        </Text>
                        <div className="mt-4">
                          <Button
                            type="button"
                            variant="outline"
                            size="md"
                            className="min-h-11"
                            onClick={() => setClauseQuery("")}
                          >
                            Reset filter
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {filteredClauses.map((clause) => {
                          const isCopied = copiedClauseId === clause.id;
                          return (
                            <article
                              key={clause.id}
                              id={`clause-${clause.id}`}
                              className="hb-legal-clause-card scroll-mt-24 rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-7 dark:border-white/[0.08] dark:bg-zinc-900/40"
                            >
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <Heading
                                  as="h3"
                                  size="inherit"
                                  className="text-foreground text-lg font-semibold tracking-[-0.015em] sm:text-xl"
                                >
                                  {clause.number}. {clause.title}
                                </Heading>

                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCopyClauseLink(clause.id)}
                                  aria-label={`Copy link to ${clause.title}`}
                                  className="hb-legal-btn-tap hb-legal-no-print min-h-11 shrink-0 gap-1.5 px-3 text-xs"
                                >
                                  {isCopied ? (
                                    <>
                                      <Check
                                        className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400"
                                        aria-hidden="true"
                                      />
                                      <span>Copied</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                                      <span>Copy link</span>
                                    </>
                                  )}
                                </Button>
                              </div>

                              <AnimatePresence initial={false}>
                                {plainSummaryMode && (
                                  <motion.div
                                    key="plain-summary"
                                    initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                                    transition={{ duration: 0.16, ease: ABOUT_EASE_OUT }}
                                    className="mt-4 rounded-xl border-l-2 border-zinc-900 bg-zinc-50 p-4 dark:border-zinc-100 dark:bg-zinc-900/80"
                                  >
                                    <p className="text-xs font-semibold tracking-wide text-zinc-900 uppercase dark:text-zinc-100">
                                      Plain-language summary
                                    </p>
                                    <p className="mt-1 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                                      {clause.plainSummary}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600 sm:text-[15px] dark:text-zinc-300">
                                {clause.paragraphs.map((paragraph, idx) => (
                                  <p key={idx}>{paragraph}</p>
                                ))}
                              </div>

                              {clause.table && (
                                <div className="mt-5">
                                  {/* Mobile Stacked Cards (< 640px) */}
                                  <div className="space-y-2.5 sm:hidden">
                                    {clause.table.rows.map((row, rowIdx) => (
                                      <div
                                        key={rowIdx}
                                        className="rounded-xl border border-zinc-200/80 bg-zinc-50/70 p-3.5 text-sm dark:border-white/10 dark:bg-zinc-900/60"
                                      >
                                        <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                                          {row.cells[0]}
                                        </p>
                                        <dl className="mt-2 space-y-1 text-xs">
                                          <div className="flex justify-between gap-2">
                                            <dt className="text-zinc-500 dark:text-zinc-400">
                                              {clause.table?.headers[1]}
                                            </dt>
                                            <dd className="text-right font-medium text-zinc-800 dark:text-zinc-200">
                                              {row.cells[1]}
                                            </dd>
                                          </div>
                                          <div className="flex justify-between gap-2">
                                            <dt className="text-zinc-500 dark:text-zinc-400">
                                              {clause.table?.headers[2]}
                                            </dt>
                                            <dd className="text-right font-medium text-zinc-800 dark:text-zinc-200">
                                              {row.cells[2]}
                                            </dd>
                                          </div>
                                        </dl>
                                      </div>
                                    ))}
                                  </div>

                                  {/* Desktop Clean Bordered Table (>= 640px) */}
                                  <div className="hidden overflow-hidden rounded-xl border border-zinc-200/80 sm:block dark:border-white/10">
                                    <table className="w-full border-collapse text-left text-sm">
                                      <thead className="bg-zinc-50 dark:bg-zinc-900/80">
                                        <tr className="border-b border-zinc-200/80 dark:border-white/10">
                                          {clause.table.headers.map((header) => (
                                            <th
                                              key={header}
                                              scope="col"
                                              className="px-4 py-3 text-xs font-semibold tracking-wide text-zinc-700 uppercase dark:text-zinc-300"
                                            >
                                              {header}
                                            </th>
                                          ))}
                                        </tr>
                                      </thead>
                                      <tbody className="divide-y divide-zinc-200/70 dark:divide-white/[0.06]">
                                        {clause.table.rows.map((row, rowIdx) => (
                                          <tr key={rowIdx}>
                                            <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                                              {row.cells[0]}
                                            </td>
                                            <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                                              {row.cells[1]}
                                            </td>
                                            <td className="px-4 py-3 text-zinc-600 dark:text-zinc-300">
                                              {row.cells[2]}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              )}
                            </article>
                          );
                        })}
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

export interface LegalPreferencesSectionProps {
  id?: string;
  className?: string;
  heading?: string;
  subheading?: string;
  brandName?: string;
  activeDoc?: LegalDocKey;
  selectedVersionId?: string;
}

export function LegalPreferencesSection({
  id = "legal-preferences",
  className,
  heading = "Consent & Data Rights",
  subheading = "Adjust optional browser telemetry below or file a formal data access, DPA, or erasure request directly with our privacy team.",
  brandName = "Hudbird",
  activeDoc = "privacy",
  selectedVersionId = LEGAL_VERSIONS[0].id,
}: LegalPreferencesSectionProps) {
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const revealed = useSafeSectionReveal(rootRef);
  const prefersReducedMotion = useReducedMotion();

  const [prefs, setPrefs] = React.useState<CookiePreferenceState>(DEFAULT_COOKIE_PREFERENCES);
  const [consentStatus, setConsentStatus] = React.useState<string | null>(null);

  const [dsarEmail, setDsarEmail] = React.useState("");
  const [dsarType, setDsarType] = React.useState(LEGAL_DSAR_TYPES[0].value);
  const [dsarWorkspace, setDsarWorkspace] = React.useState("");
  const [dsarNotes, setDsarNotes] = React.useState("");
  const [dsarError, setDsarError] = React.useState<string | null>(null);
  const [submittedDsar, setSubmittedDsar] = React.useState<{
    referenceId: string;
    email: string;
    typeLabel: string;
    turnaround: string;
  } | null>(null);

  React.useEffect(() => {
    try {
      const saved = window.localStorage?.getItem(CONSENT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<CookiePreferenceState>;
        setPrefs({
          essential: true,
          analytics: Boolean(parsed.analytics),
          diagnostics:
            typeof parsed.diagnostics === "boolean"
              ? parsed.diagnostics
              : DEFAULT_COOKIE_PREFERENCES.diagnostics,
          errorTelemetry:
            typeof parsed.errorTelemetry === "boolean"
              ? parsed.errorTelemetry
              : DEFAULT_COOKIE_PREFERENCES.errorTelemetry,
        });
      }
    } catch {
      // Ignore storage access errors in restricted preview sandboxes.
    }
  }, []);

  const persistConsent = (next: CookiePreferenceState, summary: string) => {
    setPrefs(next);
    try {
      window.localStorage?.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore storage write errors in restricted preview sandboxes.
    }
    setConsentStatus(summary);
  };

  const handleSavePreferences = () => {
    const enabledExtras = [
      prefs.analytics ? "Analytics" : null,
      prefs.diagnostics ? "Preview Diagnostics" : null,
      prefs.errorTelemetry ? "Error Telemetry" : null,
    ].filter(Boolean);
    const label = enabledExtras.length
      ? `Preferences saved: Essential + ${enabledExtras.join(", ")}.`
      : "Preferences saved: Essential cookies only.";
    persistConsent(prefs, label);
  };

  const handleEssentialOnly = () => {
    persistConsent(
      {
        essential: true,
        analytics: false,
        diagnostics: false,
        errorTelemetry: false,
      },
      "Preferences saved: Essential cookies only."
    );
  };

  const selectedDsarOption =
    LEGAL_DSAR_TYPES.find((item) => item.value === dsarType) ?? LEGAL_DSAR_TYPES[0];

  const handleDsarSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedEmail = dsarEmail.trim();
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setDsarError("Enter a valid email address so we can verify account ownership.");
      return;
    }

    setDsarError(null);
    const numericSuffix = String(Math.abs(trimmedEmail.length * 137 + dsarType.length * 41))
      .padStart(4, "0")
      .slice(0, 4);

    setSubmittedDsar({
      referenceId: `HB-DSAR-${numericSuffix}`,
      email: trimmedEmail,
      typeLabel: selectedDsarOption.label,
      turnaround: selectedDsarOption.turnaround,
    });
  };

  const doc = React.useMemo(() => resolveDocument(activeDoc), [activeDoc]);
  const version = React.useMemo(() => resolveVersion(selectedVersionId), [selectedVersionId]);

  const revealInitial = (yOffset: number) =>
    prefersReducedMotion ? false : { opacity: 0, y: yOffset };
  const revealTarget = revealed || prefersReducedMotion ? { opacity: 1, y: 0 } : undefined;

  return (
    <div ref={rootRef} data-landing-section="legal-preferences" className="w-full">
      <Section
        id={id}
        spacing="none"
        className={cn(
          "hb-legal-section hb-legal-no-print bg-background text-foreground pt-8 pb-16 sm:pt-12 sm:pb-24",
          className
        )}
      >
        <Container size="xl" gutter="lg">
          <div className="mx-auto w-full max-w-6xl border-t border-zinc-200/80 pt-10 sm:pt-12 dark:border-white/[0.08]">
            <motion.div
              initial={revealInitial(12)}
              animate={revealTarget}
              transition={{ duration: 0.36, ease: ABOUT_EASE_OUT }}
              className="max-w-2xl"
            >
              <Heading
                as="h2"
                size="inherit"
                data-hb-node="heading"
                data-hb-edit="legal-preferences:heading"
                className="text-foreground text-2xl font-semibold tracking-[-0.025em] sm:text-3xl"
              >
                {heading}
              </Heading>
              <Text
                variant="muted"
                data-hb-node="text"
                data-hb-edit="legal-preferences:subheading"
                className="mt-2 text-sm leading-relaxed sm:text-base"
              >
                {subheading}
              </Text>
            </motion.div>

            <motion.div
              initial={revealInitial(16)}
              animate={revealTarget}
              transition={{ duration: 0.4, delay: 0.05, ease: ABOUT_EASE_OUT }}
              className="mt-8 grid grid-cols-1 gap-6 min-[960px]:grid-cols-12 min-[960px]:gap-8"
            >
              {/* Left Card: Cookie & Telemetry Preferences */}
              <div className="min-w-0 rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-5 min-[960px]:col-span-6 sm:p-7 dark:border-white/10 dark:bg-[#141416]">
                <Heading
                  as="h3"
                  size="inherit"
                  className="text-foreground text-lg font-semibold tracking-tight sm:text-xl"
                >
                  Cookie & Telemetry Preferences
                </Heading>
                <Text variant="muted" className="mt-1.5 text-sm leading-relaxed">
                  Control how this preview domain remembers local state and diagnostic checks.
                </Text>

                <div className="mt-5 space-y-3">
                  <div className="rounded-xl border border-zinc-200/80 bg-white p-4 dark:border-white/[0.08] dark:bg-zinc-900/60">
                    <Switch
                      checked
                      disabled
                      label="Essential workspace session (Always active)"
                      description="Keeps active page routes, color scheme, and unsaved draft edits working."
                    />
                  </div>

                  <div className="rounded-xl border border-zinc-200/80 bg-white p-4 dark:border-white/[0.08] dark:bg-zinc-900/60">
                    <Switch
                      checked={prefs.analytics}
                      onChange={(e) => {
                        setPrefs((prev) => ({ ...prev, analytics: e.target.checked }));
                        if (consentStatus) setConsentStatus(null);
                      }}
                      label="Usage analytics"
                      description="Counts anonymous documentation template views with zero third-party ad pixels."
                    />
                  </div>

                  <div className="rounded-xl border border-zinc-200/80 bg-white p-4 dark:border-white/[0.08] dark:bg-zinc-900/60">
                    <Switch
                      checked={prefs.diagnostics}
                      onChange={(e) => {
                        setPrefs((prev) => ({ ...prev, diagnostics: e.target.checked }));
                        if (consentStatus) setConsentStatus(null);
                      }}
                      label="Preview breakpoint diagnostics"
                      description="Measures iframe resize timing so mobile and tablet layouts stay calibrated."
                    />
                  </div>

                  <div className="rounded-xl border border-zinc-200/80 bg-white p-4 dark:border-white/[0.08] dark:bg-zinc-900/60">
                    <Switch
                      checked={prefs.errorTelemetry}
                      onChange={(e) => {
                        setPrefs((prev) => ({
                          ...prev,
                          errorTelemetry: e.target.checked,
                        }));
                        if (consentStatus) setConsentStatus(null);
                      }}
                      label="Error boundary telemetry"
                      description="Logs unhandled React exceptions inside the docs preview container."
                    />
                  </div>
                </div>

                {consentStatus && (
                  <p
                    role="status"
                    className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2.5 text-sm font-medium text-emerald-700 dark:text-emerald-300"
                  >
                    <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>{consentStatus}</span>
                  </p>
                )}

                <div className="mt-5 flex flex-wrap gap-3">
                  <Button
                    type="button"
                    color="primary"
                    size="md"
                    className="hb-legal-btn-tap min-h-11"
                    onClick={handleSavePreferences}
                  >
                    Save preferences
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    className="hb-legal-btn-tap min-h-11"
                    onClick={handleEssentialOnly}
                  >
                    Essential only
                  </Button>
                </div>
              </div>

              {/* Right Card: DSAR & Export Workspace */}
              <div className="min-w-0 rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-5 min-[960px]:col-span-6 sm:p-7 dark:border-white/10 dark:bg-[#141416]">
                <Heading
                  as="h3"
                  size="inherit"
                  className="text-foreground text-lg font-semibold tracking-tight sm:text-xl"
                >
                  Data Subject Request (DSAR)
                </Heading>
                <Text variant="muted" className="mt-1.5 text-sm leading-relaxed">
                  Request a JSON archive export, signed Data Processing Addendum, or record deletion
                  for your workspace account.
                </Text>

                {submittedDsar ? (
                  <div
                    role="status"
                    className="mt-5 space-y-5 rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-zinc-900/60"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div>
                        <span className="font-mono text-xs font-medium text-zinc-500 dark:text-zinc-400">
                          Reference {submittedDsar.referenceId}
                        </span>
                        <Heading
                          as="h4"
                          size="inherit"
                          className="text-foreground mt-0.5 text-lg font-semibold"
                        >
                          Privacy request logged
                        </Heading>
                      </div>
                    </div>

                    <div className="space-y-1.5 rounded-xl border border-zinc-200/80 bg-zinc-50/80 p-4 text-sm dark:border-white/[0.06] dark:bg-zinc-950/40">
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">
                        {submittedDsar.typeLabel}
                      </p>
                      <p className="text-zinc-600 dark:text-zinc-400">
                        Account email: {submittedDsar.email}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Target SLA: {submittedDsar.turnaround}
                      </p>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      size="md"
                      className="hb-legal-btn-tap min-h-11 gap-2"
                      onClick={() => {
                        setSubmittedDsar(null);
                        setDsarEmail("");
                        setDsarWorkspace("");
                        setDsarNotes("");
                      }}
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      <span>Submit another request</span>
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleDsarSubmit} noValidate className="mt-5 space-y-4">
                    <Input
                      id="dsar-email"
                      type="email"
                      label="Account or contact email"
                      variant="bordered"
                      radius="lg"
                      value={dsarEmail}
                      onChange={(e) => {
                        setDsarEmail(e.target.value);
                        if (dsarError) setDsarError(null);
                      }}
                      placeholder="privacy-admin@company.com"
                    />

                    <div>
                      <Select
                        id="dsar-request-type"
                        label="Request type"
                        variant="bordered"
                        radius="lg"
                        value={dsarType}
                        onValueChange={setDsarType}
                      >
                        {LEGAL_DSAR_TYPES.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </Select>
                      <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                        Estimated turnaround: {selectedDsarOption.turnaround}
                      </p>
                    </div>

                    <Input
                      id="dsar-workspace"
                      label="Workspace ID or domain"
                      variant="bordered"
                      radius="lg"
                      value={dsarWorkspace}
                      onChange={(e) => setDsarWorkspace(e.target.value)}
                      placeholder="Optional (e.g. studio.company.com)"
                    />

                    <Textarea
                      id="dsar-notes"
                      label="Additional verification context"
                      variant="bordered"
                      radius="lg"
                      rows={2}
                      value={dsarNotes}
                      onChange={(e) => setDsarNotes(e.target.value)}
                      placeholder="Include seat IDs or organization legal entity name if applicable..."
                    />

                    {dsarError && (
                      <p
                        role="alert"
                        className="rounded-xl border border-rose-500/25 bg-rose-500/10 px-3.5 py-2.5 text-sm font-medium text-rose-600 dark:text-rose-400"
                      >
                        {dsarError}
                      </p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                      <Button
                        type="submit"
                        color="primary"
                        size="md"
                        className="hb-legal-btn-tap min-h-11"
                      >
                        Submit data request
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="md"
                        className="hb-legal-btn-tap min-h-11 gap-2"
                        onClick={() => downloadLegalText(doc, version, brandName)}
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        <span>Export {doc.tabLabel} (.txt)</span>
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
    </div>
  );
}

export interface LegalPageSectionProps {
  id?: string;
  className?: string;
  brandName?: string;
  heroHeading?: string;
  heroSubheading?: string;
  readerTocHeading?: string;
  preferencesHeading?: string;
  preferencesSubheading?: string;
  initialDoc?: LegalDocKey;
  syncVersion?: number;
  visibleSections?: LegalSectionBlockId[];
}

const DEFAULT_VISIBLE_SECTIONS: LegalSectionBlockId[] = [
  "legal-hero",
  "legal-reader",
  "legal-preferences",
];

export function LegalPageSection({
  id = "legal-page",
  className,
  brandName = "Hudbird",
  heroHeading,
  heroSubheading,
  readerTocHeading,
  preferencesHeading,
  preferencesSubheading,
  initialDoc = "privacy",
  syncVersion = 0,
  visibleSections = DEFAULT_VISIBLE_SECTIONS,
}: LegalPageSectionProps) {
  const [activeDoc, setActiveDoc] = React.useState<LegalDocKey>(initialDoc);
  const [selectedVersionId, setSelectedVersionId] = React.useState<string>(LEGAL_VERSIONS[0].id);

  React.useEffect(() => {
    setActiveDoc(initialDoc);
  }, [initialDoc, syncVersion]);

  const showHero = visibleSections.includes("legal-hero");
  const showReader = visibleSections.includes("legal-reader");
  const showPreferences = visibleSections.includes("legal-preferences");

  return (
    <div id={id} data-landing-section="legal-page" className={cn("w-full", className)}>
      {showHero && (
        <LegalHeroSection
          heading={heroHeading}
          subheading={heroSubheading}
          brandName={brandName}
          activeDoc={activeDoc}
          onSelectDoc={setActiveDoc}
          selectedVersionId={selectedVersionId}
          onVersionChange={setSelectedVersionId}
        />
      )}
      {showReader && (
        <LegalReaderSection
          tocHeading={readerTocHeading}
          activeDoc={activeDoc}
          selectedVersionId={selectedVersionId}
        />
      )}
      {showPreferences && (
        <LegalPreferencesSection
          heading={preferencesHeading}
          subheading={preferencesSubheading}
          brandName={brandName}
          activeDoc={activeDoc}
          selectedVersionId={selectedVersionId}
        />
      )}
    </div>
  );
}
