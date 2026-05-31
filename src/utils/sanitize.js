/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

export default function sanitize(input, type) {
    switch (type) {
        case "email":
            return input.trim().toLowerCase();
        case "username":
            return input.trim().replace(/[^A-Za-z0-9_]/g, "");
        case "password":
            return input;
        default:
            return input.trim();
    }
};