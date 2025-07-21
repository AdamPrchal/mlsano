// src/routes/index.tsx
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { PageHeader } from "../components/PageHeader";

export const Route = createFileRoute("/")({
    component: Home,
});

function Home() {
    const router = useRouter();

    return <PageHeader title="Přehled" />;
}
