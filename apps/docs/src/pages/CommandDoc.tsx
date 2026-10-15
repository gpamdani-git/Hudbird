// apps/docs/src/pages/CommandDoc.tsx
import commandCode from "../../../../packages/core/src/components/Command/Command.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { PageToolbar } from "../components/PageToolbar";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  Button,
} from "@hudbird/ui";
import {
  Search,
  Calculator,
  Calendar,
  Smile,
  User,
  CreditCard,
  Settings,
  Terminal,
} from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const commandTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "inline-palette", title: "Inline command palette" },
      { id: "modal-dialog", title: "Modal command dialog" },
    ],
  },
];

export default function CommandDoc() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const apiRows: ApiPropRow[] = [
    {
      prop: "Command",
      defaultVal: "-",
      description: "Root container managing search query context and active item index.",
    },
    {
      prop: "CommandDialog",
      defaultVal: "-",
      description:
        "Modal dialog overlay variant wrapping Command with backdrop blur and escape dismiss.",
    },
    {
      prop: "CommandInput",
      defaultVal: "-",
      description: "Integrated search input field with auto-focus and clear search capabilities.",
    },
    {
      prop: "CommandList",
      defaultVal: "-",
      description: "Scrollable items list container rendering filtered results.",
    },
    {
      prop: "CommandGroup",
      defaultVal: "-",
      description: "Labeled category section grouping related items.",
    },
    {
      prop: "CommandItem",
      defaultVal: "-",
      description: "Interactive actionable item selectable via mouse or keyboard Arrow keys.",
    },
    {
      prop: "CommandShortcut",
      defaultVal: "-",
      description: "Right-aligned visual keyboard badge for shortcut keys.",
    },
  ];

  return (
    <div className="space-y-16 pb-24">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="w-full min-w-0 flex-1 pr-4">
          <div className="mb-3 flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
              Command
            </h1>
            <span className="rounded-full border border-indigo-500/20 bg-indigo-500/10 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              Component
            </span>
          </div>
          <p className="pr-8 text-base text-zinc-600 dark:text-zinc-400">
            Fast, accessible command menu palette (Cmd+K) supporting real-time filtering, group
            categorization, and full keyboard navigation.
          </p>
        </div>
        <PageToolbar />
      </div>

      {/* Main Preview */}
      <section className="space-y-4">
        <ComponentPreview>
          <div className="w-full max-w-lg">
            <Command className="rounded-xl border border-zinc-200 shadow-md dark:border-zinc-800">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem onSelect={() => setSelectedAction("Calendar")}>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Calendar</span>
                  </CommandItem>
                  <CommandItem onSelect={() => setSelectedAction("Search Emoji")}>
                    <Smile className="mr-2 h-4 w-4" />
                    <span>Search Emoji</span>
                  </CommandItem>
                  <CommandItem onSelect={() => setSelectedAction("Calculator")}>
                    <Calculator className="mr-2 h-4 w-4" />
                    <span>Calculator</span>
                  </CommandItem>
                </CommandGroup>
                <CommandGroup heading="Settings">
                  <CommandItem onSelect={() => setSelectedAction("Profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    <CommandShortcut>⌘P</CommandShortcut>
                  </CommandItem>
                  <CommandItem onSelect={() => setSelectedAction("Billing")}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                    <CommandShortcut>⌘B</CommandShortcut>
                  </CommandItem>
                  <CommandItem onSelect={() => setSelectedAction("Settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    <CommandShortcut>⌘S</CommandShortcut>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
            {selectedAction && (
              <p className="mt-3 text-center text-xs text-zinc-500 dark:text-zinc-400">
                Selected:{" "}
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {selectedAction}
                </span>
              </p>
            )}
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
} from "@hudbird/ui";

export function CommandMenu() {
  return (
    <Command className="rounded-xl border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Search Emoji</CommandItem>
          <CommandItem>Calculator</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Settings">
          <CommandItem>
            Profile
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}`}
        />
      </section>

      {/* Installation */}
      <div id="installation" className="scroll-mt-24 space-y-4">
        <InstallationTabs componentName="command" manualCode={commandCode} />
      </div>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Component API
        </h2>
        <ApiTable
          note={
            <span>
              <strong className="font-semibold text-zinc-900 dark:text-zinc-100">Command</strong>{" "}
              supports ArrowUp, ArrowDown, and Enter selection out of the box with zero external
              setup required.
            </span>
          }
          rows={apiRows}
        />
      </section>

      {/* Examples */}
      <section id="examples" className="scroll-mt-24 space-y-14">
        <div>
          <h2 className="mb-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Examples
          </h2>
        </div>

        {/* Modal Dialog */}
        <div id="modal-dialog" className="scroll-mt-24 space-y-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
            Modal command dialog
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Launch as an overlay dialog with background blur:
          </p>

          <ComponentPreview>
            <div className="flex items-center justify-center py-6">
              <Button onClick={() => setOpenModal(true)}>
                <Terminal className="h-4 w-4" />
                Open Command Dialog (⌘K)
              </Button>
            </div>
          </ComponentPreview>

          <CodeBlock
            code={`const [isOpen, setIsOpen] = useState(false);

// Listen to keyboard shortcut
useEffect(() => {
  const down = (e: KeyboardEvent) => {
    if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      setIsOpen((open) => !open);
    }
  };
  document.addEventListener("keydown", down);
  return () => document.removeEventListener("keydown", down);
}, []);

return (
  <CommandDialog isOpen={isOpen} onClose={() => setIsOpen(false)}>
    <CommandInput placeholder="Search actions..." />
    <CommandList>
      <CommandGroup heading="Quick Links">
        <CommandItem onSelect={() => setIsOpen(false)}>Home</CommandItem>
        <CommandItem onSelect={() => setIsOpen(false)}>Settings</CommandItem>
      </CommandGroup>
    </CommandList>
  </CommandDialog>
);`}
          />
        </div>
      </section>

      {/* Modal Dialog Instance */}
      <CommandDialog isOpen={openModal} onClose={() => setOpenModal(false)}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results matching query.</CommandEmpty>
          <CommandGroup heading="System">
            <CommandItem
              onSelect={() => {
                setSelectedAction("Open Terminal");
                setOpenModal(false);
              }}
            >
              <Terminal className="mr-2 h-4 w-4" />
              Open Terminal
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setSelectedAction("Workspace Settings");
                setOpenModal(false);
              }}
            >
              <Settings className="mr-2 h-4 w-4" />
              Workspace Settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </div>
  );
}
