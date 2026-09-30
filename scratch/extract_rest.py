import os

filepath = "apps/docs/src/components/templates/AiStartupTemplate.tsx"

with open(filepath, "r") as f:
    lines = f.readlines()

imports = lines[0:105] # Imports up to line 105

# Agent Showcase
agent_showcase_lines = lines[121:538]
agent_file = "packages/marketing/src/blocks/AiStartup/AgentShowcase/AiStartupAgentShowcase.tsx"
os.makedirs(os.path.dirname(agent_file), exist_ok=True)
with open(agent_file, "w") as f:
    f.write("".join(imports))
    f.write("\nexport const AiStartupAgentShowcase = ({ activeAgentCard, setActiveAgentCard }: { activeAgentCard: number, setActiveAgentCard: any }) => (\n    <>\n")
    f.write("".join(agent_showcase_lines))
    f.write("    </>\n);\n")

# Marquee
marquee_lines = lines[539:542]
marquee_file = "packages/marketing/src/blocks/AiStartup/Marquee/AiStartupMarquee.tsx"
os.makedirs(os.path.dirname(marquee_file), exist_ok=True)
with open(marquee_file, "w") as f:
    f.write("".join(imports))
    f.write("\nexport const AiStartupMarquee = () => (\n    <>\n")
    f.write("".join(marquee_lines))
    f.write("    </>\n);\n")

# Footer
footer_lines = lines[543:558]
footer_file = "packages/marketing/src/blocks/AiStartup/Footer/AiStartupFooter.tsx"
os.makedirs(os.path.dirname(footer_file), exist_ok=True)
with open(footer_file, "w") as f:
    f.write("".join(imports))
    f.write("\nexport const AiStartupFooter = () => (\n    <>\n")
    f.write("".join(footer_lines))
    f.write("    </>\n);\n")

# Update original
new_lines = lines[:121] + [
    "      <AiStartupAgentShowcase activeAgentCard={activeAgentCard} setActiveAgentCard={setActiveAgentCard} />\n",
    "      <AiStartupFeatures />\n",
    "      <AiStartupMarquee />\n",
    "      <AiStartupCta />\n",
    "      <AiStartupFooter />\n"
] + lines[558:]

# Add imports
new_lines.insert(105, "import { AiStartupAgentShowcase } from '../../../../../packages/marketing/src/blocks/AiStartup/AgentShowcase/AiStartupAgentShowcase';\n")
new_lines.insert(105, "import { AiStartupMarquee } from '../../../../../packages/marketing/src/blocks/AiStartup/Marquee/AiStartupMarquee';\n")
new_lines.insert(105, "import { AiStartupFooter } from '../../../../../packages/marketing/src/blocks/AiStartup/Footer/AiStartupFooter';\n")

with open(filepath, "w") as f:
    f.write("".join(new_lines))

print("Extracted remaining sections.")
