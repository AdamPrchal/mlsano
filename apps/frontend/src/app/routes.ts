import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

export default flatRoutes({
	rootDirectory: "./routes",
}) satisfies RouteConfig;

// export default [
// 	layout("routes/Layout.tsx", [
// 		index("routes/index.tsx"),
// 		route("recipes", "routes/recipes.tsx"),
// 		route("shoppingList", "routes/shoppingList.tsx"),
// 		route("planning", "routes/planning.tsx"),
// 	]),
// ] satisfies RouteConfig;
