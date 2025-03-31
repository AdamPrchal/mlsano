import type { FC } from "react";
import { AppShell, Burger, Title } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type LayoutProps = {
	children: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
	const [opened, { toggle }] = useDisclosure();

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

			<AppShell.Navbar p="md">Navbar</AppShell.Navbar>

			<AppShell.Main>{children}</AppShell.Main>
		</AppShell>
	);
};
