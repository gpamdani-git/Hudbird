import React, { useState } from "react";
import { Search, Bell } from "lucide-react";

export default function StackedLayoutDemo() {
  const [activeTab, setActiveTab] = useState("Home");
  const tabs = ["Home", "Events", "Orders", "Broadcasts", "Settings"];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* Top Navigation */}
      <nav className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Desktop Nav */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                </div>
                <span className="font-bold text-zinc-900 dark:text-white">Acme</span>
              </div>
              <div className="hidden md:flex items-center gap-6">
                {tabs.map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`text-sm font-medium transition-colors ${activeTab === tab ? 'text-zinc-900 dark:text-white' : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300'}`}
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
              <button className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white relative">
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden border border-zinc-300 dark:border-zinc-700">
                <img src="https://i.pravatar.cc/150?img=47" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <header className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
            {activeTab}
          </h1>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-colors shadow-sm">
              Export
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm">
              Create New
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="h-32 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 flex flex-col justify-center">
            <span className="text-sm font-medium text-zinc-500">Total Revenue</span>
            <span className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">$45,231.89</span>
          </div>
          <div className="h-32 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 flex flex-col justify-center">
            <span className="text-sm font-medium text-zinc-500">Active Subscriptions</span>
            <span className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">2,314</span>
          </div>
          <div className="h-32 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm p-6 flex flex-col justify-center">
            <span className="text-sm font-medium text-zinc-500">Pending Tickets</span>
            <span className="text-2xl font-bold text-zinc-900 dark:text-white mt-2">14</span>
          </div>
        </div>
        <div className="h-96 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-center">
           <span className="text-zinc-400 font-medium">Main Content Area</span>
        </div>
      </main>
    </div>
  );
}
