import re

files = [
    "apps/docs/src/pages/AreaChartDoc.tsx",
    "apps/docs/src/pages/LineChartDoc.tsx",
    "apps/docs/src/pages/BarChartDoc.tsx"
]

for f in files:
    with open(f, "r") as file:
        content = file.read()
    
    # Remove the eslint-disable comment I added earlier
    content = content.replace("/* eslint-disable no-useless-escape */\n", "")
    
    # 1. Fix the REAL code:
    # Right now it has `valueFormatter={(v) => `\$${v}`}`
    # Or `valueFormatter={(v) => `\$${value}`}`
    # It should be `valueFormatter={(v) => `$${v}`}`
    content = content.replace("`\\$${v}`", "`$${v}`")
    content = content.replace("`\\$${value}`", "`$${value}`")
    
    # 2. Fix the CODE BLOCK string:
    # Right now it has `valueFormatter={(v) => \`\$${v}\`}`
    # It should be `valueFormatter={(v) => \`$\${v}\`}`
    content = content.replace("\\`\\$${v}\\`", "\\`$\\${v}\\`")
    content = content.replace("\\`\\$${value}\\`", "\\`$\\${value}\\`")

    with open(f, "w") as file:
        file.write(content)
