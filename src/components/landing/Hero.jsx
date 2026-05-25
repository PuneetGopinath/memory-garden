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
            <div className="min-h-[calc(100vh-5rem)] grid lg:grid-cols-2 gap-16 px-8 py-16 lg:py-0 max-w-7xl mx-auto w-full items-center pt-20">
                <div className="flex flex-col space-y-8 max-w-2xl">
                    <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">Your memories deserve more than folders.</h1>
                    <p className="text-zinc-400 text-lg mb-6 max-w-xl">Memory Garden transforms your precious moments into a living timeline powered by AI.</p>
                </div>

                <div className="flex items-center justify-center relative">
                    <div className="absolute -top-12 left-1/4 h-72 w-72 animate-pulse rounded-full bg-purple-500/40 opacity-30 blur-3xl"></div>
                    <div className="absolute -bottom-12 right-1/4 h-80 w-80 rounded-full bg-cyan-500/30 opacity-30 blur-3xl"></div>
                
                    <div className="relative overflow-hidden rotate-1 hover:rotate-0 hover:scale-[1.02] transition-transform duration-300 h-96 w-[340px] p-6 rounded-3xl bg-zinc-900/70 border border-white/10 backdrop-blur-xl shadow-2xl">
                        <img src="/demo.png" alt="Demo" className="h-36 w-full bg-gradient-to-br from-purple-500 to-cyan-500 object-cover rounded-2xl" />
                        <div className="space-y-2">
                            <p className="text-sm text-zinc-400 mt-4">July 18, 2025</p>
                            <h5 className="text-xl font-semibold">Trip to Kerala</h5>
                            <p className="text-zinc-400 leading-relaxed">A peaceful evening beside the backwaters with family and friends.</p>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};