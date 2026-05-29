/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Link } from "react-router";

export default function SignUp() {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8">
            <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-center">Make your memory garden</h3>
                <p className="text-zinc-400 text-center">Start to preserve your memories for the future</p>
            </div>

            <form className="flex flex-col gap-4 py-4" onSubmit={handleSubmit}>
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-zinc-400">Username <span className="text-red-500">*</span></span>
                    <input
                        type="text"
                        className="rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-purple-500/40"
                        placeholder="HelloWorld123"
                        required
                    />
                </label>
                
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-zinc-400">Email <span className="text-red-500">*</span></span>
                    <input
                        type="email"
                        className="rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-purple-500/40"
                        placeholder="xyz@abc.com"
                        required
                    />
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-sm text-zinc-400">Password <span className="text-red-500">*</span></span>
                    <input
                        type="password"
                        className="rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-purple-500/40"
                        placeholder="ThatsASecret"
                        required
                    />
                </label>

                <button type="submit" className="mt-4 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors duration-300 px-4 py-2 text-white font-medium">Sign Up</button>
            </form>

            <span className="text-sm text-zinc-400">
                Already have an account? <Link to="/auth/signin" className="text-purple-400 hover:text-purple-300">Sign In</Link>
            </span>
        </div>
    );
};