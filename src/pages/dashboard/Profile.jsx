/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState, useEffect, use } from "react";

import { toast } from "sonner";

import { AuthContext } from "../../context/AuthContext";

import supabase from "../../utils/supabase";

export default function Profile() {
    const { user } = use(AuthContext);
    const [loading, setLoading] = useState(true);
    const [totalMemories, setTotalMemories] = useState(0);

    useEffect(() => {
        async function fetchProfileData() {
            let count, error;

            try {
                ({ count, error } = await supabase.from("memories").select("*", { count: "exact" }).eq("user_id", user?.id));

                if (error) throw error;
            } catch (err) {
                console.error("[PROFILE] Error:", err);
                return toast.error("An error occurred while fetching profile data. Please try again later.");
            } finally {
                setLoading(false);
            }

            setTotalMemories(count || 0);
        }

        fetchProfileData();
    }, [user?.id]);

    const username = user?.user_metadata?.username || "Anonymous User";

    return loading
        ? <div className="text-center text-2xl font-bold">Loading...</div>
        : (
            <div className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8 max-w-4xl mx-auto mt-12">
                <div className="flex items-center gap-4">
                    <div className="flex rounded-2xl w-20 h-20 bg-purple-950/20 border border-white/10 p-2 text-center items-center justify-center">
                        <span className="font-semibold text-2xl">{username.charAt(0).toUpperCase()}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold">{username}</h1>
                        <span className="text-sm text-zinc-400">{user?.email}</span>
                        <span className="text-[1.125rem] text-zinc-400">Member since {new Date(user?.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long" })}</span>
                    </div>
                </div>

                <hr className="w-full my-6 border-white/10" />

                <section className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-400">
                    <div className="bg-zinc-900 flex flex-col gap-3 rounded-lg p-4">
                        <span className="text-lg font-semibold">Total Memories</span>
                        <span className="text-2xl font-bold text-white">{totalMemories}</span>
                        <span className="text-sm">Memories preserved</span>
                    </div>
                    <div className="bg-zinc-900 flex flex-col gap-3 rounded-lg p-4">
                        <span className="text-lg font-semibold">Account Status</span>
                        <span className="text-2xl font-bold text-white">{user?.confirmed_at ? "Active" : "Inactive"}</span>
                        <span className="text-sm">{user?.email_confirmed_at ? "Email confirmed" : "Email not confirmed"}</span>
                    </div>
                </section>

                <hr className="w-full my-6 border-white/10" />

                <section className="mt-6 flex flex-col gap-2 text-sm text-zinc-400">
                    <h2 className="text-lg font-semibold text-zinc-300">Account Details</h2>

                    <div><span className="font-medium text-zinc-300">Email:</span> {user?.email}</div>
                    <div><span className="font-medium text-zinc-300">Last Sign In:</span> {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Info not available"}</div>
                    <div><span className="font-medium text-zinc-300">Account Created:</span> {new Date(user?.created_at).toLocaleString()}</div>
                </section>
            </div>
        );
};
