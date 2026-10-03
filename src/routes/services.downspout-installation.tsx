import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import work6 from "@/assets/work-6.jpeg.asset.json";

const url = "https://getguttersjax.com/services/downspout-installation";
const title = "Downspout Installation | Get Gutters Northeast Florida";
const description =
  "Downspout installation and drainage routing for homes and properties in Orange Park, Jacksonville, and Northeast Florida.";

export const Route = createFileRoute("/services/downspout-installation")({
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
          name: "Downspout Installation",
          serviceType: "Downspout installation and drainage routing",
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
            { "@type": "ListItem", position: 2, name: "Downspout Installation", item: url },
          ],
        }),
      },
    ],
  }),
  component: DownspoutInstallationPage,
});

const content: ServicePageContent = {
  eyebrow: "Move Water Away from the Property",
  title: "Downspout Installation",
  intro:
    "Get Gutters plans and installs downspouts around the amount of roof runoff, the gutter layout, the building, and the available drainage path so water can be directed away from sensitive areas.",
  imageUrl: work6.url,
  imageAlt: "Custom downspout routing installed by Get Gutters",
  overviewTitle: "Complete the path from roof to discharge",
  overview: [
    "Gutters collect water, but downspouts determine where that water goes next. Their size, number, placement, and discharge direction all affect whether runoff moves away from the property or collects near walls and foundations.",
    "The right layout depends on the roof, gutter runs, grade, landscaping, walkways, and existing drainage. Oversized and decorative downspout options, along with applicable extensions or underground routing, can be discussed during the assessment.",
  ],
  situationsTitle: "When downspout work may be needed",
  situationsIntro:
    "Poor discharge can create a drainage problem even when the gutter itself is collecting water.",
  situations: [
    "Water collecting near the foundation",
    "A disconnected, crushed, or damaged downspout",
    "Overflow near a downspout opening",
    "Runoff crossing a walkway or gathering by an entry",
    "A new gutter system that needs a complete drainage layout",
  ],
  processTitle: "How Get Gutters approaches downspouts",
  process: [
    {
      title: "Trace the water path",
      description:
        "The roof runoff, gutter outlets, current downspouts, property grade, and visible discharge areas are reviewed.",
    },
    {
      title: "Plan placement and routing",
      description:
        "Downspout locations and routing are considered around the building, access, and available drainage path.",
    },
    {
      title: "Install and check flow",
      description:
        "The agreed components are installed to connect the gutter system to the planned discharge area.",
    },
  ],
  climateTitle: "Handling intense Northeast Florida rain",
  climate:
    "A short, heavy storm can move a large amount of water from the roof into the gutter system. Downspouts need a clear path and practical discharge location so that water is not simply transferred from the roof edge to another problem area below.",
  questions: [
    {
      question: "How many downspouts does a property need?",
      answer:
        "That depends on the roof area, gutter layout, runoff, available outlet locations, and the path water can take after leaving the downspout.",
    },
    {
      question: "Can a damaged downspout be replaced?",
      answer:
        "Yes. The damaged section and the surrounding gutter and drainage path should be assessed before the replacement is scoped.",
    },
    {
      question: "Do you offer oversized downspouts?",
      answer:
        "Oversized downspout options can be discussed based on the gutter system and drainage needs at the property.",
    },
    {
      question: "Can downspouts connect to underground drainage?",
      answer:
        "Applicable underground routing can be discussed after the property, discharge path, and project scope are assessed.",
    },
  ],
  related: [
    {
      title: "Gutter Repair",
      description:
        "Address damaged downspouts, leaks, loose sections, overflow, and other visible drainage concerns.",
      to: "/services/gutter-repair",
    },
    {
      title: "Commercial Gutters",
      description:
        "See how gutter and downspout planning applies to storefronts, warehouses, and multi-unit properties.",
      to: "/services/commercial-gutters",
    },
  ],
};

function DownspoutInstallationPage() {
  return <ServicePage content={content} />;
}
