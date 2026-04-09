// "use client";

// import { useSearchParams } from "next/navigation";
// import { useEffect, useState, Suspense } from "react";

// // The Dynamic Food Database
// const FOOD_DATABASE = {
//   "kerala": [
//     { name: "Kerala Sadhya", desc: "A traditional vegetarian feast served on a banana leaf." },
//     { name: "Karimeen Pollichathu", desc: "Pearl spot fish marinated in spices and baked in banana leaf." },
//     { name: "Thalassery Biryani", desc: "A unique, aromatic biryani originating from the Malabar coast." }
//   ],
//   "maharashtra": [
//     { name: "Vada Pav", desc: "The iconic street food of Mumbai, a spicy potato dumpling in a bun." },
//     { name: "Misal Pav", desc: "A spicy curry made of sprouted moth beans topped with farsan." },
//     { name: "Puran Poli", desc: "A sweet flatbread stuffed with a sweet lentil filling." }
//   ],
//   "delhi": [
//     { name: "Chole Bhature", desc: "Spicy chickpea curry served with fluffy fried bread." },
//     { name: "Butter Chicken", desc: "Classic rich and creamy tomato-based chicken curry." },
//     { name: "Aloo Tikki Chaat", desc: "Crispy potato patties topped with sweet and spicy chutneys." }
//   ],
//   "rajasthan": [
//     { name: "Dal Baati Churma", desc: "Hard wheat rolls served with spicy lentil curry and sweet crushed wheat." },
//     { name: "Laal Maas", desc: "A fiery mutton curry cooked with red mathania chilies." },
//     { name: "Pyaaz Kachori", desc: "Deep-fried pastry filled with a spicy onion mixture." }
//   ],
//   "tamil nadu": [
//     { name: "Idli Sambar", desc: "Steamed rice cakes served with a lentil-based vegetable stew." },
//     { name: "Chettinad Chicken", desc: "A fiery, aromatic chicken curry from the Chettinad region." },
//     { name: "Pongal", desc: "A comforting dish of rice and lentils cooked with black pepper and cumin." }
//   ],
//   "punjab": [
//     { name: "Sarson Ka Saag", desc: "Mustard greens cooked with spices, served with Makki ki Roti." },
//     { name: "Amritsari Kulcha", desc: "Stuffed flatbread baked in a tandoor, served with chole." },
//     { name: "Lassi", desc: "A refreshing, creamy yogurt-based drink, sweet or salted." }
//   ],
//   "gujarat": [
//     { name: "Dhokla", desc: "A savory, steamed cake made from fermented batter of rice and chickpeas." },
//     { name: "Gujarati Thali", desc: "A platter of diverse vegetarian dishes, balancing sweet, salty, and spicy." },
//     { name: "Khandvi", desc: "Soft, tightly rolled bite-sized snacks made of gram flour and yogurt." }
//   ],
//   "west bengal": [
//     { name: "Kosha Mangsho", desc: "Slow-cooked, spicy mutton curry." },
//     { name: "Roshogolla", desc: "Spongy cottage cheese balls soaked in light sugar syrup." },
//     { name: "Macher Jhol", desc: "A traditional, light and spicy fish curry." }
//   ],
//   "karnataka": [
//     { name: "Bisi Bele Bath", desc: "A spicy, rice-based dish with lentils and vegetables." },
//     { name: "Mysore Pak", desc: "A rich sweet made of generous amounts of ghee, sugar, and gram flour." },
//     { name: "Neer Dosa", desc: "A delicate, lacy crepe made from rice batter." }
//   ]
// };

// // Fallback if region is unknown
// const DEFAULT_DISHES = [
//   { name: "Masala Dosa", desc: "A crispy crepe made from rice and lentils, filled with potato curry." },
//   { name: "Biryani", desc: "A highly flavorful mixed rice dish cooked with spices and meat or vegetables." },
//   { name: "Paneer Butter Masala", desc: "Rich and creamy curry made with cottage cheese in a tomato sauce." }
// ];

// function FoodContent() {
//   const searchParams = useSearchParams();
//   const lat = searchParams.get("lat");
//   const lon = searchParams.get("lon");
//   const initialQuery = searchParams.get("q") || "";

