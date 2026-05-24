/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { BrowserRouter, Routes, Route } from "react-router";

import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route path="dashboard" element={<DashboardLayout />}>
                        <Route index element={<div>Dashboard Home</div>} />
                    </Route>
                    <Route path="auth" element={<AuthLayout />}>
                        <Route index element={<div>Auth Home</div>} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};