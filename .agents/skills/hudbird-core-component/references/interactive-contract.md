# Interactive Core Contract

Read this only for stateful composite controls, overlays, focus management, or form-field relationships.

## State

- Support either controlled, uncontrolled, or both according to the nearest existing Hudbird component; do not invent both modes without consumer value.
- Never switch modes implicitly after mount.
- Fire callbacks once per user action and preserve the native event when the public API exposes it.
- Disabled controls do not mutate state or fire action callbacks.

## Keyboard and focus

- Follow the established WAI-ARIA interaction pattern for the component type.
- Preserve visible focus and logical tab order.
- Composite widgets manage arrow-key navigation only when their semantic pattern requires it.
- Overlays restore focus to the trigger and provide an obvious keyboard dismissal path.
- Do not trap focus outside a modal interaction.

## Names and relationships

- Every interactive element has an accessible name.
- Connect labels, descriptions, errors, and controls with stable generated IDs when the consumer does not provide IDs.
- Announce status changes concisely; do not place a large changing subtree inside `aria-live`.
- Use `aria-invalid`, `aria-describedby`, `aria-expanded`, `aria-controls`, and `aria-busy` only when their states are true and meaningful.

## Composition

- Keep semantic elements intact when using slots or `asChild` composition.
- Merge refs, handlers, classes, and data attributes without silently replacing consumer behavior.
- Compound components should share only the minimum context necessary and fail predictably when required parents are absent.

## Focused tests

Exercise the primary pointer flow, complete keyboard flow, initial focus, dismissal/focus restoration, accessible relationships, disabled behavior, and one controlled-state scenario when supported.
