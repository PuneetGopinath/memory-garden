/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Outlet, Link } from "react-router";

import { Toaster } from "sonner";

import Footer from "../components/Footer";

export default function AuthLayout() {
    return (
        <>
            <Toaster position="top-right" richColors theme="dark" offset={{ top: "5rem", right: "1rem" }} />

            <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
                <Link to="/">
                    <h1 className="font-bold text-3xl text-center mb-4">Memory <span className="text-purple-500">Garden</span></h1>
                </Link>
                <main className="flex-1 relative overflow-hidden flex items-center justify-center px-4 py-16">
                    <div className="absolute -top-12 left-1/4 h-72 w-72 animate-pulse rounded-full bg-purple-500/20 opacity-30 blur-3xl"></div>
                    <div className="absolute -bottom-12 right-1/4 h-80 w-80 rounded-full bg-cyan-500/30 opacity-30 blur-3xl"></div>
                    <div className="relative z-10 w-full max-w-md">
                        <Outlet />
                    </div>
                </main>

                <Footer />
            </div>
        </>
    );
};