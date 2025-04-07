import { Recipes } from "~/features/Recipes";
import type { Route } from "./+types/recipes";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function RecipeAddRoute() {
	return <Recipes />;
}
