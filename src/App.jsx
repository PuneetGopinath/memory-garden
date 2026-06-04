/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import AuthProvider from "./context/AuthContext";

import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

import ProtectedRoute from "./layouts/ProtectedRoute";
import PublicOnlyRoute from "./layouts/PublicOnlyRoute";

import Landing from "./pages/Landing";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Home from "./pages/dashboard/Home";

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<Landing />} />

                        <Route element={<PublicOnlyRoute />}>
                            <Route path="auth" element={<AuthLayout />}>
                                <Route index element={<Navigate to="/auth/signin" replace />} />
                                <Route path="signin" element={<SignIn />} />
                                <Route path="signup" element={<SignUp />} />
                            </Route>
                        </Route>
                        
                        <Route element={<ProtectedRoute />}>
                            <Route path="dashboard" element={<DashboardLayout />}>
                                <Route index element={<Home />} />
                                <Route path="upload" element={<div>Upload Page</div>} />
                                <Route path="profile" element={<div>Profile Page</div>} />
                            </Route>
                        </Route>

                        <Route path="*" element={<span className="text-white text-center bg-red-500/20">Error 404: Page Not Found</span>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};