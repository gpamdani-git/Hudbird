import re

with open("src/components/templates/ModernAppTemplate.tsx", "r") as f:
    content = f.read()

divider_component = """
const CyberSectionDivider = () => (
  <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none">
    <div className="absolute -top-[1px] left-1/2 h-[2px] w-[2px] -translate-x-1/2 rounded-full bg-rose-500 shadow-[0_0_10px_4px_rgba(225,29,72,0.3)] dark:bg-white dark:shadow-[0_0_10px_4px_rgba(255,255,255,0.5),0_0_20px_8px_rgba(225,29,72,0.3)]" />
    <div className="absolute top-0 left-1/2 h-[1px] w-[50%] max-w-[600px] -translate-x-1/2 bg-gradient-to-r from-rose-500/0 via-rose-500/40 to-rose-500/0 dark:via-white/30 dark:shadow-[0_0_5px_rgba(255,255,255,0.2),0_0_15px_rgba(225,29,72,0.15)]" />
    <div className="absolute top-0 left-1/2 h-[10px] w-[30%] max-w-[400px] -translate-x-1/2 bg-gradient-to-r from-rose-600/0 via-rose-600/10 to-rose-600/0 blur-[6px] dark:via-rose-500/15" />
  </div>
);

export const ModernAppTemplate = () => {"""

content = content.replace("export const ModernAppTemplate = () => {", divider_component)

# Now inject <CyberSectionDivider /> after every section with border-t
# We can use re.sub with a function

def inject_divider(match):
    return match.group(0) + "\n        <CyberSectionDivider />"

content = re.sub(r'<section className="[^"]*border-t[^"]*">', inject_divider, content)

with open("src/components/templates/ModernAppTemplate.tsx", "w") as f:
    f.write(content)
