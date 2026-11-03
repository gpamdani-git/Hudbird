"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Section,
  Container,
  Grid,
  DoubleBezelCard,
  Alert,
  Divider,
  Accordion,
  AccordionItem,
  Tabs,
  Tab,
  AreaChart,
  BarChart,
  Skeleton,
  Progress,
  Badge,
  Button,
  KineticButton,
  Heading,
  Text,
  Lead,
  Code,
} from "@hudbird/ui";
import {
  Cpu,
  TrendingUp,
  ShieldCheck,
  RotateCcw,
  CheckCircle2,
  Terminal,
  Copy,
  Check,
  FileCode2,
  Activity,
} from "lucide-react";

export type AgentScenarioId = "edge-cluster" | "revenue-model" | "zero-trust";
export type ArtifactViewTab = "telemetry" | "spec" | "summary";

export interface AgentArtifactCanvasProps {
  /** Initial active agent scenario */
  defaultScenario?: AgentScenarioId;
  /** Controlled active scenario */
  scenario?: AgentScenarioId;
  /** Callback fired when active scenario changes */
  onScenarioChange?: (scenario: AgentScenarioId) => void;
  /** Kept for backward compatibility */
  badgeText?: string;
  /** Section headline */
  title?: string;
  /** Section description */
  description?: string;
  /** Optional className for root Section */
  className?: string;
}

interface ReasoningStep {
  key: string;
  title: string;
  subtitle: string;
  detail: string;
}

interface ScenarioConfig {
  id: AgentScenarioId;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  prompt: string;
  artifactTitle: string;
  chartQuestion: string;
  artifactBadge: string;
  confidence: number;
  chartType: "area" | "bar";
  chartIndex: string;
  chartCategories: string[];
  chartColors: string[];
  chartUnitPrefix?: string;
  chartUnitSuffix?: string;
  chartData: Record<string, string | number>[];
  kpis: { label: string; value: string; note: string }[];
  steps: ReasoningStep[];
  codeSnippet: string;
  summaryPoints: { title: string; detail: string }[];
}

