/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router";

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
                console.error("[MEMORY] Unexpected error fetching memory:", err);
                return alert("An unexpected error occurred while fetching the memory. Please try again later.");
            }

            data.date = new Date(data.memory_date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

            if (data.image_path) {
                const { data: imgData, error: imgError } = await supabase.storage.from("memory_images").createSignedUrl(data.image_path, 60 * 60);
                
                if (imgError)
                    console.error("[MEMORY] Error fetching memory image:", imgError);

                data.img = imgData?.signedUrl || null;
            }

            setMemory(data);
            setLoading(false);
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
            console.error("[MEMORY] Unexpected error deleting memory image:", err);
            setDeleting(false);
        }

        try {
            ({ error } = await supabase.from("memories").delete().eq("id", m_id));
            if (error) throw error;
        } catch (err) {
            console.error("[MEMORY] Unexpected error deleting memory:", err);
            return alert("An unexpected error occurred, please try again later.");
        } finally {
            setDeleting(false);
        }

        alert("Memory deleted successfully.");
        navigate("/dashboard");
    };

    if (!id)
        return <span className="text-lg">The memory ID is not provided</span>;

    if (!memory && !loading)
        return <span className="text-lg">A memory plant with the given id does not exist</span>;

    return (
        loading
            ? <span className="text-white text-center">Loading...</span>
            : (
                <div className="flex flex-col gap-4 p-8 bg-zinc-900 rounded-2xl m-4 items-center">
                    <Link to="/dashboard" className="self-start text-xs text-gray-400 hover:text-gray-300 transition-colors duration-200">&larr; Back to Dashboard</Link>
                    {memory.img && <img src={memory.img} className="max-w-[60rem] max-h-[30rem] rounded-2xl border border-gray-600 object-contain" />}
                    <h1 className="font-semibold text-3xl">{memory.title}</h1>
                    <span className="text-gray-500 font-light">{memory.date}</span>
                    {memory.description && <p className="mt-4 max-w-xl text-center">{memory.description}</p>}
                    <span className="text-xs">Created At: {new Date(memory.created_at).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</span>
                    
                    
                    <div className="flex gap-4 mt-6">
                        <Link
                            to={`/dashboard/edit/${id}`}
                            className="rounded-3xl p-4 bg-yellow-500 hover:bg-yellow-400 transition-colors duration-200"
                        >
                            Edit Memory
                        </Link>
                        <button
                            className="rounded-3xl p-4 bg-red-500 hover:bg-red-400 transition-colors duration-200 disabled:cursor-not-allowed disabled:bg-red-300 disabled:hover:bg-red-300"
                            onClick={() => deleteMemory(memory.id)}
                            disabled={deleting}
                        >
                            Delete Memory
                        </button>
                    </div>
                </div>
            )
    );
};