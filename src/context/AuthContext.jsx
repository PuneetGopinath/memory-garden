/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { createContext, useState, useEffect } from "react";

import supabase from "../utils/supabase";

export const AuthContext = createContext({
    state: "loading",
    user: null,
});

export default function AuthProvider({ children }) {
    const [state, setState] = useState("loading");
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function initialize() {
            const { data: { session } } = await supabase.auth.getSession();

            setUser(session?.user ?? null);
            setState(session ? "authenticated" : "unauthenticated");
        }

        initialize();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
            setState(session ? "authenticated" : "unauthenticated");
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ state, user }}>
            {children}
        </AuthContext.Provider>
    );
};
