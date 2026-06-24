/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState, useEffect } from "react";
import { Link } from "react-router";

import { toast } from "sonner";

import PasswordValidation from "../../components/auth/PasswordValidation";

import supabase from "../../utils/supabase";

export default function NewPassword() {
    const [touched, setTouched] = useState(false);
    const [pwd, setPwd] = useState("");
    const [confirmPwd, setConfirmPwd] = useState("");
    const [pwdValid, setPwdValid] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [s5n, setS5n] = useState("loading");

    const same = pwd === confirmPwd && pwd.length > 0;

    useEffect(() => {
        async function checkSession() {
            const { data: { session } } = await supabase.auth.getSession();

            setS5n(!!session?.access_token || null);
        }

        checkSession();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!same || !pwdValid) return;

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({ password: pwd });
            if (error) throw error;

            setSuccess(true);
        } catch (err) {
            console.error("[NEW PASSWORD] Error: ", err);
            return toast.error("An error occurred while updating the password. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (s5n === "loading")
        return <div className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8">Loading...</div>

    if (!s5n)
        return (
            <div className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8">
                <div className="flex flex-col gap-2 mb-6 text-center">
                    <h1 className="text-2xl font-bold">Invalid Link</h1>
                    <p className="text-sm text-zinc-400">
                        The link you used to access this page is invalid or has expired. Please request a new password reset link and try again.
                    </p>

                    <Link to="/auth/reset" className="mt-4 text-emerald-500 hover:text-emerald-400 font-medium transition-colors duration-200">
                        Request New Password Reset Link
                    </Link>
                </div>
            </div>
    );

    if (success)
        return (
            <div className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Password Updated</h1>

                <p className="text-sm text-zinc-400 mb-6">
                    Your password has been updated successfully.
                </p>

                <Link to="/auth/signin" className="inline-block rounded-lg px-4 py-2 bg-emerald-500 font-medium hover:bg-emerald-400 transition-colors duration-200">
                    Go to Sign In
                </Link>
            </div>
        );

    return (
        <div className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8">
            <div className="flex flex-col gap-2 mb-6 text-center">
                <h1 className="text-2xl font-bold">Create New Password</h1>
                <p className="text-sm text-zinc-400">
                    Enter your new password below.
                </p> {/* Implement such that they cannot use last 2-3 recently used passwords */}
            </div>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label className="flex flex-col gap-1">
                    <span>New Password: <span className="text-red-500">*</span></span>
                    <input
                        type="password"
                        className={`rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none${pwdValid ? " focus:border-emerald-500/40" : " focus:border-red-500/50"}`}
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                        onFocus={() => setTouched(true)}
                        required
                        disabled={loading}
                    />
                </label>

                <label className="flex flex-col gap-1">
                    <span>Confirm Password: <span className="text-red-500">*</span></span>
                    <input
                        type="password"
                        className={`rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none${same && touched ? " focus:border-emerald-500/40" : " focus:border-red-500/50"}`}
                        value={confirmPwd}
                        onChange={(e) => setConfirmPwd(e.target.value)}
                        required
                        disabled={loading}
                    />
                </label>

                {!same && confirmPwd.length > 0 && <p className="text-xs text-red-500 p-2 bg-zinc-900 font-medium rounded-lg hover:bg-zinc-700 transition-colors duration-200">Passwords do not match.</p>}
                {same && confirmPwd.length > 0 && <p className="text-xs text-emerald-500 p-2 bg-zinc-900 font-medium rounded-lg hover:bg-zinc-700 transition-colors duration-200">Passwords match.</p>}

                {touched && <PasswordValidation pwd={pwd} onValidityChange={setPwdValid} />}

                <button
                    type="submit"
                    className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-medium py-2 transition-colors duration-200 disabled:bg-emerald-500/50 disabled:hover:bg-emerald-400/50 disabled:cursor-not-allowed"
                    disabled={!same || !pwdValid || loading}
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </form>
        </div>
    );
};