import re
import sys

with open('apps/docs/src/components/templates/AiStartupTemplate.tsx', 'r') as f:
    content = f.read()

start_idx = content.find('{/* Grid Layout */}')
if start_idx == -1:
    print("Cannot find Grid Layout")
    sys.exit(1)

# Back up to the spaces before it
while content[start_idx-1] == ' ':
    start_idx -= 1

end_str = '{/* <!-- Bento Grid V3'
end_idx = content.find(end_str)
if end_idx == -1:
    print("Cannot find Bento Grid V3")
    sys.exit(1)

# Back up to the previous div closes
end_idx = content.rfind('</div>', start_idx, end_idx)
# Go back 2 more divs since there are 3 closing divs
end_idx = content.rfind('</div>', start_idx, end_idx - 1)
end_idx = content.rfind('</div>', start_idx, end_idx - 1)
end_idx += 6 # include the </div>

print(f"Found start {start_idx} and end {end_idx}")
