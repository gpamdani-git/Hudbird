import React from "react";
import {
  Hero,
  HeroHeader,
  HeroContent,
  HeroBadge,
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
  Testimonials,
  CtaSplit,
  FooterSimple,
} from "@hudbird/marketing";
import { Button } from "@hudbird/ui";
import {
  ShieldCheck,
  ChevronRight,
  Download,
  MessageCircle,
  Briefcase,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Landmark,
  Wallet,
} from "lucide-react";
import { TemplateThemeToggle } from "./TemplateThemeToggle";
import { motion } from "framer-motion";

// <!-- Fintech Mobile App Theme - Data & Assets -->
const logos = [
  { name: "Visa", src: "/assets/marketing-section/logo/openai-com-brandmark.svg" },
  { name: "Mastercard", src: "/assets/marketing-section/logo/nike-com-brandmark.svg" },
  { name: "Plaid", src: "/assets/marketing-section/logo/react-dev-logo.png" },
  { name: "Stripe", src: "/assets/marketing-section/logo/npmjs-com-logo.png" },
  { name: "PayPal", src: "/assets/marketing-section/logo/ai-claude-net-logo.png" },
  { name: "Goldman", src: "/assets/marketing-section/logo/react-dev-logo.png" },
];

const SIMPLE_LINKS = [
  { label: "Personal", href: "#" },
  { label: "Business", href: "#" },
  { label: "Security", href: "#" },
  { label: "Help Center", href: "#" },
  { label: "Fees", href: "#" },
];

const SOCIALS = [
  { label: "Twitter", href: "#", icon: <MessageCircle className="h-5 w-5" /> },
  { label: "LinkedIn", href: "#", icon: <Briefcase className="h-5 w-5" /> },
];

