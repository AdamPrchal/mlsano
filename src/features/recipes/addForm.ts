import { createServerFn } from "@tanstack/react-start";
import {
    ServerValidateError,
    createServerValidate,
    getFormData,
} from "@tanstack/react-form/start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { formOpts } from "./addFormOptions";
import { redirect } from "@tanstack/react-router";
import { recipes, recipesInsertSchema } from "~/db/schema";
import { db } from "~/db";

const serverValidate = createServerValidate({
    ...formOpts,
    onServerValidate: ({ value }) => {
        const result = recipesInsertSchema.safeParse(value);
        if (!result.success) {
            // handle error then return
            result.error;
        }
    },
});

export const handleForm = createServerFn({
    method: "POST",
    response: "raw",
})
    .validator((data) => {
        if (!(data instanceof FormData)) {
            throw new Error("Invalid form data");
        }
        return data;
    })
    .handler(async (ctx) => {
        try {
            const validatedData = await serverValidate(ctx.data);
            const parsedData = recipesInsertSchema.parse(validatedData);
            
            await db.insert(recipes).values(parsedData);
        } catch (e) {
            if (e instanceof ServerValidateError) {
                return e.response;
            }

            setResponseStatus(500);
            console.error(e);
            return "There was an internal error";
        }

        throw redirect({
            to: "/recipes",
        });
    });

export const getFormDataFromServer = createServerFn({ method: "GET" }).handler(
    async () => {
        return getFormData();
    },
);
