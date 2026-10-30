import React, { useState } from "react";
import { DocHeader } from "../components/DocHeader";
import {
  Card,
  Button,
  Input,
  Badge,
  Tabs,
  Tab,
  Select,
  SelectItem,
  Switch,
  Avatar,
  Alert,
} from "@hudbird/ui";
import { Search, Bell, Settings, CreditCard, Activity, Users, ArrowUpRight } from "lucide-react";
import { ThemeSyncBar } from "../components/theme-editor/ThemeSyncBar";

export default function ThemesDoc() {
  const [tab, setTab] = useState("overview");

  return (
    <div className="mx-auto w-full">
      <div className="mt-8 mb-8 max-w-5xl px-4 sm:px-6">
        <DocHeader
          category="CUSTOMIZATION"
          title="Theme Builder"
          badge="Live Sync"
          description={
            <span>
              Customize your design system in real-time. Tune colors, typography, and border
              radiuses, and export production-ready Tailwind v4{" "}
              <code className="rounded bg-zinc-200/60 px-1.5 py-0.5 font-mono text-xs dark:border dark:border-[#2E2F33] dark:bg-[#161618] dark:text-indigo-400">
                @theme
              </code>{" "}
              directives or Figma Tokens Studio DTCG JSON.
            </span>
          }
        />
      </div>

      <div className="w-full max-w-5xl px-4 pb-16 sm:px-6">
        {/* Interactive Theme Token Sync & Exporter Bar */}
        <ThemeSyncBar />

        {/* Dashboard Mockup - scoped for Theme Editor CSS injection */}
        <div data-theme-preview className="w-full">
          <div className="flex flex-col gap-6">
            <Alert
              color="primary"
              variant="soft"
              title="Welcome to the new Theme Builder!"
              description="This realistic SaaS dashboard mockup demonstrates how your custom theme applies globally across complex layouts, text hierarchies, and interactive components."
            />

            {/* Dashboard Wrapper */}
            <div className="bg-background text-foreground border-border/50 flex min-h-[600px] flex-col overflow-hidden rounded-2xl border shadow-xl">
              {/* Top Navigation */}
              <header className="border-border/50 flex h-16 items-center justify-between border-b px-6">
                <div className="flex items-center gap-6">
                  <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg text-white">
                    <Activity className="h-5 w-5" />
                  </div>
                  <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                    <a href="#" className="text-foreground">
                      Dashboard
                    </a>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Customers
                    </a>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Settings
                    </a>
                  </nav>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative hidden sm:block">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
                    <Input placeholder="Search..." className="w-64 pl-9" aria-label="Search" />
                  </div>
                  <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
                    <Bell className="h-4 w-4" />
                  </Button>
                  <Avatar
                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    name="JD"
                    size="sm"
                  />
                </div>
              </header>

              {/* Main Content Area */}
              <main className="flex-1 p-6 md:p-8">
                <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">Overview</h2>
                    <p className="text-muted-foreground text-sm">
                      Monitor your revenue and user metrics.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline">Download Report</Button>
                    <Button variant="solid" color="primary">
                      Create Campaign
                    </Button>
                  </div>
                </div>

                <Tabs
                  variant="underlined"
                  className="mb-6"
                  selectedKey={tab}
                  onSelectionChange={setTab}
                >
                  <Tab title="Overview" tabKey="overview">
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                      {/* Metrics Grid */}
                      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                          {
                            title: "Total Revenue",
                            value: "$45,231.89",
                            trend: "+20.1%",
                            icon: CreditCard,
                          },
                          { title: "Active Users", value: "2,350", trend: "+15.1%", icon: Users },
                          { title: "Sales", value: "+12,234", trend: "+19.2%", icon: Activity },
                          { title: "Active Now", value: "573", trend: "+2.4%", icon: ArrowUpRight },
                        ].map((stat, i) => (
                          <Card
                            key={i}
                            className="bg-card text-card-foreground border-border/50 p-6 shadow-sm"
                          >
                            <div className="mb-2 flex items-center justify-between">
                              <h3 className="text-muted-foreground text-sm font-medium">
                                {stat.title}
                              </h3>
                              <stat.icon className="text-muted-foreground h-4 w-4" />
                            </div>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-success mt-1 text-xs font-medium">
                              {stat.trend}{" "}
                              <span className="text-muted-foreground font-normal">
                                from last month
                              </span>
                            </p>
                          </Card>
                        ))}
                      </div>

                      {/* Split Content */}
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Left Column: Recent Activity */}
                        <Card className="bg-card text-card-foreground border-border/50 col-span-2 p-6 shadow-sm">
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold tracking-tight">Recent Sales</h3>
                            <Badge variant="soft" color="primary">
                              View All
                            </Badge>
                          </div>
                          <div className="space-y-6">
                            {[
                              {
                                name: "Olivia Martin",
                                email: "olivia.m@email.com",
                                amount: "+$1,999.00",
                                status: "success" as const,
                              },
                              {
                                name: "Jackson Lee",
                                email: "jack.lee@email.com",
                                amount: "+$39.00",
                                status: "success" as const,
                              },
                              {
                                name: "Isabella Nguyen",
                                email: "isa.nguyen@email.com",
                                amount: "+$299.00",
                                status: "warning" as const,
                              },
                            ].map((sale, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <Avatar name={sale.name} size="sm" />
                                  <div>
                                    <p className="text-sm leading-none font-medium">{sale.name}</p>
                                    <p className="text-muted-foreground mt-1 text-sm">
                                      {sale.email}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-4">
                                  <div className="text-sm font-medium">{sale.amount}</div>
                                  <Badge variant="soft" color={sale.status} size="sm">
                                    {sale.status === "success" ? "Completed" : "Pending"}
                                  </Badge>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>

                        {/* Right Column: Quick Settings */}
                        <Card className="bg-card text-card-foreground border-border/50 p-6 shadow-sm">
                          <h3 className="mb-4 text-lg font-semibold tracking-tight">
                            Quick Settings
                          </h3>
                          <div className="space-y-6">
                            <div className="space-y-2">
                              <Select label="Workspace Role" placeholder="Select role">
                                <SelectItem value="admin">Administrator</SelectItem>
                                <SelectItem value="editor">Editor</SelectItem>
                                <SelectItem value="viewer">Viewer</SelectItem>
                              </Select>
                            </div>

                            <div className="space-y-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium">Marketing emails</p>
                                  <p className="text-muted-foreground text-xs">
                                    Receive product updates.
                                  </p>
                                </div>
                                <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium">Security emails</p>
                                  <p className="text-muted-foreground text-xs">
                                    Receive security alerts.
                                  </p>
                                </div>
                                <Switch defaultChecked color="danger" />
                              </div>
                            </div>

                            <Button variant="soft" className="w-full">
                              <Settings className="mr-2 h-4 w-4" />
                              Advanced Settings
                            </Button>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </Tab>

                  <Tab title="Analytics" tabKey="analytics">
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <Card className="bg-card text-card-foreground border-border/50 p-6 shadow-sm">
                          <h3 className="mb-4 text-lg font-semibold">Traffic Overview</h3>
                          <div className="flex h-64 items-end justify-between gap-2 px-2">
                            {[40, 70, 45, 90, 65, 85, 110].map((h, i) => (
                              <div
                                key={i}
                                className="bg-primary hover:bg-primary-hover w-full rounded-t-md transition-colors"
                                style={{ height: `${h}%` }}
                              ></div>
                            ))}
                          </div>
                          <div className="text-muted-foreground mt-4 flex justify-between px-2 text-xs">
                            <span>Mon</span>
                            <span>Tue</span>
                            <span>Wed</span>
                            <span>Thu</span>
                            <span>Fri</span>
                            <span>Sat</span>
                            <span>Sun</span>
                          </div>
                        </Card>
                        <Card className="bg-card text-card-foreground border-border/50 p-6 shadow-sm">
                          <h3 className="mb-4 text-lg font-semibold">Active Users</h3>
                          <div className="flex h-64 items-end justify-between gap-2 px-2">
                            {[80, 50, 75, 60, 95, 120, 105].map((h, i) => (
                              <div
                                key={i}
                                className="w-full rounded-t-md bg-emerald-500 transition-colors hover:bg-emerald-600"
                                style={{ height: `${h}%` }}
                              ></div>
                            ))}
                          </div>
                          <div className="text-muted-foreground mt-4 flex justify-between px-2 text-xs">
                            <span>Jan</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Apr</span>
                            <span>May</span>
                            <span>Jun</span>
                            <span>Jul</span>
                          </div>
                        </Card>
                      </div>
                    </div>
                  </Tab>

                  <Tab title="Reports" tabKey="reports">
                    <div className="animate-in fade-in slide-in-from-bottom-2 grid grid-cols-1 gap-6 duration-500 sm:grid-cols-2 lg:grid-cols-3">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card
                          key={i}
                          className="bg-card text-card-foreground border-border/50 hover:border-primary/50 group cursor-pointer p-6 shadow-sm transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="bg-primary/10 text-primary rounded-lg p-2 transition-transform group-hover:scale-110">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <Badge variant="flat" color="info">
                              Generated
                            </Badge>
                          </div>
                          <h3 className="mt-4 font-semibold">Q{i > 4 ? 1 : i} Financial Report</h3>
                          <p className="text-muted-foreground mt-1 text-sm">
                            Generated on Oct {i * 4}, 2024
                          </p>
                        </Card>
                      ))}
                    </div>
                  </Tab>

                  <Tab title="Notifications" tabKey="notifications">
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <Card className="bg-card text-card-foreground border-border/50 max-w-3xl shadow-sm">
                        <div className="divide-border/50 divide-y">
                          {[
                            {
                              title: "New user registered",
                              desc: "Isabella Nguyen joined the 'Pro' workspace.",
                              time: "2 hours ago",
                              color: "primary",
                              unread: true,
                            },
                            {
                              title: "Server maintenance",
                              desc: "Scheduled downtime for US-East region starting at 2 AM.",
                              time: "5 hours ago",
                              color: "warning",
                              unread: true,
                            },
                            {
                              title: "Payment failed",
                              desc: "Subscription renewal failed for Stripe Invoice #4512.",
                              time: "1 day ago",
                              color: "danger",
                              unread: false,
                            },
                            {
                              title: "Weekly digest ready",
                              desc: "Your traffic increased by 14% this week. View the full report.",
                              time: "2 days ago",
                              color: "success",
                              unread: false,
                            },
                          ].map((notif, i) => (
                            <div
                              key={i}
                              className={`hover:bg-muted/30 p-6 transition-colors ${notif.unread ? "bg-muted/10" : ""}`}
                            >
                              <div className="flex gap-4">
                                <div className="mt-1">
                                  <div
                                    className={`h-2.5 w-2.5 rounded-full bg-${notif.color} shadow-[0_0_8px_rgba(0,0,0,0.2)]`}
                                  />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold">{notif.title}</h4>
                                  <p className="text-muted-foreground mt-1 text-sm">{notif.desc}</p>
                                  <p className="text-muted-foreground/60 mt-2 text-xs">
                                    {notif.time}
                                  </p>
                                </div>
                                <div>
                                  <Button variant="ghost" size="sm">
                                    Mark read
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </Tab>
                </Tabs>
              </main>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
