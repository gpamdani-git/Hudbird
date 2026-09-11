import React, { useState } from "react";
import { Search, Bell } from "lucide-react";

export default function StackedLayoutDemo() {
  const [activeTab, setActiveTab] = useState("Home");
  const tabs = ["Home", "Events", "Orders", "Broadcasts", "Settings"];

  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-zinc-950">
      {/* Top Navigation */}
      <nav className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
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
              <div className="hidden items-center gap-6 md:flex">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm font-medium transition-colors ${activeTab === tab ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                <Search size={20} />
              </button>
              <button className="relative text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-rose-500"></span>
              </button>
              <div className="h-8 w-8 overflow-hidden rounded-full border border-zinc-300 bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800">
                <img
                  src="https://i.pravatar.cc/150?img=47"
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <header className="border-b border-zinc-200 bg-white py-8 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
            {activeTab}
          </h1>
          <div className="flex items-center gap-3">
            <button className="rounded-lg border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-800/80">
              Export
            </button>
            <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
              Create New
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex h-32 flex-col justify-center rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-sm font-medium text-zinc-500">Total Revenue</span>
            <span className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">
              $45,231.89
            </span>
          </div>
          <div className="flex h-32 flex-col justify-center rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-sm font-medium text-zinc-500">Active Subscriptions</span>
            <span className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">2,314</span>
          </div>
          <div className="flex h-32 flex-col justify-center rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <span className="text-sm font-medium text-zinc-500">Pending Tickets</span>
            <span className="mt-2 text-2xl font-bold text-zinc-900 dark:text-white">14</span>
          </div>
        </div>
        <div className="flex h-96 items-center justify-center rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <span className="font-medium text-zinc-400">Main Content Area</span>
        </div>
      </main>
    </div>
  );
}
