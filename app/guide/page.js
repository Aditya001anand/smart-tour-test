// "use client";

// import { useSearchParams } from "next/navigation";
// import { useState, Suspense } from "react";
// import { useUser } from "@clerk/nextjs";

// // Separate databases for Regional Matching
// const SOUTH_GUIDES = [
//   { id: 's1', name: 'Siddharth Menon', email: 'siddharth@example.com', languages: ['Malayalam', 'English', 'Tamil'], specialty: 'History & Heritage', daily_rate_inr: 1500, rating: 4.8, reviews: 124, available_today: true },
//   { id: 's2', name: 'Lakshmi Pillai', email: 'lakshmi@example.com', languages: ['Malayalam', 'English'], specialty: 'Culinary & Culture', daily_rate_inr: 1200, rating: 4.9, reviews: 89, available_today: true },
//   { id: 's3', name: 'Arun Iyer', email: 'arun@example.com', languages: ['English', 'German', 'Tamil'], specialty: 'Wildlife & Trekking', daily_rate_inr: 2000, rating: 4.7, reviews: 56, available_today: false },
//   { id: 's4', name: 'Sneha Reddy', email: 'sneha@example.com', languages: ['Telugu', 'English', 'Hindi'], specialty: 'Temple Tours', daily_rate_inr: 1400, rating: 4.6, reviews: 112, available_today: true },
//   { id: 's5', name: 'Vishnu Nambiar', email: 'vishnu@example.com', languages: ['Malayalam', 'English'], specialty: 'Backwater Experiences', daily_rate_inr: 1600, rating: 4.9, reviews: 201, available_today: true },
// ];

// const NORTH_GUIDES = [
//   { id: 'n1', name: 'Rahul Sharma', email: 'rahul@example.com', languages: ['Hindi', 'English'], specialty: 'Forts & Palaces', daily_rate_inr: 1800, rating: 4.9, reviews: 310, available_today: true },
//   { id: 'n2', name: 'Priya Gupta', email: 'priya@example.com', languages: ['Hindi', 'English', 'Spanish'], specialty: 'Culinary Walks', daily_rate_inr: 1300, rating: 4.7, reviews: 145, available_today: true },
//   { id: 'n3', name: 'Vikram Singh', email: 'vikram@example.com', languages: ['Hindi', 'English', 'French'], specialty: 'Desert Safaris', daily_rate_inr: 2200, rating: 4.8, reviews: 92, available_today: true },
//   { id: 'n4', name: 'Neha Patel', email: 'neha@example.com', languages: ['Gujarati', 'Hindi', 'English'], specialty: 'Heritage Walks', daily_rate_inr: 1500, rating: 4.6, reviews: 78, available_today: false },
//   { id: 'n5', name: 'Amit Desai', email: 'amit@example.com', languages: ['Marathi', 'Hindi', 'English'], specialty: 'Street Food & Markets', daily_rate_inr: 1100, rating: 4.8, reviews: 215, available_today: true },
// ];

// // Validation Array: Supported Indian Regions/Cities
// const INDIAN_REGIONS = [
//   'kerala', 'tamil nadu', 'karnataka', 'andhra', 'telangana', 'maharashtra', 'gujarat', 'rajasthan', 'punjab', 'haryana', 'uttar pradesh', 'delhi', 'bengal', 'goa',
//   'chennai', 'bangalore', 'bengaluru', 'kochi', 'munnar', 'hyderabad', 'mysore', 'hampi', 'pondicherry', 'trivandrum',
//   'mumbai', 'pune', 'jaipur', 'udaipur', 'jodhpur', 'agra', 'lucknow', 'varanasi', 'kolkata', 'amritsar', 'ahmedabad', 'india'
// ];

// function GuideContent() {
//   const searchParams = useSearchParams();
//   const initialQuery = searchParams.get("prompt") || "";
//   const { user } = useUser();

//   const [place, setPlace] = useState(initialQuery);
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");

