# UI and interaction refresh

The shared visual layer is `src/styles/design-system.css`, loaded after the original component styles. It applies to all 55 generated pages, including the 35 city pages. Existing project stories and approved photographs remain the source of local content.

## Visual decisions

- Hanken Grotesk headings with a clear weight and scale; balanced line lengths, readable body copy and quieter labels.
- Cool neutral backgrounds, white cards, navy text and cobalt primary actions. Orange identifies the emergency action in the header.
- Shared color, spacing, radius and shadow tokens. Cards use 18–20px corners; controls use 10–12px corners and at least 48px height.
- A responsive four-column service grid, project previews, separate process steps, readable FAQs and higher-contrast footer labels.
- Essential content is visible immediately; navigation to anchors does not depend on a reveal animation. Reduced-motion preferences are respected.

## Interaction patterns

- Mobile quick-help bar: call and request links, safe-area spacing, page clearance, hidden and inert while the mobile menu is open.
- Photo viewer: native modal dialog, explicit close, previous/next controls with boundary states, photo count, caption, Escape and arrow-key support. It restores the originating link and previous scroll behavior. Original full-image links remain usable without JavaScript or through modified clicks.
- City section navigation: services, reviewed local project where available, local conditions and help. All destinations exist on the corresponding page.
- Emergency phone is a direct call link. The form retains its accepted-response, retry and duplicate-submission behavior.
- Contact details wrap on narrow screens; coverage maps use an explicit responsive width to avoid aspect-ratio expansion.

## Validation

- Production build: 55 pages.
- Existing automated tests: 14 passed (forms, API pagination, navigation).
- Built-site audit: 55 pages, 35 city pages, 53 sitemap URLs; no issues in the automated structural/link checks.
- Browser review at 1440px, 390px and 320px. Contact, water-damage service, projects and emergency pages checked at 320px for horizontal overflow. Contact map overflow found and corrected.
- Manually checked mobile menu, city anchor, project city filter, photo previous/next and Escape, and required-field validation without submitting a lead.

This is a visual and interaction review, not a complete WCAG conformance audit. No new photos were imported in this refresh.
