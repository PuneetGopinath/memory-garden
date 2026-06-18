/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useContext, useState, useEffect } from "react";
import { Link } from "react-router";

import { AuthContext } from "../../context/AuthContext";

import Timeline from "../../components/Timeline";

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
                setLoading(false);
                return;
            }
            
            if (error) {
                console.error("[DASHBOARD] Error fetching memories:", error);
                setLoading(false);
                return;
            }

            try {
                for (let i = 0; i < data.length; i++) {
                    data[i].date = new Date(data[i].memory_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
                    if (data[i].image_path) {
                        const { data: d, error: imgErr } = await supabase.storage.from("memory_images").createSignedUrl(data[i].image_path, 60 * 60);
                        if (imgErr)
                            throw imgErr;
                        
                        const { signedUrl } = d;
                        data[i].img = signedUrl;
                    }
                }
            } catch (err) {
                console.error("[DASHBOARD] Error fetching memory images:", err);
            } finally {
                setLoading(false);
            }

            data.sort((a, b) => new Date(b.memory_date) - new Date(a.memory_date));

            setMemories(data);
        };

        fetchMemories();
    }, [user.id]);

    return (
        loading
            ? <span className="text-zinc-400">Loading...</span>
            : (
                <div className="text-white text-center min-h-screen">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-4xl font-bold mb-4">Hi there, {user.user_metadata.username}!</h1>
                        <span className="text-zinc-400 font-light text-lg mx-auto p-4">Welcome to your Memory Garden! Plant your memories and let the timeline grow.</span>
                    </div>

                    <Link to="upload" className="rounded-full text-sm font-medium border border-white/10 bg-cyan-400 p-4 mt-6 hover:bg-cyan-500 transition-colors duration-300 inline-block mb-8">
                        Upload Memories
                    </Link>

                    <div className="text-left">
                        {
                            memories.length > 0
                                ? (<Timeline memories={memories} className="mb-8" links={true} />)
                                : (<span className="text-zinc-400 mt-4 block mb-8 text-center">Your memory garden awaits for your first memory.<br />Plant your memories and watch your timeline grow.</span>)
                        }
                    </div>
                </div>
            )
    );
};