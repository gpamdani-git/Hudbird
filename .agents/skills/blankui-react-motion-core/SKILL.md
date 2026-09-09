---
name: blankui-react-motion-core
description: Rules for React architecture, component patterns, State Management, and Framer Motion micro-interactions within the BlankUI project.
---

# BlankUI React & Motion Core

This skill dictates the architectural design of React components, state management, and interaction animations in BlankUI. All components must be composable, highly typed, and strictly accessible.

## 1. The Compound Component Pattern
Complex UI elements (e.g., Modals, Dropdowns, Heros, Accordions) MUST be designed as **Compound Components**.
- Do not build "god components" that take 50 props (e.g., `<Dropdown items={...} isOpen={...} onClick={...} />`).
- Instead, export small, composable primitives (e.g., `<Dropdown>`, `<DropdownTrigger>`, `<DropdownMenu>`, `<DropdownItem>`).
- Use React Context to share state between the parent wrapper and its children without prop drilling.

## 2. Ref Forwarding & HTML Attributes
Every primitive UI component must forward its ref and extend standard HTML attributes to remain fully accessible and flexible.
- Always use `React.forwardRef<HTMLDivElement, CustomProps>(...)`.
- Always extend standard HTML attributes in TypeScript interfaces: `interface Props extends React.HTMLAttributes<HTMLDivElement> { ... }`.
- Always spread remaining props `...props` to the root DOM element.

## 3. Micro-Interactions with Framer Motion
Animations should be used to delight the user, but must not hinder performance or accessibility.
- **Library:** Use `framer-motion` exclusively (`import { motion, AnimatePresence } from "framer-motion";`).
- **Entrance Animations:** Use subtle spring-based entrances. Example: `initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}`.
- **Exit Animations:** Always use `AnimatePresence` to handle unmounting animations gracefully.
- **Performance:** Avoid animating layout properties (`width`, `height`, `margin`) directly if possible. Prefer animating `transform` and `opacity` to keep operations on the GPU layer.

## 4. WebGL and 3D Contexts
When incorporating 3D elements (e.g., `three`, `@react-three/fiber`), they must be treated as enhancements, not blockers.
- Isolate WebGL logic in separate components (e.g., `<HeroThreeBackground>`).
- Always lazily load heavy 3D dependencies (`React.lazy`) so the initial page bundle isn't bloated.
- Implement proper fallback states (`Suspense fallback={<Skeleton />}`).

## Workflow Rules
1. **Motion MCP Integration**: Whenever you are creating or debugging animations, you **MUST** consult the official `motion` skill (`.agents/skills/motion/SKILL.md`) and leverage its MCP server to retrieve the most up-to-date documentation and best practices.
2. If tasked with building a complex UI piece, start by defining the React Context and the hierarchy of Compound Components.
3. When the user requests a "Motion" or "Interactive" feel, leverage Framer Motion to add spring-physics hover states (`whileHover={{ scale: 1.02 }}`) and tap states (`whileTap={{ scale: 0.98 }}`).
