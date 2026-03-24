"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocation } from "@/lib/hooks/useLocation";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const { location, error: locError, loading: locLoading, getLocation } = useLocation();

  const [prompt, setPrompt] = useState("");
  const [isRouting, setIsRouting] = useState(false);
  const [routeError, setRouteError] = useState(null);

  // Auto-fetch location on load
  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      
      if (data.error) {
        setRouteError(`API Error: ${data.error}`);
        return;
      }

      const lat = location?.latitude || "";
      const lon = location?.longitude || "";

      if (data.category === 'emergency') {
        const isPolice = prompt.toLowerCase().includes('police') || prompt.toLowerCase().includes('cop') || prompt.toLowerCase().includes('station');
        const type = isPolice ? 'police' : 'medical';
        router.push(`/emergency?lat=${lat}&lon=${lon}&type=${type}`);
      } else if (data.category === 'language_help') {
        router.push('/translate');
      } else if (data.category === 'food_search') {
        // Redirect to food page with intent and location
        router.push(`/food?lat=${lat}&lon=${lon}&q=${encodeURIComponent(prompt)}`);
      } else if (data.category === 'find_attractions') {
        router.push(`/attractions?lat=${lat}&lon=${lon}&q=${encodeURIComponent(prompt)}`);
      } else if (data.category === 'book_guide') {
        router.push(`/guide?prompt=${encodeURIComponent(prompt)}`);
      } else if (data.category === 'plan_trip') {
        const targetCity = data.city || 'Kochi'; // fallback if extraction fails
        const targetDays = data.days || 2;
        router.push(`/itinerary?city=${encodeURIComponent(targetCity)}&days=${targetDays}`);
      } else {
        setRouteError(`Intent categorized as: ${data.category}. (Routing logic not yet fully mapped for this category.)`);
      }
    } catch (err) {
      console.error(err);
      setRouteError("Error: " + err.message);
    } finally {
      setIsRouting(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1, background: 'var(--bg-card)' }}>
      {/* Header */}
      <header style={{
        position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100,
        padding: '24px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px', height: '40px', borderRadius: '12px',
            background: 'var(--grad-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.2rem', boxShadow: '0 4px 15px rgba(108,92,231,0.3)',
          }}>🌍</div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.5px' }}>SmartTour</span>
        </div>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          {isSignedIn ? (
            <>
              <Link href="/dashboard" className="btn-secondary" style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: 'none' }}>Dashboard / Settings</Link>
              <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: { width: 36, height: 36 } } }} />
            </>
          ) : (
            <>
              <Link href="/sign-in" className="btn-secondary" style={{ background: 'transparent', border: 'none' }}>Log In</Link>
              <Link href="/sign-up" className="btn-primary" style={{ padding: '8px 20px' }}>Sign Up</Link>
            </>
          )}
        </div>
      </header>

      {/* Main Chat Area vertically centered */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        <div className="animate-fade-in-up" style={{ width: '100%', maxWidth: '700px', textAlign: 'center' }}>
          
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '3.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 16px 0', lineHeight: 1.1 }}>
            How can I help you <span style={{ background: 'var(--grad-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>today?</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '500px', margin: '0 auto 40px auto' }}>
            SmartTour AI instantly routes you to food recommendations, SOS services, language translators, and local guides seamlessly based on your location.
          </p>

          <form onSubmit={handleBrainSubmit} style={{ position: 'relative', width: '100%', boxShadow: '0 8px 30px rgba(0,0,0,0.3)', borderRadius: '24px' }}>
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Find me a hospital, Translate a menu, I'm hungry..."
              style={{ 
                width: '100%', padding: '24px 32px', borderRadius: '24px', 
                border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.03)', 
                color: 'var(--text-primary)', fontSize: '1.2rem', backdropFilter: 'blur(20px)'
              }}
              disabled={isRouting}
            />
            <button 
              type="submit" 
              disabled={isRouting}
              style={{
                position: 'absolute', right: '12px', top: '12px', bottom: '12px',
                background: isRouting ? 'rgba(255,255,255,0.1)' : 'var(--grad-primary)',
                color: '#fff', border: 'none', borderRadius: '16px', padding: '0 24px',
                fontSize: '1.05rem', fontWeight: 600, cursor: isRouting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isRouting ? <span className="spinner" style={{ width: '20px', height: '20px' }}></span> : "Send"}
            </button>
          </form>

          {routeError && <div className="badge badge-danger animate-fade-in-up" style={{ padding: '12px 20px', marginTop: '24px', display: 'inline-block' }}>{routeError}</div>}
          
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '32px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}>Try:</span>
            <button type="button" onClick={() => setPrompt("Nearest police station")} style={{ background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', color: 'var(--clr-secondary)', fontSize: '0.85rem', cursor: 'pointer', transition: '0.2s' }}>"Nearest police station"</button>
            <button type="button" onClick={() => setPrompt("I want pizza and burgers")} style={{ background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', color: 'var(--clr-secondary)', fontSize: '0.85rem', cursor: 'pointer', transition: '0.2s' }}>"I want pizza"</button>
            <button type="button" onClick={() => setPrompt("Translate this document")} style={{ background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '6px 12px', color: 'var(--clr-secondary)', fontSize: '0.85rem', cursor: 'pointer', transition: '0.2s' }}>"Translate this document"</button>
          </div>

        </div>
      </main>

      {/* Location Status Indicator */}
      <div style={{ position: 'absolute', bottom: '24px', right: '32px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: location ? 'var(--clr-success)' : locLoading ? 'var(--clr-warning)' : 'var(--clr-danger)', boxShadow: `0 0 10px ${location ? 'var(--clr-success)' : 'var(--clr-danger)'}` }}></div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {location ? `GPS GPS Active (${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)})` : locLoading ? "Acquiring GPS..." : "GPS Offline or permission denied"}
        </span>
      </div>
    </div>
  );
}
