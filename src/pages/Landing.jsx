/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Link } from "react-router";

import { memories, features } from "../constants";

import Hero from "../components/home/Hero";
import FeatureCard from "../components/home/FeatureCard";
import Timeline from "../components/Timeline";

export default function Landing() {
    return (
        <main>
            <Hero />

            <section className="features overflow-hidden bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950 max-w-7xl mx-auto py-24 px-8" id="features">
                <div className="space-y-4">
                    <span className="text-purple-400 uppercase tracking-widest text-sm font-medium">FEATURES</span>
                    <h3 className="text-4xl font-bold tracking-tight">Features that make your memories alive.</h3>
                    <h5 className="text-zinc-400 max-w-2xl">We combine Artificial Intelligence and timelines to make you nostalgic of your favorite moments.</h5>
                </div>
                <div className="relative w-full py-16 grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <div className="pointer-events-none absolute -top-20 md:-left-20 md:top-auto h-90 w-90 rounded-full bg-green-500/50 opacity-30 blur-3xl"></div>
                    <div className="pointer-events-none absolute -bottom-20 md:-right-20 md:bottom-auto h-90 w-90 rounded-full bg-cyan-500/50 opacity-30 blur-3xl"></div>
                    {features.map(f => (
                        <FeatureCard key={f.id} {...f} />
                    ))}
                </div>
            </section>

            <section className="timeline bg-zinc-900" id="timeline">
                <div className="max-w-7xl mx-auto py-24 px-8">
                    <div className="text-center space-y-4 mb-20">
                        <span className="text-purple-400 uppercase tracking-widest text-sm font-medium">TIMELINE</span>
                        <h3 className="text-4xl lg:text-5xl font-bold tracking-tight">Gorgeous visualization of memories.</h3>
                        <h5 className="text-zinc-400 max-w-2xl mx-auto leading-relaxed">See your voyage to remember the moments that you cherish.</h5>
                    </div>

                    <Timeline memories={memories} />
                </div>
            </section>

            <section className="cta flex flex-col relative overflow-hidden items-center text-center bg-zinc-950 py-24 px-8" id="cta">
                <div className="pointer-events-none absolute -top-12 left-1/4 h-72 w-72 animate-pulse rounded-full bg-purple-500/50 opacity-30 blur-3xl"></div>
                <div className="pointer-events-none absolute -bottom-12 right-1/4 h-80 w-80 rounded-full bg-cyan-500/60 opacity-30 blur-3xl"></div>
                <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-zinc-900/70 backdrop-blur shadow-2xl p-10 lg:p-16">
                    <div className="space-y-4">
                        <span className="text-purple-400 uppercase tracking-widest text-sm font-medium">START YOUR GARDEN</span>
                        <h3 className="text-4xl font-bold max-w-2xl mx-auto tracking-tight">Your story deserves to be alive in your brains.</h3>
                        <h5 className="text-zinc-400 max-w-2xl mx-auto">Build a timeline of your nostalgic moments and store them wonderfully using Memory Garden.</h5>
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-10">
                        <Link to="/auth/signup" className="font-medium bg-white text-black px-6 py-3 rounded-xl hover:scale-102 transition-all">Create Your Garden</Link>
                        <a href="#timeline" className="font-medium border border-zinc-700 px-6 py-3 rounded-xl hover:bg-white/5 transition-all duration-300">View Demo Timeline</a>
                    </div>
                </div>
            </section>
        </main>
    );
};
