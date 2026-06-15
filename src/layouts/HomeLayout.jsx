/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Outlet } from "react-router";

import Navbar from "../components/home/Navbar";
import Footer from "../components/Footer";

export default function HomeLayout() {
    return (
        <div className="bg-zinc-950 text-white">
            <header>
                <Navbar />
            </header>
            
            <Outlet />

            <Footer />
        </div>
    );
};