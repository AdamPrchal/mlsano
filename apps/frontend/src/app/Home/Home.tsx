import { Flex, Stack, Title } from "@mantine/core";
import { RecipeList } from "~/components/RecipeList";

export const Home = () => {
	return (
		<>
			<Title order={1}>Mlsano</Title>
			<RecipeList />
		</>
	);
};
