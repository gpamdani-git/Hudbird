# Rule: Cognitive Architecture & Optical Alignment for Hudbird UI

> **MANDATORY CONSTITUTION:** Every component, page, layout, and interaction generated or modified in Hudbird must comply with human cognitive behavior laws, physical causality, and optical compensation. Mathematical centering that violates optical perception is strictly rejected.

---

## 1. Optical Alignment & Physical Compensation

1. **Center of Mass vs. Bounding Box (Play Icon Rule):**
   - Never center asymmetric glyphs or triangles solely with `justify-center items-center`.
   - Right-pointing triangles (`Play`, `ChevronRight`) have their center of mass on the left; they **MUST** be optically offset by `+1px` to `+2px` horizontally (`translate-x-[1px]` or `translate-x-[1.5px]`).
2. **Cap-Height Alignment for Inline Icons:**
   - Align inline icons to the text's **Cap-Height** (capital letter height), not the line-height container. Apply `-mt-px` or `translate-y-[-0.5px]` if vertical alignment leaves unbalanced whitespace below.
3. **Concentric Radii Formula ($R_{inner} = R_{outer} - \text{padding}$):**
   - Nested corners must maintain visual curvature continuity:
     $$R_{\text{inner}} = R_{\text{outer}} - \text{padding}$$
   - *Example:* Container with `rounded-[28px]` and `p-1.5` (6px) must give the inner card `rounded-[22px]`. Never use arbitrary or identical corner radii inside nested containers.
4. **Visual Weight Compensation:**
   - Solid/filled shapes have higher visual mass than stroked shapes of equal dimensions. In paired elements, scale down solid icons (~14px vs. 16px outline) to equalize optical weight.

---

## 2. UX Psychology & Cognitive Architecture

1. **Fitts's Law (Touch Targets):**
   - Mobile touch targets must strictly measure $\ge 44\text{px} \times 44\text{px}$ (`h-11`).
   - Desktop interactive targets must measure $\ge 36\text{px} \times 36\text{px}$ (`h-9`).
   - Icon-only buttons must never drop below `32px` (`w-8 h-8`) with generous surrounding tap margins.
2. **Von Restorff Effect (Isolation of Intent):**
   - Reserve the high-contrast **Electric Indigo** (`#4F46E5` / `#6366F1`) brand accent **strictly for the single primary call-to-action**.
   - Subordinate all supporting secondary actions to neutral surfaces (`variant="outline"`, `variant="ghost"`). If everything is highlighted, nothing is prioritised.
3. **Hick's Law & Progressive Disclosure:**
   - Never expose more than 1 primary action per view or card cluster.
   - Limit default configuration views to the primary 3–5 controls. Deep settings, raw logs, or verbose filters must be tucked inside collapsible disclosures or modal drawers.
4. **Miller's Law (Chunking):**
   - Group information clusters, form inputs, and navigation links into groups of 5 to 7 items using categorical headers and dividers.
   - Bento grids must feature 3–5 high-signal blocks, not an overwhelming multi-card mosaic.
5. **Law of Proximity (Gestalt Spatial Rhythm):**
   - **Micro-gap (`4px–8px`):** Label to input, icon to button text.
   - **Meso-gap (`16px–24px`):** Sibling cards, input fields within a group.
   - **Macro-gap (`80px–128px` / `space-y-24 sm:space-y-32`):** Distinct major sections. Gaps $< 64\text{px}$ are banned.

---

## 3. Architecting Intuition & Zero-Latency Feedback

1. **Tactile Feedback:**
   - Interactive buttons and cards must respond instantaneously with micro-compression (`active:scale-[0.98]`).
2. **Signature Kinetic Spring:**
   - All spatial animations must use the luxury spring physics:
     `duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]`
   - Default browser `ease` or linear timers are strictly forbidden.
3. **Spatial Constancy:**
   - Elements must enter from logical origins (`y: 12px -> 0px`, `opacity: 0 -> 1`). Morphing state indicators must use `layoutId`.

---

## 4. Banned Anti-Patterns (Zero-Tolerance)

- ❌ **No Emojis in Production UI:** (🚀, 💡, 🔥, ✨, ⚡). Use geometric Lucide SVG icons.
- ❌ **No Rainbow Icon Badge Squares Next to Headings:** Headings assert authority through typography (`Outfit 500 font-medium tracking-[-0.8px]`) and whitespace alone.
- ❌ **No Cards-Inside-Cards-Inside-Cards:** Russian-doll container nesting without informational purpose is banned.
- ❌ **No Pure Black (`#000000`):** Use Obsidian Charcoal (`#161618`) or Deep Void Slate (`#090D16`).
- ❌ **No Generic 3-Equal Cards Rows:** Use asymmetric Bento Grids or 2-column alternating layouts.

