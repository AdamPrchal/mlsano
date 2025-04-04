import type { FC } from "react";
import { AppShell, Burger, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Badge, NavLink } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
type AppLayoutProps = {
	children: React.ReactNode;
};

export const AppLayout: FC<AppLayoutProps> = ({ children }) => {
	const [opened, { toggle }] = useDisclosure();
	const { t } = useTranslation();
	const location = useLocation();

	const navLinks: { href: string; labelKey: string }[] = [
		{ href: "/", labelKey: "home" },
		{ href: "/recipes", labelKey: "recipes" },
		{ href: "/planning", labelKey: "planning" },
		{ href: "/shopping-list", labelKey: "shoppingList" },
	];

	return (
		<AppShell
			header={{ height: 60 }}
			navbar={{
				width: 300,
				breakpoint: "sm",
				collapsed: { mobile: !opened },
			}}
			padding="md"
		>
			<AppShell.Header>
				<Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
			</AppShell.Header>

			<AppShell.Navbar p="md">
				{navLinks.map((link) => (
					<NavLink
						key={link.href}
						href={link.href}
						label={t(link.labelKey)} // Cast needed if t() isn't strictly typed to your keys yet
						// 3. Set active based on pathname comparison
						active={location.pathname === link.href}
					/>
				))}
			</AppShell.Navbar>

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
};
