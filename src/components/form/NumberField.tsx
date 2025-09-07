import { useStore } from "@tanstack/react-form";
import { InputHTMLAttributes } from "react";
import { useFieldContext } from "~/contexts/form-context";

type NumberFieldProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const NumberField = ({ label }: NumberFieldProps) => {
    const field = useFieldContext<number>();
    const errors = useStore(field.store, (state) => state.meta.errors);

    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">{label}</legend>
            <input
                name={field.name}
                type="number"
                className="input"
                value={field.state.value}
                onChange={(e) => field.handleChange(Number(e.target.value))}
                onBlur={field.handleBlur}
            />
            {errors.map((error) => (
                <div key={error} style={{ color: "red" }}>
                    {error?.message}
                </div>
            ))}
        </fieldset>
    );
};
