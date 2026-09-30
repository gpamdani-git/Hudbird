import os
import re

filepath = "apps/docs/src/components/templates/EcommerceTemplate.tsx"
out_dir = "packages/marketing/src/blocks/Ecommerce"
os.makedirs(f"{out_dir}/components", exist_ok=True)

with open(filepath, "r") as f:
    content = f.read()

component_start = content.find("export const EcommerceTemplate = () => {")

internal_content = content[:component_start]

# Add export to constants
internal_content = re.sub(r"^const logos = ", "export const logos = ", internal_content, flags=re.MULTILINE)
internal_content = re.sub(r"^const MEGA_LINK_GROUPS = ", "export const MEGA_LINK_GROUPS = ", internal_content, flags=re.MULTILINE)
internal_content = re.sub(r"^const SOCIALS = ", "export const SOCIALS = ", internal_content, flags=re.MULTILINE)
internal_content = re.sub(r"^const FAQS = ", "export const FAQS = ", internal_content, flags=re.MULTILINE)

with open(f"{out_dir}/components/EcommerceInternal.tsx", "w") as f:
    f.write(internal_content)

import_block = ""
lines = internal_content.split('\n')
in_import = False
for line in lines:
    if line.startswith("import "):
        import_block += line + "\n"
        if "{" in line and "}" not in line:
            in_import = True
    elif in_import:
        import_block += line + "\n"
        if "}" in line:
            in_import = False

internal_import_str = 'import { logos, MEGA_LINK_GROUPS, SOCIALS, FAQS } from "../components/EcommerceInternal";\n'

sections = [
    ("Navbar", "{/* Floating Navbar */}"),
    ("Hero", "{/* <!-- Hero Section: StoreMetrics Inspired Redesign --> */}"),
    ("LogoCloud", "{/* <!-- Logo Cloud --> */}"),
    ("FeatureGrid", "{/* <!-- Benefits Section: Outcome-driven (Replaces generic Feature Grid) --> */}"),
    ("BentoGrid", "{/* <!-- Bento Grid: Problem -> Solution Visualization --> */}"),
    ("Pricing", "{/* <!-- Pricing Section: Risk Reversal + Strong Offer --> */}"),
    ("Faq", "{/* <!-- Objection Handling: FAQ Section --> */}"),
    ("Testimonials", "{/* <!-- Social Proof: Testimonials with Globe --> */}"),
    ("Cta", "{/* <!-- Final CTA: Custom Design --> */}"),
    ("Footer", "{/* <!-- Footer --> */}"),
]

lines = content.split('\n')
indices = []
for sec_name, sec_marker in sections:
    for i, line in enumerate(lines):
        if sec_marker in line:
            indices.append((sec_name, i))
            break

indices.append(("END", len(lines) - 3))

blocks_extracted = []
for i in range(len(indices) - 1):
    sec_name, start_idx = indices[i]
    _, end_idx = indices[i+1]
    
    sec_lines = lines[start_idx:end_idx]
    
    comp_dir = f"{out_dir}/{sec_name}"
    os.makedirs(comp_dir, exist_ok=True)
    comp_file = f"{comp_dir}/Ecommerce{sec_name}.tsx"
    
    with open(comp_file, "w") as f:
        f.write(import_block)
        f.write(internal_import_str)
        
        if sec_name == "Pricing":
            f.write(f"\nexport const Ecommerce{sec_name} = () => {{\n")
            f.write("  const [isAnnual, setIsAnnual] = useState(false);\n")
            f.write("  return (\n")
            f.write("  <>\n")
            f.write("\n".join(sec_lines))
            f.write("\n  </>\n  );\n};\n")
        else:
            f.write(f"\nexport const Ecommerce{sec_name} = () => (\n")
            f.write("  <>\n")
            f.write("\n".join(sec_lines))
            f.write("\n  </>\n);\n")
        
    blocks_extracted.append(f"Ecommerce{sec_name}")

new_template = []
new_template.append("import React from 'react';\n")
new_template.append("import { TemplateThemeToggle } from './TemplateThemeToggle';\n")
new_template.append("import {\n  " + ",\n  ".join(blocks_extracted) + "\n} from '@hudbird/marketing';\n\n")

new_template.append("export const EcommerceLaunchpad = () => {\n")
new_template.append("  return (\n")
new_template.append('    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-orange-500/30 dark:bg-zinc-950">\n')
new_template.append('      <TemplateThemeToggle />\n')

for block in blocks_extracted:
    new_template.append(f"      <{block} />\n")

new_template.append("    </div>\n  );\n};\n")

with open(filepath, "w") as f:
    f.writelines(new_template)

index_path = "packages/marketing/src/index.ts"
with open(index_path, "a") as f:
    for block in blocks_extracted:
        f.write(f'export * from "./blocks/Ecommerce/{block.replace("Ecommerce", "")}/{block}";\n')
    f.write('export * from "./blocks/Ecommerce/components/EcommerceInternal";\n')

print(f"Extraction complete! {len(blocks_extracted)} blocks created.")
