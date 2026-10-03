import { createFileRoute } from "@tanstack/react-router";
import { LocalServiceAreaPage } from "@/components/LocalServiceAreaPage";
import { buildServiceAreaHead, getServiceArea } from "@/lib/service-areas";

const area = getServiceArea("mandarin");

export const Route = createFileRoute("/areas/mandarin")({
  head: () => buildServiceAreaHead(area),
  component: () => <LocalServiceAreaPage area={area} />,
});
