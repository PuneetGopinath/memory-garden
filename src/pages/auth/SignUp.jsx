/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router";

import PasswordValidation from "../../components/auth/PasswordValidation";

import supabase from "../../utils/supabase";
import i18n from "../../utils/i18n";
import sanitize from "../../utils/sanitize";

export default function SignUp() {
    const [loading, setLoading] = useState(false);
    const [pwd, setPwd] = useState("");
    const [touched, setTouched] = useState(false);
    const [pwdValid, setPwdValid] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
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
                        name="username"
                        className="rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-purple-500/40"
                        placeholder="alexwalker"
                        disabled={loading}
                        required
                    />
                </label>
                
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-zinc-400">Email <span className="text-red-500">*</span></span>
                    <input
                        type="email"
                        name="email"
                        className="rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-purple-500/40"
                        placeholder="xyz@abc.com"
                        disabled={loading}
                        required
                    />
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-sm text-zinc-400">Password <span className="text-red-500">*</span></span>
                    <input
                        type="password"
                        name="password"
                        className="rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-purple-500/40"
                        placeholder="Enter your password"
                        value={pwd}
                        disabled={loading}
                        onChange={(e) => setPwd(e.target.value)}
                        onFocus={() => setTouched(true)}
                        required
                    />
                </label>

                {touched && <PasswordValidation pwd={pwd} onValidityChange={setPwdValid} />}

                <button
                    type="submit"
                    className="mt-4 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors duration-300 px-4 py-2 text-white font-medium disabled:bg-purple-500/50 disabled:cursor-not-allowed"
                    disabled={loading || !pwdValid}
                >
                    {loading ? "Signing Up..." : "Sign Up"}
                </button>
            </form>

            <span className="text-sm text-zinc-400">
                Already have an account? <Link to="/auth/signin" className="text-purple-400 hover:text-purple-300">Sign In</Link>
            </span>
        </div>
    );
};