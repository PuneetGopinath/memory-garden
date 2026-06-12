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
            <div>
                <div>
                    <h1>Edit Memory</h1>
                </div>

                <form onSubmit={handleEdit} className="space-y-4">
                    <label>
                        <span>Title <span className="text-red-500">*</span></span>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>

                    <label>
                        <span>Description</span>
                        <textarea
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </label>

                    <label>
                        <span>Date <span className="text-red-500">*</span></span>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </label>

                    <label>
                        <span>Image</span>
                        <input
                            type="file"
                        />
                    </label>

                    <button
                        type="submit"
                        className="rounded-full font-bold bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-300 disabled:hover:bg-cyan-300 disabled:cursor-not-allowed"
                        disabled={loading || noChange}
                    >
                        {loading && !noChange ? "Saving Changes..." : "Save Changes"}
                        {noChange && !loading ? "No changes to save" : ""}
                    </button>
                </form>
            </div>
        );
};