//   const [hasSearched, setHasSearched] = useState(false);
//   const [displayedGuides, setDisplayedGuides] = useState([]);
//   const [errorMsg, setErrorMsg] = useState(""); // New state for validation errors

//   const handleSearchGuides = () => {
//     setErrorMsg(""); // Clear old errors
//     if (!place) {
//       setErrorMsg("Please enter a destination.");
//       return;
//     }

//     const searchLower = place.toLowerCase();

//     // Check if the input exists in our Indian Regions array
//     const isIndianLocation = INDIAN_REGIONS.some(keyword => searchLower.includes(keyword));

//     if (!isIndianLocation) {
//       setErrorMsg("SmartTour currently only operates within India. Please enter a valid Indian city or state.");
//       return;
//     }

//     // Safety check for dates (backup to HTML5 validation)
//     if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
//       setErrorMsg("Your return date cannot be before your departure date.");
//       return;
//     }

//     // Determine North vs South
//     const southKeywords = ['kerala', 'tamil nadu', 'karnataka', 'andhra', 'telangana', 'chennai', 'bangalore', 'bengaluru', 'kochi', 'munnar', 'hyderabad', 'mysore', 'hampi', 'pondicherry', 'trivandrum'];
//     const isSouth = southKeywords.some(keyword => searchLower.includes(keyword));

//     const availableSouth = SOUTH_GUIDES.filter(guide => guide.available_today);
//     const availableNorth = NORTH_GUIDES.filter(guide => guide.available_today);

//     if (isSouth) {
//       setDisplayedGuides(availableSouth);
//     } else {
//       setDisplayedGuides(availableNorth);
//     }

//     setHasSearched(true);
//   };

//   const handleResetSearch = () => {
//     setHasSearched(false);
//     setDisplayedGuides([]);
//     setErrorMsg("");
//   };

//   return (
//     <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingBottom: '40px' }}>

//       <main style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>

//         {/* Planner Header Form */}
//         <div className="glass-card animate-fade-in-up" style={{ padding: '32px', background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)', borderRadius: '16px' }}>
//           <h2 style={{ fontSize: '1.4rem', color: '#f97316', marginBottom: '8px', fontWeight: 700 }}>Find Local Experts</h2>
//           <p style={{ color: '#475569', marginBottom: '16px' }}>Fill in your travel details to find certified local guides for your dates.</p>

//           {/* Error Message Display */}
//           {errorMsg && (
//             <div style={{ padding: '12px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '20px', fontWeight: 600, border: '1px solid #f87171' }}>
//               ⚠️ {errorMsg}
//             </div>
//           )}

//           <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
//             <div style={{ flex: '1 1 300px' }}>
//               <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '6px', fontWeight: 600 }}>FOR WHICH PLACE?</label>
//               <input
//                 type="text"
//                 value={place}
//                 onChange={e => setPlace(e.target.value)}
//                 placeholder="e.g. Jaipur, Kerala, Agra..."
//                 disabled={hasSearched}
//                 style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: hasSearched ? '#f1f5f9' : '#ffffff', color: hasSearched ? '#94a3b8' : '#0f172a', opacity: hasSearched ? 0.7 : 1 }}
//               />
//             </div>
//             <div style={{ flex: '1 1 200px' }}>
//               <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '6px', fontWeight: 600 }}>FROM WHEN?</label>
//               <input
//                 type="date"
//                 value={fromDate}
//                 onChange={e => setFromDate(e.target.value)}
//                 disabled={hasSearched}
//                 style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: hasSearched ? '#f1f5f9' : '#ffffff', color: hasSearched ? '#94a3b8' : '#0f172a', colorScheme: 'light', opacity: hasSearched ? 0.7 : 1 }}
//               />
//             </div>
//             <div style={{ flex: '1 1 200px' }}>
//               <label style={{ display: 'block', fontSize: '0.85rem', color: '#64748b', marginBottom: '6px', fontWeight: 600 }}>TO WHEN?</label>
//               <input
//                 type="date"
//                 value={toDate}
//                 onChange={e => setToDate(e.target.value)}
//                 disabled={hasSearched}
//                 min={fromDate} // HTML5 Validation: Cannot pick a date before the FROM date
//                 style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', background: hasSearched ? '#f1f5f9' : '#ffffff', color: hasSearched ? '#94a3b8' : '#0f172a', colorScheme: 'light', opacity: hasSearched ? 0.7 : 1 }}
//               />
//             </div>
//           </div>

