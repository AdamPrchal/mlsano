// src/routes/index.tsx
import * as fs from "node:fs";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const router = useRouter();
  const state = Route.useLoaderData();

  return (
    <main>
      <article className="prose lg:prose-xl">
        <h1>About Mlsano</h1>
        <p>
          Mlsano is web app for storing your recipes and make managing them a
          breeze.
        </p>
        <p>Made by Adam Prchal</p>
      </article>
    </main>
  );
}
