/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { toast } from "sonner";

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
        if (!pwdValid) return toast.error("Please enter a valid password based on the provided criteria.");

        setLoading(true);
        const fd = new FormData(e.target);

        if (!fd.get("legal"))
            return toast.error("You must agree to the Terms of Service and Privacy Policy to create an account.");

        const password = fd.get("password");
        const username = sanitize(fd.get("username"), "username");
        const email = sanitize(fd.get("email"), "email");

        if (!username)
            return toast.error("Please enter a valid username.");
        if (username.length < 3 || username.length > 32)
            return toast.error("Username should be between 3 and 32 characters.");

        if (!email)
            return toast.error("Please enter a valid email.");

        if (!password)
            return toast.error("Please enter a valid password.");

        let error;
        const msg = "An error has occurred while signing up. Please try again later or contact support.";

        try {
            ({ error } = await supabase.auth.signUp({
                email,
                password,
                options: { data: { username }},
            }));
        } catch (err) {
            console.error("[SIGN UP] Error signing up:", err);
            return toast.error(msg);
        } finally {
            setLoading(false);
        }

        if (error) {
            console.error("[SIGN UP] Sign up error:", error?.toJSON?.() ?? error);
            return toast.error(error?.code 
                ? i18n(error?.code)
                : msg);
        }

        navigate("/auth/signin?notify=verify-email");
    };

    return (
        <div className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8">
            <div className="space-y-2 text-center">
                <h3 className="text-2xl font-semibold">Make your memory garden</h3>
                <p className="text-zinc-400">Start to preserve your memories for the future</p>
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
                        autoComplete="username"
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
                        autoComplete="email"
                    />
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-sm text-zinc-400">Password <span className="text-red-500">*</span></span>
                    <input
                        type="password"
                        name="password"
                        className={`rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none${pwdValid ? " focus:border-purple-500/40" : " focus:border-red-500/50"}`}
                        placeholder="Enter your password"
                        value={pwd}
                        disabled={loading}
                        onChange={(e) => setPwd(e.target.value)}
                        onFocus={() => setTouched(true)}
                        required
                        autoComplete="new-password"
                    />
                </label>

                {touched && <PasswordValidation pwd={pwd} onValidityChange={setPwdValid} />}

                <label className="flex items-center gap-2 mt-2">
                    <input type="checkbox" name="legal" id="legal" disabled={loading} required />
                    <span className="text-sm text-zinc-400">
                        I agree to the <Link to="/terms" className="text-purple-400 hover:text-purple-300" target="_blank" rel="noopener noreferrer">Terms of Service</Link> and <Link to="/privacy" className="text-purple-400 hover:text-purple-300" target="_blank" rel="noopener noreferrer">Privacy Policy</Link> <span className="text-red-500">(required)</span>.
                    </span>
                </label>

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
