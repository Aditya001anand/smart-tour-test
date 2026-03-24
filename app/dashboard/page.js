"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { useLocation } from "@/lib/hooks/useLocation";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const [profile, setProfile] = useState(null);
  const { location, error, loading, getLocation } = useLocation();
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [isRouting, setIsRouting] = useState(false);
  const [routeError, setRouteError] = useState(null);

  const handleBrainSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsRouting(true);
    setRouteError(null);
    try {
      const res = await fetch("/api/orchestrator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      
      if (data.category === 'emergency') {
        const lat = location?.latitude || "";
        const lon = location?.longitude || "";
        // Deduce intent type from keywords
        const isPolice = (data.extracted_keywords || []).some(k => k.toLowerCase().includes('police') || k.toLowerCase().includes('cop'));
        const type = isPolice ? 'police' : 'medical';
        router.push(`/emergency?lat=${lat}&lon=${lon}&type=${type}`);
      } else if (data.category === 'language_help') {
        router.push('/translate');
      } else {
        setRouteError(`Intent categorized as: ${data.category}. (Only 'emergency' and 'language_help' redirect.)`);
      }
    } catch (err) {
      console.error(err);
      setRouteError("Error: " + err.message);
    } finally {
      setIsRouting(false);
    }
  };

  useEffect(() => {
    const saved = localStorage.getItem("travel_profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingBottom: '40px' }}>
      {/* Header aligned with globals.css dark theme */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'rgba(10,11,15,0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '16px 24px'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '14px',
              background: 'var(--grad-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.3rem', boxShadow: '0 4px 15px rgba(108,92,231,0.3)',
            }}>🌍</div>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>SmartTour Dashboard</h1>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.5px' }}>YOUR PERSONAL TRAVEL HUB</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link href="/" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.82rem', background: 'transparent', border: 'none' }}>Home</Link>
            <Link href="/onboarding" className="btn-secondary" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>Edit Profile</Link>
            <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: { width: 36, height: 36 } } }} />
          </div>
        </div>
      </header>

      <main style={{ maxWidth: '1000px', margin: '40px auto 0', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Welcome Section */}
        <div className="glass-card animate-fade-in-up" style={{ padding: '40px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Welcome back! 👋</h2>
            <p className="section-subtitle" style={{ marginBottom: '32px', fontSize: '1.05rem' }}>Manage your travel footprint, context agents, and preferences here.</p>
            
            {profile ? (
              <div style={{ background: 'rgba(108,92,231,0.08)', border: '1px solid rgba(108,92,231,0.2)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--clr-primary-light)', marginBottom: '20px', fontSize: '1.3rem' }}>Active Travel Context Profile</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                  <div>
                    <span className="label">Dietary Preference</span>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '1.05rem' }}>{profile.dietary}</div>
                  </div>
                  <div>
                    <span className="label">Budget Style</span>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '1.05rem' }}>{profile.budget}</div>
                  </div>
                  <div>
                    <span className="label">Pacing</span>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 500, fontSize: '1.05rem' }}>{profile.pacing}</div>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <span className="label">Travel Vibe Elements</span>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '8px' }}>
                      {profile.vibe.map(v => (
                        <span key={v} className="badge badge-primary">{v}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ background: 'rgba(253,203,110,0.08)', border: '1px solid rgba(253,203,110,0.2)', borderRadius: 'var(--radius-md)', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h3 style={{ color: 'var(--clr-gold)', fontWeight: 600, marginBottom: '6px', fontSize: '1.1rem' }}>No profile active</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Configure your preferences to let the Agents curate your journey intelligently.</p>
                </div>
                <Link href="/onboarding" className="btn-primary">Build Context Profile</Link>
              </div>
            )}
          </div>
        </div>

        {/* Location Section */}
        <div className="glass-card animate-fade-in-up" style={{ padding: '40px', animationDelay: '0.1s' }}>
          <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Location Intelligence</h2>
          <p className="section-subtitle" style={{ marginBottom: '24px', fontSize: '1.05rem' }}>Share your exact coordinates with the local guide & weather AI agents.</p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <button 
              onClick={getLocation} 
              disabled={loading}
              className="btn-primary"
            >
              {loading ? (
                <><span className="spinner" style={{ width: '14px', height: '14px' }}></span> Locating...</>
              ) : "📍 Update Current Location"}
            </button>
            
            {location && (
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '10px 20px' }}>
                  <span className="label" style={{ fontSize: '0.65rem', marginBottom: '2px' }}>Latitude</span>
                  <div style={{ fontFamily: 'monospace', color: 'var(--clr-secondary)', fontSize: '1.1rem' }}>{location.latitude.toFixed(5)}</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '10px 20px' }}>
                  <span className="label" style={{ fontSize: '0.65rem', marginBottom: '2px' }}>Longitude</span>
                  <div style={{ fontFamily: 'monospace', color: 'var(--clr-secondary)', fontSize: '1.1rem' }}>{location.longitude.toFixed(5)}</div>
                </div>
              </div>
            )}
            
            {error && <div className="badge badge-danger" style={{ padding: '8px 16px' }}>⚠️ {error}</div>}
          </div>
        </div>
      </main>
    </div>
  );
}
