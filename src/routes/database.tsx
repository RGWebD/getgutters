import { createFileRoute } from "@tanstack/react-router";
import { EstimatorFrame } from "@/components/EstimatorFrame";

export const Route = createFileRoute("/database")({
  head: () => ({
    meta: [
      { title: "Get Gutters — Customer Database" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: DatabasePage,
});

function DatabasePage() {
  return <EstimatorFrame view="database" />;
}
