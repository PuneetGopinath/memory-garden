/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import MemoryCard from "./MemoryCard";

export default function Timeline({ memories, className = "", links = false }) {
    const memoriesWithColumns = memories.map((m, i) => i % 2 === 0 ? { ...m, column: 2 } : { ...m, column: 1 });
    const cards = memoriesWithColumns.map((m, i) => (
        <MemoryCard key={m?.id ?? i} {...m} link={links ? `memory/${m.id}` : undefined} />
    ));

    return (
        <div className={`relative space-y-32 ${className}`}>
            <div className="absolute pointer-events-none z-0 left-1/2 -translate-x-1/2 top-0 h-full w-px bg-linear-to-b from-purple-500/40 via-white/10 to-cyan-500/40"></div>

            {cards}
        </div>
    );
};
