import os
import glob
import re

files = glob.glob("apps/docs/src/pages/marketing/*.tsx") + glob.glob("apps/docs/src/pages/*LayoutDoc.tsx")

badge = '''<span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              New
            </span>'''

for file in files:
    if "demos/" in file: continue
    
    with open(file, 'r') as f:
        content = f.read()
        
    original = content
    
    # Check if it already has flex wrap
    if '<div className="mb-3 flex items-center gap-3">' not in content:
        # Find the h1
        match = re.search(r'(<h1[^>]*>.*?</h1>)', content, re.DOTALL)
        if match:
            h1_full = match.group(1)
            # Replace h1 with the flex wrapper and badge
            replacement = f'''<div className="mb-3 flex items-center gap-3">
            {h1_full}
            {badge}
          </div>'''
            content = content.replace(h1_full, replacement, 1)

    # Fix AuthLayoutDoc.tsx having -mt-8 instead of mt-4
    content = content.replace('<div className="-mt-8">', '<div className="mt-4">')

    if content != original:
        with open(file, 'w') as f:
            f.write(content)
        print(f"Fixed {file}")

