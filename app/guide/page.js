"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useUser } from "@clerk/nextjs";

// Separate databases for Regional Matching
const SOUTH_GUIDES = [
  { id: 's1', name: 'Siddharth Menon', email: 'siddharth@example.com', languages: ['Malayalam', 'English', 'Tamil'], specialty: 'History & Heritage', daily_rate_inr: 1500, rating: 4.8, reviews: 124, available_today: true },
  { id: 's2', name: 'Lakshmi Pillai', email: 'lakshmi@example.com', languages: ['Malayalam', 'English'], specialty: 'Culinary & Culture', daily_rate_inr: 1200, rating: 4.9, reviews: 89, available_today: true },
  { id: 's3', name: 'Arun Iyer', email: 'arun@example.com', languages: ['English', 'German', 'Tamil'], specialty: 'Wildlife & Trekking', daily_rate_inr: 2000, rating: 4.7, reviews: 56, available_today: false },
  { id: 's4', name: 'Sneha Reddy', email: 'sneha@example.com', languages: ['Telugu', 'English', 'Hindi'], specialty: 'Temple Tours', daily_rate_inr: 1400, rating: 4.6, reviews: 112, available_today: true },
  { id: 's5', name: 'Vishnu Nambiar', email: 'vishnu@example.com', languages: ['Malayalam', 'English'], specialty: 'Backwater Experiences', daily_rate_inr: 1600, rating: 4.9, reviews: 201, available_today: true },
];

const NORTH_GUIDES = [
  { id: 'n1', name: 'Rahul Sharma', email: 'rahul@example.com', languages: ['Hindi', 'English'], specialty: 'Forts & Palaces', daily_rate_inr: 1800, rating: 4.9, reviews: 310, available_today: true },
  { id: 'n2', name: 'Priya Gupta', email: 'priya@example.com', languages: ['Hindi', 'English', 'Spanish'], specialty: 'Culinary Walks', daily_rate_inr: 1300, rating: 4.7, reviews: 145, available_today: true },
  { id: 'n3', name: 'Vikram Singh', email: 'vikram@example.com', languages: ['Hindi', 'English', 'French'], specialty: 'Desert Safaris', daily_rate_inr: 2200, rating: 4.8, reviews: 92, available_today: true },
  { id: 'n4', name: 'Neha Patel', email: 'neha@example.com', languages: ['Gujarati', 'Hindi', 'English'], specialty: 'Heritage Walks', daily_rate_inr: 1500, rating: 4.6, reviews: 78, available_today: false },
  { id: 'n5', name: 'Amit Desai', email: 'amit@example.com', languages: ['Marathi', 'Hindi', 'English'], specialty: 'Street Food & Markets', daily_rate_inr: 1100, rating: 4.8, reviews: 215, available_today: true },
];

// Validation Array: Supported Indian Regions/Cities
const INDIAN_REGIONS = [
  'kerala', 'tamil nadu', 'karnataka', 'andhra', 'telangana', 'maharashtra', 'gujarat', 'rajasthan', 'punjab', 'haryana', 'uttar pradesh', 'delhi', 'bengal', 'goa',
  'chennai', 'bangalore', 'bengaluru', 'kochi', 'munnar', 'hyderabad', 'mysore', 'hampi', 'pondicherry', 'trivandrum',
  'mumbai', 'pune', 'jaipur', 'udaipur', 'jodhpur', 'agra', 'lucknow', 'varanasi', 'kolkata', 'amritsar', 'ahmedabad', 'india'
];

function GuideContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("prompt") || "";
  const { user } = useUser();

  const [place, setPlace] = useState(initialQuery);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [hasSearched, setHasSearched] = useState(false);
  const [displayedGuides, setDisplayedGuides] = useState([]);
  const [errorMsg, setErrorMsg] = useState(""); // New state for validation errors

  const handleSearchGuides = () => {
    setErrorMsg(""); // Clear old errors
    if (!place) {
      setErrorMsg("Please enter a destination.");
      return;
    }

    const searchLower = place.toLowerCase();

    // Check if the input exists in our Indian Regions array
    const isIndianLocation = INDIAN_REGIONS.some(keyword => searchLower.includes(keyword));

    if (!isIndianLocation) {
      setErrorMsg("SmartTour currently only operates within India. Please enter a valid Indian city or state.");
      return;
    }

    // Safety check for dates (backup to HTML5 validation)
    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      setErrorMsg("Your return date cannot be before your departure date.");
      return;
    }

    // Determine North vs South
    const southKeywords = ['kerala', 'tamil nadu', 'karnataka', 'andhra', 'telangana', 'chennai', 'bangalore', 'bengaluru', 'kochi', 'munnar', 'hyderabad', 'mysore', 'hampi', 'pondicherry', 'trivandrum'];
    const isSouth = southKeywords.some(keyword => searchLower.includes(keyword));

    const availableSouth = SOUTH_GUIDES.filter(guide => guide.available_today);
    const availableNorth = NORTH_GUIDES.filter(guide => guide.available_today);

    if (isSouth) {
      setDisplayedGuides(availableSouth);
    } else {
      setDisplayedGuides(availableNorth);
    }

    setHasSearched(true);
  };

  const handleResetSearch = () => {
    setHasSearched(false);
    setDisplayedGuides([]);
    setErrorMsg("");
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingBottom: '40px' }}>

      <main style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

        {/* Planner Header Form */}
        <div className="glass-card animate-fade-in-up" style={{ padding: '32px', background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)', borderRadius: '16px' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#f97316', marginBottom: '8px', fontWeight: 700 }}>Find Local Experts</h2>
          <p style={{ color: '#475569', marginBottom: '16px' }}>Fill in your travel details to find certified local guides for your dates.</p>

          {/* Error Message Display */}
          {errorMsg && (
            <div style={{ padding: '12px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '20px', fontWeight: 600, border: '1px solid #f87171' }}>
              ⚠️ {errorMsg}
            </div>
          )}

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <div style={{ flex: '1 1 300px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '6px', fontWeight: 600 }}>FOR WHICH PLACE?</label>
              <input
                type="text"
                value={place}
                onChange={e => setPlace(e.target.value)}
                placeholder="e.g. Jaipur, Kerala, Agra..."
                disabled={hasSearched}
                style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: hasSearched ? '#f1f5f9' : '#ffffff', color: hasSearched ? '#94a3b8' : '#0f172a', opacity: hasSearched ? 0.7 : 1 }}
              />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '6px', fontWeight: 600 }}>FROM WHEN?</label>
              <input
                type="date"
                value={fromDate}
                onChange={e => setFromDate(e.target.value)}
                disabled={hasSearched}
                style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: hasSearched ? '#f1f5f9' : '#ffffff', color: hasSearched ? '#94a3b8' : '#0f172a', colorScheme: 'light', opacity: hasSearched ? 0.7 : 1 }}
              />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '6px', fontWeight: 600 }}>TO WHEN?</label>
              <input
                type="date"
                value={toDate}
                onChange={e => setToDate(e.target.value)}
                disabled={hasSearched}
                min={fromDate} // HTML5 Validation: Cannot pick a date before the FROM date
                style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: hasSearched ? '#f1f5f9' : '#ffffff', color: hasSearched ? '#94a3b8' : '#0f172a', colorScheme: 'light', opacity: hasSearched ? 0.7 : 1 }}
              />
            </div>
          </div>

          {/* Dynamic Button State */}
          {hasSearched ? (
            <button onClick={handleResetSearch} style={{ background: '#f8fafc', color: '#334155', fontSize: '1rem', padding: '14px 28px', border: '2px solid #cbd5e1', width: '100%', cursor: 'pointer', borderRadius: '8px', fontWeight: 700, transition: 'all 0.2s' }}>
              ✏️ Edit Search Parameters
            </button>
          ) : (
            <button onClick={handleSearchGuides} className="btn-primary" style={{ background: '#f97316', color: '#fff', fontSize: '1rem', padding: '14px 28px', border: 'none', width: '100%', cursor: 'pointer', borderRadius: '8px', fontWeight: 700 }}>
              🔍 Search Available Guides
            </button>
          )}
        </div>

        {/* Guides Grid */}
        {hasSearched && (
          <div className="animate-fade-in-up">
            <h2 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '24px', fontWeight: 800 }}>
              Available Tour Experts in {place}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
              {displayedGuides.map((guide, i) => {
                const locationText = place || "your destination";
                const dateText = (fromDate && toDate) ? `from ${fromDate} to ${toDate}` : "for my upcoming dates";

                const subject = encodeURIComponent(`Tour Inquiry for ${locationText} ${dateText}`);
                const body = encodeURIComponent(
                  `Hi ${guide.name},

I am planning a trip to ${locationText} ${dateText}. 

Could you please let me know your availability and rates? 

Thanks,
${user?.firstName || 'Traveler'}
${user?.primaryEmailAddress?.emailAddress || ''}`
                );

                return (
                  <div key={guide.id} className="animate-fade-in-up" style={{ padding: '24px', borderTop: '4px solid #f97316', animationDelay: `${i * 0.1}s`, display: 'flex', flexDirection: 'column', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                      <div>
                        <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginBottom: '4px' }}>{guide.name}</h3>
                        <div style={{ fontSize: '0.9rem', color: '#f59e0b', fontWeight: 700 }}>
                          ⭐ {guide.rating} <span style={{ color: '#64748b', fontWeight: 500 }}>({guide.reviews} reviews)</span>
                        </div>
                      </div>
                      <span className="badge" style={{ background: '#dcfce7', color: '#16a34a', fontSize: '0.75rem', padding: '6px 10px', borderRadius: '6px', fontWeight: 800 }}>🟢 AVAILABLE</span>
                    </div>

                    <div style={{ flex: 1, marginBottom: '24px' }}>
                      <p style={{ fontSize: '0.95rem', color: '#475569', marginBottom: '8px' }}>
                        <strong style={{ color: '#334155' }}>Specialty:</strong> {guide.specialty}
                      </p>
                      <p style={{ fontSize: '0.95rem', color: '#475569', marginBottom: '8px' }}>
                        <strong style={{ color: '#334155' }}>Languages:</strong> {guide.languages.join(', ')}
                      </p>
                      <p style={{ fontSize: '0.95rem', color: '#475569' }}>
                        <strong style={{ color: '#334155' }}>Rate:</strong> {guide.daily_rate_inr} INR / day
                      </p>
                    </div>

                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${guide.email}&su=${subject}&body=${body}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textAlign: 'center', display: 'block', padding: '12px', background: '#fffaf0', border: '2px solid #f97316', color: '#f97316', fontWeight: 700, textDecoration: 'none', borderRadius: '8px', transition: 'all 0.2s' }}
                      onMouseOver={(e) => { e.target.style.background = '#f97316'; e.target.style.color = '#fff'; }}
                      onMouseOut={(e) => { e.target.style.background = '#fffaf0'; e.target.style.color = '#f97316'; }}
                    >
                      ✉️ Contact via Gmail
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </main>
    </div>
  );
}

export default function GuidePageWrapper() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', color: '#fff', textAlign: 'center' }}>Loading Guide Directory...</div>}>
      <GuideContent />
    </Suspense>
  );
}