export const FintechTemplate = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 dark:bg-zinc-950">
      <TemplateThemeToggle />

      {/* <!-- Hero Section V2 - Left Aligned with Animated UI Mockup --> */}
      <Hero size="lg" align="left" className="relative overflow-hidden bg-white dark:bg-zinc-950">
        {/* Subtle background gradient */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-emerald-100/30 via-transparent to-transparent dark:from-emerald-900/10" />

        <HeroHeader
          className="relative z-50"
          logo={
            <div className="flex items-center gap-2 text-xl font-bold">
              <ShieldCheck className="h-7 w-7 text-emerald-500" />
              <span className="text-zinc-900 dark:text-white">SecurePay</span>
            </div>
          }
          links={[
            { label: "Send Money", href: "#" },
            { label: "Cards", href: "#" },
            { label: "Invest", href: "#" },
          ]}
          action={
            <Button
              size="sm"
              className="rounded-full bg-zinc-900 font-medium text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Get App
            </Button>
          }
        />
        <HeroContent
          className="relative z-10 mx-auto max-w-7xl"
          badge={
            <HeroBadge className="border-emerald-200 bg-emerald-100/50 text-emerald-800 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
              #1 Rated Finance App 2026
            </HeroBadge>
          }
          title={
            <span className="text-5xl font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
              Your entire financial life, in one secure pocket.
            </span>
          }
          description={
            <span className="max-w-xl text-lg leading-relaxed text-zinc-600 sm:text-xl dark:text-zinc-400">
              Send money globally with zero hidden fees. Track spending automatically, invest in
              stocks seamlessly, and earn 5% APY on your savings. Join 2 million smart users today.
            </span>
          }
          actions={
            <div className="mt-8 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <Button className="h-14 w-full rounded-full bg-emerald-500 px-8 text-lg font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:scale-105 hover:bg-emerald-600 sm:w-auto">
                Download Now <Download size={20} className="ml-2" />
              </Button>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <img
                      key={i}
                      className="inline-block h-12 w-12 rounded-full object-cover shadow-sm ring-4 ring-white dark:ring-zinc-950"
                      src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                      alt=""
                    />
                  ))}
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100 shadow-sm ring-4 ring-white dark:bg-zinc-800 dark:ring-zinc-950">
                    <span className="text-sm font-bold text-zinc-900 dark:text-white">4.9★</span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-zinc-900 dark:text-white">
                    Trusted by millions
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    App Store & Google Play
                  </span>
                </div>
              </div>
            </div>
          }
          media={
            <div className="relative flex aspect-[4/5] w-full rotate-2 flex-col overflow-hidden rounded-[3rem] border-[12px] border-zinc-900 bg-white p-6 shadow-2xl transition-transform duration-700 ease-out hover:rotate-0 md:aspect-auto md:h-[650px] dark:border-zinc-800 dark:bg-zinc-950">
              {/* Animated Phone Mockup */}
              <div className="mb-8 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Total Balance
                  </span>
                  <span className="mt-1 text-4xl font-bold text-zinc-900 dark:text-white">
                    $24,592.50
                  </span>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <Wallet className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>

              <div className="mb-8 flex gap-4">
                <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-900">
                  <ArrowUpRight className="h-6 w-6 text-emerald-500" />
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">Send</span>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-900">
                  <ArrowDownRight className="h-6 w-6 text-blue-500" />
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">Receive</span>
                </div>
                <div className="flex flex-1 flex-col items-center justify-center gap-2 rounded-2xl bg-zinc-100 p-4 dark:bg-zinc-900">
                  <CreditCard className="h-6 w-6 text-purple-500" />
                  <span className="text-sm font-medium text-zinc-900 dark:text-white">Cards</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-4">
                <span className="text-lg font-bold text-zinc-900 dark:text-white">
                  Recent Transactions
                </span>
                {[
                  { name: "Apple Store", amount: "-$120.00", icon: "🍏", color: "text-zinc-900" },
                  { name: "Salary", amount: "+$4,500.00", icon: "💼", color: "text-emerald-500" },
                  { name: "Uber Eats", amount: "-$24.50", icon: "🍔", color: "text-zinc-900" },
                  { name: "Netflix", amount: "-$15.99", icon: "🍿", color: "text-zinc-900" },
                ].map((tx, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-100 bg-white text-lg shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                        {tx.icon}
                      </div>
                      <span className="font-semibold text-zinc-900 dark:text-white">{tx.name}</span>
                    </div>
                    <span
                      className={`font-bold ${tx.amount.startsWith("+") ? "text-emerald-500 dark:text-emerald-400" : "text-zinc-900 dark:text-white"}`}
                    >
                      {tx.amount}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          }
        />
      </Hero>

      {/* <!-- Logo Cloud V1 - Marquee Grid --> */}
      <LogoCloud className="border-y border-zinc-100 bg-white py-16 dark:border-zinc-900 dark:bg-zinc-950">
        <LogoCloudTitle className="mb-8 text-sm font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
          Supported by top financial institutions
        </LogoCloudTitle>
        <LogoCloudTicker speed="fast" direction="left">
          {logos.map((logo, index) => (
            <LogoCloudItem key={index} className="mx-10 w-32 shrink-0">
              <img
                src={logo.src}
                alt={logo.name}
                className="h-7 w-auto object-contain opacity-50 grayscale transition-all hover:opacity-100 hover:grayscale-0 dark:invert"
              />
            </LogoCloudItem>
          ))}
        </LogoCloudTicker>
      </LogoCloud>

      {/* <!-- Feature Section V2 - Alternating Rows with Framer Motion --> */}
      <FeatureSection className="border-b border-zinc-200 bg-zinc-50 py-32 dark:border-zinc-800 dark:bg-zinc-900">
        <FeatureHeader>
          <FeatureBadge className="border border-emerald-200 bg-emerald-100 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400">
            Smarter Money
          </FeatureBadge>
          <FeatureTitle className="text-4xl font-bold text-zinc-900 sm:text-5xl dark:text-white">
            Finance without the friction.
          </FeatureTitle>
          <FeatureDescription className="mx-auto mt-6 max-w-3xl text-xl text-zinc-600 dark:text-zinc-400">
            We redesigned banking from the ground up to serve you, not the other way around. No
            branches, no paperwork, just seamless, automated money management right in your pocket.
          </FeatureDescription>
        </FeatureHeader>

        <FeatureAlternating className="mt-24">
          <FeatureRow>
            <FeatureRowContent>
              <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Instant Global Transfers
              </h3>
              <p className="mt-6 text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                Send money to 150+ countries at the real exchange rate. Your recipient gets the
                funds in seconds, not days. We charge a tiny, transparent fee and never hide markups
                in the exchange rate.
              </p>
              <ul className="mt-8 space-y-4 text-lg text-zinc-700 dark:text-zinc-300">
                <li className="flex items-center gap-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>{" "}
                  Real mid-market exchange rate
                </li>
                <li className="flex items-center gap-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>{" "}
                  Delivered in seconds globally
                </li>
                <li className="flex items-center gap-x-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400">
                    <ShieldCheck className="h-5 w-5" />
                  </div>{" "}
                  Track your transfer live in-app
                </li>
              </ul>
            </FeatureRowContent>
            <FeatureRowMedia>
              <div className="relative flex h-[400px] w-full flex-col justify-center overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent dark:from-blue-900/10" />

                {/* Transfer Animation Mockup */}
                <div className="relative z-10 mx-auto flex w-full max-w-sm flex-col gap-6">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                        <span className="text-xl">🇺🇸</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-900 dark:text-white">You send</span>
                        <span className="text-sm text-zinc-500">USD</span>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-zinc-900 dark:text-white">$1,000</span>
                  </motion.div>

                  <div className="relative flex justify-center">
                    <div className="absolute inset-y-0 flex w-full items-center justify-center">
                      <div className="absolute h-full w-px bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
                      className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                    >
                      <ArrowDownRight className="h-5 w-5" />
                    </motion.div>
                  </div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
                    className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-zinc-50 p-4 dark:border-zinc-800 dark:bg-zinc-900"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                        <span className="text-xl">🇪🇺</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-900 dark:text-white">
                          They receive
                        </span>
                        <span className="text-sm text-zinc-500">EUR</span>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                      €912.45
                    </span>
                  </motion.div>
                </div>
              </div>
            </FeatureRowMedia>
          </FeatureRow>

          <FeatureRow reverse className="mt-32">
            <FeatureRowContent>
              <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Smart Spend Tracking
              </h3>
              <p className="mt-6 text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                Stop wondering where your money went. Our AI automatically categorizes every
                transaction and builds beautiful, interactive charts so you can see your spending
                habits at a glance.
              </p>
              <Button
                variant="outline"
                className="mt-10 h-14 rounded-full border-zinc-300 px-8 text-lg font-medium text-zinc-900 hover:bg-zinc-100 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
              >
                Explore budgeting tools <ChevronRight size={20} className="ml-2" />
              </Button>
            </FeatureRowContent>
            <FeatureRowMedia>
              <div className="relative flex h-[400px] w-full flex-col justify-end overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-2xl ring-1 ring-zinc-200 dark:bg-zinc-950 dark:ring-zinc-800">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-50/50 via-transparent to-transparent dark:from-purple-900/10" />

                {/* Analytics Chart Mockup */}
                <div className="relative z-10 flex h-full w-full flex-col justify-between pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-zinc-900 dark:text-white">
                      Monthly Spend
                    </span>
                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                      August
                    </span>
                  </div>

                  <div className="mt-8 flex h-48 items-end justify-between gap-3">
                    {[
                      { height: "40%", label: "M", delay: 0 },
                      { height: "65%", label: "T", delay: 0.1 },
                      { height: "35%", label: "W", delay: 0.2 },
                      { height: "80%", label: "T", delay: 0.3 },
                      { height: "95%", label: "F", delay: 0.4 },
                      { height: "100%", label: "S", delay: 0.5 },
                      { height: "70%", label: "S", delay: 0.6 },
                    ].map((bar, i) => (
                      <div key={i} className="flex flex-1 flex-col items-center gap-2">
                        <motion.div
                          initial={{ height: "0%" }}
                          animate={{ height: bar.height }}
                          transition={{ duration: 1, delay: bar.delay, ease: "easeOut" }}
                          className={`w-full rounded-t-xl ${i === 5 ? "bg-purple-500" : "bg-purple-200 dark:bg-purple-900/50"}`}
                        />
                        <span className="text-xs font-semibold text-zinc-500">{bar.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FeatureRowMedia>
          </FeatureRow>
        </FeatureAlternating>
      </FeatureSection>

      {/* <!-- Testimonials V1 --> */}
      <div className="bg-white py-12 dark:bg-zinc-950">
        <Testimonials />
      </div>

      {/* <!-- CTA V2 - Split Layout --> */}
      <CtaSplit
        className="border-t border-zinc-800 bg-zinc-900 text-white dark:bg-zinc-900"
        badge={
          <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-3 py-1.5 text-sm font-medium text-emerald-300 ring-1 ring-emerald-500/30">
            Open an account in 3 minutes
          </span>
        }
        title={
          <span className="text-4xl font-bold sm:text-5xl">
            Take control of your financial future.
          </span>
        }
        description={
          <span className="mt-6 block text-lg text-zinc-400">
            Join millions of users who are already saving, spending, and investing smarter with
            SecurePay. Your money is protected by bank-grade security and FDIC insurance up to
            $250k.
          </span>
        }
        imageSrc="https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=2850&q=80"
        primaryAction={{
          label: "Download the App",
          href: "#",
          className:
            "bg-emerald-500 text-white hover:bg-emerald-600 rounded-full h-14 px-8 text-lg",
        }}
        secondaryAction={{
          label: "Compare Cards",
          href: "#",
          className:
            "text-white border-zinc-700 hover:bg-zinc-800 rounded-full h-14 px-8 text-lg ml-0 sm:ml-4 mt-4 sm:mt-0",
        }}
      />

      {/* <!-- Footer V2 - Simple --> */}
      <FooterSimple
        className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-900 dark:bg-zinc-950"
        logo={
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-emerald-500" />
            <span className="font-bold text-zinc-900 dark:text-white">SecurePay</span>
          </div>
        }
        links={SIMPLE_LINKS}
        socials={SOCIALS}
        copyright="&copy; 2026 SecurePay Financial. All rights reserved."
      />
    </div>
  );
};
