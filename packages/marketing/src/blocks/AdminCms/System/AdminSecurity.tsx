import React from "react";
import { Key, Smartphone } from "lucide-react";
import { Button, Card } from "@hudbird/ui";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export const AdminSecurity = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="max-w-3xl space-y-6 pb-10"
    >
      <Card className="border-border/40 bg-card space-y-5 p-5">
        <div>
          <h3 className="text-foreground mb-4 flex items-center gap-2 text-[14px] font-semibold">
            <Key className="h-4 w-4" /> Change Password
          </h3>
          <div className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-muted-foreground text-[12px] font-medium">
                Current Password
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border px-3 text-[13px] outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-muted-foreground text-[12px] font-medium">New Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border px-3 text-[13px] outline-none"
              />
            </div>
            <Button variant="outline" size="sm">
              Update Password
            </Button>
          </div>
        </div>
      </Card>

      <Card className="border-border/40 bg-card p-5">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-foreground mb-1 flex items-center gap-2 text-[14px] font-semibold">
              <Smartphone className="h-4 w-4" /> Two-Factor Authentication
            </h3>
            <p className="text-muted-foreground max-w-[400px] text-[12px]">
              Add an extra layer of security to your account by requiring a code from an
              authenticator app when you log in.
            </p>
          </div>
          <Button variant="solid" size="sm">
            Enable 2FA
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