//   const [input, setInput] = useState(initialQuery);
//   const [places, setPlaces] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const [currentLat, setCurrentLat] = useState(lat);
//   const [currentLon, setCurrentLon] = useState(lon);

//   // New States for Dynamic Food
//   const [localDishes, setLocalDishes] = useState(DEFAULT_DISHES);
//   const [detectedLocationName, setDetectedLocationName] = useState("your area");

//   // Reverse Geocoding: Turn Lat/Lon into a State/City
//   const detectRegion = async (fetchLat, fetchLon) => {
//     try {
//       const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${fetchLat}&lon=${fetchLon}`);
//       const data = await res.json();

//       const state = (data.address?.state || "").toLowerCase();
//       const city = (data.address?.city || data.address?.town || "").toLowerCase();

//       let matched = false;
//       for (const [region, dishes] of Object.entries(FOOD_DATABASE)) {
//         if (state.includes(region) || city.includes(region)) {
//           setLocalDishes(dishes);
//           setDetectedLocationName(data.address?.state || data.address?.city || region);
//           matched = true;
//           break;
//         }
//       }

//       if (!matched) {
//         setLocalDishes(DEFAULT_DISHES);
//         setDetectedLocationName(state || city || "India");
//       }
//     } catch (e) {
//       console.error("Reverse geocoding failed", e);
//     }
//   };

//   const fetchFood = async (queryToFetch, fetchLat, fetchLon) => {
//     if (!fetchLat || !fetchLon) {
//       setError("Location missing. Please enable GPS permissions.");
//       setLoading(false);
//       return;
//     }
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch(`/api/food?lat=${fetchLat}&lon=${fetchLon}&q=${encodeURIComponent(queryToFetch)}`);
//       const data = await res.json();
//       if (!res.ok) throw new Error(data.error || "Failed to fetch data");
//       setPlaces(data.places || []);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (lat && lon) {
//       setCurrentLat(lat);
//       setCurrentLon(lon);
//       detectRegion(lat, lon);
//       fetchFood(initialQuery, lat, lon);
//     } else {
//       setLoading(true);
//       if ("geolocation" in navigator) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             const pLat = position.coords.latitude;
//             const pLon = position.coords.longitude;
//             setCurrentLat(pLat);
//             setCurrentLon(pLon);
//             detectRegion(pLat, pLon);
//             fetchFood(initialQuery, pLat, pLon);
//           },
//           (err) => {
//             setError("Location access denied or unavailable. Please enable GPS permissions.");
//             setLoading(false);
//           }
//         );
//       } else {
//         setError("Geolocation is not supported by your browser.");
//         setLoading(false);
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [lat, lon]);

//   const handleCustomSubmit = (e) => {
//     e.preventDefault();
//     fetchFood(input.trim() ? input : "", currentLat, currentLon);
//   };

//   const triggerFamous = (foodName) => {
//     setInput(foodName);
//     fetchFood(foodName, currentLat, currentLon);
//   };

//   return (
//     <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingBottom: '40px' }}>

//       <main style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 24px', display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

//         {/* Recommendations Column */}
//         <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
//           <div className="glass-card animate-fade-in-up" style={{ padding: '24px', background: '#fffaf0', border: '1px solid #fed7aa', borderRadius: '16px' }}>
//             <h2 style={{ fontSize: '1.2rem', color: '#ea580c', marginBottom: '8px', fontWeight: 800 }}>Famous in {detectedLocationName}</h2>
//             <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.5' }}>Not sure what to eat? Tap these local favorites to scan for nearby options!</p>

//             <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
//               {localDishes.map(food => (
//                 <div key={food.name} style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
//                   <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '6px', fontWeight: 700 }}>{food.name}</h3>
//                   <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '14px', lineHeight: '1.4' }}>{food.desc}</p>
//                   <button onClick={() => triggerFamous(food.name)} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '0.85rem', width: '100%', background: '#fff', border: '2px solid #ea580c', color: '#ea580c', fontWeight: 700, borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
//                     Find {food.name} 🔍
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Directory Column */}
//         <div className="glass-card animate-fade-in-up" style={{ flex: '2 1 600px', padding: '32px', display: 'flex', flexDirection: 'column', minHeight: '600px', animationDelay: '0.1s', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
//           <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
//             <input
//               type="text"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="What are you hungry for? (e.g. Pizza, Biryani...)"
//               style={{ flex: 1, padding: '16px 20px', borderRadius: '8px', border: '2px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontSize: '1.05rem', outline: 'none' }}
//               disabled={loading}
//             />
//             <button type="submit" className="btn-primary" disabled={loading} style={{ background: '#ea580c', color: '#fff', fontSize: '1.05rem', padding: '0 28px', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700 }}>
//               {loading ? "Scanning..." : "Search"}
//             </button>
//           </form>

