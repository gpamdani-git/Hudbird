import React from "react";
import { InteractiveBentoShowcase } from "@hudbird/marketing";
import { Section } from "@hudbird/ui";
import { DocHeader } from "../../components/DocHeader";
import { InstallationTabs } from "../../components/InstallationTabs";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable, type ApiPropRow } from "../../components/ApiTable";
import interactiveBentoCode from "../../../../../packages/marketing/src/components/SignatureBlocks/InteractiveBentoShowcase.tsx?raw";
import skillContent from "../../../../../.agents/skills/marketing-signature-blocks/SKILL.md?raw";

const defaultUsageCode = `import { InteractiveBentoShowcase } from "@hudbird/marketing";

export function InteractiveGridSection() {
  return (
    <InteractiveBentoShowcase
      defaultTrafficMillions={120}
      title="Interactive Component Grid"
    />
  );
}`;

const apiRows: ApiPropRow[] = [
  {
    prop: "defaultTrafficMillions",
    type: "number",
    defaultVal: "120",
    description: "Initial monthly request volume (in millions) for the cost estimator.",
  },
  {
    prop: "title",
    type: "string",
    defaultVal: '"Interactive Component Grid"',
    description: "Primary section heading.",
  },
  {
    prop: "description",
    type: "string",
    defaultVal: "string",
    description: "Supporting description below the heading.",
  },
  {
    prop: "className",
    type: "string",
    defaultVal: "undefined",
    description: "Optional Tailwind classes merged onto the root Section wrapper.",
  },
];

export default function InteractiveBentoDoc() {
  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      <DocHeader
        category="Signature Blocks"
        title="Interactive Bento 2.0"
        description="A four-card asymmetric grid containing working @hudbird/ui controls: Command Palette, Cost Estimator Slider with BarChart, 6-Digit InputOTP Check, and Routing Switches with RadarChart."
      />

      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="interactive-bento" manualCode={interactiveBentoCode} />
      </div>

      <Section id="examples" spacing="none" className="scroll-mt-24 space-y-12">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Interactive Block
          </h2>
        </div>

        <div id="micro-app-bento" className="scroll-mt-24">
          <MarketingPreview
            title="Four Working Controls in One Asymmetric Grid"
            subtitle="Filter commands, drag the request slider, fill the 6-digit passkey, and toggle routing options."
            code={defaultUsageCode}
            skill={skillContent}
            minHeight={860}
          >
            <InteractiveBentoShowcase defaultTrafficMillions={120} />
          </MarketingPreview>
        </div>
      </Section>

      <Section id="component-api" spacing="none" className="scroll-mt-24 space-y-8">
        <div>
          <h2 className="font-outfit mb-4 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Component API
          </h2>
          <ApiTable title="InteractiveBentoShowcase Props" rows={apiRows} />
        </div>
      </Section>
    </div>
  );
}
