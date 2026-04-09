// "use client";

// import { useState, useRef } from "react";
// import { useRouter } from "next/navigation";
// import { useLocation } from "@/lib/hooks/useLocation";

// export default function AIMode() {
//   const router = useRouter();
//   const { location } = useLocation();

//   const [prompt, setPrompt] = useState("");
//   const [isRouting, setIsRouting] = useState(false);
//   const [routeError, setRouteError] = useState(null);
//   const [isListening, setIsListening] = useState(false);
//   const recognitionRef = useRef(null);

//   const startListening = () => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       alert("Your browser doesn't support voice input. Please use Chrome.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.lang = "en-IN";
//     recognition.interimResults = true;
//     recognition.continuous = false;

//     recognition.onstart = () => setIsListening(true);
//     recognition.onend = () => setIsListening(false);
//     recognition.onerror = () => setIsListening(false);

//     recognition.onresult = (event) => {
//       const transcript = Array.from(event.results)
//         .map((r) => r[0].transcript)
//         .join("");
//       setPrompt(transcript);
//     };

//     recognition.start();
//     recognitionRef.current = recognition;
//   };

//   const handleBrainSubmit = async (e) => {
//     e?.preventDefault();
//     if (!prompt.trim()) return;

//     setIsRouting(true);
//     setRouteError(null);
//     try {
//       const res = await fetch("/api/orchestrator", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });
//       const data = await res.json();

//       if (data.error) {
//         setRouteError(`API Error: ${data.error}`);
//         return;
//       }

//       const lat = location?.latitude || "";
//       const lon = location?.longitude || "";

//       if (data.category === "emergency") {
//         const isPolice = prompt.toLowerCase().includes("police") || prompt.toLowerCase().includes("cop") || prompt.toLowerCase().includes("station");
//         const type = isPolice ? "police" : "medical";
//         router.push(`/emergency?lat=${lat}&lon=${lon}&type=${type}`);
//       } else if (data.category === "language_help") {
//         router.push("/translate");
//       } else if (data.category === "food_search") {
//         router.push(`/food?lat=${lat}&lon=${lon}&q=${encodeURIComponent(prompt)}`);
//       } else if (data.category === "find_attractions") {
//         router.push(`/attractions?lat=${lat}&lon=${lon}&q=${encodeURIComponent(prompt)}`);
//       } else if (data.category === "book_guide") {
//         router.push(`/guide?prompt=${encodeURIComponent(prompt)}`);
//       } else if (data.category === "plan_trip") {
//         const targetCity = data.city || "Kochi";
//         const targetDays = data.days || 3;
//         router.push(`/itinerary?city=${encodeURIComponent(targetCity)}&days=${targetDays}`);
//       } else {
//         setRouteError(`Intent categorized as: ${data.category}.`);
//       }
//     } catch (err) {
//       setRouteError("Error: " + err.message);
//     } finally {
//       setIsRouting(false);
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen font-sans">

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col items-center justify-center px-6 py-24 relative overflow-hidden">
//         {/* Blurred Background Image */}
//         <div className="absolute inset-0 z-0">
//           <img
//             src="https://res.cloudinary.com/ddbqj52jr/image/upload/q_auto/f_auto/v1775652528/InShot_20260408_181744561.jpg_bpsssv.jpg"
//             alt="India"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 backdrop-blur-md bg-white/5"></div>
//         </div>

//         {/* Title */}
//         <div className="relative z-10 text-center mb-16">
//           <h1 className="text-5xl sm:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
//             Smart<span className="text-orange-500">Tour</span>
//           </h1>
//           <p className="text-xl sm:text-2xl text-black font-medium mt-4">AI Assistant</p>
//           {/* Subtle animated pulse indicator */}
//           <div className="mt-6 flex items-center justify-center gap-2">
//             <span className={`w-2.5 h-2.5 rounded-full ${isListening ? 'bg-red-500 animate-ping' : 'bg-orange-400 animate-pulse'}`}></span>
//             <span className="text-sm text-black font-medium">
//               {isListening ? "Listening..." : "Ready — type or speak your request"}
//             </span>
//           </div>
//         </div>

