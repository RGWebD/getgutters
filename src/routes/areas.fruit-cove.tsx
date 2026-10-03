import { createFileRoute } from "@tanstack/react-router";
import { LocalServiceAreaPage } from "@/components/LocalServiceAreaPage";
import { buildServiceAreaHead, getServiceArea } from "@/lib/service-areas";

const area = getServiceArea("fruit-cove");

export const Route = createFileRoute("/areas/fruit-cove")({
  head: () => buildServiceAreaHead(area),
  component: () => <LocalServiceAreaPage area={area} />,
});
