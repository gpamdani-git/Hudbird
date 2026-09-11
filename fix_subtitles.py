import os
import glob
import re

base_dir = "apps/docs/src/pages"
files = glob.glob(f"{base_dir}/**/*.tsx", recursive=True)

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    original = content

    h1_match = re.search(r'<h1', content)
    if h1_match:
        p_match = re.search(r'<p className="([^"]*text-lg[^"]*|[^"]*max-w-2xl[^"]*)"', content[h1_match.start():])
        if p_match:
            old_p_class = p_match.group(1)
            before_h1 = content[:h1_match.start()]
            after_h1 = content[h1_match.start():]
            after_h1 = after_h1.replace(f'<p className="{old_p_class}"', f'<p className="text-base text-zinc-600 dark:text-zinc-400"', 1)
            content = before_h1 + after_h1

    if content != original:
        with open(file, 'w') as f:
            f.write(content)
        print(f"Updated {file}")

