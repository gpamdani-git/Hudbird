import React from "react";
import { AdminStats } from "@/components/admin/Stats/AdminStats";
import { AdminCharts } from "@/components/admin/Charts/AdminCharts";
import { AdminTable } from "@/components/admin/Table/AdminTable";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-white">Dashboard Overview</h1>
        <p className="mt-1 text-zinc-500 dark:text-zinc-400">
          Welcome back! Here's what's happening with your account today.
        </p>
      </div>

      <AdminStats />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="col-span-1 lg:col-span-2">
          <AdminCharts />
        </div>
        <div className="col-span-1 rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
          <h3 className="mb-4 font-medium text-zinc-900 dark:text-white">Recent Activity</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">
                    New subscription created
                  </p>
                  <p className="text-xs text-zinc-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-medium text-zinc-900 dark:text-white">Recent Users</h2>
        <AdminTable />
      </div>
    </div>
  );
}
