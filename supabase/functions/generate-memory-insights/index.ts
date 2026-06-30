/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import "@supabase/functions-js/edge-runtime.d.ts";
import { GoogleGenAI } from "@google/genai";

const apiKey = Deno.env.get("GEMINI_API_KEY");
const genAI = new GoogleGenAI({ apiKey });

Deno.serve(async (req) => {
    const body = await req.json();

    if (!body) return Response.json({ error: "No body provided" }, { status: 400 });

    const response = await genAI.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: `
            Analyse this memory:\n${JSON.stringify(body)}
        `,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: "object",
                properties: {
                    mood: { type: "string" },
                    moodEmoji: { type: "string" },
                    tags: { type: "array", items: { type: "string" } }
                },
                required: ["mood", "moodEmoji", "tags"],
                additionalProperties: false
            }
        }
    });

    const result = JSON.parse(response.text ?? "");
    console.log(response.text);
    return Response.json(result);
});
