/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import Navbar from "./Navbar";

export default function Hero() {
    return (
        <header className="hero bg-zinc-950 text-white">
            <Navbar />
            <div className="min-h-screen grid lg:grid-cols-2 gap-16 px-8 py-16 lg:py-0 max-w-7xl mx-auto w-full items-center">
            </div>
        </header>
    );
};