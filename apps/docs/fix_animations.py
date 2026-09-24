import re

with open("src/components/templates/ModernAppTemplate.tsx", "r") as f:
    content = f.read()

# Replace animate={{ with whileInView={{ for one-time animations that shouldn't play before scrolling to them
# We target specific motion.divs that have initial opacity 0 and animate opacity 1.

def replacer(match):
    block = match.group(0)
    # Skip navbar which has y: navVisible ? 0 : -100
    if "navVisible" in block:
        return block
    # If it has initial={{ opacity: 0 }} or similar, we change animate= to whileInView=
    if "initial=" in block and "animate={" in block:
        block = block.replace("animate={", "whileInView={")
        # Add viewport={{ once: true }} if not present
        if "viewport={" not in block:
            block = block.replace("whileInView={", "viewport={{ once: true, margin: \"-50px\" }}\n                  whileInView={", 1)
    return block

new_content = re.sub(r'<motion\.[a-z0-9]+[^>]*animate=\{[^>]*>', replacer, content, flags=re.MULTILINE | re.DOTALL)

with open("src/components/templates/ModernAppTemplate.tsx", "w") as f:
    f.write(new_content)
