async function getEmergencyServices(lat, lon, type) {
  const amenityFilter = type === 'police' ? 'police' : 'hospital|clinic|doctors|pharmacy';
  const query = `[out:json];(node["amenity"~"${amenityFilter}"](around:5000,${lat},${lon}););out center;`;
  try {
    const res = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `data=${encodeURIComponent(query)}`
    });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.elements || [])
      .filter(el => el.tags?.name)
      .map(el => ({
        name: el.tags.name,
        type: el.tags.amenity,
        lat: el.lat || el.center?.lat,
        lon: el.lon || el.center?.lon,
      }))
      .slice(0, 50);
  } catch (e) {
    console.error('getEmergencyServices error:', e);
    return [];
  }
}
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const lat = parseFloat(searchParams.get('lat'));
    const lon = parseFloat(searchParams.get('lon'));
    const type = searchParams.get('type') || 'medical';

    if (isNaN(lat) || isNaN(lon)) {
      return new Response(JSON.stringify({ error: "Valid latitude and longitude are required." }), { status: 400 });
    }

    const hospitals = await getEmergencyServices(lat, lon, type);
    
    return new Response(JSON.stringify({ hospitals }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Emergency Route Error:", error);
    return new Response(JSON.stringify({ error: error.message || "Failed to fetch emergency services" }), { status: 500 });
  }
}
