// src/components/UVIndex.jsx
import React from "react";

// ========== UVIndex Component ==========
// Displays the UV index value, its risk category, a visual scale, and safety advice.
// Helps users understand sun exposure risks and take precautions.
function UVIndex({ uvIndex }) {
  const maxUV = 11; // Max UV index used for scaling
  const percentage = Math.min((uvIndex / maxUV) * 100, 100); // Position marker on scale

  // ========== Risk Category Logic ==========
  // Returns label and advice based on UV index value.
  function getCategory(index) {
    if (index <= 2)
      return {
        label: "Low",
        advice:
          "Low risk. Sunscreen optional unless you're outside for extended periods.",
      };
    if (index <= 5)
      return {
        label: "Moderate",
        advice:
          "Moderate risk. Use SPF 30+ if staying outdoors for more than 30 minutes.",
      };
    if (index <= 7)
      return {
        label: "High",
        advice:
          "High risk. Wear SPF 30+, sunglasses, and a hat. Seek shade during midday.",
      };
    if (index <= 10)
      return {
        label: "Very High",
        advice:
          "Very high risk. Limit sun exposure between 10 AM and 4 PM. Use SPF 50+.",
      };
    return {
      label: "Extreme",
      advice:
        "Extreme risk. Avoid direct sunlight. Use SPF 50+, long sleeves, and stay indoors if possible.",
    };
  }

  const { label, advice } = getCategory(uvIndex); // Get category info

  return (
    <div className="space-y-2">
      {/* ========== UV Value + Category Label ========== */}
      <p className="text-base sm:text-lg md:text-xl lg:text-xl font-bold">
        {uvIndex} ({label})
      </p>

      {/* ========== Visual UV Scale ========== */}
      {/* Gradient bar with a movable marker based on UV percentage */}
      <div className="relative h-2 rounded-full bg-gradient-to-r from-green-400 via-yellow-400 to-red-400">
        <div
          style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
          className="absolute w-3 h-3 bg-white top-1/2 -translate-y-1/2 border-2 border-black rounded-full"
        />
      </div>

      {/* ========== Safety Advice ========== */}
      {/* Text guidance based on UV risk level */}
      <p className="tracking-wide mt-2 text-[var(--color-secondary-text)] text-[10px] sm:text-[11px]">
        {advice}
      </p>
    </div>
  );
}

export default UVIndex;
