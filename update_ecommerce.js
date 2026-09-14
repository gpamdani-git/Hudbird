const fs = require("fs");

const fileContent = `import React, { useState } from "react";
import { 
  Hero, HeroHeader, HeroBody, HeroBadge, HeroTitle, HeroDescription, HeroActions,
  LogoCloud, LogoCloudTitle, LogoCloudGrid, LogoCloudItem,
  FeatureSection, FeatureHeader, FeatureBadge, FeatureTitle, FeatureDescription, FeatureGrid, FeatureCard, FeatureIcon, FeatureCardTitle, FeatureCardDescription,
  BentoGrid, BentoCard, BentoCardBackground, BentoCardContent, BentoCardFooter,
  PricingSection, PricingHeader, PricingBadge, PricingTitle, PricingDescription, PricingGrid, PricingTier, PricingTierHeader, PricingTierName, PricingTierDescription, PricingTierPrice, PricingTierFeatures, PricingTierFeature, PricingToggle,
  Testimonials,
  Faq,
  CtaCentered,
  FooterMega 
} from "@hudbird/marketing";
import { Button, Text } from "@hudbird/ui";
import { Zap, Shield, Globe, Lock, Smartphone, Cloud, Droplets } from "lucide-react";

const logos = [
  { name: "React", src: "/assets/marketing-section/logo/react-dev-logo.png" },
  { name: "OpenAI", src: "/assets/marketing-section/logo/openai-com-brandmark.svg" },
  { name: "NPM", src: "/assets/marketing-section/logo/npmjs-com-logo.png" },
  { name: "Claude", src: "/assets/marketing-section/logo/ai-claude-net-logo.png" },
  { name: "Nike", src: "/assets/marketing-section/logo/nike-com-brandmark.svg" },
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

const SOCIALS = [
  { label: "Twitter", href: "#", icon: <Globe className="h-5 w-5" /> },
];

export const EcommerceTemplate = () => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="w-full min-h-screen bg-background flex flex-col">
      <Hero size="full">
        <HeroHeader
          logo={<Droplets className="text-primary h-8 w-8" />}
          links={[{ label: "Features", href: "#" }, { label: "Pricing", href: "#" }]}
          action={<Button size="sm" color="primary">Get Started</Button>}
        />
        <HeroBody align="center">
          <HeroBadge>Version 2.0 is out</HeroBadge>
          <HeroTitle>Build faster than ever before.</HeroTitle>
          <HeroDescription>Everything you need to build, launch, and scale your application. Without the complexity.</HeroDescription>
          <HeroActions className="justify-center">
            <Button color="primary">Start building</Button>
            <Button variant="outline">View documentation</Button>
          </HeroActions>
        </HeroBody>
      </Hero>
      
      <LogoCloud>
        <LogoCloudTitle>Trusted by the world's most innovative teams</LogoCloudTitle>
        <LogoCloudGrid>
          {logos.map((logo) => (
            <LogoCloudItem key={logo.name}>
              <img src={logo.src} alt={logo.name} className="h-9 w-auto object-contain dark:invert" />
            </LogoCloudItem>
          ))}
        </LogoCloudGrid>
      </LogoCloud>
      
      <FeatureSection>
        <FeatureHeader>
          <FeatureBadge>Deploy faster</FeatureBadge>
          <FeatureTitle>Everything you need to build your app</FeatureTitle>
          <FeatureDescription>Our platform provides all the tools you need to create, deploy, and scale your applications with ease and confidence.</FeatureDescription>
        </FeatureHeader>
        <FeatureGrid>
          <FeatureCard index={0}>
            <FeatureIcon><Zap size={20} /></FeatureIcon>
            <FeatureCardTitle>Lightning Fast</FeatureCardTitle>
            <FeatureCardDescription>Global edge network ensures your application loads instantly for users anywhere in the world.</FeatureCardDescription>
          </FeatureCard>
          <FeatureCard index={1}>
            <FeatureIcon><Shield size={20} /></FeatureIcon>
            <FeatureCardTitle>Enterprise Security</FeatureCardTitle>
            <FeatureCardDescription>Advanced DDoS protection and automatic SSL certificates keep your data safe and secure.</FeatureCardDescription>
          </FeatureCard>
          <FeatureCard index={2}>
            <FeatureIcon><Globe size={20} /></FeatureIcon>
            <FeatureCardTitle>Global CDN</FeatureCardTitle>
            <FeatureCardDescription>Deliver content faster with our strategically placed servers across 100+ global locations.</FeatureCardDescription>
          </FeatureCard>
          <FeatureCard index={3}>
            <FeatureIcon><Lock size={20} /></FeatureIcon>
            <FeatureCardTitle>Identity & Access</FeatureCardTitle>
            <FeatureCardDescription>Built-in authentication and role-based access control for your entire organization.</FeatureCardDescription>
          </FeatureCard>
          <FeatureCard index={4}>
            <FeatureIcon><Smartphone size={20} /></FeatureIcon>
            <FeatureCardTitle>Mobile Optimized</FeatureCardTitle>
            <FeatureCardDescription>Responsive APIs and SDKs designed specifically for mobile application performance.</FeatureCardDescription>
          </FeatureCard>
          <FeatureCard index={5}>
            <FeatureIcon><Cloud size={20} /></FeatureIcon>
            <FeatureCardTitle>Auto Scaling</FeatureCardTitle>
            <FeatureCardDescription>Never worry about traffic spikes again. Our infrastructure scales automatically with demand.</FeatureCardDescription>
          </FeatureCard>
        </FeatureGrid>
      </FeatureSection>

      <div className="relative w-full overflow-hidden bg-zinc-50 px-4 py-16 sm:px-8 dark:bg-zinc-950">
        <div className="mx-auto max-w-5xl space-y-12">
          <BentoGrid className="md:auto-rows-[24rem] md:grid-cols-3 xl:grid-cols-3">
            <BentoCard className="border-transparent md:col-span-2 dark:border-white/10">
              <BentoCardBackground src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200" />
              <BentoCardContent>
                <BentoCardFooter isBlurred className="flex-col items-start gap-1 p-6 text-zinc-900 dark:text-white">
                  <Text variant="strong" className="text-xl text-zinc-900 dark:text-white">Seamless Integration</Text>
                  <Text className="text-sm text-zinc-600 dark:text-zinc-300">Connect with your favorite tools effortlessly.</Text>
                </BentoCardFooter>
              </BentoCardContent>
            </BentoCard>
            <BentoCard className="border-transparent dark:border-white/10">
              <BentoCardBackground src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200" />
            </BentoCard>
          </BentoGrid>
        </div>
      </div>

      <PricingSection variant="subtle">
        <PricingHeader>
          <PricingBadge>Pricing</PricingBadge>
          <PricingTitle>Pricing that grows with you</PricingTitle>
          <PricingDescription>Choose an affordable plan that's packed with the best features for engaging your audience, creating customer loyalty, and driving sales.</PricingDescription>
          <PricingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
        </PricingHeader>
        <PricingGrid>
          <PricingTier index={0}>
            <PricingTierHeader>
              <PricingTierName>Freelancer</PricingTierName>
              <PricingTierDescription>The essentials to provide your best work for clients.</PricingTierDescription>
              <PricingTierPrice price={isAnnual ? "$190" : "$19"} period={isAnnual ? "/year" : "/month"} />
            </PricingTierHeader>
            <Button variant="outline" className="mt-2 w-full">Buy plan</Button>
            <PricingTierFeatures>
              <PricingTierFeature>5 products</PricingTierFeature>
              <PricingTierFeature>Up to 1,000 subscribers</PricingTierFeature>
              <PricingTierFeature>Basic analytics</PricingTierFeature>
              <PricingTierFeature>48-hour support response time</PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>
          <PricingTier index={1} popular>
            <PricingTierHeader>
              <PricingTierName popular>Startup</PricingTierName>
              <PricingTierDescription popular>A plan that scales with your rapidly growing business.</PricingTierDescription>
              <PricingTierPrice popular price={isAnnual ? "$490" : "$49"} period={isAnnual ? "/year" : "/month"} />
            </PricingTierHeader>
            <Button color="primary" className="mt-2 w-full">Buy plan</Button>
            <PricingTierFeatures popular>
              <PricingTierFeature popular>25 products</PricingTierFeature>
              <PricingTierFeature popular>Up to 10,000 subscribers</PricingTierFeature>
              <PricingTierFeature popular>Advanced analytics</PricingTierFeature>
              <PricingTierFeature popular>24-hour support response time</PricingTierFeature>
              <PricingTierFeature popular>Marketing automations</PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>
          <PricingTier index={2}>
            <PricingTierHeader>
              <PricingTierName>Enterprise</PricingTierName>
              <PricingTierDescription>Dedicated support and infrastructure for your company.</PricingTierDescription>
              <PricingTierPrice price={isAnnual ? "$990" : "$99"} period={isAnnual ? "/year" : "/month"} />
            </PricingTierHeader>
            <Button variant="outline" className="mt-2 w-full">Buy plan</Button>
            <PricingTierFeatures>
              <PricingTierFeature>Unlimited products</PricingTierFeature>
              <PricingTierFeature>Unlimited subscribers</PricingTierFeature>
              <PricingTierFeature>Advanced analytics</PricingTierFeature>
              <PricingTierFeature>1-hour, dedicated support response time</PricingTierFeature>
              <PricingTierFeature>Marketing automations</PricingTierFeature>
              <PricingTierFeature>Custom reporting tools</PricingTierFeature>
            </PricingTierFeatures>
          </PricingTier>
        </PricingGrid>
      </PricingSection>

      <Testimonials />

      <Faq />

      <CtaCentered
        badge={<span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-600 ring-1 ring-indigo-500/20 ring-inset dark:bg-indigo-500/10 dark:text-indigo-400 dark:ring-indigo-500/30">Version 2.0 is out</span>}
        title="Boost your productivity. Start using our app today."
        description="Incididunt sint fugiat pariatur cupidatat consectetur sit cillum anim id veniam aliqua proident excepteur commodo do ea."
        primaryAction={{ label: "Get started", onClick: () => {} }}
        secondaryAction={{ label: "Learn more", href: "#" }}
      />

      <FooterMega
        logo={<Droplets className="h-8 w-8 text-indigo-600 dark:text-indigo-500" />}
        brandName="Hudbird UI"
        description="Making the world a better place through constructing elegant hierarchies."
        linkGroups={MEGA_LINK_GROUPS}
        socials={SOCIALS}
        copyright="&copy; 2026 Hudbird UI, Inc. All rights reserved."
      />
    </div>
  );
};
`;

fs.writeFileSync("apps/docs/src/components/templates/EcommerceTemplate.tsx", fileContent);
fs.writeFileSync(
  "apps/docs/src/components/templates/AiStartupTemplate.tsx",
  fileContent.replace("EcommerceTemplate", "AiStartupTemplate")
);
fs.writeFileSync(
  "apps/docs/src/components/templates/FintechTemplate.tsx",
  fileContent.replace("EcommerceTemplate", "FintechTemplate")
);
