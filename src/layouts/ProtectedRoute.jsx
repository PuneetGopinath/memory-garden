/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import AuthContext from "../context/AuthContext";

export default function ProtectedRoute() {
    const navigate = useNavigate();
    const { state } = useContext(AuthContext);

    useEffect(() => {
        if (state === "unauthenticated") {
            navigate("/auth/signin", { replace: true });
        }
    }, [state]);
    return (
        <>
            <Outlet />
        </>
    );
};