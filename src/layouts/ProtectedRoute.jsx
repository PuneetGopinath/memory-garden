/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useContext } from "react";
import { Outlet, Navigate, useLocation } from "react-router";

import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { state } = useContext(AuthContext);
    const location = useLocation();

    if (state === "loading")
        return <div className="text-center">Loading...</div>;

    if (state === "unauthenticated")
        return <Navigate to="/auth/signin" state={{ from: location.pathname }} replace />;

    return <Outlet />;
};