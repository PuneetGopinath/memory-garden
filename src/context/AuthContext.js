/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { createContext } from "react";

const AuthContext = createContext({
    state: "loading",
    user: null,
});

export default AuthContext;
