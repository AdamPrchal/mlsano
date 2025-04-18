import { ShoppingList } from "~/features/ShoppingList";
import type { Route } from "./+types/shopping-list";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function ShoppingListRoute() {
	return <ShoppingList />;
}
