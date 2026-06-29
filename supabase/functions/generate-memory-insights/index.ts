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

    const response = await genAI.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: `
            Analyse this memory: date: November 3, 2024, title: First Hackathon, description: Stayed awake all night building ideas, drinking coffee, and learning more in 24 hours than in months.
        `,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "object",
                properties: {
                    summary: { type: "string" },
                    mood: { type: "string" },
                    moodEmoji: { type: "string" },
                    tags: { type: "array", items: { type: "string" } }
                },
                required: ["summary", "mood", "moodEmoji", "tags"],
                additionalProperties: false
            }
        }
    });

    const result = JSON.parse(response.text ?? "");
    console.log(response.text);
    return Response.json(result);
});
