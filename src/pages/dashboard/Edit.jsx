/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router";

import { toast } from "sonner";

import { MIN_TITLE_LENGTH, MAX_TITLE_LENGTH, MAX_DESC_LENGTH, MAX_IMAGE_SIZE } from "../../constants";

import supabase from "../../utils/supabase";

export default function Edit() {
    const { id } = useParams();
    const fileRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [memory, setMemory] = useState(null);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
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
                return toast.error("An unexpected error has occurred. Please try later.");
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

        if (img && img.size > 0 && img.type.startsWith("image/")) {
            const ext = img.name.split(".").pop().toLowerCase();
            if (img.size > MAX_IMAGE_SIZE) {
                setSaving(false);
                return toast.error("Image size exceeds 10MB limit. Please choose a smaller image.");
            }

            const image = await supabase.storage.from("memory_images").upload(`${memory.user_id}/${Date.now()}.${ext}`, img);
            if (image.error) {
                setSaving(false);
                console.error("[EDIT] Error uploading image: ", image.error);
                return toast.error("Error uploading image. Please try again later.");
            }
            // todo: Delete old image

            i = { image_path: image.data.path };
        }

        if (title.length < MIN_TITLE_LENGTH)
            return toast.error(`Title must have at least ${MIN_TITLE_LENGTH} characters. Please add more details.`, { duration: 5000 });
        if (title.length > MAX_TITLE_LENGTH)
            return toast.error(`Title exceeds ${MAX_TITLE_LENGTH} characters. Please shorten it.`, { duration: 5000 });

        if (desc.length > MAX_DESC_LENGTH)
            return toast.error(`Description exceeds ${MAX_DESC_LENGTH} characters. Please shorten it.`, { duration: 5000 });

        const newValues = {
            title,
            description: desc,
            memory_date: date,
            ...i,
        };

        try {
            ({ error } = await supabase.from("memories").update(newValues).eq("id", memory.id));

            if (error) throw error;

            setMemory(prev => ({
                ...prev,
                ...newValues,
            }));
        } catch (err) {
            if (i.image_path) {
                await supabase.storage.from("memory_images").remove([i.image_path]);
            }

            console.error("[EDIT] Unexpected error during editing memory: ", err);
            return toast.error("An unexpected error occurred, please try later.");
        } finally {
            setSaving(false);
        }

        toast.success("Memory successfully saved!");
        
        setImg(null);
        if (fileRef.current)
            fileRef.current.value = "";
    };

    if (loading)
        return (
            <div className="bg-zinc-950 min-h-screen text-white flex flex-col gap-4 text-center items-center justify-center" role="status" aria-live="polite" aria-label="Loading memory">
                <div className="rounded-full w-25 h-25 border-10 border-cyan-500 border-dotted animate-[spin_3s_linear_infinite]"></div>
                <h1 className="text-2xl font-bold">Loading memory...</h1>
                <p className="text-sm text-zinc-400">
                    Please wait while we load your memory.
                    <br />
                    This may take a few seconds.
                </p>
            </div>
        );

    return (
        <div className="text-white bg-zinc-900 p-6 rounded-lg border border-white/10 backdrop-blur max-w-lg mx-auto mb-12">
            <Link to={`/dashboard/memory/${id}`} className="text-gray-400 text-xs p-2 hover:text-gray-300 transition-colors duration-200">&larr; Back to Memory</Link>
            <div className="flex flex-col mb-6 text-center gap-2">
                <h1 className="font-semibold text-4xl">Edit Memory</h1>
                <span className="text-zinc-400">Make your memory plants error free</span>
            </div>

            <form onSubmit={handleEdit} className="space-y-4" autoComplete="off">
                <label className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Title <span className="text-red-500">*</span></span>
                    <input
                        type="text"
                        name="title"
                        className="rounded-lg bg-zinc-800/50 w-full border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-500/70"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        minLength={MIN_TITLE_LENGTH}
                        maxLength={MAX_TITLE_LENGTH}
                    />
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Description</span>
                    <textarea
                        value={desc}
                        name="description"
                        className="rounded-lg bg-zinc-800/50 w-full border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-500/70"
                        onChange={(e) => setDesc(e.target.value)}
                        maxLength={MAX_DESC_LENGTH}
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
                        ref={fileRef}
                        onChange={(e) => setImg(e.target.files[0])}
                    />

                    {img &&
                        (<>
                            <span className="text-sm text-zinc-400 mt-1">Preview Image</span>
                            <img src={URL.createObjectURL(img)} alt={img.name} className="mt-2 max-h-60 rounded-lg border border-white/10" />
                        </>)}
                </label>

                <button
                    type="submit"
                    className="rounded-lg w-full mt-4 p-2 font-bold bg-cyan-500 hover:bg-cyan-400 disabled:bg-cyan-900 disabled:hover:bg-cyan-900 disabled:text-zinc-400 disabled:cursor-not-allowed"
                    disabled={saving || noChange}
                    title={noChange ? "No changes made to save" : "Update this memory"}
                >
                    {saving
                        ? "Updating..."
                        : "Update Memory"}
                </button>
            </form>
        </div>
    );
};
