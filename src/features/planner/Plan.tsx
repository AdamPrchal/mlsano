import { add, differenceInDays, formatISO } from "date-fns";
import { DayPlan } from "./DayPlan";
import { MealPlans } from "~/routes/planner";

type PlanProps = {
    mealPlans: MealPlans;
};

export const Plan = ({ mealPlans }: PlanProps) => {
    const today = new Date();
    const days = [
        ...Array(differenceInDays(add(today, { weeks: 1 }), today)).keys(),
    ].map((a) => add(today, { days: a }));

    const groupedMeals = Object.groupBy(mealPlans, ({ day }) => day);

    return (
        <ul className="space-y-16">
            {days.map((day) => (
                <li key={day.toISOString()}>
                    <DayPlan
                        day={day}
                        meals={
                            groupedMeals[
                                formatISO(day, { representation: "date" })
                            ] || []
                        }
                    />
                </li>
            ))}
        </ul>
    );
};
