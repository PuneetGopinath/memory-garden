/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useContext } from "react";
import { Outlet, useNavigate } from "react-router";

import AuthContext from "../context/AuthContext";

export default function ProtectedRoute() {
    const navigate = useNavigate();
    const { state } = useContext(AuthContext);

    if (state === "loading") return null;

    if (state === "unauthenticated")
        navigate("/auth/signin", { replace: true });

    return (
        <>
            <Outlet />
        </>
    );
};