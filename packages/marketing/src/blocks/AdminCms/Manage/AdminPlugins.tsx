import React, { useState } from "react";
import {
  Plug,
  Search,
  CheckCircle2,
  XCircle,
  Settings2,
  Trash,
  Download,
  Star,
  ArrowLeft,
} from "lucide-react";
import { Button, Card, Badge } from "@hudbird/ui";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const PLUGINS = [
  {
    id: 1,
    name: "SEO Optimizer Pro",
    desc: "Advanced SEO tools, meta tags, and schema markup generator.",
    author: "Hudbird",
    status: "Active",
    version: "2.1.0",
  },
  {
    id: 2,
    name: "WooCommerce",
    desc: "The most popular e-commerce solution.",
    author: "Automattic",
    status: "Inactive",
    version: "8.6.1",
  },
  {
    id: 3,
    name: "Contact Form 7",
    desc: "Simple and flexible contact forms.",
    author: "Takayuki Miyoshi",
    status: "Active",
    version: "5.8.7",
  },
  {
    id: 4,
    name: "Elementor",
    desc: "The leading website builder.",
    author: "Elementor.com",
    status: "Update Available",
    version: "3.20.0",
  },
];

const MARKETPLACE_PLUGINS = [
  {
    id: 101,
    name: "Jetpack Security",
    desc: "Keep your site safe with automated backups and malware scanning.",
    author: "Automattic",
    rating: 4.8,
    installs: "5M+",
  },
  {
    id: 102,
    name: "Yoast SEO",
    desc: "Improve your WordPress SEO: Write better content and have a fully optimized site.",
    author: "Team Yoast",
    rating: 4.9,
    installs: "5M+",
  },
  {
    id: 103,
    name: "UpdraftPlus",
    desc: "Backup and restore: take backups locally, or backup to Amazon S3, Dropbox, Google Drive.",
    author: "UpdraftPlus.Com",
    rating: 4.7,
    installs: "3M+",
  },
  {
    id: 104,
    name: "W3 Total Cache",
    desc: "Improve SEO and user experience by increasing website performance.",
    author: "BoldGrid",
    rating: 4.5,
    installs: "1M+",
  },
  {
    id: 105,
    name: "Smush",
    desc: "Compress, Image Optimizer, Lazy Load, WebP Images.",
    author: "WPMU DEV",
    rating: 4.8,
    installs: "1M+",
  },
  {
    id: 106,
    name: "Wordfence Security",
    desc: "Firewall, Malware Scan, and Login Security.",
    author: "Wordfence",
    rating: 4.9,
    installs: "4M+",
  },
];

