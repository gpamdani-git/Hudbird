import React, { useState } from "react";
import { Search, Plus, MoreHorizontal, Mail, Shield, UserX, CheckCircle2 } from "lucide-react";
import { Button, Card, Badge, Avatar } from "@/components/ui";
import { motion, AnimatePresence } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const INITIAL_USERS = [
  {
    id: 1,
    name: "Dani Akbar",
    email: "dani@hudbird.com",
    role: "Administrator",
    status: "Active",
    lastActive: "Just now",
  },
  {
    id: 2,
    name: "Sarah Connor",
    email: "sarah@hudbird.com",
    role: "Editor",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@doe.com",
    role: "Author",
    status: "Invited",
    lastActive: "Never",
  },
  {
    id: 4,
    name: "Alex Smith",
    email: "alex@smith.com",
    role: "Contributor",
    status: "Suspended",
    lastActive: "1 week ago",
  },
];

export const AdminUsers = () => {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [isInviting, setIsInviting] = useState(false);

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
            placeholder="Search users..."
            className="border-border/40 bg-card focus:border-primary h-9 w-full rounded-lg border pr-3 pl-9 text-[13px] outline-none"
          />
        </div>
        <Button
          variant="solid"
          size="sm"
          className="gap-1.5"
          onClick={() => setIsInviting(!isInviting)}
        >
          <Plus className="h-3.5 w-3.5" />
          Invite User
        </Button>
      </div>

      <AnimatePresence>
        {isInviting && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <Card className="border-border/40 bg-card p-5">
              <h3 className="mb-4 text-[14px] font-semibold">Invite New User</h3>
              <div className="flex items-end gap-4">
                <div className="flex-1 space-y-1.5">
                  <label className="text-muted-foreground text-[12px] font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border px-3 text-[13px] outline-none"
                  />
                </div>
                <div className="w-[200px] space-y-1.5">
                  <label className="text-muted-foreground text-[12px] font-medium">Role</label>
                  <select className="border-border/40 bg-background focus:border-primary h-9 w-full rounded-md border px-3 text-[13px] outline-none">
                    <option>Administrator</option>
                    <option>Editor</option>
                    <option>Author</option>
                    <option>Contributor</option>
                  </select>
                </div>
                <Button variant="solid" className="h-9 gap-1.5">
                  <Mail className="h-3.5 w-3.5" />
                  Send Invite
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Card className="border-border/40 bg-card overflow-hidden">
        <div className="custom-scrollbar overflow-x-auto">
          <table className="w-full text-left text-[13px] whitespace-nowrap">
            <thead className="border-border/30 bg-muted/30 sticky top-0 z-10 border-b backdrop-blur-md">
              <tr>
                <th className="text-muted-foreground px-5 py-3 font-medium">User</th>
                <th className="text-muted-foreground px-5 py-3 font-medium">Role</th>
                <th className="text-muted-foreground px-5 py-3 font-medium">Status</th>
                <th className="text-muted-foreground px-5 py-3 font-medium">Last Active</th>
                <th className="text-muted-foreground px-5 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-border/20 divide-y">
              {users.map((user) => (
                <tr key={user.id} className="group hover:bg-muted/10 transition-colors">
                  <td className="px-5 py-3 align-middle">
                    <div className="flex items-center gap-3">
                      <Avatar name={user.name} size="sm" />
                      <div>
                        <p className="text-foreground font-medium">{user.name}</p>
                        <p className="text-muted-foreground text-[12px]">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 align-middle">
                    <div className="flex items-center gap-1.5">
                      <Shield className="text-muted-foreground/50 h-3.5 w-3.5" />
                      {user.role}
                    </div>
                  </td>
                  <td className="px-5 py-3 align-middle">
                    <Badge
                      variant="flat"
                      className={` ${user.status === "Active" ? "bg-zinc-100/50 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400" : ""} ${user.status === "Invited" ? "bg-zinc-100/50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400" : ""} ${user.status === "Suspended" ? "bg-zinc-100/50 text-rose-500 dark:bg-rose-500/10 dark:text-rose-400" : ""} `}
                    >
                      {user.status === "Active" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                      {user.status}
                    </Badge>
                  </td>
                  <td className="text-muted-foreground px-5 py-3 align-middle">
                    {user.lastActive}
                  </td>
                  <td className="px-5 py-3 text-right align-middle">
                    <div className="flex items-center justify-end gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                      <button className="text-primary text-[12px] font-medium hover:underline">
                        Edit
                      </button>
                      <button className="text-[12px] font-medium text-rose-500 hover:underline">
                        Suspend
                      </button>
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
