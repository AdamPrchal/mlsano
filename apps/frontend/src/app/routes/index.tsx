import { Home } from "../Home/Home";
import type { Route } from "./+types/index";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "New React Router App" },
		{ name: "description", content: "Welcome to React Router!" },
	];
}

export default function Index() {
	return <Home />;
}
