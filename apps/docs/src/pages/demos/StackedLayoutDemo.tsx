import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import { Button, Card, Avatar } from "@hudbird/ui";

export default function StackedLayoutDemo() {
  const [activeTab, setActiveTab] = useState("Home");
  const tabs = ["Home", "Events", "Orders", "Broadcasts", "Settings"];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-[#121214]">
      {/* Top Navigation */}
      <nav className="border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#161618]/90">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo & Desktop Nav */}
            <div className="flex items-center gap-8">
              <div className="flex shrink-0 items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                  <svg
                    className="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <span className="font-bold text-zinc-900 dark:text-white">Acme</span>
              </div>
              <div className="hidden items-center gap-2 md:flex">
                {tabs.map((tab) => (
                  <Button
                    key={tab}
                    size="sm"
                    variant={activeTab === tab ? "solid" : "light"}
                    color={activeTab === tab ? "dark" : "secondary"}
                    radius="full"
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </Button>
                ))}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Button size="sm" variant="light" color="secondary" radius="full" isIconOnly>
                <Search size={18} />
              </Button>
              <div className="relative">
                <Button size="sm" variant="light" color="secondary" radius="full" isIconOnly>
                  <Bell size={18} />
                </Button>
                <span className="pointer-events-none absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500" />
              </div>
              <Avatar size="sm" src="https://i.pravatar.cc/150?img=47" alt="Profile" />
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <header className="border-b border-zinc-200/80 bg-white py-8 dark:border-white/[0.08] dark:bg-[#161618]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
            {activeTab}
          </h1>
          <div className="flex items-center gap-3">
            <Button size="sm" variant="bordered" color="secondary" radius="md">
              Export
            </Button>
            <Button size="sm" color="primary" radius="md">
              Create New
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card className="flex h-32 flex-col justify-center p-6 dark:border-white/[0.08] dark:bg-[#161618]">
            <span className="text-sm font-medium text-zinc-500">Total Revenue</span>
            <span className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
              $45,231.89
            </span>
          </Card>
          <Card className="flex h-32 flex-col justify-center p-6 dark:border-white/[0.08] dark:bg-[#161618]">
            <span className="text-sm font-medium text-zinc-500">Active Subscriptions</span>
            <span className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">2,314</span>
          </Card>
          <Card className="flex h-32 flex-col justify-center p-6 dark:border-white/[0.08] dark:bg-[#161618]">
            <span className="text-sm font-medium text-zinc-500">Pending Tickets</span>
            <span className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">14</span>
          </Card>
        </div>
        <Card className="flex h-96 items-center justify-center dark:border-white/[0.08] dark:bg-[#161618]">
          <span className="font-medium text-zinc-400">Main Content Area</span>
        </Card>
      </main>
    </div>
  );
}
