/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";

import { toast } from "sonner";

import supabase from "../../utils/supabase";

export default function Memory() {
    const { id } = useParams();
    const [memory, setMemory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        const fetchMemory = async () => {
            let data, error;
            try {
                ({ data, error } = await supabase.from("memories").select("*").eq("id", id).single());
                if (error)
                    throw error;
            } catch (err) {
                if (err.code === "PGRST116") {
                    return toast.error("The memory with the given ID does not exist.");
                }
                console.error("[MEMORY] Unexpected error fetching memory:", err);
                return toast.error("An unexpected error occurred while fetching the memory. Please try again later.");
            } finally {
                setLoading(false);
            }

            const m = { ...data };

            if (data.image_path) {
                const { data: imgData, error: imgError } = await supabase.storage.from("memory_images").createSignedUrl(data.image_path, 60 * 60);
                
                if (imgError)
                    console.error("[MEMORY] Error fetching memory image:", imgError);

                m.img = imgData?.signedUrl || null;
            }

            setMemory(m);
        };

        fetchMemory();
    }, [id]);

    const deleteMemory = async (m_id) => {
        setDeleting(true);
        let doc, error;

        try {
            if (m_id === memory.id)
                doc = memory;
            else
                ({ data: doc } = await supabase.from("memories").select("*").eq("id", m_id).single());

            if (doc?.image_path)
                ({ error } = await supabase.storage.from("memory_images").remove([doc.image_path]));

            if (error) throw error;
        } catch (err) {
            console.error("[MEMORY] Unexpected error deleting previously exising memory image:", err);
            setDeleting(false);
        }

        try {
            ({ error } = await supabase.from("memories").delete().eq("id", m_id));
            if (error) throw error;
        } catch (err) {
            console.error("[MEMORY] Unexpected error deleting memory:", err);
            return toast.error("An unexpected error occurred, please try again later.");
        } finally {
            setDeleting(false);
        }

        toast.success("Memory deleted successfully.");
        navigate("/dashboard", { replace: true });
    };

    const generateInsights = async () => {
        if (!memory || memory.ai_insights) return;

        const loadingToast = toast.loading("Generating insights...");
        let data, error;

        try {
            ({ data, error } = await supabase.functions.invoke("generate-memory-insights", {
                body: JSON.stringify({
                    title: memory.title,
                    description: memory.description,
                    date: memory.date
                })
            }));

            if (error) throw error;
        } catch (err) {
            data = null;
            console.error("[MEMORY] Error generating insights:", err);
            return toast.error("Failed to generate insights. Please try again later.", { id: loadingToast });
        }

        await supabase.from("memories").update({ ai_insights: data }).eq("id", memory.id);

        toast.success("Insights generated successfully.", { id: loadingToast });

        setMemory(prev => ({
            ...prev,
            ai_insights: data
        }));
    };

    if (!id)
        return <span className="text-lg">The memory ID is not provided</span>;

    if (!memory && !loading)
        return <span className="text-lg">A memory plant with the given id does not exist</span>;

    if (loading)
        return (
            <div className="min-h-screen bg-zinc-950 flex flex-col gap-4 text-white text-center items-center justify-center" role="status" aria-live="polite" aria-label="Loading memory...">
                <div className="rounded-full w-25 h-25 border-10 border-cyan-500 border-dotted animate-[spin_3s_linear_infinite]"></div>
                <h1 className="text-2xl font-bold">Loading memory...</h1>
                <p className="text-sm text-zinc-400">
                    Please wait while we load your requested memory.
                    <br />
                    This may take a few seconds.
                </p>
            </div>
        );
    
    let tags = null;
    if (memory?.ai_insights?.tags) {
        tags = (<div className="flex gap-4 text-center flex-wrap justify-center items-center p-4">
            <span className="text-lg font-semibold">Tags:</span>

            {memory.ai_insights.tags.map((tag, index) => (
                <span key={index} className="text-sm bg-zinc-700 text-zinc-300 px-3 py-1 rounded-full">
                    #{tag}
                </span>
            ))}
        </div>);
    }

    const fMemory = {
        ...memory,
        date: new Date(memory.memory_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
        memory_date: null,
        mood: memory?.ai_insights?.mood ? `${memory.ai_insights.moodEmoji} ${memory.ai_insights.mood}` : null,
        ai_insights: null
    };

    return (
        <div className="flex flex-col gap-4 p-8 bg-zinc-900 rounded-2xl m-4 items-center">
            <Link to="/dashboard" className="self-start text-xs p-2 text-gray-400 hover:text-gray-300 transition-colors duration-200">&larr; Back to Dashboard</Link>
            
            {memory.img &&
                <div className="rounded-(--container-radius) p-(--container-padding) bg-white/15 backdrop-blur-md outline -outline-offset-1 outline-white/25 [--container-radius:var(--radius-3xl)] [--container-padding:--spacing(3)]">
                    <img
                        src={memory.img}
                        className="max-w-240 max-h-[50vh] rounded-[calc(var(--container-radius)-var(--container-padding))] object-contain"
                    />
                </div>}

            <div className="flex gap-4 items-center justify-center flex-wrap">
                <h1 className="font-semibold text-3xl sm:pl-16 md:pl-20">{memory.title}</h1>
                {fMemory.mood && <span className="rounded-full text-xs bg-purple-500/10 text-purple-400 uppercase font-medium px-3 py-1">{fMemory.mood}</span>}
            </div>
            <span className="text-gray-500 font-light">{fMemory.date}</span>
            {memory.description && <p className="max-w-xl text-center">{memory.description}</p>}

            {tags}

            <span className="text-xs">Created On: {new Date(memory.created_at).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</span>
            
            <div className="flex gap-4 mt-6">
                {!memory?.ai_insights &&
                    <button
                        className="rounded-3xl px-4 py-2 bg-cyan-500 hover:bg-cyan-400 transition-colors duration-200"
                        onClick={generateInsights}
                    >
                        Generate Insights
                    </button>}
                <Link
                    to={`/dashboard/edit/${id}`}
                    className="rounded-3xl px-4 py-2 bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200"
                >
                    Edit Memory
                </Link>
                <button
                    className="rounded-3xl px-4 py-2 bg-red-500 hover:bg-red-400 transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-red-300 disabled:hover:bg-red-300"
                    onClick={() => deleteMemory(memory.id)}
                    disabled={deleting}
                >
                    Delete Memory
                </button>
            </div>
        </div>
    );
};