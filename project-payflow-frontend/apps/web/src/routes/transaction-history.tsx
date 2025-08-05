import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/transaction-history")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/transaction-history"!</div>;
}
