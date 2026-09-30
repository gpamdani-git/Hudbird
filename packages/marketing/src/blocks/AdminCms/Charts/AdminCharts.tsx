import React from "react";
import { Card, AreaChart, BarChart, Tabs, Tab } from "@hudbird/ui";

export const AdminCharts = () => {
  const trafficData = [
    { date: "Jan", pageViews: 4000, uniqueVisitors: 2400 },
    { date: "Feb", pageViews: 3000, uniqueVisitors: 1398 },
    { date: "Mar", pageViews: 2000, uniqueVisitors: 9800 },
    { date: "Apr", pageViews: 2780, uniqueVisitors: 3908 },
    { date: "May", pageViews: 1890, uniqueVisitors: 4800 },
    { date: "Jun", pageViews: 2390, uniqueVisitors: 3800 },
    { date: "Jul", pageViews: 3490, uniqueVisitors: 4300 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 3000 },
    { month: "Mar", revenue: 2000 },
    { month: "Apr", revenue: 2780 },
    { month: "May", revenue: 1890 },
    { month: "Jun", revenue: 2390 },
    { month: "Jul", revenue: 3490 },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <Card className="bg-card border-border/40 flex h-full flex-col p-6">
        <div className="mb-3 flex shrink-0 items-center justify-between">
          <h3 className="text-sm font-semibold tracking-tight">Traffic Overview</h3>
          <Tabs size="sm" radius="full" variant="solid" defaultSelectedKey="7d">
            <Tab title="7D" tabKey="7d" />
            <Tab title="30D" tabKey="30d" />
            <Tab title="1Y" tabKey="1y" />
          </Tabs>
        </div>
        <div className="min-h-[360px] flex-1">
          <AreaChart
            data={trafficData}
            index="date"
            categories={["pageViews", "uniqueVisitors"]}
            colors={["var(--color-primary-500, #7c3aed)", "var(--color-success-500, #22c55e)"]}
            showLegend={true}
            className="h-full"
          />
        </div>
      </Card>

      <Card className="bg-card border-border/40 flex h-full flex-col p-6">
        <div className="mb-3 flex shrink-0 items-center justify-between">
          <h3 className="text-sm font-semibold tracking-tight">Revenue</h3>
        </div>
        <div className="min-h-[360px] flex-1">
          <BarChart
            data={revenueData}
            index="month"
            categories={["revenue"]}
            colors={["var(--color-primary-500, #7c3aed)"]}
            showLegend={false}
            className="h-full"
          />
        </div>
      </Card>
    </div>
  );
};
