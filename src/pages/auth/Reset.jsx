/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState } from "react";

import { toast } from "sonner";

import supabase from "../../utils/supabase";

export default function Reset() {
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);

        const fd = new FormData(e.target);
        const email = fd.get("email");
        let error;

        try {
            ({ error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/new-password`, // enter new password
            }));

            if (error) throw error;
        } catch (err) {
            console.error("[RESET] Error:", err);
            return toast.error("An error occurred while sending the reset email. Please try again later.");
        } finally {
            setLoading(false);
        }

        setSent(true);
    };

    return (
        <div className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8">
            {sent
                ? (<div className="flex flex-col gap-4 text-center">
                    <h1 className="text-2xl font-bold">Check Your Email</h1>

                    <p className="text-sm text-zinc-400">
                        If an account with that email exists, a password reset email will arrive shortly.<br /><br />
                        <span className="text-red-300">Please check your spam/junk folder if you don't find it in the inbox.</span>
                    </p>
                </div>)
                : <>
                    <div className="flex flex-col gap-2 mb-6 text-center">
                        <h1 className="text-2xl font-bold">Reset Password</h1>

                        <p className="text-sm text-zinc-400">
                            Enter your email address and we'll send you a link to reset your password if your email is registered with us.
                        </p>
                    </div>
                    
                    <form className="flex flex-col gap-4" onSubmit={handleReset}>
                        <label>
                            <span className="text-sm text-zinc-400">Email Address <span className="text-red-500">*</span></span>
                            <input
                                type="email"
                                name="email"
                                className="mt-1 w-full rounded-lg bg-zinc-800/50 border border-white/20 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                disabled={loading}
                                required
                            />
                        </label>

                        <button
                            type="submit"
                            className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-medium py-2 transition-colors duration-200"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Reset Password"}
                        </button>
                    </form>
                </>
            }
        </div>
    );
};