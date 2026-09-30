import re
import os

filepath = "apps/docs/src/components/templates/AiStartupTemplate.tsx"

with open(filepath, "r") as f:
    lines = f.readlines()

imports = lines[0:101] # up to import of AiStartupInternal

hero_lines = lines[113:264]

new_hero_file = "packages/marketing/src/blocks/AiStartup/Hero/AiStartupHero.tsx"
os.makedirs(os.path.dirname(new_hero_file), exist_ok=True)

with open(new_hero_file, "w") as f:
    f.write("".join(imports))
    f.write("\nexport const AiStartupHero = ({ theme, toggleTheme }: { theme: any, toggleTheme: any }) => (\n")
    f.write("".join(hero_lines))
    f.write(");\n")

# Modify original file
# We replace lines 113 to 264 with <AiStartupHero theme={theme} toggleTheme={toggleTheme} />
new_template = lines[:113] + ["      <AiStartupHero theme={theme} toggleTheme={toggleTheme} />\n"] + lines[264:]
# And we need to add AiStartupHero to imports, but we will just import it directly for now.
import_statement = "import { AiStartupHero } from '../../../../../packages/marketing/src/blocks/AiStartup/Hero/AiStartupHero';\n"
new_template.insert(101, import_statement)

with open(filepath, "w") as f:
    f.write("".join(new_template))

print("Extracted AiStartupHero")