export const AdminPlugins = () => {
  const [isAddingPlugin, setIsAddingPlugin] = useState(false);

  if (isAddingPlugin) {
    return (
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-6 pb-10"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsAddingPlugin(false)}
            className="border-border/40 bg-card text-muted-foreground hover:bg-muted/50 hover:text-foreground flex h-8 w-8 items-center justify-center rounded-lg border transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h2 className="text-lg font-bold tracking-tight">Add New Plugin</h2>
            <p className="text-muted-foreground mt-0.5 text-[13px]">
              Browse and install plugins from the marketplace.
            </p>
          </div>
        </div>

        <div className="border-border/30 flex items-center justify-between border-b pb-4">
          <div className="flex gap-2">
            <Button variant="solid" size="sm" className="h-8 rounded-full text-[12px]">
              Featured
            </Button>
            <Button variant="ghost" size="sm" className="bg-muted/30 h-8 rounded-full text-[12px]">
              Popular
            </Button>
            <Button variant="ghost" size="sm" className="bg-muted/30 h-8 rounded-full text-[12px]">
              Recommended
            </Button>
          </div>
          <div className="relative w-full max-w-[280px]">
            <Search className="text-muted-foreground/40 absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
            <input
              type="search"
              placeholder="Search plugins..."
              className="border-border/40 bg-card focus:border-primary h-9 w-full rounded-full border pr-3 pl-9 text-[13px] outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MARKETPLACE_PLUGINS.map((plugin) => (
            <Card
              key={plugin.id}
              className="border-border/40 bg-card hover:border-primary/50 group flex flex-col p-5 transition-colors"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="bg-muted border-border/40 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary flex h-12 w-12 items-center justify-center rounded-xl border transition-colors">
                  <Plug className="h-6 w-6" />
                </div>
                <Button variant="outline" size="sm" className="h-8 text-[12px]">
                  Install Now
                </Button>
              </div>
              <h3 className="text-foreground text-[15px] leading-tight font-bold">{plugin.name}</h3>
              <p className="text-muted-foreground mt-1 text-[12px]">By {plugin.author}</p>
              <p className="text-muted-foreground mt-3 line-clamp-2 flex-1 text-[13px]">
                {plugin.desc}
              </p>
              <div className="border-border/30 text-muted-foreground mt-5 flex items-center gap-4 border-t pt-4 text-[12px]">
                <div className="flex items-center gap-1">
                  <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                  <span className="text-foreground font-medium">{plugin.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-3.5 w-3.5" />
                  {plugin.installs} Active Installs
                </div>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="flex flex-col gap-6 pb-10"
    >
      <div className="flex shrink-0 items-center justify-between">
        <div className="relative w-full max-w-[280px]">
          <Search className="text-muted-foreground/40 absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
          <input
            type="search"
            placeholder="Search installed plugins..."
            className="border-border/40 bg-card focus:border-primary h-9 w-full rounded-lg border pr-3 pl-9 text-[13px] outline-none"
          />
        </div>
        <Button
          variant="solid"
          size="sm"
          className="gap-1.5"
          onClick={() => setIsAddingPlugin(true)}
        >
          <Plug className="h-3.5 w-3.5" />
          Add New Plugin
        </Button>
      </div>

      <Card className="border-border/40 bg-card overflow-hidden">
        <div className="custom-scrollbar overflow-x-auto">
          <table className="w-full text-left text-[13px] whitespace-nowrap">
            <thead className="border-border/30 bg-muted/30 sticky top-0 z-10 border-b backdrop-blur-md">
              <tr>
                <th className="text-muted-foreground px-5 py-3 font-medium">Plugin Name</th>
                <th className="text-muted-foreground px-5 py-3 font-medium">Description</th>
                <th className="text-muted-foreground px-5 py-3 font-medium">Status</th>
                <th className="text-muted-foreground px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-border/20 divide-y">
              {PLUGINS.map((plugin) => (
                <tr
                  key={plugin.id}
                  className={`group transition-colors ${plugin.status === "Active" ? "bg-primary/5 hover:bg-primary/10" : "hover:bg-muted/10"}`}
                >
                  <td className="px-5 py-4 align-top">
                    <div className="text-foreground text-[14px] font-semibold">{plugin.name}</div>
                    <div className="text-muted-foreground mt-1 text-[12px]">
                      Version {plugin.version} | By {plugin.author}
                    </div>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <div className="text-muted-foreground max-w-[400px] truncate">
                      {plugin.desc}
                    </div>
                    <div className="mt-2 flex items-center gap-4">
                      <button className="text-primary text-[12px] hover:underline">
                        View details
                      </button>
                      <button className="text-primary text-[12px] hover:underline">
                        Documentation
                      </button>
                    </div>
                  </td>
                  <td className="px-5 py-4 align-top">
                    <Badge
                      variant="flat"
                      className={` ${plugin.status === "Active" ? "bg-emerald-500/10 text-emerald-500" : ""} ${plugin.status === "Inactive" ? "bg-muted/50 text-muted-foreground" : ""} ${plugin.status === "Update Available" ? "bg-amber-500/10 text-amber-500" : ""} `}
                    >
                      {plugin.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right align-top">
                    <div className="flex items-center justify-end gap-3">
                      {plugin.status === "Inactive" ? (
                        <button className="text-primary flex items-center gap-1 text-[13px] font-medium hover:underline">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Activate
                        </button>
                      ) : (
                        <button className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-[13px] font-medium hover:underline">
                          <XCircle className="h-3.5 w-3.5" /> Deactivate
                        </button>
                      )}
                      {plugin.status === "Inactive" && (
                        <button className="flex items-center gap-1 text-[13px] font-medium text-rose-500 hover:underline">
                          <Trash className="h-3.5 w-3.5" /> Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
};
