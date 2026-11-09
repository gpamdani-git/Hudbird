import React, { useState } from "react";
import type {
  ApplicationBlockSelection,
  ApplicationExampleCategorySlug,
  BrandProfile,
} from "@hudbird/schemas";
import {
  Alert,
  AreaChart,
  Avatar,
  Badge,
  BarChart,
  Breadcrumbs,
  BreadcrumbItem,
  Button,
  Card,
  CardBody,
  CardHeader,
  DescriptionList,
  DescriptionListItem,
  DescriptionListLabel,
  DescriptionListValue,
  Grid,
  Heading,
  IconBox,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Progress,
  Select,
  SelectItem,
  Sidebar,
  SidebarBrand,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarNav,
  SidebarToggle,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TabList,
  TabPanel,
  Tabs,
  Text,
} from "@hudbird/ui";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Building2,
  CheckCircle2,
  CreditCard,
  Database,
  Download,
  Filter,
  Globe,
  KeyRound,
  LayoutDashboard,
  Lock,
  Plus,
  Search,
  Settings,
  ShieldCheck,
  Sparkles,
  Terminal,
  Users,
} from "lucide-react";
import { getApplicationCategory } from "./catalog";

const revenueChartData = [
  { month: "Jan", arr: 184, expansion: 42 },
  { month: "Feb", arr: 210, expansion: 54 },
  { month: "Mar", arr: 238, expansion: 68 },
  { month: "Apr", arr: 264, expansion: 79 },
  { month: "May", arr: 302, expansion: 96 },
  { month: "Jun", arr: 348, expansion: 118 },
];

const customerRows = [
  {
    id: "AC-9401",
    company: "Linearity Cloud",
    contact: "Elena Rostova",
    email: "elena@linearity.dev",
    plan: "Enterprise Scale",
    mrr: "$18,400",
    status: "Healthy",
    region: "eu-central-1",
  },
  {
    id: "AC-9402",
    company: "Northstar Quantum",
    contact: "Marcus Vance",
    email: "mvance@northstar.io",
    plan: "Enterprise Scale",
    mrr: "$14,200",
    status: "Healthy",
    region: "us-east-1",
  },
  {
    id: "AC-9403",
    company: "Vespera Robotics",
    contact: "Sora Takahashi",
    email: "sora@vespera.ai",
    plan: "Growth Cluster",
    mrr: "$6,850",
    status: "Expansion",
    region: "ap-northeast-1",
  },
  {
    id: "AC-9404",
    company: "Kinetix Bio",
    contact: "Aria Thorne",
    email: "aria@kinetix.bio",
    plan: "Growth Cluster",
    mrr: "$4,900",
    status: "Review",
    region: "us-west-2",
  },
];

const teamPermissionRows = [
  {
    name: "Dani Akbar",
    email: "dani@hudbird.dev",
    role: "Principal Architect",
    scope: "Root + Billing + KMS",
    mfa: "Hardware FIDO2",
    status: "Active",
  },
  {
    name: "Nadia Pratama",
    email: "nadia@hudbird.dev",
    role: "Staff Design Engineer",
    scope: "Design System + Registry",
    mfa: "Passkey Enforced",
    status: "Active",
  },
  {
    name: "Rian Saputra",
    email: "rian@hudbird.dev",
    role: "Platform SRE",
    scope: "Clusters + Telemetry",
    mfa: "Hardware FIDO2",
    status: "Active",
  },
  {
    name: "Clara Wijaya",
    email: "clara@hudbird.dev",
    role: "Security Auditor",
    scope: "Read-Only Audit Logs",
    mfa: "TOTP Verified",
    status: "Scoped",
  },
];

