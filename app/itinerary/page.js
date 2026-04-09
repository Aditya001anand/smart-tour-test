// 'use client';

// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState, Suspense } from 'react';
// import ReactMarkdown from 'react-markdown';

// function ItineraryContent() {
//   const searchParams = useSearchParams();
//   const city = searchParams.get('city') || 'Munnar';
//   const days = searchParams.get('days') || '2';

//   const [itinerary, setItinerary] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function fetchItinerary() {
//       try {
//         setLoading(true);
//         const res = await fetch('/api/generate-itinerary', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ city, days }),
//         });

//         const data = await res.json();

//         if (!res.ok) {
//           throw new Error(data.error || 'Failed to generate itinerary');
//         }

//         setItinerary(data.itinerary);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (city && days) {
//       fetchItinerary();
//     }
//   }, [city, days]);

//   return (
//     <div className="min-h-screen bg-slate-50">
//       {/* Step 1: The Hero Background */}
//       <div className="w-full h-64 bg-slate-800 bg-[url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-blend-overlay print:hidden"></div>

//       {/* Step 2: The Two-Column Overlap Structure */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-12 flex flex-col lg:flex-row gap-6 print:mt-0 print:block">
        
//         {/* Step 3: The Left Sidebar (Summary Card) */}
//         <div className="lg:w-1/3 xl:w-1/4 print:hidden">
//           <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
//             <div className="text-2xl mb-6">
//               <span className="text-slate-900 font-extrabold tracking-tight">Smart</span><span className="text-orange-500 font-extrabold tracking-tight">Tour</span>
//             </div>
            
//             <h1 className="text-xl font-bold text-slate-900 mb-2 capitalize">
//               {days}-Day Trip to {city}
//             </h1>
//             <p className="text-slate-500 mb-8 text-sm">
//               Your personalized, AI-curated travel schedule.
//             </p>

//             <button 
//               onClick={() => window.print()} 
//               className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded transition-colors print:hidden shadow-md"
//             >
//               DOWNLOAD SCHEDULE
//             </button>
//           </div>
//         </div>

//         {/* Step 4: The Right Main Panel (Schedule Card) */}
//         <div className="lg:w-2/3 xl:w-3/4 print:w-full">
//           <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 min-h-[600px] print:shadow-none print:p-0">
//             {/* Print-only title */}
//             <div className="hidden print:block mb-6 border-b border-slate-200 pb-4">
//               <h1 className="text-3xl font-extrabold text-slate-900">{days}-Day Trip to {city}</h1>
//               <p className="text-slate-500 mt-1">Curated by SmartTour AI</p>
//             </div>
//             {error && (
//               <div className="text-center text-red-600">
//                 <h2 className="text-2xl font-bold mb-4">Error loading itinerary</h2>
//                 <p>{error}</p>
//                 <button 
//                   onClick={() => window.location.reload()} 
//                   className="mt-4 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded"
//                 >
//                   Try Again
//                 </button>
//               </div>
//             )}
            
//             {/* Step 6: Loading State */}
//             {loading && !error && (
//               <div className="animate-pulse space-y-8">
//                 <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                
//                 <div className="space-y-4">
//                   <div className="h-4 bg-slate-200 rounded w-full"></div>
//                   <div className="h-4 bg-slate-200 rounded w-5/6"></div>
//                   <div className="h-4 bg-slate-200 rounded w-full"></div>
//                 </div>

//                 <div className="h-6 bg-slate-200 rounded w-1/4 mt-8"></div>
//                 <div className="space-y-4">
//                   <div className="h-4 bg-slate-200 rounded w-full"></div>
//                   <div className="h-4 bg-slate-200 rounded w-3/4"></div>
//                 </div>
                
//                 <div className="h-6 bg-slate-200 rounded w-1/4 mt-8"></div>
//                 <div className="space-y-4">
//                   <div className="h-4 bg-slate-200 rounded w-full"></div>
//                   <div className="h-4 bg-slate-200 rounded w-4/5"></div>
//                 </div>
//               </div>
//             )}

