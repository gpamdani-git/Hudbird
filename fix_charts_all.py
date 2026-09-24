import os, glob

files = glob.glob("apps/docs/src/pages/**/*.tsx", recursive=True)

for f in files:
    with open(f, "r") as file:
        content = file.read()
    
    # 1. BarChartDoc.tsx line 355, 401, 488: \`$$${v / 1000}k\` -> \`$\${v / 1000}k\`
    content = content.replace("\\`$$${v / 1000}k\\`", "\\`$\\${v / 1000}k\\`")
    
    # 2. BarChartDoc.tsx line 605: \`${value} views\` -> \`\\${value} views\`
    content = content.replace("\\`${value} views\\`", "\\`\\${value} views\\`")
    
    # 3. AreaChartDoc.tsx line 341-374: these are REAL code, but they are `${v}`, let's check if they are in string literal
    # Wait, my script output:
    # apps/docs/src/pages/AreaChartDoc.tsx:341:valueFormatter={(v) => `${v}`}
    # Wait, in the string literal representation, is it `${v}`?
    # Let's fix `\x60${v}\x60` (which is \`${v}\`) to `\x60\${v}\x60`
    content = content.replace("\\`${v}\\`", "\\`\\${v}\\`")

    with open(f, "w") as file:
        file.write(content)
