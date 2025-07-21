import { Link } from "@tanstack/react-router";
import { Calendar, CookingPot } from "lucide-react";

export const Navigation = () => {
    return (
        <div className="dock bg-neutral text-neutral-content mx-auto max-w-4xl">
            <Link activeProps={{ className: "dock-active" }} to={"/"}>
                <CookingPot />
                <span className="dock-label">Recepty</span>
            </Link>

            <Link activeProps={{ className: "dock-active" }} to={"/about"}>
                <Calendar />
                <span className="dock-label">Plánovač</span>
            </Link>
        </div>
    );
};
