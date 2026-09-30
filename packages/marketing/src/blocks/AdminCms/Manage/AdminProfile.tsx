import React from "react";
import { User, Mail, Shield, Camera, Save } from "lucide-react";
import { Button, Card, Avatar } from "@hudbird/ui";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const AdminProfile = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="max-w-3xl space-y-6 pb-10"
    >
      {/* Profile Header */}
      <Card className="border-border/40 bg-card relative flex flex-col items-center gap-6 overflow-hidden p-6 sm:flex-row sm:items-start">
        {/* Cover Graphic */}
        <div className="from-primary/20 via-primary/5 border-border/30 absolute top-0 right-0 left-0 h-24 border-b bg-gradient-to-r to-transparent"></div>

        <div className="relative pt-6">
          <div className="group relative">
            <Avatar
              name="Admin User"
              size="xl"
              className="border-card h-24 w-24 border-4 text-2xl shadow-sm"
            />
            <button className="bg-background border-border/40 text-muted-foreground hover:text-foreground hover:border-primary absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border shadow-sm transition-colors group-hover:scale-105">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="relative flex-1 pt-8 text-center sm:pt-10 sm:text-left">
          <h2 className="text-foreground text-xl font-bold tracking-tight">Admin User</h2>
          <p className="text-muted-foreground mt-0.5 text-[13px]">Super Administrator</p>
          <div className="mt-4 flex items-center justify-center gap-4 sm:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-2.5 py-1 text-[12px] font-medium text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> Active Status
            </span>
          </div>
        </div>
      </Card>

      {/* Profile Details Form */}
      <Card className="border-border/40 bg-card space-y-6 p-6">
        <h3 className="text-foreground border-border/30 border-b pb-3 text-[15px] font-semibold">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-1.5">
            <label className="text-foreground text-[13px] font-medium">First Name</label>
            <input
              type="text"
              defaultValue="Admin"
              className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border px-3 text-[13px] outline-none"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-foreground text-[13px] font-medium">Last Name</label>
            <input
              type="text"
              defaultValue="User"
              className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border px-3 text-[13px] outline-none"
            />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-foreground text-[13px] font-medium">Email Address</label>
            <div className="relative">
              <Mail className="text-muted-foreground/40 absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
              <input
                type="email"
                defaultValue="admin@hudbird.com"
                className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border pr-3 pl-9 text-[13px] outline-none"
              />
            </div>
            <p className="text-muted-foreground mt-1.5 text-[11px]">
              This email is used for login and notifications.
            </p>
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-foreground text-[13px] font-medium">Bio</label>
            <textarea
              rows={3}
              placeholder="Write a short bio about yourself..."
              className="border-border/40 bg-background focus:border-primary w-full resize-none rounded-md border p-3 text-[13px] outline-none"
            ></textarea>
          </div>
        </div>

        <div className="border-border/30 flex justify-end border-t pt-4">
          <Button variant="solid" className="gap-2">
            <Save className="h-3.5 w-3.5" />
            Save Profile
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
