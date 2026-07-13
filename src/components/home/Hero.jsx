/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Link } from "react-router";

import { memories } from "../../constants";

import { Event } from "../MemoryCard";

export default function Hero() {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 gap-16 px-8 py-16 lg:py-0 max-w-7xl mx-auto w-full items-center pt-20">
            <div className="flex flex-col space-y-8 max-w-2xl">
                <h1 className="text-5xl lg:text-7xl font-bold mb-4 leading-tight tracking-tight">Your memories deserve more than folders.</h1>
                <p className="text-zinc-400 text-lg mb-6 max-w-xl">Memory Garden transforms your precious moments into a living timeline powered by AI.</p>
            
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/auth/signup" className="font-medium bg-white text-black px-6 py-3 rounded-xl hover:scale-105 transition-all">Start your Garden</Link>
                    <a href="#timeline" className="font-medium border border-zinc-700 px-6 py-3 rounded-xl hover:bg-white/5 transition-all duration-300">View Demo</a>
                </div>
            </div>

            <div className="flex items-center justify-center relative">
                <div className="pointer-events-none absolute -top-12 left-1/4 h-72 w-72 animate-pulse rounded-full bg-purple-500/40 opacity-30 blur-3xl"></div>
                <div className="pointer-events-none absolute -bottom-12 right-1/4 h-80 w-80 rounded-full bg-cyan-500/30 opacity-30 blur-3xl"></div>
            
                <Event
                    {...memories[3]}
                    clockwise={true}
                />
            </div>
        </div>
    );
};
