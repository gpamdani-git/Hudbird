import React from "react";
import { Palette, Layout, Type, MousePointer2, Image as ImageIcon } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const AdminAppearance = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="custom-scrollbar flex h-[calc(100vh-160px)] flex-col gap-6 overflow-y-auto pb-10"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-lg font-bold tracking-tight">Appearance</h2>
          <p className="text-muted-foreground mt-1 text-[13px]">
            Customize the visual identity of your site.
          </p>
        </div>
        <Button variant="solid" size="sm" className="gap-1.5">
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Colors */}
        <Card className="border-border/40 bg-card space-y-5 p-5">
          <div className="border-border/30 flex items-center gap-2 border-b pb-3">
            <Palette className="text-muted-foreground h-4 w-4" />
            <h3 className="text-[14px] font-semibold">Brand Colors</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground text-[13px] font-medium">Primary Color</p>
                <p className="text-muted-foreground text-[11px]">
                  Used for buttons and active states.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="border-border/40 h-8 w-8 rounded-full border bg-blue-600"></div>
                <span className="font-mono text-[12px] uppercase">#2563EB</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground text-[13px] font-medium">Background (Light)</p>
                <p className="text-muted-foreground text-[11px]">The default page background.</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="border-border/40 h-8 w-8 rounded-full border bg-white"></div>
                <span className="font-mono text-[12px] uppercase">#FFFFFF</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Typography */}
        <Card className="border-border/40 bg-card space-y-5 p-5">
          <div className="border-border/30 flex items-center gap-2 border-b pb-3">
            <Type className="text-muted-foreground h-4 w-4" />
            <h3 className="text-[14px] font-semibold">Typography</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-muted-foreground text-[12px] font-medium">
                Heading Font (h1-h6)
              </label>
              <select className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border px-3 text-[13px] outline-none">
                <option>Inter (Sans Serif)</option>
                <option>Playfair Display (Serif)</option>
                <option>Geist (Sans Serif)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-muted-foreground text-[12px] font-medium">Body Font</label>
              <select className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border px-3 text-[13px] outline-none">
                <option>Inter (Sans Serif)</option>
                <option>Roboto (Sans Serif)</option>
                <option>Geist (Sans Serif)</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Logo & Branding */}
        <Card className="border-border/40 bg-card space-y-5 p-5">
          <div className="border-border/30 flex items-center gap-2 border-b pb-3">
            <ImageIcon className="text-muted-foreground h-4 w-4" />
            <h3 className="text-[14px] font-semibold">Logo & Favicon</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-muted-foreground text-[12px] font-medium">Site Logo</label>
              <div className="flex items-center gap-4">
                <div className="border-border/50 bg-muted/20 flex h-12 w-12 items-center justify-center rounded-lg border-2 border-dashed">
                  <ImageIcon className="text-muted-foreground/40 h-5 w-5" />
                </div>
                <Button variant="outline" size="sm">
                  Upload Logo
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-muted-foreground text-[12px] font-medium">
                Favicon (Browser Icon)
              </label>
              <div className="flex items-center gap-4">
                <div className="border-border/40 bg-background flex h-8 w-8 items-center justify-center rounded border p-1">
                  <img
                    src="/assets/new-logo/hudbirdui-icon-black.svg"
                    alt="Favicon"
                    className="h-full w-full object-contain dark:hidden"
                  />
                  <img
                    src="/assets/new-logo/hudbirdui-icon-white.svg"
                    alt="Favicon"
                    className="hidden h-full w-full object-contain dark:block"
                  />
                </div>
                <Button variant="outline" size="sm">
                  Upload Icon
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Layout */}
        <Card className="border-border/40 bg-card space-y-5 p-5">
          <div className="border-border/30 flex items-center gap-2 border-b pb-3">
            <Layout className="text-muted-foreground h-4 w-4" />
            <h3 className="text-[14px] font-semibold">Layout Structure</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-muted-foreground text-[12px] font-medium">
                Container Width
              </label>
              <select className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border px-3 text-[13px] outline-none">
                <option>Max Width (1200px)</option>
                <option>Full Width (Fluid)</option>
                <option>Narrow (800px)</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-muted-foreground text-[12px] font-medium">
                Border Radius (Global)
              </label>
              <select className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border px-3 text-[13px] outline-none">
                <option>Rounded (0.5rem)</option>
                <option>Pill (999px)</option>
                <option>Sharp (0px)</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
