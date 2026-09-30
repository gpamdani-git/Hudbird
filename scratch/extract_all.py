import os

filepath = "apps/docs/src/components/templates/AiStartupTemplate.tsx"

with open(filepath, "r") as f:
    lines = f.readlines()

imports = lines[0:102] # Up to import AiStartupHero

# Let's map sections: (name, start_comment, end_comment, props_def, props_pass)
sections = [
    ("AiStartupLogoCloud", "{/* <!-- Logo Cloud --> */}", "{/* <!-- Component Gallery", "() =>", "()"),
    ("AiStartupAgentShowcase", "{/* <!-- Agent Showcase Section --> */}", "{/* <!-- Built for Modern", "({ activeAgentCard, setActiveAgentCard }: { activeAgentCard: number, setActiveAgentCard: any }) =>", "({\n    activeAgentCard={activeAgentCard}\n    setActiveAgentCard={setActiveAgentCard}\n  })"),
    ("AiStartupFeatures", "{/* <!-- Built for Modern Web — Feature Bento --> */}", "{/* <!-- Template Marquee", "() =>", "()"),
    ("AiStartupMarquee", "{/* <!-- Template Marquee Section --> */}", "{/* <!-- CTA Section --> */}", "() =>", "()"),
    ("AiStartupCta", "{/* <!-- CTA Section --> */}", "{/* <!-- Footer V4 - Mega --> */}", "() =>", "()"),
    ("AiStartupFooter", "{/* <!-- Footer V4 - Mega --> */}", "</main>", "() =>", "()")
]

def find_line(lines, search_str):
    for i, line in enumerate(lines):
        if search_str in line:
            return i
    return -1

import_statements = []

current_lines = lines[:]

for section_name, start_comment, end_comment, props_def, props_pass in reversed(sections):
    start_idx = find_line(current_lines, start_comment)
    end_idx = find_line(current_lines, end_comment)
    
    if start_idx == -1 or end_idx == -1:
        print(f"Could not find bounds for {section_name}")
        continue
        
    section_lines = current_lines[start_idx:end_idx]
    
    # Write to file
    folder_name = section_name.replace('AiStartup', '')
    if folder_name == '':
        folder_name = 'Main'
    file_path = f"packages/marketing/src/blocks/AiStartup/{folder_name}/{section_name}.tsx"
    os.makedirs(os.path.dirname(file_path), exist_ok=True)
    
    with open(file_path, "w") as f:
        f.write("".join(imports))
        f.write(f"\nexport const {section_name} = {props_def} => (\n    <>\n")
        f.write("".join(section_lines))
        f.write("    </>\n);\n")
        
    import_statements.append(f"import {{ {section_name} }} from '../../../../../packages/marketing/src/blocks/AiStartup/{folder_name}/{section_name}';\n")
    
    # Replace in original file
    # Ensure props are passed correctly
    if props_pass == "()":
        replacement = f"      <{section_name} />\n"
    else:
        replacement = f"      <{section_name} activeAgentCard={{activeAgentCard}} setActiveAgentCard={{setActiveAgentCard}} />\n"
        
    current_lines = current_lines[:start_idx] + [replacement] + current_lines[end_idx:]
    print(f"Extracted {section_name}")

# Add import statements to the template file
final_lines = current_lines[:102] + import_statements + current_lines[102:]

with open(filepath, "w") as f:
    f.write("".join(final_lines))

print("Successfully extracted all sections.")
