import React, { Suspense } from "react";

import { Hero } from "@hudbird/marketing";
import { FeatureSection } from "@hudbird/marketing";
import { BentoGrid } from "@hudbird/marketing";
import { CtaSplit } from "@hudbird/marketing";
import { FooterMega } from "@hudbird/marketing";

export const LandingPage: React.FC = () => {
  return (
    <>
      <>
        <title>Hudbird | AI Startup Template</title>
        <meta
          name="description"
          content="Hudbird AI startup template – a modern, responsive landing page with dark/light mode, smooth animations, and production‑ready performance."
        />
        <link rel="canonical" href="https://hudbird.ai" />
        {/* Open Graph / Facebook */}
        <meta property="og:title" content="Hudbird | AI Startup Template" />
        <meta
          property="og:description"
          content="A modern, responsive landing page with dark/light mode, smooth animations, and production‑ready performance."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://hudbird.ai" />
        <meta property="og:image" content="/og-image.png" />
        <meta property="og:site_name" content="Hudbird" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Hudbird | AI Startup Template" />
        <meta
          name="twitter:description"
          content="A modern, responsive landing page with dark/light mode, smooth animations, and production‑ready performance."
        />
        <meta name="twitter:image" content="/twitter-image.png" />
      </>

      <Suspense fallback={null}>
        <div className="bg-background text-foreground min-h-screen">
          <Hero />

          <FeatureSection />

          <BentoGrid />

          <CtaSplit title="Start your AI startup" />

          <FooterMega />
        </div>
      </Suspense>
    </>
  );
};
