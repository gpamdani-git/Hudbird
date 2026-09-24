import re

with open('apps/docs/src/pages/BarChartDoc.tsx', 'r') as f:
    lines = f.readlines()

in_code_block = False

for i in range(len(lines)):
    line = lines[i]
    if 'code={`' in line:
        in_code_block = True
        
    if in_code_block and 'valueFormatter' in line:
        # replace the messed up ones
        if '1000' in line:
            lines[i] = '        valueFormatter={(v) => \\`$$$${v / 1000}k\\`}\n'
            # Wait, $$$${v / 1000} evaluates to $${v / 1000} in template? No, $$ evaluates to $$.
            # we want output to be: `$${v / 1000}k`
            # so we write: \`$${v / 1000}k\` 
            # wait, if the JS code says code={` \`$${v} `}, the inner `${v}` is evaluated.
            # to prevent it: ` \`$$\\${v / 1000}k\` `
            lines[i] = '        valueFormatter={(v) => \\`$$\\${v / 1000}k\\`}\n'
        elif 'views' in line:
            lines[i] = '        valueFormatter={(value) => \\`\\${value} views\\`}\n'
            
    if '`}' in line:
        in_code_block = False

with open('apps/docs/src/pages/BarChartDoc.tsx', 'w') as f:
    f.writelines(lines)
