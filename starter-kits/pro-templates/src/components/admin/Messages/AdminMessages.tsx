import React from "react";
import { Card, Badge, Button } from "@/components/ui";
import { Mail, Search, MessageSquare, Phone, Archive, Trash2, Eye } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const MESSAGES_DATA = [
  {
    id: "MSG-001",
    name: "Olivia Martin",
    email: "olivia@example.com",
    subject: "Partnership Inquiry",
    date: "Today, 10:42 AM",
    status: "Unread",
  },
  {
    id: "MSG-002",
    name: "Jackson Lee",
    email: "jackson.lee@example.com",
    subject: "Product Demo Request",
    date: "Today, 09:15 AM",
    status: "Unread",
  },
  {
    id: "MSG-003",
    name: "Isabella Nguyen",
    email: "isabella@example.com",
    subject: "Question about pricing",
    date: "Yesterday",
    status: "Read",
  },
  {
    id: "MSG-004",
    name: "William Kim",
    email: "will@example.com",
    subject: "Support Needed",
    date: "Yesterday",
    status: "Read",
  },
  {
    id: "MSG-005",
    name: "Sofia Davis",
    email: "sofia@example.com",
    subject: "Career Opportunities",
    date: "Oct 24, 2024",
    status: "Archived",
  },
];

export const AdminMessages = () => {
  return (
    <motion.div
      variants={fadeUp}
      initial="initial"
      animate="animate"
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="max-w-[1200px] space-y-6 pb-10"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground text-lg font-bold tracking-tight">Form Messages</h2>
          <p className="text-muted-foreground mt-1 text-[13px]">
            Manage inquiries from your contact us forms.
          </p>
        </div>
        <div className="relative">
          <Search className="text-muted-foreground/40 absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search messages..."
            className="border-border/40 bg-card focus:border-primary h-9 w-64 rounded-md border pr-3 pl-9 text-[13px] outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-border/40 bg-card p-4">
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-full">
              <Mail className="h-4 w-4" />
            </div>
            <p className="text-[13px] font-semibold">Total Messages</p>
          </div>
          <p className="text-2xl font-bold">1,248</p>
        </Card>
        <Card className="border-border/40 bg-card p-4">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100/50 text-blue-500 dark:bg-blue-500/10 dark:text-blue-400">
              <MessageSquare className="h-4 w-4" />
            </div>
            <p className="text-[13px] font-semibold">Unread</p>
          </div>
          <p className="text-2xl font-bold">24</p>
        </Card>
        <Card className="border-border/40 bg-card p-4">
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100/50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400">
              <Phone className="h-4 w-4" />
            </div>
            <p className="text-[13px] font-semibold">Followed Up</p>
          </div>
          <p className="text-2xl font-bold">892</p>
        </Card>
        <Card className="border-border/40 bg-card p-4">
          <div className="mb-2 flex items-center gap-3">
            <div className="bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full">
              <Archive className="h-4 w-4" />
            </div>
            <p className="text-[13px] font-semibold">Archived</p>
          </div>
          <p className="text-2xl font-bold">332</p>
        </Card>
      </div>

      <Card className="border-border/40 bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead className="border-border/30 bg-muted/20 text-muted-foreground/70 border-b">
              <tr>
                <th className="w-12 px-5 py-3.5 font-medium"></th>
                <th className="px-5 py-3.5 font-medium">Sender</th>
                <th className="px-5 py-3.5 font-medium">Subject</th>
                <th className="px-5 py-3.5 font-medium">Date Received</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 text-right font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-border/20 divide-y">
              {MESSAGES_DATA.map((msg, i) => (
                <tr
                  key={i}
                  className={`group hover:bg-muted/20 transition-colors ${msg.status === "Unread" ? "bg-primary/5" : ""}`}
                >
                  <td className="px-5 py-4">
                    <div className="bg-muted text-muted-foreground flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold">
                      {msg.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p
                      className={`text-foreground font-medium ${msg.status === "Unread" ? "font-semibold" : ""}`}
                    >
                      {msg.name}
                    </p>
                    <p className="text-muted-foreground text-[12px]">{msg.email}</p>
                  </td>
                  <td className="px-5 py-4">
                    <p
                      className={`text-foreground ${msg.status === "Unread" ? "font-semibold" : ""}`}
                    >
                      {msg.subject}
                    </p>
                  </td>
                  <td className="text-muted-foreground px-5 py-4 whitespace-nowrap">{msg.date}</td>
                  <td className="px-5 py-4">
                    <Badge
                      variant="flat"
                      className={`h-5 px-2 text-[10px] ${
                        msg.status === "Unread"
                          ? "bg-primary/10 text-primary"
                          : msg.status === "Archived"
                            ? "bg-muted text-muted-foreground"
                            : "bg-zinc-100/50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400"
                      }`}
                    >
                      {msg.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <Button variant="outline" size="sm" isIconOnly className="h-7 w-7">
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="outline" size="sm" isIconOnly className="h-7 w-7">
                        <Trash2 className="h-3.5 w-3.5 text-rose-500" />
                      </Button>
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
