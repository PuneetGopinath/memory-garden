/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Link } from "react-router";

export default function SignIn() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8">
            <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-center">Welcome Back</h3>
                <p className="text-zinc-400 text-center">Continue preserving your memories</p>
            </div>

            <form className="flex flex-col gap-4 py-4" onSubmit={handleSubmit}>
            </form>

            <span className="text-sm text-zinc-400">
                Don't have an account? <Link to="/auth/signup" className="text-purple-400 hover:text-purple-300">Sign Up</Link>
            </span>
        </div>
    );
};