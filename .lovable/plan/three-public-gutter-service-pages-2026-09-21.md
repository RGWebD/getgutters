# Three Public Gutter Service Pages

## Scope
Create three indexable public pages while preserving the current homepage, gold-and-black styling, branding, contact details, imagery, and all private routes:

- `/services/seamless-gutter-installation`
- `/services/gutter-repair`
- `/services/gutter-guards`

## Shared page experience
- Build one reusable service-page layout matching the existing site’s typography, colors, header, footer, mobile behavior, and accessible link styles.
- Give every page a visible Home breadcrumb, exactly one service-specific H1, plain-language sections, a Northeast Florida weather/drainage section, 3–5 concise questions and answers, contextual links to the other service pages, and Call/Text actions for `(904) 589-0000`.
- Reuse only existing project photography, with descriptive alt text. No stock or generated imagery.
- Add unique title, description, Open Graph text, self-referencing canonical URL, `og:type`, and `twitter:card` metadata to each page. Do not add `noindex`.
- Add `Service` and `BreadcrumbList` JSON-LD to each page. Do not add review or rating schema.

## Page content
### Seamless Gutter Installation
Explain on-site fabrication of confirmed 6-inch K-style aluminum gutters, continuous runs, hidden hangers with stainless-steel screws, downspouts, roofline/drainage planning, and appearance considerations without inventing options. Cover failing or undersized systems, recurring leaks, sagging, drainage concerns, and new installations.

Questions:
1. Why choose seamless gutters?
2. How do I know when I need new gutters?
3. What affects a gutter installation estimate?
4. Are gutters made at the property?

### Gutter Repair
Explain assessment and repair considerations for leaking corners, sagging sections, loose hangers, damaged downspouts, poor drainage, overflowing water, and water moving toward the foundation. Clearly distinguish when repair may be reasonable from when replacement may need consideration, without guarantees.

Questions:
1. What are the warning signs that gutters need repair?
2. Can leaking gutters be repaired?
3. Why do gutters overflow?
4. When should replacement be considered instead?

### Gutter Guards
Explain how guards reduce leaves, pine needles, and roof debris while clearly stating they do not eliminate all maintenance. Explain that recommendations depend on the home, roof, surrounding trees, and current gutter condition, including inspection or cleaning first when needed.

Questions:
1. Do gutter guards help with pine needles?
2. Can guards be installed on existing gutters?
3. Should gutters be cleaned before guards are installed?
4. Do gutter guards eliminate gutter maintenance?

## Homepage and footer links
- Make only the existing Seamless Gutter Installation, Gutter Repair, and Gutter Guards cards clickable, linking to their matching pages; leave every other service card and homepage section unchanged.
- Add compact links for these three pages within the existing footer service list.
- Keep footer hours aligned with the confirmed schedule: Mon–Fri 7 AM–7 PM, Sat 7 AM–3 PM, Sun 9 AM–5 PM. They already match, so no wording change is planned unless verification finds a mismatch.

## Sitemap and verification
- Add exactly the three public service URLs to `public/sitemap.xml`, retaining the homepage URL.
- Confirm `/admin`, `/estimate`, `/estimator`, and `/database` still contain `noindex, nofollow` and remain otherwise untouched.
- Search for accidental unsupported claims and verify heading counts, canonical URLs, metadata, schema types, internal links, and sitemap entries.
- Run the production build and report the exact changed files plus each page’s final URL, title, description, canonical, H1, Q&A, and schema types.
- Do not publish.

## Technical details
- Add a focused shared service-page component/data module to avoid duplicating layout while keeping each route’s metadata and structured data explicit.
- Add three TanStack route files whose route IDs match their filenames; generated route-tree output will be left to the framework.
- Use existing semantic design tokens and current asset imports only.
