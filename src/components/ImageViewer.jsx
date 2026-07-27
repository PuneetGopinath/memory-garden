/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

export default function ImageViewer({ open = false, src = "", alt = "", onClose }) {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur"
            onClick={onClose}
        >
            <img
                src={src}
                alt={alt}
                className="max-w-[90vw] max-h-[90vh] rounded-lg object-contain"
                onClick={(e) => e.stopPropagation()}
            />
            <button
                onClick={onClose}
                className="absolute top-6 right-6 text-3xl text-white p-2 rounded-lg border border-gray-200 hover:text-gray-300 transition-colors duration-200"
            >
                x
            </button>
        </div>
    );
};
