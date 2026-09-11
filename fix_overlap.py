import os
import glob
import re

files = glob.glob("apps/docs/src/pages/**/*.tsx", recursive=True)

for file in files:
    if "demos/" in file: continue
    
    with open(file, 'r') as f:
        content = f.read()
        
    original = content
    
    # Find the subtitle p tag (the one with text-zinc-600 after H1)
    # and add pr-32 sm:pr-40 to it
    h1_match = re.search(r'<h1', content)
    if h1_match:
        p_match = re.search(r'<p className="([^"]*text-base text-zinc-600[^"]*)"', content[h1_match.start():])
        if p_match:
            old_classes = p_match.group(1)
            if 'pr-32' not in old_classes:
                new_classes = old_classes + " pr-32 sm:pr-40"
                
                before_h1 = content[:h1_match.start()]
                after_h1 = content[h1_match.start():]
                after_h1 = after_h1.replace(f'<p className="{old_classes}"', f'<p className="{new_classes}"', 1)
                content = before_h1 + after_h1

    if content != original:
        with open(file, 'w') as f:
            f.write(content)
        print(f"Fixed {file}")