const SCENARIOS: Record<AgentScenarioId, ScenarioConfig> = {
  "edge-cluster": {
    id: "edge-cluster",
    label: "Worker Scaling",
    icon: Cpu,
    prompt: "Keep p99 latency under 20ms across sin1, fra1, and iad1 during peak traffic.",
    artifactTitle: "Regional Worker Scaling Plan",
    chartQuestion: "Warm workers vs. p99 latency (ms) over 24 hours",
    artifactBadge: "3 regions",
    confidence: 98,
    chartType: "area",
    chartIndex: "window",
    chartCategories: ["Warm Workers", "p99 Latency (ms)"],
    chartColors: ["indigo", "emerald"],
    chartUnitSuffix: "",
    chartData: [
      { window: "00:00", "Warm Workers": 42, "p99 Latency (ms)": 24 },
      { window: "04:00", "Warm Workers": 58, "p99 Latency (ms)": 21 },
      { window: "08:00", "Warm Workers": 94, "p99 Latency (ms)": 18 },
      { window: "12:00", "Warm Workers": 128, "p99 Latency (ms)": 15 },
      { window: "16:00", "Warm Workers": 116, "p99 Latency (ms)": 14 },
      { window: "20:00", "Warm Workers": 88, "p99 Latency (ms)": 13 },
    ],
    kpis: [
      { label: "Target p99", value: "15ms", note: "Down from 24ms" },
      { label: "Min workers", value: "48", note: "16 per region" },
      { label: "Max burst", value: "160", note: "Auto-scaled" },
    ],
    steps: [
      {
        key: "step-1",
        title: "1. Read regional latency",
        subtitle: "sin1, fra1, iad1 · 140ms",
        detail:
          "Sampled 24-hour request logs. Cold starts in sin1 pushed p99 latency to 28ms at 08:00 UTC.",
      },
      {
        key: "step-2",
        title: "2. Size warm worker pool",
        subtitle: "min 48, max 160 · 310ms",
        detail:
          "Set a baseline of 48 pre-warmed workers balanced across three regions to absorb morning traffic spikes.",
      },
      {
        key: "step-3",
        title: "3. Validate config schema",
        subtitle: "edge-cluster.ts · 190ms",
        detail: "Checked memory limits (128MB per worker) and failover health-check intervals.",
      },
    ],
    codeSnippet: `export const workerScalingConfig = {
  regions: ["sin1", "fra1", "iad1"],
  scaling: {
    minWarmWorkers: 48,
    maxBurstWorkers: 160,
    targetP99LatencyMs: 15,
  },
  healthCheckIntervalMs: 500,
};`,
    summaryPoints: [
      {
        title: "Pre-warmed baseline",
        detail:
          "Keeps 16 workers ready in each region so morning traffic does not hit cold starts.",
      },
      {
        title: "Health check failover",
        detail: "Reroutes traffic within 500ms if a regional endpoint stops responding.",
      },
    ],
  },
  "revenue-model": {
    id: "revenue-model",
    label: "Pricing Model",
    icon: TrendingUp,
    prompt: "Compare base subscription revenue against metered usage revenue from Q1 to Q4.",
    artifactTitle: "Subscription vs. Usage Breakdown",
    chartQuestion: "Projected quarterly revenue ($k) by source",
    artifactBadge: "Sample model",
    confidence: 96,
    chartType: "bar",
    chartIndex: "quarter",
    chartCategories: ["Base Seats", "Metered Usage"],
    chartColors: ["indigo", "cyan"],
    chartUnitPrefix: "$",
    chartUnitSuffix: "k",
    chartData: [
      { quarter: "Q1", "Base Seats": 420, "Metered Usage": 95 },
      { quarter: "Q2", "Base Seats": 510, "Metered Usage": 165 },
      { quarter: "Q3", "Base Seats": 640, "Metered Usage": 260 },
      { quarter: "Q4", "Base Seats": 790, "Metered Usage": 390 },
    ],
    kpis: [
      { label: "Base seat price", value: "$49", note: "Per month" },
      { label: "Included runs", value: "25,000", note: "Monthly pool" },
      { label: "Overage rate", value: "$0.85", note: "Per 1k runs" },
    ],
    steps: [
      {
        key: "step-1",
        title: "1. Group usage by tier",
        subtitle: "cohort_usage.sql · 210ms",
        detail:
          "Segmented workspaces by monthly task volume to find where flat seat pricing caps revenue.",
      },
      {
        key: "step-2",
        title: "2. Test usage thresholds",
        subtitle: "25k included runs · 420ms",
        detail:
          "Modeled a $49 base seat with 25,000 included runs so small teams stay on predictable billing.",
      },
      {
        key: "step-3",
        title: "3. Export billing rules",
        subtitle: "pricing-plan.ts · 160ms",
        detail:
          "Generated plan configuration with configurable spend alerts at 80% of monthly budget.",
      },
    ],
    codeSnippet: `export const pricingPlanConfig = {
  planId: "team-hybrid",
  baseSeatUsd: 49,
  includedRuns: 25_000,
  overagePerThousandUsd: 0.85,
  budgetAlertPercent: 80,
};`,
    summaryPoints: [
      {
        title: "Predictable base tier",
        detail: "Teams under 25,000 monthly runs pay only the flat $49 seat price.",
      },
      {
        title: "Spend cap alerts",
        detail: "Sends a webhook notification when a workspace reaches 80% of its monthly limit.",
      },
    ],
  },
  "zero-trust": {
    id: "zero-trust",
    label: "TLS & Rate Limits",
    icon: ShieldCheck,
    prompt: "Check TLS certificate rotation intervals and set per-IP rate limits on public routes.",
    artifactTitle: "Traffic Filtering & TLS Rules",
    chartQuestion: "Allowed requests vs. rate-limited requests (last 6 hours)",
    artifactBadge: "Policy check",
    confidence: 99,
    chartType: "area",
    chartIndex: "window",
    chartCategories: ["Allowed", "Rate-Limited"],
    chartColors: ["emerald", "amber"],
    chartUnitSuffix: "",
    chartData: [
      { window: "-5h", Allowed: 820, "Rate-Limited": 48 },
      { window: "-4h", Allowed: 910, "Rate-Limited": 62 },
      { window: "-3h", Allowed: 960, "Rate-Limited": 19 },
      { window: "-2h", Allowed: 1040, "Rate-Limited": 8 },
      { window: "-1h", Allowed: 1120, "Rate-Limited": 3 },
      { window: "Now", Allowed: 1190, "Rate-Limited": 0 },
    ],
    kpis: [
      { label: "TLS version", value: "1.3", note: "Strict mode" },
      { label: "Cert rotation", value: "24h", note: "Automated" },
      { label: "Rate limit", value: "120/min", note: "Per IP" },
    ],
    steps: [
      {
        key: "step-1",
        title: "1. Inspect certificate expiry",
        subtitle: "tls_audit · 175ms",
        detail:
          "Checked active internal and public endpoints. Found two staging routes using 90-day manual certificates.",
      },
      {
        key: "step-2",
        title: "2. Configure 24h rotation",
        subtitle: "acme_renewal · 260ms",
        detail: "Switched staging and production routes to automated 24-hour certificate renewal.",
      },
      {
        key: "step-3",
        title: "3. Set IP rate limits",
        subtitle: "120 req/min · 205ms",
        detail: "Applied a 120-request-per-minute limit per IP on public authentication endpoints.",
      },
    ],
    codeSnippet: `export const securityPolicyConfig = {
  minimumTlsVersion: "1.3",
  certRotationHours: 24,
  rateLimit: {
    requestsPerMinute: 120,
    scope: "public-auth-routes",
  },
};`,
    summaryPoints: [
      {
        title: "24-hour certificate renewal",
        detail: "Replaces manual 90-day staging certificates with automated daily rotation.",
      },
      {
        title: "Login route rate limiting",
        detail: "Caps public auth endpoints at 120 requests per minute per IP address.",
      },
    ],
  },
};