//           {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '24px', fontWeight: 600, border: '1px solid #f87171' }}>⚠️ {error}</div>}

//           <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
//             {loading ? (
//               <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: '16px' }}>
//                 <div style={{ width: '40px', height: '40px', border: '4px solid #f3f4f6', borderTopColor: '#ea580c', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
//                 <p style={{ color: '#64748b', fontWeight: 500 }}>Scanning local restaurants...</p>
//               </div>
//             ) : places.length === 0 ? (
//               <div style={{ padding: '60px 20px', textAlign: 'center', color: '#475569', background: '#f8fafc', borderRadius: '12px', border: '2px dashed #cbd5e1' }}>
//                 <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '8px', fontWeight: 700 }}>No nearby restaurants found</h3>
//                 <p style={{ fontSize: '1rem' }}>Try searching for something else or expanding your area.</p>
//               </div>
//             ) : (
//               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
//                 {places.map((place, i) => (
//                   <div key={i} style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', borderTop: '4px solid #ea580c', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
//                     <div>
//                       <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800, marginBottom: '8px' }}>{place.name}</h3>
//                       <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
//                         {place.cuisine && (
//                           <span style={{ background: '#ffedd5', color: '#c2410c', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 700 }}>{place.cuisine.toUpperCase()}</span>
//                         )}
//                         <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>Type: {place.amenity}</span>
//                       </div>
//                       <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '16px' }}>
//                         <strong style={{ color: '#0f172a' }}>Hours:</strong> {place.opening_hours || 'Not listed'}
//                       </p>
//                     </div>

//                     <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
//                       <a
//                         href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`}
//                         target="_blank" rel="noopener noreferrer"
//                         style={{ padding: '10px 16px', background: '#0f172a', color: '#fff', fontSize: '0.9rem', textDecoration: 'none', borderRadius: '8px', fontWeight: 600, textAlign: 'center', width: '100%', transition: 'background 0.2s' }}
//                       >
//                         📍 Get Directions
//                       </a>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       {/* Global CSS for spinner animation */}
//       <style dangerouslySetInnerHTML={{
//         __html: `
//         @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
//       `}} />
//     </div>
//   );
// }

// export default function FoodPageWrapper() {
//   return (
//     <Suspense fallback={<div style={{ padding: '40px', color: '#0f172a', textAlign: 'center', fontWeight: 600 }}>Loading the Food Directory...</div>}>
//       <FoodContent />
//     </Suspense>
//   );
// }
//new implementation
"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

