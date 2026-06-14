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
import Memory from "./pages/dashboard/Memory";
import Upload from "./pages/dashboard/Upload";
import Edit from "./pages/dashboard/Edit";

import NotFound from "./pages/NotFound";

export default function App() {
    console.log("MemoryGarden v0.1.0");
    
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
                                <Route path="upload" element={<Upload />} />
                                <Route path="profile" element={<div>Profile Page</div>} />
                                <Route path="memory/:id" element={<Memory />} />
                                <Route path="edit/:id" element={<Edit />} />
                            </Route>
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};