const auditStreamRows = [
  {
    id: "EVT-8821",
    actor: "token:ci-release-runner",
    action: "registry.blueprint.publish",
    target: "@hudbird/marketing@1.5.0",
    latency: "18ms",
    status: "Verified",
  },
  {
    id: "EVT-8820",
    actor: "dani@hudbird.dev",
    action: "kms.key.rotate",
    target: "prod-eu-central-signing-key",
    latency: "31ms",
    status: "Verified",
  },
  {
    id: "EVT-8819",
    actor: "sso:okta-scim-sync",
    action: "iam.role.sync",
    target: "group:platform-engineering",
    latency: "12ms",
    status: "Verified",
  },
  {
    id: "EVT-8818",
    actor: "nadia@hudbird.dev",
    action: "studio.recipe.export",
    target: "hudbird.studio.recipe.v1",
    latency: "9ms",
    status: "Verified",
  },
];

export interface ApplicationBlockRendererProps {
  block: ApplicationBlockSelection;
  brand: BrandProfile;
  category: ApplicationExampleCategorySlug;
}

export const ApplicationBlockRenderer: React.FC<ApplicationBlockRendererProps> = ({
  block,
  brand,
  category,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [ssoEnabled, setSsoEnabled] = useState(true);
  const [auditRetention, setAuditRetention] = useState(true);

  if (!block.enabled) return null;

  const categoryDef = getApplicationCategory(category);
  const brandDomain = `${brand.id || "hudbird"}.dev`;

  switch (block.type) {
    case "app-shell": {
      if (block.variant === "stacked-top") {
        return (
          <div
            data-application-block="app-shell"
            data-variant={block.variant}
            className="border-b border-zinc-200/80 bg-white/90 backdrop-blur-xl dark:border-white/[0.08] dark:bg-[#141417]/90"
          >
            <Navbar isBordered={false} maxWidth="full" className="h-16 px-4 sm:px-6">
              <NavbarBrand className="gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 text-xs font-bold text-white dark:bg-white dark:text-zinc-950">
                  {brand.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold tracking-tight text-zinc-950 dark:text-white">
                      {brand.name}
                    </span>
                    <Badge size="sm" variant="flat" color="primary">
                      {categoryDef.badge}
                    </Badge>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{brandDomain}</p>
                </div>
              </NavbarBrand>

              <NavbarContent className="hidden gap-1 md:flex" justify="center">
                <NavbarItem isActive={category.startsWith("dashboards")}>
                  <span className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold">
                    <LayoutDashboard className="h-3.5 w-3.5" />
                    Overview
                  </span>
                </NavbarItem>
                <NavbarItem isActive={category.startsWith("informational")}>
                  <span className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    <Database className="h-3.5 w-3.5" />
                    Entities & Telemetry
                  </span>
                </NavbarItem>
                <NavbarItem isActive={category.startsWith("settings")}>
                  <span className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    <Settings className="h-3.5 w-3.5" />
                    Workspace Settings
                  </span>
                </NavbarItem>
              </NavbarContent>

              <NavbarContent justify="end" className="gap-2.5">
                <Badge size="sm" variant="flat" color="success">
                  99.99% SLA
                </Badge>
                <Avatar size="sm" name="Dani Akbar" />
              </NavbarContent>
            </Navbar>
          </div>
        );
      }

      const isSlim = block.variant === "sidebar-slim";
      return (
        <Sidebar
          data-application-block="app-shell"
          data-variant={block.variant}
          variant="bordered"
          isCollapsed={isSlim}
          className="min-h-[640px] border-r border-zinc-200/80 dark:border-white/[0.08]"
        >
          <SidebarHeader>
            <SidebarBrand
              icon={
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-900 text-xs font-bold text-white dark:bg-white dark:text-zinc-950">
                  {brand.name.slice(0, 2).toUpperCase()}
                </div>
              }
              title={brand.name}
            />
            <SidebarToggle />
          </SidebarHeader>
          <SidebarContent>
            <SidebarNav title="Workspace">
              <SidebarItem
                icon={<LayoutDashboard className="h-4 w-4" />}
                isActive={category.startsWith("dashboards")}
                label="Executive Overview"
              >
                Executive Overview
              </SidebarItem>
              <SidebarItem
                icon={<BarChart3 className="h-4 w-4" />}
                label="Revenue & Usage"
                badge={
                  !isSlim ? (
                    <Badge size="sm" variant="flat" color="success">
                      +24%
                    </Badge>
                  ) : undefined
                }
              >
                Revenue & Usage
              </SidebarItem>
              <SidebarItem
                icon={<Users className="h-4 w-4" />}
                isActive={category.startsWith("informational")}
                label="Customer Dossiers"
              >
                Customer Dossiers
              </SidebarItem>
            </SidebarNav>
            <SidebarNav title="Governance">
              <SidebarItem
                icon={<Settings className="h-4 w-4" />}
                isActive={category.startsWith("settings")}
                label="Organization Settings"
              >
                Organization Settings
              </SidebarItem>
              <SidebarItem icon={<ShieldCheck className="h-4 w-4" />} label="Security & SOC2">
                Security & SOC2
              </SidebarItem>
              <SidebarItem icon={<Terminal className="h-4 w-4" />} label="API & Webhooks">
                API & Webhooks
              </SidebarItem>
            </SidebarNav>
          </SidebarContent>
          <SidebarFooter className="border-t border-zinc-200/70 p-3 dark:border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <Avatar size="sm" name="Dani Akbar" />
              {!isSlim && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-semibold text-zinc-900 dark:text-white">
                    Dani Akbar
                  </p>
                  <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                    {brandDomain}
                  </p>
                </div>
              )}
            </div>
          </SidebarFooter>
        </Sidebar>
      );
    }

    case "page-header": {
      if (block.variant === "command-search") {
        return (
          <div
            data-application-block="page-header"
            data-variant={block.variant}
            className="flex flex-col gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-2xs sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.08] dark:bg-[#161618]"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge size="sm" variant="flat" color="primary">
                  {categoryDef.badge}
                </Badge>
                <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                  {brandDomain}
                </span>
              </div>
              <Heading as="h3" className="text-xl font-bold tracking-tight">
                {categoryDef.title}
              </Heading>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="w-full sm:w-64">
                <Input
                  size="sm"
                  placeholder="Filter entities or press ⌘K..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  startContent={<Search className="h-3.5 w-3.5 text-zinc-400" />}
                />
              </div>
              <Button size="sm" variant="bordered">
                <Download className="mr-1.5 h-3.5 w-3.5" />
                Export CSV
              </Button>
              <Button size="sm" variant="solid" color="primary">
                <Plus className="mr-1.5 h-3.5 w-3.5" />
                New Deployment
              </Button>
            </div>
          </div>
        );
      }

      if (block.variant === "tabs-toolbar") {
        return (
          <div
            data-application-block="page-header"
            data-variant={block.variant}
            className="space-y-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-2xs dark:border-white/[0.08] dark:bg-[#161618]"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <Heading as="h3" className="text-xl font-bold tracking-tight">
                  {categoryDef.title}
                </Heading>
                <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                  {categoryDef.description}
                </Text>
              </div>
              <div className="flex items-center gap-2">
                <Button size="sm" variant="bordered">
                  <Filter className="mr-1.5 h-3.5 w-3.5" />
                  Filters
                </Button>
                <Button size="sm" variant="solid" color="primary">
                  <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                  Sync Cluster
                </Button>
              </div>
            </div>
            <Tabs defaultValue="overview" variant="solid" size="sm">
              <TabList>
                <Tab tabKey="overview">Real-Time Telemetry</Tab>
                <Tab tabKey="cohorts">Enterprise Cohorts</Tab>
                <Tab tabKey="governance">IAM & Security</Tab>
              </TabList>
              <TabPanel tabKey="overview" className="pt-2 text-xs text-zinc-500 dark:text-zinc-400">
                Showing live production metrics for <strong>{brand.name}</strong> across 4 regions.
              </TabPanel>
              <TabPanel tabKey="cohorts" className="pt-2 text-xs text-zinc-500 dark:text-zinc-400">
                Net dollar retention tracking at 138.4% across enterprise tiers.
              </TabPanel>
              <TabPanel
                tabKey="governance"
                className="pt-2 text-xs text-zinc-500 dark:text-zinc-400"
              >
                Zero policy drift detected in the last 30 days.
              </TabPanel>
            </Tabs>
          </div>
        );
      }

      return (
        <div
          data-application-block="page-header"
          data-variant={block.variant}
          className="flex flex-col gap-4 rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-2xs sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.08] dark:bg-[#161618]"
        >
          <div className="space-y-1.5">
            <Breadcrumbs size="sm">
              <BreadcrumbItem>{brand.name}</BreadcrumbItem>
              <BreadcrumbItem>Application UI</BreadcrumbItem>
              <BreadcrumbItem isCurrent>{categoryDef.title}</BreadcrumbItem>
            </Breadcrumbs>
            <div className="flex flex-wrap items-center gap-2.5">
              <Heading as="h3" className="text-xl font-bold tracking-tight">
                {categoryDef.title}
              </Heading>
              <Badge size="sm" variant="flat" color="success">
                Live Production
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="bordered">
              <Download className="mr-1.5 h-3.5 w-3.5" />
              Export Report
            </Button>
            <Button size="sm" variant="solid" color="primary">
              <Plus className="mr-1.5 h-3.5 w-3.5" />
              Create Resource
            </Button>
          </div>
        </div>
      );
    }

    case "kpi-metrics": {
      if (block.variant === "compact-strip") {
        const items = [
          { label: "Annualized Run Rate", value: "$4.18M", delta: "+28.4%" },
          { label: "Active Workspaces", value: "1,420", delta: "+14.2%" },
          { label: "P99 Edge Latency", value: "19.4ms", delta: "-4.1ms" },
          { label: "SOC2 Controls Passing", value: "148 / 148", delta: "100%" },
        ];
        return (
          <Grid
            data-application-block="kpi-metrics"
            data-variant={block.variant}
            cols={1}
            className="gap-3 sm:grid-cols-2 xl:grid-cols-4"
          >
            {items.map((item) => (
              <Card key={item.label} className="border border-zinc-200/80 dark:border-white/[0.08]">
                <CardBody className="space-y-1.5 p-4">
                  <Text className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {item.label}
                  </Text>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-xl font-bold tracking-tight text-zinc-950 tabular-nums dark:text-white">
                      {item.value}
                    </span>
                    <Badge size="sm" variant="flat" color="success">
                      {item.delta}
                    </Badge>
                  </div>
                </CardBody>
              </Card>
            ))}
          </Grid>
        );
      }

      if (block.variant === "goal-progress") {
        const quotas = [
          {
            title: "Enterprise Seat Allocation",
            value: "412 / 500 seats",
            pct: 82,
            color: "primary" as const,
          },
          {
            title: "Monthly Event Ingestion Quota",
            value: "88.4M / 100M events",
            pct: 88,
            color: "success" as const,
          },
          {
            title: "Zero-Downtime SLA Budget",
            value: "99.994% uptime",
            pct: 99,
            color: "primary" as const,
          },
        ];
        return (
          <Grid
            data-application-block="kpi-metrics"
            data-variant={block.variant}
            cols={1}
            className="gap-4 md:grid-cols-3"
          >
            {quotas.map((q) => (
              <Card key={q.title} className="border border-zinc-200/80 dark:border-white/[0.08]">
                <CardBody className="space-y-3 p-5">
                  <div className="flex items-center justify-between">
                    <Text className="text-xs font-semibold text-zinc-600 dark:text-zinc-300">
                      {q.title}
                    </Text>
                    <Badge size="sm" variant="flat" color={q.color}>
                      {q.pct}%
                    </Badge>
                  </div>
                  <div className="text-lg font-bold text-zinc-950 tabular-nums dark:text-white">
                    {q.value}
                  </div>
                  <Progress value={q.pct} size="sm" color={q.color} />
                </CardBody>
              </Card>
            ))}
          </Grid>
        );
      }

      const cards = [
        {
          title: "Net Recurring Revenue",
          value: "$348,200",
          delta: "+24.8% vs last quarter",
          icon: CreditCard,
        },
        {
          title: "Enterprise Expansion",
          value: "$118,400",
          delta: "+19.2% net retention",
          icon: Activity,
        },
        {
          title: "Verified Org Identities",
          value: "18,940",
          delta: "+1,204 new this month",
          icon: ShieldCheck,
        },
      ];
      return (
        <Grid
          data-application-block="kpi-metrics"
          data-variant={block.variant}
          cols={1}
          className="gap-4 md:grid-cols-3"
        >
          {cards.map((card) => (
            <Card key={card.title} className="border border-zinc-200/80 dark:border-white/[0.08]">
              <CardBody className="space-y-3 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {card.title}
                  </span>
                  <IconBox size="sm" variant="default" icon={card.icon} showGlow={false} />
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-2xl font-bold tracking-tight text-zinc-950 tabular-nums dark:text-white">
                    {card.value}
                  </span>
                  <Badge size="sm" variant="flat" color="success">
                    <ArrowUpRight className="mr-1 inline h-3 w-3" />
                    {card.delta}
                  </Badge>
                </div>
              </CardBody>
            </Card>
          ))}
        </Grid>
      );
    }

    case "primary-panel": {
      if (block.variant === "workspace-settings") {
        return (
          <Card
            data-application-block="primary-panel"
            data-variant={block.variant}
            className="border border-zinc-200/80 dark:border-white/[0.08]"
          >
            <CardHeader className="flex flex-col gap-1 border-b border-zinc-200/70 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.08]">
              <div>
                <Heading as="h4" className="text-base font-bold">
                  Workspace Identity & Security Governance
                </Heading>
                <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                  Composed from @hudbird/ui Input, Select, Switch, Alert, and Card primitives.
                </Text>
              </div>
              <Badge size="sm" variant="flat" color="primary">
                SOC2 Enforced
              </Badge>
            </CardHeader>
            <CardBody className="space-y-5 p-5">
              <Alert
                variant="flat"
                color="info"
                title="SAML 2.0 & Hardware Passkeys Active"
                description={`All members under ${brandDomain} authenticate through enforced hardware passkey policy.`}
              />
              <Grid cols={1} className="gap-4 md:grid-cols-2">
                <Input label="Workspace Display Name" defaultValue={brand.name} />
                <Input label="Primary Verified Domain" defaultValue={brandDomain} />
                <Select label="Primary Data Residency Region" defaultValue="eu-central-1">
                  <SelectItem value="eu-central-1">Frankfurt (eu-central-1)</SelectItem>
                  <SelectItem value="us-east-1">Virginia (us-east-1)</SelectItem>
                  <SelectItem value="ap-northeast-1">Tokyo (ap-northeast-1)</SelectItem>
                </Select>
                <Input label="Webhook Signing Key ID" defaultValue="whsec_hb_99481a7c20f" />
              </Grid>
              <div className="grid gap-3 pt-1 sm:grid-cols-2">
                <div className="flex items-center justify-between rounded-xl border border-zinc-200/80 p-3.5 dark:border-white/[0.08]">
                  <div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                      Enforce SAML Single Sign-On
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Require identity provider assertion for all sessions
                    </p>
                  </div>
                  <Switch checked={ssoEnabled} onChange={(e) => setSsoEnabled(e.target.checked)} />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-zinc-200/80 p-3.5 dark:border-white/[0.08]">
                  <div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                      Immutable Audit Log Streaming
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Stream JSONL audit events to SIEM bucket
                    </p>
                  </div>
                  <Switch
                    checked={auditRetention}
                    onChange={(e) => setAuditRetention(e.target.checked)}
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        );
      }

      if (block.variant === "crm-inspector") {
        return (
          <Card
            data-application-block="primary-panel"
            data-variant={block.variant}
            className="border border-zinc-200/80 dark:border-white/[0.08]"
          >
            <CardHeader className="flex flex-col gap-1 border-b border-zinc-200/70 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.08]">
              <div className="flex items-center gap-3">
                <IconBox size="sm" variant="brand" icon={Building2} showGlow={false} />
                <div>
                  <Heading as="h4" className="text-base font-bold">
                    Enterprise Tenant Dossier — {brand.name}
                  </Heading>
                  <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                    Composed from @hudbird/ui DescriptionList, Badge, and Card organisms.
                  </Text>
                </div>
              </div>
              <Badge size="sm" variant="flat" color="success">
                Verified Tenant
              </Badge>
            </CardHeader>
            <CardBody className="p-5">
              <DescriptionList variant="flat" orientation="horizontal">
                <DescriptionListItem>
                  <DescriptionListLabel>Organization Identifier</DescriptionListLabel>
                  <DescriptionListValue>
                    <span className="font-mono text-xs">org_hb_01J9X8A2B7K4</span>
                  </DescriptionListValue>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListLabel>Primary Production Domain</DescriptionListLabel>
                  <DescriptionListValue>{brandDomain}</DescriptionListValue>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListLabel>Encryption & Compliance Posture</DescriptionListLabel>
                  <DescriptionListValue>
                    <span className="inline-flex items-center gap-1.5">
                      <Lock className="h-3.5 w-3.5 text-emerald-500" />
                      AES-256-GCM Customer Managed Key • SOC2 Type II
                    </span>
                  </DescriptionListValue>
                </DescriptionListItem>
                <DescriptionListItem>
                  <DescriptionListLabel>Assigned Solutions Architect</DescriptionListLabel>
                  <DescriptionListValue>Elena Rostova (elena@{brandDomain})</DescriptionListValue>
                </DescriptionListItem>
              </DescriptionList>
            </CardBody>
          </Card>
        );
      }

      return (
        <Grid
          data-application-block="primary-panel"
          data-variant={block.variant}
          cols={1}
          className="gap-4 lg:grid-cols-3"
        >
          <Card className="border border-zinc-200/80 lg:col-span-2 dark:border-white/[0.08]">
            <CardHeader className="flex items-center justify-between border-b border-zinc-200/70 p-5 dark:border-white/[0.08]">
              <div>
                <Heading as="h4" className="text-base font-bold">
                  Recurring Revenue & Expansion Velocity
                </Heading>
                <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                  Rendered with @hudbird/ui AreaChart primitive ($K ARR)
                </Text>
              </div>
              <Badge size="sm" variant="flat" color="primary">
                H1 Telemetry
              </Badge>
            </CardHeader>
            <CardBody className="p-5">
              <AreaChart data={revenueChartData} index="month" categories={["arr", "expansion"]} />
            </CardBody>
          </Card>

          <Card className="border border-zinc-200/80 dark:border-white/[0.08]">
            <CardHeader className="flex items-center justify-between border-b border-zinc-200/70 p-5 dark:border-white/[0.08]">
              <div>
                <Heading as="h4" className="text-base font-bold">
                  Expansion by Cohort
                </Heading>
                <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                  @hudbird/ui BarChart breakdown
                </Text>
              </div>
            </CardHeader>
            <CardBody className="p-5">
              <BarChart data={revenueChartData} index="month" categories={["expansion"]} />
            </CardBody>
          </Card>
        </Grid>
      );
    }

    case "data-table": {
      if (block.variant === "team-permissions") {
        return (
          <Card
            data-application-block="data-table"
            data-variant={block.variant}
            className="border border-zinc-200/80 dark:border-white/[0.08]"
          >
            <CardHeader className="flex flex-col gap-2 border-b border-zinc-200/70 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.08]">
              <div>
                <Heading as="h4" className="text-base font-bold">
                  Team Members & IAM Role Matrix
                </Heading>
                <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                  Role-based access control table built with @hudbird/ui Table, Avatar, and Badge.
                </Text>
              </div>
              <Button size="sm" variant="bordered">
                <KeyRound className="mr-1.5 h-3.5 w-3.5" />
                Invite Member
              </Button>
            </CardHeader>
            <CardBody className="p-0">
              <Table aria-label="Team permissions table">
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Permission Scope</TableHead>
                    <TableHead>MFA Posture</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamPermissionRows.map((member) => (
                    <TableRow key={member.email}>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <Avatar size="sm" name={member.name} />
                          <div>
                            <div className="text-xs font-semibold text-zinc-900 dark:text-white">
                              {member.name}
                            </div>
                            <div className="text-[11px] text-zinc-500 dark:text-zinc-400">
                              {member.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-medium">{member.role}</TableCell>
                      <TableCell className="font-mono text-xs text-zinc-600 dark:text-zinc-300">
                        {member.scope}
                      </TableCell>
                      <TableCell className="text-xs">{member.mfa}</TableCell>
                      <TableCell>
                        <Badge size="sm" variant="flat" color="success">
                          {member.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        );
      }

      if (block.variant === "audit-stream") {
        return (
          <Card
            data-application-block="data-table"
            data-variant={block.variant}
            className="border border-zinc-200/80 dark:border-white/[0.08]"
          >
            <CardHeader className="flex flex-col gap-2 border-b border-zinc-200/70 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.08]">
              <div>
                <Heading as="h4" className="text-base font-bold">
                  Immutable Security & API Audit Stream
                </Heading>
                <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                  Cryptographically signed control-plane events across {brandDomain}.
                </Text>
              </div>
              <Badge size="sm" variant="flat" color="primary">
                Live Stream
              </Badge>
            </CardHeader>
            <CardBody className="p-0">
              <Table aria-label="Security audit stream">
                <TableHeader>
                  <TableRow>
                    <TableHead>Event ID</TableHead>
                    <TableHead>Actor</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Target Resource</TableHead>
                    <TableHead>Latency</TableHead>
                    <TableHead>Verification</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditStreamRows.map((evt) => (
                    <TableRow key={evt.id}>
                      <TableCell className="font-mono text-xs font-semibold">{evt.id}</TableCell>
                      <TableCell className="font-mono text-xs">{evt.actor}</TableCell>
                      <TableCell className="font-mono text-xs text-indigo-600 dark:text-indigo-400">
                        {evt.action}
                      </TableCell>
                      <TableCell className="text-xs">{evt.target}</TableCell>
                      <TableCell className="font-mono text-xs tabular-nums">
                        {evt.latency}
                      </TableCell>
                      <TableCell>
                        <Badge size="sm" variant="flat" color="success">
                          {evt.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardBody>
          </Card>
        );
      }

      return (
        <Card
          data-application-block="data-table"
          data-variant={block.variant}
          className="border border-zinc-200/80 dark:border-white/[0.08]"
        >
          <CardHeader className="flex flex-col gap-2 border-b border-zinc-200/70 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-white/[0.08]">
            <div>
              <Heading as="h4" className="text-base font-bold">
                Enterprise Customer Directory
              </Heading>
              <Text className="text-xs text-zinc-500 dark:text-zinc-400">
                Active production tenants and monthly recurring commitments.
              </Text>
            </div>
            <Badge size="sm" variant="flat" color="success">
              {customerRows.length} Active Accounts
            </Badge>
          </CardHeader>
          <CardBody className="p-0">
            <Table aria-label="Enterprise customer directory">
              <TableHeader>
                <TableRow>
                  <TableHead>Account</TableHead>
                  <TableHead>Primary Contact</TableHead>
                  <TableHead>Plan Tier</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>MRR</TableHead>
                  <TableHead>Health</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <div className="font-semibold text-zinc-900 dark:text-white">
                        {row.company}
                      </div>
                      <div className="font-mono text-[11px] text-zinc-500">{row.id}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-xs font-medium">{row.contact}</div>
                      <div className="text-[11px] text-zinc-500">{row.email}</div>
                    </TableCell>
                    <TableCell className="text-xs">{row.plan}</TableCell>
                    <TableCell className="font-mono text-xs">{row.region}</TableCell>
                    <TableCell className="font-mono text-xs font-semibold tabular-nums">
                      {row.mrr}
                    </TableCell>
                    <TableCell>
                      <Badge
                        size="sm"
                        variant="flat"
                        color={row.status === "Review" ? "warning" : "success"}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      );
    }

    case "status-footer": {
      if (block.variant === "system-telemetry") {
        return (
          <div
            data-application-block="status-footer"
            data-variant={block.variant}
            className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200/80 bg-white px-5 py-3.5 text-xs text-zinc-500 dark:border-white/[0.08] dark:bg-[#161618] dark:text-zinc-400"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <span>
                All control-plane clusters operational for <strong>{brand.name}</strong>
              </span>
            </div>
            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span className="inline-flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" /> eu-central-1
              </span>
              <span>TLS 1.3 Enforced</span>
              <span>P99: 18.2ms</span>
            </div>
          </div>
        );
      }

      return (
        <div
          data-application-block="status-footer"
          data-variant={block.variant}
          className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-zinc-200/80 bg-white px-5 py-3.5 text-xs text-zinc-500 dark:border-white/[0.08] dark:bg-[#161618] dark:text-zinc-400"
        >
          <span>
            Showing <strong>1–4</strong> of <strong>148</strong> verified records in{" "}
            <strong>{brand.name}</strong>
          </span>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="bordered" disabled>
              Previous
            </Button>
            <Badge size="sm" variant="flat" color="primary">
              Page 1 of 37
            </Badge>
            <Button size="sm" variant="bordered">
              Next
            </Button>
          </div>
        </div>
      );
    }
  }
};

export interface ApplicationPageRendererProps {
  category: ApplicationExampleCategorySlug;
  blocks: ApplicationBlockSelection[];
  brand: BrandProfile;
}

export const ApplicationPageRenderer: React.FC<ApplicationPageRendererProps> = ({
  category,
  blocks,
  brand,
}) => {
  const shellBlock = blocks.find((b) => b.type === "app-shell" && b.enabled);
  const contentBlocks = blocks.filter((b) => b.type !== "app-shell" && b.enabled);
  const isSidebarShell =
    shellBlock && (shellBlock.variant === "sidebar-dual" || shellBlock.variant === "sidebar-slim");

  return (
    <div
      data-hudbird-domain="application-ui"
      data-application-category={category}
      className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-zinc-50/80 text-zinc-900 shadow-xs dark:border-white/[0.08] dark:bg-[#0d0d10] dark:text-zinc-100"
    >
      {shellBlock && !isSidebarShell && (
        <ApplicationBlockRenderer block={shellBlock} brand={brand} category={category} />
      )}

      <div className={isSidebarShell ? "flex min-h-[680px] flex-col lg:flex-row" : "min-h-[640px]"}>
        {shellBlock && isSidebarShell && (
          <div className="shrink-0">
            <ApplicationBlockRenderer block={shellBlock} brand={brand} category={category} />
          </div>
        )}
        <div className="flex-1 space-y-5 p-4 sm:p-6">
          {contentBlocks.map((block, index) => (
            <ApplicationBlockRenderer
              key={`${block.type}-${index}`}
              block={block}
              brand={brand}
              category={category}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
