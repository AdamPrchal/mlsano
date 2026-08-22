import { createFormHook } from "@tanstack/react-form";
import { NumberField } from "~/components/form/NumberField";
import { SubmitButton } from "~/components/form/SubmitButton";
import { TextField } from "~/components/form/TextField";
import { fieldContext, formContext } from "~/contexts/form-context";

export const { useAppForm } = createFormHook({
    fieldComponents: {
        TextField,
        NumberField,
    },
    formComponents: {
        SubmitButton,
    },
    fieldContext,
    formContext,
});
