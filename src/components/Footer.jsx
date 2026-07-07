/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

export default function Footer({ children }) {
    return (
        <footer className="border-t border-white/10 flex flex-col items-center bg-zinc-950 text-white text-center py-4 mt-8">
            {children}

            <span className="text-md font-medium text-zinc-100 mb-2">
                &copy; 2026 Puneet Gopinath. All rights reserved.
            </span>

            <span className="text-sm text-zinc-400">
                Free during beta • Built for meaningful memories
            </span>
        </footer>
    );
};
