import { openAPISpecs } from "hono-openapi";
import { Count, Recipe, Top } from "@/App";
import { apiReference } from "@scalar/hono-api-reference";
import { OpenAPIHono, z } from "@hono/zod-openapi";
import { createRoute } from "@hono/zod-openapi";
import { ParamsSchema, UserSchema } from "./schemas";
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import { cors } from "hono/cors";

const prisma = new PrismaClient();
export const app = new OpenAPIHono();

// Specifying origins with using `origin` option
// string
app.use("*", cors());

app.get("/", (c) => {
	const messages = ["Good Morning", "Good Evening", "Good Night"];
	return c.html(<Top messages={messages} />);
});

app.get("/recipes", async (c) => {
	const result = await prisma.recipe.findMany();
	return c.json(result);
});

app.get("/new-recipe", async (c) => {
	const result = await prisma.recipe.create({
		data: {
			title: faker.food.dish(),
			source: faker.internet.url(),
			createdAt: faker.date.anytime(),
			updatedAt: faker.date.anytime(),
		},
	});
	return c.html(<Recipe {...result} />);
});

app.openapi(
	createRoute({
		method: "get",
		path: "/users/{id}",
		request: {
			params: ParamsSchema,
		},
		responses: {
			200: {
				content: {
					"application/json": {
						schema: UserSchema,
					},
				},
				description: "Retrieve the user",
			},
		},
	}),
	(c) => {
		const { id } = c.req.valid("param");
		return c.json({
			id,
			age: 20,
			name: "Ultra-man",
		});
	},
);

app.doc("/doc", {
	openapi: "3.0.0",
	info: {
		version: "1.0.0",
		title: "My API",
	},
});

app.get(
	"/docs",
	apiReference({
		url: "/doc",
	}),
);
