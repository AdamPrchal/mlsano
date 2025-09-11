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

export const DayPlan = ({ day, meals }: DayPlanProps) => {
    const lunch = meals.filter((meal) => meal.mealType === "lunch");
    const dinner = meals.filter((meal) => meal.mealType === "dinner");

    return (
        <ul
            className={`${isToday(day) ? "border-1 border-primary" : ""} bg-base-200 list rounded-box shadow-md p-4`}
        >
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
                <hgroup className={isToday(day) ? "text-primary" : ""}>
                    <h2 className="text-4xl font-bold capitalize ">
                        {format(day, "EEEE", { locale: cs })}
                    </h2>
                    <p className="text-lg">
                        {format(day, "dd. MM. yyyy", { locale: cs })}
                    </p>
                </hgroup>
            </li>

            <li className="px-4 opacity-60">
                <h3 className="text-lg font-black">Oběd</h3>
            </li>
            {lunch.map((meal) => (
                <MealRow meal={meal} />
            ))}
            <li className="px-4 opacity-60 mt-4">
                <h3 className="text-lg font-black">Večeře</h3>
            </li>
            {dinner.map((meal) => (
                <MealRow meal={meal} />
            ))}
        </ul>
    );
};
