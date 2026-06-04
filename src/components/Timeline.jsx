/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import MemoryCard from "./MemoryCard";

export default function Timeline({ memories }) {
    const cards = memories.map((m, i) => (
        <MemoryCard key={m?.id ?? i} {...m} />
    ));

    return (
        <div className="relative space-y-32">
            <div className="absolute pointer-events-none z-0 left-1/2 -translate-x-1/2 top-0 h-full w-px bg-gradient-to-b from-purple-500/40 via-white/10 to-cyan-500/40"></div>

            {cards}
        </div>
    );
};