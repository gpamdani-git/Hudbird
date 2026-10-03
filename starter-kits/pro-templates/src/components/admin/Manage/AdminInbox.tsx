import React from "react";
import { MessageSquare, AlertCircle, CheckCircle2, Info, Star } from "lucide-react";
import { Button, Card, Badge } from "@/components/ui";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const MOCK_NOTIFICATIONS = [
  {
    id: 1,
    type: "comment",
    title: "New comment on 'Next.js Architecture'",
    desc: "Sarah left a comment: 'This is exactly what I was looking for!'",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 2,
    type: "alert",
    title: "Server CPU spike detected",
    desc: "Production server hit 90% load for 5 minutes.",
    time: "5 hours ago",
    unread: true,
  },
  {
    id: 3,
    type: "success",
    title: "Weekly backup completed",
    desc: "Database and media files successfully backed up to S3.",
    time: "1 day ago",
    unread: false,
  },
  {
    id: 4,
    type: "info",
    title: "System update available",
    desc: "Hudbird CMS v2.4.1 is now available for download.",
    time: "2 days ago",
    unread: false,
  },
  {
    id: 5,
    type: "review",
    title: "New 5-star review received",
    desc: "John Doe rated your plugin 5 stars.",
    time: "3 days ago",
    unread: false,
  },
];

export const AdminInbox = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="visible"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="max-w-4xl space-y-6 pb-10"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-lg font-bold tracking-tight">Notifications Inbox</h2>
          <p className="text-muted-foreground mt-1 text-[13px]">
            View and manage all your alerts and messages.
          </p>
        </div>
        <Button variant="outline" size="sm">
          Mark all as read
        </Button>
      </div>

      <Card className="border-border/40 bg-card overflow-hidden p-0">
        <div className="divide-border/20 divide-y">
          {MOCK_NOTIFICATIONS.map((notif) => (
            <div
              key={notif.id}
              className={`hover:bg-muted/30 flex cursor-pointer gap-4 p-5 transition-colors ${notif.unread ? "bg-primary/5" : ""}`}
            >
              <div
                className={`mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                  notif.type === "comment"
                    ? "bg-zinc-100/50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400"
                    : notif.type === "alert"
                      ? "bg-zinc-100/50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400"
                      : notif.type === "success"
                        ? "bg-zinc-100/50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400"
                        : notif.type === "review"
                          ? "bg-zinc-100/50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400"
                          : "bg-muted text-muted-foreground"
                }`}
              >
                {notif.type === "comment" && <MessageSquare className="h-4 w-4" />}
                {notif.type === "alert" && <AlertCircle className="h-4 w-4" />}
                {notif.type === "success" && <CheckCircle2 className="h-4 w-4" />}
                {notif.type === "info" && <Info className="h-4 w-4" />}
                {notif.type === "review" && <Star className="h-4 w-4" />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between gap-4">
                  <p
                    className={`text-[14px] leading-tight ${notif.unread ? "text-foreground font-semibold" : "text-foreground font-medium"}`}
                  >
                    {notif.title}
                  </p>
                  <span className="text-muted-foreground text-[11px] whitespace-nowrap">
                    {notif.time}
                  </span>
                </div>
                <p className="text-muted-foreground text-[13px]">{notif.desc}</p>
              </div>
              {notif.unread && (
                <div className="flex items-center justify-center px-2">
                  <span className="bg-primary h-2 w-2 rounded-full"></span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
};
