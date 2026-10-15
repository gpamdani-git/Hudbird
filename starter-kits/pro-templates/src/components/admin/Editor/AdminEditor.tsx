import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  Image as ImageIcon,
  Settings,
  Eye,
  CheckCircle2,
  Bold,
  Italic,
  Underline,
  Link,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Quote,
  Code,
  Plus,
  Layout,
  Image,
  Type,
  GripVertical,
  Trash2,
  Edit3,
  MessageSquare,
  LayoutGrid,
  ArrowUp,
  ArrowDown,
  CreditCard,
  HelpCircle,
  Columns,
  X,
  Monitor,
} from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import { motion, AnimatePresence, Reorder } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

type BlockType = "hero" | "features" | "testimonials" | "cta" | "pricing" | "faq";

interface PageBlock {
  id: string;
  type: BlockType;
  title: string;
  content?: string;
}

const AVAILABLE_BLOCKS: { type: BlockType; title: string; icon: any; desc: string }[] = [
  {
    type: "hero",
    title: "Hero Section",
    icon: Layout,
    desc: "Main attention grabber with headline and CTA.",
  },
  {
    type: "features",
    title: "Feature Grid",
    icon: LayoutGrid,
    desc: "Showcase product features in a multi-column grid.",
  },
  {
    type: "testimonials",
    title: "Testimonials",
    icon: MessageSquare,
    desc: "Social proof with customer reviews.",
  },
  {
    type: "cta",
    title: "Call to Action",
    icon: ArrowUp,
    desc: "Encourage users to take the next step.",
  },
  {
    type: "pricing",
    title: "Pricing Plans",
    icon: CreditCard,
    desc: "Display subscription tiers and features.",
  },
  {
    type: "faq",
    title: "FAQ Accordion",
    icon: HelpCircle,
    desc: "Answer common questions in an expandable list.",
  },
];

