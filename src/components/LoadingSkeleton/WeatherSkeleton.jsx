import React from "react";

// ========== WeatherSkeleton Component ==========
// Shows loading UI while weather data is being fetched.
// Optimized for snappy UX and reduced render load.
function WeatherSkeleton() {
  return (
    <div className="relative">
      {/* Main container with pulse animation */}
      <div className="p-6 flex flex-col gap-8 rounded-md bg-[var(--color-secondary)]/50 animate-pulse will-change-transform">
        {/* ========== Location Skeleton ========== */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[var(--color-secondary)] rounded"></div>
            <div className="h-8 w-48 bg-[var(--color-secondary)] rounded"></div>
          </div>
          <div className="h-6 w-24 bg-[var(--color-secondary)] rounded"></div>
        </div>

        {/* ========== Temperature Skeleton ========== */}
        <div className="space-y-4">
          <div className="h-20 w-64 bg-[var(--color-secondary)] rounded mx-auto"></div>
          <div className="h-8 w-40 bg-[var(--color-secondary)] rounded mx-auto"></div>
        </div>

        {/* ========== Weather Cards Skeleton ========== */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="bg-[var(--color-secondary)]/90 p-3 rounded-md space-y-3">
              <div className="flex items-start gap-1">
                <div className="w-6 h-6 bg-[var(--color-secondary)] rounded"></div>
                <div className="h-6 w-24 bg-[var(--color-secondary)] rounded"></div>
              </div>
              <div className="h-8 w-20 bg-[var(--color-secondary)] rounded"></div>
              {index % 2 === 0 && (
                <div className="h-4 w-full bg-[var(--color-secondary)] rounded"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ========== Spinner Overlay ========== */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-[var(--color-text-secondary)] text-sm font-medium animate-pulse">
          Loading weather data...
        </p>
      </div>
    </div>
  );
}

export default React.memo(WeatherSkeleton);
