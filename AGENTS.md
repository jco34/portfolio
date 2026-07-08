<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:design-recreation-workflow -->
# Pixel-accurate design recreation

When the user provides a reference image (screenshot) and optionally some CSS classes or style notes, recreate it precisely using an iterative screenshot-and-compare loop.

## Workflow

1. **Build** the UI as Next.js components with Tailwind v4 (see Technical Defaults below — this is a Next.js app, not a single HTML file).
2. **Screenshot** the rendered page with the dev server running (e.g. Puppeteer against `localhost:3000`, `--fullpage`). If the page has distinct sections, capture those individually too.
3. **Compare** your screenshot against the reference image. Check for mismatches in:
   - Spacing and padding (measure in px)
   - Font sizes, weights, and line heights
   - Colors (exact hex values)
   - Alignment and positioning
   - Border radii, shadows, and effects
   - Responsive behavior
   - Image/icon sizing and placement
4. **Fix** every mismatch found. Edit the component/Tailwind code.
5. **Re-screenshot** and compare again.
6. **Repeat** steps 3–5 until the result is within ~2–3px of the reference everywhere.

Do NOT stop after one pass. Always do at least 2 comparison rounds. Only stop when the user says so or when no visible differences remain.

## Technical Defaults

- Build with **Next.js App Router + Tailwind v4** as configured in this repo — NOT Tailwind CDN, NOT a single `index.html`.
- Put reusable UI in `components/`, content/data in `content/`, helpers in `lib/`, types in `types/`.
- Use assets from `public/images/` and `public/icons/`; use placeholders from `https://placehold.co/` only when a source asset isn't provided.
- Mobile-first responsive design.

## Rules

- Do not add features, sections, or content not present in the reference image.
- Match the reference exactly — do not "improve" the design.
- If the user provides CSS classes or style tokens, use them verbatim.
- Keep code clean but don't over-abstract — inline Tailwind classes are fine.
- When comparing screenshots, be specific about what's wrong (e.g., "heading is 32px but reference shows ~24px", "gap between cards is 16px but should be 24px").
<!-- END:design-recreation-workflow -->
