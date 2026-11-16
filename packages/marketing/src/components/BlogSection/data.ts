export type BlogCategory = "Design Systems" | "Motion" | "Engineering";

export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

export interface BlogSectionQuote {
  text: string;
  attribution: string;
}

export interface BlogSectionImage {
  src: string;
  alt: string;
  caption: string;
}

export interface BlogSectionCodeSnippet {
  filename: string;
  language: string;
  code: string;
}

export interface BlogSectionBlock {
  id: string;
  heading: string;
  paragraphs: string[];
  quote?: BlogSectionQuote;
  image?: BlogSectionImage;
  codeSnippet?: BlogSectionCodeSnippet;
}

export interface BlogComment {
  id: string;
  author: string;
  role?: string;
  avatar?: string;
  timestamp: string;
  body: string;
  likes: number;
  likedByViewer?: boolean;
  replies?: BlogComment[];
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  category: BlogCategory;
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
  coverImage: BlogSectionImage;
  author: BlogAuthor;
  sections: BlogSectionBlock[];
  initialComments: BlogComment[];
}

export const BLOG_CATEGORIES = ["All", "Design Systems", "Motion", "Engineering"] as const;
export type BlogCategoryFilter = (typeof BLOG_CATEGORIES)[number];

export const DEFAULT_BLOG_POSTS: BlogPost[] = [
  {
    slug: "css-first-tokens-tailwind-v4",
    title: "Why We Moved From Runtime Theme Objects to CSS-First Tokens in Tailwind v4",
    summary:
      "Serializing theme palettes into React context creates extra style recalculations on every route switch. Defining semantic surface, border, and ink variables in CSS keeps component bundles small and dark mode instant.",
    category: "Design Systems",
    publishedAt: "November 12, 2026",
    readTime: "6 min read",
    featured: true,
    tags: ["Tailwind v4", "Design Tokens", "Architecture"],
    coverImage: {
      src: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Minimalist interface wireframe notebook and workstation setup",
      caption:
        "Token hierarchy drafted in monochrome before mapping final contrast pairs across light and dark surfaces.",
    },
    author: {
      name: "Nadia Kusuma",
      role: "Staff Design Systems Engineer",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=160&h=160",
      bio: "Leads design token architecture and core primitives across @hudbird/ui, focusing on contrast discipline and zero-runtime styling.",
    },
    sections: [
      {
        id: "runtime-theme-cost",
        heading: "The hidden cost of JavaScript theme trees",
        paragraphs: [
          "Early versions of Hudbird passed brand surfaces, radii, and elevation scales down through React providers. Every nested marketing section read those values to compose class strings or inject inline styles at render time.",
          "When product teams previewed multi-page builds or toggled dark mode inside a live editor, React had to reconcile hundreds of leaf components even though only three CSS properties changed. Moving token resolution into @theme blocks removed that work from the render cycle.",
        ],
        quote: {
          text: "A color swap should recalc styles inside the browser engine, never re-run JavaScript component trees.",
          attribution: "Nadia Kusuma, @hudbird/ui Architecture Review",
        },
      },
      {
        id: "css-first-contract",
        heading: "Designing a CSS-first variable contract",
        paragraphs: [
          "Instead of exposing raw hex palettes to feature components, Hudbird scopes semantic tokens such as --background, --foreground, and --primary inside BrandScope. Components consume utility classes compiled directly against those custom properties.",
          "Because Tailwind v4 resolves @theme utilities into standard CSS variables at build time, documentation apps and customer storefronts share identical stylesheet output without syncing a separate runtime config file.",
        ],
        codeSnippet: {
          filename: "packages/theme/tokens.css",
          language: "css",
          code: `@theme {
  --color-background: var(--hb-surface-base, #ffffff);
  --color-foreground: var(--hb-ink-primary, #09090b);
  --color-border-subtle: var(--hb-line-muted, rgba(9, 9, 11, 0.08));
  --radius-editorial: 1.25rem;
}`,
        },
        image: {
          src: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=1400",
          alt: "Engineer reviewing stylesheet variable declarations on a laptop display",
          caption:
            "Auditing CSS token fallback behavior in a clean split-screen build environment.",
        },
      },
      {
        id: "migration-takeaways",
        heading: "Practical rules when migrating existing blocks",
        paragraphs: [
          "Keep brand overrides minimal at the container boundary. Only set primary ink, accent surface, and border contrast on the root scope element so nested cards inherit predictable elevation automatically.",
          "Test every custom surface pair at both 390px and 1440px before publishing. When border and muted text ratios live in one CSS file, fixing an accessibility contrast gap updates every section at once.",
        ],
      },
    ],
    initialComments: [
      {
        id: "c-tokens-1",
        author: "Raka Pratama",
        role: "Frontend Architect",
        avatar:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=160&h=160",
        timestamp: "2 hours ago",
        body: "Moving BrandScope overrides to CSS custom properties cut our preview switch flicker completely. Did you run into any specificity conflicts with third-party markdown prose styles?",
        likes: 14,
        replies: [
          {
            id: "c-tokens-1-r1",
            author: "Nadia Kusuma",
            role: "Author",
            avatar:
              "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=160&h=160",
            timestamp: "1 hour ago",
            body: "Good question. Wrapping rich editorial prose in a dedicated article scope prevented global typography defaults from overriding heading weights inside cards.",
            likes: 7,
          },
        ],
      },
      {
        id: "c-tokens-2",
        author: "claire.wu",
        role: "Design Systems Lead",
        timestamp: "Yesterday",
        body: "Keeping --hb-line-muted explicit in both modes saved our team hours during WCAG review.",
        likes: 9,
      },
    ],
  },
  {
    slug: "interruptible-spring-physics-motion",
    title: "Interruptible Spring Physics: How UI Transitions Stay Fast Under Rapid Input",
    summary:
      "Fixed duration timers stall when users switch tabs or cancel overlays mid-flight. Here is how Hudbird calibrates spring damping, monochrome photo hovers, and reduced-motion fallbacks.",
    category: "Motion",
    publishedAt: "November 8, 2026",
    readTime: "5 min read",
    tags: ["Motion", "Physics", "Accessibility"],
    coverImage: {
      src: "https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Dual monitor developer workstation configured for frame timing analysis",
      caption: "Inspecting frame budget and spring settle curves across consecutive tab switches.",
    },
    author: {
      name: "Marcus Lee",
      role: "Performance & Motion Engineer",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=160&h=160",
      bio: "Works on compositor-only transitions, Motion spring tuning, and pointer-aware micro-interactions in @hudbird/marketing.",
    },
    sections: [
      {
        id: "why-springs-win",
        heading: "Respecting pointer intent during rapid clicks",
        paragraphs: [
          "Users rarely wait for a drawer or tab indicator to finish settling before clicking the next option. When an interface drives that indicator with a linear or cubic-bezier keyframe timer, interrupting the motion resets velocity to zero and creates a visible jerk.",
          "With interruptible spring parameters around 0.34s visual duration and light 0.14 bounce, Motion carries existing velocity toward the new target without overshoot fatigue.",
        ],
        quote: {
          text: "If an animation forces the reader to wait before the next click feels valid, the timing is too slow.",
          attribution: "Marcus Lee, Hudbird Motion Guidelines",
        },
      },
      {
        id: "monochrome-hover-discipline",
        heading: "Gating hover transitions to fine pointers",
        paragraphs: [
          "Editorial photography in Hudbird starts in high-contrast monochrome and shifts to full color on interaction. Applying hover effects blindly causes sticky states on mobile browsers where the first tap only triggers hover.",
          "Wrapping hover transforms and filter changes inside @media (hover: hover) and (pointer: fine) ensures mouse users get crisp 220ms color transitions while touch users get clean :active feedback and immediate navigation.",
        ],
        codeSnippet: {
          filename: "packages/marketing/src/components/BlogSection/blog-section.css",
          language: "css",
          code: `@media (hover: hover) and (pointer: fine) {
  .hb-blog-media-card:hover .hb-blog-media-img {
    filter: grayscale(0%) contrast(1);
    transform: scale(1.02);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hb-blog-media-card:hover .hb-blog-media-img {
    transform: none !important;
  }
}`,
        },
        image: {
          src: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1400",
          alt: "Software engineer workspace lit cleanly for visual contrast evaluation",
          caption:
            "Validating smooth grayscale-to-color hover response across calibrated desktop displays.",
        },
      },
      {
        id: "reduced-motion-contract",
        heading: "Making reduced motion a first-class path",
        paragraphs: [
          "Reduced motion does not mean stripping clarity from state changes. Keep opacity and filter transitions fast and subtle while removing vertical translations, spring bounce, and scale zooms when prefers-reduced-motion is enabled.",
        ],
      },
    ],
    initialComments: [
      {
        id: "c-motion-1",
        author: "Elena Rostova",
        role: "UI Engineer",
        avatar:
          "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=160&h=160",
        timestamp: "3 days ago",
        body: "The 220ms grayscale filter curve feels much cleaner than animating overlay gradients. Combining it with scale(1.02) stays smooth at 60fps.",
        likes: 11,
      },
    ],
  },
  {
    slug: "composable-multi-page-schemas",
    title: "Composable Multi-Page Schemas Without Breaking Static Type Inference",
    summary:
      "Multi-page site builders quickly drift when templates hardcode layout flags across unrelated views. Modeling page templates as typed union configs keeps serialization safe and export code readable.",
    category: "Engineering",
    publishedAt: "November 3, 2026",
    readTime: "7 min read",
    tags: ["TypeScript", "Schemas", "Page Builder"],
    coverImage: {
      src: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1400",
      alt: "Type-safe source code modules open in a focused programming editor",
      caption: "Inspecting discriminated union schemas for page templates and navigation trees.",
    },
    author: {
      name: "Sophia Hughes",
      role: "Developer Experience Lead",
      avatar:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=160&h=160",
      bio: "Designs the CLI scaffolding, website project serialization, and React export generators in Hudbird.",
    },
    sections: [
      {
        id: "single-source-templates",
        heading: "Deriving templates from a const registry",
        paragraphs: [
          "In a visual page builder, adding a template like Blog or Single Post touches four places at once: the modal template picker, URL path allocator, section defaults, and runtime parser.",
          "Defining websiteTemplates as a readonly tuple and inferring WebsiteTemplate from (typeof websiteTemplates)[number]['id'] guarantees that missing a branch in export generation fails compilation immediately.",
        ],
        codeSnippet: {
          filename: "packages/marketing/src/components/WebsiteProject/config.ts",
          language: "ts",
          code: `export const websiteTemplates = [
  { id: "home", name: "Landing page", group: "Website", path: "/home" },
  { id: "blog", name: "Blog", group: "Website", path: "/blog" },
  { id: "blog-post", name: "Single Post", group: "Website", path: "/blog/post" },
] as const;

export type WebsiteTemplate = (typeof websiteTemplates)[number]["id"];`,
        },
        quote: {
          text: "Validation at load time matters most for saved user projects that evolve across weekly releases.",
          attribution: "Sophia Hughes, WebsiteProject RFC",
        },
      },
      {
        id: "parent-child-routes",
        heading: "Nested pages without breaking hash exports",
        paragraphs: [
          "Editorial workflows often pair an index feed at /blog with a reader template at /blog/post. Rather than baking parent-child pointers into fragile nested arrays inside JSON state, Hudbird keeps pages flat for routing while grouping sub-pages visually in the builder tree.",
          "This structure keeps static hash navigation predictable in exported Vite or Next apps while giving authors one-click creation for the full blog flow.",
        ],
        image: {
          src: "https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1400",
          alt: "Close-up of clean terminal and schema validation tests passing",
          caption:
            "Round-trip JSON validation verifies normalized paths and exported project code on every template addition.",
        },
      },
    ],
    initialComments: [
      {
        id: "c-schema-1",
        author: "Daniel Park",
        role: "Platform Engineer",
        timestamp: "5 days ago",
        body: "Keeping stored pages flat while rendering nested hierarchy in the sidebar avoids recursive state updates on rename or delete. Solid pattern.",
        likes: 18,
      },
    ],
  },
];

