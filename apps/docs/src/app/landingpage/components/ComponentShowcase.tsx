import {
  ParticleOrb,
  TypewriterText,
  IdeCaret,
  FolderIcon,
  MockToggle,
  logos,
  MEGA_LINK_GROUPS,
  SOCIALS,
  useHtmlTheme,
  MockBar,
  NavItem,
  TerminalTyping,
  IdeSuggestPopup,
} from "./shared";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Text, Badge, Input, Textarea } from "@hudbird/ui";
import {
  Hero,
  HeroHeader,
  HeroBody,
  HeroBadge,
  HeroTitle,
  HeroDescription,
  HeroActions,
  HeroBackground,
  LogoCloud,
  LogoCloudTitle,
  LogoCloudTicker,
  LogoCloudItem,
  FeatureSection,
  FeatureHeader,
  FeatureBadge,
  FeatureTitle,
  FeatureDescription,
  FeatureAlternating,
  FeatureRow,
  FeatureRowContent,
  FeatureRowMedia,
  BentoGrid,
  BentoCard,
  BentoCardContent,
  PricingSection,
  PricingHeader,
  PricingBadge,
  PricingTitle,
  PricingDescription,
  PricingGrid,
  PricingTier,
  PricingTierHeader,
  PricingTierName,
  PricingTierDescription,
  PricingTierPrice,
  PricingTierFeatures,
  PricingTierFeature,
  PricingToggle,
  CtaSplit,
  FooterMega,
  Faq,
} from "@hudbird/marketing";
import {
  Zap,
  Code2,
  Layers,
  Cpu,
  Network,
  PlayIcon,
  ArrowRight,
  ArrowUpCircle,
  CheckCircle2,
  Shield,
  Globe,
  BarChart3,
  Database,
  LayoutDashboard,
  Bot,
  Command,
  Layout,
  LineChart,
  Search,
  Plus,
  X,
  Check,
  ChevronDown,
  ChevronRight,
  FileText,
  Wallet,
  Target,
  Calendar,
  LifeBuoy,
  BookOpen,
  Mail,
  Activity,
  User,
  CreditCard,
  Bell,
  Palette,
  ArrowLeftRight,
  TrendingUp,
  Landmark,
  Clock,
  QrCode,
  RefreshCw,
  Send,
  Lock,
  TriangleAlert,
  Settings,
  Sparkles,
  BrainCircuit,
  MessageSquare,
} from "lucide-react";
import { ThemeToggleButton } from "../../../components/templates/TemplateThemeToggle";

const GTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-white">{children}</h3>
);

const GDesc = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <p className={`text-[11px] leading-relaxed text-zinc-500 dark:text-zinc-400 ${className}`}>
    {children}
  </p>
);

const GLabel = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">{children}</span>
);

