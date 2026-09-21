import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import work7 from "@/assets/work-7.jpeg.asset.json";

const url = "https://getguttersjax.com/services/gutter-guards";
const title = "Gutter Guards | Get Gutters Orange Park & Jacksonville FL";
const description = "Learn how gutter guards can reduce leaves, pine needles, and roof debris for homes in Orange Park, Jacksonville, and Northeast Florida.";

export const Route = createFileRoute("/services/gutter-guards")({
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
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: "Gutter Guards", serviceType: "Gutter guard and leaf protection installation", provider: { "@type": "LocalBusiness", name: "Get Gutters", telephone: "+1-904-589-0000", address: { "@type": "PostalAddress", streetAddress: "585 Bowie Blvd", addressLocality: "Orange Park", addressRegion: "FL", postalCode: "32073" } }, areaServed: ["Orange Park, FL", "Jacksonville, FL", "Northeast Florida"], url }) },
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://getguttersjax.com/" }, { "@type": "ListItem", position: 2, name: "Gutter Guards", item: url }] }) },
    ],
  }),
  component: GutterGuardsPage,
});

const content: ServicePageContent = {
  eyebrow: "Leaf & Debris Protection",
  title: "Gutter Guards",
  intro: "Gutter guards help reduce the amount of leaves, pine needles, and roof debris entering gutters. The right recommendation depends on the home, roof, surrounding trees, and condition of the existing gutter system.",
  imageUrl: work7.url,
  imageAlt: "Dark seamless gutter system installed on a brick home by Get Gutters",
  overviewTitle: "Reduce debris while keeping realistic expectations",
  overview: [
    "Gutter guards create a barrier over the gutter opening so water can enter while much of the larger debris stays out. This can reduce buildup from leaves, pine needles, and material washing from the roof, helping water move toward the downspouts.",
    "Guards do not eliminate all future maintenance. Fine debris can still collect, and the gutter and downspout system should remain part of normal home care. The home’s roof shape, nearby trees, existing gutter condition, and typical debris all matter when considering a guard system.",
  ],
  situationsTitle: "When guards may be worth considering",
  situationsIntro: "A guard recommendation should reflect the actual home rather than a one-size-fits-all answer.",
  situations: ["Trees regularly drop leaves or pine needles near the roof", "Roof debris frequently collects in open gutters", "Gutters are in suitable condition but collect debris quickly", "The homeowner wants to reduce, not eliminate, routine buildup", "Existing drainage should be inspected before adding protection"],
  processTitle: "How Get Gutters approaches gutter guards",
  process: [
    { title: "Review the home", description: "The roof, surrounding trees, debris type, and existing gutter and downspout condition are considered first." },
    { title: "Inspect and prepare", description: "Existing gutters should be inspected and, when needed, cleaned or repaired before guards are added." },
    { title: "Recommend suitable protection", description: "The recommendation is based on how the system needs to handle rain and debris at that particular home." },
  ],
  climateTitle: "Leaves, pine needles, and Northeast Florida rain",
  climate: "Leaves and pine needles can build up in open gutters around Orange Park and Jacksonville. During heavy Northeast Florida rain, that debris may slow flow and contribute to overflow. Coastal weather and roof runoff also make it important for gutters and downspouts to remain in sound condition beneath any guard system.",
  questions: [
    { question: "Do gutter guards help with pine needles?", answer: "They can reduce the amount of pine needles entering gutters, but the result depends on the guard, roof, nearby trees, and the size and condition of the gutter system." },
    { question: "Can guards be installed on existing gutters?", answer: "They may be installed on suitable existing gutters. The gutters, hangers, slope, and downspouts should be inspected first." },
    { question: "Should gutters be cleaned before guards are installed?", answer: "If debris is present, it should be removed so the gutter and downspout path is clear before protection is added." },
    { question: "Do gutter guards eliminate gutter maintenance?", answer: "No. Guards can reduce debris entering gutters, but periodic inspection and maintenance may still be needed." },
  ],
  related: [
    { title: "Gutter Repair", description: "Address leaks, sagging, loose hangers, damaged downspouts, or drainage issues before adding guards.", to: "/services/gutter-repair" },
    { title: "Seamless Gutter Installation", description: "Learn about custom 6-inch K-style gutter runs fabricated on-site for the home.", to: "/services/seamless-gutter-installation" },
  ],
};

function GutterGuardsPage() { return <ServicePage content={content} />; }