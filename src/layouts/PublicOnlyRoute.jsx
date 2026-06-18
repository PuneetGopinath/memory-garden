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
        return <div className="bg-zinc-900/60 text-white text-center">Loading...</div>;

    if (state === "authenticated")
        return <Navigate to="/dashboard?notify=signedin" replace />;

    return <Outlet />;
};