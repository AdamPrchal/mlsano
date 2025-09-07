import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { db } from "~/db";
import { recipes } from "~/db/schema";

const getRecipe = createServerFn({
    method: "GET",
})
    .validator((recipeId: string) => recipeId)
    .handler(async ({ data }) => {
        return await db.query.recipes.findFirst({
            where: (recipe, { eq }) => eq(recipe.id, Number(data)),
            with: {
                recipeTags: {
                    with: {
                        tag: true,
                    },
                },
            },
        });
    });

const removeRecipe = createServerFn({
    method: "POST",
})
    .validator((recipeId: string) => recipeId)
    .handler(async ({ data }) => {
        await db.delete(recipes).where(eq(recipes.id, Number(data)));

        throw redirect({
            to: "/recipes",
        });
    });

export const Route = createFileRoute("/recipes/$recipeId")({
    component: RouteComponent,
    loader: async ({ params }) => {
        return getRecipe({ data: params.recipeId });
    },
});

function RouteComponent() {
    const { recipeId } = Route.useParams();
    const rmRecipe = useServerFn(removeRecipe);

    const recipe = Route.useLoaderData();

    if (!recipe) {
        return <p>Nothing here</p>;
    }

    return (
        <main>
            <img
                className="size-24 rounded-box object-cover"
                src={recipe.imageUrl || ""}
            />
            <article className="list-col-grow justify-between flex flex-col">
                <hgroup className="mb-2">
                    <h3 className="text-lg font-bold">{recipe.title}</h3>
                    <p className="text-xs">
                        {recipe.cookTime ? `${recipe.cookTime} min` : "-"}
                    </p>
                </hgroup>
                <div className="text-xs uppercase font-semibold opacity-60">
                    {recipe.recipeTags.map((t) => (
                        <div key={t.id} className="badge badge-soft ">
                            {t.tag?.name}
                        </div>
                    ))}
                </div>
            </article>
            <button
                onClick={() => {
                    rmRecipe({ data: recipeId });
                }}
                className="btn btn-active btn-error"
            >
                Odstranit
            </button>
        </main>
    );
}
