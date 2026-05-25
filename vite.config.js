import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

export default defineConfig({
    root: "./src",
    plugins: [
        react(),
        tailwindcss()
    ],
    build: {
        outDir: "./client-dist",
        emptyOutDir: true,
    }
});