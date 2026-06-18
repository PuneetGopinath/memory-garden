/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState, useEffect, useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

import supabase from "../../utils/supabase";

export default function Profile() {
    const { user } = useContext(AuthContext);
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
                return alert("An error occurred while fetching profile data. Please try again later.");
            } finally {
                setLoading(false);
            }

            setTotalMemories(count || 0);
        }

        fetchProfileData();
    }, []);

    return loading
    ? <div className="text-center text-2xl font-bold">Loading...</div>
    : (
        <div className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8">
            <h1 className="text-2xl font-bold">Hi there, {user?.user_metadata?.username || "Anonymous User"}</h1>

            <section className="mt-6 flex flex-col gap-2 text-sm text-zinc-400">
                <h2 className="text-lg font-semibold text-zinc-300">Account Details</h2>

                <span>Email Address: {user?.email}</span>
                <span>Account Created: {new Date(user?.created_at).toLocaleString()}</span>
            </section>

            <section className="mt-6 flex flex-col gap-2 text-sm text-zinc-400">
                <h2 className="text-lg font-semibold text-zinc-300">Memory Garden Stats</h2>

                <span>Total Memories: {totalMemories}</span>
            </section>
        </div>
    );
};