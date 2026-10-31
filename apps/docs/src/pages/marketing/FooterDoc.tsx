import React from "react";
import { FooterSimple, FooterMega, FooterGlass } from "@hudbird/marketing";
import { MarketingPreview } from "../../components/MarketingPreview";
import { Globe, MessageCircle, Briefcase, Droplets } from "lucide-react";
import footerSimpleCode from "../../../../../packages/marketing/src/components/Footer/FooterSimple.tsx?raw";
import footerGlassCode from "../../../../../packages/marketing/src/components/Footer/FooterGlass.tsx?raw";
import { DocHeader } from "../../components/DocHeader";
import { InstallationTabs } from "../../components/InstallationTabs";

const SOCIALS = [
  { label: "Twitter", href: "#", icon: <MessageCircle className="h-5 w-5" /> },
  { label: "GitHub", href: "#", icon: <Globe className="h-5 w-5" /> },
  { label: "LinkedIn", href: "#", icon: <Briefcase className="h-5 w-5" /> },
];

const SIMPLE_LINKS = [
  { label: "About", href: "#" },
  { label: "Blog", href: "#" },
  { label: "Jobs", href: "#" },
  { label: "Press", href: "#" },
  { label: "Accessibility", href: "#" },
  { label: "Partners", href: "#" },
];

