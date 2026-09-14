---
"@hudbird/marketing": patch
"@hudbird/ui": patch
"hudbird-ui": patch
"docs": patch
---

Refactor the root landing page by extracting the monolithic AiStartupTemplate into modular components within app/landingpage. Decoupled the landing page from the docs layout, restored missing UI/marketing helper components, and resolved all runtime ReferenceErrors to ensure a stable production build.
