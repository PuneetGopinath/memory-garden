/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";

import supabase from "../../utils/supabase";

export default function Home() {
    const { user } = useContext(AuthContext);

    const [memories, setMemories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetchMemories = async () => {
            let data, error;
            try {
            ({ data, error } = await supabase
                .from("memories")
                .select("*")
                .eq("user_id", user.id));
            } catch (err) {
                console.error("[DASHBOARD] Unexpected error fetching memories:", err);
                return;
            } finally {
                setLoading(false);
            }
            
            if (error) {
                console.error("[DASHBOARD] Error fetching memories:", error);
                return;
            }
            setMemories(data);
        };

        fetchMemories();
    }, [user]);

    return (
        loading
            ? <span className="text-zinc-400">Loading...</span>
            : (
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">Welcome, {user.user_metadata.username}!</h1>

                    <button className="rounded-full border border-white/10 bg-cyan-400 p-2 mt-6 hover:bg-cyan-500">Upload Memories</button>

                    {memories.length > 0
                        ? (<></>)
                        : (<span className="text-zinc-400 mt-4 block">No memories uploaded yet. Please upload some memories to get started.</span>)}
                </div>
            )
    );
};