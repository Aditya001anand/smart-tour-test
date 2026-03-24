import { generateObject } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod';

export async function POST(req) {
  try {
    console.log('--- ORCHESTRATOR ENDPOINT HIT ---');
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;
    
    if (!apiKey) {
      console.error("Missing Google AI API Key. Please add GEMINI_API_KEY to your .env.local file.");
      return new Response(JSON.stringify({ error: "Server configuration error: Missing Gemini API Key." }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const google = createGoogleGenerativeAI({
      apiKey: apiKey,
    });

    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(JSON.stringify({ error: "Prompt is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    let category = 'plan_trip'; // safe default
    try {
      const result = await generateObject({
        model: google('gemini-2.5-flash'),
        system: 'You are the Orchestrator Agent for SmartTour, a Kerala tourism app. Your only job is to read the user input and categorize their intent.',
        prompt,
        schema: z.object({
          category: z.enum([
            'plan_trip',
            'find_attractions',
            'food_search',
            'language_help',
            'book_guide',
            'emergency'
          ]),
          target_city: z.string().describe("The specific Kerala city the user wants to visit, if applicable").optional(),
          target_days: z.number().describe("The number of days for the trip, if applicable").optional()
        }),
        maxRetries: 0,
      });
      category = result.object.category;
      
      return new Response(JSON.stringify({ 
        category,
        city: result.object.target_city,
        days: result.object.target_days
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (orchError) {
      console.warn('Orchestrator generateObject failed, falling back to plan_trip:', orchError.message);
      // Return fallback — app keeps flowing
      return new Response(JSON.stringify({ category }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  } catch (error) {
    console.error("Orchestrator error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to orchestrate", details: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
