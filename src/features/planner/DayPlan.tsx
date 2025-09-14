import { Link } from "@tanstack/react-router";
import { format, isToday } from "date-fns";
import { cs } from "date-fns/locale/cs";
import { CookingPot } from "lucide-react";
import { recipes } from "~/db/schema";
import { MealPlans } from "~/routes/planner";
import { MealRow } from "./MealRow";

type DayPlanProps = {
    day: Date;
    meals: MealPlans;
};

const MEAL_TYPES = [
    { title: "Oběd", key: "lunch" },
    { title: "Večeře", key: "dinner" },
];

export const DayPlan = ({ day, meals }: DayPlanProps) => {
    const lunch = meals.filter((meal) => meal.mealType === "lunch");
    const dinner = meals.filter((meal) => meal.mealType === "dinner");

    return (
        <ul
            className={`${isToday(day) ? "border-1 border-primary" : ""} bg-base-200 list rounded-box shadow-md p-8`}
        >
            <li className="pb-2 text-xs opacity-60 tracking-wide">
                <hgroup className={isToday(day) ? "text-primary" : ""}>
                    <h2 className="text-4xl font-bold capitalize ">
                        {format(day, "EEEE", { locale: cs })}
                    </h2>
                    <p className="text-lg">
                        {format(day, "dd. MM. yyyy", { locale: cs })}
                    </p>
                </hgroup>
            </li>

            <ul className="space-y-4">
                {MEAL_TYPES.map((mealRec) => {
                    const currentMeals = meals.filter(
                        (meal) => meal.mealType === mealRec.key,
                    );
                    const modalId = `${day.toISOString()}${mealRec.key}`;
                    return (
                        <li>
                            <h3 className="text-lg font-black opacity-60 ">
                                {mealRec.title}
                            </h3>
                            {currentMeals.length === 0 && (
                                <>
                                    <button className="btn" onClick={() => {}}>
                                        Vybrat recept
                                    </button>
                                </>
                            )}
                            {currentMeals.map((meal) => (
                                <MealRow meal={meal} />
                            ))}
                        </li>
                    );
                })}
            </ul>
        </ul>
    );
};
