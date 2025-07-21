// src/routes/index.tsx
import * as fs from "node:fs";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { PageHeader } from "../components/PageHeader";

export const Route = createFileRoute("/about")({
    component: About,
});

function About() {
    const router = useRouter();
    const state = Route.useLoaderData();

    return (
        <>
            <PageHeader title="O Mlsano" />
            <article className="prose lg:prose-xl">
                <p>
                    Mlsano is web app for storing your recipes and make managing
                    them a breeze.
                </p>
                <p>Made by Adam Prchal</p>
            </article>
        </>
    );
}
