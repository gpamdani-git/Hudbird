import React, { useState } from "react";
import {
  Search,
  UploadCloud,
  Filter,
  MoreVertical,
  Image as ImageIcon,
  Video,
  FileText,
  CheckCircle2,
  Trash2,
} from "lucide-react";
import { Card, Button } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const MEDIA_ITEMS = Array.from({ length: 12 }).map((_, i) => ({
  id: `m${i}`,
  url: `https://picsum.photos/seed/${i + 100}/400/300`,
  name: `marketing-asset-final-${i + 1}.jpg`,
  type: i % 5 === 0 ? "video" : "image",
  size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
  date: "Oct 24, 2024",
}));

export const AdminMedia = () => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isUploading, setIsUploading] = useState(false);

  const toggleSelect = (id: string) => {
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
      className="flex h-[calc(100vh-160px)] flex-col gap-4"
    >
      {/* Toolbar */}
      <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <div className="relative w-full max-w-[240px] sm:w-[240px]">
            <Search className="text-muted-foreground/40 absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search media..."
              className="border-border/40 bg-card text-foreground placeholder:text-muted-foreground/40 focus:border-border focus:bg-background h-9 w-full rounded-lg border pr-3 pl-9 text-[13px] transition-colors outline-none"
            />
          </div>
          <Button variant="outline" size="sm" className="border-border/40 bg-card h-9 gap-1.5">
            <Filter className="h-3.5 w-3.5" />
            Filter
          </Button>
        </div>

        <Button
          variant="solid"
          size="sm"
          className="h-9 gap-1.5"
          onClick={() => setIsUploading(!isUploading)}
        >
          <UploadCloud className="h-3.5 w-3.5" />
          Upload New
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 gap-4 overflow-hidden">
        {/* Media Grid */}
        <div className="custom-scrollbar flex-1 overflow-y-auto pr-2">
          <AnimatePresence>
            {isUploading && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: 160, marginBottom: 16 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <div className="border-primary/40 bg-primary/5 hover:border-primary hover:bg-primary/10 flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors">
                  <UploadCloud className="text-primary mb-3 h-8 w-8" />
                  <p className="text-foreground text-sm font-medium">
                    Drag and drop your files here
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    or click to browse from your computer (JPG, PNG, MP4)
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setIsUploading(false)}>
                      Cancel
                    </Button>
                    <Button size="sm" variant="solid">
                      Browse Files
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {MEDIA_ITEMS.map((item) => {
              const isSelected = selectedIds.has(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleSelect(item.id)}
                  className={`group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl border-2 transition-all ${
                    isSelected ? "border-primary" : "border-border/20 hover:border-border/50"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.name}
                    className={`h-full w-full object-cover transition-transform duration-500 ${
                      isSelected ? "scale-105" : "group-hover:scale-105"
                    }`}
                  />
                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 transition-opacity ${
                      isSelected
                        ? "bg-primary/20 opacity-100"
                        : "bg-black/40 opacity-0 group-hover:opacity-100"
                    }`}
                  />

                  {/* Selection Checkbox */}
                  <div
                    className={`absolute top-2 left-2 z-10 transition-opacity ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                  >
                    <div
                      className={`flex h-5 w-5 items-center justify-center rounded-full border shadow-sm ${isSelected ? "bg-primary border-primary text-white" : "bg-background/80 border-border text-transparent backdrop-blur-sm"}`}
                    >
                      <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
                    </div>
                  </div>

                  {/* Type Icon */}
                  <div className="absolute bottom-2 left-2 z-10">
                    <div className="bg-background/80 border-border/50 flex h-6 w-6 items-center justify-center rounded-md border backdrop-blur-md">
                      {item.type === "video" ? (
                        <Video className="text-foreground h-3 w-3" />
                      ) : (
                        <ImageIcon className="text-foreground h-3 w-3" />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Sidebar (Details) */}
        <AnimatePresence>
          {selectedIds.size > 0 && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="shrink-0 overflow-hidden"
            >
              <Card className="border-border/40 bg-card custom-scrollbar h-full w-[320px] overflow-y-auto p-5">
                {selectedIds.size === 1 ? (
                  <div className="space-y-6">
                    <div className="border-border/40 bg-muted/20 aspect-video w-full overflow-hidden rounded-lg border">
                      <img
                        src={MEDIA_ITEMS.find((m) => m.id === Array.from(selectedIds)[0])?.url}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm leading-tight font-semibold break-all">
                        {MEDIA_ITEMS.find((m) => m.id === Array.from(selectedIds)[0])?.name}
                      </h4>
                      <p className="text-muted-foreground/60 text-[11px] tracking-wider uppercase">
                        {MEDIA_ITEMS.find((m) => m.id === Array.from(selectedIds)[0])?.date}
                      </p>
                    </div>

                    <div className="border-border/40 space-y-3 border-t pt-4">
                      <div className="flex justify-between text-[13px]">
                        <span className="text-muted-foreground/70">Type</span>
                        <span className="text-foreground font-medium uppercase">
                          {MEDIA_ITEMS.find((m) => m.id === Array.from(selectedIds)[0])?.type}
                        </span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-muted-foreground/70">Size</span>
                        <span className="text-foreground font-medium">
                          {MEDIA_ITEMS.find((m) => m.id === Array.from(selectedIds)[0])?.size}
                        </span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-muted-foreground/70">Dimensions</span>
                        <span className="text-foreground font-medium">1920 × 1080</span>
                      </div>
                    </div>

                    <div className="border-border/40 space-y-2 border-t pt-4">
                      <label className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                        Alt Text
                      </label>
                      <input
                        type="text"
                        placeholder="Describe the image..."
                        className="border-border/40 bg-background text-foreground focus:border-primary h-9 w-full rounded-lg border px-3 text-[13px] outline-none"
                      />
                    </div>

                    <div className="border-border/40 flex justify-between border-t pt-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive border-destructive/20 hover:bg-destructive/10 h-8"
                      >
                        <Trash2 className="mr-1 h-3.5 w-3.5" />
                        Delete
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        Copy URL
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-muted-foreground flex h-full flex-col items-center justify-center text-center">
                    <FileText className="mb-3 h-12 w-12 opacity-20" />
                    <h4 className="text-foreground font-semibold">
                      {selectedIds.size} items selected
                    </h4>
                    <p className="mt-1 text-[13px]">Bulk actions available</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive border-destructive/20 hover:bg-destructive/10 mt-4"
                    >
                      <Trash2 className="mr-1 h-3.5 w-3.5" />
                      Delete Selected
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
