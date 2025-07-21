import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/recipes/add")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/recipes/add"!</div>;
}
