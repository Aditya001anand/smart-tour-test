// "use client";
// import Link from "next/link";
// import { useState } from "react";

// export default function Home() {
//   // State for random city modal
//   const [activeCategoryData, setActiveCategoryData] = useState(null);
//   const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

//   // Database of cities per category
//   const categoryDatabase = {
//     heritage: [
//       { city: "Jaipur", title: "The Pink City", desc: "Dive into royal history with the majestic Amber Fort and City Palace.", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800" },
//       { city: "Hampi", title: "Ruins of an Empire", desc: "Wander through the breathtaking stone chariots and ancient temples of the Vijayanagara Empire.", img: "https://images.unsplash.com/photo-1620766165457-a8025baa82e0?q=80&w=800" },
//       { city: "Varanasi", title: "The Spiritual Heart", desc: "Experience the timeless rituals and ancient ghats along the sacred Ganges river.", img: "https://res.cloudinary.com/ddbqj52jr/image/upload/q_auto/f_auto/v1775651240/varanasi_ftimbu.jpg" },
//       { city: "Agra", title: "Mughal Majesty", desc: "Home to the iconic Taj Mahal, a global symbol of eternal love and architectural brilliance.", img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800" },
//       { city: "Mysore", title: "City of Palaces", desc: "Marvel at the grandeur of the Mysore Palace and the city's rich silk heritage.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800" }
//     ],
//     food: [
//       { city: "Amritsar", title: "Punjabi Flavors", desc: "Indulge in iconic Kulchas and rich Lassi near the Golden Temple.", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" },
//       { city: "Lucknow", title: "Nawabi Feast", desc: "Taste the world-famous Galouti Kebabs and authentic Awadhi biryani.", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" },
//       { city: "Kolkata", title: "Street Food Capital", desc: "From spicy Puchkas to sweet Rasgullas, a paradise for food lovers.", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" },
//       { city: "Hyderabad", title: "The Biryani Hub", desc: "Savor the legendary, slow-cooked Hyderabadi Dum Biryani and Haleem.", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" },
//       { city: "Old Delhi", title: "Chandni Chowk Bites", desc: "Navigate narrow lanes for legendary parathas, jalebis, and Mughlai curries.", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" }
//     ],
//     nature: [
//       { city: "Ranthambore", title: "Tiger Territory", desc: "Embark on thrilling safaris to spot the majestic Bengal Tiger in the wild.", img: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800" },
//       { city: "Jim Corbett", title: "Himalayan Wilderness", desc: "India's oldest national park, offering pristine forests and rich wildlife.", img: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800" },
//       { city: "Kaziranga", title: "Rhino Sanctuary", desc: "Explore the vast grasslands, home to the one-horned rhinoceros.", img: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800" },
//       { city: "Sundarbans", title: "Mangrove Mystery", desc: "Navigate the largest mangrove forest in the world on a boat safari.", img: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800" },
//       { city: "Munnar", title: "Tea Estate Trek", desc: "Walk through endless rolling hills of lush green tea plantations.", img: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800" }
//     ],
//     private: [
//       { city: "Udaipur", title: "City of Lakes", desc: "Take a private boat ride on Lake Pichola and explore romantic island palaces.", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800" },
//       { city: "Rishikesh", title: "Yoga & Adventure", desc: "Enjoy a private yoga retreat or thrilling river rafting on the Ganges.", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800" },
//       { city: "Goa", title: "Secluded Beach Stays", desc: "Relax in a private luxury villa overlooking the serene Arabian Sea.", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800" },
//       { city: "Mahabalipuram", title: "Coastal Carvings", desc: "Take a private guided tour of the ancient, monolithic rock temples.", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800" },
//       { city: "Darjeeling", title: "Himalayan Views", desc: "Ride the Toy Train and watch the sunrise over Mount Kanchenjunga.", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800" }
//     ]
//   };

//   // Random city selector
//   function handleCategoryClick(categoryKey) {
//     const options = categoryDatabase[categoryKey] || [];
//     if (options.length === 0) return;
//     const randomIdx = Math.floor(Math.random() * options.length);
//     setActiveCategoryData(options[randomIdx]);

