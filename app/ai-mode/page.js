"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocation } from "@/lib/hooks/useLocation";

export default function AIMode() {
  const router = useRouter();
  const { location } = useLocation();

  const [prompt, setPrompt] = useState("");
  const [isRouting, setIsRouting] = useState(false);
  const [routeError, setRouteError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser doesn't support voice input. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((r) => r[0].transcript)
        .join("");
      setPrompt(transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const handleBrainSubmit = async (e) => {
    e?.preventDefault();
    if (!prompt.trim()) return;

    setIsRouting(true);
    setRouteError(null);
    try {
      const res = await fetch("/api/orchestrator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      if (data.error) {
        setRouteError(`API Error: ${data.error}`);
        return;
      }

      const lat = location?.latitude || "";
      const lon = location?.longitude || "";

      if (data.category === "emergency") {
        const isPolice = prompt.toLowerCase().includes("police") || prompt.toLowerCase().includes("cop") || prompt.toLowerCase().includes("station");
        const type = isPolice ? "police" : "medical";
        router.push(`/emergency?lat=${lat}&lon=${lon}&type=${type}`);
      } else if (data.category === "language_help") {
        router.push("/translate");
      } else if (data.category === "food_search") {
        router.push(`/food?lat=${lat}&lon=${lon}&q=${encodeURIComponent(prompt)}`);
      } else if (data.category === "find_attractions") {
        router.push(`/attractions?lat=${lat}&lon=${lon}&q=${encodeURIComponent(prompt)}`);
      } else if (data.category === "book_guide") {
        router.push(`/guide?prompt=${encodeURIComponent(prompt)}`);
      } else if (data.category === "plan_trip") {
        const targetCity = data.city || "Kochi";
        const targetDays = data.days || 3;
        router.push(`/itinerary?city=${encodeURIComponent(targetCity)}&days=${targetDays}`);
      } else {
        setRouteError(`Intent categorized as: ${data.category}.`);
      }
    } catch (err) {
      setRouteError("Error: " + err.message);
    } finally {
      setIsRouting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
        {/* Blurred Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://res.cloudinary.com/ddbqj52jr/image/upload/q_auto/f_auto/v1775652528/InShot_20260408_181744561.jpg_bpsssv.jpg"
            alt="India"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 backdrop-blur-md bg-white/5"></div>
        </div>

        {/* Title */}
        <div className="relative z-10 text-center mb-16">
          <h1 className="text-5xl sm:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Smart<span className="text-orange-500">Tour</span>
          </h1>
          <p className="text-xl sm:text-2xl text-black font-medium mt-4">AI Assistant</p>
          {/* Subtle animated pulse indicator */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full ${isListening ? 'bg-red-500 animate-ping' : 'bg-orange-400 animate-pulse'}`}></span>
            <span className="text-sm text-black font-medium">
              {isListening ? "Listening..." : "Ready — type or speak your request"}
            </span>
          </div>
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={handleBrainSubmit}
          className="w-full max-w-4xl relative z-10"
        >
          <div className="flex items-center gap-3 bg-white border-2 border-slate-200 rounded-full px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.08)] focus-within:border-orange-400 transition-colors">

            {/* Mic Button */}
            <button
              type="button"
              onClick={startListening}
              disabled={isListening}
              className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all ${isListening
                ? "bg-red-500 text-white animate-pulse"
                : "bg-slate-100 text-slate-500 hover:bg-orange-50 hover:text-orange-500"
                }`}
              title="Voice Input"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleBrainSubmit()}
              autoFocus
              placeholder="e.g. Plan a 3-day trip to Agra, or translate 'hello'..."
              className="flex-1 bg-transparent text-slate-900 text-lg placeholder-slate-400 focus:outline-none py-1 px-2"
              disabled={isRouting}
            />

            {/* Send Button */}
            <button
              type="submit"
              disabled={isRouting || !prompt.trim()}
              className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all ${prompt.trim() && !isRouting
                ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:scale-105"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
                }`}
            >
              {isRouting ? (
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                </svg>
              )}
            </button>
          </div>

          {/* Error Message */}
          {routeError && (
            <div className="mt-4 text-center text-red-600 font-medium bg-red-50 border border-red-200 rounded-xl px-6 py-3">
              {routeError}
            </div>
          )}
        </form>

        {/* Suggestion chips */}
        <div className="flex flex-wrap justify-center gap-3 mt-10 relative z-10">
          {[
            "Plan 3-day trip to Jaipur",
            "Find nearby hospitals",
            "Translate 'Thank you' to Hindi",
            "Best food near me",
          ].map((chip) => (
            <button
              key={chip}
              onClick={() => setPrompt(chip)}
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-600 font-medium hover:border-orange-400 hover:text-orange-500 transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 pt-16 pb-12 border-t border-slate-800 text-center relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="text-3xl mb-6 flex items-center justify-center gap-1 inline-flex px-6 py-2">
            <span className="text-white font-extrabold tracking-tight">Smart</span>
            <span className="text-orange-500 font-extrabold tracking-tight">Tour</span>
          </div>

          <div className="text-slate-400 font-medium mb-8">
            <p>&copy; 2026 SmartTour Travel AI</p>
            <p>Kochi, India</p>
          </div>

          <div className="flex justify-center gap-12">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-orange-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
              <span className="font-bold text-lg">Facebook</span>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-orange-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
              <span className="font-bold text-lg">Instagram</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
