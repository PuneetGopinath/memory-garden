/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

export const VERSION = "0.3.0";

export const REPO_URL = "https://github.com/PuneetGopinath/memory-garden";

export const MACONDO_HOME = "https://macondo.hackclub.com";
export const HACKCLUB_HOME = "https://hackclub.com";

export const moodColors = [
    "bg-purple-500/10 text-purple-300 border-purple-500/20",
    "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    "bg-amber-500/10 text-amber-300 border-amber-500/20",
    "bg-blue-500/10 text-blue-300 border-blue-500/20",
    "bg-pink-500/10 text-pink-300 border-pink-500/20",
    "bg-violet-500/10 text-violet-300 border-violet-500/20",
    "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    "bg-sky-500/10 text-sky-300 border-sky-500/20",
    "bg-green-500/10 text-green-300 border-green-500/20",
    "bg-orange-500/10 text-orange-300 border-orange-500/20",
    "bg-red-500/10 text-red-300 border-red-500/20",
    "bg-fuchsia-500/10 text-fuchsia-300 border-fuchsia-500/20",
    "bg-teal-500/10 text-teal-300 border-teal-500/20",
    "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
];

export const markerColors = {
    purple: "bg-purple-400",
    cyan: "bg-cyan-400",
    blue: "bg-blue-400",
    amber: "bg-amber-400",
};

export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

export const memories = [
    {
        date: "November 3, 2024",
        img: "../assets/hackathon.png",
        title: "First Hackathon",
        description: "Stayed awake all night building ideas, drinking coffee, and learning more in 24 hours than in months.",
        mood: "⚡ Excited",
        dot: "purple",
    },
    {
        date: "January 13, 2025",
        img: "../assets/temple.png",
        title: "Temple Festival Night",
        description: "The streets glowed with lamps, music echoed through the air, and the entire evening felt timeless.",
        mood: "🪔 Spiritual",
        dot: "amber",
    },
    {
        date: "March 28, 2025",
        img: "../assets/drive.png",
        title: "Rainy Evening Drive",
        description: "Driving through empty roads while rain tapped softly against the windows felt strangely peaceful.",
        mood: "🌧 Reflective",
        dot: "blue",
    },
    {
        date: "July 18, 2025",
        img: "../assets/kerala.png",
        title: "Trip to Kerala",
        description: "A peaceful evening beside the backwaters with family and friends.",
        mood: "🌊 Peaceful",
        dot: "cyan",
    },
]
    .map(m => ({ ...m, markdown: false }));