//     setIsCategoryModalOpen(true);
//   }

//   return (
//     <div className="flex flex-col min-h-screen font-sans bg-white pb-0">

//       {/* Immersive Hero */}
//       <section className="relative w-full h-[85vh] flex items-center justify-center">
//         <div className="absolute inset-0 bg-slate-900">
//           <img src="https://res.cloudinary.com/ddbqj52jr/image/upload/q_auto/f_auto/v1775652528/InShot_20260408_181744561.jpg_bpsssv.jpg" alt="India" className="w-full h-full object-cover opacity-70" />
//         </div>
//         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-900 to-transparent"></div>
//         <div className="relative z-10 max-w-5xl mx-auto px-6 text-center mt-20 w-full mb-12">
//           <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-2xl tracking-tight">
//             Discover the Soul of India
//           </h1>
//         </div>
//       </section>

//       {/* Our Popular Trips */}
//       <section id="trips" className="bg-white relative z-20" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
//         <div className="max-w-7xl mx-auto px-6">
//           <div className="text-center" style={{ marginBottom: '100px' }}>
//             <h2 className="text-4xl md:text-5xl font-extrabold text-teal-800 tracking-tight mb-4">Our Popular Trips</h2>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//             {[
//               {
//                 id: "jaipur",
//                 name: "Jaipur Heritage",
//                 days: 3,
//                 stats: "Palaces & Forts | 12 Attractions",
//                 image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800"
//               },
//               {
//                 id: "goa",
//                 name: "Goa Retreat",
//                 days: 4,
//                 stats: "Beaches & Culture | 10 Attractions",
//                 image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800"
//               },
//               {
//                 id: "agra",
//                 name: "Agra Wonders",
//                 days: 2,
//                 stats: "The Taj Mahal | 5 Attractions",
//                 image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800"
//               },
//               {
//                 id: "varanasi",
//                 name: "Varanasi Spirit",
//                 days: 3,
//                 stats: "Spiritual Ghats | 15 Attractions",
//                 image: "https://res.cloudinary.com/ddbqj52jr/image/upload/q_auto/f_auto/v1775651240/varanasi_ftimbu.jpg"
//               }
//             ].map(trip => (
//               <Link href={`/itinerary?city=${encodeURIComponent(trip.name.split(' ')[0])}&days=${trip.days}`} key={trip.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 block">
//                 <div className="overflow-hidden relative">
//                   <img src={trip.image} alt={trip.name} className="w-full h-64 object-cover rounded-t-xl group-hover:scale-105 transition-transform duration-500 ease-out" />
//                 </div>
//                 <div className="p-8">
//                   <h3 className="text-2xl font-bold text-slate-900 mb-2">{trip.name}</h3>
//                   <p className="text-slate-500 text-base font-medium mb-8">{trip.stats}</p>
//                   <div className="flex items-center text-teal-800 font-bold text-sm tracking-wide group-hover:text-orange-500 transition-colors">
//                     VIEW ITINERARY <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
//                   </div>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* About India Section */}
//       <section className="w-full bg-white">
//         <div className="max-w-7xl mx-auto px-6 py-40">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
//             <div className="max-w-lg">
//               <h2 className="text-4xl md:text-5xl font-extrabold text-teal-800 mb-8 tracking-tight">Incredible India</h2>
//               <p className="text-xl leading-relaxed text-slate-600 mb-6">
//                 India offers an unparalleled escape into diverse landscapes and ancient history. From the majestic forts of Rajasthan to the serene backwaters of the South, every destination provides a canvas for lifelong memories.
//               </p>
//               <p className="text-lg leading-relaxed text-slate-600">
//                 Immerse yourself in profound spirituality, vibrant cultures, and world-renowned culinary traditions.
//               </p>
//             </div>
//             <div>
//               <img src="https://res.cloudinary.com/ddbqj52jr/image/upload/v1775650787/india_ywszho.jpg" alt="India Scenic" className="w-full h-auto rounded-3xl shadow-2xl object-cover transform hover:scale-[1.02] transition-transform duration-500" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Trust Strip */}
//       <section className="bg-slate-50 border-y border-slate-200" style={{ paddingTop: '48px', paddingBottom: '48px', marginTop: '60px' }}>
//         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-around items-center gap-6 text-center md:text-left">
//           <span className="text-sm font-bold text-slate-900 flex items-center gap-3">
//             <svg className="w-5 h-5 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//             Free cancellation up to 24 hours
//           </span>
//           <span className="text-sm font-bold text-slate-900 flex items-center gap-3">
//             <svg className="w-5 h-5 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
//             Certified local guides in India
//           </span>
//           <span className="text-sm font-bold text-slate-900 flex items-center gap-3">
//             <svg className="w-5 h-5 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
//             Reserve now, pay later
//           </span>
//         </div>
//       </section>

