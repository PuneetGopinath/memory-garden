/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Link } from "react-router";

import Hero from "../components/landing/Hero";
import Footer from "../components/Footer";

function FeatureCard({ title, description, metadata }) {
    return (
        <div className="p-6 h-full rounded-2xl bg-zinc-900/50 border border-white/10 backdrop-blur shadow-lg hover:border-purple-500/20 transition-all duration-300">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                {metadata && <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide bg-purple-500/10 border border-purple-500/20 text-purple-300 animate-pulse">{metadata}</span>}
            </div>
            <p className="text-zinc-400">{description}</p>
        </div>
    );
}

function TimelineEvent({ date, title, description, img, clockwise, mood }) {
    return (
        <div className={`relative overflow-hidden ${clockwise ? "rotate-1" : "-rotate-1"} hover:rotate-0 hover:scale-[1.02] transition-transform duration-300 min-h-[24rem] w-full max-w-sm p-6 rounded-3xl bg-zinc-900/70 border border-white/10 backdrop-blur-xl shadow-2xl`}>
            <img src={img} alt={title} className="hover:scale-103 transition-transform duration-300 h-44 w-full bg-gradient-to-br from-purple-500 to-cyan-500 object-cover rounded-2xl" />
            <div className="space-y-3 mt-4">
                <p className="text-sm text-zinc-400">{date}</p>
                <h5 className="text-xl font-semibold">{title}</h5>
                <p className="text-zinc-400 leading-relaxed">{description}</p>
                {mood && <span className="inline-flex hover:translate-y-[-2px] transition-transform duration-300 items-center rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wide bg-purple-500/10 border border-purple-500/20 text-purple-300">{mood}</span>}
            </div>
        </div>
    );
}

export default function Landing() {
    return (
        <>
            <Hero />

            <main className="text-white">
                <section className="features bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 max-w-7xl mx-auto py-24 px-8" id="features">
                    <div className="space-y-4">
                        <span className="text-purple-400 uppercase tracking-widest text-sm font-medium">FEATURES</span>
                        <h3 className="text-4xl font-bold tracking-tight">Built for preserving moments that matter.</h3>
                        <h5 className="text-zinc-400 max-w-2xl">Memory Garden combines AI, storytelling and timelines to help you relive your memories beautifully.</h5>
                    </div>
                    <div className="w-full py-16 grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                        <FeatureCard title="AI Memory Summaries" description="Get concise summaries of your memories, curated by AI highlighting key moments and emotions." />
                        <FeatureCard title="Timeline Visualization" description="Organize your memories in a interactive timeline that brings your past to life." />
                        <FeatureCard title="Smart Tagging" description="Automatically tag your memories by people, places and emotions using AI." />
                        <FeatureCard title="Private Capsules" description="Create time-locked memory capsules to share with loved ones in the future." metadata="UPCOMING" />
                    </div>
                </section>

                <section className="timeline bg-zinc-900" id="timeline">
                    <div className="max-w-7xl mx-auto py-24 px-8">
                        <div className="text-center space-y-4 mb-20">
                            <span className="text-purple-400 uppercase tracking-widest text-sm font-medium">TIMELINE</span>
                            <h3 className="text-4xl lg:text-5xl font-bold tracking-tight">Your journey, beautifully organized.</h3>
                            <h5 className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">See your life unfold through a visually stunning timeline that connects your most cherished moments.</h5>
                        </div>
                        <div className="relative space-y-32">
                            <div className="absolute pointer-events-none z-0 left-1/2 -translate-x-1/2 top-0 h-full w-px bg-gradient-to-b from-purple-500/40 via-white/10 to-cyan-500/40"></div>

                            <div className="relative z-10 flex items-start justify-between">
                                <div className="w-5/12"></div>

                                <div className="relative flex justify-center w-2/12 pt-32">
                                    <div className="h-5 w-5 rounded-full bg-purple-400 shadow-lg shadow-purple-500/50 z-10"></div>
                                </div>

                                <div className="w-5/12 flex justify-start">
                                    <TimelineEvent date="November 3, 2024" img="../assets/hackathon.png" title="First Hackathon" description="Stayed awake all night building ideas, drinking coffee, and learning more in 24 hours than in months." clockwise={true} mood="⚡ Excited" />
                                </div>
                            </div>

                            <div className="relative z-10 flex items-start justify-between">
                                <div className="w-5/12 flex justify-end">
                                    <TimelineEvent date="January 13, 2025" img="../assets/temple.png" title="Temple Festival Night" description="The streets glowed with lamps, music echoed through the air, and the entire evening felt timeless." clockwise={false} mood="🪔 Spiritual" />
                                </div>

                                <div className="relative flex justify-center w-2/12 pt-32">
                                    <div className="h-5 w-5 rounded-full bg-amber-400 shadow-lg shadow-amber-500/50 z-10"></div>
                                </div>

                                <div className="w-5/12"></div>
                            </div>

                            <div className="relative z-10 flex items-start justify-between">
                                <div className="w-5/12"></div>

                                <div className="relative flex justify-center w-2/12 pt-32">
                                    <div className="h-5 w-5 rounded-full bg-blue-400 shadow-lg shadow-blue-500/50 z-10"></div>
                                </div>

                                <div className="w-5/12 flex justify-start">
                                    <TimelineEvent date="March 28, 2025" img="../assets/drive.png" title="Rainy Evening Drive" description="Driving through empty roads while rain tapped softly against the windows felt strangely peaceful." clockwise={true} mood="🌧 Reflective" />
                                </div>
                            </div>

                            <div className="relative z-10 flex items-start justify-between">
                                <div className="w-5/12 flex justify-end">
                                    <TimelineEvent date="July 18, 2025" img="../assets/kerala.png" title="Trip to Kerala" description="A peaceful evening beside the backwaters with family and friends." clockwise={false} mood="🌊 Peaceful" />
                                </div>

                                <div className="relative flex justify-center w-2/12 pt-32">
                                    <div className="h-5 w-5 rounded-full bg-cyan-400 shadow-lg shadow-cyan-500/50 z-10"></div>
                                </div>

                                <div className="w-5/12"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
};