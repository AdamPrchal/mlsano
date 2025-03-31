import React, { type FC } from "react";
import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";

type RecipeCardProps = {
	recipe: {
		title: string;
		source: string;
	};
};

export const RecipeCard: FC<RecipeCardProps> = ({ recipe }) => {
	return (
		<Card shadow="sm" padding="lg" radius="md" withBorder>
			<Card.Section component="a" href="https://mantine.dev/">
				<Image
					src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
					height={160}
					alt="Norway"
				/>
			</Card.Section>

			<Group justify="space-between" mt="md" mb="xs">
				<Text fw={500}>{recipe.title}</Text>
				<Badge color="pink">On Sale</Badge>
			</Group>

			<Text size="sm" c="dimmed">
				With Fjord Tours you can explore more of the magical fjord landscapes
				with tours and activities on and around the fjords of Norway
			</Text>

			<Button
				component="a"
				href={recipe.source}
				color="blue"
				fullWidth
				mt="md"
				radius="md"
			>
				View source
			</Button>
		</Card>
	);
};
