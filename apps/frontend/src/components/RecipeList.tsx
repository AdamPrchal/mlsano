import { Flex, Skeleton } from "@mantine/core";
import React from "react";
import { useRecipes } from "~/hooks/useRecipes";
import { RecipeCard } from "~/components/RecipeCard";

export const RecipeList = () => {
	const { data, isLoading, isError } = useRecipes();

	console.log(data, isLoading);
	if (isLoading) {
		return <Skeleton height={50} width="full" />;
	}

	return (
		<Flex wrap="wrap" align="stretch" justify="center" gap="md">
			{data.map((recipe: any) => (
				<RecipeCard key={recipe.id} recipe={recipe} />
			))}
		</Flex>
	);
};