export const AgentArtifactCanvas: React.FC<AgentArtifactCanvasProps> = ({
  defaultScenario = "edge-cluster",
  scenario: controlledScenario,
  onScenarioChange,
  title = "Task Steps and Output Preview",
  description = "Compare the step-by-step execution log on the right with the generated chart, configuration file, and summary on the left.",
  className,
}) => {
  const [uncontrolledScenario, setUncontrolledScenario] =
    React.useState<AgentScenarioId>(defaultScenario);
  const [activeTab, setActiveTab] = React.useState<ArtifactViewTab>("telemetry");
  const [expandedSteps, setExpandedSteps] = React.useState<string[]>(["step-1", "step-2"]);
  const [isStreaming, setIsStreaming] = React.useState<boolean>(false);
  const [visibleStepCount, setVisibleStepCount] = React.useState<number>(3);
  const [isCopied, setIsCopied] = React.useState<boolean>(false);
  const [isApplied, setIsApplied] = React.useState<boolean>(false);

  const isControlled = controlledScenario !== undefined;
  const activeScenarioId = isControlled ? controlledScenario : uncontrolledScenario;
  const current = SCENARIOS[activeScenarioId];

  const triggerAgentRun = React.useCallback(
    (nextScenario?: AgentScenarioId) => {
      if (nextScenario) {
        if (!isControlled) {
          setUncontrolledScenario(nextScenario);
        }
        onScenarioChange?.(nextScenario);
      }
      setIsApplied(false);
      setIsStreaming(true);
      setVisibleStepCount(1);
      setExpandedSteps(["step-1"]);
    },
    [isControlled, onScenarioChange]
  );

  React.useEffect(() => {
    if (!isStreaming) return;

    const t1 = window.setTimeout(() => {
      setVisibleStepCount(2);
      setExpandedSteps(["step-1", "step-2"]);
    }, 320);

    const t2 = window.setTimeout(() => {
      setVisibleStepCount(3);
      setExpandedSteps(["step-2", "step-3"]);
    }, 640);

    const t3 = window.setTimeout(() => {
      setIsStreaming(false);
    }, 920);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [isStreaming]);

  const handleCopySpec = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(current.codeSnippet).catch(() => {});
    }
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1800);
  };

  const formatChartValue = React.useCallback(
    (val: number) => {
      const prefix = current.chartUnitPrefix ?? "";
      const suffix = current.chartUnitSuffix ?? "";
      return `${prefix}${val}${suffix}`;
    },
    [current.chartUnitPrefix, current.chartUnitSuffix]
  );

  return (
    <Section spacing="lg" className={className}>
      <Container size="xl">
        <Container size="prose" gutter="none">
          <Section spacing="sm">
            <div className="flex flex-col items-center gap-4 text-center">
              <Heading as="h2" size="h1" tracking="tight">
                {title}
              </Heading>

              <Lead align="center">{description}</Lead>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Tabs
                  variant="solid"
                  size="sm"
                  radius="lg"
                  selectedKey={activeScenarioId}
                  onSelectionChange={(key) => triggerAgentRun(key as AgentScenarioId)}
                >
                  {(Object.keys(SCENARIOS) as AgentScenarioId[]).map((key) => {
                    const item = SCENARIOS[key];
                    const ItemIcon = item.icon;
                    return (
                      <Tab
                        key={key}
                        tabKey={key}
                        title={item.label}
                        icon={<ItemIcon className="h-3.5 w-3.5" />}
                      />
                    );
                  })}
                </Tabs>

                <Button
                  size="sm"
                  variant="outline"
                  radius="lg"
                  onClick={() => triggerAgentRun()}
                  disabled={isStreaming}
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {isStreaming ? "Running..." : "Re-run steps"}
                </Button>
              </div>
            </div>
          </Section>
        </Container>

        <Grid layout="bento-split" gap="md" align="stretch">
          {/* LEFT PANE (7 Cols): Output Preview (No nested Cards-inside-Cards) */}
          <DoubleBezelCard variant="default" padding="md">
            <div className="flex h-full flex-col justify-between gap-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Heading as="h3" size="h4">
                      {current.artifactTitle}
                    </Heading>
                    <Badge variant="soft" color="zinc" size="sm">
                      {current.artifactBadge}
                    </Badge>
                  </div>
                  <Text variant="small">{current.chartQuestion}</Text>
                </div>

                <Tabs
                  variant="solid"
                  size="sm"
                  radius="lg"
                  selectedKey={activeTab}
                  onSelectionChange={(k) => setActiveTab(k as ArtifactViewTab)}
                >
                  <Tab
                    tabKey="telemetry"
                    title="Chart"
                    icon={<Activity className="h-3.5 w-3.5" />}
                  />
                  <Tab tabKey="spec" title="Config" icon={<FileCode2 className="h-3.5 w-3.5" />} />
                  <Tab tabKey="summary" title="Notes" icon={<Terminal className="h-3.5 w-3.5" />} />
                </Tabs>
              </div>

              <Divider variant="solid" />

              <div className="min-h-[280px] flex-1">
                <AnimatePresence mode="wait">
                  {isStreaming ? (
                    <motion.div
                      key="artifact-skeleton"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="flex flex-col gap-4"
                    >
                      <Grid cols={3} gap="sm">
                        <Skeleton variant="rect" className="h-16 w-full rounded-xl" />
                        <Skeleton variant="rect" className="h-16 w-full rounded-xl" />
                        <Skeleton variant="rect" className="h-16 w-full rounded-xl" />
                      </Grid>
                      <Skeleton variant="rect" className="h-52 w-full rounded-2xl" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`${current.id}-${activeTab}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="flex flex-col gap-5"
                    >
                      {/* TAB 1: CHART + METRICS DIRECTLY ON SURFACE */}
                      {activeTab === "telemetry" && (
                        <>
                          <Grid cols={3} gap="md">
                            {current.kpis.map((kpi) => (
                              <div key={kpi.label} className="flex flex-col gap-0.5">
                                <Text variant="small">{kpi.label}</Text>
                                <Heading as="h4" size="h3">
                                  {kpi.value}
                                </Heading>
                                <Text variant="muted">{kpi.note}</Text>
                              </div>
                            ))}
                          </Grid>

                          <Divider variant="solid" />

                          {current.chartType === "area" ? (
                            <AreaChart
                              className="h-52"
                              data={current.chartData}
                              index={current.chartIndex}
                              categories={current.chartCategories}
                              colors={current.chartColors}
                              valueFormatter={formatChartValue}
                              showLegend
                              showGridLines
                            />
                          ) : (
                            <BarChart
                              className="h-52"
                              data={current.chartData}
                              index={current.chartIndex}
                              categories={current.chartCategories}
                              colors={current.chartColors}
                              valueFormatter={formatChartValue}
                              showLegend
                            />
                          )}
                        </>
                      )}

                      {/* TAB 2: CONFIG FILE */}
                      {activeTab === "spec" && (
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between">
                            <Code>{current.id}.config.ts</Code>
                            <Button
                              size="sm"
                              variant="outline"
                              radius="md"
                              onClick={handleCopySpec}
                            >
                              {isCopied ? (
                                <>
                                  <Check className="h-3.5 w-3.5" />
                                  Copied
                                </>
                              ) : (
                                <>
                                  <Copy className="h-3.5 w-3.5" />
                                  Copy config
                                </>
                              )}
                            </Button>
                          </div>
                          <Divider variant="solid" />
                          <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
                            <code>{current.codeSnippet}</code>
                          </pre>
                        </div>
                      )}

                      {/* TAB 3: SUMMARY NOTES */}
                      {activeTab === "summary" && (
                        <div className="flex flex-col gap-3">
                          {current.summaryPoints.map((pt) => (
                            <Alert
                              key={pt.title}
                              variant="soft"
                              color="primary"
                              icon={<CheckCircle2 className="h-4 w-4" />}
                              title={pt.title}
                              description={pt.detail}
                            />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Divider variant="solid" />

              <div className="flex flex-wrap items-center justify-between gap-3">
                <Text variant="small">
                  {isApplied ? "Configuration applied." : "Ready to apply changes."}
                </Text>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    radius="lg"
                    onClick={() => setActiveTab((prev) => (prev === "spec" ? "telemetry" : "spec"))}
                  >
                    {activeTab === "spec" ? "Show chart" : "Show config"}
                  </Button>
                  <KineticButton
                    size="sm"
                    variant="primary"
                    showArrow={false}
                    onClick={() => setIsApplied(true)}
                  >
                    {isApplied ? "Applied" : "Apply config"}
                  </KineticButton>
                </div>
              </div>
            </div>
          </DoubleBezelCard>

          {/* RIGHT PANE (5 Cols): Prompt & Clean Accordion Steps (Zero Truncation) */}
          <DoubleBezelCard variant="solid" padding="md">
            <div className="flex h-full flex-col justify-between gap-5">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <Heading as="h3" size="h5">
                      Task prompt
                    </Heading>
                    <Badge variant="soft" color={isStreaming ? "warning" : "success"} size="sm">
                      {isStreaming ? "Running" : "3 steps done"}
                    </Badge>
                  </div>
                  <Text variant="quote">{current.prompt}</Text>
                </div>

                <Divider variant="solid" />

                <div className="flex flex-col gap-2">
                  <Heading as="h4" size="h5">
                    Execution log
                  </Heading>

                  <Accordion
                    variant="splitted"
                    selectionMode="multiple"
                    isCompact
                    selectedKeys={expandedSteps}
                    onSelectionChange={setExpandedSteps}
                  >
                    {current.steps.slice(0, visibleStepCount).map((step) => (
                      <AccordionItem
                        key={`${current.id}-${step.key}`}
                        itemKey={step.key}
                        startContent={<CheckCircle2 className="h-4 w-4" />}
                        title={step.title}
                        subtitle={step.subtitle}
                      >
                        <Text variant="muted">{step.detail}</Text>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Divider variant="solid" />
                <Progress
                  size="sm"
                  radius="full"
                  color="success"
                  value={isStreaming ? 62 : current.confidence}
                  isStriped={isStreaming}
                  label="Validation checks passed"
                  showValueLabel
                />
              </div>
            </div>
          </DoubleBezelCard>
        </Grid>
      </Container>
    </Section>
  );
};

AgentArtifactCanvas.displayName = "AgentArtifactCanvas";
