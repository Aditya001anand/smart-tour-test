"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  // State for random city modal
  const [activeCategoryData, setActiveCategoryData] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Database of cities per category
  const categoryDatabase = {
    heritage: [
      { city: "Jaipur", title: "The Pink City", desc: "Dive into royal history with the majestic Amber Fort and City Palace.", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800" },
      { city: "Hampi", title: "Ruins of an Empire", desc: "Wander through the breathtaking stone chariots and ancient temples of the Vijayanagara Empire.", img: "https://images.unsplash.com/photo-1620766165457-a8025baa82e0?q=80&w=800" },
      { city: "Varanasi", title: "The Spiritual Heart", desc: "Experience the timeless rituals and ancient ghats along the sacred Ganges river.", img: "https://res.cloudinary.com/ddbqj52jr/image/upload/q_auto/f_auto/v1775651240/varanasi_ftimbu.jpg" },
      { city: "Agra", title: "Mughal Majesty", desc: "Home to the iconic Taj Mahal, a global symbol of eternal love and architectural brilliance.", img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800" },
      { city: "Mysore", title: "City of Palaces", desc: "Marvel at the grandeur of the Mysore Palace and the city's rich silk heritage.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800" }
    ],
    food: [
      { city: "Amritsar", title: "Punjabi Flavors", desc: "Indulge in iconic Kulchas and rich Lassi near the Golden Temple.", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" },
      { city: "Lucknow", title: "Nawabi Feast", desc: "Taste the world-famous Galouti Kebabs and authentic Awadhi biryani.", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" },
      { city: "Kolkata", title: "Street Food Capital", desc: "From spicy Puchkas to sweet Rasgullas, a paradise for food lovers.", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" },
      { city: "Hyderabad", title: "The Biryani Hub", desc: "Savor the legendary, slow-cooked Hyderabadi Dum Biryani and Haleem.", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" },
      { city: "Old Delhi", title: "Chandni Chowk Bites", desc: "Navigate narrow lanes for legendary parathas, jalebis, and Mughlai curries.", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" }
    ],
    nature: [
      { city: "Ranthambore", title: "Tiger Territory", desc: "Embark on thrilling safaris to spot the majestic Bengal Tiger in the wild.", img: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800" },
      { city: "Jim Corbett", title: "Himalayan Wilderness", desc: "India's oldest national park, offering pristine forests and rich wildlife.", img: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800" },
      { city: "Kaziranga", title: "Rhino Sanctuary", desc: "Explore the vast grasslands, home to the one-horned rhinoceros.", img: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800" },
      { city: "Sundarbans", title: "Mangrove Mystery", desc: "Navigate the largest mangrove forest in the world on a boat safari.", img: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800" },
      { city: "Munnar", title: "Tea Estate Trek", desc: "Walk through endless rolling hills of lush green tea plantations.", img: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800" }
    ],
    private: [
      { city: "Udaipur", title: "City of Lakes", desc: "Take a private boat ride on Lake Pichola and explore romantic island palaces.", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800" },
      { city: "Rishikesh", title: "Yoga & Adventure", desc: "Enjoy a private yoga retreat or thrilling river rafting on the Ganges.", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800" },
      { city: "Goa", title: "Secluded Beach Stays", desc: "Relax in a private luxury villa overlooking the serene Arabian Sea.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800" },
      { city: "Mahabalipuram", title: "Coastal Carvings", desc: "Take a private guided tour of the ancient, monolithic rock temples.", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800" },
      { city: "Darjeeling", title: "Himalayan Views", desc: "Ride the Toy Train and watch the sunrise over Mount Kanchenjunga.", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800" }
    ]
  };

  // Random city selector
  function handleCategoryClick(categoryKey) {
    const options = categoryDatabase[categoryKey] || [];
    if (options.length === 0) return;
    const randomIdx = Math.floor(Math.random() * options.length);
    setActiveCategoryData(options[randomIdx]);
    setIsCategoryModalOpen(true);
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-white pb-0">

      {/* Immersive Hero */}
      <section className="relative w-full h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-slate-900">
          <img src="https://res.cloudinary.com/ddbqj52jr/image/upload/q_auto/f_auto/v1775652528/InShot_20260408_181744561.jpg_bpsssv.jpg" alt="India" className="w-full h-full object-cover opacity-70" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20 w-full mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight">
            Discover the Soul of India
          </h1>
        </div>
      </section>

      {/* Our Popular Trips */}
      <section id="trips" className="bg-white relative z-20" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center" style={{ marginBottom: '100px' }}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-teal-800 tracking-tight mb-4">Our Popular Trips</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                id: "jaipur",
                name: "Jaipur Heritage",
                days: 3,
                stats: "Palaces & Forts | 12 Attractions",
                image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800"
              },
              {
                id: "goa",
                name: "Goa Retreat",
                days: 4,
                stats: "Beaches & Culture | 10 Attractions",
                image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800"
              },
              {
                id: "agra",
                name: "Agra Wonders",
                days: 2,
                stats: "The Taj Mahal | 5 Attractions",
                image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800"
              },
              {
                id: "varanasi",
                name: "Varanasi Spirit",
                days: 3,
                stats: "Spiritual Ghats | 15 Attractions",
                image: "https://res.cloudinary.com/ddbqj52jr/image/upload/q_auto/f_auto/v1775651240/varanasi_ftimbu.jpg"
              }
            ].map(trip => (
              <Link href={`/itinerary?city=${encodeURIComponent(trip.name.split(' ')[0])}&days=${trip.days}`} key={trip.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 block">
                <div className="overflow-hidden relative">
                  <img src={trip.image} alt={trip.name} className="w-full h-64 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500 ease-out" />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{trip.name}</h3>
                  <p className="text-slate-500 text-base font-medium mb-8">{trip.stats}</p>
                  <div className="flex items-center text-teal-800 font-bold text-sm tracking-wide group-hover:text-orange-500 transition-colors">
                    VIEW ITINERARY <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About India Section */}
      <section className="w-full bg-white">
        <div className="max-w-7xl mx-auto px-6 py-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-extrabold text-teal-800 mb-8 tracking-tight">Incredible India</h2>
              <p className="text-xl leading-relaxed text-slate-600 mb-6">
                India offers an unparalleled escape into diverse landscapes and ancient history. From the majestic forts of Rajasthan to the serene backwaters of the South, every destination provides a canvas for lifelong memories.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                Immerse yourself in profound spirituality, vibrant cultures, and world-renowned culinary traditions.
              </p>
            </div>
            <div>
              <img src="https://res.cloudinary.com/ddbqj52jr/image/upload/v1775650787/india_ywszho.jpg" alt="India Scenic" className="w-full h-auto rounded-3xl shadow-2xl object-cover transform hover:scale-[1.02] transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="bg-slate-50 border-y border-slate-200" style={{ paddingTop: '48px', paddingBottom: '48px', marginTop: '60px' }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-around items-center gap-6 text-center md:text-left">
          <span className="text-sm font-bold text-slate-900 flex items-center gap-3">
            <svg className="w-5 h-5 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Free cancellation up to 24 hours
          </span>
          <span className="text-sm font-bold text-slate-900 flex items-center gap-3">
            <svg className="w-5 h-5 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
            Certified local guides in India
          </span>
          <span className="text-sm font-bold text-slate-900 flex items-center gap-3">
            <svg className="w-5 h-5 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            Reserve now, pay later
          </span>
        </div>
      </section>

      {/* Explore by Category */}
      <section className="bg-white" style={{ paddingTop: '80px', paddingBottom: '80px', marginTop: '60px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight" style={{ marginBottom: '40px' }}>Explore by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { id: "heritage", label: "Heritage & Culture", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800" },
              { id: "food", label: "Food & Culinary", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" },
              { id: "nature", label: "Nature & Wildlife", image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800" },
              { id: "private", label: "Private Day Trips", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800" },
            ].map((cat) => (
              <div
                key={cat.label}
                onClick={() => handleCategoryClick(cat.id)}
                className="aspect-square relative rounded-2xl overflow-hidden cursor-pointer group"
              >
                <img src={cat.image} alt={cat.label} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                <p className="absolute bottom-6 left-6 text-xl font-bold text-white">{cat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="bg-slate-900 pt-16 pb-12 border-t border-slate-800 text-center relative z-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <div className="text-3xl mb-6 flex items-center justify-center gap-1 inline-flex px-6 py-2">
            <span className="text-white font-extrabold tracking-tight">Smart</span>
            <span className="text-orange-500 font-extrabold tracking-tight">Tour</span>
          </div>
          <div className="text-slate-400 font-medium mb-8">
            <p>&copy; 2026 SmartTour Travel AI</p>
            <p>India</p>
          </div>
        </div>
      </footer>

      {/* RANDOM CITY MODAL */}
      {isCategoryModalOpen && activeCategoryData && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setIsCategoryModalOpen(false)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute top-4 right-4 bg-white/70 hover:bg-white text-slate-900 rounded-full w-8 h-8 flex items-center justify-center z-10 transition-colors shadow-sm"
            >
              ✕
            </button>

            {/* Hero Image */}
            <div className="h-56 bg-slate-200 w-full relative">
              <img src={activeCategoryData.img} alt={activeCategoryData.city} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Content Area */}
            <div className="px-12 py-10 relative -mt-6 bg-white rounded-t-3xl">
              <div className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2">Featured Destination</div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{activeCategoryData.city}</h3>
              <h4 className="text-lg font-semibold text-teal-800 mb-4">{activeCategoryData.title}</h4>
              <p className="text-slate-600 mb-8 leading-relaxed">{activeCategoryData.desc}</p>

              {/* Action Button linking to Itinerary Generator */}
              <Link
                href={`/itinerary?city=${encodeURIComponent(activeCategoryData.city)}&days=3`}
                className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
              >
                Plan 3 Days in {activeCategoryData.city}
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}