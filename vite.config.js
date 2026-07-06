import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        root: "./src",
        publicDir: "../public",
        plugins: [
            react(),
            tailwindcss(),
        ],
        server: {
            port: Number(env.PORT) || 3000,
        },
        build: {
            outDir: "./client-dist",
            emptyOutDir: true,
        },
    };
});
