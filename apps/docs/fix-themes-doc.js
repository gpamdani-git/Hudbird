import fs from "fs";
let content = fs.readFileSync("src/pages/ThemesDoc.tsx", "utf8");

const tabsStart = content.indexOf("<Tabs");
let endIdx = content.lastIndexOf(
  "</div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  );\n}"
);

let newContent = content.substring(0, tabsStart);
newContent += `                <Tabs variant="underlined" className="mb-6">
                  <Tab title="Overview" tabKey="overview">
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 mt-6">
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
                        <Card className="bg-card text-card-foreground border-border/50 col-span-2 p-6 shadow-sm">
                          <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold tracking-tight">Recent Sales</h3>
                            <Badge variant="soft" color="primary">
                              View All
                            </Badge>
                          </div>
                          <div className="space-y-6">
                            {[
                              { name: "Olivia Martin", email: "olivia.m@email.com", amount: "+$1,999.00", status: "success" },
                              { name: "Jackson Lee", email: "jack.lee@email.com", amount: "+$39.00", status: "success" },
                              { name: "Isabella Nguyen", email: "isa.nguyen@email.com", amount: "+$299.00", status: "warning" },
                            ].map((sale, i) => (
                              <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <Avatar name={sale.name} size="sm" />
                                  <div>
                                    <p className="text-sm leading-none font-medium">{sale.name}</p>
                                    <p className="text-muted-foreground mt-1 text-sm">{sale.email}</p>
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

                        <Card className="bg-card text-card-foreground border-border/50 p-6 shadow-sm">
                          <h3 className="mb-4 text-lg font-semibold tracking-tight">Quick Settings</h3>
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
                                  <p className="text-muted-foreground text-xs">Receive product updates.</p>
                                </div>
                                <Switch defaultChecked />
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium">Security emails</p>
                                  <p className="text-muted-foreground text-xs">Receive security alerts.</p>
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
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 mt-6">
                      <Card className="bg-card text-card-foreground border-border/50 flex min-h-[400px] items-center justify-center p-6 shadow-sm">
                        <div className="text-center">
                          <Activity className="text-primary mx-auto h-12 w-12 opacity-50" />
                          <h3 className="mt-4 text-xl font-semibold">Audience Analytics</h3>
                          <p className="text-muted-foreground mt-2 max-w-sm">
                            Interactive charts and deep audience demographics will appear here when you connect a data source.
                          </p>
                          <Button color="primary" className="mt-6">Connect Data Source</Button>
                        </div>
                      </Card>
                    </div>
                  </Tab>

                  <Tab title="Reports" tabKey="reports">
                    <div className="animate-in fade-in slide-in-from-bottom-2 mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 duration-500">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <Card key={i} className="bg-card text-card-foreground border-border/50 group cursor-pointer p-6 shadow-sm transition-colors hover:border-primary/50">
                          <div className="flex items-start justify-between">
                            <div className="bg-primary/10 text-primary rounded-lg p-2 transition-transform group-hover:scale-110">
                              <CreditCard className="h-5 w-5" />
                            </div>
                            <Badge variant="flat" color="info">Generated</Badge>
                          </div>
                          <h3 className="mt-4 font-semibold">Q{i > 4 ? 1 : i} Financial Report</h3>
                          <p className="text-muted-foreground mt-1 text-sm">Generated on Oct {i * 4}, 2024</p>
                        </Card>
                      ))}
                    </div>
                  </Tab>

                  <Tab title="Notifications" tabKey="notifications">
                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 mt-6">
                      <Card className="bg-card text-card-foreground border-border/50 max-w-3xl shadow-sm">
                        <div className="divide-border/50 divide-y">
                          {[
                            { title: "New user registered", desc: "Isabella Nguyen joined the 'Pro' workspace.", time: "2 hours ago", color: "primary", unread: true },
                            { title: "Server maintenance", desc: "Scheduled downtime for US-East region starting at 2 AM.", time: "5 hours ago", color: "warning", unread: true },
                            { title: "Payment failed", desc: "Subscription renewal failed for Stripe Invoice #4512.", time: "1 day ago", color: "danger", unread: false },
                            { title: "Weekly digest ready", desc: "Your traffic increased by 14% this week. View the full report.", time: "2 days ago", color: "success", unread: false },
                          ].map((notif, i) => (
                            <div key={i} className={"p-6 transition-colors hover:bg-muted/30 " + (notif.unread ? "bg-muted/10" : "")}>
                              <div className="flex gap-4">
                                <div className="mt-1">
                                  <div className={"h-2.5 w-2.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.2)] bg-" + notif.color} />
                                </div>
                                <div className="flex-1">
                                  <h4 className="font-semibold">{notif.title}</h4>
                                  <p className="text-muted-foreground mt-1 text-sm">{notif.desc}</p>
                                  <p className="text-muted-foreground/60 mt-2 text-xs">{notif.time}</p>
                                </div>
                                <div>
                                  <Button variant="ghost" size="sm">Mark read</Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>
                  </Tab>
                </Tabs>\n`;

newContent += content.substring(endIdx);
fs.writeFileSync("src/pages/ThemesDoc.tsx", newContent);
