/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { markerColors } from "../constants";

import MemoryCard from "./MemoryCard";

export default function MemoryRow({ column, markerColor = "purple", ...props }) {
    if ([1, 2].indexOf(column) === -1)
        throw new Error("Invalid column number for MemoryRow. Must be 1 or 2.");

    const clockwise = column === 2;

    return (
        <div className="relative z-10 flex items-start justify-between">
            <div className={`w-5/12 ${column === 1 ? "flex justify-end" : ""}`}>
                {column === 1 && <MemoryCard {...props} clockwise={clockwise} /> /* Column 1 */}
            </div>

            <div className="relative flex justify-center w-2/12 pt-32">
                <div className={`h-5 w-5 rounded-full ${markerColors[markerColor]} shadow-lg shadow-purple-500/50 z-10`}></div>
            </div>

            <div className={`w-5/12 ${column === 2 ? "flex justify-start" : ""}`}>
                {column === 2 && <MemoryCard {...props} clockwise={clockwise} /> /* Column 2 */}
            </div>
        </div>
    );
};
