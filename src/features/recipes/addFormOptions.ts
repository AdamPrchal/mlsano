import { formOptions, revalidateLogic } from "@tanstack/react-form";
import { recipesInsertSchema } from "~/db/schema";
import * as z from "zod";

export const formOpts = formOptions({
    defaultValues: {
        title: "Smažák s hranolkama",
        cookTime: 0,
        imageUrl:
            "https://static.toprecepty.cz/fotky/clanky_hlavni/37512-smazeny-syr-smazak-2-860-484-wide.jpg",
        originalRecipeUrl:
            "https://www.rohlik.cz/chef/24397-smazeny-syr-s-bramborami",
    } as z.input<typeof recipesInsertSchema>,
    validationLogic: revalidateLogic(),
    validators: {
        onChange: recipesInsertSchema,
    },
});
