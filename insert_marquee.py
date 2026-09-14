import re
import sys

with open('apps/docs/src/components/templates/AiStartupTemplate.tsx', 'r') as f:
    content = f.read()

# 1. Insert TemplateMarquee component
marquee_component = """
const templatesData = [
  { name: "SaaS Launchpad", src: "/assets/templates/saas-launchpad.png", width: "w-[400px] lg:w-[600px]" },
  { name: "Fintech App", src: "/assets/templates/fintech.png", width: "w-[300px] lg:w-[400px]" },
  { name: "AI Startup", src: "/assets/templates/ai-startup.png", width: "w-[350px] lg:w-[500px]" },
  { name: "E-Commerce", src: "/assets/templates/ecommerce.png", width: "w-[450px] lg:w-[700px]" },
  { name: "Modern App", src: "/assets/templates/modern-app.png", width: "w-[300px] lg:w-[450px]" },
  { name: "Digital Agency", src: "/assets/templates/digital-agency.png", width: "w-[350px] lg:w-[500px]" },
];

const TemplateMarquee = () => {
  const row1 = templatesData.slice(0, 3);
  const row2 = templatesData.slice(3, 6);

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-white py-24 sm:py-32 dark:bg-zinc-950">
      {/* Header */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          Shipped with hudbird ui
        </h2>
        <Button variant="outline" className="w-fit border-zinc-200 bg-zinc-50 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white">
          See all templates
        </Button>
      </div>

      {/* Marquee Rows */}
      <div className="flex w-full flex-col gap-6 lg:gap-8">
        {/* Row 1 - scrolling left */}
        <div className="flex w-full overflow-hidden group">
          <motion.div
            className="flex shrink-0 items-center gap-6 lg:gap-8 px-3 lg:px-4"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[...row1, ...row1, ...row1, ...row1].map((item, idx) => (
              <div
                key={`row1-${idx}`}
                className={`relative shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 ${item.width} aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] dark:border-zinc-800 dark:bg-zinc-900`}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-full w-full object-cover object-top opacity-90 transition-opacity duration-300 hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none dark:ring-white/10" />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - scrolling right */}
        <div className="flex w-full overflow-hidden group">
          <motion.div
            className="flex shrink-0 items-center gap-6 lg:gap-8 px-3 lg:px-4"
            animate={{ x: ["-50%", "0%"] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          >
            {[...row2, ...row2, ...row2, ...row2].map((item, idx) => (
              <div
                key={`row2-${idx}`}
                className={`relative shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 ${item.width} aspect-[4/3] hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] dark:border-zinc-800 dark:bg-zinc-900`}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  className="h-full w-full object-cover object-top opacity-90 transition-opacity duration-300 hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-2xl pointer-events-none dark:ring-white/10" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
      
      {/* Edge Fades for smooth infinite effect */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white to-transparent dark:from-zinc-950" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white to-transparent dark:from-zinc-950" />
    </div>
  );
};
"""

insert_idx = content.find("export const AiStartupTemplate = () => {")
if insert_idx == -1:
    print("Could not find AiStartupTemplate")
    sys.exit(1)

content = content[:insert_idx] + marquee_component + "\n" + content[insert_idx:]


# 2. Insert `<TemplateMarquee />` right above PricingSection
pricing_start = content.find('<PricingSection')
if pricing_start == -1:
    print("Could not find PricingSection")
    sys.exit(1)

# Find the end of the previous div/section which is just before PricingSection
content = content[:pricing_start] + "      <TemplateMarquee />\n\n      " + content[pricing_start:]

with open('apps/docs/src/components/templates/AiStartupTemplate.tsx', 'w') as f:
    f.write(content)

