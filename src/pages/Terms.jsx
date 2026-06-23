/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

export default function Terms() {
    return (
        <main className="flex flex-col bg-zinc-950 min-h-screen items-center gap-6 pt-30">
            <section className="bg-zinc-900/60 border border-white/10 rounded-3xl backdrop-blur shadow-2xl p-8 max-w-2xl text-center">
                <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
                <p className="text-sm text-gray-400 mb-4">Last Updated: June 23, 2026</p>
                <p className="text-lg mb-4">
                    By using Memory Garden, you agree to the following terms and conditions.
                    You are responsible for maintaining the confidentiality of your account and password.
                    You shall not use the service for any illegal or unauthorized purpose.
                    The service is provided "as is" without guarantees of uptime or availability.
                    Users are responsible for the content they upload, and Memory Garden reserves the right to remove content that violates these terms, applicable laws, or may harm the platform or its users.
                    Users retain ownership of the content they upload.
                    Memory Garden reserves the right to suspend or terminate accounts that violate these terms or that may harm the platform, its users, or its operation.
                </p>
                <p className="text-sm italic mb-4 text-gray-400">
                    These terms are subject to change, and we encourage you to review them periodically.
                    We may notify users of any significant changes when appropriate before they take effect.
                </p>
            </section>
        </main>
    );
};