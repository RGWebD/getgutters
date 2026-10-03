import { createFileRoute } from "@tanstack/react-router";
import { ServicePage, type ServicePageContent } from "@/components/ServicePage";
import fasciaInstall from "@/assets/fascia-install.jpeg.asset.json";

const url = "https://getguttersjax.com/services/fascia-soffit";
const title = "Fascia & Soffit Installation | Get Gutters Northeast Florida";
const description =
  "Fascia and soffit installation for rooflines in Orange Park, Jacksonville, and Northeast Florida. Request an assessment from Get Gutters.";

export const Route = createFileRoute("/services/fascia-soffit")({
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
          name: "Fascia and Soffit Installation",
          serviceType: "Fascia wrap and soffit installation",
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
            { "@type": "ListItem", position: 2, name: "Fascia and Soffit Installation", item: url },
          ],
        }),
      },
    ],
  }),
  component: FasciaSoffitPage,
});

const content: ServicePageContent = {
  eyebrow: "Finish and Protect the Roofline",
  title: "Fascia & Soffit Installation",
  intro:
    "Get Gutters installs aluminum fascia wrap and soffit components as part of a clean, functional roofline built to support the gutter system and manage exposed areas beneath the roof edge.",
  imageUrl: fasciaInstall.url,
  imageAlt: "Fascia and soffit installation completed by Get Gutters",
  overviewTitle: "Roofline work that supports the gutter system",
  overview: [
    "Fascia forms the face of the roof edge where gutters are commonly attached. Soffit covers the underside of the overhang. Their condition and fit matter when planning a secure, finished gutter installation.",
    "The existing roofline should be assessed before new material is installed. Visible damage, attachment concerns, and the scope of any needed preparation can then be discussed as part of the project.",
  ],
  situationsTitle: "When fascia or soffit work may be considered",
  situationsIntro:
    "An assessment can help separate a surface concern from a broader roofline or gutter attachment issue.",
  situations: [
    "Visible deterioration along the fascia line",
    "Loose, missing, or damaged soffit panels",
    "Staining or peeling finishes around the roof edge",
    "A gutter replacement that exposes attachment concerns",
    "A roofline that needs new aluminum wrap or a cleaner finished appearance",
  ],
  processTitle: "How Get Gutters approaches fascia and soffit",
  process: [
    {
      title: "Review the roofline",
      description:
        "The visible fascia, soffit, gutter attachment areas, and project access are considered before the work is scoped.",
    },
    {
      title: "Prepare the installation area",
      description:
        "The installation plan reflects the condition of the existing surface and any preparation that is identified during the assessment.",
    },
    {
      title: "Install and finish",
      description:
        "Fascia wrap and soffit components are fitted to create a clean roofline that works with the planned gutter system.",
    },
  ],
  climateTitle: "Roofline details in Northeast Florida",
  climate:
    "Heat, humidity, wind-driven rain, and coastal weather can be hard on exposed roofline materials. Proper fit, secure attachment, and coordinated gutter placement help the fascia, soffit, and drainage system work together.",
  questions: [
    {
      question: "What is the difference between fascia and soffit?",
      answer:
        "Fascia is the vertical face at the roof edge, while soffit covers the underside of the roof overhang.",
    },
    {
      question: "Why does fascia condition matter for gutters?",
      answer:
        "Gutters are commonly attached along the fascia line, so visible damage or weak attachment areas should be assessed before installation.",
    },
    {
      question: "Can fascia and soffit be included with gutter work?",
      answer:
        "They can be discussed as part of the same roofline project when the assessment shows that both areas need attention.",
    },
    {
      question: "What affects the estimate?",
      answer:
        "The length of the roofline, access, material needs, and the visible condition of the existing fascia and soffit affect the project scope.",
    },
  ],
  related: [
    {
      title: "Seamless Gutter Installation",
      description:
        "See how continuous 6-inch K-style gutters are fabricated on-site and planned for the roofline.",
      to: "/services/seamless-gutter-installation",
    },
    {
      title: "Gutter Repair",
      description:
        "Learn about addressing loose attachment points, sagging runs, leaks, and damaged downspouts.",
      to: "/services/gutter-repair",
    },
  ],
};

function FasciaSoffitPage() {
  return <ServicePage content={content} />;
}
