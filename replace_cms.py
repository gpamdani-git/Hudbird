import re
import sys

with open('apps/docs/src/components/templates/AiStartupTemplate.tsx', 'r') as f:
    content = f.read()

# 1. Replace CMS mockup with AtomicIllustration
# The CMS mockup starts with {/* Simulated CMS/Design Interface */} and ends before {/* Feature Card 0 Content */}
mockup_start = content.find('{/* Simulated CMS/Design Interface */}')
mockup_end = content.find('{/* Feature Card 0 Content */}')

if mockup_start != -1 and mockup_end != -1:
    content = content[:mockup_start] + '<AtomicIllustration />\n\n                  ' + content[mockup_end:]
else:
    print("Could not find CMS mockup section")

# 2. Replace the copy for activeAgentCard === 0
# Title
content = content.replace(
    '<h3 className="text-xl font-semibold text-zinc-900 dark:text-white">\n                      Run your CMS with an agent\n                    </h3>',
    '<h3 className="text-xl font-semibold text-zinc-900 dark:text-white">\n                      From Atoms to Full Templates\n                    </h3>'
)

# Description
content = content.replace(
    'Manage more. Publish faster. The CMS agent sets up, organizes, and updates your entire CMS, connecting it directly to the canvas so content and design stay in sync.',
    'Accelerate UI development with Hudbird UI. Build scalable applications starting from atomic core components, to molecule-level marketing sections, and assemble data-driven layout templates with a clean directory structure.'
)

# 3. Update Chat Bubble for activeAgentCard === 0
bubble_old = """
                        <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            /cms{" "}
                          </span>
                          <TypewriterText text="Add these " delay={0.2} />
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="rounded bg-white px-1.5 py-0.5 font-mono text-xs font-medium shadow-sm dark:bg-black/50"
                          >
                            articles.csv
                          </motion.span>
                          <TypewriterText
                            text=" to my collection and list them on the articles page."
                            delay={0.6}
                          />
                        </div>"""

bubble_new = """
                        <div className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">
                            /ui{" "}
                          </span>
                          <TypewriterText text="scaffold a data-driven landing page template using " delay={0.2} />
                          <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="rounded bg-white px-1.5 py-0.5 font-mono text-xs font-medium shadow-sm dark:bg-black/50"
                          >
                            core components
                          </motion.span>
                        </div>"""

content = content.replace(bubble_old, bubble_new)

# 4. Update Chat Thoughts for activeAgentCard === 0
thought_old_1 = 'text="I\'ll import the articles from your CSV file into the CMS collection. Then I\'ll connect the collection list to the articles page so all 320 items appear."'
thought_new_1 = 'text="I\'ll compose the atomic components into marketing sections and assemble them into a full scalable page template following the directory structure."'
content = content.replace(thought_old_1, thought_new_1)

thought_old_2 = '<Database className="h-3.5 w-3.5 text-blue-500" /> Blog'
thought_new_2 = '<Layers className="h-3.5 w-3.5 text-blue-500" /> Page Template'
content = content.replace(thought_old_2, thought_new_2)

thought_old_3 = '<span className="text-xs text-zinc-500">320 items</span>'
thought_new_3 = '<span className="text-xs text-zinc-500">Assembled</span>'
content = content.replace(thought_old_3, thought_new_3)

with open('apps/docs/src/components/templates/AiStartupTemplate.tsx', 'w') as f:
    f.write(content)

