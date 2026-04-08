"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

// The Dynamic Food Database
const FOOD_DATABASE = {
  "kerala": [
    { name: "Kerala Sadhya", desc: "A traditional vegetarian feast served on a banana leaf." },
    { name: "Karimeen Pollichathu", desc: "Pearl spot fish marinated in spices and baked in banana leaf." },
    { name: "Thalassery Biryani", desc: "A unique, aromatic biryani originating from the Malabar coast." }
  ],
  "maharashtra": [
    { name: "Vada Pav", desc: "The iconic street food of Mumbai, a spicy potato dumpling in a bun." },
    { name: "Misal Pav", desc: "A spicy curry made of sprouted moth beans topped with farsan." },
    { name: "Puran Poli", desc: "A sweet flatbread stuffed with a sweet lentil filling." }
  ],
  "delhi": [
    { name: "Chole Bhature", desc: "Spicy chickpea curry served with fluffy fried bread." },
    { name: "Butter Chicken", desc: "Classic rich and creamy tomato-based chicken curry." },
    { name: "Aloo Tikki Chaat", desc: "Crispy potato patties topped with sweet and spicy chutneys." }
  ],
  "rajasthan": [
    { name: "Dal Baati Churma", desc: "Hard wheat rolls served with spicy lentil curry and sweet crushed wheat." },
    { name: "Laal Maas", desc: "A fiery mutton curry cooked with red mathania chilies." },
    { name: "Pyaaz Kachori", desc: "Deep-fried pastry filled with a spicy onion mixture." }
  ],
  "tamil nadu": [
    { name: "Idli Sambar", desc: "Steamed rice cakes served with a lentil-based vegetable stew." },
    { name: "Chettinad Chicken", desc: "A fiery, aromatic chicken curry from the Chettinad region." },
    { name: "Pongal", desc: "A comforting dish of rice and lentils cooked with black pepper and cumin." }
  ],
  "punjab": [
    { name: "Sarson Ka Saag", desc: "Mustard greens cooked with spices, served with Makki ki Roti." },
    { name: "Amritsari Kulcha", desc: "Stuffed flatbread baked in a tandoor, served with chole." },
    { name: "Lassi", desc: "A refreshing, creamy yogurt-based drink, sweet or salted." }
  ],
  "gujarat": [
    { name: "Dhokla", desc: "A savory, steamed cake made from fermented batter of rice and chickpeas." },
    { name: "Gujarati Thali", desc: "A platter of diverse vegetarian dishes, balancing sweet, salty, and spicy." },
    { name: "Khandvi", desc: "Soft, tightly rolled bite-sized snacks made of gram flour and yogurt." }
  ],
  "west bengal": [
    { name: "Kosha Mangsho", desc: "Slow-cooked, spicy mutton curry." },
    { name: "Roshogolla", desc: "Spongy cottage cheese balls soaked in light sugar syrup." },
    { name: "Macher Jhol", desc: "A traditional, light and spicy fish curry." }
  ],
  "karnataka": [
    { name: "Bisi Bele Bath", desc: "A spicy, rice-based dish with lentils and vegetables." },
    { name: "Mysore Pak", desc: "A rich sweet made of generous amounts of ghee, sugar, and gram flour." },
    { name: "Neer Dosa", desc: "A delicate, lacy crepe made from rice batter." }
  ]
};

// Fallback if region is unknown
const DEFAULT_DISHES = [
  { name: "Masala Dosa", desc: "A crispy crepe made from rice and lentils, filled with potato curry." },
  { name: "Biryani", desc: "A highly flavorful mixed rice dish cooked with spices and meat or vegetables." },
  { name: "Paneer Butter Masala", desc: "Rich and creamy curry made with cottage cheese in a tomato sauce." }
];

