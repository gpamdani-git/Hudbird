import React from "react";
import { Card, AreaChart, BarChart } from "@hudbird/ui";
import { TrendingUp, TrendingDown, Globe, Monitor, Smartphone, Tablet } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.06 } },
};

const pageViewsData = [
  { date: "Mon", views: 2400, sessions: 1800 },
  { date: "Tue", views: 3200, sessions: 2100 },
  { date: "Wed", views: 2800, sessions: 1900 },
  { date: "Thu", views: 4100, sessions: 2800 },
  { date: "Fri", views: 3600, sessions: 2400 },
  { date: "Sat", views: 2100, sessions: 1500 },
  { date: "Sun", views: 1800, sessions: 1200 },
];

const sourceData = [
  { source: "Organic", visitors: 12400 },
  { source: "Direct", visitors: 8200 },
  { source: "Social", visitors: 6100 },
  { source: "Referral", visitors: 3800 },
  { source: "Email", visitors: 2200 },
];

const deviceData = [
  { name: "Desktop", value: 58 },
  { name: "Mobile", value: 32 },
  { name: "Tablet", value: 10 },
];

const topPages = [
  { path: "/blog/design-systems", views: 4521, change: "+12.3%" },
  { path: "/docs/getting-started", views: 3892, change: "+8.7%" },
  { path: "/templates/saas", views: 2741, change: "+23.1%" },
  { path: "/components/button", views: 2103, change: "-2.4%" },
  { path: "/blog/react-patterns", views: 1847, change: "+5.6%" },
];

const MetricCard = ({
  label,
  value,
  change,
  positive,
  index,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  index: number;
}) => (
  <motion.div variants={fadeUp} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
    <Card className="bg-card border-border/30 group hover:border-border/60 p-4 transition-colors">
      <p className="text-muted-foreground/50 mb-2 text-[11px] font-semibold tracking-wider uppercase">
        {label}
      </p>
      <div className="flex items-end justify-between">
        <span className="text-2xl font-bold tracking-tight">{value}</span>
        <span
          className={`flex items-center gap-0.5 text-[11px] font-semibold ${
            positive ? "text-emerald-500" : "text-rose-500"
          }`}
        >
          {positive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {change}
        </span>
      </div>
    </Card>
  </motion.div>
);

const DeviceIcon = ({ name }: { name: string }) => {
  switch (name) {
    case "Desktop":
      return <Monitor className="h-3.5 w-3.5" />;
    case "Mobile":
      return <Smartphone className="h-3.5 w-3.5" />;
    case "Tablet":
      return <Tablet className="h-3.5 w-3.5" />;
    default:
      return <Globe className="h-3.5 w-3.5" />;
  }
};

export const AdminAnalytics = () => {
  return (
    <motion.div className="space-y-5" initial="initial" animate="animate" variants={stagger}>
      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MetricCard label="Page Views" value="32,841" change="+14.2%" positive index={0} />
        <MetricCard label="Sessions" value="18,392" change="+8.7%" positive index={1} />
        <MetricCard label="Avg. Duration" value="3m 42s" change="+5.1%" positive index={2} />
        <MetricCard label="Bounce Rate" value="42.3%" change="-3.2%" positive={false} index={3} />
      </div>

      {/* Main Chart */}
      <motion.div variants={fadeUp} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
        <Card className="bg-card border-border/30 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Page Views & Sessions</h3>
              <p className="text-muted-foreground/50 mt-0.5 text-[11px]">Last 7 days</p>
            </div>
            <div className="flex gap-4 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="bg-primary h-2 w-2 rounded-full" />
                Views
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Sessions
              </span>
            </div>
          </div>
          <div className="h-[300px]">
            <AreaChart
              data={pageViewsData}
              index="date"
              categories={["views", "sessions"]}
              colors={["var(--color-primary-500, #7c3aed)", "var(--color-success-500, #22c55e)"]}
              showLegend={false}
              className="h-full"
            />
          </div>
        </Card>
      </motion.div>

      {/* Bottom Grid: Sources + Devices + Top Pages */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Traffic Sources */}
        <motion.div variants={fadeUp} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
          <Card className="bg-card border-border/30 flex h-full flex-col p-6">
            <h3 className="mb-4 text-sm font-semibold">Traffic Sources</h3>
            <div className="min-h-[260px] flex-1">
              <BarChart
                data={sourceData}
                index="source"
                categories={["visitors"]}
                colors={["var(--color-primary-500, #7c3aed)"]}
                showLegend={false}
                className="h-full"
              />
            </div>
          </Card>
        </motion.div>

        {/* Device Breakdown */}
        <motion.div variants={fadeUp} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
          <Card className="bg-card border-border/30 h-full p-6">
            <h3 className="mb-4 text-sm font-semibold">Devices</h3>
            <div className="mt-6 space-y-3">
              {deviceData.map((d) => (
                <div key={d.name} className="flex items-center gap-3">
                  <div className="bg-muted/40 text-muted-foreground/60 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                    <DeviceIcon name={d.name} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-[12px] font-medium">{d.name}</span>
                      <span className="text-[12px] font-semibold">{d.value}%</span>
                    </div>
                    <div className="bg-muted/40 h-1.5 w-full overflow-hidden rounded-full">
                      <motion.div
                        className="bg-primary h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${d.value}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Top Pages */}
        <motion.div variants={fadeUp} transition={{ type: "spring", stiffness: 400, damping: 30 }}>
          <Card className="bg-card border-border/30 h-full p-6">
            <h3 className="mb-4 text-sm font-semibold">Top Pages</h3>
            <div className="space-y-2.5">
              {topPages.map((page, i) => (
                <div
                  key={page.path}
                  className="hover:bg-muted/30 flex items-center justify-between rounded-lg px-3 py-2 transition-colors"
                >
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="text-muted-foreground/30 w-4 text-[11px] font-bold">
                      {i + 1}
                    </span>
                    <span className="truncate text-[12px] font-medium">{page.path}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <span className="text-[12px] font-semibold tabular-nums">
                      {page.views.toLocaleString()}
                    </span>
                    <span
                      className={`text-[11px] font-semibold ${
                        page.change.startsWith("+") ? "text-emerald-500" : "text-rose-500"
                      }`}
                    >
                      {page.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
};
