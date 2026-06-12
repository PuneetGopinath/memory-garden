/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Link } from "react-router";

function TimelineEvent({ date, title, description, img, clockwise, mood, link }) {
    return (
        <Link to={link} className="block">
            <div className={`relative overflow-hidden ${clockwise ? "rotate-1" : "-rotate-1"} hover:rotate-0 hover:scale-[1.02] transition-transform duration-300 min-h-[24rem] min-w-[20rem] w-full max-w-sm p-6 rounded-3xl bg-zinc-900/70 border border-white/10 backdrop-blur-xl shadow-2xl`}>
                {img
                    ? <img src={img} alt={title} className="h-44 w-full object-cover rounded-2xl hover:scale-103 transition-transform duration-300" />
                    : <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-500 hover:scale-103 transition-transform duration-300"></div>}
                <div className="space-y-3 mt-4">
                    <p className="text-sm text-zinc-400">{date}</p>
                    <h5 className="text-xl font-semibold">{title}</h5>
                    {description && <p className="text-zinc-400 leading-relaxed">{description}</p>}
                    {mood && <span className="inline-flex hover:translate-y-[-2px] transition-transform duration-300 items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide bg-purple-500/10 border border-purple-500/20 text-purple-300">{mood}</span>}
                </div>
            </div>
        </Link>
    );
}

const colors = {
    purple: "bg-purple-400",
    cyan: "bg-cyan-400",
    blue: "bg-blue-400",
    amber: "bg-amber-400"
};

export default function MemoryCard({ column, dot = "purple", ...props }) {
    if ([1, 2].indexOf(column) === -1)
        throw new Error("Invalid column number for MemoryCard. Must be 1 or 2.");

    const clockwise = column === 2;

    return (
        <div className="relative z-10 flex items-start justify-between">
            <div className={`w-5/12 ${column === 1 ? "flex justify-end" : ""}`}>
                {column === 1 && <TimelineEvent {...props} clockwise={clockwise} /> /* Column 1 */}
            </div>

            <div className="relative flex justify-center w-2/12 pt-32">
                <div className={`h-5 w-5 rounded-full ${colors[dot]} shadow-lg shadow-purple-500/50 z-10`}></div>
            </div>

            <div className={`w-5/12 ${column === 2 ? "flex justify-start" : ""}`}>
                {column === 2 && <TimelineEvent {...props} clockwise={clockwise} /> /* Column 2 */}
            </div>
        </div>
    );
};