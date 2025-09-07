import { useStore } from "@tanstack/react-form";
import { useFormContext } from "~/contexts/form-context";

type SubmitButtonProps = {
    label: string;
};

export const SubmitButton = ({ label }: SubmitButtonProps) => {
    const form = useFormContext();
    const isSubmitting = useStore(
        form.store,
        (formState) => formState.isSubmitting,
    );
    const canSubmit = useStore(form.store, (formState) => formState.canSubmit);
    return (
        <form.Subscribe>
            <button
                disabled={isSubmitting || !canSubmit}
                className="btn"
                type="submit"
            >
                {label}
            </button>
        </form.Subscribe>
    );
};
