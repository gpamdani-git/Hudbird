import re

with open("src/components/templates/ModernAppTemplate.tsx", "r") as f:
    content = f.read()

# Find all <motion.*> blocks and if they contain repeat: Infinity, replace animate= with whileInView=
def replacer(match):
    block = match.group(0)
    if "repeat: Infinity" in block and "animate={" in block:
        block = block.replace("animate={", "whileInView={")
    return block

# regex to match a whole motion tag up to > or />
new_content = re.sub(r'<motion\.[^>]+>', replacer, content, flags=re.MULTILINE | re.DOTALL)

with open("src/components/templates/ModernAppTemplate.tsx", "w") as f:
    f.write(new_content)

