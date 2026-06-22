/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import { Link } from "react-router";

export default function Privacy() {
    return (
        <main className="flex flex-col bg-zinc-950 min-h-screen items-center gap-6 pt-30">
            <section className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8 max-w-2xl text-center">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="text-sm text-gray-400 mb-4">Last Updated: June 22, 2026</p>
                <p className="text-lg mb-4">
                    We only collect information necessary to provide our service to you.
                    This includes your email address for account creation and authentication, uploaded memories, images and the metadata required to operate on our platform.
                    We do not sell your data to third parties.
                    For more details, please refer to our <Link to="/terms" className="text-blue-400 hover:underline">Terms of Service</Link>.
                    We store your data securely at our trusted third-party, <a href="https://supabase.com" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Supabase</a>.
                </p>
                <p className="text-normal italic mb-4">
                    This policy is subject to change, and we encourage you to review it periodically.
                    We may notify users of any significant changes when appropriate before they take effect.
                </p>
            </section>
        </main>
    );
};