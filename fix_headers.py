import os
import glob
import re

base_dir = "apps/docs/src/pages"
files = glob.glob(f"{base_dir}/**/*.tsx", recursive=True)

for file in files:
    with open(file, 'r') as f:
        content = f.read()

    # Skip files that don't look like docs
    if "export default function" not in content or "<h1>" not in content and "<h1" not in content:
        continue

    # We want to replace the title block and the top level container width.
    # Because doing this safely across many variations is hard, let's see what we can do.
    # I'll just print out the matches first to see the patterns.
    match = re.search(r'(<h1.*?>.*?</h1>)', content, re.DOTALL)
    if match:
        print(f"Found in {file}")

