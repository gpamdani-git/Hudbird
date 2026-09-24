const fs = require('fs');
const content = fs.readFileSync('/Users/daniakbar/.gemini/antigravity-ide/brain/783f5073-5d1f-4901-8c78-df47991238a4/.system_generated/steps/652/content.md', 'utf8');
const match = content.match(/<article[^>]*>(.*?)<\/article>/is);
if (match) {
  // basic tag stripping
  let text = match[1].replace(/<[^>]+>/g, ' ');
  text = text.replace(/\s+/g, ' ');
  console.log(text.substring(0, 3000));
} else {
  console.log("No article tag found");
}
