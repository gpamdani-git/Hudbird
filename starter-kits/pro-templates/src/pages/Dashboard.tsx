import React from "react";
import { AdminStats } from "@/components/admin/Stats/AdminStats";
import { AdminCharts } from "@/components/admin/Charts/AdminCharts";
import { AdminTable } from "@/components/admin/Table/AdminTable";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Welcome back! Here's what's happening with your account today.
        </p>
      </div>
      
      <AdminStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <AdminCharts />
        </div>
        <div className="col-span-1 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 bg-white dark:bg-zinc-900/50">
          <h3 className="font-medium text-zinc-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">New subscription created</p>
                  <p className="text-xs text-zinc-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-lg font-medium text-zinc-900 dark:text-white mb-4">Recent Users</h2>
        <AdminTable />
      </div>
    </div>
  );
}
