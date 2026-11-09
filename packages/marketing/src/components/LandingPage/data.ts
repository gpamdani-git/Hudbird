import type { LandingSectionContent, HeroImage } from "@hudbird/schemas";
import { pilotHeroes, startupContent } from "../StartupPilot";

const hudbirdMark = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81 123" fill="currentColor"><path d="M11.5 0A11.5 11.5 0 0 1 23 11.5V44c2-6 13-9 25-9 16 0 32.5 10 32.5 30v46.5a11.25 11.25 0 0 1-22.5 0V65c0-8-8-11.5-17.5-11.5S23 58 23 67v44.5a11.5 11.5 0 0 1-23 0v-100A11.5 11.5 0 0 1 11.5 0Z"/></svg>'
)}`;

const overview: HeroImage =
  pilotHeroes.split.variant === "split"
    ? pilotHeroes.split.image
    : { src: "", alt: "Product preview" };
const projects: HeroImage =
  pilotHeroes.slideshow.variant === "slideshow" ? pilotHeroes.slideshow.slides[1] : overview;
const notes: HeroImage = {
  ...overview,
  src: overview.src.replaceAll("Overview", "Notes"),
  darkSrc: overview.darkSrc?.replaceAll("Overview", "Notes"),
  alt: "Notes product interface with sample tasks",
};

export const formaLandingContent: LandingSectionContent = {
  navbar: {
    action: { label: "See the demo", href: "#features" },
    links: [
      {
        label: "Product",
        target: "features",
        description: "Explore projects, notes, and the next step.",
      },
      {
        label: "Workflow",
        target: "how-it-works",
        description: "See how an idea becomes a shared plan.",
      },
      {
        label: "Integrations",
        target: "integrations",
        description: "Explore example connections for your workflow.",
      },
      { label: "Pricing", target: "pricing", description: "Compare illustrative plan options." },
      { label: "Questions", target: "faq", description: "A few useful answers before you begin." },
    ],
  },
  hero: {
    content: {
      ...startupContent.hero,
      primaryAction: { label: "See the workspace", href: "#features" },
      secondaryAction: { label: "How it works", href: "#how-it-works" },
    },
    variants: {
      centered: pilotHeroes.centered,
      split: pilotHeroes.split,
      interactive: pilotHeroes.interactive,
      slideshow: pilotHeroes.slideshow,
      video: pilotHeroes.video,
    },
  },
  logos: {
    title: "Shaping the future of investment intelligence",
    description: "Built around a clear system.",
    items: ["Stripe", "Linear", "Supabase", "GitHub", "Vercel", "OpenAI", "Notion", "Figma"],
    logo: { src: "/assets/logos/vercel.svg", alt: "Partner logo" },
  },
  benefits: {
    title: startupContent.benefitsTitle,
    description: "Bring your brief, work, and decisions into one considered space.",
    items: startupContent.benefits.map((item, index) => ({ id: `benefit-${index}`, ...item })),
    image: overview,
  },
  features: {
    title: "The right view for the work ahead.",
    description: "Move between the whole picture and the details. Try the example views below.",
    items: [
      {
        id: "overview",
        title: "A shared overview",
        description:
          "Start with the brief, the priority, and what needs attention. Keep the context where the work happens.",
        image: overview,
      },
      {
        id: "projects",
        title: "Projects with a next step",
        description:
          "Turn the plan into a short, readable list of decisions and actions. Make progress easy to understand.",
        image: projects,
      },
      {
        id: "notes",
        title: "Notes in context",
        description:
          "Keep useful details close to the project instead of scattering them across separate conversations.",
        image: notes,
      },
    ],
  },
  "how-it-works": {
    title: "From a thought to a shared plan.",
    description: "A simple example workflow for a small product team.",
    items: [
      {
        id: "builder",
        title: "Hudbird Page Builder",
        description:
          "Compose production-ready SaaS landing pages with real-time visual section stacking, live theme token syncing, and instant responsive previews.",
        image: notes,
      },
      {
        id: "export",
        title: "Export Clean Code",
        description:
          "Generate full-stack React & Next.js projects with Tailwind CSS v4, pristine static HTML/CSS, or copy-paste AI prompt recipes.",
        image: projects,
      },
      {
        id: "deploy",
        title: "Audit & Deploy",
        description:
          "Automate edge delivery to Vercel, Cloudflare, or Docker with 100/100 Lighthouse performance and zero layout shift.",
        image: overview,
      },
    ],
  },
  integrations: {
    title: "Make room for the rest of your tools.",
    description:
      "Illustrative connection ideas for a shared workspace. These examples do not connect to external services.",
    items: [
      {
        id: "messages",
        title: "Team messages",
        description: "Keep a useful conversation beside the project it belongs to.",
        category: "Communication",
      },
      {
        id: "meetings",
        title: "Meeting notes",
        description: "Carry a decision from a meeting into the next step.",
        category: "Communication",
      },
      {
        id: "repository",
        title: "Repository activity",
        description: "Link a development milestone to its product context.",
        category: "Product work",
      },
      {
        id: "design",
        title: "Design files",
        description: "Keep the current visual reference close to the brief.",
        category: "Product work",
      },
      {
        id: "calendar",
        title: "Calendar",
        description: "Place the next review in the rhythm of your week.",
        category: "Planning",
      },
      {
        id: "documents",
        title: "Documents",
        description: "Bring longer supporting material into the workspace.",
        category: "Planning",
      },
    ],
  },
  testimonials: {
    title: "Leave space for real experience.",
    description:
      "A preview of how verified feedback could appear. The quotations below are writing placeholders.",
    items: [
      {
        id: "quote-1",
        quote:
          "All I can say until this point is that Hudbird is trustworthy and their services are outstanding. Keep up the good work guys! Thank you!",
        source: "Adrian Lazea",
        context: "QA Engineer",
      },
      {
        id: "quote-2",
        quote:
          "Hudbird reduced our design-to-production turnaround from weeks to hours. The micro-interactions and accessibility are peerless.",
        source: "Elena Vance",
        context: "VP of Product, FinScale",
      },
      {
        id: "quote-3",
        quote:
          "The cleanest React code generation I've seen in a design system. Zero runtime overhead, pure Tailwind v4, and instantaneous export.",
        source: "David Sterling",
        context: "Founding Engineer, Veloce",
      },
      {
        id: "quote-4",
        quote:
          "Our engineering velocity jumped 3x within our first sprint. Every single block conforms to strict WCAG AA standards out of the box.",
        source: "Marcus Chen",
        context: "Lead Architect, CloudPulse",
      },
      {
        id: "quote-5",
        quote:
          "Finally, a component system that doesn't force compromise between design taste and engineering rigor. Simply extraordinary.",
        source: "Sophia Laurent",
        context: "Head of Design, Lumina",
      },
    ],
  },
  pricing: {
    title: "A plan for the way you work.",
    description:
      "The same illustrative plans, presented in two ways. Choose a layout that makes the differences clear.",
    plans: [
      {
        id: "personal",
        name: "Personal",
        price: "$0",
        period: "/ month",
        description: "A place to begin on your own.",
        features: ["One sample workspace", "Project and note views", "Local demonstration data"],
        action: { label: "Explore Personal", href: "#features" },
      },
      {
        id: "team",
        name: "Team",
        price: "$12",
        period: "/ seat / month",
        description: "An example plan for shared work.",
        features: ["Shared workspace concept", "Planning and review views", "Sample team workflow"],
        action: { label: "Explore Team", href: "#features" },
      },
      {
        id: "company",
        name: "Company",
        price: "$24",
        period: "/ seat / month",
        description: "An example plan for more coordination.",
        features: [
          "Multiple workspace concept",
          "Example integration categories",
          "Extended planning concept",
        ],
        action: { label: "Explore Company", href: "#features" },
      },
    ],
    comparisons: [
      { label: "Workspace example", values: ["Personal", "Shared", "Multiple"] },
      { label: "Project and note views", values: ["Included", "Included", "Included"] },
      { label: "Workflow concept", values: ["Individual", "Small team", "Cross-team"] },
      { label: "Live backend", values: ["Not connected", "Not connected", "Not connected"] },
    ],
  },
  faq: {
    title: "A few things worth knowing.",
    description: "Clear answers about this example and how to make it your own.",
    items: [
      {
        id: "demo",
        question: "Is Forma a live product?",
        answer:
          "Forma is the consistent demo product used across this Hudbird section collection. No backend, account, payment, or third-party integration is connected.",
        group: "The example",
      },
      {
        id: "data",
        question: "Where does the preview data come from?",
        answer:
          "The product views use local sample content. You can replace it with approved screenshots, copy, or connected application data in your own project.",
        group: "The example",
      },
      {
        id: "layout",
        question: "Can I switch layouts later?",
        answer:
          "Yes. The variant changes the presentation while the brand and content stay separate. Try the section controls in the landing page builder.",
        group: "Making it yours",
      },
      {
        id: "brand",
        question: "Can I use my own brand and font?",
        answer:
          "Yes. Change the brand profile, choose a font, and provide light and dark artwork where appropriate. Every section reads the shared profile.",
        group: "Making it yours",
      },
      {
        id: "publish",
        question: "What should I check before publishing?",
        answer:
          "Replace all demo claims, quotations, logos, prices, and action links. Check your real content at mobile and desktop widths and with keyboard navigation.",
        group: "Making it yours",
      },
    ],
  },
  cta: {
    title: "Give your next idea a little clarity.",
    description: "Explore the sample workspace, then shape the page around your own product.",
    action: { label: "Explore the workspace", href: "#features" },
    benefits: [
      "A shared place for the brief",
      "A readable view of the next step",
      "Room for the details that matter",
    ],
  },
  footer: {
    description: "A shared place for projects, notes, and the next step.",
    note: "Forma is a Hudbird demo. Replace sample content before publishing.",
    groups: [
      {
        title: "Product",
        links: [
          { label: "Features", target: "features" },
          { label: "Benefits", target: "benefits" },
        ],
      },
      {
        title: "Explore",
        links: [
          { label: "Workflow", target: "how-it-works" },
          { label: "Integrations", target: "integrations" },
        ],
      },
      {
        title: "Details",
        links: [
          { label: "Pricing", target: "pricing" },
          { label: "Questions", target: "faq" },
        ],
      },
    ],
  },
};