const FOOD_DATABASE = {
  "kerala": [
    { name: "Kerala Sadhya", desc: "A traditional vegetarian feast served on a banana leaf.", emoji: "🍃" },
    { name: "Karimeen Pollichathu", desc: "Pearl spot fish marinated in spices and baked in banana leaf.", emoji: "🐟" },
    { name: "Thalassery Biryani", desc: "A unique, aromatic biryani originating from the Malabar coast.", emoji: "🍚" }
  ],
  "maharashtra": [
    { name: "Vada Pav", desc: "The iconic street food of Mumbai, a spicy potato dumpling in a bun.", emoji: "🍔" },
    { name: "Misal Pav", desc: "A spicy curry made of sprouted moth beans topped with farsan.", emoji: "🌶️" },
    { name: "Puran Poli", desc: "A sweet flatbread stuffed with a sweet lentil filling.", emoji: "🫓" }
  ],
  "delhi": [
    { name: "Chole Bhature", desc: "Spicy chickpea curry served with fluffy fried bread.", emoji: "🫘" },
    { name: "Butter Chicken", desc: "Classic rich and creamy tomato-based chicken curry.", emoji: "🍗" },
    { name: "Aloo Tikki Chaat", desc: "Crispy potato patties topped with sweet and spicy chutneys.", emoji: "🥔" }
  ],
  "rajasthan": [
    { name: "Dal Baati Churma", desc: "Hard wheat rolls served with spicy lentil curry and sweet crushed wheat.", emoji: "🥣" },
    { name: "Laal Maas", desc: "A fiery mutton curry cooked with red mathania chilies.", emoji: "🔥" },
    { name: "Pyaaz Kachori", desc: "Deep-fried pastry filled with a spicy onion mixture.", emoji: "🧅" }
  ],
  "tamil nadu": [
    { name: "Idli Sambar", desc: "Steamed rice cakes served with a lentil-based vegetable stew.", emoji: "🫙" },
    { name: "Chettinad Chicken", desc: "A fiery, aromatic chicken curry from the Chettinad region.", emoji: "🍗" },
    { name: "Pongal", desc: "A comforting dish of rice and lentils cooked with black pepper and cumin.", emoji: "🍚" }
  ],
  "punjab": [
    { name: "Sarson Ka Saag", desc: "Mustard greens cooked with spices, served with Makki ki Roti.", emoji: "🥬" },
    { name: "Amritsari Kulcha", desc: "Stuffed flatbread baked in a tandoor, served with chole.", emoji: "🫓" },
    { name: "Lassi", desc: "A refreshing, creamy yogurt-based drink, sweet or salted.", emoji: "🥛" }
  ],
  "gujarat": [
    { name: "Dhokla", desc: "A savory, steamed cake made from fermented batter of rice and chickpeas.", emoji: "🟡" },
    { name: "Gujarati Thali", desc: "A platter of diverse vegetarian dishes, balancing sweet, salty, and spicy.", emoji: "🍽️" },
    { name: "Khandvi", desc: "Soft, tightly rolled bite-sized snacks made of gram flour and yogurt.", emoji: "🌀" }
  ],
  "west bengal": [
    { name: "Kosha Mangsho", desc: "Slow-cooked, spicy mutton curry.", emoji: "🍖" },
    { name: "Roshogolla", desc: "Spongy cottage cheese balls soaked in light sugar syrup.", emoji: "🍬" },
    { name: "Macher Jhol", desc: "A traditional, light and spicy fish curry.", emoji: "🐠" }
  ],
  "karnataka": [
    { name: "Bisi Bele Bath", desc: "A spicy, rice-based dish with lentils and vegetables.", emoji: "🍛" },
    { name: "Mysore Pak", desc: "A rich sweet made of generous amounts of ghee, sugar, and gram flour.", emoji: "🟨" },
    { name: "Neer Dosa", desc: "A delicate, lacy crepe made from rice batter.", emoji: "🫔" }
  ]
};

const DEFAULT_DISHES = [
  { name: "Masala Dosa", desc: "A crispy crepe made from rice and lentils, filled with potato curry.", emoji: "🥞" },
  { name: "Biryani", desc: "A highly flavorful mixed rice dish cooked with spices and meat or vegetables.", emoji: "🍚" },
  { name: "Paneer Butter Masala", desc: "Rich and creamy curry made with cottage cheese in a tomato sauce.", emoji: "🧀" }
];

