import re

with open('apps/docs/src/components/templates/AiStartupTemplate.tsx', 'r') as f:
    content = f.read()

# 1. Add imports
content = content.replace(
    '} from "@hudbird/marketing";',
    '  Faq,\n} from "@hudbird/marketing";'
)
content = content.replace(
    '} from "@hudbird/ui";',
    ', Badge, Input } from "@hudbird/ui";'
)

# 2. Update MEGA_LINK_GROUPS
mega_links_old = """const MEGA_LINK_GROUPS = [
  {
    title: "Components",
    links: [
      { label: "Buttons", href: "#" },
      { label: "Cards", href: "#" },
      { label: "Inputs", href: "#" },
      { label: "Dialogs", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "#" },
      { label: "Templates", href: "#" },
      { label: "GitHub", href: "#" },
      { label: "Figma Kit", href: "#" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "About", href: "#" },
      { label: "Blog", href: "#" },
      { label: "Changelog", href: "#" },
      { label: "License", href: "#" },
    ],
  },
];"""

mega_links_new = """const MEGA_LINK_GROUPS = [
  {
    title: "Components",
    links: [
      { label: "Core UI", href: "/" },
      { label: "Marketing", href: "/" },
      { label: "Layouts", href: "/" },
      { label: "Icons", href: "/" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/" },
      { label: "Templates", href: "/" },
      { label: "GitHub", href: "/" },
      { label: "Figma Kit", href: "", badge: <Badge variant="secondary" className="scale-90 opacity-70">Soon</Badge> },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "About", href: "/" },
      { label: "Blog", href: "/" },
      { label: "Changelog", href: "/" },
      { label: "License", href: "/" },
    ],
  },
];"""

content = content.replace(mega_links_old, mega_links_new)

# 3. Insert Faq after PricingSection
faq_component = """      {/* <!-- FAQ Section --> */}
      <div className="bg-zinc-50 py-24 sm:py-32 dark:bg-zinc-950">
        <Faq
          label="Frequently Asked Questions"
          faqs={[
            {
              id: "1",
              question: "What is hudbird UI?",
              answer:
                "hudbird UI is a comprehensive library built on Atomic Design principles. It provides you with everything from atomic core components to complex data-driven marketing templates, accelerating your UI development significantly.",
            },
            {
              id: "2",
              question: "How does it accelerate development?",
              answer:
                "By providing pre-built molecules and full layout templates. Instead of building from scratch, you can assemble your application using our scalable directory structure and pre-tested components, saving months of development time.",
            },
            {
              id: "3",
              question: "Is it customizable?",
              answer:
                "Yes, fully customizable. It is powered by TailwindCSS v4 and Framer Motion, giving you complete control over styling, animations, and the overall look and feel of your application.",
            },
            {
              id: "4",
              question: "Does it support Dark Mode?",
              answer:
                "Absolutely. First-class dark and light mode support is built into every component and template out of the box, ensuring a seamless experience across all themes.",
            },
          ]}
        />
      </div>"""

content = content.replace("      </PricingSection>", "      </PricingSection>\n\n" + faq_component)

# 4. Update CtaSplit with Form
cta_old = """      <CtaSplit
        className="dark: border-t bg-white dark:bg-zinc-950"
        badge={
          <span className="inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400">
            Documentation
          </span>
        }
        title={
          <span className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Start building with hudbird UI today.
          </span>
        }
        description={
          <span className="mt-6 block text-lg text-zinc-400 dark:text-zinc-300">
            Stop reinventing the wheel. Use our carefully crafted components and templates to ship
            your next project in days, not months.
          </span>
        }
        imageSrc="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=2850&q=80"
        primaryAction={{
          label: "Read the Docs",
          href: "#",
          className: "bg-white text-zinc-950 hover:bg-zinc-200 h-14 px-8 rounded-full text-lg",
        }}
        secondaryAction={{
          label: "Browse Components",
          href: "#",
          className:
            "text-white border-zinc-700 hover:bg-zinc-800 h-14 px-8 rounded-full text-lg mt-4 sm:mt-0 sm:ml-4",
        }}
      />"""

cta_new = """      <div className="grid grid-cols-1 lg:grid-cols-2 border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950">
        <div className="flex flex-col justify-center p-12 lg:p-24">
          <span className="w-fit inline-flex items-center rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400">
            Documentation
          </span>
          <h2 className="mt-8 text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Start building with hudbird UI today.
          </h2>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            Stop reinventing the wheel. Use our carefully crafted components and templates to ship your next project in days, not months.
          </p>
          <div className="mt-10">
            <form action="mailto:dani.akbarr@gmail.com" method="post" encType="text/plain" className="flex flex-col sm:flex-row max-w-md gap-4">
              <Input type="email" name="email" placeholder="Enter your email for updates" className="h-12 w-full dark:bg-zinc-900" required />
              <Button type="submit" className="h-12 w-full sm:w-auto px-8 rounded-full bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="relative min-h-[500px] w-full">
          <img src="https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=2850&q=80" alt="Code" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </div>"""

content = content.replace(cta_old, cta_new)

# 5. Global href update from "#" to "/"
content = content.replace('href="#"', 'href="/"')

with open('apps/docs/src/components/templates/AiStartupTemplate.tsx', 'w') as f:
    f.write(content)

