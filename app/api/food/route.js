async function getNearbyFood(lat, lon, limit = 150) {
  const foodQuery = `[out:json];(node["amenity"~"restaurant|cafe|fast_food"](around:5000,${lat},${lon}););out center;`;
  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(foodQuery)}`
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.elements || [])
      .filter(el => el.tags?.name)
      .map(el => ({
        name: el.tags.name,
        cuisine: el.tags.cuisine || 'local',
        amenity: el.tags.amenity || 'food',
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,
      }))
      .slice(0, limit);
  } catch (e) {
    console.error('getNearbyFood error:', e);
    return [];
  }
}
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');
    const q = searchParams.get('q'); // the user's craving

    if (!lat || !lon) {
      return new Response(JSON.stringify({ error: "Missing coordinates" }), { status: 400 });
    }

    // Fetch a huge chunk of 150 places to ensure we actually find the specific food they want
    const places = await getNearbyFood(parseFloat(lat), parseFloat(lon), 150);
    
    let results = places;
    // Explicitly filter if they typed something specific like "pizza" or a dish name
    if (q) {
      const qLower = q.toLowerCase();
      const filtered = places.filter(p => 
        (p.name && p.name.toLowerCase().includes(qLower)) || 
        (p.cuisine && p.cuisine.toLowerCase().includes(qLower)) || 
        (p.amenity && p.amenity.toLowerCase().includes(qLower))
      );
      // Only strictly filter if we actually found matches, otherwise show them all places anyway as a fallback so the screen isn't entirely blank.
      if (filtered.length > 0) {
        results = filtered;
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

    // Always slice to max 12 items so the UI is clean, but now we've filtered from a pool of 150!
    // We can also mildly randomize or sort them so it doesn't always show the identical list.
    const finalResults = uniqueResults.sort(() => 0.5 - Math.random()).slice(0, 12);

    return new Response(JSON.stringify({ places: finalResults }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
