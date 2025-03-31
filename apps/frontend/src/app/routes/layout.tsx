import { Outlet } from "react-router";
import { Home } from "../Home/Home";
import type { Route } from "./+types/index";
import { Layout } from "~/components/Layout";

export default function MainLayout() {
	return (
		<Layout>
			<Outlet />
		</Layout>
	);
}