export function getBlogPostBySlug(
  slug?: string,
  posts: readonly BlogPost[] = DEFAULT_BLOG_POSTS
): BlogPost {
  if (!posts.length) {
    return DEFAULT_BLOG_POSTS[0];
  }
  return posts.find((post) => post.slug === slug) ?? posts[0];
}

export function getRelatedBlogPosts(
  slug: string,
  posts: readonly BlogPost[] = DEFAULT_BLOG_POSTS,
  limit = 2
): BlogPost[] {
  const current = getBlogPostBySlug(slug, posts);
  const others = posts.filter((post) => post.slug !== current.slug);
  return others.slice(0, limit);
}

export function countAllComments(comments: readonly BlogComment[]): number {
  return comments.reduce((sum, item) => sum + 1 + (item.replies?.length ?? 0), 0);
}

/**
 * Scrolls the blog section (or its parent IframePreview host) cleanly to top.
 */
export function scrollBlogRootToTop(
  rootEl: HTMLElement | null,
  behavior: ScrollBehavior = "smooth"
): void {
  if (!rootEl) return;
  const ownerWin = rootEl.ownerDocument?.defaultView;
  if (ownerWin) {
    try {
      if (ownerWin.parent && ownerWin.parent !== ownerWin) {
        const parentDoc = ownerWin.parent.document;
        const hostFrame = Array.from(parentDoc.querySelectorAll("iframe")).find(
          (frame) => frame.contentWindow === ownerWin
        );
        if (hostFrame) {
          ownerWin.parent.scrollTo?.({ top: 0, behavior });
          hostFrame.parentElement?.scrollTo?.({ top: 0, behavior });
          ownerWin.scrollTo?.({ top: 0, behavior });
          return;
        }
      }
    } catch {
      // Cross-origin frame access is safely ignored
    }
    try {
      ownerWin.scrollTo?.({ top: 0, behavior });
    } catch {
      // Ignore unimplemented JSDOM window.scrollTo
    }
  }
  try {
    rootEl.scrollIntoView?.({ behavior, block: "start" });
  } catch {
    // Constrained test DOM environments may omit scrollIntoView
  }
}
