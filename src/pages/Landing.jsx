/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Link } from "react-router";

import { memories } from "../constants";

import Hero from "../components/home/Hero";

import Timeline from "../components/Timeline";

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

export default function Landing() {
    return (
        <main>
            <Hero />

            <section className="features bg-linear-to-b from-zinc-950 via-zinc-900 to-zinc-950 max-w-7xl mx-auto py-24 px-8" id="features">
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

                    <Timeline memories={memories} />
                </div>
            </section>

            <section className="cta flex flex-col relative overflow-hidden items-center text-center bg-zinc-950 py-24 px-8" id="cta">
                <div className="absolute -top-12 left-1/4 h-72 w-72 animate-pulse rounded-full bg-purple-500/20 opacity-30 blur-3xl"></div>
                <div className="absolute -bottom-12 right-1/4 h-80 w-80 rounded-full bg-cyan-500/30 opacity-30 blur-3xl"></div>
                <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-zinc-900/70 backdrop-blur shadow-2xl p-10 lg:p-16">
                    <div className="space-y-4">
                        <span className="text-purple-400 uppercase tracking-widest text-sm font-medium">START YOUR GARDEN</span>
                        <h3 className="text-4xl font-bold max-w-2xl mx-auto tracking-tight">Your story deserves to be remembered.</h3>
                        <h5 className="text-zinc-400 max-w-2xl mx-auto">Build a living timeline of your favorite moments and preserve them beautifully with Memory Garden.</h5>
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-10">
                        <Link to="/auth/signup" className="font-medium bg-white text-black px-6 py-3 rounded-xl hover:scale-105 transition-all">Create Your Garden</Link>
                        <a href="#timeline" className="font-medium border border-zinc-700 px-6 py-3 rounded-xl hover:bg-white/5 transition-all duration-300">View Demo Timeline</a>
                    </div>
                </div>
            </section>
        </main>
    );
};
