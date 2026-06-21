/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

export default function About() {
    return (
        <div className="bg-zinc-950 text-white">
            <main className="flex flex-col min-h-screen items-center gap-6 pt-30">
                <section className="bg-zinc-950/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8 max-w-2xl text-center">
                    <h1 className="text-3xl font-bold mb-4">About Us</h1>
                    <p className="text-lg mb-4">
                        Memory Garden is a platform dedicated to preserving and sharing memories. Our mission is to provide a space where individuals can create, store, and reflect on their cherished moments. We believe that memories are an essential part of our lives, and we strive to make it easy for people to keep them alive.
                    </p>
                </section>

                <hr className="w-[80%] border-white/20 my-8" />

                <section className="bg-zinc-950/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8 max-w-2xl text-center">
                    <h2 className="text-2xl font-bold mb-4">About The Author</h2>
                    <p className="text-lg mb-4">
                        Puneet Gopinath is a young and curious explorer of the software realm. With a passion for creating meaningful digital experiences, he started Memory Garden as a hobby project to sharpen his web development skills. One of the main motivations behind Memory Garden is to participate in <a href="https://macondo.hackclub.com/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Macondo</a>, an event hosted by <a href="https://hackclub.com/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Hack Club</a>.
                    </p>
                </section>
            </main>
        </div>
    );
};