import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";

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
    ingredientId: int().references(() => ingredients.id, {
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

// Relations
export const recipesRelations = relations(recipes, ({ many }) => ({
    recipeIngredients: many(recipeIngredients),
    recipeTags: many(recipeTags),
}));

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
    recipeIngredients: many(recipeIngredients),
}));

export const recipeIngredientsRelations = relations(
    recipeIngredients,
    ({ one }) => ({
        recipe: one(recipes, {
            fields: [recipeIngredients.recipeId],
            references: [recipes.id],
        }),
        ingredient: one(ingredients, {
            fields: [recipeIngredients.ingredientId],
            references: [ingredients.id],
        }),
    }),
);

export const tagsRelations = relations(tags, ({ many }) => ({
    recipeTags: many(recipeTags),
}));

export const recipeTagsRelations = relations(recipeTags, ({ one }) => ({
    recipe: one(recipes, {
        fields: [recipeTags.recipeId],
        references: [recipes.id],
    }),
    tag: one(tags, {
        fields: [recipeTags.tagId],
        references: [tags.id],
    }),
}));
