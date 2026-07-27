/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

export default function ImageViewer({ open = false, src = "", alt = "", onClose }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur">
            <img
                src={src}
                alt={alt}
                className="max-w-240 max-h-[90vh] rounded-lg object-contain"
            />
        </div>
    );
};
