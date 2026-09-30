import React, { useState } from "react";
import {
  Card,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@hudbird/ui";
import { ArrowUpDown, Edit, Eye, Trash2 } from "lucide-react";

const TABLE_DATA = [
  {
    id: "1",
    title: "How to Build a Design System",
    author: "Olivia Martin",
    status: "Published",
    category: "Engineering",
    date: "Oct 24, 2024",
  },
  {
    id: "2",
    title: "10 React Patterns You Should Know",
    author: "Jackson Lee",
    status: "Draft",
    category: "Tutorial",
    date: "Oct 22, 2024",
  },
  {
    id: "3",
    title: "The Future of Frontend Development",
    author: "Isabella Nguyen",
    status: "Published",
    category: "Opinion",
    date: "Oct 19, 2024",
  },
  {
    id: "4",
    title: "State Management in 2024",
    author: "William Kim",
    status: "Archived",
    category: "Engineering",
    date: "Oct 15, 2024",
  },
  {
    id: "5",
    title: "Mastering Tailwind CSS",
    author: "Sofia Davis",
    status: "Published",
    category: "Tutorial",
    date: "Oct 12, 2024",
  },
  {
    id: "6",
    title: "Component Architecture Guide",
    author: "Liam Chen",
    status: "Draft",
    category: "Engineering",
    date: "Oct 8, 2024",
  },
  {
    id: "7",
    title: "SEO Best Practices for SPAs",
    author: "Emma Wilson",
    status: "Published",
    category: "Marketing",
    date: "Oct 5, 2024",
  },
];

const CheckboxCell = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <div
    role="checkbox"
    aria-checked={checked}
    tabIndex={0}
    onClick={onChange}
    onKeyDown={(e) => e.key === " " && onChange()}
    className={`flex h-[15px] w-[15px] shrink-0 cursor-pointer items-center justify-center rounded border transition-all duration-150 ${
      checked
        ? "border-primary bg-primary text-white shadow-sm"
        : "border-muted-foreground/25 hover:border-muted-foreground/50 bg-transparent"
    }`}
  >
    {checked && (
      <svg
        className="h-2.5 w-2.5"
        fill="none"
        viewBox="0 0 12 12"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 6l2.5 2.5 4.5-5" />
      </svg>
    )}
  </div>
);

export const AdminTable = ({ onEdit }: { onEdit?: () => void }) => {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleAll = () => {
    setSelected((prev) =>
      prev.size === TABLE_DATA.length ? new Set() : new Set(TABLE_DATA.map((r) => r.id))
    );
  };

  return (
    <Card className="border-border/30 bg-card overflow-hidden">
      {/* Table header bar */}
      <div className="border-border/30 flex items-center justify-between border-b px-5 py-3">
        <h3 className="text-[13px] font-semibold">Recent Content</h3>
        <span className="text-muted-foreground/50 text-[11px]">
          {selected.size > 0 ? `${selected.size} selected` : `${TABLE_DATA.length} posts`}
        </span>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="w-10 pl-5">
                <CheckboxCell checked={selected.size === TABLE_DATA.length} onChange={toggleAll} />
              </TableHead>
              <TableHead>
                <button className="text-muted-foreground/60 flex items-center gap-1 text-[11px] font-semibold tracking-wider uppercase">
                  Title
                  <ArrowUpDown className="h-3 w-3 opacity-40" />
                </button>
              </TableHead>
              <TableHead>
                <span className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                  Author
                </span>
              </TableHead>
              <TableHead>
                <span className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                  Category
                </span>
              </TableHead>
              <TableHead>
                <span className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                  Status
                </span>
              </TableHead>
              <TableHead className="text-right">
                <span className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                  Date
                </span>
              </TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {TABLE_DATA.map((row) => (
              <TableRow
                key={row.id}
                className={`group border-border/20 hover:bg-muted/20 transition-colors ${
                  selected.has(row.id) ? "bg-primary/5" : ""
                }`}
              >
                <TableCell className="pl-5">
                  <CheckboxCell checked={selected.has(row.id)} onChange={() => toggle(row.id)} />
                </TableCell>
                <TableCell className="text-[13px] font-medium">{row.title}</TableCell>
                <TableCell className="text-muted-foreground text-[13px]">{row.author}</TableCell>
                <TableCell className="text-muted-foreground text-[13px]">{row.category}</TableCell>
                <TableCell>
                  <Badge
                    variant="soft"
                    color={
                      row.status === "Published"
                        ? "success"
                        : row.status === "Draft"
                          ? "warning"
                          : "secondary"
                    }
                  >
                    {row.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground text-right text-[13px]">
                  {row.date}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <button
                      onClick={onEdit}
                      className="text-muted-foreground hover:bg-muted/60 hover:text-foreground flex h-7 w-7 items-center justify-center rounded-md transition-colors"
                      title="Edit"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </button>
                    <button
                      className="text-muted-foreground hover:bg-muted/60 hover:text-foreground flex h-7 w-7 items-center justify-center rounded-md transition-colors"
                      title="View"
                    >
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button
                      className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive flex h-7 w-7 items-center justify-center rounded-md transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