const MEGA_LINK_GROUPS = [
  {
    title: "Solutions",
    links: [
      { label: "Marketing", href: "#" },
      { label: "Analytics", href: "#" },
      { label: "Commerce", href: "#" },
      { label: "Insights", href: "#" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Pricing", href: "#" },
      { label: "Documentation", href: "#" },
      { label: "Guides", href: "#" },
      { label: "API Status", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Jobs", href: "#" },
      { label: "Press", href: "#" },
      { label: "Partners", href: "#" },
    ],
  },
];

export default function FooterDoc() {
  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      {/* Title & Subtitle */}
      <DocHeader
        category="Marketing"
        title="Footer Section"
        badge="Marketing"
        description="Versatile footer sections for the bottom of your marketing pages. Includes options for simple link lists or full mega-footers with newsletter signups."
      />

      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="footer" manualCode={footerSimpleCode} />
      </div>

      {/* EXAMPLES SECTION */}
      <section id="examples" className="scroll-mt-24 space-y-16">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Examples
          </h2>
        </div>
        <div className="space-y-16">
          {/* Simple Footer */}
          <div id="simple" className="scroll-mt-20">
            <h3 className="font-outfit mb-4 text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Simple Centered
            </h3>
            <MarketingPreview>
              <FooterSimple
                logo={<Droplets className="h-8 w-8 text-indigo-600 dark:text-indigo-500" />}
                links={SIMPLE_LINKS}
                socials={SOCIALS}
                copyright="&copy; 2026 Hudbird UI, Inc. All rights reserved."
              />
            </MarketingPreview>
          </div>

          {/* Mega Footer */}
          <div id="mega" className="scroll-mt-20">
            <h3 className="font-outfit mb-4 text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Mega Footer with Newsletter
            </h3>
            <MarketingPreview>
              <div className="w-full rounded-2xl bg-white dark:bg-zinc-950">
                <FooterMega
                  logo={<Droplets className="h-8 w-8 text-indigo-600 dark:text-indigo-500" />}
                  brandName="Hudbird UI"
                  description="Making the world a better place through constructing elegant hierarchies."
                  linkGroups={MEGA_LINK_GROUPS}
                  socials={SOCIALS}
                  copyright="&copy; 2026 Hudbird UI, Inc. All rights reserved."
                  onSubscribe={(email) => alert("Subscribed: " + email)}
                />
              </div>
            </MarketingPreview>
          </div>

          {/* Glassmorphic Footer */}
          <div id="glass" className="scroll-mt-20">
            <h3 className="font-outfit mb-4 text-xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Glassmorphic Footer
            </h3>
            <MarketingPreview>
              <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-950 dark:to-indigo-950/20">
                {/* Add some ambient glowing orbs behind the glass */}
                <div className="absolute top-1/2 left-1/4 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/20 blur-[80px]" />
                <div className="absolute top-1/2 right-1/4 h-64 w-64 translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/20 blur-[80px]" />

                <FooterGlass
                  logo={<Droplets className="h-8 w-8 text-zinc-900 dark:text-white" />}
                  brandName="Nietzsche"
                  newsletterTitle="Sign up to receive health tips."
                  newsletterDisclaimer="By subscribing you agree to with our Privacy Policy and provide consent to receive updates from our company."
                  newsletterPlaceholder="Enter you email"
                  newsletterButtonText="Submit"
                  linkGroups={MEGA_LINK_GROUPS}
                  copyright="&copy; 2026 joey med, All rights reserved."
                  onSubscribe={(email) => alert("Subscribed: " + email)}
                />
              </div>
            </MarketingPreview>
          </div>
        </div>
      </section>

      {/* API REFERENCE */}
      <section id="api" className="scroll-mt-24 space-y-12">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          API Reference
        </h2>

        <div id="props-simple" className="scroll-mt-20">
          <h3 className="font-outfit mb-4 text-lg font-medium text-zinc-900 dark:text-white">
            FooterSimple Props
          </h3>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
              <thead className="border-b border-zinc-200 bg-zinc-50/50 text-xs font-semibold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100">
                <tr>
                  <th className="px-4 py-3">Prop</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    logo
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">React.ReactNode</td>
                  <td className="px-4 py-3">Brand logo component</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    brandName
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">string</td>
                  <td className="px-4 py-3">Optional text next to the logo</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    links
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">FooterLink[]</td>
                  <td className="px-4 py-3">Horizontal list of navigation links</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    socials
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">SocialLink[]</td>
                  <td className="px-4 py-3">List of social media icons/links</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    copyright
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">string</td>
                  <td className="px-4 py-3">Bottom copyright text</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="props-mega" className="scroll-mt-20">
          <h3 className="font-outfit mb-4 text-lg font-medium text-zinc-900 dark:text-white">
            FooterMega Props
          </h3>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
              <thead className="border-b border-zinc-200 bg-zinc-50/50 text-xs font-semibold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100">
                <tr>
                  <th className="px-4 py-3">Prop</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    linkGroups
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">FooterLinkGroup[]</td>
                  <td className="px-4 py-3">Array of link groups for the grid</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    newsletterTitle
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">string</td>
                  <td className="px-4 py-3">Heading for newsletter section</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    onSubscribe
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">(email: string) ={">"} void</td>
                  <td className="px-4 py-3">Callback when newsletter form is submitted</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div id="props-glass" className="scroll-mt-20">
          <h3 className="font-outfit mb-4 text-lg font-medium text-zinc-900 dark:text-white">
            FooterGlass Props
          </h3>
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
            <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400">
              <thead className="border-b border-zinc-200 bg-zinc-50/50 text-xs font-semibold text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-100">
                <tr>
                  <th className="px-4 py-3">Prop</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    linkGroups
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">FooterLinkGroup[]</td>
                  <td className="px-4 py-3">Array of link groups for the grid</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    newsletterTitle
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">string</td>
                  <td className="px-4 py-3">Heading for newsletter section</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    newsletterDisclaimer
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">string</td>
                  <td className="px-4 py-3">Disclaimer text under the newsletter input</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                    onSubscribe
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">(email: string) ={">"} void</td>
                  <td className="px-4 py-3">Callback when newsletter form is submitted</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}

const simpleCode = `import { FooterSimple } from "@/components/hudbird-ui/Footer";
import { Github, Twitter } from 'lucide-react'

export default function Example() {
  return (
    <FooterSimple
      logo={<img src="/logo.svg" alt="Logo" className="h-8 w-8" />}
      links={[
        { label: "About", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Jobs", href: "#" },
      ]}
      socials={[
        { label: "Twitter", href: "#", icon: <Twitter className="h-5 w-5" /> },
        { label: "GitHub", href: "#", icon: <Github className="h-5 w-5" /> },
      ]}
      copyright="&copy; 2026 Your Company, Inc. All rights reserved."
    />
  )
}`;

const megaCode = `import { FooterMega } from "@/components/hudbird-ui/Footer";
import { Github, Twitter } from 'lucide-react'

export default function Example() {
  return (
    <FooterMega
      logo={<img src="/logo.svg" alt="Logo" className="h-8 w-8" />}
      brandName="Hudbird UI"
      description="Making the world a better place through elegant hierarchies."
      linkGroups={[
        {
          title: "Solutions",
          links: [
            { label: "Marketing", href: "#" },
            { label: "Analytics", href: "#" },
          ],
        },
        {
          title: "Support",
          links: [
            { label: "Pricing", href: "#" },
            { label: "Documentation", href: "#" },
          ],
        },
      ]}
      socials={[
        { label: "Twitter", href: "#", icon: <Twitter className="h-5 w-5" /> },
      ]}
      copyright="&copy; 2026 Your Company, Inc. All rights reserved."
      onSubscribe={(email) => console.log(email)}
    />
  )
}`;
