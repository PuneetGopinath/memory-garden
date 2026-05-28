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

            <span className="text-sm text-zinc-400">
                Already have an account? <Link to="/auth/signin" className="text-purple-400 hover:text-purple-300">Sign In</Link>
            </span>
        </div>
    );
};