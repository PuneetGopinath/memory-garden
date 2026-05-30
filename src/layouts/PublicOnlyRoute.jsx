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

    if (state === "loading") return null;

    if (state === "authenticated")
        return <Navigate to="/dashboard" replace />;

    return <Outlet />;
};