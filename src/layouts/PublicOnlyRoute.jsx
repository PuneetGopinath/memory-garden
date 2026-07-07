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

    if (state === "loading")
        return (
            <div className="bg-zinc-950 min-h-screen text-white flex items-center justify-center">
                <div className="flex flex-col text-center items-center gap-6 px-8" role="status" aria-live="polite" aria-label="Checking authentication status">
                    <div className="w-25 h-25 border-4 border-purple-500 border-dashed rounded-full animate-[spin_4s_linear_infinite]"></div>
                    <h1 className="text-2xl font-bold">Checking your session...</h1>
                    <p className="text-sm text-zinc-400">
                        Please wait while we verify your authentication status.
                        <br />
                        This may take a few seconds.
                    </p>
                </div>
            </div>
        );

    if (state === "authenticated")
        return <Navigate to="/dashboard?notify=signedin" replace />;

    return <Outlet />;
};