//           {/* Dynamic Button State */}
//           {hasSearched ? (
//             <button onClick={handleResetSearch} style={{ background: '#f8fafc', color: '#334155', fontSize: '1rem', padding: '14px 28px', border: '2px solid #cbd5e1', width: '100%', cursor: 'pointer', borderRadius: '8px', fontWeight: 700, transition: 'all 0.2s' }}>
//               ✏️ Edit Search Parameters
//             </button>
//           ) : (
//             <button onClick={handleSearchGuides} className="btn-primary" style={{ background: '#f97316', color: '#fff', fontSize: '1rem', padding: '14px 28px', border: 'none', width: '100%', cursor: 'pointer', borderRadius: '8px', fontWeight: 700 }}>
//               🔍 Search Available Guides
//             </button>
//           )}
//         </div>

//         {/* Guides Grid */}
//         {hasSearched && (
//           <div className="animate-fade-in-up">
//             <h2 style={{ fontSize: '1.4rem', color: '#0f172a', marginBottom: '24px', fontWeight: 800 }}>
//               Available Tour Experts in {place}
//             </h2>
//             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
//               {displayedGuides.map((guide, i) => {
//                 const locationText = place || "your destination";
//                 const dateText = (fromDate && toDate) ? `from ${fromDate} to ${toDate}` : "for my upcoming dates";

//                 const subject = encodeURIComponent(`Tour Inquiry for ${locationText} ${dateText}`);
//                 const body = encodeURIComponent(
//                   `Hi ${guide.name},

// I am planning a trip to ${locationText} ${dateText}. 

// Could you please let me know your availability and rates? 

// Thanks,
// ${user?.firstName || 'Traveler'}
// ${user?.primaryEmailAddress?.emailAddress || ''}`
//                 );

//                 return (
//                   <div key={guide.id} className="animate-fade-in-up" style={{ padding: '24px', borderTop: '4px solid #f97316', animationDelay: `${i * 0.1}s`, display: 'flex', flexDirection: 'column', background: '#ffffff', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
//                       <div>
//                         <h3 style={{ fontSize: '1.3rem', color: '#0f172a', fontWeight: 800, marginBottom: '4px' }}>{guide.name}</h3>
//                         <div style={{ fontSize: '0.9rem', color: '#f59e0b', fontWeight: 700 }}>
//                           ⭐ {guide.rating} <span style={{ color: '#64748b', fontWeight: 500 }}>({guide.reviews} reviews)</span>
//                         </div>
//                       </div>
//                       <span className="badge" style={{ background: '#dcfce7', color: '#16a34a', fontSize: '0.75rem', padding: '6px 10px', borderRadius: '6px', fontWeight: 800 }}>🟢 AVAILABLE</span>
//                     </div>

//                     <div style={{ flex: 1, marginBottom: '24px' }}>
//                       <p style={{ fontSize: '0.95rem', color: '#475569', marginBottom: '8px' }}>
//                         <strong style={{ color: '#334155' }}>Specialty:</strong> {guide.specialty}
//                       </p>
//                       <p style={{ fontSize: '0.95rem', color: '#475569', marginBottom: '8px' }}>
//                         <strong style={{ color: '#334155' }}>Languages:</strong> {guide.languages.join(', ')}
//                       </p>
//                       <p style={{ fontSize: '0.95rem', color: '#475569' }}>
//                         <strong style={{ color: '#334155' }}>Rate:</strong> {guide.daily_rate_inr} INR / day
//                       </p>
//                     </div>

