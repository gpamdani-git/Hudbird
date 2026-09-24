import re

files = [
    "apps/docs/src/pages/AreaChartDoc.tsx",
    "apps/docs/src/pages/LineChartDoc.tsx",
    "apps/docs/src/pages/BarChartDoc.tsx"
]

for f in files:
    with open(f, "r") as file:
        content = file.read()
    
    # Let's fix the `\$${value}` issue if it's there
    content = content.replace("\\$${value}", "$\\${value}")
    
    with open(f, "w") as file:
        file.write(content)
