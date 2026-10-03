import { createFileRoute } from "@tanstack/react-router";
import { LocalServiceAreaPage } from "@/components/LocalServiceAreaPage";
import { buildServiceAreaHead, getServiceArea } from "@/lib/service-areas";

const area = getServiceArea("argyle-forest");

export const Route = createFileRoute("/areas/argyle-forest")({
  head: () => buildServiceAreaHead(area),
  component: () => <LocalServiceAreaPage area={area} />,
});
