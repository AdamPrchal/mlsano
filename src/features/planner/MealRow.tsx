import { Link } from "@tanstack/react-router";
import { CookingPot } from "lucide-react";
import { MealPlans } from "~/routes/planner";

type MealRowProps = {
    meal: MealPlans[0];
};

export const MealRow = ({ meal }: MealRowProps) => {
    return (
        <li
            className={`list-row bg-base-300 flex items-center justify-between`}
        >
            <div className="flex gap-4">
                <div>
                    <img
                        className="size-10 rounded-box object-cover"
                        src={meal.recipe.imageUrl || undefined}
                    />
                </div>
                <div className="space-y-1">
                    <h4 className="text-base">{meal.recipe.title}</h4>
                    <p className="text-xs">
                        {meal.recipe.cookTime
                            ? `${meal.recipe.cookTime} min`
                            : "-"}
                    </p>
                    <div className="text-xs uppercase font-semibold opacity-60 space-x-1">
                        {meal.recipe.recipeTags.map((t) => (
                            <div key={t.id} className="badge badge-soft ">
                                {t.tag?.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Link
                to="/recipes/$recipeId"
                params={{ recipeId: String(meal.recipe.id) }}
                className="btn btn-ghost"
            >
                <CookingPot />
                Začít vařit
            </Link>
        </li>
    );
};
