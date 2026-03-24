"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { Suspense } from 'react';

function MapContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const lat = searchParams.get('lat') || '';
  const lon = searchParams.get('lon') || '';
  const name = searchParams.get('name') || 'Destination';

  if (!lat || !lon) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#fff' }}>Invalid Map Coordinates.</div>;
  }

  // Google Maps Universal iframe query renderer (without API key)
  const mapUrl = `https://maps.google.com/maps?q=${lat},${lon}&hl=en&z=15&output=embed`;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'var(--bg-default)', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        background: 'rgba(20,20,20,0.9)', backdropFilter: 'blur(10px)',
        padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        <button 
          onClick={() => router.back()}
          style={{
            background: 'var(--grad-primary)', border: 'none', color: '#fff',
            padding: '8px 20px', borderRadius: '12px', cursor: 'pointer', fontWeight: 600,
            fontSize: '0.9rem', boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
          }}
        >
          ← Go Back
        </button>
        <h1 style={{ color: '#fff', fontSize: '1.25rem', margin: 0, fontWeight: 700, fontFamily: 'var(--font-display)' }}>{name}</h1>
      </header>
      
      <div style={{ flex: 1, width: '100%', position: 'relative', background: '#e5e3df' }}>
        <iframe 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          loading="lazy" 
          allowFullScreen 
          src={mapUrl}
        ></iframe>
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense fallback={<div className="spinner" style={{ margin: '40px auto', borderTopColor: '#3498db' }}></div>}>
      <MapContent />
    </Suspense>
  );
}
