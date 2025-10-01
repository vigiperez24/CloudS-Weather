import React from "react";

// ========== HourlyForecastSkeleton Component ==========
// Displays animated placeholder UI with centered loading spinner
// while hourly, daily, and current weather data is loading.
function HourlyForecastSkeleton() {
  return (
    <div className="relative space-y-5">
      {/* ========== 24-Hour Forecast Skeleton ========== */}
      <div className="bg-[var(--color-secondary)] p-4 rounded-md animate-pulse">
        <div className="flex flex-col gap-3">
          {/* Header Placeholder */}
          <div className="flex gap-2 items-center">
            <div className="w-5 h-5 bg-[var(--color-secondary)]/70 rounded"></div>
            <div className="h-4 w-32 bg-[var(--color-secondary)]/70 rounded"></div>
          </div>
          {/* Chart Area Placeholder */}
          <div className="h-48 w-full bg-[var(--color-secondary)]/70 rounded"></div>
        </div>
      </div>

      {/* ========== 14-Day Forecast Skeleton ========== */}
      <div className="bg-[var(--color-secondary)] p-4 rounded-md animate-pulse">
        <div className="flex flex-col gap-3">
          {/* Header Placeholder */}
          <div className="flex gap-2 items-center">
            <div className="w-5 h-5 bg-[var(--color-secondary)]/70 rounded"></div>
            <div className="h-4 w-32 bg-[var(--color-secondary)]/70 rounded"></div>
          </div>

          {/* Daily Cards Placeholder */}
          <div className="flex gap-2 overflow-hidden">
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-2 p-3 rounded-md min-w-[80px]"
              >
                {/* Day + Date */}
                <div className="h-3 w-10 bg-[var(--color-secondary)]/70 rounded"></div>
                <div className="h-2 w-12 bg-[var(--color-secondary)]/70 rounded"></div>
                {/* Temperature */}
                <div className="h-8 w-12 bg-[var(--color-secondary)]/70 rounded"></div>
                {/* Weather Icon */}
                <div className="w-8 h-8 bg-[var(--color-secondary)]/70 rounded-full"></div>
                {/* High / Low Temps */}
                <div className="flex gap-2">
                  <div className="h-2 w-6 bg-[var(--color-secondary)]/70 rounded"></div>
                  <div className="h-2 w-6 bg-[var(--color-secondary)]/70 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== Current Weather Skeleton ========== */}
      <div className="bg-[var(--color-secondary)] p-4 rounded-md animate-pulse">
        {/* Header Placeholder */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <div className="w-5 h-5 bg-[var(--color-secondary)]/70 rounded"></div>
            <div className="h-4 w-28 bg-[var(--color-secondary)]/70 rounded"></div>
          </div>
          <div className="h-4 w-20 bg-[var(--color-secondary)]/70 rounded"></div>
        </div>

        {/* Content Placeholder */}
        <div className="grid grid-cols-2 gap-4">
          {/* Left Column - RealFeel Placeholder */}
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-20 h-20 bg-[var(--color-secondary)]/70 rounded-full"></div>
            <div className="h-10 w-16 bg-[var(--color-secondary)]/70 rounded"></div>
            <div className="h-3 w-14 bg-[var(--color-secondary)]/70 rounded"></div>
          </div>

          {/* Right Column - Weather Info Placeholder */}
          <div className="space-y-3">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="h-3 w-20 bg-[var(--color-secondary)]/70 rounded"></div>
                <div className="h-3 w-12 bg-[var(--color-secondary)]/70 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== Centered Loading Spinner Overlay ========== */}
      <div className="absolute inset-0 flex flex-col items-center justify-center ">
        {/* Spinning Circle */}
        <div className="w-16 h-16 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div>

        {/* Loading Text */}
        <p className="mt-4 text-[var(--color-text-secondary)] text-sm font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default HourlyForecastSkeleton;
