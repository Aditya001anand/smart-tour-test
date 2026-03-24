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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-6"></div>
        <p className="text-xl text-gray-700 dark:text-gray-300 animate-pulse">
          Crafting your perfect {days}-day trip to {city}...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600 min-h-[50vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-4">Oops!</h2>
        <p className="text-xl mb-6">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 lg:p-14 bg-white dark:bg-gray-950 min-h-screen">
      <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white capitalize mb-2">{city}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 font-medium">{days}-Day Curated Itinerary</p>
        </div>
        <button 
          onClick={() => window.print()} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow-md print:hidden transition-all flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.728 13.91l4.004-4.003a2.75 2.75 0 013.945 0l4.004 4.003M8 12.25v6a2.25 2.25 0 002.25 2.25h3.5A2.25 2.25 0 0016 18.25v-6" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 16.5h-1a1.5 1.5 0 01-1.5-1.5V10.75a1.5 1.5 0 011.5-1.5h10.5a1.5 1.5 0 011.5 1.5V15a1.5 1.5 0 01-1.5 1.5h-1" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25V6a2.25 2.25 0 00-2.25-2.25h-10.5A2.25 2.25 0 004.5 6v2.25" />
          </svg>
          Print Itinerary
        </button>
      </div>

      <div className="prose prose-blue prose-lg max-w-none dark:prose-invert">
        <ReactMarkdown>{itinerary}</ReactMarkdown>
      </div>
    </div>
  );
}

export default function ItineraryPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-6"></div>
        <p className="text-xl text-gray-500">Loading planner...</p>
      </div>
    }>
      <ItineraryContent />
    </Suspense>
  );
}
