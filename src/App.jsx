/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { BrowserRouter, Routes, Route } from "react-router";

import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute from "./layouts/ProtectedRoute";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/">
                    <Route index element={<div>Landing Page</div>} />

                    <Route path="auth" element={<AuthLayout />}>
                        <Route index element={<div>Auth Home</div>} />
                        <Route path="signin" element={<div>Sign In</div>} />
                        <Route path="signup" element={<div>Sign Up</div>} />
                    </Route>
                    
                    <Route element={<ProtectedRoute />}>
                        <Route path="dashboard" element={<DashboardLayout />}>
                            <Route index element={<div>Dashboard Home</div>} />
                            <Route path="upload" element={<div>Upload Page</div>} />
                            <Route path="profile" element={<div>Profile Page</div>} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
};