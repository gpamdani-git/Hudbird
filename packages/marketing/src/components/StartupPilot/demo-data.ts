import type {
  BrandProfile,
  HeroImage,
  HeroSectionConfig,
  PageComposition,
  StartupPageContent,
} from "@hudbird/schemas";
import { demoVideo } from "./demo-video";

function productImage(view: string, accent: string): HeroImage {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1440" height="900" viewBox="0 0 1440 900"><rect width="1440" height="900" fill="#eef0f4"/><rect x="95" y="80" width="1250" height="740" rx="18" fill="white" stroke="#d4d4d8"/><path d="M95 150h1250M350 150v670" stroke="#e4e4e7"/><circle cx="130" cy="115" r="6" fill="${accent}"/><text x="155" y="123" font-family="sans-serif" font-size="22" fill="#18181b">Workspace preview</text><text x="1125" y="123" font-family="sans-serif" font-size="18" fill="#52525b">Sample data</text><rect x="120" y="190" width="200" height="48" rx="8" fill="${accent}"/><text x="140" y="221" font-family="sans-serif" font-size="20" fill="white">${view}</text><text x="140" y="285" font-family="sans-serif" font-size="20" fill="#52525b">Projects</text><text x="140" y="340" font-family="sans-serif" font-size="20" fill="#52525b">Notes</text><text x="410" y="230" font-family="sans-serif" font-size="40" font-weight="500" fill="#18181b">${view}</text><text x="410" y="278" font-family="sans-serif" font-size="22" fill="#52525b">A clear place for the next step.</text><rect x="410" y="330" width="865" height="110" rx="10" fill="#f4f5f7"/><circle cx="455" cy="385" r="12" fill="${accent}"/><text x="490" y="392" font-family="sans-serif" font-size="24" fill="#18181b">Prepare your next launch</text><path d="M410 500h865M410 600h865M410 700h865" stroke="#e4e4e7"/><text x="415" y="550" font-family="sans-serif" font-size="23" fill="#18181b">Review the product brief</text><text x="415" y="650" font-family="sans-serif" font-size="23" fill="#18181b">Collect feedback in one place</text><text x="415" y="750" font-family="sans-serif" font-size="23" fill="#18181b">Choose what happens next</text></svg>`;
  const darkSvg = svg
    .replaceAll("#eef0f4", "#161618")
    .replace('rx="18" fill="white"', 'rx="18" fill="#202124"')
    .replaceAll("#d4d4d8", "#42424a")
    .replaceAll("#e4e4e7", "#42424a")
    .replaceAll("#18181b", "#f4f4f5")
    .replaceAll("#52525b", "#b4b4bc")
    .replaceAll("#f4f5f7", "#29292e");
  return {
    src: `data:image/svg+xml,${encodeURIComponent(svg)}`,
    darkSrc: `data:image/svg+xml,${encodeURIComponent(darkSvg)}`,
    alt: `${view} product interface with sample tasks`,
    caption: "Illustrative product preview. Sample data.",
  };
}

export const pilotBrands: BrandProfile[] = [
  {
    id: "clear-blue",
    name: "Hudbird UI",
    primary: "#2457d6",
    fontFamily: '"Plus Jakarta Sans", sans-serif',
    radius: "soft",
    density: "comfortable",
    mode: "light",
  },
  {
    id: "studio-green",
    name: "Gather",
    primary: "#237459",
    fontFamily: 'Georgia, "Times New Roman", serif',
    radius: "round",
    density: "compact",
    mode: "light",
  },
];

export const startupContent: StartupPageContent = {
  benefitsTitle: "A clearer way to move forward.",
  faqTitle: "A few useful answers.",
  hero: {
    title: "Make room for your next idea.",
    description:
      "Bring projects, notes, and next steps into one shared workspace. See how your product could look, then make it your own.",
    primaryAction: { label: "See the product demo", href: "#product-demo" },
    secondaryAction: { label: "What’s included", href: "#benefits" },
  },
  benefits: [
    {
      title: "One place to begin",
      description: "Keep the brief and the next step together, without a wall of competing panels.",
    },
    {
      title: "A view for your work",
      description: "Move between a project overview and focused notes as your priorities change.",
    },
    {
      title: "Your brand, throughout",
      description: "Carry your colors, type, and visual rhythm from the first screen to the last.",
    },
  ],
  demo: {
    title: "Less explaining. More showing.",
    description:
      "Switch views to try this local product demo. No account or live service is connected.",
    tabs: [
      {
        id: "overview",
        label: "Overview",
        title: "A little clarity for your day.",
        description: "A sample project overview, organized around what needs attention.",
        items: [
          "Review the launch brief",
          "Collect feedback on the first draft",
          "Choose the next milestone",
        ],
      },
      {
        id: "projects",
        label: "Projects",
        title: "Give each idea a place.",
        description: "Example projects for demonstrating how this interface behaves.",
        items: [
          "Website launch · draft",
          "Product onboarding · review",
          "Customer guide · planned",
        ],
      },
      {
        id: "notes",
        label: "Notes",
        title: "Keep the useful details close.",
        description: "Illustrative notes, ready to be replaced with your own product content.",
        items: [
          "What should a visitor understand first?",
          "Which action should they take?",
          "What can we simplify?",
        ],
      },
    ],
  },
  faq: [
    {
      question: "Is this a working product?",
      answer:
        "This is a website template with a local interactive demo. It does not include a backend, accounts, or a connected product service.",
    },
    {
      question: "Can I change the hero later?",
      answer:
        "Yes. Choose a centered, split, slideshow, video, or interactive layout. Your brand, headline, and calls to action stay in place.",
    },
    {
      question: "What should I replace before publishing?",
      answer:
        "Add your own brand assets, product copy, media, and destination links. Review every claim and action against your actual offering.",
    },
  ],
  cta: {
    title: "See the idea in action.",
    description: "Try the example workspace above, then adapt the page to your own product.",
    action: { label: "Return to the demo", href: "#product-demo" },
  },
  footer: "Example startup website. Replace demo content before publishing.",
};

const overview = productImage("Overview", "#2457d6");
const projects = productImage("Projects", "#237459");

export const pilotHeroes: Record<HeroSectionConfig["variant"], HeroSectionConfig> = {
  centered: { variant: "centered", image: overview },
  split: { variant: "split", image: overview },
  slideshow: { variant: "slideshow", slides: [overview, projects] },
  video: { variant: "video", video: { src: demoVideo, poster: overview } },
  interactive: { variant: "interactive", tabs: startupContent.demo.tabs },
};

export const pilotCompositions: PageComposition[] = [
  {
    id: "story-first",
    name: "Story first",
    rationale: "Introduce the promise and benefits before inviting visitors into the product demo.",
    hero: pilotHeroes.split,
    sections: ["benefits", "demo", "faq", "cta"],
  },
  {
    id: "product-first",
    name: "Product first",
    rationale:
      "Lead with a hands-on product preview, then explain benefits after visitors have tried it.",
    hero: pilotHeroes.interactive,
    sections: ["demo", "benefits", "cta", "faq"],
  },
];
