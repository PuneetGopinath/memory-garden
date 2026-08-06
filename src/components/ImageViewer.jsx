/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { useEffect } from "react";

export default function ImageViewer({ open = false, src = "", alt = "", onClose }) {
    useEffect(() => {
        if (!open) return;

        document.body.style.overflow = "hidden";

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label="Image Viewer"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-xs"
            onClick={onClose}
        >
            <img
                src={src}
                alt={alt}
                className="max-w-[80vw] max-h-[80vh] rounded-lg object-contain border border-white/20"
                onClick={(e) => e.stopPropagation()}
            />
            
            <button
                onClick={onClose}
                className="absolute top-10 right-10 cursor-pointer text-2xl flex justify-center items-center w-12 h-12 text-white bg-zinc-900/80 rounded-xl border border-white/15 hover:border-white/25 hover:bg-zinc-800 hover:text-zinc-200 transition-all duration-200"
                aria-label="Close Image Viewer"
            >
                &times;
            </button>
        </div>
    );
};
