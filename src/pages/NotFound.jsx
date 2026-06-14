/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Link } from "react-router";

import Navbar from "../components/landing/Navbar";

export default function NotFound() {
    return (
        <div className="bg-zinc-950 text-white">
            <header>
                <Navbar />
            </header>

            <main className="flex flex-col min-h-screen items-center justify-center gap-4">
                <h1 className="cyan-neon-glow text-6xl font-bold text-cyan-400">404</h1>
                <h2 className="text-2xl font-semibold">Page Not Found</h2>
                <p className="max-w-xl text-center text-zinc-500 text-lg">
                    The page you are looking for doesn't exist or may have been moved. <br />
                    You can return to the homepage and continue exploring your memory garden.
                </p>
                <Link to="/" className="font-medium bg-cyan-500 text-black px-6 py-3 rounded-xl hover:scale-105 hover:bg-cyan-400 transition-all">Go to Homepage</Link>
            </main>
        </div>
    );
};