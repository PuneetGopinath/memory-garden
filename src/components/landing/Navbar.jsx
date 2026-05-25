/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Link } from "react-router";

export default function Navbar() {
    return (
        <nav className="fixed z-50 text-white top-0 left-0 w-full backdrop-blur-xl bg-zinc-950/70 border-b border-white/10 h-20">
            <div className="max-w-7xl mx-auto w-full flex items-center justify-between h-full px-6">
                <h1 className="font-semibold tracking-tight text-xl">Memory <span className="text-purple-500">Garden</span></h1>

                <Link to="/auth/signin" className="rounded-xl px-4 py-2 bg-white text-black hover:scale-105 transition-all duration-300">Get Started</Link>
            </div>
        </nav>
    );
};