import React from "react";
import { Save, Globe, Mail } from "lucide-react";
import { Button, Card } from "@hudbird/ui";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const AdminSettings = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="max-w-3xl space-y-6 pb-10"
    >
      <Card className="border-border/40 bg-card space-y-5 p-5">
        <div className="space-y-1.5">
          <label className="text-foreground text-[13px] font-medium">Site Title</label>
          <input
            type="text"
            defaultValue="Hudbird CMS"
            className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border px-3 text-[13px] outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-foreground text-[13px] font-medium">Tagline</label>
          <input
            type="text"
            defaultValue="The minimal modern CMS"
            className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border px-3 text-[13px] outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-foreground text-[13px] font-medium">Site Address (URL)</label>
          <div className="relative">
            <Globe className="text-muted-foreground/40 absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
            <input
              type="text"
              defaultValue="https://hudbird.com"
              className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border pr-3 pl-9 text-[13px] outline-none"
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <label className="text-foreground text-[13px] font-medium">Administration Email</label>
          <div className="relative">
            <Mail className="text-muted-foreground/40 absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
            <input
              type="email"
              defaultValue="admin@hudbird.com"
              className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border pr-3 pl-9 text-[13px] outline-none"
            />
          </div>
        </div>
        <div className="pt-2">
          <Button variant="solid" className="gap-2">
            <Save className="h-3.5 w-3.5" />
            Save Changes
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
