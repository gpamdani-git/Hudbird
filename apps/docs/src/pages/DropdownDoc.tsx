// apps/docs/src/pages/DropdownDoc.tsx
import dropdownCode from "../../../../packages/core/src/components/Dropdown/Dropdown.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { DocHeader } from "../components/DocHeader";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
  type DropdownPlacement,
} from "@hudbird/ui";
import {
  ChevronDown,
  Edit,
  Copy,
  Share2,
  Trash2,
  FilePlus,
  FolderPlus,
  Settings,
  User,
  LogOut,
  ExternalLink,
  Shield,
  Layers,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Focus,
} from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const dropdownTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "basic-dropdown", title: "Basic Dropdown Menu" },
      {
        id: "position-placements",
        title: "Interactive Positions (Center, Left, Right, Top, Bottom)",
      },
      { id: "with-icons", title: "Dropdown with Icons (startContent)" },
      { id: "sections-and-danger", title: "Advanced Menu (Sections & Danger Variant)" },
    ],
  },
];

export default function DropdownDoc() {
  const [lastAction, setLastAction] = useState<string | null>(null);
  const [selectedPlacement, setSelectedPlacement] = useState<DropdownPlacement>("bottom-start");

  const placements: { id: DropdownPlacement; label: string; icon: React.ReactNode }[] = [
    { id: "bottom-start", label: "Bottom Start", icon: <ArrowDown className="h-3 w-3" /> },
    { id: "bottom", label: "Bottom Center", icon: <ArrowDown className="h-3 w-3" /> },
    { id: "bottom-end", label: "Bottom End", icon: <ArrowDown className="h-3 w-3" /> },
    { id: "top-start", label: "Top Start", icon: <ArrowUp className="h-3 w-3" /> },
    { id: "top", label: "Top Center", icon: <ArrowUp className="h-3 w-3" /> },
    { id: "top-end", label: "Top End", icon: <ArrowUp className="h-3 w-3" /> },
    { id: "left", label: "Left", icon: <ArrowLeft className="h-3 w-3" /> },
    { id: "right", label: "Right", icon: <ArrowRight className="h-3 w-3" /> },
    { id: "center", label: "Center (Modal)", icon: <Focus className="h-3 w-3" /> },
  ];

  const apiRows: ApiPropRow[] = [
    {
      prop: "placement",
      defaultVal: "'bottom-start'",
      description: (
        <span>
          Anchored popover position:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'bottom-start'
          </code>{" "}
          (default snug under trigger),{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'bottom'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'bottom-end'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'top-start'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'top'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'top-end'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'left'
          </code>
          ,{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'right'
          </code>
          , and{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'center'
          </code>
          .
        </span>
      ),
    },
    {
      prop: "isOpen",
      defaultVal: "undefined",
      description: "Controlled boolean for managing dropdown menu open state.",
    },
    {
      prop: "defaultOpen",
      defaultVal: "false",
      description: "Initial open state for uncontrolled usage.",
    },
    {
      prop: "onOpenChange",
      defaultVal: "undefined",
      description: "Callback triggered when the open state changes.",
    },
    {
      prop: "variant",
      defaultVal: "'default'",
      description: (
        <span>
          Visual intent on <code className="font-mono text-[11px]">&lt;DropdownItem&gt;</code>:{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'default'
          </code>{" "}
          or{" "}
          <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
            'danger'
          </code>{" "}
          (rose accent for destructive commands).
        </span>
      ),
    },
    {
      prop: "startContent",
      defaultVal: "undefined",
      description: "Icon or prefix badge element rendered on the leading edge of a DropdownItem.",
    },
    {
      prop: "endContent",
      defaultVal: "undefined",
      description: "Trailing keyboard shortcut (e.g. ⌘K) or meta badge rendered on the right.",
    },
    {
      prop: "children",
      defaultVal: "-",
      description:
        "Declarative subcomponents: <DropdownTrigger>, <DropdownMenu>, <DropdownItem>, and <DropdownSection>.",
    },
  ];

  return (
    <div className="space-y-24 pb-32 sm:space-y-32">
      {/* Title & Introduction */}
      <DocHeader
        category="Components"
        title="Dropdown"
        badge="Core"
        description="Versatile popover menus for triggering contextual actions with customizable placement positions (Center, Top, Bottom, Left, Right), high elevation, and automatic dismiss."
      />

      {/* Hero Preview & Code */}
      <section className="scroll-mt-24 space-y-6">
        <ComponentPreview>
          <div className="flex flex-col items-center justify-start py-6">
            <Dropdown>
              <DropdownTrigger>
                <Button color="indigo" className="gap-2">
                  <span>Workspace Actions</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownTrigger>

              <DropdownMenu>
                <DropdownItem
                  startContent={<Edit className="h-4 w-4" />}
                  endContent="⌘E"
                  onClick={() => setLastAction("Edit Page")}
                >
                  Edit Page
                </DropdownItem>
                <DropdownItem
                  startContent={<Copy className="h-4 w-4" />}
                  endContent="⌘C"
                  onClick={() => setLastAction("Duplicate")}
                >
                  Duplicate
                </DropdownItem>
                <DropdownItem
                  startContent={<Share2 className="h-4 w-4" />}
                  onClick={() => setLastAction("Share Link")}
                >
                  Share Link
                </DropdownItem>
                <DropdownItem
                  variant="danger"
                  startContent={<Trash2 className="h-4 w-4" />}
                  endContent="⌫"
                  onClick={() => setLastAction("Delete")}
                >
                  Delete Project
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {lastAction && (
              <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400">
                Triggered action:{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">{lastAction}</span>
              </p>
            )}
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@hudbird/ui";
import { Button } from "@hudbird/ui";
import { Edit, Copy, Share2, Trash2, ChevronDown } from 'lucide-react';

function Example() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button color="indigo" className="gap-2">
          <span>Workspace Actions</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem startContent={<Edit className="w-4 h-4" />} endContent="⌘E">
          Edit Page
        </DropdownItem>
        <DropdownItem startContent={<Copy className="w-4 h-4" />} endContent="⌘C">
          Duplicate
        </DropdownItem>
        <DropdownItem startContent={<Share2 className="w-4 h-4" />}>
          Share Link
        </DropdownItem>
        <DropdownItem variant="danger" startContent={<Trash2 className="w-4 h-4" />} endContent="⌫">
          Delete Project
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}`}
        />
      </section>

      {/* Installation */}
      <section id="installation" className="scroll-mt-24 space-y-6">
        <InstallationTabs componentName="dropdown" manualCode={dropdownCode} />
      </section>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl leading-[1.22] font-medium tracking-[-0.8px] text-zinc-900 sm:text-4xl dark:text-white">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              Supports all cardinal & centered placements:{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
                center
              </code>
              ,{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
                top
              </code>
              ,{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
                bottom
              </code>
              ,{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
                left
              </code>
              , and{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-[11px] dark:bg-zinc-800">
                right
              </code>
              .
            </span>
          }
          rows={apiRows}
        />
      </section>

      {/* Examples Header */}
      <section id="examples" className="scroll-mt-24 space-y-16">
        <h2 className="font-outfit text-3xl leading-[1.22] font-medium tracking-[-0.8px] text-zinc-900 sm:text-4xl dark:text-white">
          Examples
        </h2>

        {/* 1. Basic Dropdown Menu */}
        <div id="basic-dropdown" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h3 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Basic Dropdown Menu
            </h3>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
              A simple action menu triggered from a standard outline button (placed snuggly directly
              underneath):
            </p>
          </div>

          <ComponentPreview>
            <div className="flex justify-center py-4">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="outline" className="gap-2">
                    <span>Options</span>
                    <ChevronDown className="h-4 w-4 text-zinc-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem onClick={() => alert("Edit selected")}>Edit Details</DropdownItem>
                  <DropdownItem onClick={() => alert("Clone selected")}>
                    Clone Configuration
                  </DropdownItem>
                  <DropdownItem onClick={() => alert("Export selected")}>
                    Export as JSON
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@hudbird/ui";
import { Button } from "@hudbird/ui";

function Example() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="outline">Options</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem>Edit Details</DropdownItem>
        <DropdownItem>Clone Configuration</DropdownItem>
        <DropdownItem>Export as JSON</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}`}
          />
        </div>

        {/* 2. Interactive Position Placements */}
        <div id="position-placements" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h3 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Interactive Positions (Center, Left, Right, Top, Bottom)
            </h3>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
              Select a position to test how the dropdown popover aligns relative to its trigger:
            </p>
          </div>

          {/* Position Selector Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {placements.map((pos) => (
              <button
                key={pos.id}
                type="button"
                onClick={() => setSelectedPlacement(pos.id)}
                className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all duration-150 active:scale-95 ${
                  selectedPlacement === pos.id
                    ? "border-indigo-600 bg-indigo-600 text-white shadow-xs"
                    : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800"
                }`}
              >
                {pos.icon}
                <span>{pos.label}</span>
              </button>
            ))}
          </div>

          <ComponentPreview>
            <div className="flex w-full items-center justify-center py-20">
              <Dropdown placement={selectedPlacement}>
                <DropdownTrigger>
                  <Button color="indigo" variant="outline" className="gap-2">
                    <span className="capitalize">Position: {selectedPlacement}</span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownTrigger>

                <DropdownMenu className="min-w-[220px]">
                  <DropdownSection title={`Placement: ${selectedPlacement}`}>
                    <DropdownItem startContent={<Edit className="h-4 w-4" />} endContent="⌘E">
                      Quick Edit
                    </DropdownItem>
                    <DropdownItem startContent={<Copy className="h-4 w-4" />} endContent="⌘D">
                      Duplicate Item
                    </DropdownItem>
                    <DropdownItem startContent={<Share2 className="h-4 w-4" />}>
                      Export Data
                    </DropdownItem>
                  </DropdownSection>
                  <DropdownSection showDivider>
                    <DropdownItem variant="danger" startContent={<Trash2 className="h-4 w-4" />}>
                      Remove Item
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@hudbird/ui";
import { Button } from "@hudbird/ui";

{/* Configured for: "${selectedPlacement}" */}
<Dropdown placement="${selectedPlacement}">
  <DropdownTrigger>
    <Button variant="outline">Position: ${selectedPlacement}</Button>
  </DropdownTrigger>
  <DropdownMenu>
    <DropdownItem>Quick Edit</DropdownItem>
    <DropdownItem>Duplicate Item</DropdownItem>
    <DropdownItem>Export Data</DropdownItem>
  </DropdownMenu>
</Dropdown>`}
          />
        </div>

        {/* 3. Dropdown with Icons (startContent) */}
        <div id="with-icons" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h3 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Dropdown with Icons (startContent)
            </h3>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
              Improve visual recognition by passing icon elements into{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                startContent
              </code>{" "}
              and keyboard shortcuts to{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                endContent
              </code>
              :
            </p>
          </div>

          <ComponentPreview>
            <div className="flex justify-center py-4">
              <Dropdown>
                <DropdownTrigger>
                  <Button variant="outline" className="gap-2">
                    <Layers className="h-4 w-4 text-indigo-500" />
                    <span>Create New...</span>
                    <ChevronDown className="h-4 w-4 text-zinc-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    startContent={<FilePlus className="h-4 w-4 text-zinc-400" />}
                    endContent="⌘N"
                  >
                    New Document
                  </DropdownItem>
                  <DropdownItem
                    startContent={<FolderPlus className="h-4 w-4 text-zinc-400" />}
                    endContent="⇧⌘N"
                  >
                    New Folder
                  </DropdownItem>
                  <DropdownItem startContent={<ExternalLink className="h-4 w-4 text-zinc-400" />}>
                    Import External Project
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@hudbird/ui";
import { Button } from "@hudbird/ui";
import { FilePlus, FolderPlus, ExternalLink } from 'lucide-react';

function Example() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="outline">Create New...</Button>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownItem startContent={<FilePlus className="w-4 h-4" />} endContent="⌘N">
          New Document
        </DropdownItem>
        <DropdownItem startContent={<FolderPlus className="w-4 h-4" />} endContent="⇧⌘N">
          New Folder
        </DropdownItem>
        <DropdownItem startContent={<ExternalLink className="w-4 h-4" />}>
          Import External Project
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}`}
          />
        </div>

        {/* 4. Advanced Menu (Sections & Danger Variant) */}
        <div id="sections-and-danger" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h3 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Advanced Menu (Sections & Danger Variant)
            </h3>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
              Organize complex menus into categorized sections with headers and distinctive
              destructive actions using{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
                variant="danger"
              </code>
              :
            </p>
          </div>

          <ComponentPreview>
            <div className="flex justify-center py-6">
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <Button variant="outline" className="gap-2.5">
                    <User className="h-4 w-4 text-zinc-500" />
                    <span>My Account</span>
                    <ChevronDown className="h-4 w-4 text-zinc-400" />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu className="min-w-[240px]">
                  <DropdownSection title="Signed in as">
                    <div className="truncate px-3 py-1 text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      alex.morgan@company.io
                    </div>
                  </DropdownSection>

                  <DropdownSection title="Account Settings" showDivider>
                    <DropdownItem startContent={<User className="h-4 w-4" />}>
                      Profile Overview
                    </DropdownItem>
                    <DropdownItem startContent={<Settings className="h-4 w-4" />}>
                      Preferences
                    </DropdownItem>
                    <DropdownItem startContent={<Shield className="h-4 w-4" />}>
                      Security & 2FA
                    </DropdownItem>
                  </DropdownSection>

                  <DropdownSection showDivider>
                    <DropdownItem
                      variant="danger"
                      startContent={<LogOut className="h-4 w-4" />}
                      endContent="⌥Q"
                    >
                      Sign Out
                    </DropdownItem>
                  </DropdownSection>
                </DropdownMenu>
              </Dropdown>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@hudbird/ui";
import { Button } from "@hudbird/ui";
import { User, Settings, Shield, LogOut } from 'lucide-react';

function Example() {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Button variant="outline">My Account</Button>
      </DropdownTrigger>
      <DropdownMenu className="min-w-[240px]">
        <DropdownSection title="Signed in as">
          <div className="px-3 py-1 text-xs font-semibold">alex.morgan@company.io</div>
        </DropdownSection>

        <DropdownSection title="Account Settings" showDivider>
          <DropdownItem startContent={<User className="w-4 h-4" />}>
            Profile Overview
          </DropdownItem>
          <DropdownItem startContent={<Settings className="w-4 h-4" />}>
            Preferences
          </DropdownItem>
          <DropdownItem startContent={<Shield className="w-4 h-4" />}>
            Security & 2FA
          </DropdownItem>
        </DropdownSection>

        <DropdownSection showDivider>
          <DropdownItem variant="danger" startContent={<LogOut className="w-4 h-4" />} endContent="⌥Q">
            Sign Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}`}
          />
        </div>
      </section>
    </div>
  );
}
