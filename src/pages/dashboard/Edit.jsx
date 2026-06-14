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
    const [saving, setSaving] = useState(false);
    const [memory, setMemory] = useState(null);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [img, setImg] = useState(null);

    const noChange = memory?.title === title
        && (memory?.description ?? "") === desc
        && memory?.memory_date === date
        && !img;

    useEffect(() => {
        setLoading(true);
        async function loadMemory() {
            let data, error;

            try {
                ({ data, error } = await supabase.from("memories").select("*").eq("id", id).single());

                if (error) throw error;

                setMemory(data);
                setTitle(data.title);
                setDesc(data.description ?? "");
                setDate(data.memory_date);
            } catch (err) {
                console.error("[EDIT] Unexpected error while fetching memory", err);
                return alert("An unexpected error has occurred. Please try later.");
            } finally {
                setLoading(false);
            }
        }

        loadMemory();
    }, [id]);

    const handleEdit = async (e) => {
        e.preventDefault();
        setSaving(true);

        let error;
        let i = {};

        if (img && img.size > 0 && img.type.startsWith("image/") && memory?.image_path !== img.name) {
            const ext = img.name.split(".").pop().toLowerCase();
            if (img.size > 10 * 1024 * 1024)
                return alert("Image size exceeds 10MB limit. Please choose a smaller image.");

            const image = await supabase.storage.from("memory_images").upload(`${memory.user_id}/${Date.now()}.${ext}`, img);

            i = { image_path: image.data.path };
        } else if (!img && memory?.image_path) {
            i = { image_path: memory.image_path };
        }

        const newValues = {
            title,
            description: desc,
            memory_date: date,
            ...i
        };

        try {
            ({ error } = await supabase.from("memories").update(newValues).eq("id", memory.id));

            if (error) throw error;

            setMemory(prev => ({
                ...prev,
                ...newValues
            }));
        } catch (err) {
            console.error("[EDIT] Unexpected error during editing memory: ", err);
            return alert("An unexpected error occurred, please try later.");
        } finally {
            setSaving(false);
        }

        alert("Memory successfully saved!");
    };

    const saveText = saving
        ? "Saving Changes..."
        : "Save Changes";

    return loading
        ? <span>Loading...</span>
        : (
            <div className="text-white bg-zinc-900 p-6 rounded-lg border border-white/10 backdrop-blur max-w-lg mx-auto mb-12">
                <div className="flex flex-col mb-6 text-center gap-2">
                    <h1 className="font-semibold text-4xl">Edit Memory</h1>
                    <span className="text-zinc-400">Make your memory plants error free</span>
                    <span className="text-red-500 text-xs">Note: The image of the memory can not be changed using the website until development is complete. Contact support for assistance.</span>
                </div>

                <form onSubmit={handleEdit} className="space-y-4">
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">Title <span className="text-red-500">*</span></span>
                        <input
                            type="text"
                            name="title"
                            className="rounded-lg bg-zinc-800/50 w-full border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-500/70"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">Description</span>
                        <textarea
                            value={desc}
                            name="description"
                            className="rounded-lg bg-zinc-800/50 w-full border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-500/70"
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">Date <span className="text-red-500">*</span></span>
                        <input
                            type="date"
                            name="memory_date"
                            className="rounded-lg bg-zinc-800/50 w-full border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-500/70"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">Image</span>
                        <input
                            type="file"
                            name="image"
                            className="rounded-lg bg-zinc-800/50 w-full border border-white/10 px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/90 file:text-white hover:file:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/70 focus:ring-offset-2"
                            accept="image/*"
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                    </label>

                    <button
                        type="submit"
                        className="rounded-full mt-4 p-2 font-bold bg-cyan-500 hover:bg-cyan-400 disabled:bg-rose-400 disabled:hover:bg-rose-400 disabled:cursor-not-allowed"
                        disabled={saving || noChange}
                    >
                        {noChange
                            ? "No changes to save"
                            : saveText}
                    </button>
                </form>
            </div>
        );
};