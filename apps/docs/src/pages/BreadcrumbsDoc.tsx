// apps/docs/src/pages/BreadcrumbsDoc.tsx
import breadcrumbsCode from "../../../../packages/core/src/components/Breadcrumbs/Breadcrumbs.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { DocHeader } from "../components/DocHeader";
import { Breadcrumbs, BreadcrumbItem } from "@hudbird/ui";
import { Sparkles, Home, Folder, FileText, Slash, ArrowRight } from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const breadcrumbsTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-breadcrumbs", title: "Basic Breadcrumbs" },
      { id: "breadcrumbs-variants", title: "Variants (Light, Bordered, Solid)" },
      { id: "custom-separators", title: "Custom Separators" },
      { id: "size-variations", title: "Size Variations" },
      { id: "collapsed-items", title: "Collapsed Items (maxItems)" },
      { id: "with-icons", title: "With Icons" },
    ],
  },
];

export default function BreadcrumbsDoc() {
  const [currentPage, setCurrentPage] = useState("analytics");

  const apiRows: ApiPropRow[] = [
    {
      prop: "size",
      defaultVal: '"md"',
      description: '"sm" | "md" | "lg" for text font size and padding.',
    },
    {
      prop: "underline",
      defaultVal: '"hover"',
      description: '"none" | "hover" | "always" | "active" decoration.',
    },
    {
      prop: "separator",
      defaultVal: "<ChevronRight />",
      description: "Custom React node rendered between breadcrumb items.",
    },
    {
      prop: "maxItems",
      defaultVal: "-",
      description: "Maximum items before collapsing intermediate links into an ellipsis.",
    },
    {
      prop: "itemsBeforeCollapse / itemsAfterCollapse",
      defaultVal: "1 / 1",
      description: "Number of links displayed before and after collapsed ellipsis.",
    },
    {
      prop: "isDisabled",
      defaultVal: "false",
      description: "Disables navigation and applies muted opacity.",
    },
  ];

  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      {/* Header */}
      <DocHeader
        category="Components"
        title="Breadcrumbs"
        badge="Core"
        description="Hierarchical breadcrumb navigation indicating the current page location within an application hierarchy."
      />

      {/* Installation */}
      <section id="installation" className="scroll-mt-24 space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Installation
        </h2>
        <InstallationTabs componentName="breadcrumbs" manualCode={breadcrumbsCode} />
      </section>

      {/* Basic Breadcrumbs */}
      <section id="basic-breadcrumbs" className="space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Basic Breadcrumbs
        </h2>
        <ComponentPreview>
          <Breadcrumbs>
            <BreadcrumbItem href="#home">Home</BreadcrumbItem>
            <BreadcrumbItem href="#dashboard">Dashboard</BreadcrumbItem>
            <BreadcrumbItem href="#settings">Settings</BreadcrumbItem>
            <BreadcrumbItem isCurrent>Security</BreadcrumbItem>
          </Breadcrumbs>
        </ComponentPreview>
        <CodeBlock
          language="tsx"
          code={`<Breadcrumbs>
  <BreadcrumbItem href="#home">Home</BreadcrumbItem>
  <BreadcrumbItem href="#dashboard">Dashboard</BreadcrumbItem>
  <BreadcrumbItem href="#settings">Settings</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Security</BreadcrumbItem>
</Breadcrumbs>`}
        />
      </section>

      {/* Variants */}
      <section id="breadcrumbs-variants" className="space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Variants (Light, Bordered, Solid)
        </h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Choose between minimal light paths, frosted glass bordered capsules, or solid surfaces:
        </p>
        <ComponentPreview>
          <div className="space-y-6">
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                Light (Default)
              </p>
              <Breadcrumbs variant="light">
                <BreadcrumbItem href="#">Home</BreadcrumbItem>
                <BreadcrumbItem href="#">Projects</BreadcrumbItem>
                <BreadcrumbItem isCurrent>Dashboard</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                Bordered (Frosted Capsule)
              </p>
              <Breadcrumbs variant="bordered">
                <BreadcrumbItem href="#">Home</BreadcrumbItem>
                <BreadcrumbItem href="#">Workspace</BreadcrumbItem>
                <BreadcrumbItem isCurrent>Settings</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            <div>
              <p className="mb-2 text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                Solid
              </p>
              <Breadcrumbs variant="solid">
                <BreadcrumbItem href="#">Home</BreadcrumbItem>
                <BreadcrumbItem href="#">Billing</BreadcrumbItem>
                <BreadcrumbItem isCurrent>Invoices</BreadcrumbItem>
              </Breadcrumbs>
            </div>
          </div>
        </ComponentPreview>
        <CodeBlock
          language="tsx"
          code={`{/* 1. Light (Default) */}
<Breadcrumbs variant="light">
  <BreadcrumbItem href="#">Home</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Dashboard</BreadcrumbItem>
</Breadcrumbs>

{/* 2. Bordered (Frosted Capsule) */}
<Breadcrumbs variant="bordered">
  <BreadcrumbItem href="#">Home</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Settings</BreadcrumbItem>
</Breadcrumbs>

{/* 3. Solid */}
<Breadcrumbs variant="solid">
  <BreadcrumbItem href="#">Home</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Invoices</BreadcrumbItem>
</Breadcrumbs>`}
        />
      </section>

      {/* Custom Separator */}
      <section id="custom-separators" className="space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Custom Separators
        </h2>
        <ComponentPreview>
          <div className="space-y-6">
            <div>
              <p className="text-muted-foreground mb-2 text-xs">Slash Separator</p>
              <Breadcrumbs separator={<Slash className="h-3.5 w-3.5 rotate-[-20deg]" />}>
                <BreadcrumbItem href="#">Organization</BreadcrumbItem>
                <BreadcrumbItem href="#">Engineering</BreadcrumbItem>
                <BreadcrumbItem isCurrent>Deployments</BreadcrumbItem>
              </Breadcrumbs>
            </div>
            <div>
              <p className="text-muted-foreground mb-2 text-xs">Arrow Separator</p>
              <Breadcrumbs separator={<ArrowRight className="h-3.5 w-3.5" />}>
                <BreadcrumbItem href="#">Shop</BreadcrumbItem>
                <BreadcrumbItem href="#">Electronics</BreadcrumbItem>
                <BreadcrumbItem isCurrent>Keyboards</BreadcrumbItem>
              </Breadcrumbs>
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Size Variations */}
      <section id="size-variations" className="space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Size Variations
        </h2>
        <ComponentPreview>
          <div className="space-y-4">
            <Breadcrumbs size="sm">
              <BreadcrumbItem href="#">Small</BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb</BreadcrumbItem>
              <BreadcrumbItem isCurrent>Item</BreadcrumbItem>
            </Breadcrumbs>
            <Breadcrumbs size="md">
              <BreadcrumbItem href="#">Medium</BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb</BreadcrumbItem>
              <BreadcrumbItem isCurrent>Item</BreadcrumbItem>
            </Breadcrumbs>
            <Breadcrumbs size="lg">
              <BreadcrumbItem href="#">Large</BreadcrumbItem>
              <BreadcrumbItem href="#">Breadcrumb</BreadcrumbItem>
              <BreadcrumbItem isCurrent>Item</BreadcrumbItem>
            </Breadcrumbs>
          </div>
        </ComponentPreview>
      </section>

      {/* Collapsed Items */}
      <section id="collapsed-items" className="space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Collapsed Items (maxItems)
        </h2>
        <ComponentPreview>
          <Breadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1}>
            <BreadcrumbItem href="#">Workspace</BreadcrumbItem>
            <BreadcrumbItem href="#">Projects</BreadcrumbItem>
            <BreadcrumbItem href="#">Design System</BreadcrumbItem>
            <BreadcrumbItem href="#">Components</BreadcrumbItem>
            <BreadcrumbItem isCurrent>Breadcrumbs</BreadcrumbItem>
          </Breadcrumbs>
        </ComponentPreview>
        <CodeBlock
          language="tsx"
          code={`<Breadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1}>
  <BreadcrumbItem href="#">Workspace</BreadcrumbItem>
  <BreadcrumbItem href="#">Projects</BreadcrumbItem>
  <BreadcrumbItem href="#">Design System</BreadcrumbItem>
  <BreadcrumbItem href="#">Components</BreadcrumbItem>
  <BreadcrumbItem isCurrent>Breadcrumbs</BreadcrumbItem>
</Breadcrumbs>`}
        />
      </section>

      {/* With Icons */}
      <section id="with-icons" className="space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          With Icons
        </h2>
        <ComponentPreview>
          <Breadcrumbs>
            <BreadcrumbItem href="#" startContent={<Home className="h-4 w-4" />}>
              Home
            </BreadcrumbItem>
            <BreadcrumbItem href="#" startContent={<Folder className="h-4 w-4" />}>
              Documents
            </BreadcrumbItem>
            <BreadcrumbItem isCurrent startContent={<FileText className="h-4 w-4" />}>
              Specifications.pdf
            </BreadcrumbItem>
          </Breadcrumbs>
        </ComponentPreview>
      </section>

      {/* Component API */}
      <section id="component-api" className="space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Component API
        </h2>
        <ApiTable rows={apiRows} />
      </section>
    </div>
  );
}
