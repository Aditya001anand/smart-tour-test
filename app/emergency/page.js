"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function EmergencyContent() {
  const searchParams = useSearchParams();
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const type = searchParams.get("type") || "medical";
  const isPolice = type === "police";
  
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHospitals() {
      if (!lat || !lon) {
        setError("Location coordinates (lat, lon) are missing from the URL. Please make sure you have allowed location access on the Dashboard.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/emergency?lat=${lat}&lon=${lon}&type=${type}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch data");
        setHospitals(data.hospitals || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHospitals();
  }, [lat, lon]);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingBottom: '40px' }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(231, 76, 60, 0.9)', 
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
        padding: '16px 24px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '14px',
              background: '#fff', color: '#e74c3c',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
            }}>🚨</div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: '#fff', lineHeight: 1.1 }}>{isPolice ? "Police Action" : "Emergency Services"}</h1>
              <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.8)', fontWeight: 500, letterSpacing: '0.5px' }}>{isPolice ? "NEAREST POLICE STATIONS" : "NEAREST HOSPITALS & CLINICS"}</p>
            </div>
          </div>
          <Link href="/dashboard" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.82rem', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>Back to Dashboard</Link>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '40px auto 0', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ background: isPolice ? 'rgba(52, 152, 219, 0.1)' : 'rgba(231, 76, 60, 0.1)', border: `1px solid ${isPolice ? 'rgba(52, 152, 219, 0.3)' : 'rgba(231, 76, 60, 0.3)'}`, borderRadius: 'var(--radius-md)', padding: '24px' }}>
          <h2 style={{ fontSize: '1.5rem', color: isPolice ? '#3498db' : '#e74c3c', marginBottom: '8px', fontWeight: 700 }}>Stay Calm. Help is nearby.</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>We are scanning for the top 10 closest {isPolice ? "police stations" : "medical facilities"} within a 5km radius of your current location.</p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0', gap: '16px' }}>
            <div className="spinner" style={{ width: '40px', height: '40px', borderTopColor: isPolice ? '#3498db' : '#e74c3c', borderBottomColor: isPolice ? '#3498db' : '#e74c3c' }}></div>
            <p style={{ color: 'var(--text-muted)' }}>Locating nearest {isPolice ? "police stations" : "emergency facilities"}...</p>
          </div>
        ) : error ? (
          <div className="glass-card animate-fade-in-up" style={{ padding: '40px', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--clr-danger)', marginBottom: '12px' }}>⚠️ Unable to load services</h3>
            <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
          </div>
        ) : hospitals.length === 0 ? (
          <div className="glass-card animate-fade-in-up" style={{ padding: '40px', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--text-primary)', marginBottom: '12px' }}>No facilities found</h3>
            <p style={{ color: 'var(--text-secondary)' }}>We couldn't find any {isPolice ? "police stations" : "hospitals or clinics"} within 5km of your location in the database.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {hospitals.map((h, i) => (
              <div key={i} className="glass-card animate-fade-in-up" style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', animationDelay: `${i * 0.05}s`, borderLeft: '4px solid #e74c3c' }}>
                <div>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', fontWeight: 600, marginBottom: '4px' }}>{h.name}</h3>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <span className="badge badge-primary" style={{ background: 'rgba(231, 76, 60, 0.15)', color: '#ff7675' }}>{(h.type || 'facility').toUpperCase()}</span>
                    {h.phone && <span className="badge" style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--text-secondary)' }}>📞 {h.phone}</span>}
                  </div>
                  <div style={{ marginTop: '16px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <a 
                    href={`https://www.google.com/maps/dir/?api=1&destination=${h.lat},${h.lon}`} 
                    target="_blank" rel="noopener noreferrer" 
                    className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem', textDecoration: 'none', background: '#e74c3c', border: 'none' }}
                  >
                    Directions
                  </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function EmergencyPage() {
  return (
    <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>Loading emergency systems...</div>}>
      <EmergencyContent />
    </Suspense>
  );
}