//         {/* Chat Input Bar */}
//         <form
//           onSubmit={handleBrainSubmit}
//           className="w-full max-w-4xl relative z-10"
//         >
//           <div className="flex items-center gap-3 bg-white border-2 border-slate-200 rounded-full px-4 py-3 shadow-[0_4px_24px_rgba(0,0,0,0.08)] focus-within:border-orange-400 transition-colors">

//             {/* Mic Button */}
//             <button
//               type="button"
//               onClick={startListening}
//               disabled={isListening}
//               className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all ${isListening
//                 ? "bg-red-500 text-white animate-pulse"
//                 : "bg-slate-100 text-slate-500 hover:bg-orange-50 hover:text-orange-500"
//                 }`}
//               title="Voice Input"
//             >
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
//               </svg>
//             </button>

//             {/* Text Input */}
//             <input
//               type="text"
//               value={prompt}
//               onChange={(e) => setPrompt(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && handleBrainSubmit()}
//               autoFocus
//               placeholder="e.g. Plan a 3-day trip to Agra, or translate 'hello'..."
//               className="flex-1 bg-transparent text-slate-900 text-lg placeholder-slate-400 focus:outline-none py-1 px-2"
//               disabled={isRouting}
//             />

//             {/* Send Button */}
//             <button
//               type="submit"
//               disabled={isRouting || !prompt.trim()}
//               className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all ${prompt.trim() && !isRouting
//                 ? "bg-orange-500 hover:bg-orange-600 text-white shadow-md hover:scale-105"
//                 : "bg-slate-200 text-slate-400 cursor-not-allowed"
//                 }`}
//             >
//               {isRouting ? (
//                 <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
//                   <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
//                 </svg>
//               )}
//             </button>
//           </div>

//           {/* Error Message */}
//           {routeError && (
//             <div className="mt-4 text-center text-red-600 font-medium bg-red-50 border border-red-200 rounded-xl px-6 py-3">
//               {routeError}
//             </div>
//           )}
//         </form>

//         {/* Suggestion chips */}
//         <div className="flex flex-wrap justify-center gap-3 mt-10 relative z-10">
//           {[
//             "Plan 3-day trip to Jaipur",
//             "Find nearby hospitals",
//             "Translate 'Thank you' to Hindi",
//             "Best food near me",
//           ].map((chip) => (
//             <button
//               key={chip}
//               onClick={() => setPrompt(chip)}
//               className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm text-slate-600 font-medium hover:border-orange-400 hover:text-orange-500 transition-colors"
//             >
//               {chip}
//             </button>
//           ))}
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-slate-900 pt-16 pb-12 border-t border-slate-800 text-center relative z-20">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
//           <div className="text-3xl mb-6 flex items-center justify-center gap-1 inline-flex px-6 py-2">
//             <span className="text-white font-extrabold tracking-tight">Smart</span>
//             <span className="text-orange-500 font-extrabold tracking-tight">Tour</span>
//           </div>

//           <div className="text-slate-400 font-medium mb-8">
//             <p>&copy; 2026 SmartTour Travel AI</p>
//             <p>Kochi, India</p>
//           </div>

//           <div className="flex justify-center gap-12">
//             <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-orange-500 transition-colors">
//               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
//               <span className="font-bold text-lg">Facebook</span>
//             </a>
//             <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-orange-500 transition-colors">
//               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
//               <span className="font-bold text-lg">Instagram</span>
//             </a>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
//new implementation of ai -mode page.js
"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useLocation } from "@/lib/hooks/useLocation";

// ── Client-side city extractor (fallback when API doesn't return city) ──
const INDIA_CITIES = [
  "Agra","Ahmedabad","Ajmer","Allahabad","Amritsar","Aurangabad",
  "Bengaluru","Bhopal","Bhubaneswar","Chennai","Coorg","Darjeeling",
  "Delhi","Goa","Guwahati","Hampi","Hyderabad","Jaipur","Jaisalmer",
  "Jodhpur","Kochi","Kodaikanal","Kolkata","Lucknow","Madurai",
  "Mahabalipuram","Manali","Mumbai","Munnar","Mussoorie","Mysore",
  "Ooty","Puri","Pushkar","Rishikesh","Shimla","Srinagar","Udaipur",
  "Varanasi","Vijayawada","Visakhapatnam","Varkala","Pondicherry",
  "Ranthambore","Jim Corbett","Kaziranga","Sundarbans","Mahabaleshwar"
];

