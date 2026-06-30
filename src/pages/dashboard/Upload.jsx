/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState, useContext } from "react";
import { Link } from "react-router";

import { toast } from "sonner";

import { AuthContext } from "../../context/AuthContext";

import supabase from "../../utils/supabase";

export default function Upload() {
    const [loading, setLoading] = useState(false);
    const [img, setImg] = useState(null);
    const { user } = useContext(AuthContext);

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);

        const fd = new FormData(e.target);

        const title = fd.get("title");
        const description = fd.get("description");
        const memory_date = fd.get("memory_date");
        const imageFile = fd.get("image");
        let image;

        if (imageFile && imageFile.size > 0 && imageFile.type.startsWith("image/")) {
            const ext = imageFile.name.split(".").pop().toLowerCase();
            if (imageFile.size > 10 * 1024 * 1024)
                return toast.error("Image size exceeds 10MB limit. Please choose a smaller image.");

            image = await supabase.storage.from("memory_images").upload(`${user.id}/${Date.now()}.${ext}`, imageFile);

            if (image.error) {
                console.error("[UPLOAD] Error uploading image to bucket:", image.error.toJSON())
                return toast.error("Failed to upload image. Please try again.");
            }
        }

        let data, error;

        try {
            if (true) {
                ({ data, error } = await supabase.functions.invoke("generate-memory-insights", {
                    body: {
                        title,
                        description,
                        date: memory_date
                    }
                }));

                if (error) throw error;

                console.log("[UPLOAD] Memory insights generated:", data);
            }
        } catch (err) {
            data = null;
            console.error("[UPLOAD] Error generating memory insights:", err?.toJSON?.() ?? err);
            toast.error("Failed to generate memory insights. Please try again in the view memory details page.")
        }

        error = null;

        try {
            ({ error } = await supabase.from("memories").insert({
                user_id: user.id,
                title,
                description,
                memory_date,
                image_path: image?.data?.path ?? null,
                ai_insights: data ?? null
            }));
        
            if (error)
                throw error;
        } catch (err) {
            if (image?.data) {
                const { error: delErr } = await supabase.storage.from("memory_images").remove([image.data.path]);
                if (delErr)
                    console.error("[UPLOAD] Error trying to delete image from bucket after failed memory insert:", delErr.toJSON());
            }

            console.error("[UPLOAD] Error inserting memory into memories table:", err?.toJSON?.() ?? err);
            return toast.error("Failed to save memory. Please try again.");
        } finally {
            setLoading(false);
        }

        toast.success("Memory planted successfully!");
    };

    return (
        <div className="text-white bg-zinc-900/60 rounded-3xl border border-white/10 backdrop-blur max-w-lg mx-auto p-8 mb-12">
            <Link to="/dashboard" className="text-xs text-gray-400 p-2 hover:text-gray-300 transition-colors duration-200">&larr; Back to Dashboard</Link>
            <div className="text-center my-2">
                <h1 className="text-4xl font-semibold mb-4">Upload Memories</h1>
                <p className="text-zinc-400">Add memories to your memory garden</p>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
                <label className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Title <span className="text-red-500">*</span></span>
                    <input
                        type="text"
                        name="title"
                        className="w-full rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-500/40"
                        required
                    />
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Description</span>
                    <textarea
                        name="description"
                        className="w-full rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-500/40"
                        rows="6"
                    />
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Date <span className="text-red-500">*</span></span>
                    <input
                        type="date"
                        name="memory_date"
                        className="w-full rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-500/40"
                        required
                    />
                </label>

                <label className="flex flex-col gap-1">
                    <span className="text-sm font-medium">Image <span className="text-xs text-zinc-500 font-normal">(MAX 10MB)</span></span>
                    <input
                        type="file"
                        name="image"
                        className="w-full rounded-lg bg-zinc-800/50 border border-white/10 text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/70 file:text-white hover:file:bg-cyan-500/80 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:ring-offset-2 p-2"
                        accept="image/*"
                        onChange={(e) => setImg(e.target.files[0])}
                    />
                    
                    {img && 
                        (<>
                            <span className="text-sm text-zinc-400 mt-1">Preview Image</span>
                            <img src={URL.createObjectURL(img)} alt={img.name} className="mt-2 max-h-60 rounded-lg border border-white/10" />
                        </>)}
                </label>

                <label className="flex gap-1">
                    <span className="text-sm font-medium">Do you want to generate AI Insights?</span>
                    <input type="checkbox" name="ai_insights" className="w-4 h-4 accent-cyan-500" defaultChecked />
                </label>

                <button
                    type="submit"
                    className="mt-4 w-full rounded-lg bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 px-4 py-2 text-white font-medium disabled:cursor-not-allowed disabled:bg-cyan-500/50 disabled:hover:bg-cyan-500/50"
                    disabled={loading}
                >
                    {loading ? "Uploading..." : "Plant Memory"}
                </button>
            </form>
        </div>
    );
};