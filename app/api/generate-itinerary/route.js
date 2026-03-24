import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

export async function POST(req) {
  try {
    const { city, days } = await req.json();

    if (!city || !days) {
      return NextResponse.json({ error: 'City and days are required.' }, { status: 400 });
    }

    // Geocode: Fetch coordinates from Nominatim
    let lat = 10.0;
    let lon = 76.5;
    try {
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city + ', Kerala, India')}&format=json&limit=1`,
        { headers: { 'User-Agent': 'SmartTourKerala_ItineraryGen/1.0' } }
      );
      const geodata = await geoRes.json();
      if (geodata && geodata.length > 0) {
        lat = parseFloat(geodata[0].lat);
        lon = parseFloat(geodata[0].lon);
      }
    } catch (e) {
      console.error('Nominatim geocoding failed:', e.message);
    }

    // Fetch Data from Overpass API
    const attrQuery = `[out:json];(node["tourism"~"museum|gallery|viewpoint|attraction|monument"](around:5000,${lat},${lon});node["historic"](around:5000,${lat},${lon}););out center;`;
    const foodQuery = `[out:json];(node["amenity"~"restaurant|cafe|fast_food"](around:5000,${lat},${lon}););out center;`;

    let attractions = [];
    let food = [];

    try {
      const attrRes = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(attrQuery)}`
      });
      if (attrRes.ok) {
        const attrData = await attrRes.json();
        attractions = (attrData.elements || [])
          .filter(el => el.tags?.name)
          .map(el => ({
            name: el.tags.name,
            type: el.tags.tourism || el.tags.historic || 'attraction',
            lat: el.lat || el.center?.lat,
            lon: el.lon || el.center?.lon,
          }))
          .filter(a => a.lat && a.lon)
          .slice(0, 15); // Top 15 attractions
      }
    } catch (e) {
      console.error('Overpass attractions fetch failed:', e.message);
    }

    try {
      const foodRes = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(foodQuery)}`
      });
      if (foodRes.ok) {
        const foodData = await foodRes.json();
        food = (foodData.elements || [])
          .filter(el => el.tags?.name)
          .map(el => ({
            name: el.tags.name,
            type: el.tags.cuisine || el.tags.amenity || 'food',
            lat: el.lat || el.center?.lat,
            lon: el.lon || el.center?.lon,
          }))
          .filter(f => f.lat && f.lon)
          .slice(0, 10); // Top 10 food spots
      }
    } catch (e) {
      console.error('Overpass food fetch failed:', e.message);
    }

    const minifiedData = {
      city,
      lat,
      lon,
      attractions,
      food
    };

    // One-Shot LLM Call
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing GEMINI_API_KEY in environment.' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a Kerala Travel Expert. Plan a ${days}-day itinerary for ${city}. Use this real location data: ${JSON.stringify(minifiedData)}. Format as clean Markdown. Do NOT use tools.`;

    const result = await model.generateContent(prompt);
    let markdownText = result.response.text();
    
    // Safety check just in case it returns an empty string
    if (!markdownText) {
      markdownText = "Sorry, failed to generate an itinerary.";
    }

    return NextResponse.json({ itinerary: markdownText });
  } catch (error) {
    console.error('Error generating itinerary:', error);
    return NextResponse.json({ error: 'Failed to generate itinerary' }, { status: 500 });
  }
}
