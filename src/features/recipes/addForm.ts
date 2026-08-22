import { createServerFn } from "@tanstack/react-start";
import { redirect } from "@tanstack/react-router";
import { recipes, recipesInsertSchema } from "~/db/schema";
import { db } from "~/db";

export const handleForm = createServerFn({ method: "POST" })
    .validator(recipesInsertSchema)
    .handler(async ({ data }) => {
        await db.insert(recipes).values(data);

        throw redirect({
            to: "/recipes",
        });
    });
