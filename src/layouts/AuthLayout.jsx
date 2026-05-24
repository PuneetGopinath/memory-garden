/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <>
            <main>
                <Outlet />
            </main>
        </>
    );
};