//       {/* Explore by Category */}
//       <section className="bg-white" style={{ paddingTop: '80px', paddingBottom: '80px', marginTop: '60px' }}>
//         <div className="max-w-7xl mx-auto px-6">
//           <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight" style={{ marginBottom: '40px' }}>Explore by category</h2>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//             {[
//               { id: "heritage", label: "Heritage & Culture", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800" },
//               { id: "food", label: "Food & Culinary", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" },
//               { id: "nature", label: "Nature & Wildlife", image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800" },
//               { id: "private", label: "Private Day Trips", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800" },
//             ].map((cat) => (
//               <div
//                 key={cat.label}
//                 onClick={() => handleCategoryClick(cat.id)}
//                 className="aspect-square relative rounded-2xl overflow-hidden cursor-pointer group"
//               >
//                 <img src={cat.image} alt={cat.label} className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
//                 <p className="absolute bottom-6 left-6 text-xl font-bold text-white">{cat.label}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Global Footer */}
//       <footer className="bg-slate-900 pt-16 pb-12 border-t border-slate-800 text-center relative z-20">
//         <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
//           <div className="text-3xl mb-6 flex items-center justify-center gap-1 inline-flex px-6 py-2">
//             <span className="text-white font-extrabold tracking-tight">Smart</span>
//             <span className="text-orange-500 font-extrabold tracking-tight">Tour</span>
//           </div>
//           <div className="text-slate-400 font-medium mb-8">
//             <p>&copy; 2026 SmartTour Travel AI</p>
//             <p>India</p>
//           </div>
//         </div>
//       </footer>

//       {/* RANDOM CITY MODAL */}
//       {isCategoryModalOpen && activeCategoryData && (
//         <div
//           className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
//           onClick={() => setIsCategoryModalOpen(false)}
//         >
//           <div
//             className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200"
//             onClick={e => e.stopPropagation()}
//           >
//             {/* Close Button */}
//             <button
//               onClick={() => setIsCategoryModalOpen(false)}
//               className="absolute top-4 right-4 bg-white/70 hover:bg-white text-slate-900 rounded-full w-8 h-8 flex items-center justify-center z-10 transition-colors shadow-sm"
//             >
//               ✕
//             </button>

//             {/* Hero Image */}
//             <div className="h-56 bg-slate-200 w-full relative">
//               <img src={activeCategoryData.img} alt={activeCategoryData.city} className="w-full h-full object-cover" />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//             </div>

//             {/* Content Area */}
//             <div className="px-12 py-10 relative -mt-6 bg-white rounded-t-3xl">
//               <div className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-2">Featured Destination</div>
//               <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{activeCategoryData.city}</h3>
//               <h4 className="text-lg font-semibold text-teal-800 mb-4">{activeCategoryData.title}</h4>
//               <p className="text-slate-600 mb-8 leading-relaxed">{activeCategoryData.desc}</p>

//               {/* Action Button linking to Itinerary Generator */}
//               <Link
//                 href={`/itinerary?city=${encodeURIComponent(activeCategoryData.city)}&days=3`}
//                 className="block w-full text-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl"
//               >
//                 Plan 3 Days in {activeCategoryData.city}
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}

//     </div>
//   );
// }

