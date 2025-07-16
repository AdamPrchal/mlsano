PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_recipe_ingredients` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`recipeId` integer,
	`ingredientId` integer,
	`quantity` integer NOT NULL,
	`unit` text NOT NULL,
	FOREIGN KEY (`recipeId`) REFERENCES `recipes`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`ingredientId`) REFERENCES `ingredients`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
INSERT INTO `__new_recipe_ingredients`("id", "recipeId", "ingredientId", "quantity", "unit") SELECT "id", "recipeId", "ingredientId", "quantity", "unit" FROM `recipe_ingredients`;--> statement-breakpoint
DROP TABLE `recipe_ingredients`;--> statement-breakpoint
ALTER TABLE `__new_recipe_ingredients` RENAME TO `recipe_ingredients`;--> statement-breakpoint
PRAGMA foreign_keys=ON;