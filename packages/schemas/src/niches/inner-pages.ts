// packages/schemas/src/niches/inner-pages.ts
import { InnerPageItem } from "../types";

export function createNicheInnerPages(baseSlug: string, nicheName: string): InnerPageItem[] {
  const BASE = baseSlug.startsWith("/") ? baseSlug : `/demos/${baseSlug}`;

  return [
    // Core (7 pages)
    {
      id: "about",
      slug: `${BASE}/about`,
      title: "About Studio",
      shortDesc: `The vision, leadership and architecture behind ${nicheName}.`,
      category: "core",
    },
    {
      id: "services",
      slug: `${BASE}/services`,
      title: "Services",
      shortDesc: "Complete capability breakdown and core offerings.",
      category: "core",
    },
    {
      id: "service-detail",
      slug: `${BASE}/services/detail`,
      title: "Service Specification",
      shortDesc: "Detailed scope, deliverables, tooling and execution timeline.",
      category: "services",
    },
    {
      id: "projects",
      slug: `${BASE}/projects`,
      title: "Work & Outcomes",
      shortDesc: "Selected shipped deployments and verifiable client metrics.",
      category: "core",
    },
    {
      id: "project-detail",
      slug: `${BASE}/projects/case-study`,
      title: "Case Study Deep-Dive",
      shortDesc: "Architecture challenges, implementation and measurable outcome.",
      category: "work",
    },
    {
      id: "process",
      slug: `${BASE}/process`,
      title: "Process & Methodology",
      shortDesc: "Five distinct phases with milestone demos and zero scope creep.",
      category: "core",
    },
    {
      id: "pricing",
      slug: `${BASE}/pricing`,
      title: "Pricing & Retainers",
      shortDesc: "Transparent tiers with quarterly savings and pause-anytime terms.",
      category: "core",
    },

    // Company (6 pages)
    {
      id: "team",
      slug: `${BASE}/team`,
      title: "Team & Leadership",
      shortDesc: "The multidisciplinary engineers and designers building the platform.",
      category: "company",
    },
    {
      id: "team-member",
      slug: `${BASE}/team/member`,
      title: "Team Profile",
      shortDesc: "Individual discipline, published research and shipped work.",
      category: "company",
    },
    {
      id: "careers",
      slug: `${BASE}/careers`,
      title: "Careers",
      shortDesc: "Open roles across engineering, product design and systems.",
      category: "company",
      badge: "Hiring",
    },
    {
      id: "career-detail",
      slug: `${BASE}/careers/senior-engineer`,
      title: "Role Specification",
      shortDesc: "Compensation range, technical requirements and application portal.",
      category: "company",
    },
    {
      id: "blog",
      slug: `${BASE}/blog`,
      title: "Journal & Engineering",
      shortDesc: "Technical essays, architecture deep-dives and design philosophy.",
      category: "company",
    },
    {
      id: "blog-post",
      slug: `${BASE}/blog/post`,
      title: "Engineering Essay",
      shortDesc: "In-depth long-form editorial article layout with syntax blocks.",
      category: "company",
    },

    // Product & Conversion (7 pages)
    {
      id: "contact",
      slug: `${BASE}/contact`,
      title: "Contact & Inquiry",
      shortDesc: "Direct project brief submission and technical consultation.",
      category: "core",
    },
    {
      id: "book",
      slug: `${BASE}/book`,
      title: "Schedule Call",
      shortDesc: "Direct calendar selector for 30-minute discovery briefing.",
      category: "services",
    },
    {
      id: "testimonials",
      slug: `${BASE}/testimonials`,
      title: "Client Testimonials",
      shortDesc: "Verified reviews, case quotes and feedback from engineering leads.",
      category: "work",
    },
    {
      id: "faq",
      slug: `${BASE}/faq`,
      title: "Frequently Asked Questions",
      shortDesc: "Answers to commercial, operational and technical inquiries.",
      category: "services",
    },
    {
      id: "integrations",
      slug: `${BASE}/integrations`,
      title: "Stack Ecosystem",
      shortDesc: "Battle-tested integrations across modern cloud and web stacks.",
      category: "services",
    },
    {
      id: "changelog",
      slug: `${BASE}/changelog`,
      title: "Changelog",
      shortDesc: "Chronological ledger of shipped features, improvements and patches.",
      category: "work",
      badge: "v4.2",
    },
    {
      id: "portal",
      slug: `${BASE}/portal`,
      title: "Client Workspace",
      shortDesc: "Authenticated portal with sprint burndowns and real-time deliverables.",
      category: "services",
    },

    // Auth & Utility Flows (9 pages)
    {
      id: "sign-in",
      slug: `${BASE}/sign-in`,
      title: "Sign In / Login",
      shortDesc: "Split Double-Bezel authentication with SSO, Passkey, and OAuth.",
      category: "utility",
      badge: "Auth",
    },
    {
      id: "sign-up",
      slug: `${BASE}/sign-up`,
      title: "Register / Sign Up",
      shortDesc: "Workspace creation flow with live password strength & slug preview.",
      category: "utility",
      badge: "Auth",
    },
    {
      id: "forgot-password",
      slug: `${BASE}/forgot-password`,
      title: "Forgot / Reset Password",
      shortDesc: "Instant account recovery link and cryptographic password reset.",
      category: "utility",
      badge: "Auth",
    },
    {
      id: "otp",
      slug: `${BASE}/otp`,
      title: "OTP 2FA Verification",
      shortDesc: "Interactive 6-digit security verification with countdown timer.",
      category: "utility",
      badge: "2FA",
    },
    {
      id: "privacy",
      slug: `${BASE}/privacy`,
      title: "Privacy Policy",
      shortDesc: "Information governance, telemetry disclosure and data security.",
      category: "utility",
    },
    {
      id: "terms",
      slug: `${BASE}/terms`,
      title: "Terms of Service",
      shortDesc: "Commercial engagement guidelines and intellectual property bounds.",
      category: "utility",
    },
    {
      id: "coming-soon",
      slug: `${BASE}/coming-soon`,
      title: "Coming Soon & Waitlist",
      shortDesc: "Next-generation module countdown and early-access VIP waitlist.",
      category: "utility",
      badge: "Q4",
    },
    {
      id: "maintenance",
      slug: `${BASE}/maintenance`,
      title: "System Maintenance",
      shortDesc: "Live regional cluster uptime telemetry and scheduled upgrade status.",
      category: "utility",
    },
    {
      id: "404",
      slug: `${BASE}/404`,
      title: "404 Not Found",
      shortDesc: "Architectural fallback view with smart directory navigation.",
      category: "utility",
    },
  ];
}
