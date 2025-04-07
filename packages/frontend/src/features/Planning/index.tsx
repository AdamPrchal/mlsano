import { Flex, Stack, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { RecipeList } from "~/components/RecipeList";

export const Planning = () => {
	const { t } = useTranslation();
	return (
		<>
			<Title order={1}>{t("planning")}</Title>
			<RecipeList />
		</>
	);
};
