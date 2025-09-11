DROP INDEX "meal_plans_day_meal_type_uniq";--> statement-breakpoint
ALTER TABLE "meal_plans" ADD CONSTRAINT "meal_plans_day_meal_type_uniq" UNIQUE("day","meal_type");