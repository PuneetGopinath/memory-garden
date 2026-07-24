/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState, use } from "react";
import { Link } from "react-router";

import { toast } from "sonner";

import { Event } from "../../components/MemoryCard";

import { MAX_TITLE_LENGTH, MIN_TITLE_LENGTH, MAX_DESC_LENGTH, MAX_IMAGE_SIZE } from "../../constants";

import AuthContext from "../../context/AuthContext";

import supabase from "../../utils/supabase";

async function generateInsights(memory) {
    let data, error;

    try {
        ({ data, error } = await supabase.functions.invoke("generate-memory-insights", {
            body: memory,
        }));

        if (error) throw error;
    } catch (err) {
        data = null;
        console.error("[UPLOAD] Error generating memory insights:", err?.toJSON?.() ?? err);
    }

    return data;
}

export default function Upload() {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [img, setImg] = useState(null);
    const { user } = use(AuthContext);

    const validDesc = desc.length <= MAX_DESC_LENGTH;

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);

        const fd = new FormData(e.target);

        const title = fd.get("title");
        if (title.length < MIN_TITLE_LENGTH)
            return toast.error(`Title must have at least ${MIN_TITLE_LENGTH} characters. Please add more details.`, { duration: 5000 });
        if (title.length > MAX_TITLE_LENGTH)
            return toast.error(`Title exceeds ${MAX_TITLE_LENGTH} characters. Please shorten it.`, { duration: 5000 });

        if (!validDesc)
            return toast.error(`Description exceeds ${MAX_DESC_LENGTH} characters. Please shorten it.`, { duration: 5000 });

        const memory_date = fd.get("memory_date");
        const imageFile = fd.get("image");
        let image;

        if (imageFile && imageFile.size > 0 && imageFile.type.startsWith("image/")) {
            const ext = imageFile.name.split(".").pop().toLowerCase();
            if (imageFile.size > MAX_IMAGE_SIZE) {
                setLoading(false);
                return toast.error("Image size exceeds 10MB limit. Please choose a smaller image.");
            }

            image = await supabase.storage.from("memory_images").upload(`${user.id}/${Date.now()}.${ext}`, imageFile);

            if (image.error) {
                console.error("[UPLOAD] Error uploading image to bucket:", image.error.toJSON());
                setLoading(false);
                return toast.error("Failed to upload image. Please try again.");
            }
        }

        let data, error;

        try {
            ({ data, error } = await supabase.from("memories").insert({
                user_id: user.id,
                title,
                description: desc,
                memory_date,
                image_path: image?.data?.path ?? null,
            }).select().single());
        
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

        e.target.clear();

        const toastId = toast.success("Memory planted successfully!", {
            description: "AI insights are optional and can be done later in the memory details page.",
            action: {
                label: "Generate Insights",
                onClick: async () => {
                    toast.dismiss(toastId);
                    const loadingToast = toast.loading("Generating insights...");
                    const insights = await generateInsights({
                        title: data.title,
                        description: data.description,
                        date: data.memory_date,
                    });

                    if (!insights) return toast.error("Failed to generate insights. Please try again later.", { id: loadingToast });

                    await supabase.from("memories").update({ ai_insights: insights }).eq("id", data.id);
                    
                    toast.success("Insights generated successfully!", { id: loadingToast });
                },
            },
            actionButtonStyle: {
                backgroundColor: "white",
                color: "rgb(16 185 129)",
                padding: "0.25rem 0.5rem",
                fontWeight: "bold",
                border: "1px solid rgb(16 185 129)",
            },
            closeButton: true,
            duration: 10000,
        });
    };

    const d = date === "" ? new Date() : new Date(date);
    const change = title !== "" || desc !== "" || date !== "" || img !== null;

    return (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] text-white backdrop-blur max-w-6xl mx-auto p-4 mb-12 gap-4">
            <div className="bg-zinc-900/60 rounded-3xl border border-white/10 max-w-xl p-8">
                <Link to="/dashboard" className="text-xs text-gray-400 p-2 hover:text-gray-300 transition-colors duration-200">&larr; Back to Dashboard</Link>
                <div className="text-center my-2">
                    <h1 className="text-4xl font-semibold mb-4">Upload Memories</h1>
                    <p className="text-zinc-400">Add memories to your memory garden</p>
                </div>

                <form onSubmit={handleUpload} className="space-y-4" autoComplete="off">
                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">Title <span className="text-red-500">*</span></span>
                        <input
                            type="text"
                            name="title"
                            className="w-full rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-500/40"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            minLength={MIN_TITLE_LENGTH}
                            maxLength={MAX_TITLE_LENGTH}
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">Description</span>
                        <textarea
                            name="description"
                            className="w-full rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-500/40"
                            rows="6"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                            maxLength={MAX_DESC_LENGTH}
                        />
                        <span className={`text-xs font-normal ${validDesc ? "" : "text-red-500"}`}>{desc.length}/{MAX_DESC_LENGTH}</span>
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className="text-sm font-medium">Date <span className="text-red-500">*</span></span>
                        <input
                            type="date"
                            name="memory_date"
                            className="w-full rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-500/40"
                            value={date}
                            onChange={e => setDate(e.target.value)}
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
                    </label>

                    <button
                        type="submit"
                        className="mt-4 w-full rounded-lg bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 px-4 py-2 text-white font-medium disabled:cursor-not-allowed disabled:bg-cyan-500/50 disabled:hover:bg-cyan-500/50"
                        disabled={loading || !validDesc}
                    >
                        {loading ? "Uploading..." : "Plant Memory"}
                    </button>
                </form>
            </div>

            <aside className={`sticky top-24 self-start rounded-2xl bg-zinc-900 p-6 border border-white/10 max-w-xl mx-auto mt-1 ${change ? "opacity-100 -translate-y-1" : "opacity-50"} transition-all duration-300`}>
                <h2 className="text-lg font-semibold mb-4">Memory Card Preview</h2>

                <Event
                    date={d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                    title={title === "" ? "Untitled Memory" : title}
                    description={desc === "" ? "No description." : desc}
                    img={img ? URL.createObjectURL(img) : img}
                />
            </aside>
        </div>
    );
};
