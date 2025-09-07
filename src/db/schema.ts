import { relations } from "drizzle-orm";
import { pgTable, integer, text, timestamp } from "drizzle-orm/pg-core";
import { createSchemaFactory, createSelectSchema } from "drizzle-zod";

const { createInsertSchema } = createSchemaFactory({
    coerce: {
        date: true,
        number: true,
    },
});

export const recipes = pgTable("recipes", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: text().notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    cookTime: integer("cook_time"),
    imageUrl: text("image_url"),
    originalRecipeUrl: text("original_recipe_url"),
});

export const recipesRelations = relations(recipes, ({ many }) => ({
    recipeIngredients: many(recipeIngredients),
    recipeTags: many(recipeTags),
}));

export const recipesSelectSchema = createSelectSchema(recipes);
export const recipesInsertSchema = createInsertSchema(recipes, {
    title: (schema) => schema.trim().min(1),
    imageUrl: (schema) => schema.trim().transform((val) => (val ? val : null)),
    originalRecipeUrl: (schema) =>
        schema.transform((val) => (val ? val : null)),
    cookTime: (schema) => schema.transform((val) => (val ? val : null)),
});

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
