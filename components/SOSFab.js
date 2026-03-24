"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocation } from '@/lib/hooks/useLocation';

export default function SOSFab() {
  const [expanded, setExpanded] = useState(false);
  const [smsStatus, setSmsStatus] = useState('idle'); // idle, sending, success, error
  const router = useRouter();
  const { location } = useLocation();

  const handleEmergencyClick = (type) => {
    const lat = location?.latitude || "";
    const lon = location?.longitude || "";
    router.push(`/emergency?lat=${lat}&lon=${lon}&type=${type}`);
    setExpanded(false);
  };

  const handleSMSSend = async () => {
    if (smsStatus === 'sending' || smsStatus === 'success') return;

    const savedContact = localStorage.getItem('emergencyContact');
    if (!savedContact || savedContact.includes('X')) {
      alert("Please set your Emergency Contact in the Dashboard first!");
      setSmsStatus('error');
      setTimeout(() => setSmsStatus('idle'), 3000);
      return;
    }

    setSmsStatus('sending');

    const sendWithLocation = async (lat, lon) => {
      const contact = localStorage.getItem('emergencyContact') || '+91XXXXXXXXXX';
      try {
        const res = await fetch('/api/sos-sms', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ lat, lon, contactNumber: contact })
        });
        if (res.ok) {
          setSmsStatus('success');
          setTimeout(() => { setSmsStatus('idle'); setExpanded(false); }, 3000);
        } else {
          setSmsStatus('error');
          setTimeout(() => setSmsStatus('idle'), 3000);
        }
      } catch (err) {
        setSmsStatus('error');
        setTimeout(() => setSmsStatus('idle'), 3000);
      }
    };

    if (location?.latitude && location?.longitude) {
      sendWithLocation(location.latitude, location.longitude);
    } else if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => sendWithLocation(pos.coords.latitude, pos.coords.longitude),
        (err) => { setSmsStatus('error'); setTimeout(() => setSmsStatus('idle'), 3000); }
      );
    } else {
      setSmsStatus('error'); setTimeout(() => setSmsStatus('idle'), 3000);
    }
  };

  const getSmsTooltipConfig = () => {
    switch (smsStatus) {
      case 'sending': return { text: "Sending Alert...", bg: "bg-orange-600", showClass: "opacity-100" };
      case 'success': return { text: "Alert Sent ✓", bg: "bg-green-600", showClass: "opacity-100" };
      case 'error': return { text: "Error Sending!", bg: "bg-red-600", showClass: "opacity-100" };
      default: return { text: "Notify Contacts (SMS)", bg: "bg-slate-900", showClass: "opacity-0 group-hover:opacity-100" };
    }
  };
  const smsCfg = getSmsTooltipConfig();

  return (
    <div className="fixed bottom-8 right-8 z-[90] flex flex-col items-center gap-4 print:hidden">
      {/* Expanded Buttons */}
      <div className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-out origin-bottom ${expanded ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-50 translate-y-10 pointer-events-none'}`}>
        
        <button 
          onClick={handleSMSSend}
          className={`w-14 h-14 ${smsStatus === 'success' ? 'bg-green-600' : smsStatus === 'error' ? 'bg-red-600' : 'bg-orange-500 hover:bg-orange-600'} rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 group relative`}
          title="Notify via SMS"
          disabled={smsStatus === 'sending'}
        >
          {smsStatus === 'sending' ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : smsStatus === 'success' ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
            </svg>
          )}
          <span className={`absolute right-full mr-4 ${smsCfg.bg} text-white px-3 py-1 rounded text-sm font-bold ${smsCfg.showClass} transition-opacity duration-300 whitespace-nowrap shadow-md`}>
            {smsCfg.text}
          </span>
        </button>

        <button 
          onClick={() => handleEmergencyClick('medical')}
          className="w-14 h-14 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 group relative"
          title="Hospital/Medical"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 11h2v-2h2v2h2v2h-2v2h-2v-2H8v-2z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"></path>
          </svg>
          <span className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1 rounded text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Medical Help</span>
        </button>
        <button 
          onClick={() => handleEmergencyClick('police')}
          className="w-14 h-14 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110 group relative"
          title="Police"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8l1.3 3 3.2.4-2.3 2.2.5 3.2-2.7-1.4-2.7 1.4.5-3.2-2.3-2.2 3.2-.4L12 8z"></path>
          </svg>
          <span className="absolute right-full mr-4 bg-slate-900 text-white px-3 py-1 rounded text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Police</span>
        </button>
      </div>

      {/* Main FAB */}
      <button 
        onClick={() => setExpanded(!expanded)}
        className="w-16 h-16 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-2xl relative z-10 transition-transform hover:scale-105"
      >
        <div className="absolute inset-0 rounded-full border-4 border-red-500 animate-ping opacity-75"></div>
        <span className="font-extrabold text-xl tracking-wider">SOS</span>
      </button>
    </div>
  );
}
