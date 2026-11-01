// apps/docs/src/pages/TableDoc.tsx
import React, { useState, useMemo } from "react";
import { DocHeader } from "../components/DocHeader";
import tableCode from "../../../../packages/core/src/components/Table/Table.tsx?raw";
import { InstallationTabs } from "../components/InstallationTabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  type TableVariant,
  type TableDensity,
  Button,
  Badge,
  Input,
  Checkbox,
  Pagination,
} from "@hudbird/ui";
import {
  Search,
  MoreVertical,
  ArrowUpDown,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { ComponentPreview } from "../components/ComponentPreview";
import { CodeBlock } from "../components/CodeBlock";
import { ApiTable, type ApiPropRow } from "../components/ApiTable";

export const tableTocItems = [
  { id: "installation", title: "Installation" },
  { id: "component-api", title: "Component API" },
  {
    id: "examples",
    title: "Examples",
    children: [
      { id: "interactive-customizer", title: "Interactive Table Playground" },
      { id: "advanced-data-grid", title: "Advanced Data Grid (Search, Filter, Pagination)" },
      { id: "row-selection", title: "Table with Row Selection" },
      { id: "caption-accessibility", title: "Understanding TableCaption & Accessibility" },
    ],
  },
];

interface Invoice {
  id: string;
  client: string;
  email: string;
  status: "Paid" | "Pending" | "Overdue";
  amount: string;
  date: string;
}

const INVOICE_DATA: Invoice[] = [
  {
    id: "INV-1091",
    client: "Acme Corp",
    email: "billing@acme.com",
    status: "Paid",
    amount: "$3,450.00",
    date: "Oct 24, 2026",
  },
  {
    id: "INV-1092",
    client: "Starlight Labs",
    email: "finance@starlight.io",
    status: "Pending",
    amount: "$1,200.00",
    date: "Oct 25, 2026",
  },
  {
    id: "INV-1093",
    client: "Nexus Dynamics",
    email: "accounts@nexus.dev",
    status: "Paid",
    amount: "$8,920.00",
    date: "Oct 26, 2026",
  },
  {
    id: "INV-1094",
    client: "Vanguard Retail",
    email: "ap@vanguard.co",
    status: "Overdue",
    amount: "$750.00",
    date: "Oct 27, 2026",
  },
  {
    id: "INV-1095",
    client: "Solaris AI",
    email: "ops@solaris.ai",
    status: "Paid",
    amount: "$4,100.00",
    date: "Oct 28, 2026",
  },
  {
    id: "INV-1096",
    client: "Horizon Cloud",
    email: "finance@horizon.net",
    status: "Pending",
    amount: "$2,640.00",
    date: "Oct 29, 2026",
  },
];

export default function TableDoc() {
  // Playground state
  const [variant, setVariant] = useState<TableVariant>("default");
  const [density, setDensity] = useState<TableDensity>("normal");
  const [isHoverable, setIsHoverable] = useState(true);

  // Advanced data grid state
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Selection state
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const filteredInvoices = useMemo(() => {
    return INVOICE_DATA.filter((inv) => {
      const matchesSearch =
        inv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        inv.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "All" || inv.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, statusFilter]);

  const paginatedInvoices = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredInvoices.slice(start, start + itemsPerPage);
  }, [filteredInvoices, currentPage]);

  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage) || 1;

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(INVOICE_DATA.map((i) => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const apiRows: ApiPropRow[] = [
    {
      prop: "variant",
      type: '"default" | "bordered" | "borderless" | "striped"',
      defaultVal: '"default"',
      description: "Chassis border treatment and alternating row background appearance.",
    },
    {
      prop: "density",
      type: '"compact" | "normal" | "relaxed"',
      defaultVal: '"normal"',
      description: "Controls cell padding scale (compact: 8px, normal: 14px, relaxed: 18px).",
    },
    {
      prop: "isHoverable",
      type: "boolean",
      defaultVal: "true",
      description: "Enables interactive row highlight feedback on cursor hover.",
    },
    {
      prop: "wrapperClassName",
      type: "string",
      defaultVal: "undefined",
      description: "Additional CSS classes applied to the outer scroll/border container.",
    },
    {
      prop: "side (TableCaption)",
      type: '"top" | "bottom"',
      defaultVal: '"bottom"',
      description: "Positions accessible screen-reader caption at the top or bottom of the table.",
    },
  ];

  return (
    <div className="space-y-24 pb-24 sm:space-y-32">
      {/* Title & Introduction */}
      <DocHeader
        category="Components"
        title="Table"
        badge="Core"
        description="Precision data display grid engineered with frosted glass chassis containers, Gestalt baseline alignment, multiple density scales, and accessible row selection."
      />

      {/* Interactive Playground */}
      <section id="interactive-customizer" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Interactive Table Playground
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            Switch between structural border treatments, density spacing, and tactile row hover
            interactions.
          </p>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-3 sm:p-4 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
              Variant:
            </span>
            {(["default", "striped", "borderless"] as const).map((v) => (
              <Button
                key={v}
                size="sm"
                variant={variant === v ? "solid" : "flat"}
                color={variant === v ? "primary" : "secondary"}
                onClick={() => setVariant(v)}
                className="capitalize"
              >
                {v}
              </Button>
            ))}
          </div>

          <div className="h-4 w-px bg-zinc-200 dark:bg-white/10" />

          <div className="flex items-center gap-1.5">
            <span className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400">
              Density:
            </span>
            {(["compact", "normal", "relaxed"] as const).map((d) => (
              <Button
                key={d}
                size="sm"
                variant={density === d ? "solid" : "flat"}
                color={density === d ? "primary" : "secondary"}
                onClick={() => setDensity(d)}
                className="capitalize"
              >
                {d}
              </Button>
            ))}
          </div>

          <div className="h-4 w-px bg-zinc-200 dark:bg-white/10" />

          <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300">
            <input
              type="checkbox"
              checked={isHoverable}
              onChange={(e) => setIsHoverable(e.target.checked)}
              className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500 dark:border-zinc-700"
            />
            Hover Highlight
          </label>
        </div>

        <ComponentPreview>
          <div className="w-full p-2 sm:p-4">
            <Table variant={variant} density={density} isHoverable={isHoverable}>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Invoice ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INVOICE_DATA.slice(0, 4).map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      {inv.id}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-zinc-900 dark:text-white">
                          {inv.client}
                        </div>
                        <div className="text-xs text-zinc-400">{inv.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        size="sm"
                        variant="soft"
                        color={
                          inv.status === "Paid"
                            ? "success"
                            : inv.status === "Pending"
                              ? "warning"
                              : "danger"
                        }
                      >
                        {inv.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-zinc-500">{inv.date}</TableCell>
                    <TableCell className="text-right font-mono font-semibold text-zinc-900 dark:text-white">
                      {inv.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={4} className="font-semibold">
                    Total Gross Balance
                  </TableCell>
                  <TableCell className="text-right font-mono font-bold text-zinc-900 dark:text-white">
                    $14,320.00
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </ComponentPreview>

        <CodeBlock
          code={`import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  Badge
} from "@hudbird/ui";

export default function Example() {
  return (
    <Table variant="${variant}" density="${density}" isHoverable={${isHoverable}}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[120px]">Invoice ID</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-mono font-semibold">INV-1091</TableCell>
          <TableCell>Acme Corp</TableCell>
          <TableCell><Badge variant="soft" color="success">Paid</Badge></TableCell>
          <TableCell className="text-right font-mono font-semibold">$3,450.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total Balance</TableCell>
          <TableCell className="text-right font-mono font-bold">$3,450.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}`}
        />
      </section>

      {/* Advanced Data Grid */}
      <section id="advanced-data-grid" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Advanced Data Grid (Search, Filter, Pagination)
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            A production-ready data table with search filtering, status filtering, and live
            pagination controls.
          </p>
        </div>

        <ComponentPreview>
          <div className="w-full space-y-4 p-2 sm:p-4">
            {/* Table Header Filter Bar */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative max-w-xs flex-1">
                <Input
                  placeholder="Search invoices or clients..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  startContent={<Search className="h-4 w-4 text-zinc-400" />}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  Status:
                </span>
                {(["All", "Paid", "Pending", "Overdue"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => {
                      setStatusFilter(st);
                      setCurrentPage(1);
                    }}
                    className={`h-8 cursor-pointer rounded-lg px-3.5 text-xs font-medium transition-all ${
                      statusFilter === st
                        ? "bg-zinc-900 text-white shadow-xs dark:bg-white dark:text-zinc-900"
                        : "text-zinc-600 hover:bg-zinc-200/60 dark:text-zinc-400 dark:hover:bg-white/10"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <Table variant="default" density="normal" isHoverable>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedInvoices.length > 0 ? (
                  paginatedInvoices.map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-mono text-xs font-semibold">{inv.id}</TableCell>
                      <TableCell>
                        <div className="font-medium text-zinc-900 dark:text-white">
                          {inv.client}
                        </div>
                        <div className="text-xs text-zinc-400">{inv.email}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          size="sm"
                          variant="soft"
                          color={
                            inv.status === "Paid"
                              ? "success"
                              : inv.status === "Pending"
                                ? "warning"
                                : "danger"
                          }
                        >
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-zinc-500">{inv.date}</TableCell>
                      <TableCell className="text-right font-mono font-semibold">
                        {inv.amount}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-zinc-500">
                      No invoices found matching "{searchQuery}".
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Footer Pagination */}
            <div className="flex flex-col items-center justify-between gap-3 pt-2 sm:flex-row">
              <span className="text-xs text-zinc-500">
                Showing {filteredInvoices.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}{" "}
                to {Math.min(currentPage * itemsPerPage, filteredInvoices.length)} of{" "}
                {filteredInvoices.length} invoices
              </span>

              <Pagination
                total={totalPages}
                page={currentPage}
                onChange={setCurrentPage}
                size="sm"
              />
            </div>
          </div>
        </ComponentPreview>
      </section>

      {/* Row Selection */}
      <section id="row-selection" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Table with Row Selection
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            Multi-select rows with automatic highlight feedback and conditional batch action trays.
          </p>
        </div>

        <ComponentPreview>
          <div className="w-full space-y-3 p-2 sm:p-4">
            {selectedIds.length > 0 && (
              <div className="animate-in fade-in-50 flex items-center justify-between rounded-xl border border-indigo-500/20 bg-indigo-50/50 p-2.5 px-4 text-xs dark:bg-indigo-500/10">
                <span className="font-medium text-indigo-700 dark:text-indigo-300">
                  {selectedIds.length} invoice{selectedIds.length > 1 ? "s" : ""} selected
                </span>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="flat" color="indigo">
                    Mark as Paid
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => setSelectedIds([])}>
                    Clear
                  </Button>
                </div>
              </div>
            )}

            <Table variant="default">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[48px]">
                    <Checkbox
                      checked={
                        selectedIds.length === INVOICE_DATA.length && INVOICE_DATA.length > 0
                      }
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      aria-label="Select all rows"
                    />
                  </TableHead>
                  <TableHead className="w-[120px]">Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {INVOICE_DATA.slice(0, 3).map((inv) => {
                  const isSelected = selectedIds.includes(inv.id);
                  return (
                    <TableRow key={inv.id} isSelected={isSelected}>
                      <TableCell>
                        <Checkbox
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(inv.id, e.target.checked)}
                          aria-label={`Select invoice ${inv.id}`}
                        />
                      </TableCell>
                      <TableCell className="font-mono text-xs font-semibold">{inv.id}</TableCell>
                      <TableCell className="font-medium">{inv.client}</TableCell>
                      <TableCell>
                        <Badge size="sm" variant="soft" color="success">
                          {inv.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-mono font-semibold">
                        {inv.amount}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </ComponentPreview>
      </section>

      {/* Understanding TableCaption & Accessibility */}
      <section id="caption-accessibility" className="scroll-mt-24 space-y-6">
        <div>
          <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
            Understanding TableCaption &amp; Accessibility
          </h2>
          <p className="mt-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            Why TableCaption exists and how screen readers utilize it for WCAG compliance.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6 sm:p-8 dark:border-white/10 dark:bg-white/[0.02]">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
                <HelpCircle className="h-4 w-4" />
              </div>
              <h4 className="text-base font-semibold text-zinc-900 dark:text-white">
                What is the purpose of &lt;TableCaption&gt;?
              </h4>
            </div>

            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              In HTML, the semantic{" "}
              <code className="rounded bg-zinc-200/60 px-1 py-0.5 font-mono text-xs dark:bg-white/10">
                &lt;caption&gt;
              </code>{" "}
              tag acts as the title or accessible description of a table. Assistive tools (such as
              Apple VoiceOver and NVDA) announce the caption text first before navigating through
              rows and columns, giving visually impaired users immediate context about the table’s
              contents (e.g. <em>"A list of your recent invoices"</em>).
            </p>

            <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-[#161618]">
                <h5 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  Default (Bottom Placement)
                </h5>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  Renders underneath the table as a centered metadata footnote.
                </p>
                <div className="mt-2 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  &lt;TableCaption side="bottom"&gt;...&lt;/TableCaption&gt;
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-[#161618]">
                <h5 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                  Top Placement (Table Title)
                </h5>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                  Renders above the header as a left-aligned descriptive subtitle.
                </p>
                <div className="mt-2 font-mono text-xs text-indigo-600 dark:text-indigo-400">
                  &lt;TableCaption side="top"&gt;...&lt;/TableCaption&gt;
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Installation */}
      <section id="installation" className="scroll-mt-24 space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Installation
        </h2>
        <InstallationTabs componentName="Table" manualCode={tableCode} />
      </section>

      {/* Component API */}
      <section id="component-api" className="scroll-mt-24 space-y-4">
        <h2 className="font-outfit text-2xl font-medium tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
          Component API
        </h2>
        <ApiTable
          rows={apiRows}
          note="Table context automatically passes variant and density down to all child rows and cells, ensuring harmonious rhythm without manual className duplication."
        />
      </section>
    </div>
  );
}
