/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Link } from "react-router";

import Navbar from "../components/landing/Navbar";

export default function NotFound() {
    return (
        <>
            <header className="bg-zinc-950 text-white">
                <Navbar />
            </header>

            <div className="flex flex-col min-h-screen bg-zinc-900 text-white items-center justify-center gap-4">
                <h1 className="text-6xl font-bold text-cyan-400 animate-pulse">404</h1>
                <p className="max-w-xl text-center text-zinc-500 text-lg">
                    The page you are looking for doesn't exist. <br />
                    Please check the URL or return to the homepage.
                </p>
                <Link to="/" className="font-medium bg-cyan-500 text-black px-6 py-3 rounded-xl hover:scale-105 hover:bg-cyan-400 transition-all">Go to Homepage</Link>
            </div>
        </>
    );
};