import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { findLocalGuides, findNearbyEmergencyServices } from '@/lib/agents/tools';

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'Missing GEMINI_API_KEY in environment.' }), { status: 500 });
    }

    const google = createGoogleGenerativeAI({ apiKey });

    const reqBody = await req.json();

    if (!(reqBody.messages || []).length) {
      return new Response(JSON.stringify({ error: 'No messages provided.' }), { status: 400 });
    }

    console.log('--- [AGENT] Raw incoming messages:', JSON.stringify(reqBody.messages?.slice(-2)));

    // Normalize: ai@6 sendMessage uses parts[].text instead of content
    const messages = (reqBody.messages || []).map(m => {
      let content = m.content;
      if (!content && m.text) content = m.text;
      if (!content && Array.isArray(m.parts)) content = m.parts.map(p => p.text || '').join('');
      return { role: m.role, content: content || '' };
    }).filter(m => m.content && m.role && m.role !== 'tool');

    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: `You are the SmartTour Kerala Travel Agency AI, a helpful conversational assistant.

CRITICAL INSTRUCTION: If a user asks you to plan a trip, generate an itinerary, or create a schedule for any destination, you MUST respond exactly with: "Please use the Trip Planner page to generate your itinerary!" Do not generate an itinerary yourself.

You can assist users with general travel questions about Kerala, provide tips, or use your tools to find local guides and emergency services.`,
      messages,
      tools: {
        findLocalGuides,
        findNearbyEmergencyServices,
      },
      onFinish: (event) => {
        console.log('--- [AGENT] Stream finished. Usage:', event.usage);
      },
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('--- [AGENT] Route error:', error.message);
    return new Response(JSON.stringify({ error: error.message || 'Failed to process request.' }), { status: 500 });
  }
}
