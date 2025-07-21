import { Link } from "@tanstack/react-router";
import { Calendar, CookingPot, Home } from "lucide-react";

const navigationItems = [
    {
        to: "/",
        icon: Home,
        label: "Přehled",
    },
    {
        to: "/recipes",
        icon: CookingPot,
        label: "Recepty",
    },
    {
        to: "/about",
        icon: Calendar,
        label: "Plánovač",
    },
];

export const Navigation = () => {
    return (
        <div className="dock bg-neutral text-neutral-content mx-auto max-w-xl rounded-t-4xl">
            {navigationItems.map(({ to, icon: Icon, label }) => (
                <Link
                    key={to}
                    to={to}
                    activeProps={{ className: "dock-active" }}
                    className="dock-item"
                >
                    <Icon />
                    <span className="dock-label">{label}</span>
                </Link>
            ))}
        </div>
    );
};
