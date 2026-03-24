"use client";

import { useState, useEffect } from "react";

const PREFERENCE_OPTIONS = ["Vegetarian", "Budget Traveler", "History Buff", "Adventure"];

export default function Preferences() {
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    // Load from local storage
    const saved = localStorage.getItem("travel_preferences");
    if (saved) setPreferences(JSON.parse(saved));
  }, []);

  const togglePreference = (pref) => {
    const updated = preferences.includes(pref)
      ? preferences.filter((p) => p !== pref)
      : [...preferences, pref];
    
    setPreferences(updated);
    localStorage.setItem("travel_preferences", JSON.stringify(updated));
  };

  return (
    <div className="flex flex-wrap gap-4 text-black">
      {PREFERENCE_OPTIONS.map((pref) => (
        <label key={pref} className="flex items-center space-x-2 cursor-pointer bg-gray-100 border border-gray-200 px-4 py-2 rounded-full hover:bg-gray-200 transition">
          <input
            type="checkbox"
            checked={preferences.includes(pref)}
            onChange={() => togglePreference(pref)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>{pref}</span>
        </label>
      ))}
    </div>
  );
}
