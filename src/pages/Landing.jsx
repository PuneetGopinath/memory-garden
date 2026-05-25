/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import Hero from "../components/landing/Hero";
import Footer from "../components/Footer";

export default function Landing() {
    return (
        <>
            <Hero />

            <main>
                <section className="memories"></section>

                <section className="features"></section>

                <section className="timeline"></section>

                <section className="cta"></section>
            </main>

            <Footer />
        </>
    );
};