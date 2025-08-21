import { sql } from "drizzle-orm";
import { relations } from "drizzle-orm";
import { pgTable, integer, text } from "drizzle-orm/pg-core";

export const recipes = pgTable("recipes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: text().notNull(),
    created_at: text()
        .notNull()
        .default(sql`(current_timestamp)`),
    cook_time: integer(),
    image_url: text(),
    original_recipe_url: text(),
});

export const recipesRelations = relations(recipes, ({ many }) => ({
    recipeIngredients: many(recipeIngredients),
    recipeTags: many(recipeTags),
}));

export const ingredients = pgTable("ingredients", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
});

export const ingredientsRelations = relations(ingredients, ({ many }) => ({
    recipeIngredients: many(recipeIngredients),
}));

export const recipeIngredients = pgTable("recipe_ingredients", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    recipeId: integer().references(() => recipes.id, {
        onDelete: "cascade",
    }),
    ingredientId: integer().references(() => ingredients.id, {
        onDelete: "set null",
    }),
    quantity: integer().notNull(),
    unit: text().notNull(),
});

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

export const tags = pgTable("tags", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: text().notNull(),
});

export const tagsRelations = relations(tags, ({ many }) => ({
    recipeTags: many(recipeTags),
}));

export const recipeTags = pgTable("recipe_tags", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    recipeId: integer().references(() => recipes.id, {
        onDelete: "cascade",
    }),
    tagId: integer().references(() => tags.id),
});

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
