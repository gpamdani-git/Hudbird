import glob
import os
import re

files = glob.glob("packages/marketing/src/blocks/AiStartup/*/*.tsx")

for filepath in files:
    with open(filepath, "r") as f:
        content = f.read()
    
    # 1. Fix AiStartupInternal import path
    # Replace anything matching *packages/marketing/src/blocks/AiStartup/components/AiStartupInternal
    # with ../components/AiStartupInternal
    content = re.sub(
        r"['\"].*?packages/marketing/src/blocks/AiStartup/components/AiStartupInternal['\"]",
        "'../components/AiStartupInternal'",
        content
    )
    
    # 2. Fix TemplateThemeToggle import (it's invalid from packages/marketing)
    # We will just remove this import. If any component needs it, we will see a missing variable error,
    # which we can fix by replacing it with a standard button or removing it.
    content = re.sub(
        r"import\s*\{[^}]*\}\s*from\s*['\"]./TemplateThemeToggle['\"];?",
        "",
        content
    )
    
    # 3. AiStartupHero imports itself in AiStartupLogoCloud?
    # In extract_all.py, I prepended ALL imports. Let's fix relative imports from AiStartupHero
    content = re.sub(
        r"['\"].*?packages/marketing/src/blocks/AiStartup/Hero/AiStartupHero['\"]",
        "'../Hero/AiStartupHero'",
        content
    )

    with open(filepath, "w") as f:
        f.write(content)

print(f"Fixed imports in {len(files)} files.")