//             {/* Step 5: Advanced Markdown Typography */}
//             {!loading && !error && (
//               <div className="prose prose-slate max-w-none prose-headings:text-teal-800 prose-headings:border-b prose-headings:pb-2 prose-a:text-orange-500 w-full">
//                 <ReactMarkdown>{itinerary}</ReactMarkdown>
//               </div>
//             )}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default function ItineraryPage() {
//   return (
//     <Suspense fallback={
//       <div className="min-h-screen bg-slate-50">
//          <div className="w-full h-64 bg-slate-800"></div>
//          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-12 flex justify-center">
//             <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 w-full min-h-[600px] flex items-center justify-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-slate-800"></div>
//             </div>
//          </div>
//       </div>
//     }>
//       <ItineraryContent />
//     </Suspense>
//   );
// }
//new implementation of itinerary page 
'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';

/* ─────────────────────────────────────────────────────────
   City → hero image map (fallback to a default landscape)
───────────────────────────────────────────────────────── */
const CITY_IMAGES = {
  jaipur:        "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=1800",
  agra:          "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1800",
  goa:           "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1800",
  varanasi:      "https://res.cloudinary.com/ddbqj52jr/image/upload/q_auto/f_auto/v1775651240/varanasi_ftimbu.jpg",
  kerala:        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1800",
  kochi:         "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1800",
  munnar:        "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1800",
  udaipur:       "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1800",
  mysore:        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1800",
  hampi:         "https://images.unsplash.com/photo-1620766165457-a8025baa82e0?q=80&w=1800",
  darjeeling:    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1800",
  default:       "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1800",
};

function getCityImage(city = "") {
  const key = city.toLowerCase().trim();
  return CITY_IMAGES[key] || CITY_IMAGES.default;
}

