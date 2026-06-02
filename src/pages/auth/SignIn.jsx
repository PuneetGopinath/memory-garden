/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState } from "react";
import { Link } from "react-router";

import PasswordValidation from "../../components/auth/PasswordValidation";

import supabase from "../../utils/supabase";
import i18n from "../../utils/i18n";
import sanitize from "../../utils/sanitize";

export default function SignIn() {
    const [loading, setLoading] = useState(false);
    const [pwd, setPwd] = useState("");
    const [touched, setTouched] = useState(false);
    const [pwdValid, setPwdValid] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const fd = new FormData(e.target);
        const password = fd.get("password");
        const email = sanitize(fd.get("email"), "email");

        if (!email)
            return alert("Please enter a valid email.");

        if (!password)
            return alert("Please enter the password.");
        
        let error;
        const msg = "An error has occurred while signing in. Please try again later or contact support.";

        try {
            ({ error } = await supabase.auth.signInWithPassword({ email, password }));
        } catch (err) {
            console.error("[SIGN IN] Error signing in:", err);
            return alert(msg);
        } finally {
            setLoading(false);
        }

        if (error) {
            console.error("[SIGN IN] Sign in error:", error);
            return alert(error?.status && error?.code
                ? `${error?.status}: ${i18n(error?.code)}` 
                : msg);
        }

        // Redirect handled by auth state listener in PublicOnlyRoute
    };

    return (
        <div className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8">
            <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-center">Welcome Back</h3>
                <p className="text-zinc-400 text-center">Continue preserving your memories</p>
            </div>

            <form className="flex flex-col gap-4 py-4" onSubmit={handleSubmit}>
                <label className="flex flex-col gap-1">
                    <span className="text-sm text-zinc-400">Email <span className="text-red-500">*</span></span>
                    <input
                        type="email"
                        name="email"
                        className="rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-purple-500/40"
                        placeholder="xyz@abc.com"
                        disabled={loading}
                        required
                        autoComplete="email"
                    />
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-sm text-zinc-400">Password <span className="text-red-500">*</span></span>
                    <input
                        type="password"
                        name="password"
                        className={`rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-purple-500/40${!pwdValid ? " focus:border-red-500/50" : ""}`}
                        placeholder="Enter your password"
                        disabled={loading}
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        onFocus={() => setTouched(true)}
                        required
                        autoComplete="current-password"
                    />
                </label>

                {touched && <PasswordValidation pwd={pwd} onValidityChange={setPwdValid} />}

                <button
                    type="submit"
                    className="mt-4 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors duration-300 px-4 py-2 text-white font-medium disabled:bg-purple-500/50 disabled:cursor-not-allowed"
                    disabled={loading || !pwdValid}
                >
                    {loading ? "Signing In..." : "Sign In"}
                </button>
            </form>

            <span className="text-sm text-zinc-400">
                Don't have an account? <Link to="/auth/signup" className="text-purple-400 hover:text-purple-300">Sign Up</Link>
            </span>
        </div>
    );
};