/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useState } from "react";

import MemoryCard from "./MemoryCard";
import ImageViewer from "./ImageViewer";

export default function Timeline({ memories, className = "", links = false }) {
    const [viewer, setViewer] = useState({ open: false, src: "", alt: "" });

    const handleImageClick = (src, alt) => 
        setViewer({
            open: true,
            src,
            alt,
        });
    ;

    const memoriesWithColumns = memories.map((m, i) => i % 2 === 0 ? { ...m, column: 2 } : { ...m, column: 1 });
    const cards = memoriesWithColumns.map(m => (
        <MemoryCard
            key={m?.id}
            {...m}
            link={links ? `memory/${m.id}` : undefined}
            onImageClick={handleImageClick}
        />
    ));

    return (
        <>
            <ImageViewer
                open={viewer.open}
                src={viewer.src}
                alt={viewer.alt}
                onClose={() => setViewer({ open: false, src: "", alt: "" })}
            />

            <div className={`relative space-y-32 ${className}`}>
                <div className="absolute pointer-events-none z-0 left-1/2 -translate-x-1/2 top-0 h-full w-px bg-linear-to-b from-purple-500/40 via-white/10 to-cyan-500/40"></div>

                {cards}
            </div>
        </>
    );
};
