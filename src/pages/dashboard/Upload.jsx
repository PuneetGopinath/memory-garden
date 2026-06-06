/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import supabase from "../../utils/supabase";

export default function Upload() {
    const handleUpload = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="text-white bg-zinc-900/60 rounded-3xl border border-white/10 backdrop-blur max-w-lg mx-auto p-8 mb-12">
            <div className="text-center font-semibold mb-2">
                <h1 className="text-4xl font-semibold mb-4">Upload Memories</h1>
                <p className="text-zinc-400">Add memories to your memory garden</p>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
                <label className="block">
                    <span className="text-sm font-medium">Title <span className="text-red-500">*</span></span>
                    <input
                        type="text"
                        name="title"
                        className="mt-1 w-full rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-500/40"
                        required
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium">Description</span>
                    <textarea
                        name="description"
                        className="mt-1 w-full rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-500/40"
                        rows="6"
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium">Date <span className="text-red-500">*</span></span>
                    <input
                        type="date"
                        name="memory_date"
                        className="mt-1 w-full rounded-lg bg-zinc-800/50 border border-white/10 px-4 py-2 focus:outline-none focus:border-cyan-500/40"
                        required
                    />
                </label>

                <label className="block">
                    <span className="text-sm font-medium">Image</span>
                    <input
                        type="file"
                        name="image"
                        className="mt-1 w-full text-sm text-zinc-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/70 file:text-white hover:file:bg-cyan-500/80 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:ring-offset-2"
                        accept="image/*"
                    />
                </label>

                <button
                    type="submit"
                    className="mt-4 w-full rounded-lg bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 px-4 py-2 text-white font-medium"
                >
                    Plant Memory
                </button>
            </form>
        </div>
    );
};