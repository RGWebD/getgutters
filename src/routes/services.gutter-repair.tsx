import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import work3 from "@/assets/work-3.jpeg.asset.json";

const url = "https://getguttersjax.com/services/gutter-repair";
const title = "Gutter Repair | Get Gutters Orange Park & Jacksonville FL";
const description = "Understand gutter repair for leaks, sagging, loose hangers, damaged downspouts, overflow, and drainage problems in Orange Park and Jacksonville.";

export const Route = createFileRoute("/services/gutter-repair")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: "Gutter Repair", serviceType: "Residential gutter repair", provider: { "@type": "LocalBusiness", name: "Get Gutters", telephone: "+1-904-589-0000", address: { "@type": "PostalAddress", streetAddress: "585 Bowie Blvd", addressLocality: "Orange Park", addressRegion: "FL", postalCode: "32073" } }, areaServed: ["Orange Park, FL", "Jacksonville, FL", "Northeast Florida"], url }) },
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://getguttersjax.com/" }, { "@type": "ListItem", position: 2, name: "Gutter Repair", item: url }] }) },
    ],
  }),
  component: GutterRepairPage,
});

const content: ServicePageContent = {
  eyebrow: "Restore Reliable Water Flow",
  title: "Gutter Repair",
  intro: "Get Gutters assesses leaking corners, sagging sections, loose hangers, damaged downspouts, overflow, and drainage problems to determine whether a focused repair or a broader replacement should be considered.",
  imageUrl: work3.url,
  imageAlt: "Finished seamless gutter corner and downspout installed by Get Gutters",
  overviewTitle: "Address the source of the gutter problem",
  overview: [
    "A visible drip is not always the whole problem. Water can escape at corners, flow over a low or blocked section, or travel toward the foundation when a downspout is damaged or poorly directed. Looking at the full path of the water helps identify what may need attention.",
    "Repair may be reasonable when the affected area is limited and the surrounding gutter remains serviceable. If damage is widespread, attachment points are failing, or the system no longer supports dependable drainage, replacement may need to be considered. The right choice depends on the condition of the actual system.",
  ],
  situationsTitle: "Problems a repair assessment can address",
  situationsIntro: "These signs can point to a gutter, attachment, downspout, or drainage concern.",
  situations: ["Leaking corners or miters", "Sagging or uneven gutter sections", "Loose hangers or gutters pulling from the roofline", "Damaged or disconnected downspouts", "Overflowing water during rain", "Water draining toward the foundation"],
  processTitle: "How Get Gutters approaches repair",
  process: [
    { title: "Inspect the visible system", description: "The gutter runs, corners, hangers, downspouts, and signs of poor drainage are reviewed to understand the issue." },
    { title: "Consider repair or replacement", description: "The condition and extent of the problem help determine whether a focused repair is reasonable or replacement should be discussed." },
    { title: "Restore the drainage path", description: "Applicable repairs focus on secure attachment, controlled flow, and moving water through the gutter and downspout system." },
  ],
  climateTitle: "Why prompt repairs matter in Northeast Florida",
  climate: "Northeast Florida rain can quickly expose weak corners, low spots, and damaged downspouts. Leaves, pine needles, and roof debris may contribute to overflow, while coastal weather can keep drainage systems working hard. Addressing visible problems helps reduce uncontrolled water around the roofline and foundation area.",
  questions: [
    { question: "What are the warning signs that gutters need repair?", answer: "Look for dripping corners, sagging runs, loose hangers, separated downspouts, overflow, and water collecting or moving toward the home." },
    { question: "Can leaking gutters be repaired?", answer: "Some localized leaks may be repairable. The surrounding gutter condition and the cause of the leak determine whether repair or replacement is the better option to discuss." },
    { question: "Why do gutters overflow?", answer: "Common causes include leaves or pine needles, poor slope, low spots, damaged sections, or downspouts that cannot move water away effectively." },
    { question: "When should replacement be considered instead?", answer: "Replacement may be worth considering when problems affect multiple sections, attachment is broadly failing, or the existing system no longer supports dependable drainage." },
  ],
  related: [
    { title: "Seamless Gutter Installation", description: "See how continuous 6-inch K-style gutters are fabricated on-site and installed for the home.", to: "/services/seamless-gutter-installation" },
    { title: "Gutter Guards", description: "Learn how guards can reduce leaves, pine needles, and debris entering a sound gutter system.", to: "/services/gutter-guards" },
  ],
};

function GutterRepairPage() { return <ServicePage content={content} />; }