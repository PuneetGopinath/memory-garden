/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

export default function FeatureCard({ title, description, metadata }) {
    return (
        <div className="p-6 h-full rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur shadow-lg hover:border-purple-500/20 transition-colors duration-300">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                {metadata && <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide bg-purple-500/10 border border-purple-500/20 text-purple-300 animate-pulse">{metadata}</span>}
            </div>
            <p className="text-zinc-400">{description}</p>
        </div>
    );
};
