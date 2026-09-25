# Safe Code Editing Rules

These rules are MANDATORY for all code editing tasks. They were specifically requested by the user to prevent accidental deletion of existing, hard-won functionality.

## Core Directives
- **NO MASS REPLACEMENTS**: Never perform mass replacements or rewrite an entire file or large block of code blindly.
- **COPY AND PASTE EXISTING LOGIC**: Before adding a new feature or fixing a bug, strictly preserve the previous working logic. "Copy" (mentally or literally) the existing, working functions and integrate them carefully. Do NOT lose features that were already built.
- **METICULOUS SYNTAX**: Always ensure brackets, closing tags, and imports are correct. Do not be sloppy with syntax. Verify the imports for hooks (like `useCallback`, `useRef`, etc.) and ensure they are not accidentally removed.
- **SURGICAL EDITS ONLY**: When fixing a bug, change ONLY the lines that cause the bug. Do not refactor surrounding code unless explicitly asked to do so.
- **VERIFY HOOKS AND STATE**: When modifying React components, be extremely cautious about Dependency Arrays in `useEffect` and `useCallback`, and do not inadvertently break refs or event listeners.

*Failure to follow these rules often results in missing menus, broken scroll observers, or undefined reference errors. Work carefully!*
