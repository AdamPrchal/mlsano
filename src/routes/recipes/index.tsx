// src/routes/index.tsx
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { db } from "~/db";
import { Link } from "@tanstack/react-router";
import { Plus, Wind } from "lucide-react";
import { PageHeader } from "../../components/PageHeader";

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

export const Route = createFileRoute("/recipes/")({
    component: Home,
    loader: () => getRecipes(),
});

function Home() {
    const router = useRouter();
    const recipes = Route.useLoaderData();

    console.log(recipes);
    return (
        <>
            <PageHeader title="Recepty" />
            {recipes.length > 0 ? (
                <ul className="list bg-base-100 rounded-box shadow-md ">
                    {recipes.map((recipe, index) => (
                        <li key={recipe.id}>
                            <Link
                                className="list-row"
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
                                            <div
                                                key={t.id}
                                                className="badge badge-soft "
                                            >
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
        </>
    );
}
