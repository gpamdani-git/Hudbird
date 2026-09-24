import os, glob

files = glob.glob("apps/docs/src/pages/*ChartDoc.tsx")

for f in files:
    with open(f, "r") as file:
        content = file.read()
    
    # We want to unescape \${item and \${total and \${value ONLY OUTSIDE of code={`...`}
    
    new_content = ""
    in_code = False
    for line in content.split("\n"):
        if "code={`" in line:
            in_code = True
        
        if not in_code:
            line = line.replace("\\${item.", "${item.")
            line = line.replace("\\${total", "${total")
            line = line.replace("\\${payload", "${payload")
            line = line.replace("\\${label", "${label")
            line = line.replace("\\${value", "${value")
            line = line.replace("\\${v", "${v")
            
        new_content += line + "\n"
        
        if in_code and "`}" in line:
            in_code = False
            
    new_content = new_content[:-1]
    
    with open(f, "w") as file:
        file.write(new_content)
