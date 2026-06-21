/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Outlet, Link } from "react-router";

import Footer from "../components/Footer";

import supabase from "../utils/supabase";

export default function DashboardLayout() {
    const handleSignOut = async () => {
        await supabase.auth.signOut();
    };
    
    return (
        <>
            <header className="bg-zinc-950">
                <nav className="fixed top-0 left-0 right-0 bg-zinc-950/80 backdrop-blur border-b border-white/10 text-white p-4 flex justify-end gap-4 z-10">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <Link to="/">
                            <h2 className="text-lg font-bold text-white">Memory <span className="text-purple-500">Garden</span></h2>
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        <a href="/dashboard" className="font-medium text-zinc-400 hover:text-white transition-colors">Dashboard</a>
                        <a href="/dashboard/upload" className="font-medium text-zinc-400 hover:text-white transition-colors">Upload</a>
                        <a href="/dashboard/profile" className="font-medium text-zinc-400 hover:text-white transition-colors">Profile</a>
                        <button onClick={handleSignOut} className="font-medium text-zinc-400 hover:text-white transition-colors">
                            Sign Out
                        </button>
                    </div>
                </nav>
            </header>

            <div className="min-h-screen bg-zinc-950 text-white">
                <main className="pt-20 pb-4">
                    <Outlet />
                </main>

                <Footer />
            </div>
        </>
    );
};