"use client";
import { useState } from 'react';

export function TranslationModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        <div className="bg-teal-800 p-6 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold tracking-wide">Live Translation</h2>
          <button onClick={onClose} className="hover:text-orange-400 font-bold">&times; Close</button>
        </div>
        <div className="p-8 flex flex-col gap-6">
          <div>
             <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 block">Language</label>
             <select className="w-full border-2 border-slate-200 rounded-xl p-3 text-slate-900 font-medium focus:outline-none focus:border-teal-800">
               <option>Malayalam</option>
               <option>Hindi</option>
               <option>English</option>
             </select>
          </div>
          <div>
             <label className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 block">Input Text</label>
             <textarea className="w-full border-2 border-slate-200 rounded-xl p-4 text-slate-900 resize-none h-24 focus:outline-none focus:border-teal-800" placeholder="Type here..."></textarea>
          </div>
          <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">Translate</button>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 min-h-[4rem]">
             <p className="text-slate-400 italic">Translation will appear here...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FoodModal({ onClose, location }) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-orange-500 p-6 flex justify-between items-center text-white">
          <h2 className="text-xl font-bold tracking-wide">Find Local Food</h2>
          <button onClick={onClose} className="hover:text-slate-900 font-bold">&times; Close</button>
        </div>
        <div className="p-8 overflow-y-auto">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input type="text" placeholder="Enter City or use Current Location..." className="flex-1 border-2 border-slate-200 rounded-xl p-4 text-slate-900 focus:outline-none focus:border-orange-500" defaultValue={location ? `${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)}` : ''} />
            <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 sm:py-0 rounded-xl transition-colors">Search</button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
               <h3 className="font-bold text-teal-800 text-lg">Paragon Restaurant</h3>
               <p className="text-slate-500 text-sm mt-1">Kerala Cuisine • 4.5 Stars</p>
               <button className="mt-4 text-orange-500 font-bold text-sm tracking-widest uppercase hover:text-orange-600 transition-colors">Directions &rarr;</button>
            </div>
            <div className="border border-slate-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
               <h3 className="font-bold text-teal-800 text-lg">Munnar Tea Cafe</h3>
               <p className="text-slate-500 text-sm mt-1">Snacks & Beverages • 4.8 Stars</p>
               <button className="mt-4 text-orange-500 font-bold text-sm tracking-widest uppercase hover:text-orange-600 transition-colors">Directions &rarr;</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmergencyModal({ type, onClose, location }) {
  const isPolice = type === 'police';
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col border-t-8 border-red-600 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 font-bold text-xl">&times;</button>
        <div className="p-8 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
            <svg className="w-10 h-10 text-red-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isPolice ? "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" : "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"}></path></svg>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">{isPolice ? "Nearest Police Station" : "Nearest Hospital"}</h2>
          <p className="text-slate-500 mb-8">Locating emergency services near your current GPS coordinates.</p>
          
          <div className="w-full bg-slate-50 rounded-xl p-6 text-left border border-slate-100 flex items-center justify-center min-h-[100px]">
            {location ? (
               <div className="flex animate-pulse items-center gap-3">
                 <div className="w-6 h-6 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                 <span className="text-slate-700 font-medium">Scanning local API at {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}...</span>
               </div>
            ) : (
               <p className="text-red-500 font-bold flex items-center gap-2">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                 GPS Permission Denied.
               </p>
            )}
          </div>
          <button onClick={onClose} className="mt-8 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1">Close Emergency View</button>
        </div>
      </div>
    </div>
  );
}
