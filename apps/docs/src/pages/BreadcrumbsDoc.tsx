// apps/docs/src/pages/BreadcrumbsDoc.tsx
import breadcrumbsCode from "../../../../packages/core/src/components/Breadcrumbs/Breadcrumbs.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
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
    <div className="space-y-16 pb-24">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-foreground text-3xl font-semibold tracking-tight sm:text-4xl">
              Breadcrumbs
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/20 bg-blue-500/10 px-2.5 py-0.5 text-xs font-medium text-blue-500">
              <Sparkles className="h-3 w-3" />
              New in v1.5
            </span>
          </div>
          <p className="text-muted-foreground text-base">
            Hierarchical breadcrumb navigation indicating the current page location within an
            application hierarchy.
          </p>
        </div>
        <div className="flex w-full shrink-0 justify-end sm:w-auto">
          <PageToolbar />
        </div>
      </div>

      {/* Installation */}
      <section id="installation" className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Installation</h2>
        <InstallationTabs
          componentName="Breadcrumbs"
          code={breadcrumbsCode}
          fileName="Breadcrumbs.tsx"
        />
      </section>

      {/* Basic Breadcrumbs */}
      <section id="basic-breadcrumbs" className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Basic Breadcrumbs</h2>
        <ComponentPreview>
          <div className="p-4">
            <Breadcrumbs>
              <BreadcrumbItem href="#home">Home</BreadcrumbItem>
              <BreadcrumbItem href="#dashboard">Dashboard</BreadcrumbItem>
              <BreadcrumbItem href="#settings">Settings</BreadcrumbItem>
              <BreadcrumbItem isCurrent>Security</BreadcrumbItem>
            </Breadcrumbs>
          </div>
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

      {/* Custom Separator */}
      <section id="custom-separators" className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Custom Separators</h2>
        <ComponentPreview>
          <div className="space-y-6 p-4">
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
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Size Variations</h2>
        <ComponentPreview>
          <div className="space-y-4 p-4">
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
        <h2 className="text-foreground text-xl font-semibold tracking-tight">
          Collapsed Items (maxItems)
        </h2>
        <ComponentPreview>
          <div className="p-4">
            <Breadcrumbs maxItems={3} itemsBeforeCollapse={1} itemsAfterCollapse={1}>
              <BreadcrumbItem href="#">Workspace</BreadcrumbItem>
              <BreadcrumbItem href="#">Projects</BreadcrumbItem>
              <BreadcrumbItem href="#">Design System</BreadcrumbItem>
              <BreadcrumbItem href="#">Components</BreadcrumbItem>
              <BreadcrumbItem isCurrent>Breadcrumbs</BreadcrumbItem>
            </Breadcrumbs>
          </div>
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
        <h2 className="text-foreground text-xl font-semibold tracking-tight">With Icons</h2>
        <ComponentPreview>
          <div className="p-4">
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
          </div>
        </ComponentPreview>
      </section>

      {/* Component API */}
      <section id="component-api" className="space-y-4">
        <h2 className="text-foreground text-xl font-semibold tracking-tight">Component API</h2>
        <ApiTable rows={apiRows} />
      </section>
    </div>
  );
}
