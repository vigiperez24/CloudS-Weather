import React from "react";

// ========== WeatherSkeleton Component ==========
// Displays a loading skeleton while weather data is being fetched.
// Mimics the layout of the WeatherOverview component for smooth UX.
function WeatherSkeleton() {
  return (
    <div className="relative">
      {/* Main container with pulse animation */}
      <div className="p-6 flex flex-col gap-8 rounded-md bg-[var(--color-secondary)]/50 animate-pulse">
        {/* ========== Location Skeleton ========== */}
        {/* Simulates location icon + city name + country */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[var(--color-secondary)] rounded"></div>
            <div className="h-8 w-48 bg-[var(--color-secondary)] rounded"></div>
          </div>
          <div className="h-6 w-24 bg-[var(--color-secondary)] rounded"></div>
        </div>

        {/* ========== Temperature Skeleton ========== */}
        {/* Simulates main temperature and condition text */}
        <div className="space-y-4">
          <div className="h-20 w-64 bg-[var(--color-secondary)] rounded mx-auto"></div>
          <div className="h-8 w-40 bg-[var(--color-secondary)] rounded mx-auto"></div>
        </div>

        {/* ========== Weather Cards Skeleton ========== */}
        {/* Simulates multiple weather metric cards (humidity, pressure, etc.) */}
        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-[var(--color-secondary)]/90 p-3 rounded-md space-y-3"
              >
                {/* Card Header Placeholder (icon + label) */}
                <div className="flex items-start gap-1">
                  <div className="w-6 h-6 bg-[var(--color-secondary)] rounded"></div>
                  <div className="h-6 w-24 bg-[var(--color-secondary)] rounded"></div>
                </div>

                {/* Card Value Placeholder */}
                <div className="h-8 w-20 bg-[var(--color-secondary)] rounded"></div>

                {/* Optional Description Placeholder (every 3rd card) */}
                {index % 3 === 0 && (
                  <div className="h-4 w-full bg-[var(--color-secondary)] rounded"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== Centered Loading Spinner Overlay ========== */}
      <div className="absolute inset-0 flex flex-col items-center justify-center  rounded-md">
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

export default WeatherSkeleton;
