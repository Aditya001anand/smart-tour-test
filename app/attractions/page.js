"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, Suspense } from "react";

function AttractionsContent() {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const initialQuery = searchParams.get("q") || "";

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAttractions = async (queryToFetch) => {
    if (!lat || !lon) {
      setError("Location coordinates (lat, lon) are missing. Please allow location access on the Home page.");
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/attractions?lat=${lat}&lon=${lon}&q=${encodeURIComponent(queryToFetch)}`);
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
    if (lat && lon) fetchAttractions(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, lon]);

  const famousAttractions = [
    { name: "Fort Kochi", desc: "Historic neighborhood featuring colonial architecture and Chinese fishing nets.", lat: 9.9658, lon: 76.2421 },
    { name: "Mattancherry Palace", desc: "Also known as the Dutch Palace, featuring stunning mural paintings.", lat: 9.9583, lon: 76.2594 },
    { name: "Kerala Folklore Museum", desc: "Architectural museum holding cultural and folk art exhibits.", lat: 9.9324, lon: 76.3020 },
  ];

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingBottom: '40px' }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(155, 89, 182, 0.9)', 
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        padding: '16px 24px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '14px',
              background: '#fff', color: '#8e44ad',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            }}>🏛️</div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>Attractions & Sights</h1>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500, letterSpacing: '0.5px' }}>LOCAL TOURISM DIRECTORY</p>
            </div>
          </div>
          <Link href="/" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.82rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>Back to Home</Link>
        </div>
      </header>

      <main style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 24px', display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        
        {/* Recommendations Column */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-card animate-fade-in-up" style={{ padding: '24px', background: 'rgba(155, 89, 182, 0.05)', border: '1px solid rgba(155, 89, 182, 0.2)' }}>
            <h2 style={{ fontSize: '1.2rem', color: '#9b59b6', marginBottom: '16px', fontWeight: 700 }}>Must-See Local Spots</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>Tap these famous local attractions to instantly scan details and real-time open/closed statues.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {famousAttractions.map(attr => (
                <div key={attr.name} style={{ background: 'var(--bg-card)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{attr.name}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>{attr.desc}</p>
                  <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${attr.lat},${attr.lon}`} 
                      target="_blank" rel="noopener noreferrer" 
                      className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', textDecoration: 'none', display: 'inline-block' }}
                    >
                      Directions
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Directory Column */}
        <div className="glass-card animate-fade-in-up" style={{ flex: '2 1 600px', padding: '32px', display: 'flex', flexDirection: 'column', minHeight: '600px', animationDelay: '0.1s' }}>
          {error && <div className="badge badge-danger" style={{ padding: '12px', marginBottom: '24px' }}>⚠️ {error}</div>}

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: '16px' }}>
                <div className="spinner" style={{ width: '40px', height: '40px', borderTopColor: '#9b59b6', borderBottomColor: '#9b59b6' }}></div>
                <p style={{ color: 'var(--text-muted)' }}>Scanning OpenStreetMap database...</p>
              </div>
            ) : places.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <h3>No nearby attractions found</h3>
                <p>Try searching for something else or expanding your area.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {places.map((place, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.02)', padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', borderTop: '4px solid #9b59b6', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '6px' }}>{place.name}</h3>
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        {place.tourism && (
                          <span className="badge badge-primary" style={{ background: 'rgba(155, 89, 182, 0.15)', color: '#af7ac5', fontSize: '0.7rem' }}>{place.tourism.toUpperCase()}</span>
                        )}
                        
                        {/* Live Computed Status Badge */}
                        {place.computed_status === 'open' ? (
                           <span className="badge" style={{ background: 'rgba(46, 204, 113, 0.2)', color: '#2ecc71', fontSize: '0.75rem', fontWeight: 'bold' }}>🟢 OPEN NOW</span>
                        ) : place.computed_status === 'closed' ? (
                           <span className="badge" style={{ background: 'rgba(231, 76, 60, 0.2)', color: '#e74c3c', fontSize: '0.75rem', fontWeight: 'bold' }}>🔴 CLOSED</span>
                        ) : (
                           <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.7rem' }}>⚪ HOURS UNKNOWN</span>
                        )}
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

export default function AttractionsPageWrapper() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', color: '#fff', textAlign: 'center' }}>Loading the Attractions Matrix...</div>}>
      <AttractionsContent />
    </Suspense>
  );
}
