import React, { useState } from "react";
import { Search, SlidersHorizontal, ChevronDown, File, Edit, Eye, Trash2 } from "lucide-react";
import {
  Card,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
} from "@hudbird/ui";
import { motion } from "framer-motion";
import { ConfirmModal } from "../Components/ConfirmModal";

const CheckboxCell = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <div
    role="checkbox"
    aria-checked={checked}
    tabIndex={0}
    onClick={onChange}
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

const PAGES_DATA = [
  { id: "p1", title: "Home", path: "/", status: "Published", lastEdited: "2 hours ago" },
  { id: "p2", title: "About Us", path: "/about", status: "Published", lastEdited: "Oct 20, 2024" },
  { id: "p3", title: "Contact", path: "/contact", status: "Published", lastEdited: "Oct 18, 2024" },
  { id: "p4", title: "Pricing", path: "/pricing", status: "Draft", lastEdited: "Oct 15, 2024" },
  {
    id: "p5",
    title: "Terms of Service",
    path: "/legal/terms",
    status: "Published",
    lastEdited: "Sep 1, 2024",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const AdminPages = ({ onEdit }: { onEdit?: () => void }) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const toggleAll = () => {
    if (selectedIds.size === PAGES_DATA.length) setSelectedIds(new Set());
    else setSelectedIds(new Set(PAGES_DATA.map((p) => p.id)));
  };

  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="space-y-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-xs">
          <Search className="text-muted-foreground/40 absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
          <input
            type="search"
            placeholder="Search pages..."
            className="border-border/40 bg-card text-foreground placeholder:text-muted-foreground/40 focus:border-border focus:bg-background h-9 w-full rounded-lg border pr-3 pl-9 text-[13px] transition-colors outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="border-border/40 bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[12px] font-medium transition-colors">
            Status
            <ChevronDown className="h-3 w-3 opacity-50" />
          </button>
          <button className="border-border/40 bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 items-center gap-1.5 rounded-lg border px-3 text-[12px] font-medium transition-colors">
            <SlidersHorizontal className="h-3 w-3" />
            Filters
          </button>
        </div>
      </div>

      <Card className="border-border/40 bg-card overflow-hidden">
        <div className="w-full overflow-x-auto">
          <Table className="w-full min-w-[700px]">
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border/40 hover:bg-transparent">
                <TableHead className="w-[40px] pl-4">
                  <CheckboxCell
                    checked={selectedIds.size === PAGES_DATA.length}
                    onChange={toggleAll}
                  />
                </TableHead>
                <TableHead>
                  <span className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                    Title
                  </span>
                </TableHead>
                <TableHead>
                  <span className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                    Path
                  </span>
                </TableHead>
                <TableHead>
                  <span className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                    Status
                  </span>
                </TableHead>
                <TableHead className="text-right">
                  <span className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                    Last Edited
                  </span>
                </TableHead>
                <TableHead className="w-[50px] pr-4"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PAGES_DATA.map((page) => (
                <TableRow
                  key={page.id}
                  className="group border-border/40 hover:bg-muted/20 transition-colors"
                >
                  <TableCell className="pl-4">
                    <CheckboxCell
                      checked={selectedIds.has(page.id)}
                      onChange={() => toggleOne(page.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="bg-muted/40 flex h-8 w-8 items-center justify-center rounded-lg">
                        <File className="text-muted-foreground/60 h-4 w-4" />
                      </div>
                      <span className="text-foreground font-medium">{page.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-[13px]">{page.path}</TableCell>
                  <TableCell>
                    <Badge
                      variant={page.status === "Published" ? "solid" : "flat"}
                      className={
                        page.status === "Published"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "text-muted-foreground/70"
                      }
                    >
                      {page.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-right text-[13px]">
                    {page.lastEdited}
                  </TableCell>
                  <TableCell className="pr-4 text-right">
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
                        onClick={() => {
                          setItemToDelete(page.id);
                          setIsDeleteModalOpen(true);
                        }}
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

      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setItemToDelete(null);
        }}
        onConfirm={() => {
          console.log("Deleted", itemToDelete);
          // Actual deletion logic would go here
        }}
        title="Delete Page?"
        description="Are you sure you want to delete this page? It will be permanently removed from your site."
      />
    </motion.div>
  );
};
