import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "~/components/PageHeader";
import { useAppForm } from "~/hooks/useAppForm";

import { getFormDataFromServer, handleForm } from "~/features/recipes/addForm";
import { mergeForm, useTransform } from "@tanstack/react-form";
import { formOpts } from "~/features/recipes/addFormOptions";

export const Route = createFileRoute("/recipes/add")({
    component: AddRecipe,
    loader: async () => ({
        state: await getFormDataFromServer(),
    }),
});

function AddRecipe() {
    const { state } = Route.useLoaderData();

    const form = useAppForm({
        ...formOpts,
        transform: useTransform(
            (baseForm) => mergeForm(baseForm, state),
            [state],
        ),
    });

    return (
        <>
            <PageHeader title="Přidat recept" />
            <form
                action={handleForm.url}
                method="post"
                encType={"multipart/form-data"}
            >
                <form.AppField
                    name="title"
                    children={(field) => <field.TextField label="Název" />}
                />
                <form.AppField
                    name="cookTime"
                    children={(field) => (
                        <field.NumberField label="Doba vaření" />
                    )}
                />
                <form.AppField
                    name="imageUrl"
                    children={(field) => (
                        <field.TextField label="URL obrázku" />
                    )}
                />
                <form.AppField
                    name="originalRecipeUrl"
                    children={(field) => (
                        <field.TextField label="Původní recept" />
                    )}
                />
                <form.AppForm>
                    <form.SubmitButton label="Submit" />
                </form.AppForm>
            </form>
        </>
    );
}
