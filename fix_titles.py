import os
import glob
import re

base_dir = "apps/docs/src/pages"
files = glob.glob(f"{base_dir}/**/*.tsx", recursive=True)

h1_class = 'text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50'
p_class = 'text-base text-zinc-600 dark:text-zinc-400'

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    original = content

    # 1. Standardize H1 classes
    # Look for <h1 className="...">
    content = re.sub(r'<h1 className="[^"]*text-3xl[^"]*">', f'<h1 className="{h1_class}">', content)
    content = re.sub(r'<h1 className="[^"]*text-4xl[^"]*">', f'<h1 className="{h1_class}">', content)
    content = re.sub(r'<h1 className="[^"]*text-5xl[^"]*">', f'<h1 className="{h1_class}">', content)
    content = re.sub(r'<h1 className="[^"]*text-zinc-900[^"]*">', f'<h1 className="{h1_class}">', content, count=1)
    
    # 2. Standardize paragraph classes right after the header
    # Usually it's <p className="max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
    # We want to replace it with <p className="text-base text-zinc-600 dark:text-zinc-400">
    # We'll just target the <p className="..."> that contains text-zinc-600 right after h1
    
    # Find the H1
    h1_match = re.search(r'<h1', content)
    if h1_match:
        # Find the first <p className="...> after H1
        p_match = re.search(r'<p className="([^"]*text-zinc-600[^"]*)"', content[h1_match.start():])
        if p_match:
            old_p_class = p_match.group(1)
            # Replace the first instance of this exact p class after h1
            before_h1 = content[:h1_match.start()]
            after_h1 = content[h1_match.start():]
            after_h1 = after_h1.replace(f'<p className="{old_p_class}"', f'<p className="{p_class}"', 1)
            content = before_h1 + after_h1

    if content != original:
        with open(file, 'w') as f:
            f.write(content)
        print(f"Updated {file}")

