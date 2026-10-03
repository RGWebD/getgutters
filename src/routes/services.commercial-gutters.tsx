import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import work5 from "@/assets/work-5.jpeg.asset.json";

const url = "https://getguttersjax.com/services/commercial-gutters";
const title = "Commercial Gutters | Get Gutters Jacksonville & Orange Park FL";
const description =
  "Commercial gutter systems for storefronts, warehouses, and multi-unit properties in Jacksonville, Orange Park, and Northeast Florida.";

export const Route = createFileRoute("/services/commercial-gutters")({
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
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Commercial Gutter Systems",
          serviceType: "Commercial gutter installation and drainage planning",
          provider: {
            "@type": "LocalBusiness",
            name: "Get Gutters",
            telephone: "+1-904-589-0000",
            address: {
              "@type": "PostalAddress",
              streetAddress: "585 Bowie Blvd",
              addressLocality: "Orange Park",
              addressRegion: "FL",
              postalCode: "32073",
            },
          },
          areaServed: ["Orange Park, FL", "Jacksonville, FL", "Northeast Florida"],
          url,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://getguttersjax.com/" },
            { "@type": "ListItem", position: 2, name: "Commercial Gutter Systems", item: url },
          ],
        }),
      },
    ],
  }),
  component: CommercialGuttersPage,
});

const content: ServicePageContent = {
  eyebrow: "Drainage for Commercial Properties",
  title: "Commercial Gutter Systems",
  intro:
    "Get Gutters plans commercial gutter and downspout systems around the roofline, runoff, access, and drainage needs of storefronts, warehouses, and multi-unit properties in Northeast Florida.",
  imageUrl: work5.url,
  imageAlt: "Full-perimeter gutter installation completed by Get Gutters",
  overviewTitle: "Plan the system around the property",
  overview: [
    "Commercial rooflines and paved sites can move a large amount of water during a storm. Gutter size, downspout placement, discharge locations, access, and the way people use the property all need to be considered before a system is laid out.",
    "An assessment helps define the actual scope, whether the need is a new installation, replacement of a failing system, or attention to a specific drainage problem. Recommendations should reflect the building rather than a one-size-fits-all layout.",
  ],
  situationsTitle: "Properties and problems to assess",
  situationsIntro:
    "The project begins with the building, the water path, and the practical needs of the site.",
  situations: [
    "Storefronts and retail properties",
    "Warehouses and light industrial buildings",
    "Multi-unit and managed properties",
    "Overflow near entrances, walkways, or parking areas",
    "Aging gutters, damaged downspouts, or uncontrolled roof runoff",
  ],
  processTitle: "How Get Gutters approaches commercial work",
  process: [
    {
      title: "Review the site",
      description:
        "The roofline, runoff, access, downspout locations, and visible drainage concerns are considered at the property.",
    },
    {
      title: "Define the scope",
      description:
        "The proposed system is based on the building and the work identified during the assessment.",
    },
    {
      title: "Coordinate installation",
      description:
        "Installation details and site access are planned around the agreed commercial project scope.",
    },
  ],
  climateTitle: "Commercial drainage during Northeast Florida storms",
  climate:
    "Heavy rain can quickly concentrate runoff from a large roof. A planned gutter and downspout layout helps direct that water away from entrances, walls, foundations, and other sensitive areas of a commercial property.",
  questions: [
    {
      question: "What types of commercial properties do you assess?",
      answer:
        "Commercial gutter work can be discussed for storefronts, warehouses, multi-unit properties, and other buildings within the service area.",
    },
    {
      question: "Can an existing commercial system be replaced?",
      answer:
        "Yes. The current gutters, downspouts, attachment areas, and drainage concerns should be assessed before a replacement scope is recommended.",
    },
    {
      question: "Why does downspout placement matter?",
      answer:
        "Downspouts need to move roof runoff toward appropriate discharge areas without creating new problems around entrances, walkways, walls, or foundations.",
    },
    {
      question: "What is needed for an estimate?",
      answer:
        "The building dimensions and roofline, site access, drainage layout, material needs, and condition of the existing system all help define the estimate.",
    },
  ],
  related: [
    {
      title: "Downspout Installation",
      description:
        "Learn how downspout placement and discharge planning support controlled drainage.",
      to: "/services/downspout-installation",
    },
    {
      title: "Seamless Gutter Installation",
      description:
        "Review the on-site fabrication and installation approach used for seamless gutter runs.",
      to: "/services/seamless-gutter-installation",
    },
  ],
};

function CommercialGuttersPage() {
  return <ServicePage content={content} />;
}