//new ui implementation
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [activeCategoryData, setActiveCategoryData] = useState(null);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

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

  function handleCategoryClick(categoryKey) {
    const options = categoryDatabase[categoryKey] || [];
    if (options.length === 0) return;
    const randomIdx = Math.floor(Math.random() * options.length);
    setActiveCategoryData(options[randomIdx]);
    setIsCategoryModalOpen(true);
  }

  // Marquee images - destination photos
  const marqueeImages = [
    { src: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600", label: "Jaipur" },
    { src: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600", label: "Agra" },
    { src: "https://res.cloudinary.com/ddbqj52jr/image/upload/q_auto/f_auto/v1775651240/varanasi_ftimbu.jpg", label: "Varanasi" },
    { src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=600", label: "Goa" },
    { src: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=600", label: "Wildlife" },
    { src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=600", label: "Udaipur" },
    { src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=600", label: "Heritage" },
    { src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600", label: "Cuisine" },
  ];

  const trips = [
    { id: "jaipur", name: "Jaipur Heritage", days: 3, stats: "Palaces & Forts", attractions: "12 Attractions", image: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=800" },
    { id: "goa", name: "Goa Retreat", days: 4, stats: "Beaches & Culture", attractions: "10 Attractions", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=800" },
    { id: "agra", name: "Agra Wonders", days: 2, stats: "The Taj Mahal", attractions: "5 Attractions", image: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=800" },
    { id: "varanasi", name: "Varanasi Spirit", days: 3, stats: "Spiritual Ghats", attractions: "15 Attractions", image: "https://res.cloudinary.com/ddbqj52jr/image/upload/q_auto/f_auto/v1775651240/varanasi_ftimbu.jpg" }
  ];

  const categories = [
    { id: "heritage", label: "Heritage & Culture", image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=800" },
    { id: "food", label: "Food & Culinary", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800" },
    { id: "nature", label: "Nature & Wildlife", image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?q=80&w=800" },
    { id: "private", label: "Private Day Trips", image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');

        * { box-sizing: border-box; }

        body {
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .font-display { font-family: 'Playfair Display', serif; }

        /* ── Marquee ── */
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee-scroll 32s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover { animation-play-state: paused; }

        /* ── Fade-up on scroll ── */
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fade-up 0.7s ease both; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.22s; }
        .delay-3 { animation-delay: 0.34s; }
        .delay-4 { animation-delay: 0.46s; }

        /* ── Hero text shimmer ── */
        @keyframes shimmer {
          0%,100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }
        .hero-title {
          background: linear-gradient(90deg, #ffffff 30%, #fcd34d 50%, #ffffff 70%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 5s ease infinite;
        }

        /* ── Pill badge ── */
        .pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.25);
          backdrop-filter: blur(8px);
          border-radius: 999px;
          padding: 6px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #fff;
          letter-spacing: 0.04em;
        }

        /* ── Trip card ── */
        .trip-card {
          border-radius: 20px;
          overflow: hidden;
          background: #fff;
          border: 1px solid #e8e8e8;
          transition: transform 0.35s cubic-bezier(.22,.68,0,1.2), box-shadow 0.35s ease;
          display: flex;
          flex-direction: column;
        }
        .trip-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 24px 60px rgba(0,0,0,0.13);
        }
        .trip-card img {
          width: 100%;
          height: 240px;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .trip-card:hover img { transform: scale(1.07); }

        /* ── Category card ── */
        .cat-card {
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 1;
          position: relative;
          cursor: pointer;
        }
        .cat-card img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .cat-card:hover img { transform: scale(1.1); }
        .cat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.1) 60%, transparent 100%);
          transition: opacity 0.3s ease;
        }
        .cat-card:hover .cat-overlay { opacity: 0.9; }

        /* ── Trust strip ── */
        .trust-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
        }
        .trust-icon {
          width: 40px; height: 40px;
          background: #f0faf8;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* ── Modal ── */
        @keyframes modal-in {
          from { opacity: 0; transform: scale(0.93) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .modal-box { animation: modal-in 0.28s cubic-bezier(.22,.68,0,1.2) both; }

        /* ── Section label ── */
        .section-label {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #0d9488;
          background: #f0fdf9;
          border: 1px solid #99f6e4;
          border-radius: 999px;
          padding: 4px 14px;
          margin-bottom: 16px;
        }

        /* ── Divider dot ── */
        .dot-divider {
          display: inline-block;
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #e2e8f0;
          margin: 0 8px;
          vertical-align: middle;
        }

        /* ── Scroll fade ── */
        .marquee-fade-left  { background: linear-gradient(to right, #fff 0%, transparent 100%); }
        .marquee-fade-right { background: linear-gradient(to left,  #fff 0%, transparent 100%); }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fff', fontFamily: "'DM Sans', sans-serif" }}>

        {/* ════════════════════════════════════════
            HERO
        ════════════════════════════════════════ */}
        <section style={{ position: 'relative', width: '100%', height: '92vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {/* Background image */}
          <div style={{ position: 'absolute', inset: 0, background: '#0f172a' }}>
            <img
              src="https://res.cloudinary.com/ddbqj52jr/image/upload/q_auto/f_auto/v1775652528/InShot_20260408_181744561.jpg_bpsssv.jpg"
              alt="India"
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
            />
          </div>
          {/* Gradient bottom fade */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #fff 0%, rgba(15,23,42,0.4) 30%, transparent 70%)' }} />

          {/* Hero content */}
          <div className="fade-up" style={{ position: 'relative', zIndex: 10, textAlign: 'center', padding: '0 24px', maxWidth: '900px', width: '100%', marginTop: '40px' }}>
            <div style={{ marginBottom: '24px' }}>
              <span className="pill">✦ AI-Powered Travel Planning</span>
            </div>
            <h1
              className="hero-title font-display fade-up delay-1"
              style={{ fontSize: 'clamp(42px, 8vw, 88px)', fontWeight: 900, lineHeight: 1.05, marginBottom: '24px', letterSpacing: '-0.02em' }}
            >
              Discover the Soul<br />of India
            </h1>
            <p className="fade-up delay-2" style={{ fontSize: '18px', color: 'rgba(255,255,255,0.82)', maxWidth: '520px', margin: '0 auto 36px', lineHeight: 1.65, fontWeight: 400 }}>
              Personalised itineraries crafted by AI, inspired by centuries of culture and colour.
            </p>
            <div className="fade-up delay-3" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="#trips"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#f97316', color: '#fff', fontWeight: 700, fontSize: '15px', padding: '14px 28px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.02em', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#ea6a00'}
                onMouseLeave={e => e.currentTarget.style.background = '#f97316'}
              >
                Explore Trips →
              </a>
              <a
                href="#categories"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', fontWeight: 600, fontSize: '15px', padding: '14px 28px', borderRadius: '999px', textDecoration: 'none', letterSpacing: '0.02em' }}
              >
                Browse by Category
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{ position: 'absolute', bottom: '36px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 10 }}>
            <span style={{ fontSize: '11px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', fontWeight: 600 }}>Scroll</span>
            <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)' }} />
          </div>
        </section>

        {/* ════════════════════════════════════════
            MARQUEE IMAGE STRIP
        ════════════════════════════════════════ */}
        <div style={{ position: 'relative', overflow: 'hidden', background: '#fff', padding: '56px 0 64px' }}>
          {/* Fade edges */}
          <div className="marquee-fade-left"  style={{ position: 'absolute', top: 0, left: 0, width: '120px', height: '100%', zIndex: 2, pointerEvents: 'none' }} />
          <div className="marquee-fade-right" style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '100%', zIndex: 2, pointerEvents: 'none' }} />

          {/* Label */}
          <p style={{ textAlign: 'center', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700, color: '#94a3b8', marginBottom: '28px' }}>Destinations we love</p>

          <div className="marquee-track">
            {/* Render twice for seamless loop */}
            {[...marqueeImages, ...marqueeImages].map((img, i) => (
              <div
                key={i}
                style={{ flexShrink: 0, marginRight: '16px', borderRadius: '16px', overflow: 'hidden', position: 'relative', width: '260px', height: '170px', cursor: 'default' }}
              >
                <img
                  src={img.src}
                  alt={img.label}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.65) 0%, transparent 55%)' }} />
                <span style={{ position: 'absolute', bottom: '14px', left: '16px', color: '#fff', fontWeight: 700, fontSize: '14px', letterSpacing: '0.02em' }}>{img.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════
            POPULAR TRIPS
        ════════════════════════════════════════ */}
        <section id="trips" style={{ background: '#fafaf9', padding: '96px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ marginBottom: '60px' }}>
              <span className="section-label">Curated for you</span>
              <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
                Our Popular Trips
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '28px' }}>
              {trips.map((trip, i) => (
                <Link
                  href={`/itinerary?city=${encodeURIComponent(trip.name.split(' ')[0])}&days=${trip.days}`}
                  key={trip.id}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div className={`trip-card fade-up delay-${i + 1}`}>
                    <div style={{ overflow: 'hidden' }}>
                      <img src={trip.image} alt={trip.name} />
                    </div>
                    <div style={{ padding: '24px 28px 28px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0d9488', background: '#f0fdf9', border: '1px solid #99f6e4', borderRadius: '999px', padding: '3px 10px' }}>
                          {trip.days} Days
                        </span>
                      </div>
                      <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', margin: '0 0 6px', fontFamily: "'Playfair Display', serif" }}>{trip.name}</h3>
                      <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {trip.stats}<span className="dot-divider" />{trip.attractions}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f97316', fontWeight: 700, fontSize: '13px', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                        View Itinerary
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            ABOUT INDIA — EDITORIAL SPLIT
        ════════════════════════════════════════ */}
        <section style={{ background: '#fff', padding: '112px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center' }}>
            {/* Text col */}
            <div>
              <span className="section-label">Why India</span>
              <h2 className="font-display" style={{ fontSize: 'clamp(32px, 4.5vw, 52px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 28px' }}>
                Incredible India
              </h2>
              <p style={{ fontSize: '18px', lineHeight: 1.75, color: '#475569', marginBottom: '20px', fontWeight: 400 }}>
                India offers an unparalleled escape into diverse landscapes and ancient history. From the majestic forts of Rajasthan to the serene backwaters of the South, every destination provides a canvas for lifelong memories.
              </p>
              <p style={{ fontSize: '16px', lineHeight: 1.75, color: '#64748b', marginBottom: '40px' }}>
                Immerse yourself in profound spirituality, vibrant cultures, and world-renowned culinary traditions.
              </p>
              {/* Stats row */}
              <div style={{ display: 'flex', gap: '40px' }}>
                {[{ val: '28+', lab: 'States to explore' }, { val: '5000+', lab: 'Years of history' }, { val: '200+', lab: 'Destinations' }].map(s => (
                  <div key={s.val}>
                    <div className="font-display" style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>{s.val}</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 600, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.lab}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image col */}
            <div style={{ position: 'relative' }}>
              {/* Decorative offset block */}
              <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80%', height: '80%', background: '#fef3c7', borderRadius: '20px', zIndex: 0 }} />
              <img
                src="https://res.cloudinary.com/ddbqj52jr/image/upload/v1775650787/india_ywszho.jpg"
                alt="India Scenic"
                style={{ position: 'relative', zIndex: 1, width: '100%', height: '480px', objectFit: 'cover', borderRadius: '20px', boxShadow: '0 32px 64px rgba(0,0,0,0.16)' }}
              />
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            TRUST STRIP
        ════════════════════════════════════════ */}
        <section style={{ background: '#0f172a', padding: '52px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '32px' }}>
            {[
              { icon: '✓', text: 'Free cancellation up to 24 hours' },
              { icon: '★', text: 'Certified local guides across India' },
              { icon: '◷', text: 'Reserve now, pay later' },
            ].map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '42px', height: '42px', background: 'rgba(13,148,136,0.2)', border: '1px solid rgba(13,148,136,0.4)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', color: '#2dd4bf', flexShrink: 0 }}>
                  {t.icon}
                </div>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#fff' }}>{t.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════
            EXPLORE BY CATEGORY
        ════════════════════════════════════════ */}
        <section id="categories" style={{ background: '#fafaf9', padding: '96px 24px' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <span className="section-label">Tailored experiences</span>
                <h2 className="font-display" style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 900, color: '#0f172a', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0 }}>
                  Explore by Category
                </h2>
              </div>
              <p style={{ fontSize: '15px', color: '#94a3b8', maxWidth: '280px', lineHeight: 1.6 }}>Click any category for a surprise destination reveal.</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
              {categories.map((cat) => (
                <div key={cat.id} className="cat-card" onClick={() => handleCategoryClick(cat.id)}>
                  <img src={cat.image} alt={cat.label} />
                  <div className="cat-overlay" />
                  {/* Label */}
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '24px 22px 22px' }}>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: '#fff', margin: 0, fontFamily: "'Playfair Display', serif" }}>{cat.label}</p>
                    <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', fontWeight: 500, marginTop: '4px', display: 'block' }}>Tap to explore →</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════ */}
        <footer style={{ background: '#0f172a', padding: '64px 24px 48px', borderTop: '1px solid #1e293b' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Top row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '40px', marginBottom: '56px' }}>
              {/* Brand */}
              <div>
                <div style={{ fontSize: '28px', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '14px' }}>
                  <span style={{ color: '#fff' }}>Smart</span><span style={{ color: '#f97316' }}>Tour</span>
                </div>
                <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '260px', lineHeight: 1.65 }}>
                  AI-powered travel planning for India's most iconic destinations.
                </p>
              </div>
              {/* Links */}
              <div style={{ display: 'flex', gap: '56px', flexWrap: 'wrap' }}>
                {[
                  { heading: 'Destinations', links: ['Jaipur', 'Goa', 'Agra', 'Varanasi'] },
                  { heading: 'Company', links: ['About', 'Privacy', 'Terms'] }
                ].map(col => (
                  <div key={col.heading}>
                    <p style={{ color: '#94a3b8', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '16px' }}>{col.heading}</p>
                    {col.links.map(l => (
                      <p key={l} style={{ color: '#475569', fontSize: '14px', marginBottom: '10px', cursor: 'pointer', transition: 'color 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                        onMouseLeave={e => e.currentTarget.style.color = '#475569'}
                      >{l}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            {/* Bottom row */}
            <div style={{ borderTop: '1px solid #1e293b', paddingTop: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
              <p style={{ color: '#475569', fontSize: '13px' }}>© 2026 SmartTour Travel AI · India</p>
              <p style={{ color: '#334155', fontSize: '13px' }}>Made with ❤️ for incredible India</p>
            </div>
          </div>
        </footer>

        {/* ════════════════════════════════════════
            CATEGORY MODAL
        ════════════════════════════════════════ */}
        {isCategoryModalOpen && activeCategoryData && (
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: 'rgba(15,23,42,0.65)', backdropFilter: 'blur(6px)' }}
            onClick={() => setIsCategoryModalOpen(false)}
          >
            <div
              className="modal-box"
              style={{ background: '#fff', borderRadius: '28px', width: '100%', maxWidth: '460px', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.3)', position: 'relative' }}
              onClick={e => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '34px', height: '34px', cursor: 'pointer', zIndex: 10, fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0f172a', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
              >✕</button>

              {/* Hero image */}
              <div style={{ height: '220px', position: 'relative', background: '#e2e8f0' }}>
                <img src={activeCategoryData.img} alt={activeCategoryData.city} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.5) 0%, transparent 60%)' }} />
              </div>

              {/* Content */}
              <div style={{ padding: '32px 36px 36px' }}>
                <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f97316' }}>✦ Featured Destination</span>
                <h3 className="font-display" style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', margin: '8px 0 2px', letterSpacing: '-0.02em' }}>{activeCategoryData.city}</h3>
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#0d9488', margin: '0 0 16px' }}>{activeCategoryData.title}</h4>
                <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.7, marginBottom: '28px' }}>{activeCategoryData.desc}</p>

                <Link
                  href={`/itinerary?city=${encodeURIComponent(activeCategoryData.city)}&days=3`}
                  style={{ display: 'block', width: '100%', textAlign: 'center', background: '#0f172a', color: '#fff', fontWeight: 700, fontSize: '15px', padding: '15px 24px', borderRadius: '14px', textDecoration: 'none', letterSpacing: '0.02em', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#f97316'}
                  onMouseLeave={e => e.currentTarget.style.background = '#0f172a'}
                >
                  Plan 3 Days in {activeCategoryData.city} →
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}