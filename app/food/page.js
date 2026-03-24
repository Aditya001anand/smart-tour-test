"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";

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
      fetchFood(initialQuery, lat, lon);
    } else {
      setLoading(true);
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCurrentLat(position.coords.latitude);
            setCurrentLon(position.coords.longitude);
            fetchFood(initialQuery, position.coords.latitude, position.coords.longitude);
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

  const famousFoods = [
    { name: "Kerala Sadhya", desc: "A traditional vegetarian feast served on a banana leaf." },
    { name: "Karimeen Pollichathu", desc: "Pearl spot fish marinated in spices and baked in banana leaf." },
    { name: "Thalassery Biryani", desc: "A unique, aromatic biryani originating from the Malabar coast." },
  ];

  const triggerFamous = (foodName) => {
    setInput(foodName);
    fetchFood(foodName, currentLat, currentLon);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingBottom: '40px' }}>


      <main style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 24px', display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* Recommendations Column */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-card animate-fade-in-up" style={{ padding: '24px', background: 'rgba(230, 126, 34, 0.05)', border: '1px solid rgba(230, 126, 34, 0.2)' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#e67e22', marginBottom: '16px', fontWeight: 700 }}>Famous Local Dishes</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>Not sure what to eat? Tap these local favorites to scan for nearby options!</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {famousFoods.map(food => (
                <div key={food.name} style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{food.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{food.desc}</p>
                  <button onClick={() => triggerFamous(food.name)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '0.8rem', width: '100%' }}>
                    Find {food.name} 🔍
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Directory Column */}
        <div className="glass-card animate-fade-in-up" style={{ flex: '2 1 600px', padding: '32px', display: 'flex', flexDirection: 'column', minHeight: '600px', animationDelay: '0.1s' }}>
          <form onSubmit={handleCustomSubmit} style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="What are you hungry for? (e.g. Pizza, Burgers...)"
              style={{ flex: 1, padding: '16px 20px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', fontSize: '1.05rem' }}
              disabled={loading}
            />
            <button type="submit" className="btn-primary" disabled={loading} style={{ background: '#e67e22', color: '#fff', fontSize: '1.05rem', padding: '0 24px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer' }}>
              {loading ? "Scanning..." : "Search"}
            </button>
          </form>

          {error && <div className="badge badge-danger" style={{ padding: '12px', marginBottom: '24px' }}>⚠️ {error}</div>}

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: '16px' }}>
                <div className="spinner" style={{ width: '40px', height: '40px', borderTopColor: '#e67e22', borderBottomColor: '#e67e22' }}></div>
                <p style={{ color: 'var(--text-muted)' }}>Scanning OpenStreetMap database...</p>
              </div>
            ) : places.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <h3>No nearby restaurants found</h3>
                <p>Try searching for something else or expanding your area.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {places.map((place, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', borderTop: '4px solid #e67e22', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '6px' }}>{place.name}</h3>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {place.cuisine && (
                          <span className="badge badge-primary" style={{ background: 'rgba(230, 126, 34, 0.15)', color: '#f39c12', fontSize: '0.7rem' }}>{place.cuisine.toUpperCase()}</span>
                        )}
                        <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontSize: '0.7rem' }}>Type: {place.amenity}</span>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                        <strong>Hours:</strong> {place.opening_hours}
                      </p>
                    </div>
                    
                    <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lon}`} 
                        target="_blank" rel="noopener noreferrer" 
                        className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', textDecoration: 'none' }}
                      >
                        Directions
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function FoodPageWrapper() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', color: '#fff', textAlign: 'center' }}>Loading the Food Directory...</div>}>
      <FoodContent />
    </Suspense>
  );
}
