import re
import os

filepath = "apps/docs/src/components/templates/AiStartupTemplate.tsx"

with open(filepath, "r") as f:
    lines = f.readlines()

imports = "".join(lines[0:99])
internal_components = lines[99:2755]
main_template = lines[2755:]

# Add export to const and function definitions in internal_components
exported_components = []
for i in range(len(internal_components)):
    line = internal_components[i]
    if line.startswith("const ") and " = " in line and "(" in line:
        internal_components[i] = "export " + line
    elif line.startswith("function "):
        internal_components[i] = "export " + line

# Find all exported component names to import them back
import_names = []
for line in internal_components:
    m = re.match(r'^export (const|function) ([A-Z][a-zA-Z0-9_]*)', line)
    if m:
        import_names.append(m.group(2))

# Write internal components file
internal_path = "packages/marketing/src/blocks/AiStartup/components/AiStartupInternal.tsx"
os.makedirs(os.path.dirname(internal_path), exist_ok=True)

with open(internal_path, "w") as f:
    f.write(imports)
    f.write("\n")
    f.write("".join(internal_components))

print(f"Created {internal_path} with {len(import_names)} exported components")

# Write new AiStartupTemplate
import_statement_relative = "import { " + ", ".join(import_names) + " } from '../../../../../packages/marketing/src/blocks/AiStartup/components/AiStartupInternal';\n"

with open(filepath, "w") as f:
    f.write(imports)
    f.write(import_statement_relative)
    f.write("\n")
    f.write("".join(main_template))

print("Updated AiStartupTemplate.tsx")
