// apps/docs/src/pages/CommandDoc.tsx
import commandCode from "../../../../packages/core/src/components/Command/Command.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import React, { useState } from "react";
import { DocHeader } from "../components/DocHeader";
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
import { Calendar, User, CreditCard, Settings, Terminal, FileCode } from "lucide-react";
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
    <div className="space-y-24 pb-32 sm:space-y-32">
      {/* Header */}
      <DocHeader
        category="Components"
        title="Command"
        badge="Core"
        description="Fast, accessible command menu palette (Cmd+K) supporting real-time filtering, group categorization, and full keyboard navigation."
      />

      {/* Main Preview */}
      <section id="inline-palette" className="scroll-mt-24 space-y-6">
        <ComponentPreview>
          <div className="w-full max-w-lg">
            <Command className="rounded-2xl border border-zinc-200 shadow-sm dark:border-zinc-800">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem onSelect={() => setSelectedAction("Calendar")}>
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Calendar</span>
                  </CommandItem>
                  <CommandItem onSelect={() => setSelectedAction("Code Snippets")}>
                    <FileCode className="mr-2 h-4 w-4" />
                    <span>Code Snippets</span>
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
    <Command className="rounded-2xl border shadow-sm">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>Calendar</CommandItem>
          <CommandItem>Code Snippets</CommandItem>
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
      <section id="installation" className="scroll-mt-24 space-y-6">
        <InstallationTabs componentName="command" manualCode={commandCode} />
      </section>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-6">
        <h2 className="font-outfit text-3xl leading-[1.22] font-medium tracking-[-0.8px] text-zinc-900 sm:text-4xl dark:text-white">
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
      <section id="examples" className="scroll-mt-24 space-y-16">
        <h2 className="font-outfit text-3xl leading-[1.22] font-medium tracking-[-0.8px] text-zinc-900 sm:text-4xl dark:text-white">
          Examples
        </h2>

        {/* Modal Dialog */}
        <div id="modal-dialog" className="scroll-mt-24 space-y-6">
          <div className="space-y-2">
            <h3 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Modal command dialog
            </h3>
            <p className="text-[17px] leading-[1.75] tracking-[-0.16px] text-zinc-600 dark:text-[#E5E5E5]">
              Launch as an overlay dialog with background blur:
            </p>
          </div>

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
