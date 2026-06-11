/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState, useEffect } from "react";

import supabase from "../../utils/supabase";

export default function Edit() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [memory, setMemory] = useState(null);

    useEffect(() => {
        setLoading(true);
        async function loadMemory() {
            let data, error;

            try {
                ({ data, error } = await supabase.from("memories").select("*").eq("id", id).single());
            } catch (err) {
                console.error("[EDIT] Unexpected error while fetching memory", err);
                return alert("An unexpected error has occurred. Please try later.");
            }

            setMemory(data);
        }

        loadMemory();
    }, [id]);

    const handleEdit = (e) => {
        e.preventDefault();
    };

    return loading
        ? <span>Loading...</span>
        : (
            <div>
                <form onSubmit={handleEdit}>
                    <button
                        type="submit"
                        className="rounded-full font-bold bg-cyan-500 disabled:bg-cyan-300 disabled:hover:bg-cyan-300 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? "Saving Changes..." : "Save Changes"}
                    </button>
                </form>
            </div>
        );
};