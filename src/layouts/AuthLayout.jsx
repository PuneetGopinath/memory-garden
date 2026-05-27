/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-zinc-950 text-white">
            <main className="flex-1 relative overflow-hidden flex items-center justify-center px-4 py-16">
                <div className="absolute -top-12 left-1/4 h-72 w-72 animate-pulse rounded-full bg-purple-500/20 opacity-30 blur-3xl"></div>
                <div className="absolute -bottom-12 right-1/4 h-80 w-80 rounded-full bg-cyan-500/30 opacity-30 blur-3xl"></div>
                <div className="relative z-10 w-full max-w-md">
                    <Outlet />
                </div>
            </main>

            <footer className="flex flex-col items-center text-center py-4">
                <span className="text-sm text-zinc-500">&copy; 2026 Puneet Gopinath. All rights reserved.</span>
            </footer>
        </div>
    );
};