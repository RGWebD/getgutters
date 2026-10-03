import { createFileRoute } from "@tanstack/react-router";
import { LocalServiceAreaPage } from "@/components/LocalServiceAreaPage";
import { buildServiceAreaHead, getServiceArea } from "@/lib/service-areas";

const area = getServiceArea("fleming-island");

export const Route = createFileRoute("/areas/fleming-island")({
  head: () => buildServiceAreaHead(area),
  component: () => <LocalServiceAreaPage area={area} />,
});
