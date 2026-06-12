/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState, useEffect } from "react";
import { useParams } from "react-router";

import supabase from "../../utils/supabase";

export default function Edit() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [memory, setMemory] = useState(null);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState(new Date());

    const noChange = memory?.title === title
        && memory?.description === desc
        && memory?.memory_date === date.toISOString();

    useEffect(() => {
        setLoading(true);
        async function loadMemory() {
            let data, error;

            try {
                ({ data, error } = await supabase.from("memories").select("*").eq("id", id).single());

                if (error) throw error;
            } catch (err) {
                console.error("[EDIT] Unexpected error while fetching memory", err);
                return alert("An unexpected error has occurred. Please try later.");
            } finally {
                setLoading(false);
            }

            setMemory(data);
            setTitle(data.title);
            setDesc(data.description);
            setDate(new Date(data.memory_date));
        }

        loadMemory();
    }, [id]);

    const handleEdit = async (e) => {
        e.preventDefault();

        let data, error;

        try {
            ({ data, error } = await supabase.from("memories").update({
                title,
                description: desc,
                memory_date: date
            }).eq("id", memory.id));

            if (error) throw error;
        } catch (err) {
            console.error("[EDIT] Unexpected error during editing memory: ", err);
            return alert("An unexpected error occurred, please try later.");
        }
    };

    return loading
        ? <span>Loading...</span>
        : (
            <div className="text-white bg-zinc-900 p-6 rounded-lg border border-white/10 backdrop-blur max-w-lg mx-auto mb-12">
                <div className="mb-6 text-center space-y-2">
                    <h1 className="font-semibold text-4xl">Edit Memory</h1>
                    <span className="text-zinc-400">Make your memory plants error free</span>
                </div>

                <form onSubmit={handleEdit} className="space-y-4">
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">Title <span className="text-red-500">*</span></span>
                        <input
                            type="text"
                            className="rounded-lg bg-zinc-800/50 w-full border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-600/70"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">Description</span>
                        <textarea
                            value={desc}
                            className="rounded-lg bg-zinc-800/50 w-full border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-600/70"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">Date <span className="text-red-500">*</span></span>
                        <input
                            type="date"
                            className="rounded-lg bg-zinc-800/50 w-full border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-600/70"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">Image</span>
                        <input
                            type="file"
                            className="rounded-lg bg-zinc-800/50 w-full border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-600/70"
                        />
                    </label>

                    <button
                        type="submit"
                        className="rounded-full mt-4 p-2 font-bold bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-300 disabled:hover:bg-cyan-300 disabled:cursor-not-allowed"
                        disabled={loading || noChange}
                    >
                        {loading && !noChange ? "Saving Changes..." : "Save Changes"}
                        {noChange && !loading ? "No changes to save" : ""}
                    </button>
                </form>
            </div>
        );
};