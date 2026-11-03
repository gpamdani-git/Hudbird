import React from "react";
import { AgentArtifactCanvas } from "@hudbird/marketing";
import { Section } from "@hudbird/ui";
import { DocHeader } from "../../components/DocHeader";
import { InstallationTabs } from "../../components/InstallationTabs";
import { MarketingPreview } from "../../components/MarketingPreview";
import { ApiTable, type ApiPropRow } from "../../components/ApiTable";
import agentCanvasCode from "../../../../../packages/marketing/src/components/SignatureBlocks/AgentArtifactCanvas.tsx?raw";
import skillContent from "../../../../../.agents/skills/marketing-signature-blocks/SKILL.md?raw";

const defaultUsageCode = `import { AgentArtifactCanvas } from "@hudbird/marketing";

export function TaskPreviewSection() {
  return (
    <AgentArtifactCanvas
      defaultScenario="edge-cluster"
      title="Task Steps and Output Preview"
    />
  );
}`;

const apiRows: ApiPropRow[] = [
  {
    prop: "defaultScenario",
    type: '"edge-cluster" | "revenue-model" | "zero-trust"',
    defaultVal: '"edge-cluster"',
    description: "Initial scenario loaded in the execution log and preview panes.",
  },
  {
    prop: "scenario",
    type: '"edge-cluster" | "revenue-model" | "zero-trust"',
    defaultVal: "undefined",
    description: "Controlled scenario ID.",
  },
  {
    prop: "onScenarioChange",
    type: "(scenario: AgentScenarioId) => void",
    defaultVal: "undefined",
    description: "Callback invoked when the user switches scenarios.",
  },
  {
    prop: "title",
    type: "string",
    defaultVal: '"Task Steps and Output Preview"',
    description: "Primary section heading.",
  },
  {
    prop: "description",
    type: "string",
    defaultVal: "string",
    description: "Supporting description below the heading.",
  },
];

export default function AgentArtifactCanvasDoc() {
  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      <DocHeader
        category="Signature Blocks"
        title="AI Agent Canvas"
        description="A split-pane view pairing collapsible execution steps with a live chart, configuration file, and summary notes. Click Re-run steps to preview the loading skeleton state."
      />

      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="agent-artifact-canvas" manualCode={agentCanvasCode} />
      </div>

      <Section id="examples" spacing="none" className="scroll-mt-24 space-y-12">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Interactive Block
          </h2>
        </div>

        <div id="edge-topology" className="scroll-mt-24">
          <MarketingPreview
            title="Worker Scaling, Pricing Model & TLS Rules"
            subtitle="Switch scenarios in the top bar, expand accordion steps, copy the TypeScript config, or re-run the steps."
            code={defaultUsageCode}
            skill={skillContent}
            minHeight={740}
          >
            <AgentArtifactCanvas defaultScenario="edge-cluster" />
          </MarketingPreview>
        </div>
      </Section>

      <Section id="component-api" spacing="none" className="scroll-mt-24 space-y-8">
        <div>
          <h2 className="font-outfit mb-4 text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Component API
          </h2>
          <ApiTable title="AgentArtifactCanvas Props" rows={apiRows} />
        </div>
      </Section>
    </div>
  );
}