//                     <a
//                       href={`https://mail.google.com/mail/?view=cm&fs=1&to=${guide.email}&su=${subject}&body=${body}`}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={{ textAlign: 'center', display: 'block', padding: '12px', background: '#fffaf0', border: '2px solid #f97316', color: '#f97316', fontWeight: 700, textDecoration: 'none', borderRadius: '8px', transition: 'all 0.2s' }}
//                       onMouseOver={(e) => { e.target.style.background = '#f97316'; e.target.style.color = '#fff'; }}
//                       onMouseOut={(e) => { e.target.style.background = '#fffaf0'; e.target.style.color = '#f97316'; }}
//                     >
//                       ✉️ Contact via Gmail
//                     </a>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         )}

//       </main>
//     </div>
//   );
// }

// export default function GuidePageWrapper() {
//   return (
//     <Suspense fallback={<div style={{ padding: '40px', color: '#fff', textAlign: 'center' }}>Loading Guide Directory...</div>}>
//       <GuideContent />
//     </Suspense>
//   );
// }
//new implementation of guide page 
"use client";

import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { useUser } from "@clerk/nextjs";

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

const INDIAN_REGIONS = [
  'kerala', 'tamil nadu', 'karnataka', 'andhra', 'telangana', 'maharashtra', 'gujarat', 'rajasthan', 'punjab', 'haryana', 'uttar pradesh', 'delhi', 'bengal', 'goa',
  'chennai', 'bangalore', 'bengaluru', 'kochi', 'munnar', 'hyderabad', 'mysore', 'hampi', 'pondicherry', 'trivandrum',
  'mumbai', 'pune', 'jaipur', 'udaipur', 'jodhpur', 'agra', 'lucknow', 'varanasi', 'kolkata', 'amritsar', 'ahmedabad', 'india'
];

// Initials avatar color palette
const AVATAR_COLORS = [
  ['#fef3c7', '#d97706'], ['#dbeafe', '#1d4ed8'], ['#fce7f3', '#be185d'],
  ['#d1fae5', '#059669'], ['#ede9fe', '#7c3aed'], ['#ffedd5', '#ea580c'],
];

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
}

function StarRating({ rating }) {
  const full  = Math.floor(rating);
  const half  = rating % 1 >= 0.5;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill={i < full ? '#f59e0b' : (i === full && half ? 'url(#half)' : '#e2e8f0')}>
          <defs>
            <linearGradient id="half"><stop offset="50%" stopColor="#f59e0b"/><stop offset="50%" stopColor="#e2e8f0"/></linearGradient>
          </defs>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </span>
  );
}

