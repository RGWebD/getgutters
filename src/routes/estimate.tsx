import { createFileRoute } from "@tanstack/react-router";
import { EstimatorFrame } from "@/components/EstimatorFrame";

export const Route = createFileRoute("/estimate")({
  head: () => ({
    meta: [
      { title: "Get Gutters — Estimate Tool" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: EstimatePage,
});

function EstimatePage() {
  return <EstimatorFrame view="estimate" />;
}
