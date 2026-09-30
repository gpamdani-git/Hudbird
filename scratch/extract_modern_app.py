import os
import re

filepath = "apps/docs/src/components/templates/ModernAppTemplate.tsx"
out_dir = "packages/marketing/src/blocks/ModernApp"
os.makedirs(out_dir, exist_ok=True)

with open(filepath, "r") as f:
    lines = f.readlines()

# 1. Extract internal logic (lines 0 to 234)
internal_lines = lines[:234]

# We want to export all components and constants.
# Let's find anything that starts with "const " and does NOT start with indentation.
exported_internal_lines = []
internal_vars = []
for line in internal_lines:
    if line.startswith("const ") and " = " in line:
        var_name = line.split("const ")[1].split(" =")[0].split(":")[0].strip()
        internal_vars.append(var_name)
        exported_internal_lines.append("export " + line)
    elif line.startswith("function "):
        var_name = line.split("function ")[1].split("(")[0].strip()
        internal_vars.append(var_name)
        exported_internal_lines.append("export " + line)
    else:
        exported_internal_lines.append(line)

os.makedirs(f"{out_dir}/components", exist_ok=True)
with open(f"{out_dir}/components/ModernAppInternal.tsx", "w") as f:
    f.writelines(exported_internal_lines)

# Generate the import string for these internal vars
import_list = ", ".join(internal_vars)
import_str = f"import {{ {import_list} }} from '../components/ModernAppInternal';\n"
react_imports = "import React, { useState, useEffect } from 'react';\nimport { motion, useScroll, useMotionValueEvent } from 'framer-motion';\nimport { TemplateThemeToggle, ThemeToggleButton, useTemplateTheme } from '../../../../apps/docs/src/components/templates/TemplateThemeToggle';\n"

# Copy all the top imports from lines 1 to 90 as well, but it's already in ModernAppInternal
# Wait, we need the @hudbird/marketing and lucide-react imports for the extracted blocks!
# Let's just extract the import block
import_block = "".join(internal_lines[:90])

# Sections definitions
sections = [
    ("Navbar", "{/* Floating Navbar */}"),
    ("Hero", "{/* Hero Section */}"),
    ("LogoCloud", "{/* Logo Cloud Section */}"),
    ("Grid", "{/* Minimalist Grid Section (Reflect-style) */}"),
    ("Reflect", "{/* Reflect AI-style AI Feature Section */}"),
    ("Network", "{/* Network & Superpowers Section */}"),
    ("Radar", "{/* Radar Section */}"),
    ("Meetings", "{/* Meetings Section */}"),
    ("Testimonials", "{/* Testimonials */}"),
    ("Cta", "{/* CTA Section */}"),
    ("Footer", "{/* Footer */}"),
]

# Find indices
indices = []
for sec_name, sec_marker in sections:
    for i, line in enumerate(lines):
        if sec_marker in line:
            indices.append((sec_name, i))
            break

# Append the end of the file as the last index boundary
indices.append(("END", len(lines) - 2))

# Extract sections
blocks_extracted = []
for i in range(len(indices) - 1):
    sec_name, start_idx = indices[i]
    _, end_idx = indices[i+1]
    
    sec_lines = lines[start_idx:end_idx]
    
    comp_dir = f"{out_dir}/{sec_name}"
    os.makedirs(comp_dir, exist_ok=True)
    comp_file = f"{comp_dir}/ModernApp{sec_name}.tsx"
    
    with open(comp_file, "w") as f:
        f.write(import_block)
        f.write(import_str)
        if sec_name == "Navbar":
            f.write("\nexport const ModernAppNavbar = ({ navVisible, navCompact }: { navVisible: boolean, navCompact: boolean }) => (\n")
        else:
            f.write(f"\nexport const ModernApp{sec_name} = () => (\n")
        f.write("  <>\n")
        f.writelines(sec_lines)
        f.write("  </>\n);\n")
        
    blocks_extracted.append(f"ModernApp{sec_name}")

# Now replace ModernAppTemplate.tsx with the wrapper
new_template = []
new_template.append("import React, { useState } from 'react';\n")
new_template.append("import { useScroll, useMotionValueEvent } from 'framer-motion';\n")
new_template.append("import { TemplateThemeToggle } from './TemplateThemeToggle';\n")
new_template.append("import {\n  " + ",\n  ".join(blocks_extracted) + "\n} from '@hudbird/marketing';\n\n")

new_template.append("export const ModernAppTemplate = () => {\n")
new_template.append("  const { scrollY } = useScroll();\n")
new_template.append("  const [navVisible, setNavVisible] = useState(true);\n")
new_template.append("  const [navCompact, setNavCompact] = useState(false);\n\n")

new_template.append("  useMotionValueEvent(scrollY, 'change', (current) => {\n")
new_template.append("    const previous = scrollY.getPrevious() || 0;\n")
new_template.append("    const diff = current - previous;\n")
new_template.append("    if (current > 50) setNavCompact(true);\n")
new_template.append("    else setNavCompact(false);\n")
new_template.append("    if (current > 150 && diff > 5) setNavVisible(false);\n")
new_template.append("    else if (diff < -5 || current <= 150) setNavVisible(true);\n")
new_template.append("  });\n\n")

new_template.append("  return (\n")
new_template.append('    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-rose-500/30 dark:bg-zinc-950">\n')
new_template.append('      <TemplateThemeToggle />\n')

# Wait, Navbar needs props!
new_template.append("      <ModernAppNavbar navVisible={navVisible} navCompact={navCompact} />\n")
for block in blocks_extracted[1:]:
    new_template.append(f"      <{block} />\n")

new_template.append("    </div>\n  );\n};\n")

with open(filepath, "w") as f:
    f.writelines(new_template)

print(f"Extraction complete! {len(blocks_extracted)} blocks created.")
