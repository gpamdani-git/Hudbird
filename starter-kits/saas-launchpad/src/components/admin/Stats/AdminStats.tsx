import React from "react";
import { Card, Badge } from "@/components/ui";
import { ArrowUpRight, ArrowDownRight, Users, Activity, FileText, Eye } from "lucide-react";

const stats = [
  {
    title: "Total Views",
    value: "45,231",
    change: "+20.1%",
    positive: true,
    icon: Eye,
  },
  {
    title: "Active Users",
    value: "2,350",
    change: "+12.5%",
    positive: true,
    icon: Users,
  },
  {
    title: "Published",
    value: "1,234",
    change: "+19%",
    positive: true,
    icon: FileText,
  },
  {
    title: "Bounce Rate",
    value: "4.2%",
    change: "-2.5%",
    positive: false,
    icon: Activity,
  },
];

export const AdminStats = () => {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((s, i) => {
        const Icon = s.icon;
        return (
          <Card key={i} className="bg-card border-border/30 p-4">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-muted-foreground/50 text-[11px] font-semibold tracking-wider uppercase">
                {s.title}
              </p>
              <div className="bg-muted/40 flex h-7 w-7 items-center justify-center rounded-md">
                <Icon className="text-muted-foreground/60 h-3.5 w-3.5" />
              </div>
            </div>
            <div className="text-xl font-bold tracking-tight">{s.value}</div>
            <div className="mt-1.5 flex items-center gap-1.5">
              <span
                className={`flex items-center text-[11px] font-semibold ${
                  s.positive ? "text-emerald-500" : "text-rose-500"
                }`}
              >
                {s.positive ? (
                  <ArrowUpRight className="mr-0.5 h-3 w-3" />
                ) : (
                  <ArrowDownRight className="mr-0.5 h-3 w-3" />
                )}
                {s.change}
              </span>
              <span className="text-muted-foreground/40 text-[11px]">vs last month</span>
            </div>
          </Card>
        );
      })}
    </div>
  );
};
