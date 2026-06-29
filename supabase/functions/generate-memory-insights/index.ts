/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import "@supabase/functions-js/edge-runtime.d.ts";
import { GoogleGenAI } from "@google/genai";

const apiKey = Deno.env.get("GEMINI_API_KEY");
const genAI = new GoogleGenAI({ apiKey });

Deno.serve(async () => {
    const interaction = await genAI.interactions.create({
        model: "gemini-3.5-flash",
        input: "Summarize the following memory using the given details: date: November 3, 2024, title: First Hackathon, description: Stayed awake all night building ideas, drinking coffee, and learning more in 24 hours than in months.\n\nPlease provide a JSON object with the following keys: summary, mood, and tags."
    });
    return Response.json({ message: interaction.output_text });
});
