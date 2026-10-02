import React from "react";
import { Card } from "@/components/ui";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const AdminNotifications = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="max-w-3xl space-y-6 pb-10"
    >
      <Card className="border-border/40 bg-card overflow-hidden p-0">
        <div className="divide-border/20 divide-y">
          <div className="flex items-start justify-between p-5">
            <div className="space-y-1">
              <p className="text-foreground text-[13px] font-medium">New User Registrations</p>
              <p className="text-muted-foreground text-[12px]">
                Receive an email when a new user signs up.
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="bg-muted peer peer-checked:bg-primary h-5 w-9 rounded-full after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>
          <div className="flex items-start justify-between p-5">
            <div className="space-y-1">
              <p className="text-foreground text-[13px] font-medium">Weekly Analytics Report</p>
              <p className="text-muted-foreground text-[12px]">
                Get a weekly summary of your site's performance.
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" />
              <div className="bg-muted peer peer-checked:bg-primary h-5 w-9 rounded-full after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>
          <div className="flex items-start justify-between p-5">
            <div className="space-y-1">
              <p className="text-foreground text-[13px] font-medium">Security Alerts</p>
              <p className="text-muted-foreground text-[12px]">
                Critical notifications about unauthorized logins.
              </p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input type="checkbox" className="peer sr-only" defaultChecked />
              <div className="bg-muted peer peer-checked:bg-primary h-5 w-9 rounded-full after:absolute after:top-[2px] after:left-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
            </label>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