function extractCityFromPrompt(text) {
  const lower = text.toLowerCase();
  // Check each known city
  for (const city of INDIA_CITIES) {
    if (lower.includes(city.toLowerCase())) return city;
  }
  // Regex fallbacks: "trip to X", "visit X", "plan X", "go to X"
  const patterns = [
    /(?:trip|travel|visit|go|plan|itinerary)\s+(?:to|for|in)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
    /(?:to|in|for)\s+([A-Z][a-z]{2,}(?:\s+[A-Z][a-z]+)?)\s+(?:trip|travel|days?|itinerary)/i,
  ];
  for (const re of patterns) {
    const m = text.match(re);
    if (m?.[1]) return m[1];
  }
  return null;
}

function extractDaysFromPrompt(text) {
  const m = text.match(/(\d+)[- ]?day/i);
  return m ? parseInt(m[1]) : null;
}

const SUGGESTION_CHIPS = [
  { label: "3-day Jaipur trip", icon: "🏰" },
  { label: "Find nearby hospitals", icon: "🏥" },
  { label: "Translate 'Thank you' to Hindi", icon: "🗣️" },
  { label: "Best food near me", icon: "🍛" },
];

export default function AIMode() {
  const router = useRouter();
  const { location } = useLocation();

  const [prompt, setPrompt] = useState("");
  const [isRouting, setIsRouting] = useState(false);
  const [routeError, setRouteError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
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
    recognition.onend   = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results).map(r => r[0].transcript).join("");
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
      const res  = await fetch("/api/orchestrator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();

      if (data.error) { setRouteError(`API Error: ${data.error}`); return; }

      const lat = location?.latitude  || "";
      const lon = location?.longitude || "";

      if (data.category === "emergency") {
        const isPolice = /police|cop|station/i.test(prompt);
        router.push(`/emergency?lat=${lat}&lon=${lon}&type=${isPolice ? "police" : "medical"}`);

      } else if (data.category === "language_help") {
        router.push("/translate");

      } else if (data.category === "food_search") {
        router.push(`/food?lat=${lat}&lon=${lon}&q=${encodeURIComponent(prompt)}`);

      } else if (data.category === "find_attractions") {
        router.push(`/attractions?lat=${lat}&lon=${lon}&q=${encodeURIComponent(prompt)}`);

      } else if (data.category === "book_guide") {
        router.push(`/guide?prompt=${encodeURIComponent(prompt)}`);

      } else if (data.category === "plan_trip") {
        // ── BUG FIX: prefer API city, fall back to client-side extraction ──
        const apiCity  = data.city && data.city.toLowerCase() !== "kochi" ? data.city : null;
        const apiDays  = data.days && data.days !== 3 ? data.days : null;

        const city = apiCity  || extractCityFromPrompt(prompt) || "Jaipur";
        const days = apiDays  || extractDaysFromPrompt(prompt)  || 3;

        router.push(`/itinerary?city=${encodeURIComponent(city)}&days=${days}`);

      } else {
        setRouteError(`Couldn't understand that request. Try rephrasing.`);
      }
    } catch (err) {
      setRouteError("Something went wrong: " + err.message);
    } finally {
      setIsRouting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; margin: 0; }

        /* ── Grain overlay ── */
        .grain::after {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        /* ── Fade-up ── */
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.65s ease both; }
        .d1 { animation-delay: 0.05s; }
        .d2 { animation-delay: 0.18s; }
        .d3 { animation-delay: 0.30s; }
        .d4 { animation-delay: 0.42s; }

        /* ── Listening pulse ring ── */
        @keyframes ring-pulse {
          0%   { transform: scale(1);   opacity: 0.7; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        .ring-pulse { animation: ring-pulse 1.2s ease-out infinite; }

        /* ── Floating particles ── */
        @keyframes float-particle {
          0%,100% { transform: translateY(0)   rotate(0deg);   opacity: 0.6; }
          50%      { transform: translateY(-22px) rotate(180deg); opacity: 0.9; }
        }

        /* ── Search bar glow ── */
        .search-bar {
          transition: box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .search-bar.focused {
          box-shadow: 0 0 0 4px rgba(249,115,22,0.15), 0 20px 60px rgba(0,0,0,0.18);
          border-color: #f97316 !important;
        }

        /* ── Chip ── */
        .chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(10px);
          color: rgba(255,255,255,0.85);
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.22s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .chip:hover {
          background: rgba(249,115,22,0.25);
          border-color: rgba(249,115,22,0.5);
          color: #fff;
          transform: translateY(-2px);
        }

        /* ── Mic button ── */
        .mic-btn {
          transition: all 0.22s ease;
        }
        .mic-btn:hover:not(:disabled) {
          transform: scale(1.08);
        }

        /* ── Send button ── */
        .send-btn {
          transition: all 0.22s cubic-bezier(.22,.68,0,1.2);
        }
        .send-btn:hover:not(:disabled) {
          transform: scale(1.12);
        }

        /* ── Error shake ── */
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-6px); }
          40%      { transform: translateX(6px); }
          60%      { transform: translateX(-4px); }
          80%      { transform: translateX(4px); }
        }
        .shake { animation: shake 0.4s ease; }

        /* ── Typing dots ── */
        @keyframes dot-bounce {
          0%,80%,100% { transform: translateY(0); }
          40%          { transform: translateY(-6px); }
        }
        .dot { display: inline-block; animation: dot-bounce 1.2s ease infinite; }
        .dot:nth-child(2) { animation-delay: 0.15s; }
        .dot:nth-child(3) { animation-delay: 0.30s; }

        .font-display { font-family: 'Playfair Display', serif; }
      `}</style>

      <div className="grain" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        {/* ══════════════════════════════════════
            BACKGROUND
        ══════════════════════════════════════ */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
          <img
            src="https://res.cloudinary.com/ddbqj52jr/image/upload/q_auto/f_auto/v1775652528/InShot_20260408_181744561.jpg_bpsssv.jpg"
            alt="India"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Dark + gradient overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.72) 50%, rgba(120,53,15,0.6) 100%)' }} />
        </div>

        {/* ══════════════════════════════════════
            MAIN
        ══════════════════════════════════════ */}
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', position: 'relative', zIndex: 2 }}>

          {/* Brand + title */}
          <div className="fade-up d1" style={{ textAlign: 'center', marginBottom: '48px' }}>
            {/* SmartTour wordmark */}
            <div style={{ marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
              <span className="font-display" style={{ fontSize: '38px', fontWeight: 900, color: '#fff', letterSpacing: '-0.03em' }}>Smart</span>
              <span className="font-display" style={{ fontSize: '38px', fontWeight: 900, color: '#f97316', letterSpacing: '-0.03em' }}>Tour</span>
            </div>

            <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700, color: '#fff', margin: '0 0 12px', lineHeight: 1.15, letterSpacing: '-0.02em', fontFamily: "'DM Sans', sans-serif" }}>
              Where do you want to go?
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', margin: 0, fontWeight: 400 }}>
              Describe your trip, ask for food, get help — in plain English.
            </p>

            {/* Status indicator */}
            <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {isListening && (
                  <div className="ring-pulse" style={{ position: 'absolute', width: '14px', height: '14px', borderRadius: '50%', background: '#ef4444', zIndex: 0 }} />
                )}
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: isListening ? '#ef4444' : '#f97316', position: 'relative', zIndex: 1, boxShadow: isListening ? '0 0 0 3px rgba(239,68,68,0.3)' : '0 0 0 3px rgba(249,115,22,0.3)' }} />
              </div>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', fontWeight: 500, letterSpacing: '0.02em' }}>
                {isListening ? "Listening…" : isRouting ? "Thinking…" : "Ready"}
              </span>
            </div>
          </div>

          {/* Search bar */}
          <div className="fade-up d2" style={{ width: '100%', maxWidth: '780px' }}>
            <form onSubmit={handleBrainSubmit}>
              <div
                className={`search-bar${isFocused ? ' focused' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.97)', border: '2px solid rgba(255,255,255,0.3)', borderRadius: '20px', padding: '8px 8px 8px 16px', boxShadow: '0 16px 48px rgba(0,0,0,0.25)' }}
              >
                {/* Mic button */}
                <button
                  type="button"
                  onClick={startListening}
                  disabled={isListening || isRouting}
                  className="mic-btn"
                  style={{
                    flexShrink: 0, width: '44px', height: '44px', borderRadius: '12px', border: 'none', cursor: isListening ? 'default' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: isListening ? '#ef4444' : '#f8fafc',
                    color: isListening ? '#fff' : '#64748b',
                  }}
                  title="Voice Input"
                >
                  {isListening ? (
                    <span style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
                      <span className="dot" style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%' }} />
                      <span className="dot" style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%' }} />
                      <span className="dot" style={{ width: '4px', height: '4px', background: '#fff', borderRadius: '50%' }} />
                    </span>
                  ) : (
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  )}
                </button>

                {/* Input */}
                <input
                  type="text"
                  value={prompt}
                  onChange={e => { setPrompt(e.target.value); setRouteError(null); }}
                  onKeyDown={e => e.key === "Enter" && handleBrainSubmit()}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  autoFocus
                  placeholder='e.g. "Plan a 3-day trip to Jaipur" or "translate hello to Hindi"'
                  disabled={isRouting}
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '16px', color: '#0f172a', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, padding: '4px 0' }}
                />

                {/* Send button */}
                <button
                  type="submit"
                  disabled={isRouting || !prompt.trim()}
                  className="send-btn"
                  style={{
                    flexShrink: 0, width: '44px', height: '44px', borderRadius: '12px', border: 'none', cursor: prompt.trim() && !isRouting ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: prompt.trim() && !isRouting ? '#f97316' : '#e2e8f0',
                    color: prompt.trim() && !isRouting ? '#fff' : '#94a3b8',
                    boxShadow: prompt.trim() && !isRouting ? '0 4px 16px rgba(249,115,22,0.4)' : 'none',
                  }}
                >
                  {isRouting ? (
                    <svg style={{ animation: 'spin 1s linear infinite', width: '18px', height: '18px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" opacity="0.25" />
                      <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" opacity="0.75" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </form>

            {/* Error */}
            {routeError && (
              <div className="shake" style={{ marginTop: '14px', background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '14px', padding: '12px 20px', textAlign: 'center', color: '#fca5a5', fontSize: '14px', fontWeight: 500, backdropFilter: 'blur(8px)' }}>
                ⚠️ {routeError}
              </div>
            )}
          </div>

          {/* Suggestion chips */}
          <div className="fade-up d3" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '28px', maxWidth: '680px' }}>
            {SUGGESTION_CHIPS.map(chip => (
              <button
                key={chip.label}
                className="chip"
                onClick={() => { setPrompt(chip.label); setRouteError(null); }}
              >
                <span>{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>

          {/* Capability hints */}
          <div className="fade-up d4" style={{ marginTop: '48px', display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { icon: '🗺️', text: 'Plan trips' },
              { icon: '🍛', text: 'Find food' },
              { icon: '🗣️', text: 'Translate' },
              { icon: '🚨', text: 'Emergency' },
              { icon: '🎒', text: 'Book guides' },
            ].map(cap => (
              <div key={cap.text} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontWeight: 500 }}>
                <span style={{ fontSize: '16px' }}>{cap.icon}</span>
                {cap.text}
              </div>
            ))}
          </div>
        </main>

        {/* ══════════════════════════════════════
            FOOTER
        ══════════════════════════════════════ */}
        <footer style={{ position: 'relative', zIndex: 2, background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(16px)', borderTop: '1px solid rgba(255,255,255,0.08)', padding: '32px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span className="font-display" style={{ fontSize: '22px', fontWeight: 900, color: '#fff' }}>Smart</span>
              <span className="font-display" style={{ fontSize: '22px', fontWeight: 900, color: '#f97316' }}>Tour</span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '13px', margin: 0 }}>© 2026 SmartTour Travel AI · India</p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {[
                { href: "https://www.facebook.com", label: "Facebook", icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg> },
                { href: "https://www.instagram.com", label: "Instagram", icon: <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  style={{ color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s', display: 'flex' }}
                  onMouseEnter={e => e.currentTarget.style.color = '#f97316'}
                  onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
                  title={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}