"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white pb-0">

      {/* Immersive Hero */}
      <section className="relative w-full h-[85vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-slate-900">
          <img src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000" alt="Kerala Backwaters" className="w-full h-full object-cover opacity-70" />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900 to-transparent"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20 w-full mb-12">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight">
            Discover the Soul of Kerala
          </h1>
        </div>
      </section>

      {/* Our Popular Trips - ADDED INLINE STYLES FOR FORCED SPACING */}
      <section id="trips" className="bg-white relative z-20" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center" style={{ marginBottom: '100px' }}>
            <h2 className="text-4xl md:text-5xl font-extrabold text-teal-800 tracking-tight mb-4">Our Popular Trips</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                id: "kochi",
                name: "Kochi Heritage",
                days: 3,
                stats: "Rich History | 12 Attractions",
                image: "https://res.cloudinary.com/ddbqj52jr/image/upload/f_auto,q_auto/koochi_ykvtzh"
              },
              {
                id: "munnar",
                name: "Munnar Retreat",
                days: 3,
                stats: "Relaxed Vibe | 10 Attractions",
                image: "https://res.cloudinary.com/ddbqj52jr/image/upload/f_auto,q_auto/munnar-image-1_vgd8iu"
              },
              {
                id: "alleppey",
                name: "Alleppey Waters",
                days: 2,
                stats: "Houseboats | 5 Attractions",
                image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?q=80&w=800"
              },
              {
                id: "wayanad",
                name: "Wayanad Trails",
                days: 4,
                stats: "Adventure | 15 Attractions",
                image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800"
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

      {/* About Kerala Section */}
      <section className="w-full bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="max-w-lg">
              <h2 className="text-4xl md:text-5xl font-extrabold text-teal-800 mb-8 tracking-tight">God's Own Country</h2>
              <p className="text-xl leading-relaxed text-slate-600 mb-6">
                Kerala offers an unparalleled escape into nature. From the cascading waterfalls of Athirappilly to the serene networked backwaters of Kumarakom, every destination provides a canvas for lifelong memories.
              </p>
              <p className="text-lg leading-relaxed text-slate-600">
                Immerse yourself in profound spirituality and rejuvenating ayurvedic traditions.
              </p>
            </div>
            <div>
              <img src="https://res.cloudinary.com/ddbqj52jr/image/upload/f_auto,q_auto/kerala_vgegxj" alt="Kerala Scenic" className="w-full h-auto rounded-3xl shadow-2xl object-cover transform hover:scale-[1.02] transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section - REFINED PROFESSIONAL DESIGN */}
      <section id="about" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-orange-500 tracking-tight">Why SmartTour?</h2>
            <p className="text-xl text-slate-500 mt-6 leading-relaxed">
              SmartTour blends the timeless elegance of classic travel curation with the bleeding-edge intelligence of modern AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.04)] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Instant Itineraries</h3>
              <p className="text-slate-500 text-lg leading-relaxed">Instantly generated, highly-personalized travel schedules matching your exact preferences.</p>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.04)] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Real-Time Translation</h3>
              <p className="text-slate-500 text-lg leading-relaxed">Break down language barriers with localized AI translation seamlessly integrated into the platform.</p>
            </div>

            <div className="bg-white p-10 rounded-3xl border border-slate-100 shadow-[0_2px_20px_rgb(0,0,0,0.04)] hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Emergency SOS</h3>
              <p className="text-slate-500 text-lg leading-relaxed">Context-aware, geolocation-based emergency routing keeping you safe anywhere in Kerala.</p>
            </div>
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
            <p>Kochi, Kerala</p>
          </div>

          <div className="flex justify-center gap-12">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-orange-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path></svg>
              <span className="font-bold text-lg">Facebook</span>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-slate-400 hover:text-orange-500 transition-colors">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path></svg>
              <span className="font-bold text-lg">Instagram</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}