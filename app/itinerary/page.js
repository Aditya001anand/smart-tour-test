'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import ReactMarkdown from 'react-markdown';

function ItineraryContent() {
  const searchParams = useSearchParams();
  const city = searchParams.get('city') || 'Munnar';
  const days = searchParams.get('days') || '2';

  const [itinerary, setItinerary] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItinerary() {
      try {
        setLoading(true);
        const res = await fetch('/api/generate-itinerary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ city, days }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to generate itinerary');
        }

        setItinerary(data.itinerary);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (city && days) {
      fetchItinerary();
    }
  }, [city, days]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Step 1: The Hero Background */}
      <div className="w-full h-64 bg-slate-800 bg-[url('https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center bg-blend-overlay print:hidden"></div>

      {/* Step 2: The Two-Column Overlap Structure */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-12 flex flex-col lg:flex-row gap-6 print:mt-0 print:block">
        
        {/* Step 3: The Left Sidebar (Summary Card) */}
        <div className="lg:w-1/3 xl:w-1/4 print:hidden">
          <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
            <div className="text-2xl mb-6">
              <span className="text-slate-900 font-extrabold tracking-tight">Smart</span><span className="text-orange-500 font-extrabold tracking-tight">Tour</span>
            </div>
            
            <h1 className="text-xl font-bold text-slate-900 mb-2 capitalize">
              {days}-Day Trip to {city}
            </h1>
            <p className="text-slate-500 mb-8 text-sm">
              Your personalized, AI-curated travel schedule.
            </p>

            <button 
              onClick={() => window.print()} 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded transition-colors print:hidden shadow-md"
            >
              DOWNLOAD SCHEDULE
            </button>
          </div>
        </div>

        {/* Step 4: The Right Main Panel (Schedule Card) */}
        <div className="lg:w-2/3 xl:w-3/4 print:w-full">
          <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 min-h-[600px] print:shadow-none print:p-0">
            {/* Print-only title */}
            <div className="hidden print:block mb-6 border-b border-slate-200 pb-4">
              <h1 className="text-3xl font-extrabold text-slate-900">{days}-Day Trip to {city}</h1>
              <p className="text-slate-500 mt-1">Curated by SmartTour AI</p>
            </div>
            {error && (
              <div className="text-center text-red-600">
                <h2 className="text-2xl font-bold mb-4">Error loading itinerary</h2>
                <p>{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded"
                >
                  Try Again
                </button>
              </div>
            )}
            
            {/* Step 6: Loading State */}
            {loading && !error && (
              <div className="animate-pulse space-y-8">
                <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                
                <div className="space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                </div>

                <div className="h-6 bg-slate-200 rounded w-1/4 mt-8"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                </div>
                
                <div className="h-6 bg-slate-200 rounded w-1/4 mt-8"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-4/5"></div>
                </div>
              </div>
            )}

            {/* Step 5: Advanced Markdown Typography */}
            {!loading && !error && (
              <div className="prose prose-slate max-w-none prose-headings:text-teal-800 prose-headings:border-b prose-headings:pb-2 prose-a:text-orange-500 w-full">
                <ReactMarkdown>{itinerary}</ReactMarkdown>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function ItineraryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50">
         <div className="w-full h-64 bg-slate-800"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 pb-12 flex justify-center">
            <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 w-full min-h-[600px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-slate-800"></div>
            </div>
         </div>
      </div>
    }>
      <ItineraryContent />
    </Suspense>
  );
}
