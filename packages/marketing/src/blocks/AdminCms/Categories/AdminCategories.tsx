import React, { useState } from "react";
import { Search, Plus, MoreHorizontal, Edit, Trash, FolderOpen } from "lucide-react";
import { Button, Card, Badge } from "@hudbird/ui";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const INITIAL_CATEGORIES = [
  {
    id: 1,
    name: "Engineering",
    slug: "engineering",
    count: 12,
    desc: "Technical articles and engineering practices.",
  },
  {
    id: 2,
    name: "Design",
    slug: "design",
    count: 8,
    desc: "UI/UX, design systems, and product design.",
  },
  {
    id: 3,
    name: "Product Updates",
    slug: "product-updates",
    count: 24,
    desc: "New features, releases, and changelogs.",
  },
  {
    id: 4,
    name: "Company",
    slug: "company",
    count: 5,
    desc: "Company news, culture, and announcements.",
  },
  {
    id: 5,
    name: "Tutorials",
    slug: "tutorials",
    count: 15,
    desc: "How-to guides and technical tutorials.",
  },
];

export const AdminCategories = () => {
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [formData, setFormData] = useState({ name: "", slug: "", desc: "" });

  const handleEdit = (cat: (typeof INITIAL_CATEGORIES)[0]) => {
    setEditingId(cat.id);
    setFormData({ name: cat.name, slug: cat.slug, desc: cat.desc });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: "", slug: "", desc: "" });
  };

  const handleSave = () => {
    if (editingId) {
      setCategories(categories.map((c) => (c.id === editingId ? { ...c, ...formData } : c)));
      handleCancel();
    } else {
      setCategories([...categories, { id: Date.now(), count: 0, ...formData }]);
      setFormData({ name: "", slug: "", desc: "" });
    }
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="flex h-[calc(100vh-160px)] flex-col gap-6 lg:flex-row"
    >
      {/* Left Column: Form */}
      <div className="w-full shrink-0 space-y-6 lg:w-[320px]">
        <div className="space-y-1">
          <h2 className="text-foreground text-lg font-bold tracking-tight">
            {editingId ? "Edit Category" : "Add New Category"}
          </h2>
          <p className="text-muted-foreground text-[13px]">
            Categories help organize your content.
          </p>
        </div>

        <Card className="border-border/40 bg-card space-y-4 p-4">
          <div className="space-y-1.5">
            <label className="text-foreground text-[13px] font-medium">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border px-3 text-[13px] transition-colors outline-none"
              placeholder="e.g. Engineering"
            />
            <p className="text-muted-foreground text-[11px]">
              The name is how it appears on your site.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-foreground text-[13px] font-medium">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border px-3 text-[13px] transition-colors outline-none"
              placeholder="e.g. engineering"
            />
            <p className="text-muted-foreground text-[11px]">
              The "slug" is the URL-friendly version of the name.
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-foreground text-[13px] font-medium">Description</label>
            <textarea
              value={formData.desc}
              onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
              className="border-border/40 bg-background focus:border-primary custom-scrollbar min-h-[100px] w-full resize-y rounded-md border p-3 text-[13px] transition-colors outline-none"
              placeholder="Write a short description..."
            />
            <p className="text-muted-foreground text-[11px]">
              The description is not prominent by default.
            </p>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="solid"
              className="flex-1"
              onClick={handleSave}
              disabled={!formData.name}
            >
              {editingId ? "Update Category" : "Add New Category"}
            </Button>
            {editingId && (
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
          </div>
        </Card>
      </div>

      {/* Right Column: Table */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="mb-4 flex shrink-0 items-center justify-between">
          <div className="relative w-full max-w-[240px]">
            <Search className="text-muted-foreground/40 absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search categories..."
              className="border-border/40 bg-card text-foreground placeholder:text-muted-foreground/40 focus:border-border focus:bg-background h-9 w-full rounded-lg border pr-3 pl-9 text-[13px] transition-colors outline-none"
            />
          </div>
          <span className="text-muted-foreground text-[13px] font-medium">
            {categories.length} items
          </span>
        </div>

        <Card className="border-border/40 bg-card flex flex-1 flex-col overflow-hidden">
          <div className="custom-scrollbar flex-1 overflow-x-auto">
            <table className="w-full text-left text-[13px] whitespace-nowrap">
              <thead className="border-border/30 bg-muted/30 sticky top-0 z-10 border-b backdrop-blur-md">
                <tr>
                  <th className="text-muted-foreground w-10 px-4 py-3 font-medium">
                    <input type="checkbox" className="border-border/40 bg-background rounded" />
                  </th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">Name</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">Description</th>
                  <th className="text-muted-foreground px-4 py-3 font-medium">Slug</th>
                  <th className="text-muted-foreground px-4 py-3 text-right font-medium">Count</th>
                </tr>
              </thead>
              <tbody className="divide-border/20 divide-y">
                <AnimatePresence initial={false}>
                  {categories.map((cat) => (
                    <motion.tr
                      key={cat.id}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="group hover:bg-muted/10 relative transition-colors"
                    >
                      <td className="px-4 py-3 align-top">
                        <input type="checkbox" className="border-border/40 bg-background rounded" />
                      </td>
                      <td className="min-w-[200px] px-4 py-3 align-top">
                        <div className="text-foreground flex items-center gap-2 font-medium">
                          <FolderOpen className="text-muted-foreground/50 h-4 w-4" />
                          {cat.name}
                        </div>
                        {/* Inline Actions (visible on hover) */}
                        <div className="mt-1.5 flex h-5 items-center gap-3 opacity-0 transition-opacity group-hover:opacity-100">
                          <button
                            onClick={() => handleEdit(cat)}
                            className="text-primary text-[12px] font-medium hover:underline"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(cat.id)}
                            className="text-[12px] font-medium text-red-500 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                      <td className="text-muted-foreground max-w-[250px] truncate px-4 py-3 align-top">
                        {cat.desc || "—"}
                      </td>
                      <td className="text-muted-foreground px-4 py-3 align-top">{cat.slug}</td>
                      <td className="px-4 py-3 text-right align-top">
                        <Badge variant="flat" className="bg-muted/40 text-foreground">
                          {cat.count}
                        </Badge>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