/* ─────────────────────────────────────────────────────────
   Skeleton loader
───────────────────────────────────────────────────────── */
function Skeleton() {
  return (
    <div style={{ animation: 'pulse 1.5s ease-in-out infinite' }}>
      {[1, 2, 3].map(day => (
        <div key={day} style={{ marginBottom: '40px' }}>
          <div style={{ width: '120px', height: '28px', background: '#e2e8f0', borderRadius: '8px', marginBottom: '20px' }} />
          {[1,2,3,4].map(i => (
            <div key={i} style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e2e8f0', flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ height: '16px', background: '#e2e8f0', borderRadius: '6px', marginBottom: '8px', width: '60%' }} />
                <div style={{ height: '13px', background: '#f1f5f9', borderRadius: '6px', width: '90%' }} />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Custom Markdown components for polished typography
───────────────────────────────────────────────────────── */
const mdComponents = {
  h1: ({ children }) => (
    <h1 style={{ fontSize: '28px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px', fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em', lineHeight: 1.2 }}>{children}</h1>
  ),
  h2: ({ children }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '36px 0 20px', paddingBottom: '12px', borderBottom: '2px solid #f1f5f9' }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#f97316', flexShrink: 0 }} />
      <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#0f172a', margin: 0, fontFamily: "'Playfair Display', serif", letterSpacing: '-0.01em' }}>{children}</h2>
    </div>
  ),
  h3: ({ children }) => (
    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0d9488', margin: '24px 0 10px', textTransform: 'uppercase', letterSpacing: '0.08em', fontFamily: "'DM Sans', sans-serif" }}>{children}</h3>
  ),
  p: ({ children }) => (
    <p style={{ fontSize: '15px', lineHeight: 1.75, color: '#475569', margin: '0 0 14px', fontFamily: "'DM Sans', sans-serif" }}>{children}</p>
  ),
  li: ({ children }) => (
    <li style={{ fontSize: '15px', lineHeight: 1.7, color: '#475569', margin: '0 0 8px', paddingLeft: '4px', fontFamily: "'DM Sans', sans-serif" }}>{children}</li>
  ),
  ul: ({ children }) => (
    <ul style={{ paddingLeft: '20px', margin: '0 0 16px', listStyleType: 'disc' }}>{children}</ul>
  ),
  ol: ({ children }) => (
    <ol style={{ paddingLeft: '20px', margin: '0 0 16px' }}>{children}</ol>
  ),
  strong: ({ children }) => (
    <strong style={{ color: '#1e293b', fontWeight: 700 }}>{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote style={{ borderLeft: '3px solid #f97316', paddingLeft: '16px', margin: '20px 0', color: '#64748b', fontStyle: 'italic' }}>{children}</blockquote>
  ),
  hr: () => (
    <hr style={{ border: 'none', borderTop: '1px solid #f1f5f9', margin: '28px 0' }} />
  ),
};

/* ─────────────────────────────────────────────────────────
   Main content component
───────────────────────────────────────────────────────── */
function ItineraryContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || 'Munnar';
  const days = searchParams.get('days') || '2';

  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    async function fetchItinerary() {
      try {
        setLoading(true);
        setError(null);
        const res  = await fetch('/api/generate-itinerary', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ city, days }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to generate itinerary');
        setItinerary(data.itinerary);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    if (city && days) fetchItinerary();
  }, [city, days]);

  const heroImg = getCityImage(city);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; margin: 0; background: #f8fafc; }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.6s ease both; }
        .d1 { animation-delay: 0.05s; }
        .d2 { animation-delay: 0.18s; }

        /* Prose link */
        .prose a { color: #f97316; text-decoration: underline; text-underline-offset: 2px; }
        .prose a:hover { color: #ea6a00; }

        /* Print */
        @media print {
          .no-print { display: none !important; }
          body { background: #fff; }
          .print-full { box-shadow: none !important; padding: 0 !important; }
        }

        /* Sticky sidebar */
        .sidebar-sticky { position: sticky; top: 24px; }

        /* Back button */
        .back-btn {
          display: inline-flex; align-items: center; gap: 6px;
          color: rgba(255,255,255,0.8); font-size: 13px; font-weight: 600;
          text-decoration: none; letter-spacing: 0.04em;
          background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
          backdrop-filter: blur(8px); border-radius: 999px; padding: 6px 14px;
          transition: all 0.2s;
        }
        .back-btn:hover { background: rgba(255,255,255,0.22); color: #fff; }

        /* Download btn */
        .dl-btn {
          display: block; width: 100%; text-align: center;
          background: #f97316; color: #fff; font-weight: 700;
          font-size: 14px; padding: 13px 20px; border-radius: 12px;
          border: none; cursor: pointer; letter-spacing: 0.06em;
          text-transform: uppercase; transition: all 0.22s;
          font-family: 'DM Sans', sans-serif;
          box-shadow: 0 4px 16px rgba(249,115,22,0.35);
        }
        .dl-btn:hover { background: #ea6a00; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(249,115,22,0.4); }

        /* Day tab */
        .day-badge {
          display: inline-flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 50%;
          background: #fff3e8; color: #f97316;
          font-size: 13px; font-weight: 800; flex-shrink: 0;
        }

        .font-display { font-family: 'Playfair Display', serif; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#f8fafc' }}>

        {/* ══════════════════════════
            HERO
        ══════════════════════════ */}
        <div className="no-print" style={{ position: 'relative', width: '100%', height: '340px', overflow: 'hidden' }}>
          <img src={heroImg} alt={city} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.82) 0%, rgba(15,23,42,0.35) 60%, transparent 100%)' }} />

          {/* Back + brand row */}
          <div style={{ position: 'absolute', top: '24px', left: '24px', right: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <a href="/" className="back-btn">← Home</a>
            <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
              <span className="font-display" style={{ fontSize: '20px', fontWeight: 900, color: '#fff' }}>Smart</span>
              <span className="font-display" style={{ fontSize: '20px', fontWeight: 900, color: '#f97316' }}>Tour</span>
            </div>
          </div>

          {/* Hero text */}
          <div className="fade-up d1" style={{ position: 'absolute', bottom: '40px', left: '32px', right: '32px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(249,115,22,0.2)', border: '1px solid rgba(249,115,22,0.4)', borderRadius: '999px', padding: '4px 12px', marginBottom: '12px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fed7aa' }}>AI Itinerary</span>
            </div>
            <h1 className="font-display" style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: '#fff', margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
              {days}-Day Trip to {city}
            </h1>
          </div>
        </div>

        {/* ══════════════════════════
            TWO-COLUMN LAYOUT
        ══════════════════════════ */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '28px', marginTop: '-48px', position: 'relative', zIndex: 10 }}>

          {/* ── LEFT SIDEBAR ── */}
          <aside className="no-print sidebar-sticky" style={{ alignSelf: 'start' }}>
            <div className="fade-up d1" style={{ background: '#fff', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9' }}>
              {/* Summary */}
              <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.01em' }}>{city}</h2>
              <p style={{ color: '#94a3b8', fontSize: '13px', margin: '0 0 24px', fontWeight: 500 }}>Your personalised AI travel schedule</p>

              {/* Stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px' }}>
                {[
                  { label: 'Duration', val: `${days} Days` },
                  { label: 'Curated by', val: 'AI' },
                  { label: 'Destination', val: city },
                  { label: 'Type', val: 'Custom' },
                ].map(s => (
                  <div key={s.label} style={{ background: '#f8fafc', borderRadius: '12px', padding: '12px 14px' }}>
                    <div style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>{s.label}</div>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>{s.val}</div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid #f1f5f9', margin: '0 0 20px' }} />

              {/* Download button */}
              <button className="dl-btn" onClick={() => window.print()}>
                ↓ Download Schedule
              </button>

              {/* Tips */}
              <div style={{ marginTop: '20px', background: '#f0fdf9', border: '1px solid #99f6e4', borderRadius: '12px', padding: '14px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, color: '#0d9488', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 6px' }}>💡 Pro Tip</p>
                <p style={{ fontSize: '13px', color: '#047857', margin: 0, lineHeight: 1.55 }}>Save this page or download the PDF to access your itinerary offline while travelling.</p>
              </div>
            </div>
          </aside>

          {/* ── MAIN PANEL ── */}
          <main className="fade-up d2 print-full" style={{ background: '#fff', borderRadius: '20px', padding: '40px 44px', boxShadow: '0 4px 24px rgba(0,0,0,0.07)', border: '1px solid #f1f5f9', minHeight: '600px' }}>

            {/* Print header */}
            <div style={{ display: 'none' }} className="print-header">
              <h1 className="font-display" style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a' }}>{days}-Day Trip to {city}</h1>
              <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Curated by SmartTour AI</p>
            </div>

            {/* Error */}
            {error && (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>😕</div>
                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>Couldn't load itinerary</h2>
                <p style={{ color: '#64748b', marginBottom: '24px' }}>{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  style={{ background: '#0f172a', color: '#fff', fontWeight: 700, padding: '12px 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '14px' }}
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Loading */}
            {loading && !error && (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid #f97316', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
                  <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                  <span style={{ color: '#64748b', fontWeight: 500, fontSize: '15px' }}>Crafting your perfect itinerary…</span>
                </div>
                <Skeleton />
              </div>
            )}

            {/* Itinerary content */}
            {!loading && !error && (
              <div className="prose" style={{ maxWidth: 'none' }}>
                <ReactMarkdown components={mdComponents}>{itinerary}</ReactMarkdown>
              </div>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────────────────
   Suspense wrapper
───────────────────────────────────────────────────────── */
export default function ItineraryPage() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
        <div style={{ height: '340px', background: '#1e293b' }} />
        <div style={{ maxWidth: '1200px', margin: '-48px auto 0', padding: '0 24px', display: 'grid', gridTemplateColumns: '280px 1fr', gap: '28px' }}>
          <div style={{ background: '#fff', borderRadius: '20px', height: '300px' }} />
          <div style={{ background: '#fff', borderRadius: '20px', minHeight: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #f97316', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        </div>
      </div>
    }>
      <ItineraryContent />
    </Suspense>
  );
}