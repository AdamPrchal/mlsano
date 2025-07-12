import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const recipes = sqliteTable("recipes", {
    id: int().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    created_at: text()
        .notNull()
        .default(sql`(current_timestamp)`),
    cook_time: int(),
    image_url: text(),
    original_recipe_url: text(),
});

export const ingredients = sqliteTable("ingredients", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
});

export const recipeIngredients = sqliteTable("recipe_ingredients", {
    id: int().primaryKey({ autoIncrement: true }),
    recipeId: int().references(() => recipes.id, {
        onDelete: "cascade",
    }),
    ingredientId: int().references(() => recipes.id, {
        onDelete: "set null",
    }),
    quantity: int().notNull(),
    unit: text().notNull(),
});

export const tags = sqliteTable("tags", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
});

export const recipeTags = sqliteTable("recipe_tags", {
    id: int().primaryKey({ autoIncrement: true }),
    recipeId: int().references(() => recipes.id, {
        onDelete: "cascade",
    }),
    tagId: int().references(() => tags.id),
});
