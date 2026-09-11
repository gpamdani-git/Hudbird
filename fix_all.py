import os
import glob
import re

def fix_pages():
    files = glob.glob("apps/docs/src/pages/**/*.tsx", recursive=True)
    
    h1_class = 'text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50'
    p_class = 'text-base text-zinc-600 dark:text-zinc-400'
    
    for file in files:
        if "demos/" in file: continue
        with open(file, 'r') as f:
            content = f.read()
            
        original = content
        
        # 1. Fix H1 class
        content = re.sub(r'<h1 className="[^"]*">', f'<h1 className="{h1_class}">', content, count=1)
        
        # 2. Fix subtitle P class (first p after h1)
        h1_match = re.search(r'<h1', content)
        if h1_match:
            p_match = re.search(r'<p className="([^"]*)"', content[h1_match.start():])
            if p_match:
                old_p = p_match.group(1)
                before_h1 = content[:h1_match.start()]
                after_h1 = content[h1_match.start():]
                after_h1 = after_h1.replace(f'<p className="{old_p}"', f'<p className="{p_class}"', 1)
                content = before_h1 + after_h1
                
        # 3. For marketing and layout pages, fix the outer container
        if "marketing/" in file or "LayoutDoc.tsx" in file or "SidebarDoc.tsx" in file:
            # They usually have <div className="mx-auto w-full max-w-7xl ...">
            # Let's replace the first max-w-7xl container with the standard one
            content = re.sub(r'<div className="[^"]*max-w-7xl[^"]*">', '<div className="mx-auto w-full max-w-7xl space-y-16 px-4 sm:px-8 lg:px-12">', content, count=1)
            
            # Make sure the title is wrapped in mt-4 if it's not
            # Well, it's safer to just replace the <div className="space-y-4"> that usually wraps it
            if '<div className="space-y-4">\n          <h1' in content:
                content = content.replace('<div className="space-y-4">\n          <h1', '<div className="mt-4">\n          <h1')
        
        if content != original:
            with open(file, 'w') as f:
                f.write(content)
            print(f"Fixed {file}")

fix_pages()
