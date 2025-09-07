import { useStore } from "@tanstack/react-form";
import { InputHTMLAttributes } from "react";
import { useFieldContext } from "~/contexts/form-context";

type TextFieldProps = {
    label: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({ label, ...rest }: TextFieldProps) => {
    const field = useFieldContext<string>();

    const errors = useStore(field.store, (state) => state.meta.errors);

    return (
        <fieldset className="fieldset">
            <legend className="fieldset-legend">{label}</legend>
            <input
                name={field.name}
                type="text"
                className="input"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                {...rest}
            />
            {errors.map((error) => (
                <div key={error} style={{ color: "red" }}>
                    {error?.message}
                </div>
            ))}
        </fieldset>
    );
};
