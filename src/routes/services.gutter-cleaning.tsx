import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import { siteImages } from "@/lib/site-images";

const url = "https://getguttersjax.com/services/gutter-cleaning";
const title = "Gutter Cleaning | Get Gutters Orange Park & Jacksonville FL";
const description =
  "Gutter cleaning, flushing, and inspection for homes in Orange Park, Jacksonville, and Northeast Florida. Request a free estimate from Get Gutters.";

export const Route = createFileRoute("/services/gutter-cleaning")({
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
          name: "Gutter Cleaning",
          serviceType: "Gutter cleaning, flushing, and inspection",
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
            { "@type": "ListItem", position: 2, name: "Gutter Cleaning", item: url },
          ],
        }),
      },
    ],
  }),
  component: GutterCleaningPage,
});

const content: ServicePageContent = {
  eyebrow: "Clear the Drainage Path",
  title: "Gutter Cleaning",
  intro:
    "Get Gutters removes leaves, pine needles, and other debris, then flushes and inspects the system so you can better understand how water is moving through the gutters and downspouts.",
  imageUrl: siteImages.work2.src,
  imageSrcSet: siteImages.work2.srcSet,
  imageWidth: siteImages.work2.width,
  imageHeight: siteImages.work2.height,
  imageAlt: "Wrap-around seamless gutter system installed by Get Gutters",
  overviewTitle: "Remove the buildup that slows water flow",
  overview: [
    "Debris can collect along gutter runs, at corners, and near downspout openings. That buildup may slow drainage and contribute to overflow during Northeast Florida rain.",
    "A cleaning visit focuses on removing collected debris, flushing the drainage path, and checking for visible concerns such as leaks, sagging sections, loose attachment points, or downspout problems. Debris removed during the service is hauled away.",
  ],
  situationsTitle: "When cleaning may be needed",
  situationsIntro:
    "Visible buildup and changing water flow are practical reasons to have the system checked.",
  situations: [
    "Leaves or pine needles visible in open gutters",
    "Water spilling over the gutter edge during rain",
    "Plants or packed debris growing from the gutter",
    "Water draining slowly through a downspout",
    "A gutter system that has not been inspected recently",
  ],
  processTitle: "How Get Gutters approaches cleaning",
  process: [
    {
      title: "Inspect the system",
      description:
        "Visible gutter runs, corners, and downspout openings are reviewed before debris is removed.",
    },
    {
      title: "Clean and flush",
      description:
        "Collected material is removed and the drainage path is flushed to check how water moves through the system.",
    },
    {
      title: "Report visible concerns",
      description:
        "Leaks, sagging, loose sections, or downspout concerns found during the service can be discussed before repair work is considered.",
    },
  ],
  climateTitle: "Cleaning around Northeast Florida trees and rain",
  climate:
    "Leaves, pine needles, roof debris, and frequent rain can create recurring buildup around Orange Park and Jacksonville. The timing of future cleaning depends on the roof, nearby trees, weather, and whether guards are installed.",
  questions: [
    {
      question: "How do I know if my gutters need cleaning?",
      answer:
        "Visible debris, plants, overflow, and slow downspout drainage are common signs that the system should be inspected and cleaned.",
    },
    {
      question: "Are the downspouts checked too?",
      answer:
        "The service includes flushing and inspecting the drainage path, including visible downspout flow.",
    },
    {
      question: "What happens to the debris?",
      answer: "Debris removed during the cleaning is hauled away from the property.",
    },
    {
      question: "Does cleaning fix leaks or sagging gutters?",
      answer:
        "Cleaning removes buildup but is not the same as repair. Visible repair concerns can be identified and discussed separately.",
    },
  ],
  related: [
    {
      title: "Gutter Guards",
      description:
        "Learn how guards can reduce leaves, pine needles, and roof debris entering a sound gutter system.",
      to: "/services/gutter-guards",
    },
    {
      title: "Gutter Repair",
      description:
        "Explore repair options for leaks, sagging sections, loose hangers, and damaged downspouts.",
      to: "/services/gutter-repair",
    },
  ],
};

function GutterCleaningPage() {
  return <ServicePage content={content} />;
}
