/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { createContext } from "react";

export const AuthContext = createContext({
    state: "unauthenticated", // "loading" | "authenticated" | "unauthenticated"
    user: null
});