function GuideContent() {
  const searchParams  = useSearchParams();
  const initialQuery  = searchParams.get("prompt") || "";
  const { user }      = useUser();

  const [place, setPlace]               = useState(initialQuery);
  const [fromDate, setFromDate]         = useState("");
  const [toDate, setToDate]             = useState("");
  const [hasSearched, setHasSearched]   = useState(false);
  const [displayedGuides, setDisplayedGuides] = useState([]);
  const [errorMsg, setErrorMsg]         = useState("");

  const handleSearchGuides = () => {
    setErrorMsg("");
    if (!place) { setErrorMsg("Please enter a destination."); return; }

    const searchLower = place.toLowerCase();
    const isIndianLocation = INDIAN_REGIONS.some(k => searchLower.includes(k));
    if (!isIndianLocation) {
      setErrorMsg("SmartTour currently only operates within India. Please enter a valid Indian city or state.");
      return;
    }
    if (fromDate && toDate && new Date(toDate) < new Date(fromDate)) {
      setErrorMsg("Your return date cannot be before your departure date.");
      return;
    }

    const southKeywords = ['kerala','tamil nadu','karnataka','andhra','telangana','chennai','bangalore','bengaluru','kochi','munnar','hyderabad','mysore','hampi','pondicherry','trivandrum'];
    const isSouth = southKeywords.some(k => searchLower.includes(k));
    setDisplayedGuides((isSouth ? SOUTH_GUIDES : NORTH_GUIDES).filter(g => g.available_today));
    setHasSearched(true);
  };

  const handleResetSearch = () => {
    setHasSearched(false);
    setDisplayedGuides([]);
    setErrorMsg("");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; margin: 0; background: #f8fafc; }

        @keyframes fade-up {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up  { animation: fade-up 0.55s ease both; }
        .d0 { animation-delay: 0s; }
        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.2s; }
        .d3 { animation-delay: 0.3s; }
        .d4 { animation-delay: 0.4s; }

        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%      { transform: translateX(-5px); }
          40%      { transform: translateX(5px); }
          60%      { transform: translateX(-3px); }
          80%      { transform: translateX(3px); }
        }
        .shake { animation: shake 0.38s ease; }

        .font-display { font-family: 'Playfair Display', serif; }

        /* Input */
        .field-input {
          width: 100%; padding: 13px 16px;
          border: 1.5px solid #e2e8f0; border-radius: 12px;
          font-size: 15px; font-family: 'DM Sans', sans-serif;
          color: #0f172a; background: #fff;
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .field-input:focus { border-color: #f97316; box-shadow: 0 0 0 3px rgba(249,115,22,0.12); }
        .field-input:disabled { background: #f8fafc; color: #94a3b8; cursor: not-allowed; }
        .field-input[type="date"] { color-scheme: light; }

        /* Guide card */
        .guide-card {
          background: #fff;
          border-radius: 20px;
          border: 1px solid #f1f5f9;
          overflow: hidden;
          transition: transform 0.3s cubic-bezier(.22,.68,0,1.2), box-shadow 0.3s ease;
          display: flex; flex-direction: column;
        }
        .guide-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.1);
        }

        /* Contact button */
        .contact-btn {
          display: block; width: 100%; text-align: center;
          padding: 13px 20px;
          background: #fff3e8; border: 1.5px solid #f97316;
          color: #f97316; font-weight: 700; font-size: 14px;
          text-decoration: none; border-radius: 12px;
          letter-spacing: 0.02em;
          transition: all 0.22s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .contact-btn:hover {
          background: #f97316; color: #fff;
          box-shadow: 0 6px 20px rgba(249,115,22,0.35);
          transform: translateY(-1px);
        }

        /* Search button */
        .search-btn {
          width: 100%; padding: 14px 20px;
          background: #f97316; color: #fff;
          font-size: 15px; font-weight: 700;
          border: none; border-radius: 12px;
          cursor: pointer; letter-spacing: 0.03em;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.22s cubic-bezier(.22,.68,0,1.2);
          box-shadow: 0 4px 16px rgba(249,115,22,0.35);
        }
        .search-btn:hover {
          background: #ea6a00;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(249,115,22,0.45);
        }

        /* Reset button */
        .reset-btn {
          width: 100%; padding: 14px 20px;
          background: #f8fafc; color: #475569;
          font-size: 15px; font-weight: 600;
          border: 1.5px solid #e2e8f0; border-radius: 12px;
          cursor: pointer; letter-spacing: 0.02em;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s ease;
        }
        .reset-btn:hover { background: #f1f5f9; border-color: #cbd5e1; color: #334155; }

        /* Tag pill */
        .tag {
          display: inline-flex; align-items: center;
          padding: 4px 10px; border-radius: 999px;
          font-size: 12px; font-weight: 600;
          background: #f1f5f9; color: #475569;
        }

        /* Hero banner */
        .hero-banner {
          position: relative; overflow: hidden;
          background: #0f172a;
          padding: 56px 24px 72px;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#f8fafc' }}>

        {/* ════════════════════════════
            HERO BANNER
        ════════════════════════════ */}
        <div className="hero-banner">
          {/* Subtle background image */}
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1800"
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.18 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(120,53,15,0.7) 100%)' }} />

          <div className="fade-up d0" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <a href="/" style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>Home</a>
              <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: '13px' }}>›</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: 500 }}>Guide Directory</span>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(249,115,22,0.18)', border: '1px solid rgba(249,115,22,0.35)', borderRadius: '999px', padding: '5px 14px', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fed7aa' }}>Certified Experts</span>
            </div>

            <h1 className="font-display" style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: '#fff', margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Find Your Local Guide
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.55)', margin: 0, maxWidth: '480px', lineHeight: 1.65 }}>
              Hand-picked, certified guides across India — ready to make your trip unforgettable.
            </p>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: '24px', marginTop: '28px', flexWrap: 'wrap' }}>
              {[{ icon: '✓', text: 'All guides verified' }, { icon: '★', text: 'Rated by travellers' }, { icon: '✉', text: 'Direct contact' }].map(b => (
                <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '7px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 500 }}>
                  <span style={{ color: '#f97316' }}>{b.icon}</span> {b.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════════════════════════════
            MAIN CONTENT
        ════════════════════════════ */}
        <main style={{ maxWidth: '1100px', margin: '-32px auto 0', padding: '0 24px 80px', position: 'relative', zIndex: 10 }}>

          {/* ── SEARCH FORM ── */}
          <div className="fade-up d1" style={{ background: '#fff', borderRadius: '20px', padding: '36px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', border: '1px solid #f1f5f9', marginBottom: '36px' }}>
            <div style={{ marginBottom: '24px' }}>
              <h2 className="font-display" style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: '0 0 6px', letterSpacing: '-0.01em' }}>
                Search Available Guides
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>Enter your destination and travel dates to see who's available.</p>
            </div>

            {/* Error */}
            {errorMsg && (
              <div className="shake" style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '14px 16px', background: '#fff1f2', border: '1.5px solid #fda4af', borderRadius: '12px', marginBottom: '24px' }}>
                <span style={{ fontSize: '16px', flexShrink: 0 }}>⚠️</span>
                <span style={{ color: '#be123c', fontSize: '14px', fontWeight: 600, lineHeight: 1.5 }}>{errorMsg}</span>
              </div>
            )}

            {/* Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
              {/* Destination */}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>
                  Destination
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px', pointerEvents: 'none' }}>📍</span>
                  <input
                    type="text"
                    value={place}
                    onChange={e => setPlace(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && !hasSearched && handleSearchGuides()}
                    placeholder="e.g. Jaipur, Kerala, Goa…"
                    disabled={hasSearched}
                    className="field-input"
                    style={{ paddingLeft: '42px' }}
                  />
                </div>
              </div>

              {/* From date */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>
                  From Date
                </label>
                <input
                  type="date"
                  value={fromDate}
                  onChange={e => setFromDate(e.target.value)}
                  disabled={hasSearched}
                  className="field-input"
                />
              </div>

              {/* To date */}
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>
                  To Date
                </label>
                <input
                  type="date"
                  value={toDate}
                  onChange={e => setToDate(e.target.value)}
                  disabled={hasSearched}
                  min={fromDate}
                  className="field-input"
                />
              </div>
            </div>

            {/* CTA */}
            {hasSearched ? (
              <button onClick={handleResetSearch} className="reset-btn">
                ✏️ Edit Search
              </button>
            ) : (
              <button onClick={handleSearchGuides} className="search-btn">
                Search Available Guides →
              </button>
            )}
          </div>

          {/* ── RESULTS ── */}
          {hasSearched && (
            <div>
              {/* Results header */}
              <div className="fade-up d1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <h2 className="font-display" style={{ fontSize: '24px', fontWeight: 900, color: '#0f172a', margin: '0 0 4px', letterSpacing: '-0.01em' }}>
                    Guides in {place}
                  </h2>
                  <p style={{ color: '#94a3b8', fontSize: '14px', margin: 0 }}>
                    {displayedGuides.length} expert{displayedGuides.length !== 1 ? 's' : ''} available today
                  </p>
                </div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#f0fdf9', border: '1px solid #99f6e4', borderRadius: '999px', padding: '6px 14px' }}>
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#059669' }}>Available Today</span>
                </div>
              </div>

              {/* Cards grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
                {displayedGuides.map((guide, i) => {
                  const [bgColor, textColor] = AVATAR_COLORS[i % AVATAR_COLORS.length];
                  const locationText = place || "your destination";
                  const dateText = (fromDate && toDate) ? `from ${fromDate} to ${toDate}` : "for my upcoming dates";
                  const subject = encodeURIComponent(`Tour Inquiry for ${locationText} ${dateText}`);
                  const body = encodeURIComponent(
                    `Hi ${guide.name},\n\nI am planning a trip to ${locationText} ${dateText}.\n\nCould you please let me know your availability and rates?\n\nThanks,\n${user?.firstName || 'Traveler'}\n${user?.primaryEmailAddress?.emailAddress || ''}`
                  );

                  return (
                    <div key={guide.id} className={`guide-card fade-up`} style={{ animationDelay: `${0.05 + i * 0.08}s` }}>
                      {/* Card top accent */}
                      <div style={{ height: '4px', background: 'linear-gradient(90deg, #f97316, #fbbf24)' }} />

                      <div style={{ padding: '28px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Guide header */}
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: '20px' }}>
                          {/* Avatar */}
                          <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: '16px', fontWeight: 800, color: textColor, fontFamily: "'Playfair Display', serif" }}>{getInitials(guide.name)}</span>
                          </div>

                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0f172a', margin: '0 0 4px', lineHeight: 1.2 }}>{guide.name}</h3>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <StarRating rating={guide.rating} />
                              <span style={{ fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>{guide.rating}</span>
                              <span style={{ fontSize: '12px', color: '#94a3b8' }}>({guide.reviews})</span>
                            </div>
                          </div>

                          {/* Available badge */}
                          <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '5px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '999px', padding: '4px 10px' }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                            <span style={{ fontSize: '11px', fontWeight: 700, color: '#15803d' }}>Today</span>
                          </div>
                        </div>

                        {/* Details */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1, marginBottom: '24px' }}>
                          {/* Specialty */}
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px' }}>🎯</div>
                            <div>
                              <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '2px' }}>Specialty</div>
                              <div style={{ fontSize: '14px', fontWeight: 600, color: '#334155' }}>{guide.specialty}</div>
                            </div>
                          </div>

                          {/* Languages */}
                          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '14px' }}>🗣️</div>
                            <div>
                              <div style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '6px' }}>Languages</div>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                                {guide.languages.map(lang => (
                                  <span key={lang} className="tag">{lang}</span>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Rate */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fafaf9', border: '1px solid #f1f5f9', borderRadius: '12px', padding: '12px 16px' }}>
                            <span style={{ fontSize: '14px' }}>💰</span>
                            <div>
                              <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '1px' }}>Daily Rate</span>
                              <span style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>₹{guide.daily_rate_inr.toLocaleString('en-IN')}</span>
                              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}> / day</span>
                            </div>
                          </div>
                        </div>

                        {/* Contact button */}
                        <a
                          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${guide.email}&su=${subject}&body=${body}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="contact-btn"
                        >
                          ✉️ Contact via Gmail
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Empty state (before search) */}
          {!hasSearched && (
            <div className="fade-up d2" style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '52px', marginBottom: '16px' }}>🧭</div>
              <h3 className="font-display" style={{ fontSize: '22px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>Ready to explore India?</h3>
              <p style={{ color: '#94a3b8', fontSize: '15px', margin: '0 auto', maxWidth: '360px', lineHeight: 1.65 }}>
                Enter your destination above to see available certified guides for your dates.
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default function GuidePageWrapper() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #f97316', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: '#94a3b8', fontWeight: 500, fontFamily: 'sans-serif' }}>Loading Guide Directory…</p>
        </div>
      </div>
    }>
      <GuideContent />
    </Suspense>
  );
}