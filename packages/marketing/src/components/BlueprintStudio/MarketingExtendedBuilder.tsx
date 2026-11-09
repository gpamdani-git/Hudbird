import React from "react";
import type {
  BrandProfile,
  LandingPageConfig,
  LandingSectionSelection,
  LandingSectionType,
  MarketingExampleCategorySlug,
  MarketingExtendedBlockSelection,
} from "@hudbird/schemas";
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  DescriptionList,
  DescriptionListItem,
  DescriptionListLabel,
  DescriptionListValue,
  Grid,
  Heading,
  IconBox,
  Input,
  Section,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Textarea,
} from "@hudbird/ui";
import {
  ArrowRight,
  Briefcase,
  Building2,
  Gauge,
  Layers,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { formaLandingContent, LandingSectionPreview } from "../LandingPage";

const CORE_LANDING_TYPES = new Set<string>([
  "navbar",
  "hero",
  "logos",
  "benefits",
  "features",
  "how-it-works",
  "integrations",
  "testimonials",
  "pricing",
  "faq",
  "cta",
  "footer",
]);

const leadershipMembers = [
  {
    name: "Dani Akbar",
    role: "Founder & Principal Systems Architect",
    focus: "Design Systems, Compiler Tooling & Clean-Room UI Architecture",
    location: "Jakarta / Singapore",
  },
  {
    name: "Elena Rostova",
    role: "VP of Platform Engineering",
    focus: "Distributed Telemetry, Edge Runtimes & Zero-Trust Identity",
    location: "Zurich, Switzerland",
  },
  {
    name: "Marcus Vance",
    role: "Head of Product Design",
    focus: "Typography Systems, Accessibility Primitives & Motion Physics",
    location: "San Francisco, CA",
  },
  {
    name: "Sora Takahashi",
    role: "Staff Design Engineer",
    focus: "Interactive Page Builder & Deterministic Code Generation",
    location: "Tokyo, Japan",
  },
];

const openRoles = [
  {
    id: "ENG-401",
    title: "Staff Design Systems Engineer (React + TypeScript)",
    department: "Core UI Primitives",
    location: "Remote (Global)",
    compensation: "$185k – $220k + Equity",
  },
  {
    id: "ENG-402",
    title: "Principal Compiler & AST Engineer",
    department: "Studio Page Builder",
    location: "Remote / Singapore",
    compensation: "$195k – $240k + Equity",
  },
  {
    id: "DES-204",
    title: "Lead Brand & Systems Designer",
    department: "Marketing Blueprints",
    location: "Remote / Europe",
    compensation: "$165k – $195k + Equity",
  },
];

const blogDispatches = [
  {
    slug: "clean-room-4-layer-architecture",
    category: "Architecture",
    readTime: "7 min read",
    title: "How We Engineered a 4-Layer Composable UI System from Base Primitives to Page Builder",
    excerpt:
      "Separating accessible Base UI primitives from domain organisms and declarative page recipes lets teams ship Application UI, Shared Auth, and Marketing pages without CSS drift.",
    author: "Dani Akbar",
    date: "Nov 2026",
  },
  {
    slug: "zero-runtime-drift-recipes",
    category: "Page Builder",
    readTime: "5 min read",
    title: "Deterministic React Code Generation with Typed Blueprint Recipes",
    excerpt:
      "Why every visual toggle in Hudbird Studio serializes to a strict JSON schema and compiles directly to type-checked TSX.",
    author: "Sora Takahashi",
    date: "Oct 2026",
  },
  {
    slug: "shared-auth-across-funnels",
    category: "Security & UX",
    readTime: "6 min read",
    title: "Designing Shared Authentication & InputOTP Flows Across Marketing and App Shells",
    excerpt:
      "Unifying Login, Sign-up, 2FA verification, and transactional email templates across product boundaries.",
    author: "Elena Rostova",
    date: "Oct 2026",
  },
];

export interface MarketingExtendedBlockRendererProps {
  block: MarketingExtendedBlockSelection;
  brand: BrandProfile;
  landingConfig?: LandingPageConfig;
}

export const MarketingExtendedBlockRenderer: React.FC<MarketingExtendedBlockRendererProps> = ({
  block,
  brand,
  landingConfig,
}) => {
  if (!block.enabled) return null;

  const brandDomain = `${brand.id || "hudbird"}.dev`;

  if (CORE_LANDING_TYPES.has(block.type)) {
    const selection: LandingSectionSelection = {
      type: block.type as LandingSectionType,
      variant: block.variant as never,
      enabled: true,
    };
    return (
      <LandingSectionPreview selection={selection} content={formaLandingContent} brand={brand} />
    );
  }

  switch (block.type) {
    case "banner": {
      return (
        <div
          data-marketing-block="banner"
          data-variant={block.variant}
          className="border-b border-zinc-200/80 bg-zinc-950 px-4 py-3 text-xs text-white dark:border-white/[0.08] dark:bg-[#111216]"
        >
          <Container className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge size="sm" variant="modern" className="gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-indigo-500"
                  aria-hidden="true"
                />
                {block.variant === "event-bar"
                  ? "Live Architecture Keynote"
                  : "Hudbird Studio 2026.11"}
              </Badge>
              <Text as="span" className="text-xs font-medium text-zinc-200">
                {brand.name} now ships unified Application UI, Shared Pages, and Marketing
                blueprints.
              </Text>
            </div>
            <span className="inline-flex items-center gap-1.5 font-semibold text-white">
              Explore Registry <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </Container>
        </div>
      );
    }

    case "metrics": {
      const metrics = [
        {
          label: "Composable UI Primitives",
          value: "65+",
          note: "@hudbird/ui Base Layer",
          icon: Layers,
        },
        {
          label: "Domain Blueprint Variants",
          value: "48+",
          note: "App, Shared & Marketing",
          icon: Sparkles,
        },
        {
          label: "Global Edge P99 Latency",
          value: "18.4ms",
          note: "Zero-layout-shift SSR",
          icon: Gauge,
        },
        {
          label: "Enterprise SLA Guarantee",
          value: "99.99%",
          note: "SOC2 Type II verified",
          icon: ShieldCheck,
        },
      ];
      return (
        <Section
          data-marketing-block="metrics"
          data-variant={block.variant}
          spacing="lg"
          bordered="bottom"
          className="bg-zinc-50/60 dark:bg-white/[0.015]"
        >
          <Container className="space-y-12">
            {block.variant === "highlight-band" && (
              <div className="max-w-3xl space-y-3">
                <Badge size="sm" variant="modern" className="gap-1.5">
                  <span
                    className="inline-block h-2 w-2 rounded-full bg-indigo-500"
                    aria-hidden="true"
                  />
                  Platform Telemetry
                </Badge>
                <Heading as="h2" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Engineered for high-velocity product &amp; marketing teams at {brand.name}
                </Heading>
              </div>
            )}
            <Grid cols={1} className="gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {metrics.map((m) => (
                <Card key={m.label} variant="bordered" radius="lg" className="shadow-2xs">
                  <CardBody className="space-y-4 p-6">
                    <IconBox
                      size="md"
                      variant="double-ring"
                      icon={m.icon}
                      showGlow={false}
                      aria-hidden="true"
                    />
                    <div className="space-y-1">
                      <Text className="text-4xl font-semibold tracking-tight text-zinc-950 tabular-nums dark:text-white">
                        {m.value}
                      </Text>
                      <Text className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                        {m.label}
                      </Text>
                      <Text variant="small" className="text-muted-foreground">
                        {m.note}
                      </Text>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </Container>
        </Section>
      );
    }

    case "team": {
      return (
        <Section
          data-marketing-block="team"
          data-variant={block.variant}
          spacing="lg"
          bordered="bottom"
        >
          <Container className="space-y-12">
            <div className="max-w-3xl space-y-3">
              <Badge size="sm" variant="modern" className="gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-indigo-500"
                  aria-hidden="true"
                />
                Leadership &amp; Craft
              </Badge>
              <Heading as="h2" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                The architects behind {brand.name}
              </Heading>
              <Text className="text-muted-foreground text-base sm:text-lg">
                Built with @hudbird/ui Avatar, Badge, Card, and Grid primitives.
              </Text>
            </div>
            <Grid cols={1} className="gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {leadershipMembers.map((member) => (
                <Card key={member.name} variant="bordered" radius="lg" className="shadow-2xs">
                  <CardBody className="space-y-5 p-6">
                    <div className="flex items-center justify-between">
                      <Avatar size="lg" name={member.name} />
                      <Badge size="sm" variant="modern">
                        {member.location}
                      </Badge>
                    </div>
                    <div>
                      <Heading as="h4" className="text-lg font-semibold">
                        {member.name}
                      </Heading>
                      <Text className="mt-0.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        {member.role}
                      </Text>
                      <Text
                        variant="small"
                        className="text-muted-foreground mt-2.5 leading-relaxed"
                      >
                        {member.focus}
                      </Text>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </Container>
        </Section>
      );
    }

    case "careers": {
      return (
        <Section
          data-marketing-block="careers"
          data-variant={block.variant}
          spacing="lg"
          bordered="bottom"
          className="bg-zinc-50/50 dark:bg-white/[0.015]"
        >
          <Container className="space-y-10">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-3">
                <Badge size="sm" variant="modern" className="gap-1.5">
                  <span
                    className="inline-block h-2 w-2 rounded-full bg-emerald-500"
                    aria-hidden="true"
                  />
                  We are hiring
                </Badge>
                <Heading as="h2" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Open Engineering &amp; Design Roles at {brand.name}
                </Heading>
              </div>
              <Button size="md" variant="outline">
                <Briefcase className="mr-1.5 h-4 w-4" aria-hidden="true" />
                View All Departments
              </Button>
            </div>
            <Card variant="bordered" radius="lg" className="shadow-2xs">
              <CardBody className="p-0">
                <Table aria-label="Open career positions">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Req ID</TableHead>
                      <TableHead>Role Title</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Compensation Band</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {openRoles.map((role) => (
                      <TableRow key={role.id}>
                        <TableCell className="font-mono text-xs">{role.id}</TableCell>
                        <TableCell className="text-sm font-semibold text-zinc-900 dark:text-white">
                          {role.title}
                        </TableCell>
                        <TableCell>
                          <Badge size="sm" variant="modern">
                            {role.department}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs">{role.location}</TableCell>
                        <TableCell className="font-mono text-xs tabular-nums">
                          {role.compensation}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </Container>
        </Section>
      );
    }

    case "blog": {
      if (block.variant === "article-reader") {
        return (
          <Section
            data-marketing-block="blog"
            data-variant={block.variant}
            spacing="lg"
            bordered="bottom"
          >
            <Container className="mx-auto max-w-4xl space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2.5">
                  <Badge size="sm" variant="modern" className="gap-1.5">
                    <span
                      className="inline-block h-2 w-2 rounded-full bg-indigo-500"
                      aria-hidden="true"
                    />
                    Architecture Deep Dive
                  </Badge>
                  <Text variant="small" className="text-muted-foreground">
                    7 min read • {brandDomain}
                  </Text>
                </div>
                <Heading as="h1" className="text-3xl font-semibold tracking-tight sm:text-5xl">
                  Clean-Room Component Composition: From Base UI Primitives to Full-Page Blueprints
                </Heading>
                <div className="flex items-center gap-3.5 pt-2">
                  <Avatar size="md" name="Dani Akbar" />
                  <div className="text-xs">
                    <Text className="font-semibold text-zinc-900 dark:text-white">Dani Akbar</Text>
                    <Text variant="small" className="text-muted-foreground">
                      Principal Architect at {brand.name}
                    </Text>
                  </div>
                </div>
              </div>

              <Card variant="bordered" radius="lg" className="shadow-2xs">
                <CardBody className="space-y-4 p-7 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">
                  <Text>
                    Modern React design systems succeed when every high-level screen—whether an
                    executive dashboard, a step-up OTP verification screen, or a SaaS pricing
                    page—is assembled from a single source of accessible Base UI primitives.
                  </Text>
                  <Text>
                    In <strong>{brand.name}</strong>, Layer 0 provides focus-safe controls (Button,
                    Input, InputOTP, Select, Switch), Layer 1 composes organisms (Sidebar, Navbar,
                    Table, AreaChart, Accordion), and Layer 2/3 expose declarative JSON blueprints
                    for our Studio Page Builder.
                  </Text>
                </CardBody>
              </Card>
            </Container>
          </Section>
        );
      }

      return (
        <Section
          data-marketing-block="blog"
          data-variant={block.variant}
          spacing="lg"
          bordered="bottom"
        >
          <Container className="space-y-12">
            <div className="space-y-3">
              <Badge size="sm" variant="modern" className="gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-indigo-500"
                  aria-hidden="true"
                />
                Engineering &amp; Design Journal
              </Badge>
              <Heading as="h2" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Latest architecture dispatches from {brand.name}
              </Heading>
            </div>
            <Grid cols={1} className="gap-6 md:grid-cols-3">
              {blogDispatches.map((post) => (
                <Card key={post.slug} variant="bordered" radius="lg" className="shadow-2xs">
                  <CardBody className="flex h-full flex-col justify-between space-y-5 p-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge size="sm" variant="modern">
                          {post.category}
                        </Badge>
                        <Text variant="small" className="text-muted-foreground">
                          {post.readTime}
                        </Text>
                      </div>
                      <Heading as="h4" className="text-lg leading-snug font-semibold">
                        {post.title}
                      </Heading>
                      <Text className="text-muted-foreground text-sm leading-relaxed">
                        {post.excerpt}
                      </Text>
                    </div>
                    <div className="flex items-center justify-between border-t border-zinc-200/70 pt-4 text-xs dark:border-white/[0.08]">
                      <div className="flex items-center gap-2.5">
                        <Avatar size="sm" name={post.author} />
                        <Text className="text-xs font-semibold">{post.author}</Text>
                      </div>
                      <Text variant="small" className="text-muted-foreground">
                        {post.date}
                      </Text>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </Grid>
          </Container>
        </Section>
      );
    }

    case "contact": {
      return (
        <Section
          data-marketing-block="contact"
          data-variant={block.variant}
          spacing="lg"
          bordered="bottom"
        >
          <Container>
            <Grid cols={1} className="gap-10 lg:grid-cols-12">
              <div className="space-y-6 lg:col-span-5">
                <Badge size="sm" variant="modern" className="gap-1.5">
                  <span
                    className="inline-block h-2 w-2 rounded-full bg-indigo-500"
                    aria-hidden="true"
                  />
                  Enterprise Architecture Advisory
                </Badge>
                <Heading as="h2" className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Connect with the {brand.name} platform team
                </Heading>
                <Text className="text-muted-foreground text-base leading-relaxed">
                  Request a dedicated clean-room blueprint review, custom SLA, or private registry
                  deployment for {brandDomain}.
                </Text>
                <div className="space-y-3.5 pt-2">
                  <Card variant="bordered" radius="lg" className="shadow-2xs">
                    <CardBody className="flex items-center gap-3.5 p-4">
                      <IconBox size="md" variant="modern" icon={MapPin} showGlow={false} />
                      <div className="text-xs">
                        <Text className="font-semibold">Global Engineering Hubs</Text>
                        <Text variant="small" className="text-muted-foreground">
                          Singapore • Zurich • San Francisco
                        </Text>
                      </div>
                    </CardBody>
                  </Card>
                  <Card variant="bordered" radius="lg" className="shadow-2xs">
                    <CardBody className="flex items-center gap-3.5 p-4">
                      <IconBox size="md" variant="modern" icon={Mail} showGlow={false} />
                      <div className="text-xs">
                        <Text className="font-semibold">Direct Enterprise Desk</Text>
                        <Text variant="small" className="text-muted-foreground">
                          enterprise@{brandDomain} • &lt;2h SLA
                        </Text>
                      </div>
                    </CardBody>
                  </Card>
                </div>
              </div>

              <div className="lg:col-span-7">
                <Card variant="bordered" radius="lg" className="shadow-xs">
                  <CardBody className="p-6 sm:p-8">
                    <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                      <Grid cols={1} className="gap-4 sm:grid-cols-2">
                        <Input label="Full Name" defaultValue="Elena Rostova" />
                        <Input label="Work Email" defaultValue={`elena@${brandDomain}`} />
                      </Grid>
                      <Select label="Primary Blueprint Scope" defaultValue="all">
                        <SelectItem value="all">
                          Full Suite (Application UI + Shared Pages + Marketing)
                        </SelectItem>
                        <SelectItem value="app">Application UI Dashboards &amp; Shells</SelectItem>
                        <SelectItem value="marketing">
                          Marketing Pages &amp; Studio Builder
                        </SelectItem>
                      </Select>
                      <Textarea
                        label="Architecture Requirements"
                        rows={3}
                        defaultValue={`We are standardizing ${brand.name} across our dashboard shells, auth flows, and marketing site.`}
                      />
                      <Button
                        type="submit"
                        variant="solid"
                        color="primary"
                        size="lg"
                        className="w-full"
                      >
                        Request Architecture Briefing
                      </Button>
                    </form>
                  </CardBody>
                </Card>
              </div>
            </Grid>
          </Container>
        </Section>
      );
    }

    case "legal": {
      return (
        <Section
          data-marketing-block="legal"
          data-variant={block.variant}
          spacing="lg"
          bordered="bottom"
        >
          <Container className="space-y-8">
            <div className="space-y-3">
              <Badge size="sm" variant="modern" className="gap-1.5">
                <span
                  className="inline-block h-2 w-2 rounded-full bg-indigo-500"
                  aria-hidden="true"
                />
                {block.variant === "security-dpa"
                  ? "Data Processing & Subprocessors"
                  : "Master Subscription Terms & Privacy"}
              </Badge>
              <Heading as="h2" className="text-3xl font-semibold tracking-tight">
                {block.variant === "security-dpa"
                  ? `${brand.name} SOC2 Type II & Subprocessor Ledger`
                  : `${brand.name} Terms of Service & Data Privacy Framework`}
              </Heading>
            </div>
            <Card variant="bordered" radius="lg" className="shadow-2xs">
              <CardBody className="p-6 sm:p-8">
                <DescriptionList variant="flat" orientation="horizontal">
                  <DescriptionListItem>
                    <DescriptionListLabel>Data Controller &amp; Processor</DescriptionListLabel>
                    <DescriptionListValue>
                      {brand.name} Inc. ({brandDomain})
                    </DescriptionListValue>
                  </DescriptionListItem>
                  <DescriptionListItem>
                    <DescriptionListLabel>Encryption Standards</DescriptionListLabel>
                    <DescriptionListValue>
                      TLS 1.3 in transit • AES-256-GCM at rest with customer-managed KMS keys
                    </DescriptionListValue>
                  </DescriptionListItem>
                  <DescriptionListItem>
                    <DescriptionListLabel>Audit &amp; Compliance Attestations</DescriptionListLabel>
                    <DescriptionListValue>
                      SOC2 Type II, ISO 27001, GDPR Art. 28 Standard Contractual Clauses
                    </DescriptionListValue>
                  </DescriptionListItem>
                </DescriptionList>
              </CardBody>
            </Card>
          </Container>
        </Section>
      );
    }

    case "newsletter": {
      return (
        <Section
          data-marketing-block="newsletter"
          data-variant={block.variant}
          spacing="lg"
          bordered="bottom"
        >
          <Container>
            <Card
              variant="bordered"
              radius="lg"
              className="bg-zinc-50/80 shadow-xs dark:bg-[#15161b]"
            >
              <CardBody className="flex flex-col gap-6 p-7 lg:flex-row lg:items-center lg:justify-between lg:p-10">
                <div className="max-w-xl space-y-2.5">
                  <Badge size="sm" variant="modern" className="gap-1.5">
                    <span
                      className="inline-block h-2 w-2 rounded-full bg-indigo-500"
                      aria-hidden="true"
                    />
                    Monthly Architecture Dispatch
                  </Badge>
                  <Heading as="h3" className="text-2xl font-semibold tracking-tight">
                    Subscribe to {brand.name} release notes &amp; blueprint updates
                  </Heading>
                  <Text className="text-muted-foreground text-sm">
                    Zero spam. Receive new Application UI shells, Shared Auth flows, and Marketing
                    sections directly.
                  </Text>
                </div>
                <form
                  onSubmit={(e) => e.preventDefault()}
                  className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
                >
                  <div className="flex-1">
                    <Input
                      placeholder={`architect@${brandDomain}`}
                      defaultValue={`architect@${brandDomain}`}
                      aria-label="Newsletter email"
                    />
                  </div>
                  <Button type="submit" variant="solid" color="primary">
                    Subscribe
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Container>
        </Section>
      );
    }

    default:
      return null;
  }
};

export interface MarketingExamplePageRendererProps {
  exampleSlug: MarketingExampleCategorySlug;
  blocks: MarketingExtendedBlockSelection[];
  brand: BrandProfile;
  landingConfig?: LandingPageConfig;
}

export const MarketingExamplePageRenderer: React.FC<MarketingExamplePageRendererProps> = ({
  exampleSlug,
  blocks,
  brand,
  landingConfig,
}) => {
  const enabledBlocks = blocks.filter((b) => b.enabled);

  return (
    <div
      data-hudbird-domain="marketing"
      data-marketing-example={exampleSlug}
      className="overflow-hidden rounded-3xl border border-zinc-200/90 bg-white text-zinc-900 shadow-xs dark:border-white/[0.08] dark:bg-[#0d0d10] dark:text-zinc-100"
    >
      {enabledBlocks.map((block, index) => (
        <MarketingExtendedBlockRenderer
          key={`${block.type}-${index}`}
          block={block}
          brand={brand}
          landingConfig={landingConfig}
        />
      ))}
    </div>
  );
};
