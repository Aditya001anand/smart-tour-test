"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";

export default function OnboardingPage() {
  const router = useRouter();
  
  const [dietary, setDietary] = useState("");
  const [budget, setBudget] = useState("");
  const [vibe, setVibe] = useState([]);
  const [pacing, setPacing] = useState("");

  const handleVibeChange = (selectedVibe) => {
    if (vibe.includes(selectedVibe)) {
      setVibe(vibe.filter((v) => v !== selectedVibe));
    } else if (vibe.length < 3) {
      setVibe([...vibe, selectedVibe]);
    }
  };

  const handleComplete = (e) => {
    e.preventDefault();
    if (!dietary || !budget || !pacing || vibe.length === 0) {
      alert("Please fill in all fields.");
      return;
    }

    const profile = { dietary, budget, vibe, pacing };
    localStorage.setItem("travel_profile", JSON.stringify(profile));
    router.push("/dashboard");
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyItems: 'center', padding: '40px 20px', position: 'relative', zIndex: 1 }}>
      <div className="glass-card animate-fade-in-up" style={{ width: '100%', maxWidth: '640px', margin: '0 auto', padding: '48px 40px' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 className="section-title" style={{ fontSize: '2rem' }}>Build Context Profile</h1>
            <p className="section-subtitle">Train the Agent on your travel identity.</p>
          </div>
          <UserButton afterSignOutUrl="/" appearance={{ elements: { userButtonAvatarBox: { width: 36, height: 36 } } }} />
        </header>

        <form onSubmit={handleComplete} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {/* Dietary Preference */}
          <div>
            <span className="input-label" style={{ fontSize: '0.9rem' }}>Dietary Preference</span>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {["Strictly Vegetarian", "Non-Veg", "Vegan"].map((option) => (
                <label key={option} style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                  padding: '10px 16px', background: 'rgba(255,255,255,0.04)', 
                  border: dietary === option ? '1px solid var(--clr-primary)' : '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)', transition: 'all 0.2s',
                  color: dietary === option ? 'var(--clr-primary-light)' : 'var(--text-primary)'
                }}>
                  <input type="radio" name="dietary" value={option} checked={dietary === option} onChange={(e) => setDietary(e.target.value)} style={{ display: 'none' }} />
                  {dietary === option ? '✓ ' : ''}<span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget Style */}
          <div>
            <span className="input-label" style={{ fontSize: '0.9rem' }}>Budget Architecture</span>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {["Shoestring Backpacker", "Mid-range Comfort", "Luxury"].map((option) => (
                <label key={option} style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                  padding: '10px 16px', background: 'rgba(255,255,255,0.04)', 
                  border: budget === option ? '1px solid var(--clr-primary)' : '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)', transition: 'all 0.2s',
                  color: budget === option ? 'var(--clr-primary-light)' : 'var(--text-primary)'
                }}>
                  <input type="radio" name="budget" value={option} checked={budget === option} onChange={(e) => setBudget(e.target.value)} style={{ display: 'none' }} />
                  {budget === option ? '✓ ' : ''}<span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Travel Vibe */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
               <span className="input-label" style={{ fontSize: '0.9rem', marginBottom: 0 }}>Travel Vibe Core</span>
               <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{vibe.length} / 3 selected</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {["History & Heritage", "Nature & Wildlife", "Adventure", "Culture & Shopping", "Relaxation"].map((option) => {
                 const isChecked = vibe.includes(option);
                 const isDisabled = vibe.length >= 3 && !isChecked;
                 return (
                  <label key={option} style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    cursor: isDisabled ? 'not-allowed' : 'pointer',
                    padding: '8px 16px', 
                    background: isChecked ? 'var(--grad-primary)' : 'rgba(255,255,255,0.04)', 
                    border: '1px solid',
                    borderColor: isChecked ? 'rgba(0,0,0,0)' : 'var(--border-medium)',
                    borderRadius: 'var(--radius-full)', transition: 'all 0.2s',
                    color: isChecked ? 'white' : 'var(--text-primary)',
                    opacity: isDisabled ? 0.4 : 1
                  }}>
                    <input 
                      type="checkbox" 
                      checked={isChecked} 
                      onChange={() => handleVibeChange(option)} 
                      disabled={isDisabled}
                      style={{ display: 'none' }} 
                    />
                    <span>{option}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Pacing */}
          <div>
            <span className="input-label" style={{ fontSize: '0.9rem' }}>Itinerary Pacing</span>
             <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {["Action-packed schedule", "Relaxed/Go-with-the-flow"].map((option) => (
                <label key={option} style={{ 
                  display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer',
                  padding: '10px 16px', background: 'rgba(255,255,255,0.04)', 
                  border: pacing === option ? '1px solid var(--clr-primary)' : '1px solid var(--border-medium)',
                  borderRadius: 'var(--radius-sm)', transition: 'all 0.2s',
                  color: pacing === option ? 'var(--clr-primary-light)' : 'var(--text-primary)'
                }}>
                  <input type="radio" name="pacing" value={option} checked={pacing === option} onChange={(e) => setPacing(e.target.value)} style={{ display: 'none' }} />
                  {pacing === option ? '✓ ' : ''}<span>{option}</span>
                </label>
              ))}
             </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1rem', justifyContent: 'center', marginTop: '10px' }}>
            Initialize Profile
          </button>
        </form>
      </div>
    </div>
  );
}
