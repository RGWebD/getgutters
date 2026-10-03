import { createFileRoute } from "@tanstack/react-router";
import { LocalServiceAreaPage } from "@/components/LocalServiceAreaPage";
import { buildServiceAreaHead, getServiceArea } from "@/lib/service-areas";

const area = getServiceArea("oakleaf-plantation");

export const Route = createFileRoute("/areas/oakleaf-plantation")({
  head: () => buildServiceAreaHead(area),
  component: () => <LocalServiceAreaPage area={area} />,
});
