/**
 * MemoryGarden
 * Copyright (c) 2026 Puneet Gopinath
 * License: MIT (see LICENSE)
 */

import "@supabase/functions-js/edge-runtime.d.ts";
import { GoogleGenAI } from "@google/genai";

const apiKey = Deno.env.get("GEMINI_API_KEY");
const genAI = new GoogleGenAI({ apiKey });

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
};

Deno.serve(async (req) => {
    if (req.method === "OPTIONS") {
        return new Response("OK", {
            headers: corsHeaders
        });
    }

    const body = await req.json();

    if (!body)
        return Response.json({ error: "No body provided" }, {
            status: 400,
            headers: corsHeaders
        });

    if (!body.title || !body.description || !body.date)
        return Response.json({ error: "Missing required fields" }, {
            status: 400,
            headers: corsHeaders
        });

    const { title, description, date } = body;

    const response = await genAI.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: `
            Analyse this memory:\n${JSON.stringify({ title, description, date })}
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

    
    return Response.json({
        ...result,
        tags: [...new Set(result.tags.map((tag: string) => tag.toLowerCase().trim()))]
    }, {
        headers: corsHeaders
    });
});
