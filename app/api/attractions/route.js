import opening_hours from 'opening_hours';

async function getNearbyAttractions(lat, lon, limit = 150) {
  const attrQuery = `[out:json];(node["tourism"~"museum|gallery|viewpoint|attraction|monument"](around:5000,${lat},${lon});node["historic"](around:5000,${lat},${lon}););out center;`;
  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(attrQuery)}`
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.elements || [])
      .filter(el => el.tags?.name)
      .map(el => ({
        name: el.tags.name,
        tourism: el.tags.tourism || el.tags.historic || 'attraction',
        opening_hours: el.tags.opening_hours || 'Hours not listed',
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,
      }))
      .slice(0, limit);
  } catch (e) {
    console.error('getNearbyAttractions error:', e);
    return [];
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const q = searchParams.get('q');

    if (!lat || !lon) return new Response(JSON.stringify({ error: "Missing coordinates" }), { status: 400 });

    const placesResult = await getNearbyAttractions(parseFloat(lat), parseFloat(lon), 150);
    
    // Mathematically parse Opening Hours
    const places = placesResult.map(place => {
      let computedStatus = 'unknown';
      if (place.opening_hours && place.opening_hours !== "Hours not listed") {
        try {
          const oh = new opening_hours(place.opening_hours);
          // getState calculates whether it is open identically against the current system Date!
          computedStatus = oh.getState(new Date()) ? 'open' : 'closed';
        } catch (e) {
          // Ignore parse failures from heavily malformed OSM tags
        }
      }
      return { ...place, computed_status: computedStatus };
    });

    let results = places;
    if (q) {
      const qLower = q.toLowerCase();
      // Basic safeguard so generic queries don't wipe out results implicitly
      if (!['attractions', 'things to do', 'places to visit', 'tourist'].includes(qLower)) {
        const filtered = places.filter(p => 
          (p.name && p.name.toLowerCase().includes(qLower)) || 
          (p.tourism && p.tourism.toLowerCase().includes(qLower))
        );
        if (filtered.length > 0) results = filtered;
      }
    }

    // Deduplicate by name to prevent OpenStreetMap double-listings (node + way)
    const uniqueResults = [];
    const seenNames = new Set();
    for (const p of results) {
      if (!p.name) {
        uniqueResults.push(p);
        continue;
      }
      const lowerName = p.name.trim().toLowerCase();
      if (!seenNames.has(lowerName)) {
        seenNames.add(lowerName);
        uniqueResults.push(p);
      }
    }

    const finalResults = uniqueResults.sort(() => 0.5 - Math.random()).slice(0, 12);
    return new Response(JSON.stringify({ places: finalResults }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
