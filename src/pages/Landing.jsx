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
            </main>

            <Footer />
        </>
    );
};