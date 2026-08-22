import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { PageHeader } from "~/components/PageHeader";
import { useAppForm } from "~/hooks/useAppForm";

import { handleForm } from "~/features/recipes/addForm";
import { formOpts } from "~/features/recipes/addFormOptions";

export const Route = createFileRoute("/recipes/add")({
    component: AddRecipe,
});

function AddRecipe() {
    const addRecipe = useServerFn(handleForm);

    const form = useAppForm({
        ...formOpts,
        onSubmit: async ({ value }) => {
            await addRecipe({ data: value });
        },
    });

    return (
        <>
            <PageHeader title="Přidat recept" />
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    void form.handleSubmit();
                }}
            >
                <form.AppField name="title">
                    {(field) => <field.TextField label="Název" />}
                </form.AppField>
                <form.AppField name="cookTime">
                    {(field) => <field.NumberField label="Doba vaření" />}
                </form.AppField>
                <form.AppField name="imageUrl">
                    {(field) => <field.TextField label="URL obrázku" />}
                </form.AppField>
                <form.AppField name="originalRecipeUrl">
                    {(field) => <field.TextField label="Původní recept" />}
                </form.AppField>
                <form.AppForm>
                    <form.SubmitButton label="Submit" />
                </form.AppForm>
            </form>
        </>
    );
}
