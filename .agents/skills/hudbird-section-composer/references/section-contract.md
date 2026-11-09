# Block and Section Contract

## Choose the correct layer

- **Block:** a reusable content or interaction pattern that does not own page-level spacing, for example a product demo, pricing card group, or FAQ list.
- **Section:** a replaceable page unit that owns a semantic boundary and composes its internal block with `Section`, `Container`, and `Grid`.
- Do not make a block pretend to be a full page or make a section depend on surrounding page markup to look complete.

## Public API

- Accept typed content instead of hardcoding demo copy.
- Keep `className`, `id`, and relevant semantic attributes available.
- Use a small, discriminated layout variant when arrangements differ materially.
- Keep media configuration separate from text content when layouts can exchange media.
- Prefer composition slots for genuinely open regions; avoid a slot for every text node.
- Preserve existing public APIs when extending an established section.

## Composition

- Start with the semantic reading order. CSS may reposition content on larger screens without breaking mobile or assistive-technology order.
- Use `Heading`, `Text`, `Button`, `Badge`, `Card`, `Accordion`, `Tabs`, `EditorialImage`, and other Hudbird primitives according to their purpose.
- Use one primary action. Secondary actions remain visually quieter.
- FAQ disclosure uses the established accessible Accordion rather than custom hidden state.
- Interactive feature previews use established Tabs/Accordion behavior and preserve keyboard access.
- Media has meaningful alt text; decorative media uses empty alt text and does not repeat nearby copy.

## Variants

Useful variant differences include centered versus split hero, single versus grouped FAQ, copy-first versus media-first CTA, or tabs versus accordion feature presentation. A palette swap, border radius change, or rearranged decoration is not a new layout variant.

## Focused tests

Verify semantic heading/action output, relevant interaction, content preservation across variants, class/ID forwarding, and the regression or layout contract requested by the user. Architecture tests should confirm Hudbird layout/core consumption without testing implementation wording.
