import React from "react";
import { PageToolbar } from "../../components/PageToolbar";
import bentoGridCode from "../../../../../packages/marketing/src/components/BentoGrid/BentoGrid.tsx?raw";
import bentoGridGlassCode from "../../../../../packages/marketing/src/components/BentoGrid/BentoGridGlass.tsx?raw";
import { InstallationTabs } from "../../components/InstallationTabs";
import {
  BentoGrid,
  BentoCard,
  BentoCardBackground,
  BentoCardContent,
  BentoCardHeader,
  BentoCardBody,
  BentoCardFooter,
  BentoGridGlass,
} from "@hudbird/marketing";
import { Badge, Button, Text } from "@hudbird/ui";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable, type ApiPropRow } from "../../components/ApiTable";
import {
  ArrowRight,
  Sparkles,
  Zap,
  ChevronRight,
  Menu,
  Globe,
  Cpu,
  Shield,
  Code,
  LayoutDashboard,
  Fingerprint,
  Database,
  BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import skillContent from "../../../../../.agents/skills/marketing-bento-grid/SKILL.md?raw";

export default function BentoGridDoc({ onOpenSidebar }: { onOpenSidebar?: () => void }) {
  const apiRows: ApiPropRow[] = [
    {
      prop: "children",
      type: "ReactNode",
      defaultVal: "-",
      description: "Konten utama yang berisi kumpulan BentoCard.",
    },
    {
      prop: "className",
      type: "string",
      defaultVal: '""',
      description: "Gunakan Tailwind class (contoh: col-span-2) untuk mengatur layout card.",
    },
    {
      prop: "src (BentoCardBackground)",
      type: "string",
      defaultVal: "undefined",
      description: "URL gambar untuk background layer card.",
    },
    {
      prop: "isBlurred (BentoCardFooter)",
      type: "boolean",
      defaultVal: "false",
      description: "Mengaktifkan efek glassmorphism pada area footer.",
    },
    {
      prop: "asChild",
      type: "boolean",
      defaultVal: "false",
      description: "Meneruskan (delegate) rendering ke elemen HTML turunannya (Radix Slot).",
    },
  ];

  const glassApiRows: ApiPropRow[] = [
    {
      prop: "items",
      type: "BentoGlassItem[]",
      defaultVal: "-",
      description: "Array of bento card items.",
    },
    {
      prop: "title",
      type: "string",
      defaultVal: "undefined",
      description: "Main section title.",
    },
    {
      prop: "badge",
      type: "ReactNode",
      defaultVal: "undefined",
      description: "Optional badge element.",
    },
    {
      prop: "glowClassName",
      type: "string",
      defaultVal: '"bg-blue-500/10 dark:bg-blue-500/20"',
      description: "Override the decorative glow orb color inside each glass card.",
    },
    {
      prop: "iconClassName",
      type: "string",
      defaultVal: '"bg-blue-600/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300"',
      description: "Override the icon container background and text color inside each glass card.",
    },
  ];

  const codeCssIllusReact = `
<BentoGrid className="md:grid-cols-3 auto-rows-[24rem]">
  {/* Card 1 */}
  <BentoCard className="p-2 flex flex-col gap-2">
    <div className="relative w-full h-48 bg-indigo-50/50 dark:bg-indigo-900/20 flex flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-indigo-100/50 dark:border-indigo-800/50">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200/50 via-transparent to-transparent dark:from-indigo-700/30 blur-2xl" />
      {/* CSS Illustration elements */}
    </div>
    <BentoCardBody className="pt-2 flex flex-col gap-1 pb-1">
      <Text variant="strong" className="text-lg">Predictive Modeling</Text>
      <Text variant="muted" className="text-sm leading-relaxed">Our proprietary models analyze thousands of behavioral signals.</Text>
    </BentoCardBody>
  </BentoCard>
  {/* ... other 5 cards */}
</BentoGrid>
  `.trim();

  return (
    <div className="flex w-full flex-col items-center pt-24 pb-24">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-8 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="w-full min-w-0 flex-1 pr-4">
            <div className="mb-3 flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
                Bento Grid
              </h1>
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                New
              </span>
            </div>
            <p className="pr-32 text-base text-zinc-600 sm:pr-40 lg:max-w-4xl dark:text-zinc-400">
              A premium, highly composable grid layout optimized for modern marketing pages.
              Features snappy spring entrance animations and zero layout thrashing.
            </p>
          </div>
          <PageToolbar />
        </div>

        <div id="installation" className="scroll-mt-24 space-y-4">
          <InstallationTabs componentName="bento-grid" manualCode={bentoGridCode} />
        </div>

        <div className="flex flex-col gap-16">
          {/* 6-CARD LAYOUT CSS ILLUSTRATIONS (Replaced Fill Width) */}
          <MarketingPreview
            title="6-Card Layout (CSS Illustrations)"
            skill={skillContent}
            code={codeCssIllusReact}
          >
            <div className="relative w-full overflow-hidden bg-zinc-50 px-4 py-16 sm:px-8 dark:bg-[#0f111a]">
              <div className="mx-auto max-w-5xl space-y-12">
                <div className="mx-auto max-w-3xl space-y-4 text-center">
                  <span className="text-sm font-semibold tracking-wide text-blue-600 uppercase dark:text-blue-400">
                    AI Native
                  </span>
                  <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl md:text-5xl dark:text-white">
                    Built for the future of work
                  </h2>
                </div>

                <BentoGrid className="md:auto-rows-[22rem] md:grid-cols-4">
                  {/* Card 1: Predictive Modeling */}
                  <BentoCard className="flex flex-col justify-between border border-zinc-200 bg-white p-2 shadow-sm md:col-span-2 dark:border-white/10 dark:bg-zinc-900">
                    <div className="relative flex w-full flex-1 flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-indigo-100/50 bg-indigo-50/50 dark:border-indigo-800/50 dark:bg-indigo-900/20">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-200/50 via-transparent to-transparent blur-2xl dark:from-indigo-700/30" />
                      {[
                        { name: "Lead Scoring", score: "96%", delay: 0, width: "w-[85%]" },
                        { name: "Predictive", score: "82%", delay: 0.2, width: "w-[95%]" },
                        { name: "Conversion", score: "75%", delay: 0.4, width: "w-[75%]" },
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: [0, -4, 0], opacity: 1 }}
                          transition={{
                            y: {
                              repeat: Infinity,
                              duration: 4,
                              delay: item.delay,
                              ease: "easeInOut",
                            },
                          }}
                          className={`relative z-10 flex h-8 items-center justify-between rounded-full border border-zinc-100 bg-white px-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 ${item.width} max-w-[200px]`}
                        >
                          <div className="flex items-center gap-2">
                            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                              <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                            </div>
                            <span className="text-[10px] font-medium text-zinc-600 dark:text-zinc-300">
                              {item.name}
                            </span>
                          </div>
                          <span className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                            {item.score}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="shrink-0 px-2 pt-4 pb-2">
                      <Text variant="strong" className="text-lg text-zinc-900 dark:text-white">
                        Predictive Modeling
                      </Text>
                      <Text variant="muted" className="mt-1 text-sm leading-relaxed">
                        Our proprietary models analyze thousands of behavioral signals for sales.
                      </Text>
                    </div>
                  </BentoCard>

                  {/* Card 2: AI Marketing */}
                  <BentoCard className="flex flex-col justify-between border border-zinc-200 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                    <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-blue-100/50 bg-blue-50/50 dark:border-blue-800/50 dark:bg-blue-900/20">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-200/50 via-transparent to-transparent blur-2xl dark:from-blue-700/30" />
                      <div className="absolute h-36 w-36 rounded-full border border-blue-200 dark:border-blue-700/50" />
                      <div className="absolute h-24 w-24 rounded-full border border-blue-300 dark:border-blue-600/50" />
                      <motion.div
                        animate={{
                          scale: [1, 1.05, 1],
                          boxShadow: [
                            "0 0 0 0 rgba(59,130,246,0)",
                            "0 0 20px 4px rgba(59,130,246,0.3)",
                            "0 0 0 0 rgba(59,130,246,0)",
                          ],
                        }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg"
                      >
                        <span className="text-sm font-bold tracking-wider text-white">AI</span>
                      </motion.div>
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                        className="absolute top-6 left-12 flex h-6 w-6 items-center justify-center rounded-full border border-zinc-100 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-800"
                      >
                        <Globe className="h-3 w-3 text-blue-500" />
                      </motion.div>
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ repeat: Infinity, duration: 5, delay: 1 }}
                        className="absolute right-10 bottom-8 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-100 bg-white shadow-md dark:border-zinc-700 dark:bg-zinc-800"
                      >
                        <BarChart3 className="h-3.5 w-3.5 text-indigo-500" />
                      </motion.div>
                    </div>
                    <div className="shrink-0 px-2 pt-4 pb-2">
                      <Text variant="strong" className="text-lg text-zinc-900 dark:text-white">
                        Automatic AI Marketing
                      </Text>
                      <Text variant="muted" className="mt-1 text-sm leading-relaxed">
                        Sends predictive signals directly to your ad platforms instantly.
                      </Text>
                    </div>
                  </BentoCard>

                  {/* Card 3: AI Sales Agent */}
                  <BentoCard className="flex flex-col justify-between border border-zinc-200 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                    <div className="relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-sky-100/50 bg-sky-50/50 p-4 dark:border-sky-800/50 dark:bg-sky-900/20">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-sky-200/50 via-transparent to-transparent blur-2xl dark:from-sky-700/30" />
                      <div className="relative z-10 flex w-full max-w-[200px] flex-col gap-3">
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="w-[85%] self-start rounded-2xl rounded-tl-sm border border-zinc-100 bg-white p-2.5 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                        >
                          <div className="mb-1.5 h-1.5 w-full rounded-full bg-zinc-200 dark:bg-zinc-600" />
                          <div className="h-1.5 w-2/3 rounded-full bg-zinc-200 dark:bg-zinc-600" />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.5 }}
                          className="w-[75%] self-end rounded-2xl rounded-tr-sm bg-blue-500 p-2.5 shadow-sm"
                        >
                          <div className="mb-1.5 h-1.5 w-full rounded-full bg-blue-200" />
                          <div className="h-1.5 w-1/2 rounded-full bg-blue-200" />
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 }}
                          className="flex h-6 items-center gap-1 self-start rounded-2xl rounded-tl-sm border border-zinc-100 bg-white p-2 shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                        >
                          <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                            className="h-1 w-1 rounded-full bg-zinc-400"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                            className="h-1 w-1 rounded-full bg-zinc-400"
                          />
                          <motion.div
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                            className="h-1 w-1 rounded-full bg-zinc-400"
                          />
                        </motion.div>
                      </div>
                    </div>
                    <div className="shrink-0 px-2 pt-4 pb-2">
                      <Text variant="strong" className="text-lg text-zinc-900 dark:text-white">
                        AI Sales Agent
                      </Text>
                      <Text variant="muted" className="mt-1 text-sm leading-relaxed">
                        Uses proprietary models to identify who to engage and what to offer.
                      </Text>
                    </div>
                  </BentoCard>

                  {/* Card 4: Analyzes All Website */}
                  <BentoCard className="flex flex-col justify-between border border-zinc-200 bg-white p-2 shadow-sm md:col-span-1 dark:border-white/10 dark:bg-zinc-900">
                    <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-cyan-100/50 bg-cyan-50/50 dark:border-cyan-800/50 dark:bg-cyan-900/20">
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-200/50 via-transparent to-transparent blur-2xl dark:from-cyan-700/30" />
                      <svg
                        className="pointer-events-none absolute inset-0 h-full w-full"
                        viewBox="0 0 200 150"
                      >
                        <path
                          d="M 100 75 L 60 40 M 100 75 L 140 40 M 100 75 L 70 110 M 100 75 L 130 110"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeDasharray="3 3"
                          className="text-cyan-300 dark:text-cyan-700"
                        />
                      </svg>
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute z-10 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-900 shadow-lg dark:bg-white"
                      >
                        <span className="text-sm font-bold text-white dark:text-zinc-900">AI</span>
                      </motion.div>
                      <motion.div
                        animate={{ y: [0, -3, 0] }}
                        transition={{ repeat: Infinity, duration: 3, delay: 0.1 }}
                        className="absolute top-[30px] left-[45px] flex h-7 w-7 items-center justify-center rounded-full border border-zinc-100 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                      >
                        <Globe className="h-3.5 w-3.5 text-zinc-500" />
                      </motion.div>
                      <motion.div
                        animate={{ y: [0, 4, 0] }}
                        transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                        className="absolute top-[30px] right-[45px] flex h-7 w-7 items-center justify-center rounded-full border border-zinc-100 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                      >
                        <Database className="h-3.5 w-3.5 text-zinc-500" />
                      </motion.div>
                      <motion.div
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 3.5, delay: 0.8 }}
                        className="absolute bottom-[25px] left-[55px] flex h-7 w-7 items-center justify-center rounded-full border border-zinc-100 bg-white shadow-sm dark:border-zinc-700 dark:bg-zinc-800"
                      >
                        <LayoutDashboard className="h-3.5 w-3.5 text-zinc-500" />
                      </motion.div>
                    </div>
                    <div className="shrink-0 px-2 pt-4 pb-2">
                      <Text variant="strong" className="text-lg text-zinc-900 dark:text-white">
                        Analyzes All Data
                      </Text>
                      <Text variant="muted" className="mt-1 text-sm leading-relaxed">
                        Sales engagement and product usage to score every lead seamlessly.
                      </Text>
                    </div>
                  </BentoCard>

                  {/* Card 5: Engages via text */}
                  <BentoCard className="flex flex-col justify-between border border-zinc-200 bg-white p-2 shadow-sm md:col-span-2 dark:border-white/10 dark:bg-zinc-900">
                    <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-blue-100/50 bg-blue-50/50 p-4 dark:border-blue-800/50 dark:bg-blue-900/20">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-blue-200/50 via-transparent to-transparent blur-2xl dark:from-blue-700/30" />
                      <motion.div
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute h-10 w-40 rounded-full bg-blue-400/30 blur-xl"
                      />

                      <div className="relative z-10 flex h-9 w-full max-w-[200px] items-center justify-between rounded-full border border-white/50 bg-white/90 p-1 shadow-lg backdrop-blur-md dark:border-zinc-700/50 dark:bg-zinc-900/90">
                        <div className="flex items-center gap-2 pl-3">
                          <Sparkles className="h-3 w-3 text-blue-500" />
                          <div className="h-1.5 w-12 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                        </div>
                        <div className="flex h-full items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 px-3 shadow-inner">
                          <span className="text-[9px] font-semibold text-white">AI Assistant</span>
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 px-2 pt-4 pb-2">
                      <Text variant="strong" className="text-lg text-zinc-900 dark:text-white">
                        Engages instantly
                      </Text>
                      <Text variant="muted" className="mt-1 text-sm leading-relaxed">
                        Our agents use predictive insights to instantly prioritize leads.
                      </Text>
                    </div>
                  </BentoCard>

                  {/* Card 6: Actionable Insights */}
                  <BentoCard className="flex flex-col justify-between border border-zinc-200 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                    <div className="relative flex w-full flex-1 items-end justify-center overflow-hidden rounded-xl border border-indigo-100/50 bg-indigo-50/50 p-4 dark:border-indigo-800/50 dark:bg-indigo-900/20">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-indigo-200/50 via-transparent to-transparent blur-xl dark:from-indigo-700/30" />

                      <div className="relative z-10 flex h-20 w-full items-end justify-center gap-1.5">
                        {[30, 50, 40, 70, 90, 60].map((h, i) => (
                          <motion.div
                            key={i}
                            initial={{ height: "10%" }}
                            animate={{ height: [`${h}%`, `${h - 10}%`, `${h}%`] }}
                            transition={{
                              repeat: Infinity,
                              duration: 3,
                              delay: i * 0.1,
                              ease: "easeInOut",
                            }}
                            className={`w-5 rounded-t-sm ${i === 4 ? "bg-gradient-to-t from-blue-600 to-indigo-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]" : "bg-indigo-200 dark:bg-indigo-800"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="shrink-0 px-2 pt-4 pb-2">
                      <Text variant="strong" className="text-lg text-zinc-900 dark:text-white">
                        Actionable Insights
                      </Text>
                      <Text variant="muted" className="mt-1 text-sm leading-relaxed">
                        Turn your data into growth with auto-generated charts and insights.
                      </Text>
                    </div>
                  </BentoCard>
                </BentoGrid>
              </div>
            </div>
          </MarketingPreview>

          {/* 2-CARD LAYOUT FILL WIDTH */}
          <MarketingPreview title="2-Card Layout (Fill Width)" skill={skillContent}>
            <div className="relative w-full overflow-hidden bg-zinc-50 px-4 py-16 sm:px-8 dark:bg-zinc-950">
              <div className="mx-auto max-w-5xl space-y-12">
                <div className="mx-auto max-w-3xl space-y-4 text-center">
                  <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                    Powerful Integrations
                  </h2>
                </div>

                <BentoGrid className="md:auto-rows-[24rem] md:grid-cols-3 xl:grid-cols-3">
                  {/* Card 1 */}
                  <BentoCard className="border-transparent md:col-span-2 dark:border-white/10">
                    <BentoCardBackground src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200&keywords=photography,minimal" />
                    <BentoCardContent>
                      <BentoCardFooter
                        isBlurred
                        className="flex-col items-start gap-1 p-6 text-zinc-900 dark:text-white"
                      >
                        <Text variant="strong" className="text-xl text-zinc-900 dark:text-white">
                          Cloud Storage
                        </Text>
                        <Text className="text-sm text-zinc-600 dark:text-zinc-300">
                          Access your files anywhere.
                        </Text>
                      </BentoCardFooter>
                    </BentoCardContent>
                  </BentoCard>

                  {/* Card 2 */}
                  <BentoCard className="border-transparent dark:border-white/10">
                    <BentoCardBackground src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&q=80&w=1200&keywords=photography,minimal" />
                    <BentoCardContent>
                      <BentoCardFooter
                        isBlurred
                        className="flex-col items-start gap-1 p-6 text-zinc-900 dark:text-white"
                      >
                        <Text variant="strong" className="text-xl text-zinc-900 dark:text-white">
                          Biometric Auth
                        </Text>
                        <Text className="text-sm text-zinc-600 dark:text-zinc-300">
                          Secure access via Fingerprint.
                        </Text>
                      </BentoCardFooter>
                    </BentoCardContent>
                  </BentoCard>
                </BentoGrid>
              </div>
            </div>
          </MarketingPreview>

          {/* 4-CARD LAYOUT */}
          <MarketingPreview title="4-Card Layout (Exactly 2 Rows)" skill={skillContent}>
            <div className="relative w-full overflow-hidden bg-zinc-50 px-4 py-16 sm:px-8 dark:bg-zinc-950">
              <div className="mx-auto max-w-5xl space-y-12">
                <div className="space-y-4 text-left">
                  <span className="text-sm font-semibold tracking-wide text-rose-500 uppercase dark:text-rose-400">
                    Workflow
                  </span>
                  <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                    Ship faster, together.
                  </h2>
                </div>

                <BentoGrid className="md:auto-rows-[16rem] md:grid-cols-4">
                  {/* Card 1: Instant Deployments */}
                  <BentoCard className="flex flex-col justify-between border border-zinc-200/80 bg-white p-2 shadow-sm md:col-span-1 md:row-span-2 dark:border-white/10 dark:bg-zinc-900">
                    <div className="shrink-0 px-2 pt-2 pb-4">
                      <Text variant="strong" className="text-lg text-zinc-900 dark:text-white">
                        Instant Deployments
                      </Text>
                      <Text variant="muted" className="mt-1 text-sm leading-relaxed">
                        Push to main and watch your site go live in milliseconds across our edge
                        network.
                      </Text>
                    </div>
                    <div className="relative flex w-full flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-orange-100/50 bg-orange-50/50 dark:border-orange-800/50 dark:bg-orange-900/20">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-200/50 via-transparent to-transparent blur-2xl dark:from-orange-700/30" />

                      {/* Pulse Rings */}
                      <motion.div
                        animate={{ scale: [1, 2, 2], opacity: [0.5, 0, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute h-12 w-12 rounded-full border-2 border-orange-400 dark:border-orange-500"
                      />
                      <motion.div
                        animate={{ scale: [1, 2.5, 2.5], opacity: [0.3, 0, 0] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                        className="absolute h-12 w-12 rounded-full border-2 border-orange-300 dark:border-orange-600"
                      />

                      {/* Center Node */}
                      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 shadow-lg shadow-orange-500/30">
                        <Zap className="h-4 w-4 text-white" />
                      </div>

                      {/* Edge Nodes */}
                      <motion.div
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.2 }}
                        className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                      />
                      <motion.div
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 0.8 }}
                        className="absolute right-1/4 bottom-1/4 h-3 w-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                      />
                      <motion.div
                        animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                        transition={{ repeat: Infinity, duration: 2, delay: 1.4 }}
                        className="absolute top-1/3 right-1/4 h-1.5 w-1.5 rounded-full bg-orange-400 shadow-[0_0_8px_rgba(251,146,60,0.8)]"
                      />
                    </div>
                  </BentoCard>

                  {/* Card 2: Image */}
                  <BentoCard className="border-transparent md:col-span-2 md:row-span-1 dark:border-white/10">
                    <BentoCardBackground src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200&keywords=abstract,minimal,white" />
                    <div className="absolute inset-0 z-0 rounded-[inherit] bg-gradient-to-t from-black/80 to-transparent" />
                    <BentoCardContent className="justify-end p-6">
                      <div className="space-y-1">
                        <Text variant="strong" className="text-2xl text-white">
                          Collaborative Workspaces
                        </Text>
                        <Text className="text-zinc-300">
                          Invite your whole team and work in real-time.
                        </Text>
                      </div>
                    </BentoCardContent>
                  </BentoCard>

                  {/* Card 3: DDoS Protection */}
                  <BentoCard className="flex flex-col justify-between border border-zinc-200/80 bg-white p-2 shadow-sm md:col-span-1 md:row-span-2 dark:border-white/10 dark:bg-zinc-900">
                    <div className="relative flex w-full flex-1 items-center justify-center overflow-hidden rounded-xl border border-indigo-100/50 bg-indigo-50/50 dark:border-indigo-800/50 dark:bg-indigo-900/20">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-200/50 via-transparent to-transparent blur-2xl dark:from-indigo-700/30" />

                      {/* Shield Barrier */}
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.8, 0.4] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute h-20 w-20 rounded-full border border-indigo-400/50 bg-indigo-500/10"
                      />

                      {/* Center Shield */}
                      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-600 to-purple-500 shadow-lg shadow-indigo-500/30">
                        <Shield className="h-4 w-4 text-white" />
                      </div>

                      {/* Attack Interceptions */}
                      <motion.div
                        initial={{ opacity: 0, x: -40, y: -20, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], x: -20, y: -10, scale: [0, 1.5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}
                        className="absolute z-20 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,1)]"
                      />
                      <motion.div
                        initial={{ opacity: 0, x: 40, y: 20, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], x: 20, y: 10, scale: [0, 1.5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 0.5 }}
                        className="absolute z-20 h-1.5 w-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,1)]"
                      />
                      <motion.div
                        initial={{ opacity: 0, x: -10, y: -40, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], x: -5, y: -20, scale: [0, 1.5, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, delay: 1 }}
                        className="absolute z-20 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,1)]"
                      />
                    </div>
                    <div className="shrink-0 px-2 pt-4 pb-2">
                      <Text variant="strong" className="text-lg text-zinc-900 dark:text-white">
                        DDoS Protection
                      </Text>
                      <Text variant="muted" className="mt-1 text-sm leading-relaxed">
                        Enterprise-grade mitigation automatically enabled for all your endpoints.
                      </Text>
                    </div>
                  </BentoCard>

                  {/* Card 4: Image & Blurred Footer (Formerly Card 3) */}
                  <BentoCard className="border-transparent md:col-span-2 md:row-span-1 dark:border-white/10">
                    <BentoCardBackground src="https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1200&keywords=architecture,minimal,monochrome" />
                    <BentoCardContent>
                      <BentoCardFooter
                        isBlurred
                        className="flex-col items-start gap-2 p-6 text-zinc-900 dark:text-white"
                      >
                        <Text variant="strong" className="text-xl text-zinc-900 dark:text-white">
                          Visual Analytics
                        </Text>
                        <Text className="text-zinc-600 dark:text-zinc-300">
                          Understand your traffic with beautiful, native charts.
                        </Text>
                      </BentoCardFooter>
                    </BentoCardContent>
                  </BentoCard>
                </BentoGrid>
              </div>
            </div>
          </MarketingPreview>

          {/* Glassmorphic Bento Grid */}
          <div id="glass" className="scroll-mt-24">
            <MarketingPreview title="Glassmorphic Bento Grid" code={bentoGridGlassCode}>
              <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 pb-12 dark:from-zinc-950 dark:to-indigo-950/20">
                <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[120px]" />
                <div className="absolute top-1/2 right-1/4 h-[500px] w-[500px] translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />

                <BentoGridGlass
                  badge={
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/50 px-3 py-1 text-sm font-medium text-indigo-900 ring-1 ring-indigo-500/20 backdrop-blur-md ring-inset dark:bg-indigo-500/10 dark:text-indigo-200 dark:ring-indigo-500/30">
                      Features
                    </span>
                  }
                  items={[
                    {
                      className: "md:col-span-2",
                      title: "Predictive Modeling",
                      description:
                        "Our proprietary models analyze thousands of behavioral signals to identify visitors who are ready to buy.",
                      icon: <Zap size={20} />,
                    },
                    {
                      className: "md:col-span-1",
                      title: "Real-time sync",
                      description: "Instant bi-directional sync with Salesforce and HubSpot.",
                      icon: <Globe size={20} />,
                    },
                    {
                      className: "md:col-span-1",
                      title: "Enterprise Grade",
                      description: "SOC2 Type II, GDPR, and CCPA compliant infrastructure.",
                      icon: <Shield size={20} />,
                    },
                    {
                      className: "md:col-span-1",
                      title: "Developer First",
                      description: "Extensive API and webhooks for custom workflows.",
                      icon: <Code size={20} />,
                    },
                    {
                      className: "md:col-span-2 md:col-start-2",
                      title: "Universal search",
                      description:
                        "Find exactly what you need across all your integrated tools in milliseconds.",
                      icon: <LayoutDashboard size={20} />,
                    },
                  ]}
                />
              </div>
            </MarketingPreview>
          </div>
        </div>

        <section id="component-api" className="mt-16 scroll-mt-24 space-y-8">
          <div>
            <h2 className="mb-4 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Component API
            </h2>
            <ApiTable title="BentoGrid Props" rows={apiRows} />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-medium text-zinc-900 dark:text-zinc-100">
              BentoGridGlass Props
            </h3>
            <ApiTable title="BentoGridGlass" rows={glassApiRows} />
          </div>
        </section>
      </div>
    </div>
  );
}
