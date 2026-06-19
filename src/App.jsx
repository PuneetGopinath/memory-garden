/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { createBrowserRouter, RouterProvider, Navigate, useNavigation, Outlet } from "react-router";

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

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                element: <PublicOnlyRoute />,
                children: [
                    {
                        path: "auth",
                        element: <AuthLayout />,
                        children: [
                            {
                                index: true,
                                element: <Navigate to="/auth/signin" replace />
                            },
                            {
                                path: "signin",
                                element: <SignIn />
                            },
                            {
                                path: "signup",
                                element: <SignUp />
                            },
                            {
                                path: "reset",
                                element: <Reset />
                            },
                            {
                                path: "new-password",
                                element: <NewPassword />
                            }
                        ]
                    }
                ]
            },
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "dashboard",
                        element: <DashboardLayout />,
                        children: [
                            {
                                index: true,
                                element: <Home />
                            },
                            {
                                path: "profile",
                                element: <Profile />
                            },
                            {
                                path: "upload",
                                element: <Upload />
                            },
                            {
                                path: "memory/:id",
                                element: <Memory />
                            },
                            {
                                path: "edit/:id",
                                element: <Edit />
                            }
                        ]
                    }
                ]
            },
            {
                element: <HomeLayout />,
                children: [
                    {
                        index: true,
                        element: <Landing />
                    },
                    {
                        path: "*",
                        element: <NotFound />
                    }
                ]
            }
        ]
    }
]);

export default function App() {
    console.log("MemoryGarden v0.1.0");
    
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};