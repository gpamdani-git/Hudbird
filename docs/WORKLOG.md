# Hudbird Worklog

Keep this file short. Update it at the end of a meaningful iteration; do not record routine commands.

## Current milestone

Build a distinctive, clean Hudbird homepage and prove that Hudbird sections can be composed and customized through AI while remaining entirely based on Hudbird primitives and layout systems.

## Completed decisions

- SaaS/product-launch is the first complete landing-page use case.
- Linear informs restraint, layout rhythm, typography, and product presentation.
- Motion is calm: short one-time reveals, controlled transitions, reduced-motion support.
- Legacy duplicate marketing entries should eventually converge into the SaaS section collection while compatibility aliases remain temporarily.
- The Page Builder is a primary docs destination with its own focused sidebar experience.
- Users receive editable source through the Hudbird CLI; React and JSON exports represent the same configuration.
- The public homepage uses the same Hudbird logo assets as the docs application.

## Work in progress — paused

Homepage revamp and its audit fixes are present in the working tree but final verification was intentionally paused to save the user's usage limit.

Selected audit findings authorized for repair:

1. Prevent duplicate `h1` in the mini builder.
2. Make the selected-preview live announcement concise.
3. Replace generated product-proof artwork with actual Page Builder captures.
4. Keep homepage demo payload out of the public CLI block.

Implementation for these items has been started. Do not redo discovery. On explicit resume, inspect the current diff and run focused verification before making additional changes. Findings 4, 6, and 7 remain unapproved and must not be fixed automatically.

## Known boundaries

- The working tree contains substantial user and prior-agent changes; never discard unrelated changes.
- Root/docs type checks have previously included unrelated existing errors. Prefer package-targeted checks.
- Registry source, generated registry, docs, and skills can drift; synchronize them only when the requested slice affects distribution.
- Broad visual matrices and packed CLI consumer checks are expensive and reserved for finalization.

## Next suggested iteration

Resume and verify only audit fixes 1, 2, 3, and 5. Do not start a wider homepage redesign or full delivery gate unless requested.