function FoodContent() {
  const searchParams  = useSearchParams();
  const lat           = searchParams.get("lat");
  const lon           = searchParams.get("lon");
  const initialQuery  = searchParams.get("q") || "";

  const [input, setInput]                         = useState(initialQuery);
  const [places, setPlaces]                       = useState([]);
  const [loading, setLoading]                     = useState(true);
  const [error, setError]                         = useState(null);
  const [currentLat, setCurrentLat]               = useState(lat);
  const [currentLon, setCurrentLon]               = useState(lon);
  const [localDishes, setLocalDishes]             = useState(DEFAULT_DISHES);
  const [detectedLocationName, setDetectedLocationName] = useState("your area");
  const [searchedQuery, setSearchedQuery]         = useState(initialQuery);

  const detectRegion = async (fetchLat, fetchLon) => {
    try {
      const res  = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${fetchLat}&lon=${fetchLon}`);
      const data = await res.json();
      const state = (data.address?.state || "").toLowerCase();
      const city  = (data.address?.city || data.address?.town || "").toLowerCase();
      let matched = false;
      for (const [region, dishes] of Object.entries(FOOD_DATABASE)) {
        if (state.includes(region) || city.includes(region)) {
          setLocalDishes(dishes);
          setDetectedLocationName(data.address?.state || data.address?.city || region);
          matched = true;
          break;
        }
      }
      if (!matched) {
        setLocalDishes(DEFAULT_DISHES);
        setDetectedLocationName(state || city || "India");
      }
    } catch (e) { console.error("Reverse geocoding failed", e); }
  };

  const fetchFood = async (queryToFetch, fetchLat, fetchLon) => {
    if (!fetchLat || !fetchLon) {
      setError("Location missing. Please enable GPS permissions.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setSearchedQuery(queryToFetch);
    try {
      const res  = await fetch(`/api/food?lat=${fetchLat}&lon=${fetchLon}&q=${encodeURIComponent(queryToFetch)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch data");
      setPlaces(data.places || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lat && lon) {
      setCurrentLat(lat); setCurrentLon(lon);
      detectRegion(lat, lon);
      fetchFood(initialQuery, lat, lon);
    } else {
      setLoading(true);
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pLat = position.coords.latitude;
            const pLon = position.coords.longitude;
            setCurrentLat(pLat); setCurrentLon(pLon);
            detectRegion(pLat, pLon);
            fetchFood(initialQuery, pLat, pLon);
          },
          () => { setError("Location access denied. Please enable GPS permissions."); setLoading(false); }
        );
      } else {
        setError("Geolocation is not supported by your browser.");
        setLoading(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    fetchFood(input.trim() || "", currentLat, currentLon);
  };

  const triggerFamous = (foodName) => {
    setInput(foodName);
    fetchFood(foodName, currentLat, currentLon);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        body { font-family: 'DM Sans', sans-serif; -webkit-font-smoothing: antialiased; margin: 0; background: #fafaf9; }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.4); opacity: 0.6; }
        }

        .fade-up { animation: fade-up 0.55s ease both; }
        .d0 { animation-delay: 0s; }
        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.2s; }

        .font-display { font-family: 'Playfair Display', serif; }

        /* Search input */
        .search-input {
          flex: 1; padding: 14px 18px;
          border: 1.5px solid #e2e8f0; border-radius: 14px;
          font-size: 15px; font-family: 'DM Sans', sans-serif;
          color: #0f172a; background: #fff; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .search-input:focus { border-color: #ea580c; box-shadow: 0 0 0 3px rgba(234,88,12,0.12); }
        .search-input:disabled { background: #f8fafc; color: #94a3b8; }

        /* Search button */
        .search-btn {
          padding: 14px 28px; background: #ea580c; color: #fff;
          font-size: 15px; font-weight: 700; border: none;
          border-radius: 14px; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.22s cubic-bezier(.22,.68,0,1.2);
          box-shadow: 0 4px 14px rgba(234,88,12,0.35);
          white-space: nowrap;
        }
        .search-btn:hover:not(:disabled) { background: #c2410c; transform: translateY(-1px); box-shadow: 0 8px 20px rgba(234,88,12,0.4); }
        .search-btn:disabled { background: #fed7aa; cursor: not-allowed; box-shadow: none; }

        /* Dish card */
        .dish-card {
          background: #fff; border-radius: 16px;
          border: 1px solid #fde8d8;
          padding: 18px; cursor: pointer;
          transition: all 0.25s ease;
        }
        .dish-card:hover { border-color: #ea580c; box-shadow: 0 8px 24px rgba(234,88,12,0.12); transform: translateY(-2px); }

        /* Find btn */
        .find-btn {
          width: 100%; padding: 10px 12px;
          background: transparent; border: 1.5px solid #ea580c;
          color: #ea580c; font-weight: 700; font-size: 13px;
          border-radius: 10px; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s ease;
          margin-top: 12px;
        }
        .find-btn:hover { background: #ea580c; color: #fff; }

        /* Result card */
        .result-card {
          background: #fff; border-radius: 16px;
          border: 1px solid #f1f5f9;
          overflow: hidden;
          transition: transform 0.28s cubic-bezier(.22,.68,0,1.2), box-shadow 0.28s ease;
          display: flex; flex-direction: column;
        }
        .result-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.09); }

        /* Direction button */
        .dir-btn {
          display: block; width: 100%; padding: 12px;
          background: #0f172a; color: #fff;
          font-size: 14px; font-weight: 700; text-decoration: none;
          text-align: center; border-radius: 10px;
          transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
        }
        .dir-btn:hover { background: #ea580c; transform: translateY(-1px); }

        /* Cuisine tag */
        .cuisine-tag {
          display: inline-flex; align-items: center;
          padding: 3px 10px; border-radius: 999px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Scrollable left panel */
        .left-panel { position: sticky; top: 24px; max-height: calc(100vh - 48px); overflow-y: auto; }
        .left-panel::-webkit-scrollbar { width: 4px; }
        .left-panel::-webkit-scrollbar-track { background: transparent; }
        .left-panel::-webkit-scrollbar-thumb { background: #fde8d8; border-radius: 99px; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#fafaf9' }}>

        {/* ════════════════════════
            HERO
        ════════════════════════ */}
        <div style={{ position: 'relative', background: '#0f172a', overflow: 'hidden', padding: '52px 24px 68px' }}>
          <img
            src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1800"
            alt=""
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.2 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(15,23,42,0.96) 0%, rgba(154,52,18,0.75) 100%)' }} />

          <div className="fade-up d0" style={{ position: 'relative', zIndex: 2, maxWidth: '1100px', margin: '0 auto' }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <a href="/" style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', fontWeight: 500, textDecoration: 'none' }}>Home</a>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>›</span>
              <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '13px', fontWeight: 500 }}>Food Finder</span>
            </div>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '7px', background: 'rgba(234,88,12,0.2)', border: '1px solid rgba(234,88,12,0.4)', borderRadius: '999px', padding: '5px 14px', marginBottom: '14px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fb923c', display: 'inline-block', animation: 'pulse-dot 1.8s ease infinite' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fed7aa' }}>Live · Near You</span>
            </div>

            <h1 className="font-display" style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 900, color: '#fff', margin: '0 0 10px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Food Near You
            </h1>
            <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.5)', margin: '0 0 20px', maxWidth: '440px', lineHeight: 1.65 }}>
              Discover local restaurants and regional specialties right where you are.
            </p>

            {/* Location badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '999px', padding: '6px 14px' }}>
              <span style={{ fontSize: '14px' }}>📍</span>
              <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontWeight: 500 }}>
                {detectedLocationName !== "your area" ? detectedLocationName : "Detecting location…"}
              </span>
            </div>
          </div>
        </div>

        {/* ════════════════════════
            MAIN
        ════════════════════════ */}
        <main style={{ maxWidth: '1100px', margin: '-32px auto 0', padding: '0 24px 80px', position: 'relative', zIndex: 10, display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* ── LEFT: Regional Dishes ── */}
          <div className="fade-up d1 left-panel" style={{ flex: '0 0 290px' }}>
            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #fde8d8', overflow: 'hidden', boxShadow: '0 4px 20px rgba(234,88,12,0.07)' }}>
              {/* Panel header */}
              <div style={{ background: 'linear-gradient(135deg, #fff7ed, #ffedd5)', padding: '20px 22px', borderBottom: '1px solid #fde8d8' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontSize: '18px' }}>🍽️</span>
                  <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#9a3412', margin: 0, fontFamily: "'Playfair Display', serif" }}>
                    Famous in {detectedLocationName}
                  </h2>
                </div>
                <p style={{ color: '#c2410c', fontSize: '12px', margin: 0, lineHeight: 1.5, fontWeight: 500 }}>
                  Tap a dish to find it nearby
                </p>
              </div>

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {localDishes.map((food, i) => (
                  <div key={food.name} className={`dish-card fade-up`} style={{ animationDelay: `${0.15 + i * 0.08}s` }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '22px', flexShrink: 0, lineHeight: 1 }}>{food.emoji}</span>
                      <div>
                        <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0f172a', margin: '0 0 3px', lineHeight: 1.2 }}>{food.name}</h3>
                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0, lineHeight: 1.5 }}>{food.desc}</p>
                      </div>
                    </div>
                    <button onClick={() => triggerFamous(food.name)} className="find-btn">
                      Find {food.name} →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Search + Results ── */}
          <div className="fade-up d2" style={{ flex: '1 1 560px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Search bar */}
            <div style={{ background: '#fff', borderRadius: '20px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="What are you hungry for? e.g. Biryani, Pizza, Dosa…"
                  className="search-input"
                  disabled={loading}
                />
                <button type="submit" className="search-btn" disabled={loading}>
                  {loading ? "Scanning…" : "Search 🔍"}
                </button>
              </form>
            </div>

            {/* Error */}
            {error && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 18px', background: '#fff1f2', border: '1.5px solid #fda4af', borderRadius: '14px' }}>
                <span style={{ fontSize: '18px' }}>⚠️</span>
                <span style={{ color: '#be123c', fontSize: '14px', fontWeight: 600 }}>{error}</span>
              </div>
            )}

            {/* Results area */}
            <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid #f1f5f9', minHeight: '400px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>

              {/* Results header bar */}
              {!loading && !error && (
                <div style={{ padding: '18px 24px', borderBottom: '1px solid #f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                      {places.length > 0 ? `${places.length} places found` : 'No results'}
                    </span>
                    {searchedQuery && (
                      <span style={{ fontSize: '13px', color: '#94a3b8', marginLeft: '8px' }}>for "{searchedQuery}"</span>
                    )}
                  </div>
                  {places.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '999px', padding: '4px 12px' }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                      <span style={{ fontSize: '12px', fontWeight: 700, color: '#15803d' }}>Open Now</span>
                    </div>
                  )}
                </div>
              )}

              <div style={{ padding: '20px 24px' }}>
                {/* Loading */}
                {loading && (
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px', gap: '16px' }}>
                    <div style={{ width: '44px', height: '44px', border: '3px solid #fed7aa', borderTopColor: '#ea580c', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                    <p style={{ color: '#94a3b8', fontWeight: 500, fontSize: '14px', margin: 0 }}>Scanning local restaurants…</p>
                  </div>
                )}

                {/* Empty state */}
                {!loading && !error && places.length === 0 && (
                  <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                    <div style={{ fontSize: '52px', marginBottom: '16px' }}>🍽️</div>
                    <h3 className="font-display" style={{ fontSize: '20px', fontWeight: 900, color: '#0f172a', margin: '0 0 8px' }}>Nothing found nearby</h3>
                    <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 auto', maxWidth: '300px', lineHeight: 1.65 }}>
                      Try searching for a different cuisine or tap a regional dish on the left.
                    </p>
                  </div>
                )}

                {/* Results grid */}
                {!loading && !error && places.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                    {places.map((place, i) => (
                      <div key={i} className="result-card" style={{ animationDelay: `${i * 0.06}s` }}>
                        {/* Accent bar */}
                        <div style={{ height: '4px', background: 'linear-gradient(90deg, #ea580c, #f97316)' }} />

                        <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          {/* Name + tags */}
                          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0f172a', margin: '0 0 10px', lineHeight: 1.25 }}>{place.name}</h3>

                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                            {place.cuisine && (
                              <span className="cuisine-tag" style={{ background: '#fff7ed', color: '#c2410c' }}>{place.cuisine}</span>
                            )}
                            <span className="cuisine-tag" style={{ background: '#f8fafc', color: '#64748b' }}>{place.amenity}</span>
                          </div>

                          {/* Hours */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '7px', background: '#f8fafc', borderRadius: '8px', padding: '8px 12px', marginBottom: '16px' }}>
                            <span style={{ fontSize: '13px' }}>🕐</span>
                            <span style={{ fontSize: '13px', color: '#475569', fontWeight: 500 }}>
                              {place.opening_hours || 'Hours not listed'}
                            </span>
                          </div>

                          {/* CTA */}
                          <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="dir-btn"
                            style={{ marginTop: 'auto' }}
                          >
                            📍 Get Directions
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default function FoodPageWrapper() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', background: '#fafaf9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '3px solid #fed7aa', borderTopColor: '#ea580c', animation: 'spin 0.8s linear infinite', margin: '0 auto 14px' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: '#94a3b8', fontWeight: 500, fontFamily: 'sans-serif', fontSize: '14px' }}>Loading Food Finder…</p>
        </div>
      </div>
    }>
      <FoodContent />
    </Suspense>
  );
}