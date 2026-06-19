/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { BrowserRouter, Routes, Route, Navigate, useNavigation, Outlet } from "react-router";

import AuthProvider from "./context/AuthContext";

import HomeLayout from "./layouts/HomeLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import ProtectedRoute from "./layouts/ProtectedRoute";
import PublicOnlyRoute from "./layouts/PublicOnlyRoute";

import Landing from "./pages/Landing";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import Reset from "./pages/auth/Reset";
import NewPassword from "./pages/auth/NewPassword";
import Home from "./pages/dashboard/Home";
import Profile from "./pages/dashboard/Profile";
import Memory from "./pages/dashboard/Memory";
import Upload from "./pages/dashboard/Upload";
import Edit from "./pages/dashboard/Edit";

import NotFound from "./pages/NotFound";

function RootLayout() {
    const navigation = useNavigation();
    const isLoading = navigation.state === "loading";

    return (
        <>
            <div className={`fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none ${isLoading ? "opacity-100" : "opacity-0"} transition-opacity duration-300 delay-300`}>
                <div
                    className={`h-full bg-blue-500 transition-width duration-400 ease-[cubic-bezier(0.08, 0.82, 0.17, 1)]`}
                    style={{ width: isLoading ? "75%" : "100%" }}
                >

                </div>
            </div>

            <Outlet />
        </>
    );
}

export default function App() {
    console.log("MemoryGarden v0.1.0");
    
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route element={<PublicOnlyRoute />}>
                            <Route path="auth" element={<AuthLayout />}>
                                <Route index element={<Navigate to="/auth/signin" replace />} />
                                <Route path="signin" element={<SignIn />} />
                                <Route path="signup" element={<SignUp />} />
                                <Route path="reset" element={<Reset />} />
                                <Route path="new-password" element={<NewPassword />} />
                            </Route>
                        </Route>
                        
                        <Route element={<ProtectedRoute />}>
                            <Route path="dashboard" element={<DashboardLayout />}>
                                <Route index element={<Home />} />
                                <Route path="profile" element={<Profile />} />
                                <Route path="upload" element={<Upload />} />
                                <Route path="memory/:id" element={<Memory />} />
                                <Route path="edit/:id" element={<Edit />} />
                            </Route>
                        </Route>

                        <Route element={<HomeLayout />}>
                            <Route index element={<Landing />} />
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};