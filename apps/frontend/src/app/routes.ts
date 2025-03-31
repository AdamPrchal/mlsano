import { type RouteConfig, index, layout } from "@react-router/dev/routes";

export default [
	layout("routes/Layout.tsx", [index("routes/index.tsx")]),
] satisfies RouteConfig;
