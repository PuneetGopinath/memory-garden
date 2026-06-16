/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import supabase from "../../utils/supabase";

export default function Reset() {
    const handleReset = async (e) => {
        e.preventDefault();
        
        const fd = new FormData(e.target);
        const email = fd.get("email");
        let data, error;

        try {
            ({ data, error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset`, // enter new password
            }));

            if (error) throw error;
        } catch (err) {
            console.error("[RESET] Error:", err);
            return alert("An error occurred while sending the reset email. Please try again later.");
        }
    };

    return (
        <div className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8">
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
                        required
                    />
                </label>

                <button
                    type="submit"
                    className="rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-medium py-2"
                >
                    Reset Password
                </button>
            </form>
        </div>
    );
};