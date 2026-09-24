import re

with open('apps/docs/src/pages/BarChartDoc.tsx', 'r') as f:
    lines = f.readlines()

in_code_block = False

for i in range(len(lines)):
    line = lines[i]
    if 'code={`' in line:
        in_code_block = True
    
    if in_code_block:
        # Inside code block, we want \` and \${
        if 'valueFormatter' in line:
            line = line.replace('`$$', '\\`$$')
            line = line.replace('`\\$', '\\`\\$')
            line = line.replace('k`', 'k\\`')
            line = line.replace('views`', 'views\\`')
            
        if '`' in line and 'code={`' not in line and '`}' not in line and 'valueFormatter' not in line:
            # Maybe there are other backticks? We only have backticks in valueFormatter.
            pass
    else:
        # Inside actual component, we want ` and ${
        if 'valueFormatter' in line:
            line = line.replace('$\\${', '$${')
            line = line.replace('\\${', '${')
    
    if '`}' in line:
        in_code_block = False
        
    lines[i] = line

with open('apps/docs/src/pages/BarChartDoc.tsx', 'w') as f:
    f.writelines(lines)
