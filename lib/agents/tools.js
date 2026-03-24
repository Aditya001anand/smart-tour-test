import { tool } from 'ai';
import { z } from 'zod';

// ─── Guide Data ──────────────────────────────────────────────────────────────
export const MOCK_GUIDES = [
  { id: 'g1', name: 'Anoop', languages: ['Malayalam', 'English', 'Hindi'], specialty: 'History & Heritage', daily_rate_inr: 1500, available_today: true },
  { id: 'g2', name: 'Meera', languages: ['Malayalam', 'English'], specialty: 'Culinary', daily_rate_inr: 1200, available_today: true },
  { id: 'g3', name: 'Rahul', languages: ['English', 'German'], specialty: 'Wildlife & Trekking', daily_rate_inr: 2000, available_today: false },
  { id: 'g4', name: 'Priya', languages: ['Malayalam', 'English', 'Tamil'], specialty: 'History & Heritage', daily_rate_inr: 1400, available_today: true },
];

export const findLocalGuides = tool({
  description: 'Search for human tour guides based on language or specialty.',
  parameters: z.object({
    language: z.string().describe('Language spoken by the guide. Pass empty string if not specified.'),
    specialty: z.string().describe('Guide specialty. Pass empty string if not specified.')
  }),
  execute: async ({ language, specialty }) => {
    return MOCK_GUIDES.filter(g => {
      let matches = g.available_today;
      if (language && language.trim()) matches = matches && g.languages.some(l => l.toLowerCase() === language.trim().toLowerCase());
      if (specialty && specialty.trim()) matches = matches && g.specialty.toLowerCase().includes(specialty.trim().toLowerCase());
      return matches;
    });
  }
});

// ─── Emergency Services Tool ─────────────────────────────────────────────────
export const findNearbyEmergencyServices = tool({
  description: 'Finds nearby hospitals, clinics, and police stations within 5km of given coordinates.',
  parameters: z.object({
    latitude: z.number().describe('Latitude of the user'),
    longitude: z.number().describe('Longitude of the user'),
  }),
  execute: async ({ latitude, longitude }) => {
    try {
      const query = `[out:json];(node["amenity"~"hospital|clinic|doctors|police"](around:5000,${latitude},${longitude}););out center;`;
      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `data=${encodeURIComponent(query)}`
      });
      if (!response.ok) return [];
      const data = await response.json();
      return (data.elements || [])
        .filter(el => el.tags?.name)
        .map(el => ({
          name: el.tags.name,
          type: el.tags.amenity,
          lat: el.lat || el.center?.lat,
          lon: el.lon || el.center?.lon,
        }))
        .filter(h => h.lat && h.lon)
        .slice(0, 10);
    } catch (e) {
      console.error('Emergency services fetch failed:', e.message);
      return [];
    }
  }
});


