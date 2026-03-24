import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) throw new Error("Missing API Key");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const formData = await req.formData();
    const targetLanguage = formData.get("targetLanguage") || "English";
    const mode = formData.get("mode") || "text";
    
    let promptObject = [
      `Translate the provided input into exactly ${targetLanguage}. Return ONLY the translated text. Do not provide commentary or formatting like markdown blocks unless it is part of the text. If the input is audio/speech, transcribe and translate it. If the input is an image, translate the text prominently visible in the image.`
    ];

    if (mode === "text") {
      const textVal = formData.get("text");
      if (!textVal) throw new Error("No text provided");
      promptObject.push("\n\nText to translate:\n" + textVal);
    } else {
      const file = formData.get("file");
      if (!file) throw new Error("Missing file for translation");

      const arrayBuffer = await file.arrayBuffer();
      const base64Data = Buffer.from(arrayBuffer).toString('base64');
      
      promptObject.push({
        inlineData: {
          data: base64Data,
          mimeType: file.type
        }
      });
    }

    const result = await model.generateContent(promptObject);
    const text = result.response.text();

    return new Response(JSON.stringify({ translation: text }), { 
      status: 200, 
      headers: { "Content-Type": "application/json" } 
    });
  } catch (error) {
    console.error("Translation API Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
