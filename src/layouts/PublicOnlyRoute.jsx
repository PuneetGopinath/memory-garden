/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useContext } from "react";
import { Outlet, Navigate } from "react-router";

import { AuthContext } from "../context/AuthContext";

export default function PublicOnlyRoute() {
    const { state } = useContext(AuthContext);

    if (state === "loading") {
        return (
            <div className="bg-zinc-950 min-h-screen text-white flex flex-col justify-center">
                <div className="flex justify-center" role="status" aria-live="polite">
                    <div className="w-25 h-25 border-4 border-purple-500 border-dashed rounded-full animate-[spin_3.5s_linear_infinite]"></div>
                </div>
                <div className="flex flex-col text-center gap-4 p-8">
                    <h1 className="text-3xl font-bold">Loading...</h1>
                    <p className="text-sm text-zinc-400">
                        Please wait while we check your authentication status.
                    </p>
                </div>
            </div>
        );
    }

    if (state === "authenticated")
        return <Navigate to="/dashboard?notify=signedin" replace />;

    return <Outlet />;
};