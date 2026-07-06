/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { createBrowserRouter, RouterProvider, Navigate } from "react-router";

import { VERSION } from "./constants";

import AuthProvider from "./context/AuthContext";

import HomeLayout from "./layouts/HomeLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import ProtectedRoute from "./layouts/ProtectedRoute";
import PublicOnlyRoute from "./layouts/PublicOnlyRoute";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
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

const router = createBrowserRouter([
    {
        path: "/",
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
                                element: <Navigate to="/auth/signin" replace />,
                            },
                            {
                                path: "signin",
                                element: <SignIn />,
                            },
                            {
                                path: "signup",
                                element: <SignUp />,
                            },
                            {
                                path: "reset",
                                element: <Reset />,
                            },
                            {
                                path: "new-password",
                                element: <NewPassword />,
                            },
                        ],
                    },
                ],
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
                                element: <Home />,
                            },
                            {
                                path: "profile",
                                element: <Profile />,
                            },
                            {
                                path: "upload",
                                element: <Upload />,
                            },
                            {
                                path: "memory/:id",
                                element: <Memory />,
                            },
                            {
                                path: "edit/:id",
                                element: <Edit />,
                            },
                        ],
                    },
                ],
            },
            {
                element: <HomeLayout />,
                children: [
                    {
                        index: true,
                        element: <Landing />,
                    },
                    {
                        path: "about",
                        element: <About />,
                    },
                    {
                        path: "privacy",
                        element: <Privacy />,
                    },
                    {
                        path: "terms",
                        element: <Terms />,
                    },
                    {
                        path: "*",
                        element: <NotFound />,
                    },
                ],
            },
        ],
    },
]);

export default function App() {
    console.info(`MemoryGarden v${VERSION} - Copyright (c) 2026 Puneet Gopinath - License: MIT (see LICENSE)`);
    
    return (
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    );
};
