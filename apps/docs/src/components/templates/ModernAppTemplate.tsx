import React from "react";
import {
  Hero,
  HeroHeader,
  HeroBody,
  HeroTitle,
  HeroDescription,
  HeroActions,
  LogoCloud,
  LogoCloudTitle,
  LogoCloudTicker,
  LogoCloudItem,
  FeatureSection,
  FeatureAlternating,
  FeatureRow,
  FeatureRowContent,
  FeatureRowMedia,
  BentoGrid,
  BentoCard,
  BentoCardBackground,
  BentoCardContent,
  BentoCardFooter,
  CtaCentered,
  FooterMega,
} from "@hudbird/marketing";
import { Button, Text } from "@hudbird/ui";
import {
  Smartphone,
  Zap,
  Shield,
  Globe,
  Play,
  ChevronRight,
  Apple,
  MessageCircle,
  Phone,
  Image as ImageIcon,
} from "lucide-react";
import { TemplateThemeToggle } from "./TemplateThemeToggle";
import { motion } from "framer-motion";

// <!-- Modern Mobile App Theme - Data & Assets -->
const logos = [
  { name: "Apple", src: "/assets/marketing-section/logo/apple-brandmark.svg" },
  { name: "Google", src: "/assets/marketing-section/logo/google-brandmark.svg" },
  { name: "Spotify", src: "/assets/marketing-section/logo/spotify-brandmark.svg" },
  { name: "Netflix", src: "/assets/marketing-section/logo/netflix-brandmark.svg" },
  { name: "Samsung", src: "/assets/marketing-section/logo/apple-brandmark.svg" }, // placeholder
];

const MEGA_LINK_GROUPS = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#" },
      { label: "Security", href: "#" },
      { label: "Integrations", href: "#" },
      { label: "Pricing", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "#" },
      { label: "Community", href: "#" },
      { label: "Contact Us", href: "#" },
      { label: "Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Press", href: "#" },
    ],
  },
];

const SOCIALS = [{ label: "Twitter", href: "#", icon: <Globe className="h-5 w-5" /> }];

