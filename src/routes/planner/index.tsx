// src/routes/index.tsx
import * as fs from "node:fs";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { PageHeader } from "~/components/PageHeader";
import { Plan } from "~/features/planner/Plan";
import { add, formatISO, startOfWeek } from "date-fns";
import { db } from "~/db";
import { and, gte, lte } from "drizzle-orm";
import { mealPlans } from "~/db/schema";

const getMealsPlan = createServerFn({
    method: "GET",
}).handler(async () => {
    return await db.query.mealPlans.findMany({
        where: and(
            gte(
                mealPlans.day,
                formatISO(new Date(), { representation: "date" }),
            ),
            lte(
                mealPlans.day,
                formatISO(add(new Date(), { weeks: 1 }), {
                    representation: "date",
                }),
            ),
        ),
        with: {
            recipe: {
                with: {
                    recipeTags: {
                        with: {
                            tag: true,
                        },
                    },
                },
            },
        },
        orderBy: (plan, { asc }) => [asc(plan.day)],
    });
});

export type MealPlans = Awaited<ReturnType<typeof getMealsPlan>>;

export const Route = createFileRoute("/planner/")({
    component: Planner,
    loader: () => getMealsPlan(),
});

function Planner() {
    const router = useRouter();
    const mealPlans = Route.useLoaderData();

    return (
        <>
            <PageHeader title="Plánovač" />
            <Plan today={new Date()} mealPlans={mealPlans} />
        </>
    );
}
