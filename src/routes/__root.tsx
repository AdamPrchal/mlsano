/// <reference types="vite/client" />
import type { ReactNode } from "react";
import {
    Outlet,
    createRootRoute,
    HeadContent,
    Scripts,
} from "@tanstack/react-router";

import appCss from "../styles/app.css?url";
import { Navigation } from "~/components/Navigation";

export const Route = createRootRoute({
    head: () => ({
        meta: [
            {
                charSet: "utf-8",
            },
            {
                name: "viewport",
                content: "width=device-width, initial-scale=1",
            },
            {
                title: "Mlsano",
            },
        ],
        links: [{ rel: "stylesheet", href: appCss }],
    }),
    component: RootComponent,
});

function RootComponent() {
    return (
        <RootDocument>
            <Outlet />
        </RootDocument>
    );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html data-theme="forest">
            <head>
                <HeadContent />
            </head>
            <body>
                {children}
                <Navigation />
                <Scripts />
            </body>
        </html>
    );
}
