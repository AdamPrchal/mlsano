import { Flex, Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { RecipeList } from "~/components/RecipeList";

export const ShoppingList = () => {
	const { t } = useTranslation();
	return (
		<>
			<Title order={1}>{t("shoppingList")}</Title>
			<RecipeList />
		</>
	);
};
