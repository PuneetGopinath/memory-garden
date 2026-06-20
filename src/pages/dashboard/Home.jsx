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
    const [sort, setSort] = useState("date_desc");

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

            setMemories(data);
        };

        fetchMemories();
    }, [user.id]);
    
    let s = () => 0;

    if (memories.length > 0) {
        switch (sort) {
            case "date_desc":
            default:
                s = (a, b) => new Date(b.memory_date) - new Date(a.memory_date);
                break;
            case "date_asc":
                s = (a, b) => new Date(a.memory_date) - new Date(b.memory_date);
                break;
            case "title_asc":
                s = (a, b) => {
                    const diff = (i) => a.title.charCodeAt(i) - b.title.charCodeAt(i);
                    let d;
                    for (let i = 0; i < Math.min(a.title.length, b.title.length); i++) {
                        d = diff(i);
                        if (d !== 0)
                            return d;
                    }
                };
                break;
            case "title_desc":
                s = (a, b) => {
                    const diff = (i) => b.title.charCodeAt(i) - a.title.charCodeAt(i);
                    let d;
                    for (let i = 0; i < Math.min(a.title.length, b.title.length); i++) {
                        d = diff(i);
                        if (d !== 0)
                            return d;
                    }
                };
                break;
        }
    }

    const sortedMemories = [...memories].sort(s);

    return (
        loading
            ? <span className="text-zinc-400">Loading...</span>
            : (
                <div className="text-white text-center min-h-screen">
                    <div className="max-w-2xl mx-auto">
                        <h1 className="text-4xl font-bold mb-4">Hi there, {user.user_metadata.username}!</h1>
                        <span className="text-zinc-400 font-light text-lg mx-auto p-4">Welcome to your Memory Garden! Plant your memories and let the timeline grow.</span>
                    </div>

                    <div className="flex flex-row justify-center items-center gap-8 p-4 mb-8">
                        <Link to="upload" className="rounded-full text-sm font-medium border border-white/10 bg-cyan-400 p-4 hover:bg-cyan-500 transition-colors duration-300 inline-block">
                            Upload Memories
                        </Link>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="rounded-full text-sm font-medium border border-white/10 bg-zinc-800 min-w-[40%] p-4 inline-block hover:bg-zinc-700 transition-colors duration-300"
                        />
                        <div className="flex flex-row justify-center items-center gap-4">
                            <span className="text-zinc-400">Sort by:</span>
                            <select
                                className="rounded-2xl text-sm font-medium border border-white/10 bg-zinc-800 p-4 inline-block hover:bg-zinc-700 transition-colors duration-300"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                            >
                                <option value="date_desc">Date (Latest First)</option>
                                <option value="date_asc">Date (Oldest First)</option>
                                <option value="title_asc">Title (A-Z)</option>
                                <option value="title_desc">Title (Z-A)</option>
                            </select>
                        </div>
                    </div>

                    <div className="text-left">
                        {
                            sortedMemories.length > 0
                                ? (<Timeline memories={sortedMemories} className="mb-8" links={true} />)
                                : (<span className="text-zinc-400 mt-4 block mb-8 text-center">Your memory garden awaits for your first memory.<br />Plant your memories and watch your timeline grow.</span>)
                        }
                    </div>
                </div>
            )
    );
};