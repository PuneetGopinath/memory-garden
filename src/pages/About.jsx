/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { REPO_URL, MACONDO_HOME, HACKCLUB_HOME } from "../constants";

export default function About() {
    return (
        <div className="bg-zinc-950 text-white">
            <main className="flex flex-col min-h-screen items-center gap-6 pt-30">
                <section className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8 max-w-2xl text-center">
                    <h1 className="text-3xl font-bold mb-4">About Us</h1>
                    <p className="text-lg mb-4">
                        Memory Garden is a service provided to protect and preserve your memories.
                        Our goal is to provide a space where people can store and reflect on their cherished moments.
                        We say that memories are an vital part of our lives, and we try to make sure that they are preserved in a way that is meaningful and accessible.
                    </p>
                </section>

                <hr className="w-[80%] border-white/20 my-8" />

                <section className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8 max-w-2xl text-center">
                    <h2 className="text-2xl font-bold mb-4">About The Author</h2>
                    <p className="text-lg mb-4">
                        Puneet Gopinath is a curious guy exploring the world of software.
                        With love for engineering meaningful digital experiences, he started Memory Garden as a hobby project to improve his web development skills.
                        One of the main motivations behind Memory Garden is to participate in <a href={MACONDO_HOME} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Macondo</a>, an event hosted by <a href={HACKCLUB_HOME} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Hack Club</a>.
                    </p>
                </section>

                <hr className="w-[80%] border-white/20 my-8" />

                <section className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8 max-w-2xl text-center">
                    <h2 className="text-2xl font-bold mb-4">Open Source</h2>
                    <p className="text-lg mb-4">
                        <a href={REPO_URL} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Memory Garden</a> is open source on GitHub under MIT License.
                        Contributions are welcome, you can open a <a href={`${REPO_URL}/pulls`} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">pull request</a> to contribute!
                        If you have ideas, or want to report bugs, check out the <a href={`${REPO_URL}/issues`} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">issues</a> page.
                    </p>
                </section>
            </main>
        </div>
    );
};
