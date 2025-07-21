// src/routes/index.tsx
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { db } from "~/db";
import { Link } from "@tanstack/react-router";
import { Plus, Wind } from "lucide-react";

const getRecipes = createServerFn({
    method: "GET",
}).handler(async () => {
    return await db.query.recipes.findMany({
        with: {
            recipeTags: {
                with: {
                    tag: true,
                },
            },
        },
    });
});

export const Route = createFileRoute("/")({
    component: Home,
    loader: () => getRecipes(),
});

function Home() {
    const router = useRouter();
    const recipes = Route.useLoaderData();

    console.log(recipes);
    return (
        <main className="mx-auto max-w-4xl p-2 pb-32">
            <hgroup className="prose mt-4 mb-6 px-4">
                <h1>Recepty</h1>
            </hgroup>
            {recipes.length > 0 ? (
                <ul className="list bg-base-100 rounded-box shadow-md ">
                    {recipes.map((recipe, index) => (
                        <li>
                            <Link
                                className="list-row hover:bg-neutral"
                                to={"/"}
                            >
                                <div className="text-4xl font-thin opacity-30 tabular-nums">
                                    {index < 10 && "0"}
                                    {index < 100 && "0"}
                                    {index}
                                </div>
                                <img
                                    className="size-24 rounded-box object-cover"
                                    src={recipe.image_url || ""}
                                />
                                <article className="list-col-grow justify-between flex flex-col">
                                    <hgroup className="mb-2">
                                        <h3 className="text-lg font-bold">
                                            {recipe.title}
                                        </h3>
                                        <p className="text-xs">
                                            {recipe.cook_time || "10 min"}
                                        </p>
                                    </hgroup>
                                    <div className="text-xs uppercase font-semibold opacity-60">
                                        {recipe.recipeTags.map((t) => (
                                            <div className="badge badge-soft ">
                                                {t.tag?.name}
                                            </div>
                                        ))}
                                    </div>
                                </article>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex flex-col items-center justify-center h-64 gap-4">
                    <Wind className="size-16" />
                    <p className="text-lg">Žádné recepty</p>
                    <Link className="btn btn-primary" to={"/recipes/add"}>
                        <Plus />
                        Přidat recept
                    </Link>
                </div>
            )}
        </main>
    );
}