function FoodContent() {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const initialQuery = searchParams.get("q") || "";

  const [input, setInput] = useState(initialQuery);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentLat, setCurrentLat] = useState(lat);
  const [currentLon, setCurrentLon] = useState(lon);

  // New States for Dynamic Food
  const [localDishes, setLocalDishes] = useState(DEFAULT_DISHES);
  const [detectedLocationName, setDetectedLocationName] = useState("your area");

  // Reverse Geocoding: Turn Lat/Lon into a State/City
  const detectRegion = async (fetchLat, fetchLon) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${fetchLat}&lon=${fetchLon}`);
      const data = await res.json();

      const state = (data.address?.state || "").toLowerCase();
      const city = (data.address?.city || data.address?.town || "").toLowerCase();

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
    } catch (e) {
      console.error("Reverse geocoding failed", e);
    }
  };

  const fetchFood = async (queryToFetch, fetchLat, fetchLon) => {
    if (!fetchLat || !fetchLon) {
      setError("Location missing. Please enable GPS permissions.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/food?lat=${fetchLat}&lon=${fetchLon}&q=${encodeURIComponent(queryToFetch)}`);
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
      setCurrentLat(lat);
      setCurrentLon(lon);
      detectRegion(lat, lon);
      fetchFood(initialQuery, lat, lon);
    } else {
      setLoading(true);
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pLat = position.coords.latitude;
            const pLon = position.coords.longitude;
            setCurrentLat(pLat);
            setCurrentLon(pLon);
            detectRegion(pLat, pLon);
            fetchFood(initialQuery, pLat, pLon);
          },
          (err) => {
            setError("Location access denied or unavailable. Please enable GPS permissions.");
            setLoading(false);
          }
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
    fetchFood(input.trim() ? input : "", currentLat, currentLon);
  };

  const triggerFamous = (foodName) => {
    setInput(foodName);
    fetchFood(foodName, currentLat, currentLon);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingBottom: '40px' }}>

      <main style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 24px', display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

        {/* Recommendations Column */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-card animate-fade-in-up" style={{ padding: '24px', background: '#fffaf0', border: '1px solid #fed7aa', borderRadius: '16px' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#ea580c', marginBottom: '8px', fontWeight: 800 }}>Famous in {detectedLocationName}</h2>
            <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '20px', lineHeight: '1.5' }}>Not sure what to eat? Tap these local favorites to scan for nearby options!</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {localDishes.map(food => (
                <div key={food.name} style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '6px', fontWeight: 700 }}>{food.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '14px', lineHeight: '1.4' }}>{food.desc}</p>
                  <button onClick={() => triggerFamous(food.name)} className="btn-secondary" style={{ padding: '8px 12px', fontSize: '0.85rem', width: '100%', background: '#fff', border: '2px solid #ea580c', color: '#ea580c', fontWeight: 700, borderRadius: '8px', cursor: 'pointer', transition: 'all 0.2s' }}>
                    Find {food.name} 🔍
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Directory Column */}
        <div className="glass-card animate-fade-in-up" style={{ flex: '2 1 600px', padding: '32px', display: 'flex', flexDirection: 'column', minHeight: '600px', animationDelay: '0.1s', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What are you hungry for? (e.g. Pizza, Biryani...)"
              style={{ flex: 1, padding: '16px 20px', borderRadius: '8px', border: '2px solid #cbd5e1', background: '#f8fafc', color: '#0f172a', fontSize: '1.05rem', outline: 'none' }}
              disabled={loading}
            />
            <button type="submit" className="btn-primary" disabled={loading} style={{ background: '#ea580c', color: '#fff', fontSize: '1.05rem', padding: '0 28px', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 700 }}>
              {loading ? "Scanning..." : "Search"}
            </button>
          </form>

          {error && <div style={{ padding: '12px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px', marginBottom: '24px', fontWeight: 600, border: '1px solid #f87171' }}>⚠️ {error}</div>}

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', border: '4px solid #f3f4f6', borderTopColor: '#ea580c', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
                <p style={{ color: '#64748b', fontWeight: 500 }}>Scanning local restaurants...</p>
              </div>
            ) : places.length === 0 ? (
              <div style={{ padding: '60px 20px', textAlign: 'center', color: '#475569', background: '#f8fafc', borderRadius: '12px', border: '2px dashed #cbd5e1' }}>
                <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '8px', fontWeight: 700 }}>No nearby restaurants found</h3>
                <p style={{ fontSize: '1rem' }}>Try searching for something else or expanding your area.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {places.map((place, i) => (
                  <div key={i} style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0', borderTop: '4px solid #ea580c', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', color: '#0f172a', fontWeight: 800, marginBottom: '8px' }}>{place.name}</h3>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {place.cuisine && (
                          <span style={{ background: '#ffedd5', color: '#c2410c', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 700 }}>{place.cuisine.toUpperCase()}</span>
                        )}
                        <span style={{ background: '#f1f5f9', color: '#475569', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px', fontWeight: 600 }}>Type: {place.amenity}</span>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '16px' }}>
                        <strong style={{ color: '#0f172a' }}>Hours:</strong> {place.opening_hours || 'Not listed'}
                      </p>
                    </div>

                    <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`}
                        target="_blank" rel="noopener noreferrer"
                        style={{ padding: '10px 16px', background: '#0f172a', color: '#fff', fontSize: '0.9rem', textDecoration: 'none', borderRadius: '8px', fontWeight: 600, textAlign: 'center', width: '100%', transition: 'background 0.2s' }}
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
      </main>

      {/* Global CSS for spinner animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}

export default function FoodPageWrapper() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', color: '#0f172a', textAlign: 'center', fontWeight: 600 }}>Loading the Food Directory...</div>}>
      <FoodContent />
    </Suspense>
  );
}