export const ModernAppTemplate = () => {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 dark:bg-zinc-950">
      <TemplateThemeToggle />

      {/* <!-- Hero Section V6 - App Presentation Theme --> */}
      <Hero size="lg" className="relative overflow-hidden bg-zinc-50 dark:bg-zinc-950">
        {/* Abstract background shapes */}
        <div className="pointer-events-none absolute top-0 right-0 h-[800px] w-[800px] translate-x-1/3 -translate-y-12 rounded-full bg-rose-500/10 blur-3xl dark:bg-rose-500/20" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/3 rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-500/20" />

        <HeroHeader
          className="relative z-50"
          logo={
            <div className="flex items-center gap-2">
              <Smartphone className="h-8 w-8 text-rose-500" />
              <span className="text-xl font-bold text-zinc-900 dark:text-white">Pulse</span>
            </div>
          }
          links={[
            { label: "Features", href: "#" },
            { label: "Testimonials", href: "#" },
            { label: "Download", href: "#" },
          ]}
          action={
            <Button
              size="sm"
              className="rounded-full bg-zinc-900 px-6 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Get the App
            </Button>
          }
        />
        <HeroBody
          align="center"
          className="relative z-10 mx-auto max-w-4xl pt-32 pb-24 lg:pt-40 lg:pb-32"
        >
          <HeroTitle className="text-6xl font-bold tracking-tight text-zinc-900 md:text-8xl dark:text-white">
            Stay connected.
            <br />
            Stay in the <span className="text-rose-500">Pulse.</span>
          </HeroTitle>
          <HeroDescription className="mx-auto mt-8 max-w-2xl text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
            The all-in-one communication hub for modern teams and friends. Voice, video, and text
            messaging combined in a beautifully simple interface.
          </HeroDescription>
          <HeroActions className="mt-12 justify-center">
            <Button className="flex h-14 items-center gap-2 rounded-full bg-zinc-900 px-8 text-lg text-white shadow-xl shadow-zinc-900/10 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:shadow-white/10 dark:hover:bg-zinc-200">
              <Apple size={24} /> Download for iOS
            </Button>
            <Button
              variant="outline"
              className="h-14 rounded-full border-zinc-300 px-8 text-lg text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
            >
              <Play size={20} className="mr-2 text-rose-500" /> Watch Video
            </Button>
          </HeroActions>

          {/* Hero App Mockup Animation */}
          <div className="relative mx-auto mt-24 w-full max-w-5xl">
            <div className="rounded-[3rem] border border-white/60 bg-white/40 p-4 shadow-[0_30px_100px_-20px_rgba(225,29,72,0.15)] backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-900/40 dark:shadow-[0_30px_100px_-20px_rgba(225,29,72,0.1)]">
              <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-[2.5rem] border-4 border-zinc-900 bg-zinc-950">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-rose-900/40 via-zinc-950 to-zinc-950" />

                {/* Simulated Desktop App UI inside */}
                <div className="relative z-10 flex h-[85%] w-[90%] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
                  {/* Sidebar */}
                  <div className="flex w-16 flex-col border-r border-zinc-800 pt-4 md:w-64">
                    <div className="mb-6 hidden px-4 font-semibold text-white md:flex">Chats</div>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className="flex cursor-pointer items-center gap-3 px-2 py-3 hover:bg-zinc-800 md:px-4"
                      >
                        <div className="h-10 w-10 shrink-0 rounded-full bg-zinc-700" />
                        <div className="hidden flex-1 flex-col md:flex">
                          <div className="mb-1 h-4 w-24 rounded bg-zinc-700" />
                          <div className="h-3 w-32 rounded bg-zinc-800" />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Main Chat */}
                  <div className="flex flex-1 flex-col">
                    <div className="flex h-16 items-center border-b border-zinc-800 px-6">
                      <span className="font-medium text-white">Design Team</span>
                    </div>
                    <div className="flex flex-1 flex-col justify-end gap-6 p-6 pb-10">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="max-w-[70%] self-start rounded-2xl rounded-tl-none bg-zinc-800 p-4"
                      >
                        <div className="mb-2 h-4 w-48 rounded bg-zinc-700" />
                        <div className="h-4 w-32 rounded bg-zinc-700" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5 }}
                        className="max-w-[70%] self-end rounded-2xl rounded-tr-none bg-rose-600 p-4"
                      >
                        <div className="mb-2 h-4 w-56 rounded bg-rose-500" />
                        <div className="h-4 w-40 rounded bg-rose-500" />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 2.5 }}
                        className="flex gap-2 self-start"
                      >
                        <div className="flex gap-1 rounded-2xl rounded-tl-none bg-zinc-800 p-3">
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                            className="h-2 w-2 rounded-full bg-zinc-500"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                            className="h-2 w-2 rounded-full bg-zinc-500"
                          />
                          <motion.div
                            animate={{ y: [0, -5, 0] }}
                            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                            className="h-2 w-2 rounded-full bg-zinc-500"
                          />
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HeroBody>
      </Hero>

      {/* <!-- Logo Cloud V3 - Marquee --> */}
      <LogoCloud className="overflow-hidden border-y border-zinc-100 bg-white py-20 dark:border-zinc-900 dark:bg-zinc-950">
        <LogoCloudTitle className="mb-10 text-sm font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
          Loved by teams at
        </LogoCloudTitle>
        <LogoCloudTicker speed="fast" direction="left">
          {logos.map((logo, index) => (
            <LogoCloudItem key={index} className="mx-12 w-32 shrink-0">
              <img
                src={logo.src}
                alt={logo.name}
                className="h-10 w-auto object-contain opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 dark:opacity-60 dark:invert"
              />
            </LogoCloudItem>
          ))}
        </LogoCloudTicker>
      </LogoCloud>

      {/* <!-- Bento Grid V4 - App Features --> */}
      <div className="relative w-full border-b border-zinc-100 bg-zinc-50 px-4 py-32 sm:px-8 dark:border-zinc-900 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl space-y-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-white">
              Everything you need.
              <br />
              Nothing you don't.
            </h2>
            <p className="mt-6 text-xl text-zinc-600 dark:text-zinc-400">
              Designed with extreme focus on performance, usability, and delight.
            </p>
          </div>

          <BentoGrid className="gap-6 md:auto-rows-[28rem] md:grid-cols-3">
            <BentoCard className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white md:col-span-2 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="relative flex min-h-[250px] flex-1 items-center justify-center overflow-hidden bg-zinc-100 p-8 dark:bg-zinc-950">
                {/* Sync animation mock */}
                <div className="relative flex h-40 w-full max-w-md items-center justify-between">
                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="flex h-20 w-16 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                      <Smartphone className="text-zinc-400" />
                    </div>
                    <span className="text-sm font-medium text-zinc-500">Mobile</span>
                  </div>

                  {/* Data stream */}
                  <div className="absolute top-[38px] right-16 left-16 -z-10 h-0.5 bg-zinc-200 dark:bg-zinc-800" />
                  <motion.div
                    animate={{ x: ["0%", "400%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                    className="absolute top-[37px] left-16 h-1 w-16 bg-gradient-to-r from-transparent via-rose-500 to-transparent blur-sm"
                  />

                  <div className="relative z-10 flex flex-col items-center gap-4">
                    <div className="flex h-20 w-32 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-800">
                      <Globe className="text-zinc-400" />
                    </div>
                    <span className="text-sm font-medium text-zinc-500">Desktop</span>
                  </div>
                </div>
              </div>
              <BentoCardContent className="border-t border-zinc-100 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600 dark:bg-rose-500/20 dark:text-rose-400">
                  <Zap size={24} />
                </div>
                <Text variant="strong" className="text-3xl font-bold text-zinc-900 dark:text-white">
                  Lightning Fast Sync
                </Text>
                <Text className="mt-4 max-w-md text-lg text-zinc-600 dark:text-zinc-400">
                  Your messages sync instantly across all your devices. Start a conversation on your
                  phone, finish it on your desktop seamlessly.
                </Text>
              </BentoCardContent>
            </BentoCard>

            <BentoCard className="group flex flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white md:col-span-1 dark:border-zinc-800 dark:bg-zinc-900">
              <div className="relative flex min-h-[250px] flex-1 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 p-8 dark:from-blue-950/30 dark:to-indigo-950/30">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className="relative flex h-32 w-32 items-center justify-center rounded-full border-4 border-blue-200 dark:border-blue-800"
                >
                  <div
                    className="absolute inset-0 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"
                    style={{ animationDuration: "3s" }}
                  />
                  <Shield size={40} className="text-blue-500" />
                </motion.div>
              </div>
              <BentoCardContent className="border-t border-zinc-100 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                <Text variant="strong" className="text-2xl font-bold text-zinc-900 dark:text-white">
                  End-to-End Encryption
                </Text>
                <Text className="mt-4 text-zinc-600 dark:text-zinc-400">
                  Privacy isn't an option, it's the default. Your conversations are secured with
                  industry-leading protocol encryption.
                </Text>
              </BentoCardContent>
            </BentoCard>
          </BentoGrid>
        </div>
      </div>

      {/* <!-- Feature Section V6 - Alternating - App Showcase --> */}
      <FeatureSection className="bg-white py-32 dark:bg-zinc-950">
        <FeatureAlternating>
          <FeatureRow>
            <FeatureRowContent>
              <h3 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                HD Video Calls
              </h3>
              <p className="mt-6 text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                Connect face-to-face with crystal clear 4K video calling. Our adaptive bitrate
                technology ensures smooth calls even on weak cellular networks.
              </p>
              <Button
                variant="outline"
                className="mt-8 h-14 rounded-full border-zinc-300 px-8 text-lg font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
              >
                Learn more about calls <ChevronRight size={20} className="ml-2" />
              </Button>
            </FeatureRowContent>
            <FeatureRowMedia>
              <div className="relative mx-auto w-72 md:w-80">
                {/* iPhone Mockup Frame with UI */}
                <div className="relative flex h-[650px] w-full flex-col justify-between overflow-hidden rounded-[3.5rem] border-[16px] border-zinc-900 bg-zinc-950 p-4 shadow-2xl">
                  <div className="absolute top-0 left-1/2 z-20 h-6 w-32 -translate-x-1/2 rounded-b-3xl bg-zinc-900" />

                  {/* Video Call Simulation */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=600&h=1200&q=80')] bg-cover bg-center" />

                  {/* Local video pip */}
                  <div className="relative z-10 mt-12 ml-auto h-36 w-24 overflow-hidden rounded-2xl border-2 border-white/20 bg-zinc-800">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
                      className="h-full w-full object-cover"
                      alt="pip"
                    />
                  </div>

                  {/* Call Controls */}
                  <div className="relative z-10 mb-4 flex w-full justify-center gap-6 rounded-3xl bg-black/40 p-6 backdrop-blur-md">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white">
                      <Phone size={24} />
                    </div>
                    <div className="flex h-12 w-12 rotate-[135deg] items-center justify-center rounded-full bg-rose-500 text-white">
                      <Phone size={24} />
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white">
                      <ImageIcon size={24} />
                    </div>
                  </div>
                </div>
              </div>
            </FeatureRowMedia>
          </FeatureRow>

          <FeatureRow reverse className="mt-32">
            <FeatureRowContent>
              <h3 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Smart Organization
              </h3>
              <p className="mt-6 text-xl leading-relaxed text-zinc-600 dark:text-zinc-400">
                Pulse automatically organizes your files, links, and media shared in chats into
                easily accessible galleries. Never lose that important document again.
              </p>
              <Button
                variant="outline"
                className="mt-8 h-14 rounded-full border-zinc-300 px-8 text-lg font-medium text-zinc-900 hover:bg-zinc-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-900"
              >
                Explore file sharing <ChevronRight size={20} className="ml-2" />
              </Button>
            </FeatureRowContent>
            <FeatureRowMedia>
              <div className="relative mx-auto w-72 md:w-80">
                <div className="relative flex h-[650px] w-full flex-col gap-4 overflow-hidden rounded-[3.5rem] border-[16px] border-zinc-900 bg-zinc-950 p-4 pt-16 shadow-2xl">
                  <div className="absolute top-0 left-1/2 z-20 h-6 w-32 -translate-x-1/2 rounded-b-3xl bg-zinc-900" />

                  <span className="px-2 text-2xl font-bold text-white">Shared Media</span>
                  <div className="mb-2 flex gap-2 px-2">
                    <span className="rounded-full bg-zinc-800 px-4 py-1.5 text-sm font-medium text-white">
                      Photos
                    </span>
                    <span className="rounded-full bg-transparent px-4 py-1.5 text-sm font-medium text-zinc-500">
                      Links
                    </span>
                    <span className="rounded-full bg-transparent px-4 py-1.5 text-sm font-medium text-zinc-500">
                      Docs
                    </span>
                  </div>

                  <div className="grid flex-1 grid-cols-2 gap-2 pb-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="relative overflow-hidden rounded-2xl bg-zinc-800">
                        <img
                          src={`https://images.unsplash.com/photo-${1600000000000 + i * 1000}?auto=format&fit=crop&w=300&q=80`}
                          className="h-full w-full object-cover opacity-80"
                          alt="gallery item"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </FeatureRowMedia>
          </FeatureRow>
        </FeatureAlternating>
      </FeatureSection>

      {/* <!-- CTA V6 - App Download --> */}
      <div className="border-t border-zinc-100 bg-white px-4 py-24 sm:px-6 dark:border-zinc-900 dark:bg-zinc-950">
        <CtaCentered
          className="mx-auto max-w-6xl rounded-[3rem] bg-zinc-100 py-24 shadow-2xl dark:bg-zinc-900"
          title={
            <span className="text-4xl font-bold text-zinc-900 md:text-5xl dark:text-white">
              Ready to upgrade your communication?
            </span>
          }
          description={
            <span className="mt-4 block text-lg text-zinc-600 dark:text-zinc-400">
              Join millions of users who rely on Pulse every day. Available on iOS, Android, Mac,
              and Windows.
            </span>
          }
          primaryAction={{
            label: "Download Pulse Free",
            onClick: () => {},
            className:
              "bg-rose-500 text-white hover:bg-rose-600 rounded-full h-14 px-8 text-lg font-medium",
          }}
          secondaryAction={{
            label: "Use in Browser",
            href: "#",
            className:
              "text-zinc-700 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full h-14 px-8 text-lg font-medium mt-4 sm:mt-0 sm:ml-4",
          }}
        />
      </div>

      {/* <!-- Footer V6 - Mega --> */}
      <FooterMega
        className="border-t border-zinc-200 bg-zinc-50 pt-16 dark:border-zinc-900 dark:bg-zinc-950"
        logo={
          <div className="flex items-center gap-2">
            <Smartphone className="h-6 w-6 text-rose-500" />
            <span className="text-lg font-bold text-zinc-900 dark:text-white">Pulse</span>
          </div>
        }
        brandName=""
        description="Building the future of communication. One message at a time."
        linkGroups={MEGA_LINK_GROUPS}
        socials={SOCIALS}
        copyright="&copy; 2026 Pulse Communications Inc. All rights reserved."
      />
    </div>
  );
};
