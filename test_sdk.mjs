import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { findNearbyEmergencyServices, findNearbyFood, findNearbyAttractions, findLocalGuides } from './lib/agents/tools.js';

async function run() {
  try {
    const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!key) throw new Error("MISSING API KEY IN DOTENV");
    const google = createGoogleGenerativeAI({
      apiKey: key,
    });

    console.log("Triggering streamText with maxSteps 10...");
    const result = await streamText({
      model: google('gemini-2.5-flash'),
      system: `You are the SmartTour Kerala Travel Agency. Your goal is to plan multi-day trips. Do not ask for missing details. Assume constraints. Use findNearbyAttractions for the target city. Output markdown.`,
      messages: [{ role: 'user', content: 'Plan a 2-day trip to Munnar and Kochi' }],
      tools: {
        findNearbyEmergencyServices,
        findNearbyFood,
        findNearbyAttractions,
        findLocalGuides
      },
      maxSteps: 10,
    });

    console.log("Stream successfully connected. Keys:", Object.keys(result));
    
    // Process stream chunks manually
    try {
      for await (const chunk of result.fullStream) {
        console.log("CHUNK:", chunk.type);
      }
    } catch (streamErr) {
       console.error("STREAM ABORTED EXCEPTION:", streamErr);
    }
    
  } catch (err) {
    console.error("FATAL ERROR BEFORE STREAM:", err);
  }
}

run();
