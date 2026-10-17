import React, { useState } from "react";
import { digitalAgencyNiche } from "@hudbird/schemas";
import { NexusInnerPageRenderer, LivePreviewToolbar } from "../components/nexus-sections";

export function Terms() {
  const [accentColor, setAccentColor] = useState(digitalAgencyNiche.theme.brandPrimary);

  return (
    <div
      data-niche={digitalAgencyNiche.slug}
      style={{ "--brand-primary": accentColor } as React.CSSProperties}
      className="relative min-h-screen bg-[#F4F5F8] text-[#0D0F14] dark:bg-[#0B0C10] dark:text-[#F9FAFB]"
    >
      <NexusInnerPageRenderer
        niche={digitalAgencyNiche}
        pageSlug="terms"
        customBrandPrimary={accentColor}
      />
      <LivePreviewToolbar currentAccentColor={accentColor} onAccentColorChange={setAccentColor} />
    </div>
  );
}
