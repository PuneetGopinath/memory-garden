/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
    const { user } = useContext(AuthContext);

    return (
        <div className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8">
            <h1 className="text-2xl font-bold">Hi there, {user?.user_metadata?.username}</h1>

            <section className="mt-6 flex flex-col gap-2 text-sm text-zinc-400">
                <span>Email Address: {user?.email}</span>
                <span>Account Created: {new Date(user?.created_at).toString()}</span>
            </section>
        </div>
    );
};