export const AdminEditor = ({
  type = "post",
  onBack,
}: {
  type?: "post" | "page";
  onBack?: () => void;
}) => {
  const [activeTab, setActiveTab] = useState<"document" | "block">("document");

  // Page Builder State
  const [blocks, setBlocks] = useState<PageBlock[]>([
    { id: "blk-1", type: "hero", title: "Hero Section" },
    { id: "blk-2", type: "features", title: "Feature Grid" },
  ]);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(null);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showMediaModal, setShowMediaModal] = useState(false);

  const handleAddBlock = (blockType: BlockType, title: string) => {
    const newBlock = {
      id: `blk-${Date.now()}`,
      type: blockType,
      title: title,
    };
    setBlocks([...blocks, newBlock]);
    setShowBlockModal(false);
    setActiveBlockId(newBlock.id);
    setActiveTab("block");
  };

  const removeBlock = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBlocks(blocks.filter((b) => b.id !== id));
    if (activeBlockId === id) {
      setActiveBlockId(null);
      setActiveTab("document");
    }
  };

  const activeBlock = blocks.find((b) => b.id === activeBlockId);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="relative flex h-[calc(100vh-160px)] flex-col gap-4"
    >
      {/* Editor Toolbar */}
      <div className="border-border/30 flex shrink-0 flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="border-border/40 bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-lg border transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">
                {type === "post" ? "Editing Post" : "Editing Page"}
              </span>
              <Badge
                variant="flat"
                className="h-5 bg-zinc-100/50 text-[10px] text-amber-500 dark:bg-amber-500/10 dark:text-amber-400"
              >
                Draft
              </Badge>
            </div>
            <p className="text-muted-foreground/60 mt-0.5 text-[11px]">Last saved: Just now</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {type === "page" && (
            <Button
              variant={isPreviewMode ? "solid" : "outline"}
              size="sm"
              className={`h-9 gap-1.5 ${!isPreviewMode && "border-border/40 bg-card"}`}
              onClick={() => setIsPreviewMode(!isPreviewMode)}
            >
              {isPreviewMode ? <Edit3 className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              {isPreviewMode ? "Exit Preview" : "Live Preview"}
            </Button>
          )}
          {type === "post" && (
            <Button variant="outline" size="sm" className="border-border/40 bg-card h-9 gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              Preview
            </Button>
          )}
          <Button variant="outline" size="sm" className="border-border/40 bg-card h-9 gap-1.5">
            <Save className="h-3.5 w-3.5" />
            Save Draft
          </Button>
          <Button variant="solid" size="sm" className="bg-primary h-9 gap-1.5">
            Publish
          </Button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 gap-6 overflow-hidden">
        {/* Editor Area */}
        <div
          className={`custom-scrollbar flex-1 overflow-y-auto px-2 pb-20 ${isPreviewMode ? "bg-muted/20 border-border/30 rounded-xl border shadow-inner dark:bg-zinc-950" : ""}`}
        >
          <div
            className={`mx-auto ${isPreviewMode ? "max-w-5xl" : "max-w-3xl"} relative space-y-6 pt-4 transition-all duration-300`}
          >
            {!isPreviewMode && (
              <input
                type="text"
                placeholder="Add Title"
                className="text-foreground placeholder:text-muted-foreground/30 mb-6 w-full bg-transparent text-4xl font-bold tracking-tight outline-none"
                defaultValue={type === "post" ? "How to Build a Design System" : "Home Page"}
              />
            )}

            {type === "post" ? (
              <>
                {/* WYSIWYG Formatting Toolbar */}
                <div className="border-border/40 bg-background/80 sticky top-0 z-10 -mx-4 mb-6 flex flex-wrap items-center gap-1 rounded-xl border px-4 py-2 shadow-sm backdrop-blur-xl">
                  <button className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors">
                    <Bold className="h-4 w-4" />
                  </button>
                  <button className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors">
                    <Italic className="h-4 w-4" />
                  </button>
                  <button className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors">
                    <Underline className="h-4 w-4" />
                  </button>
                  <div className="bg-border/50 mx-1 h-4 w-px" />
                  <button className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors">
                    <Link className="h-4 w-4" />
                  </button>
                  <button className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors">
                    <Quote className="h-4 w-4" />
                  </button>
                  <button className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors">
                    <Code className="h-4 w-4" />
                  </button>
                  <div className="bg-border/50 mx-1 h-4 w-px" />
                  <button className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors">
                    <Heading1 className="h-4 w-4" />
                  </button>
                  <button className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors">
                    <Heading2 className="h-4 w-4" />
                  </button>
                  <div className="bg-border/50 mx-1 h-4 w-px" />
                  <button className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors">
                    <List className="h-4 w-4" />
                  </button>
                  <button className="text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors">
                    <ListOrdered className="h-4 w-4" />
                  </button>
                  <div className="bg-border/50 mx-1 h-4 w-px" />
                  <button
                    onClick={() => setShowMediaModal(true)}
                    className="text-muted-foreground hover:bg-primary hover:text-primary-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors"
                    title="Insert from Media Library"
                  >
                    <ImageIcon className="h-4 w-4" />
                  </button>
                </div>

                {/* Rich Text Editor Area */}
                <div className="group relative">
                  <button className="text-muted-foreground/40 hover:bg-muted/50 hover:text-foreground absolute top-0.5 -left-12 flex h-6 w-6 items-center justify-center rounded-md opacity-0 transition-opacity group-hover:opacity-100">
                    <Plus className="h-4 w-4" />
                  </button>
                  <div
                    className="text-muted-foreground min-h-[400px] w-full text-[17px] leading-[1.7] outline-none"
                    contentEditable
                  >
                    <p className="mb-5">
                      Design systems are more than just a UI kit. They are a collection of reusable
                      components, guided by clear standards, that can be assembled together to build
                      any number of applications.
                    </p>
                    <h2 className="text-foreground mt-10 mb-4 text-2xl font-bold tracking-tight">
                      Why do we need a design system?
                    </h2>
                    <p className="mb-5">
                      As teams grow and products scale, inconsistencies start to creep in. A button
                      might be 40px tall on one page and 36px on another. The primary color might
                      have five different hex codes scattered across the codebase.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              /* Visual Page Builder */
              <div className="space-y-4">
                {isPreviewMode ? (
                  /* Live Preview Render */
                  <div className="animate-in fade-in space-y-8 duration-500">
                    {blocks.map((block) => (
                      <div
                        key={block.id}
                        className="border-border/30 bg-card group relative overflow-hidden rounded-xl border"
                      >
                        <div className="absolute top-2 right-2 opacity-0 transition-opacity group-hover:opacity-100">
                          <Badge
                            variant="flat"
                            className="bg-primary/90 text-primary-foreground shadow-sm"
                          >
                            {block.title}
                          </Badge>
                        </div>
                        {block.type === "hero" && (
                          <div className="from-primary/5 via-background to-background flex flex-col items-center bg-gradient-to-br p-16 text-center">
                            <h1 className="mb-4 text-4xl font-extrabold tracking-tight">
                              Build Faster with Hudbird UI
                            </h1>
                            <p className="text-muted-foreground mb-8 max-w-lg">
                              The ultimate UI kit and component library for modern React
                              applications. Start shipping in minutes.
                            </p>
                            <div className="flex gap-4">
                              <Button className="rounded-full shadow-md">Get Started</Button>
                              <Button variant="outline" className="rounded-full">
                                Documentation
                              </Button>
                            </div>
                          </div>
                        )}
                        {block.type === "features" && (
                          <div className="p-12">
                            <h2 className="mb-10 text-center text-2xl font-bold">Why Choose Us</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                              {[1, 2, 3].map((i) => (
                                <div
                                  key={i}
                                  className="bg-muted/20 border-border/40 rounded-2xl border p-6 text-center"
                                >
                                  <div className="bg-primary/10 mx-auto mb-4 h-12 w-12 rounded-full"></div>
                                  <h3 className="mb-2 font-semibold">Feature {i}</h3>
                                  <p className="text-muted-foreground text-sm">
                                    Amazing capability that will blow your mind.
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {block.type === "testimonials" && (
                          <div className="bg-muted/10 p-12">
                            <h2 className="mb-10 text-center text-2xl font-bold">
                              Loved by Builders
                            </h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                              {[1, 2].map((i) => (
                                <div
                                  key={i}
                                  className="bg-card border-border/40 rounded-2xl border p-6"
                                >
                                  <div className="mb-4 flex items-center gap-3">
                                    <div className="bg-muted h-10 w-10 rounded-full"></div>
                                    <div>
                                      <p className="text-sm font-semibold">Customer {i}</p>
                                      <p className="text-muted-foreground text-xs">
                                        CEO at Company
                                      </p>
                                    </div>
                                  </div>
                                  <p className="text-sm italic">
                                    "This is the best product I have ever used. Highly recommended!"
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {["cta", "pricing", "faq"].includes(block.type) && (
                          <div className="bg-muted/10 flex flex-col items-center justify-center p-20 text-center">
                            <Monitor className="text-muted-foreground/30 mb-3 h-10 w-10" />
                            <h3 className="text-lg font-medium">{block.title} Preview</h3>
                            <p className="text-muted-foreground text-sm">
                              Component rendering simulated.
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                    {blocks.length === 0 && (
                      <div className="text-muted-foreground py-20 text-center">
                        No blocks to preview. Switch to edit mode to add some.
                      </div>
                    )}
                  </div>
                ) : (
                  /* Editor Mode Drag & Drop */
                  <Reorder.Group
                    axis="y"
                    values={blocks}
                    onReorder={setBlocks}
                    className="space-y-3"
                  >
                    <AnimatePresence>
                      {blocks.map((block) => (
                        <Reorder.Item key={block.id} value={block} id={block.id}>
                          <div
                            onClick={() => {
                              setActiveBlockId(block.id);
                              setActiveTab("block");
                            }}
                            className={`group bg-card flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-all ${activeBlockId === block.id ? "border-primary ring-primary/20 shadow-sm ring-1" : "border-border/40 hover:border-primary/50"}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-muted-foreground/40 hover:text-foreground cursor-grab active:cursor-grabbing">
                                <GripVertical className="h-5 w-5" />
                              </div>
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-lg ${activeBlockId === block.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                              >
                                {AVAILABLE_BLOCKS.find((b) => b.type === block.type)?.icon &&
                                  React.createElement(
                                    AVAILABLE_BLOCKS.find((b) => b.type === block.type)!.icon,
                                    { className: "h-4 w-4" }
                                  )}
                              </div>
                              <div>
                                <h4 className="text-foreground text-[13px] font-semibold">
                                  {block.title}
                                </h4>
                                <p className="text-muted-foreground text-[11px]">
                                  Section • Click to edit settings
                                </p>
                              </div>
                            </div>
                            <div
                              className={`flex items-center gap-2 transition-opacity ${activeBlockId === block.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                            >
                              <Button
                                variant="ghost"
                                size="sm"
                                isIconOnly
                                className="text-muted-foreground h-8 w-8 hover:text-rose-500"
                                onClick={(e) => removeBlock(e, block.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </Reorder.Item>
                      ))}
                    </AnimatePresence>

                    {blocks.length === 0 && (
                      <div className="border-border/50 bg-background flex min-h-[300px] flex-col items-center justify-center rounded-xl border-2 border-dashed bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] p-6 dark:bg-[radial-gradient(#27272a_1px,transparent_1px)]">
                        <div className="bg-primary/10 text-primary mb-2 flex h-12 w-12 items-center justify-center rounded-2xl">
                          <Layout className="h-6 w-6" />
                        </div>
                        <h2 className="text-foreground text-lg font-bold tracking-tight">
                          Visual Page Builder
                        </h2>
                        <p className="text-muted-foreground mt-1 max-w-sm text-center text-sm">
                          Drag and drop sections to build your layout visually.
                        </p>
                      </div>
                    )}

                    <button
                      onClick={() => setShowBlockModal(true)}
                      className="border-border/60 text-muted-foreground hover:bg-muted/30 hover:text-foreground hover:border-primary/40 mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed py-4 transition-all"
                    >
                      <Plus className="h-4 w-4" />
                      <span className="text-sm font-medium">Add New Block</span>
                    </button>
                  </Reorder.Group>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Sidebar (Settings) - Hide in Live Preview */}
        {!isPreviewMode && (
          <div className="custom-scrollbar animate-in slide-in-from-right-4 w-[300px] shrink-0 overflow-y-auto pr-2 duration-300">
            <Card className="border-border/40 bg-card flex h-full flex-col overflow-hidden">
              <div className="border-border/30 bg-muted/20 flex items-center border-b">
                <button
                  onClick={() => setActiveTab("document")}
                  className={`flex-1 py-2.5 text-[12px] font-medium transition-colors ${activeTab === "document" ? "border-primary text-foreground bg-card border-b-2" : "text-muted-foreground hover:text-foreground"}`}
                >
                  Document
                </button>
                {type === "page" && (
                  <button
                    onClick={() => setActiveTab("block")}
                    className={`flex-1 py-2.5 text-[12px] font-medium transition-colors ${activeTab === "block" ? "border-primary text-foreground bg-card border-b-2" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Block Settings
                  </button>
                )}
                {type === "post" && (
                  <button
                    onClick={() => setActiveTab("block")}
                    className={`flex-1 py-2.5 text-[12px] font-medium transition-colors ${activeTab === "block" ? "border-primary text-foreground bg-card border-b-2" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    Text Format
                  </button>
                )}
              </div>

              <div className="space-y-6 overflow-y-auto p-4">
                {activeTab === "document" && (
                  <>
                    <div className="space-y-3">
                      <h3 className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                        Status & Visibility
                      </h3>
                      <div className="space-y-2 text-[13px]">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Visibility</span>
                          <span className="hover:text-primary cursor-pointer font-medium">
                            Public
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Publish</span>
                          <span className="hover:text-primary cursor-pointer font-medium">
                            Immediately
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-border/30 space-y-3 border-t pt-4">
                      <h3 className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                        URL Slug
                      </h3>
                      <input
                        type="text"
                        className="border-border/40 bg-background focus:border-primary focus:ring-primary/30 w-full rounded-md border px-3 py-1.5 text-[13px] transition-all outline-none focus:ring-1"
                        defaultValue="how-to-build-a-design-system"
                      />
                    </div>

                    <div className="border-border/30 space-y-3 border-t pt-4">
                      <h3 className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                        Featured Image
                      </h3>
                      <div className="border-border/40 bg-muted/20 hover:border-primary/50 hover:bg-primary/5 flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors">
                        <ImageIcon className="text-muted-foreground/50 mb-2 h-6 w-6" />
                        <span className="text-muted-foreground text-[12px] font-medium">
                          Set featured image
                        </span>
                      </div>
                    </div>

                    {type === "post" ? (
                      <div className="border-border/30 space-y-3 border-t pt-4">
                        <h3 className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                          Categories
                        </h3>
                        <div className="space-y-2">
                          <label className="group flex cursor-pointer items-center gap-2">
                            <div className="border-border/40 bg-background group-hover:border-primary flex h-4 w-4 items-center justify-center rounded border text-transparent transition-colors"></div>
                            <span className="text-muted-foreground group-hover:text-foreground text-[13px] transition-colors">
                              Engineering
                            </span>
                          </label>
                          <label className="group flex cursor-pointer items-center gap-2">
                            <div className="border-primary bg-primary flex h-4 w-4 items-center justify-center rounded border text-white shadow-sm">
                              <CheckCircle2 className="h-3 w-3" strokeWidth={3} />
                            </div>
                            <span className="text-foreground text-[13px] font-medium">Design</span>
                          </label>
                        </div>
                        <button className="text-primary mt-2 block text-[12px] hover:underline">
                          Add new category
                        </button>
                      </div>
                    ) : (
                      <div className="border-border/30 space-y-3 border-t pt-4">
                        <h3 className="text-muted-foreground/60 text-[11px] font-semibold tracking-wider uppercase">
                          Page Attributes
                        </h3>
                        <div className="space-y-2">
                          <span className="text-muted-foreground block text-[12px]">Template</span>
                          <select className="border-border/40 bg-background focus:border-primary w-full rounded-md border px-3 py-1.5 text-[13px] outline-none">
                            <option>Visual Page Builder</option>
                            <option>Default Template</option>
                            <option>Landing Page</option>
                            <option>Blank Canvas</option>
                          </select>
                        </div>
                        <div className="mt-3 space-y-2">
                          <span className="text-muted-foreground block text-[12px]">
                            Parent Page
                          </span>
                          <select className="border-border/40 bg-background focus:border-primary w-full rounded-md border px-3 py-1.5 text-[13px] outline-none">
                            <option>(no parent)</option>
                            <option>About Us</option>
                            <option>Services</option>
                          </select>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeTab === "block" && type === "page" && (
                  <div className="animate-in fade-in space-y-4">
                    {!activeBlock ? (
                      <div className="py-10 text-center">
                        <div className="bg-muted text-muted-foreground mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full">
                          <Layout className="h-5 w-5" />
                        </div>
                        <p className="text-sm font-medium">No Block Selected</p>
                        <p className="text-muted-foreground mt-1 text-xs">
                          Select a block from the canvas to edit its settings here.
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="border-border/30 flex items-center gap-3 border-b pb-4">
                          <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-xl">
                            {AVAILABLE_BLOCKS.find((b) => b.type === activeBlock.type)?.icon &&
                              React.createElement(
                                AVAILABLE_BLOCKS.find((b) => b.type === activeBlock.type)!.icon,
                                { className: "h-5 w-5" }
                              )}
                          </div>
                          <div>
                            <h3 className="text-sm font-bold">{activeBlock.title}</h3>
                            <p className="text-muted-foreground text-[11px] tracking-wider uppercase">
                              Section ID: {activeBlock.id}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <span className="text-foreground text-[12px] font-semibold">
                            Content Settings
                          </span>
                          <div className="space-y-3">
                            <div>
                              <label className="text-muted-foreground mb-1 block text-[11px]">
                                Section Title
                              </label>
                              <input
                                type="text"
                                className="border-border/40 bg-background focus:border-primary w-full rounded-md border px-3 py-1.5 text-[13px] outline-none"
                                defaultValue={activeBlock.title}
                              />
                            </div>
                            <div>
                              <label className="text-muted-foreground mb-1 block text-[11px]">
                                Subtitle / Description
                              </label>
                              <textarea
                                className="border-border/40 bg-background focus:border-primary h-20 w-full resize-none rounded-md border px-3 py-1.5 text-[13px] outline-none"
                                defaultValue="Enter the descriptive text that appears below the headline for this block."
                              ></textarea>
                            </div>
                          </div>
                        </div>

                        <div className="border-border/30 space-y-3 border-t pt-4">
                          <span className="text-foreground text-[12px] font-semibold">
                            Appearance
                          </span>

                          <div>
                            <span className="text-muted-foreground mb-2 block text-[11px]">
                              Background Color
                            </span>
                            <div className="flex gap-2">
                              <button className="bg-background border-border/40 ring-primary ring-offset-card h-6 w-6 rounded-full border shadow-sm ring-2 ring-offset-2"></button>
                              <button className="bg-muted border-border/40 h-6 w-6 rounded-full border transition-transform hover:scale-110"></button>
                              <button className="bg-primary/10 border-primary/20 h-6 w-6 rounded-full border transition-transform hover:scale-110"></button>
                              <button className="bg-foreground border-border/40 h-6 w-6 rounded-full border transition-transform hover:scale-110"></button>
                            </div>
                          </div>

                          <div className="pt-2">
                            <span className="text-muted-foreground mb-2 block text-[11px]">
                              Top Padding
                            </span>
                            <div className="flex gap-1">
                              {["None", "SM", "MD", "LG", "XL"].map((s, i) => (
                                <button
                                  key={s}
                                  className={`h-7 flex-1 rounded border text-[11px] ${i === 3 ? "bg-primary/10 border-primary text-primary" : "bg-background border-border/40 hover:bg-muted text-muted-foreground"}`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="pt-1">
                            <span className="text-muted-foreground mb-2 block text-[11px]">
                              Bottom Padding
                            </span>
                            <div className="flex gap-1">
                              {["None", "SM", "MD", "LG", "XL"].map((s, i) => (
                                <button
                                  key={s}
                                  className={`h-7 flex-1 rounded border text-[11px] ${i === 3 ? "bg-primary/10 border-primary text-primary" : "bg-background border-border/40 hover:bg-muted text-muted-foreground"}`}
                                >
                                  {s}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Legacy text formatting for post blocks (simplified) */}
                {activeTab === "block" && type === "post" && (
                  <div className="space-y-6">
                    <p className="text-muted-foreground text-sm">
                      Select text in the editor to apply formatting.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Add New Block Modal Overlay */}
      <AnimatePresence>
        {showBlockModal && (
          <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card border-border/50 flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border shadow-2xl"
            >
              <div className="border-border/30 bg-muted/20 flex items-center justify-between border-b p-5">
                <div>
                  <h2 className="text-lg font-bold">Block Library</h2>
                  <p className="text-muted-foreground text-sm">
                    Choose a section to add to your page
                  </p>
                </div>
                <Button
                  variant="ghost"
                  isIconOnly
                  onClick={() => setShowBlockModal(false)}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="overflow-y-auto p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {AVAILABLE_BLOCKS.map((block) => (
                    <div
                      key={block.type}
                      onClick={() => handleAddBlock(block.type, block.title)}
                      className="border-border/40 bg-background hover:border-primary group flex cursor-pointer flex-col rounded-xl border p-5 transition-all hover:-translate-y-1 hover:shadow-md"
                    >
                      <div className="bg-primary/10 text-primary mb-4 flex h-10 w-10 items-center justify-center rounded-lg transition-transform group-hover:scale-110">
                        <block.icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-foreground mb-1 font-semibold">{block.title}</h3>
                      <p className="text-muted-foreground text-[12px] leading-relaxed">
                        {block.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Media Library Modal Overlay */}
      <AnimatePresence>
        {showMediaModal && (
          <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center px-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-card border-border/50 flex max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border shadow-2xl"
            >
              <div className="border-border/30 bg-muted/20 flex items-center justify-between border-b p-5">
                <div>
                  <h2 className="text-lg font-bold">Media Library</h2>
                  <p className="text-muted-foreground text-sm">
                    Select an image to insert into your post
                  </p>
                </div>
                <Button
                  variant="ghost"
                  isIconOnly
                  onClick={() => setShowMediaModal(false)}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="bg-muted/10 overflow-y-auto p-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div
                      key={i}
                      onClick={() => setShowMediaModal(false)}
                      className="group bg-muted border-border/40 hover:ring-primary hover:ring-offset-background relative aspect-square cursor-pointer overflow-hidden rounded-xl border transition-all hover:ring-2 hover:ring-offset-2"
                    >
                      <img
                        src={`https://picsum.photos/seed/${i + 200}/300/300`}
                        alt={`Media ${i}`}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                        <Button
                          variant="solid"
                          size="sm"
                          className="bg-primary hover:bg-primary/90 h-8 rounded-full px-3 text-[11px]"
                        >
                          Insert
                        </Button>
                      </div>
                    </div>
                  ))}
                  <div className="border-border/60 hover:border-primary/50 hover:bg-primary/5 flex aspect-square cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed bg-transparent transition-all">
                    <div className="bg-primary/10 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                      <Plus className="h-5 w-5" />
                    </div>
                    <span className="text-muted-foreground text-[12px] font-medium">
                      Upload New
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
