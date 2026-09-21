import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import gutterMachine from "@/assets/gutter-machine.jpeg.asset.json";

const url = "https://getguttersjax.com/services/seamless-gutter-installation";
const title = "Seamless Gutter Installation | Get Gutters Orange Park FL";
const description = "Learn about custom 6-inch K-style seamless gutter installation for homes in Orange Park, Jacksonville, and Northeast Florida. Call or text Get Gutters.";

export const Route = createFileRoute("/services/seamless-gutter-installation")({
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
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: "Seamless Gutter Installation", serviceType: "6-inch K-style seamless gutter installation", provider: { "@type": "LocalBusiness", name: "Get Gutters", telephone: "+1-904-589-0000", address: { "@type": "PostalAddress", streetAddress: "585 Bowie Blvd", addressLocality: "Orange Park", addressRegion: "FL", postalCode: "32073" } }, areaServed: ["Orange Park, FL", "Jacksonville, FL", "Northeast Florida"], url }) },
      { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://getguttersjax.com/" }, { "@type": "ListItem", position: 2, name: "Seamless Gutter Installation", item: url }] }) },
    ],
  }),
  component: SeamlessGutterInstallationPage,
});

const content: ServicePageContent = {
  eyebrow: "Custom-Fabricated On-Site",
  title: "Seamless Gutter Installation",
  intro: "Get Gutters fabricates 6-inch K-style aluminum gutters at your property, creating continuous runs shaped for your roofline and planned to move rainwater away from the home.",
  imageUrl: gutterMachine.url,
  imageAlt: "Get Gutters seamless gutter machine used to fabricate gutters on-site",
  overviewTitle: "A gutter system made for your roofline",
  overview: [
    "Seamless gutters are formed in continuous sections, reducing the number of joints along each run. Get Gutters uses a commercial K-style machine at the property to fabricate confirmed 6-inch aluminum gutters for the home.",
    "Installation includes hidden hangers secured with stainless-steel screws, along with downspout placement and drainage planning. The roofline, water flow, existing drainage, and the way the finished system fits the home are considered before the work is laid out.",
  ],
  situationsTitle: "When installation may make sense",
  situationsIntro: "A new system may be worth discussing when the current gutters cannot reliably collect and direct water.",
  situations: ["Recurring leaks or separations along older gutter runs", "Sagging sections or loose attachment points", "Overflow during rain even after debris is addressed", "Downspouts that do not move water away effectively", "A home that needs a complete gutter system"],
  processTitle: "How Get Gutters approaches installation",
  process: [
    { title: "Review the home", description: "The roofline, existing gutters, downspout locations, and drainage needs are considered before recommendations are made." },
    { title: "Fabricate continuous runs", description: "The 6-inch K-style aluminum gutter is formed on-site with the commercial seamless gutter machine to fit the planned roofline sections." },
    { title: "Install and route water", description: "Hidden hangers with stainless-steel screws secure the gutters, while downspouts are positioned to support effective drainage." },
  ],
  climateTitle: "Built around Northeast Florida weather",
  climate: "Heavy Northeast Florida rain can place a large amount of water on a roof in a short period. Leaves, pine needles, and other debris can also affect flow, while coastal weather makes dependable attachment and drainage planning especially important. A properly planned gutter and downspout layout helps carry water away from the roofline and foundation area.",
  questions: [
    { question: "Why choose seamless gutters?", answer: "They are formed in continuous runs, so there are fewer joints along each section where leaks can develop." },
    { question: "How do I know when I need new gutters?", answer: "Recurring leaks, sagging, loose sections, frequent overflow, or water moving toward the home are reasons to have the system assessed." },
    { question: "What affects a gutter installation estimate?", answer: "The roofline, required gutter length, downspout and drainage needs, access, and the condition of the areas where gutters attach all affect the work involved." },
    { question: "Are gutters made at the property?", answer: "Yes. Get Gutters uses its commercial K-style machine to fabricate continuous 6-inch aluminum gutter runs on-site." },
  ],
  related: [
    { title: "Gutter Repair", description: "Explore solutions for leaks, sagging sections, loose hangers, and damaged downspouts.", to: "/services/gutter-repair" },
    { title: "Gutter Guards", description: "Learn how guards can reduce leaves, pine needles, and roof debris entering gutters.", to: "/services/gutter-guards" },
  ],
};

function SeamlessGutterInstallationPage() { return <ServicePage content={content} />; }