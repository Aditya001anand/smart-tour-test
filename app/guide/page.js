"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, Suspense } from "react";
import { useUser } from "@clerk/nextjs";

const MOCK_GUIDES = [
  { id: 'g1', name: 'Karthik Nair', email: 'karthik.guide@example.com', languages: ['Malayalam', 'English', 'Hindi'], specialty: 'History & Heritage', daily_rate_inr: 1500, rating: 4.8, reviews: 124, available_today: true },
  { id: 'g2', name: 'Meera Menon', email: 'meera.tours@example.com', languages: ['Malayalam', 'English'], specialty: 'Culinary & Culture', daily_rate_inr: 1200, rating: 4.9, reviews: 89, available_today: true },
  { id: 'g3', name: 'Arvind Krishnan', email: 'arvind.wildlife@example.com', languages: ['English', 'German'], specialty: 'Wildlife & Trekking', daily_rate_inr: 2000, rating: 4.7, reviews: 56, available_today: false },
  { id: 'g4', name: 'Nithya Varma', email: 'nithya.kerala@example.com', languages: ['Malayalam', 'English', 'Tamil'], specialty: 'History & Heritage', daily_rate_inr: 1400, rating: 4.6, reviews: 112, available_today: true },
];

function GuideContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("prompt") || "";
  const { user } = useUser();
  const router = useRouter();

  const [place, setPlace] = useState(initialQuery);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const handleAIPlanner = () => {
    router.push(`/itinerary?place=${encodeURIComponent(place)}&from=${encodeURIComponent(fromDate)}&to=${encodeURIComponent(toDate)}`);
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingBottom: '40px' }}>

      
      <main style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 24px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        
        {/* Planner Header Form */}
        <div className="glass-card animate-fade-in-up" style={{ padding: '32px', background: 'rgba(249, 115, 22, 0.05)', border: '1px solid rgba(249, 115, 22, 0.2)' }}>
          <h2 style={{ fontSize: '1.4rem', color: '#f97316', marginBottom: '8px', fontWeight: 700 }}>Plan Your Perfect Trip</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Fill in your details below to instantly auto-draft emails to local experts.</p>
          
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
            <div style={{ flex: '1 1 300px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>FOR WHICH PLACE?</label>
              <input 
                type="text" value={place} onChange={e => setPlace(e.target.value)} placeholder="e.g. Kerala, Munnar..." 
                style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)' }} 
              />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>FROM WHEN?</label>
              <input 
                type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} 
                style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', colorScheme: 'dark' }} 
              />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 600 }}>TO WHEN?</label>
              <input 
                type="date" value={toDate} onChange={e => setToDate(e.target.value)} 
                style={{ width: '100%', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', colorScheme: 'dark' }} 
              />
            </div>
          </div>
          
          <button onClick={handleAIPlanner} className="btn-primary" style={{ background: '#f97316', color: '#fff', fontSize: '1rem', padding: '14px 28px', border: 'none', width: '100%' }}>
            ✨ Plan Itinerary with AI
          </button>
        </div>

        {/* Guides Grid */}
        <div>
          <h2 style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '20px', fontWeight: 600 }}>Available Tour Experts</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {MOCK_GUIDES.map((guide, i) => {
              const locationText = place || "Kerala";
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
                <div key={guide.id} className="glass-card animate-fade-in-up" style={{ padding: '24px', borderTop: '4px solid #f97316', animationDelay: `${i * 0.1}s`, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: 700, marginBottom: '4px' }}>{guide.name}</h3>
                      <div style={{ fontSize: '0.85rem', color: '#f1c40f', fontWeight: 600 }}>
                        ⭐ {guide.rating} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>({guide.reviews} reviews)</span>
                      </div>
                    </div>
                    {guide.available_today ? (
                      <span className="badge" style={{ background: 'rgba(46, 204, 113, 0.2)', color: '#2ecc71', fontSize: '0.7rem' }}>🟢 AVAILABLE</span>
                    ) : (
                      <span className="badge" style={{ background: 'rgba(231, 76, 60, 0.2)', color: '#e74c3c', fontSize: '0.7rem' }}>🔴 BOOKED</span>
                    )}
                  </div>

                  <div style={{ flex: 1, marginBottom: '24px' }}>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      <strong>Specialty:</strong> {guide.specialty}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                      <strong>Languages:</strong> {guide.languages.join(', ')}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <strong>Rate:</strong> {guide.daily_rate_inr} INR / day
                    </p>
                  </div>
                  
                  <a 
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${guide.email}&su=${subject}&body=${body}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary" 
                    style={{ textAlign: 'center', display: 'block', padding: '12px', border: '1px solid rgba(249, 115, 22, 0.4)', color: '#f97316', fontWeight: 600, textDecoration: 'none' }}
                  >
                    ✉️ Contact via Gmail
                  </a>
                </div>
              );
            })}
          </div>
        </div>

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
