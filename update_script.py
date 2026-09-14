import re

with open('apps/docs/src/components/templates/AiStartupTemplate.tsx', 'r') as f:
    content = f.read()

# 1. Add TypewriterText component at the top after imports
typewriter_code = """const TypewriterText = ({ text, delay = 0, className = "" }: { text: string, delay?: number, className?: string }) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1, delay: delay + i * 0.05 }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </span>
  );
};
"""

# Find place to insert (after ParticleOrb for instance, or before AiStartupTemplate)
insert_idx = content.find("export const AiStartupTemplate = () => {")
content = content[:insert_idx] + typewriter_code + "\n" + content[insert_idx:]


# 2. Update heights of cards to 600px and CodeBlock width
content = content.replace(
    'className="flex flex-col overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0a0f1c]"',
    'className="flex h-[600px] flex-col overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#0a0f1c]"'
)

content = content.replace(
    '<div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-200 shadow-2xl dark:border-zinc-800">',
    '<div className="relative w-full max-w-3xl overflow-hidden rounded-xl border border-zinc-200 shadow-2xl dark:border-zinc-800">'
)

content = content.replace(
    'className="sticky top-24 flex h-fit flex-col overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#15151e]"',
    'className="sticky top-24 flex h-[600px] flex-col justify-between overflow-hidden rounded-[32px] border border-zinc-200 bg-white shadow-xl dark:border-white/10 dark:bg-[#15151e]"'
)

# 3. Update the chat bubbles with Typewriter effect
# Bubble 0
old_bubble_0 = """                      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        <span className="font-semibold text-blue-600 dark:text-blue-400">/cms</span> Add
                        these{" "}
                        <span className="rounded bg-white px-1.5 py-0.5 font-mono text-xs font-medium shadow-sm dark:bg-black/50">
                          articles.csv
                        </span>{" "}
                        to my collection and list them on the articles page.
                      </p>"""
new_bubble_0 = """                      <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-semibold text-blue-600 dark:text-blue-400">/cms </motion.span>
                        <TypewriterText text="Add these " delay={0.2} />
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="rounded bg-white px-1.5 py-0.5 font-mono text-xs font-medium shadow-sm dark:bg-black/50">articles.csv</motion.span>
                        <TypewriterText text=" to my collection and list them on the articles page." delay={0.6} />
                      </div>"""
content = content.replace(old_bubble_0, new_bubble_0)

# Bubble 1
old_bubble_1 = """                      <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        <span className="font-semibold text-indigo-600 dark:text-indigo-400">/ui</span> Generate a hero section using{" "}
                        <span className="rounded bg-white px-1.5 py-0.5 font-mono text-xs font-medium shadow-sm dark:bg-black/50">
                          @hudbird/ui
                        </span>{" "}
                        components.
                      </p>"""
new_bubble_1 = """                      <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-semibold text-indigo-600 dark:text-indigo-400">/ui </motion.span>
                        <TypewriterText text="Generate a hero section using " delay={0.2} />
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="rounded bg-white px-1.5 py-0.5 font-mono text-xs font-medium shadow-sm dark:bg-black/50">@hudbird/ui</motion.span>
                        <TypewriterText text=" components." delay={0.7} />
                      </div>"""
content = content.replace(old_bubble_1, new_bubble_1)

# Thought 0
old_thought_0 = """                          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            I'll import the articles from your CSV file into the CMS collection. Then I'll
                            connect the collection list to the articles page so all 320 items appear.
                          </p>"""
new_thought_0 = """                          <TypewriterText className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400" text="I'll import the articles from your CSV file into the CMS collection. Then I'll connect the collection list to the articles page so all 320 items appear." delay={0.2} />"""
content = content.replace(old_thought_0, new_thought_0)

# Thought 1
old_thought_1 = """                          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            I'll pull in the BentoGrid and Button components, and assemble a responsive hero section for you.
                          </p>"""
new_thought_1 = """                          <TypewriterText className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400" text="I'll pull in the BentoGrid and Button components, and assemble a responsive hero section for you." delay={0.2} />"""
content = content.replace(old_thought_1, new_thought_1)

# Ensure Changes boxes appear AFTER the typewriter effect is done (delay ~ 1.5s)
content = content.replace(
    '<div className="mt-4 flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm dark:border-white/5 dark:bg-black/20">',
    '<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="mt-4 flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm dark:border-white/5 dark:bg-black/20">'
)
# Note: we need to replace the closing </div> for the changes boxes with </motion.div>
# Since there are multiple divs, we can just replace the specific block text
changes_box_0 = """                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="mt-4 flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm dark:border-white/5 dark:bg-black/20">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-zinc-900 dark:text-white">Changes</span>
                              <span className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                                Undo
                              </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">
                              <div className="flex items-center gap-2 font-medium">
                                <Database className="h-3.5 w-3.5 text-blue-500" /> Blog
                              </div>
                              <span className="text-xs text-zinc-500">320 items</span>
                            </div>
                          </div>"""
new_changes_box_0 = changes_box_0.replace('</div>', '</motion.div>', 1).replace('</motion.div>', '</div>', 1) # This is a bit tricky, let's just do a manual string replace
# Instead of doing that, I'll just change the first <div> to <motion.div> and the very last </div> to </motion.div>
content = content.replace(
    '''                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="mt-4 flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm dark:border-white/5 dark:bg-black/20">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-zinc-900 dark:text-white">Changes</span>
                              <span className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                                Undo
                              </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">
                              <div className="flex items-center gap-2 font-medium">
                                <Database className="h-3.5 w-3.5 text-blue-500" /> Blog
                              </div>
                              <span className="text-xs text-zinc-500">320 items</span>
                            </div>
                          </div>''',
    '''                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="mt-4 flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm dark:border-white/5 dark:bg-black/20">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-zinc-900 dark:text-white">Changes</span>
                              <span className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                                Undo
                              </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">
                              <div className="flex items-center gap-2 font-medium">
                                <Database className="h-3.5 w-3.5 text-blue-500" /> Blog
                              </div>
                              <span className="text-xs text-zinc-500">320 items</span>
                            </div>
                          </motion.div>'''
)

content = content.replace(
    '''                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="mt-4 flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm dark:border-white/5 dark:bg-black/20">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-zinc-900 dark:text-white">Changes</span>
                              <span className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                                Undo
                              </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">
                              <div className="flex items-center gap-2 font-medium">
                                <Layout className="h-3.5 w-3.5 text-indigo-500" /> Hero Section
                              </div>
                              <span className="text-xs text-zinc-500">Added</span>
                            </div>
                          </div>''',
    '''                          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="mt-4 flex flex-col gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-3 shadow-sm dark:border-white/5 dark:bg-black/20">
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-medium text-zinc-900 dark:text-white">Changes</span>
                              <span className="cursor-pointer text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300">
                                Undo
                              </span>
                            </div>
                            <div className="mt-2 flex items-center justify-between text-sm text-zinc-700 dark:text-zinc-300">
                              <div className="flex items-center gap-2 font-medium">
                                <Layout className="h-3.5 w-3.5 text-indigo-500" /> Hero Section
                              </div>
                              <span className="text-xs text-zinc-500">Added</span>
                            </div>
                          </motion.div>'''
)


with open('apps/docs/src/components/templates/AiStartupTemplate.tsx', 'w') as f:
    f.write(content)

print("Updated successfully!")