const MockCheck = ({ checked = false }: { checked?: boolean }) => (
  <span
    aria-hidden
    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-[5px] border ${
      checked
        ? "border-zinc-900 bg-zinc-900 dark:border-white dark:bg-white"
        : "border-zinc-300 dark:border-zinc-700"
    }`}
  >
    {checked && <Check size={11} strokeWidth={3.5} className="text-white dark:text-zinc-900" />}
  </span>
);

export const ComponentShowcase = () => {
  // 17 gallery cards — extracted from dense masonry so they can marquee as 4 vertical columns
  const galleryCards: React.ReactNode[] = [
    // 1 — Core controls
    <BentoCard key="g-0" className="p-5">
      <BentoCardContent className="justify-start gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm" color="dark" radius="full" endContent={<ArrowRight size={12} />}>
            Button
          </Button>
          <Button size="sm" variant="flat" color="secondary">
            Secondary
          </Button>
          <Button size="sm" variant="outline">
            Outline
          </Button>
        </div>
        <Input
          size="sm"
          radius="full"
          placeholder="Name"
          aria-label="Name"
          endContent={<Search size={13} className="text-zinc-400" />}
        />
        <Textarea rows={2} placeholder="Message" aria-label="Message" className="text-xs" />
        <div className="flex flex-wrap items-center gap-1.5">
          <Badge size="sm" color="secondary">
            Badge
          </Badge>
          <Badge size="sm" variant="soft" color="secondary">
            Secondary
          </Badge>
          <Badge size="sm" variant="outline" color="secondary">
            Outline
          </Badge>
          <MockCheck checked />
          <MockCheck />
          <MockCheck checked />
          <MockCheck />
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" radius="full">
            Alert Dialog
          </Button>
          <Button
            size="sm"
            variant="outline"
            radius="full"
            endContent={<ChevronDown size={13} className="text-muted-foreground ml-1" />}
          >
            Button Group
          </Button>
          <MockToggle />
        </div>
      </BentoCardContent>
    </BentoCard>,
    // 2 — Contribution history
    <BentoCard key="g-1" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <GTitle>Contribution History</GTitle>
        <GDesc>Last 6 months of activity</GDesc>
        <div className="mt-1 flex h-20 items-end gap-2">
          <MockBar h="52%" />
          <MockBar h="82%" />
          <MockBar h="68%" />
          <MockBar h="92%" hot />
          <MockBar h="58%" />
        </div>
        <div className="flex gap-4 text-[10px] text-zinc-400 dark:text-zinc-500">
          {["Dec", "Jan", "Feb", "Mar", "Apr"].map((m) => (
            <span key={m} className="flex-1 text-center">
              {m}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-lg bg-zinc-50 p-2 dark:bg-white/5">
            <p className="text-[9px] tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
              Upcoming
            </p>
            <p className="text-xs font-bold text-zinc-900 dark:text-white">May 2024</p>
            <p className="text-[10px] text-zinc-400">Scheduled</p>
          </div>
          <div className="rounded-lg bg-zinc-50 p-2 dark:bg-white/5">
            <p className="text-[9px] tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
              Savings plan
            </p>
            <p className="text-xs font-bold text-zinc-900 dark:text-white">Accelerated</p>
            <p className="text-[10px] text-zinc-400">Recurring</p>
          </div>
        </div>
        <Button size="sm" color="dark" radius="full" className="mt-auto w-full">
          View Full Report
        </Button>
      </BentoCardContent>
    </BentoCard>,
    // 3 — New milestone
    <BentoCard key="g-2" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <GTitle>Set a new milestone</GTitle>
        <GDesc>Define your financial target and we&apos;ll help you pace your savings.</GDesc>
        <GLabel>Goal Name</GLabel>
        <Input
          size="sm"
          radius="full"
          placeholder="e.g. New Car, Home Downpayment"
          aria-label="Goal name"
        />
        <div className="grid grid-cols-2 gap-2">
          <div>
            <GLabel>Target Amount</GLabel>
            <Input
              size="sm"
              radius="full"
              defaultValue="$15,000"
              aria-label="Target amount"
              className="mt-1"
            />
          </div>
          <div>
            <GLabel>Target Date</GLabel>
            <Input
              size="sm"
              radius="full"
              defaultValue="Dec 2025"
              aria-label="Target date"
              className="mt-1"
            />
          </div>
        </div>
        <Button size="sm" color="dark" radius="full" className="mt-1 w-full">
          Create Goal
        </Button>
        <Button size="sm" variant="outline" radius="full" className="w-full">
          Cancel
        </Button>
      </BentoCardContent>
    </BentoCard>,
    // 4 — QR connect
    <BentoCard key="g-3" className="p-5">
      <BentoCardContent className="items-center justify-center gap-3 text-center">
        <span className="rounded-2xl border border-zinc-200 bg-white p-4">
          <QrCode size={104} className="text-zinc-900" aria-label="Pairing code" />
        </span>
        <GTitle>Scan to connect your mobile device</GTitle>
        <GDesc>Open the Ledger mobile app and scan this code to link your device.</GDesc>
      </BentoCardContent>
    </BentoCard>,
    // 5 — Distribute
    <BentoCard key="g-4" className="p-5">
      <BentoCardContent className="items-center justify-center gap-1.5 text-center">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-100 dark:bg-white/10">
          <Plus size={15} className="text-zinc-700 dark:text-zinc-200" />
        </span>
        <GTitle>Distribute Track</GTitle>
        <GDesc className="line-clamp-2">
          Upload your first master to start reaching listeners everywhere.
        </GDesc>
        <Button size="sm" color="dark" radius="full" className="mt-1">
          Create Release
        </Button>
      </BentoCardContent>
    </BentoCard>,
    // 6 — Workspace navs
    <BentoCard key="g-5" className="p-4">
      <BentoCardContent className="justify-start">
        <div className="grid grid-cols-2 gap-2">
          <nav aria-label="Planning">
            <p className="px-1.5 pb-1 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
              Planning
            </p>
            <NavItem icon={FileText} label="Documents" />
            <NavItem icon={Wallet} label="Budget" />
            <NavItem icon={BarChart3} label="Reports" />
            <NavItem icon={Target} label="Goals" />
            <NavItem icon={Calendar} label="Calendar" />
          </nav>
          <nav aria-label="Support">
            <p className="px-1.5 pb-1 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
              Support
            </p>
            <NavItem icon={LifeBuoy} label="Help Center" />
            <NavItem icon={BookOpen} label="Docs" />
            <NavItem icon={Mail} label="Contact Us" />
            <NavItem icon={Activity} label="Status" />
            <NavItem icon={Globe} label="Community" />
          </nav>
        </div>
      </BentoCardContent>
    </BentoCard>,
    // 7 — Claimable balance
    <BentoCard key="g-6" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <GDesc>Claimable Balance</GDesc>
        <p className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">$1,211.29</p>
        <Badge size="sm" variant="soft" color="warning">
          Pending Setup
        </Badge>
        <div className="rounded-xl bg-zinc-50 p-3 text-[11px] dark:bg-white/5">
          <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
            <span>Net Royalties</span>
            <span className="font-semibold text-zinc-900 dark:text-white">$1,248.75</span>
          </div>
          <div className="mt-1.5 flex justify-between text-zinc-500 dark:text-zinc-400">
            <span>Processing Fee</span>
            <span className="font-semibold text-zinc-900 dark:text-white">-$37.46</span>
          </div>
          <div className="mt-1.5 flex justify-between border-t border-zinc-200 pt-1.5 font-semibold text-zinc-900 dark:border-white/10 dark:text-white">
            <span>Total Ready to Claim</span>
            <span>$1,211.29 USD</span>
          </div>
        </div>
        <GDesc>
          Once your bank is connected, balances over $10.00 are automatically eligible for monthly
          distribution.
        </GDesc>
      </BentoCardContent>
    </BentoCard>,
    // 8 — Payout threshold
    <BentoCard key="g-7" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <div className="flex items-center justify-between">
          <GTitle>Payout Threshold</GTitle>
          <Button size="sm" variant="ghost" isIconOnly aria-label="Close">
            <X size={13} />
          </Button>
        </div>
        <GDesc>Set the minimum balance required before a payout is triggered.</GDesc>
        <GLabel>Preferred Currency</GLabel>
        <Button
          size="sm"
          variant="outline"
          radius="full"
          className="w-full justify-between font-normal"
        >
          USD — United States Dollar
          <ChevronDown size={13} className="text-zinc-400" />
        </Button>
        <div className="mt-1 flex items-center justify-between">
          <GLabel>Minimum Payout Amount</GLabel>
          <span className="text-lg font-bold text-zinc-900 dark:text-white">$2500.00</span>
        </div>
        <div
          aria-hidden
          className="h-1.5 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800"
        >
          <div className="relative h-full w-1/4 rounded-full bg-zinc-900 dark:bg-white">
            <span className="absolute top-1/2 -right-1 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-zinc-900 bg-white dark:border-white dark:bg-zinc-900" />
          </div>
        </div>
        <div className="flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500">
          <span>$50 (MIN)</span>
          <span>$10,000 (MAX)</span>
        </div>
        <GLabel>Notes</GLabel>
        <Textarea
          rows={2}
          placeholder="Add any notes for this payout configuration…"
          aria-label="Payout notes"
          className="text-xs"
        />
        <Button size="sm" color="dark" radius="full" className="mt-auto w-full">
          Save Threshold
        </Button>
      </BentoCardContent>
    </BentoCard>,
    // 9 — New chat
    <BentoCard key="g-8" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <div className="flex items-center justify-between">
          <GTitle>New Chat</GTitle>
          <Button size="sm" variant="ghost" isIconOnly aria-label="Regenerate">
            <RefreshCw size={13} />
          </Button>
        </div>
        <GDesc>How can I help you today?</GDesc>
        <div className="flex flex-1 flex-col items-center justify-center gap-1.5 text-center">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-dashed border-zinc-300 dark:border-zinc-700">
            <MessageSquare size={14} className="text-zinc-400" />
          </span>
          <p className="text-sm font-semibold text-zinc-900 dark:text-white">Morning, builder!</p>
          <GDesc>What are we working on today? Press send to start a new conversation.</GDesc>
        </div>
        <p className="line-clamp-2 rounded-xl bg-zinc-100 p-2 text-[11px] text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
          I&apos;m building a chat for our app and the scroll behavior is driving me nuts…
        </p>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" radius="full" isIconOnly aria-label="Attach">
            <Plus size={13} />
          </Button>
          <Button
            size="sm"
            color="dark"
            radius="full"
            isIconOnly
            aria-label="Send"
            className="ml-auto"
          >
            <Send size={13} />
          </Button>
        </div>
      </BentoCardContent>
    </BentoCard>,
    // 10 — Analytics
    <BentoCard key="g-9" className="p-5">
      <BentoCardContent className="justify-start gap-1.5">
        <div className="flex items-center justify-between">
          <GTitle>Analytics</GTitle>
          <Button size="sm" variant="ghost">
            View Analytics
          </Button>
        </div>
        <p className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
          418.2K Visitors
          <span className="rounded-full bg-zinc-900 px-1.5 py-px text-[9px] font-bold text-white dark:bg-white dark:text-zinc-900">
            +10%
          </span>
        </p>
        <svg
          viewBox="0 0 200 48"
          className="mt-1 h-11 w-full text-zinc-300 dark:text-zinc-700"
          aria-hidden
        >
          <polygon
            points="0,36 25,30 50,33 75,22 100,27 125,14 150,21 175,10 200,16 200,48 0,48"
            fill="currentColor"
            opacity="0.25"
          />
          <polyline
            points="0,36 25,30 50,33 75,22 100,27 125,14 150,21 175,10 200,16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </BentoCardContent>
    </BentoCard>,
    // 11 — Notifications
    <BentoCard key="g-10" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <GTitle>Notifications</GTitle>
        <GDesc>Choose which email and push alerts you want to receive.</GDesc>
        {[
          { t: "Transaction alerts", d: "Deposits, withdrawals, and transfers.", on: true },
          { t: "Security alerts", d: "Login attempts and account changes.", on: true },
          { t: "Goal milestones", d: "Updates at 25%, 50%, 75%, and 100%.", on: false },
          { t: "Market updates", d: "Daily portfolio summary and price alerts.", on: false },
        ].map((n) => (
          <div key={n.t} className="flex items-start gap-2">
            <MockCheck checked={n.on} />
            <div>
              <p className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">{n.t}</p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400">{n.d}</p>
            </div>
          </div>
        ))}
        <Button size="sm" color="dark" radius="full" className="mt-auto w-full">
          Save Preferences
        </Button>
      </BentoCardContent>
    </BentoCard>,
    // 12 — Savings targets
    <BentoCard key="g-11" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <GTitle>Savings Targets</GTitle>
        <GDesc>Active milestones for 2024 across your portfolio.</GDesc>
        <div className="rounded-xl bg-zinc-50 p-3 dark:bg-white/5">
          <p className="text-[9px] tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
            Retirement
          </p>
          <p className="text-xl font-bold text-zinc-900 dark:text-white">$420,000</p>
          <div
            aria-hidden
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200/70 dark:bg-zinc-800"
          >
            <div className="h-full w-[65%] rounded-full bg-zinc-900 dark:bg-white" />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-zinc-500 dark:text-zinc-400">
            <span>65% achieved</span>
            <span className="font-semibold text-zinc-900 dark:text-white">$273,000</span>
          </div>
        </div>
        <div className="rounded-xl bg-zinc-50 p-3 dark:bg-white/5">
          <p className="text-[9px] tracking-wider text-zinc-400 uppercase dark:text-zinc-500">
            Real Estate
          </p>
          <p className="text-xl font-bold text-zinc-500 dark:text-zinc-400">$85,000</p>
          <div
            aria-hidden
            className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200/70 dark:bg-zinc-800"
          >
            <div className="h-full w-[32%] rounded-full bg-zinc-400 dark:bg-zinc-500" />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] text-zinc-400 dark:text-zinc-500">
            <span>32% achieved</span>
            <span>$27,200</span>
          </div>
        </div>
      </BentoCardContent>
    </BentoCard>,
    // 13 — Dividend income
    <BentoCard key="g-12" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <div className="flex items-center justify-between">
          <GTitle>Q2 Dividend Income</GTitle>
          <Button size="sm" variant="ghost" isIconOnly aria-label="Close">
            <X size={13} />
          </Button>
        </div>
        <GDesc>Quarterly dividend payouts across your portfolio holdings.</GDesc>
        {[
          { n: "Vanguard", s: "450 Shares", bars: ["14px", "16px", "15px", "22px"] },
          { n: "S&P 500 VOO", s: "112 Shares", bars: ["12px", "15px", "20px", "16px"] },
          { n: "Apple AAPL", s: "85 Shares", bars: ["10px", "13px", "18px", "14px"] },
        ].map((h) => (
          <div
            key={h.n}
            className="flex items-center justify-between gap-2 rounded-xl bg-zinc-50 p-2.5 dark:bg-white/5"
          >
            <div>
              <p className="text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">{h.n}</p>
              <p className="text-[10px] text-zinc-400">{h.s}</p>
            </div>
            <div className="flex items-end gap-1" aria-hidden>
              {h.bars.map((bh, bi) => (
                <span
                  key={bi}
                  style={{ height: bh }}
                  className="w-3 rounded-sm bg-zinc-300 last:bg-zinc-500 dark:bg-zinc-700 dark:last:bg-zinc-400"
                />
              ))}
            </div>
          </div>
        ))}
      </BentoCardContent>
    </BentoCard>,
    // 14 — Account access
    <BentoCard key="g-13" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <GTitle>Account Access</GTitle>
        <GDesc>Update your credentials or re-authenticate.</GDesc>
        <GLabel>Email Address</GLabel>
        <Input
          size="sm"
          radius="full"
          defaultValue="artist@studio.inc"
          aria-label="Email address"
        />
        <div className="flex items-center justify-between">
          <GLabel>Current Password</GLabel>
          <span className="text-[10px] font-medium text-zinc-400">FORGOT?</span>
        </div>
        <Input
          size="sm"
          radius="full"
          type="password"
          defaultValue="supersecret12"
          aria-label="Current password"
        />
        <Button
          size="sm"
          variant="flat"
          color="secondary"
          radius="full"
          startContent={<Lock size={12} />}
          className="w-full"
        >
          Update Security
        </Button>
        <div className="mt-auto flex items-center gap-2 border-t border-zinc-100 pt-2 dark:border-white/10">
          <TriangleAlert size={13} className="shrink-0 text-zinc-400" />
          <div className="min-w-0">
            <p className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
              Danger Zone
            </p>
            <p className="truncate text-[10px] text-zinc-400">Archive account and remove…</p>
          </div>
          <ChevronRight size={13} className="ml-auto shrink-0 text-zinc-400" />
        </div>
      </BentoCardContent>
    </BentoCard>,
    // 15 — Settings shortcuts
    <BentoCard key="g-14" className="p-4">
      <BentoCardContent className="justify-start gap-1.5">
        <p className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
          Home <ChevronRight size={11} /> <span className="tracking-widest">•••</span>
          <ChevronRight size={11} />
          <span className="font-medium text-zinc-800 dark:text-zinc-200">Payments</span>
        </p>
        {[
          { icon: Settings, t: "Change transfer limit", d: "Adjust how much you can send." },
          { icon: Calendar, t: "Scheduled transfers", d: "Send at a later date." },
        ].map((r) => (
          <div
            key={r.t}
            className="flex items-center gap-2 rounded-xl bg-zinc-50 p-2 dark:bg-white/5"
          >
            <r.icon size={13} className="shrink-0 text-zinc-500 dark:text-zinc-400" />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-semibold text-zinc-900 dark:text-zinc-100">
                {r.t}
              </p>
              <p className="truncate text-[10px] text-zinc-400">{r.d}</p>
            </div>
            <ChevronRight size={13} className="ml-auto shrink-0 text-zinc-400" />
          </div>
        ))}
      </BentoCardContent>
    </BentoCard>,
    // 16 — Power usage
    <BentoCard key="g-15" className="p-5">
      <BentoCardContent className="justify-start gap-2">
        <GTitle>Power Usage</GTitle>
        <GDesc>Whole Home</GDesc>
        <div className="flex h-20 items-end gap-1.5" aria-hidden>
          {["38%", "72%", "80%", "64%", "84%", "76%", "82%", "82%"].map((h, i) => (
            <div
              key={`${h}-${i}`}
              className="flex h-full flex-1 flex-col items-center justify-end gap-1"
            >
              <div
                style={{ height: h }}
                className="w-full rounded-t-md bg-gradient-to-t from-zinc-300 to-zinc-400 dark:from-zinc-700 dark:to-zinc-600"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[9px] text-zinc-400 dark:text-zinc-500">
          {["6a", "8a", "10a", "12p", "2p", "4p", "6p", "8p"].map((t) => (
            <span key={t} className="flex-1 text-center">
              {t}
            </span>
          ))}
        </div>
        <div className="mt-auto grid grid-cols-2 gap-2 border-t border-zinc-100 pt-2 dark:border-white/10">
          <div>
            <p className="text-[10px] text-zinc-400">Currently Using</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">3.4 kW</p>
          </div>
          <div>
            <p className="text-[10px] text-zinc-400">Solar Gen</p>
            <p className="text-sm font-bold text-zinc-900 dark:text-white">+1.2 kW</p>
          </div>
        </div>
      </BentoCardContent>
    </BentoCard>,
    // 17 — Account navs
    <BentoCard key="g-16" className="p-4">
      <BentoCardContent className="justify-start">
        <div className="grid grid-cols-2 gap-2">
          <nav aria-label="Overview">
            <p className="px-1.5 pb-1 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
              Overview
            </p>
            <NavItem icon={LayoutDashboard} label="Analytics" active />
            <NavItem icon={ArrowLeftRight} label="Transactions" />
            <NavItem icon={TrendingUp} label="Investments" />
            <NavItem icon={Landmark} label="Accounts" />
            <NavItem icon={Clock} label="Spending" />
          </nav>
          <nav aria-label="Account">
            <p className="px-1.5 pb-1 text-[10px] font-medium text-zinc-400 dark:text-zinc-500">
              Account
            </p>
            <NavItem icon={User} label="Profile" />
            <NavItem icon={CreditCard} label="Billing" active />
            <NavItem icon={Bell} label="Notifications" />
            <NavItem icon={Shield} label="Security" />
            <NavItem icon={Palette} label="Appearance" />
          </nav>
        </div>
      </BentoCardContent>
    </BentoCard>,
  ];

  // 4 columns — each row has 4, 3 of them get a random inset width so the masonry breathes
  const MARQUEE_WIDTHS = ["w-[100%]", "w-[96%]", "w-[93%]", "w-[98%]"] as const;
  const columns: React.ReactNode[][] = [[], [], [], []];
  galleryCards.forEach((card, i) => columns[i % 4].push(card));

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-title"
      className="relative w-full overflow-hidden border-b border-zinc-100 bg-zinc-50/60 px-4 py-12 sm:px-8 sm:py-16 dark:border-white/5 dark:bg-[#161618]"
    >
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-12 max-w-2xl"
        >
          <span className="border-primary/20 bg-primary/10 text-primary mb-1 inline-flex items-center rounded-full border px-3.5 py-2 text-xs font-semibold tracking-wide uppercase">
            Hudbird UI — Component Gallery
          </span>
          <h1
            id="gallery-title"
            className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-white"
          >
            Every primitive, ready to compose
          </h1>
          <p className="mt-4 mb-24 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            Atomic core components, molecule-level sections, and data-driven templates — the
            building blocks behind every hudbird interface.
          </p>
        </motion.div>

        {/* 4-per-row bento marquee — transform-only y, no layout thrash */}
        <BentoGrid className="auto-rows-auto items-start gap-4 [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)] sm:gap-5 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((col, colIdx) => (
            <div
              key={colIdx}
              className="relative h-[560px] overflow-hidden sm:h-[640px] lg:h-[720px]"
            >
              {/* soft top/bottom fade — ui-ux featherweight */}
              <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-10 bg-gradient-to-b from-zinc-50/60 to-transparent dark:from-[#030712]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t from-zinc-50/60 to-transparent dark:from-[#030712]" />
              <motion.div
                className="flex flex-col gap-4 will-change-transform sm:gap-5"
                animate={{ y: colIdx % 2 === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ duration: 26 + colIdx * 2.5, repeat: Infinity, ease: "linear" }}
              >
                {[...col, ...col].map((card, idx) => {
                  const rowInCol = idx % col.length;
                  // 3 of 4 per visual row get a random inset width — cheap masonry variance
                  const widthCls =
                    colIdx === 3 && rowInCol % 4 === 3
                      ? MARQUEE_WIDTHS[0]
                      : MARQUEE_WIDTHS[(rowInCol * 3 + colIdx) % MARQUEE_WIDTHS.length];
                  const isNarrow = widthCls !== MARQUEE_WIDTHS[0];
                  return (
                    <div
                      key={`${colIdx}-${idx}`}
                      className={`${widthCls} ${isNarrow ? "mx-auto" : ""} shrink-0`}
                    >
                      {card}
                    </div>
                  );
                })}
              </motion.div>
            </div>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};
