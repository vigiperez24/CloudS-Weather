import React from "react";

// ========== HourlyForecastSkeleton Component ==========
// Shows loading UI for hourly and daily forecast.
// Optimized for performance and progressive reveal.
function HourlyForecastSkeleton() {
  return (
    <div className="relative space-y-5 will-change-transform">
      {/* ========== 24-Hour Forecast Skeleton ========== */}
      <div className="bg-[var(--color-secondary)] p-4 rounded-md animate-pulse">
        <div className="flex gap-2 items-center mb-3">
          <div className="w-5 h-5 bg-[var(--color-secondary)]/70 rounded"></div>
          <div className="h-4 w-32 bg-[var(--color-secondary)]/70 rounded"></div>
        </div>
        <div className="h-32 w-full bg-[var(--color-secondary)]/70 rounded"></div>
      </div>

      {/* ========== 7-Day Forecast Skeleton ========== */}
      <div className="bg-[var(--color-secondary)] p-4 rounded-md animate-pulse">
        <div className="flex gap-2 items-center mb-3">
          <div className="w-5 h-5 bg-[var(--color-secondary)]/70 rounded"></div>
          <div className="h-4 w-32 bg-[var(--color-secondary)]/70 rounded"></div>
        </div>
        <div className="flex gap-2 overflow-hidden">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="flex flex-col items-center gap-2 p-3 rounded-md min-w-[80px]">
              <div className="h-3 w-10 bg-[var(--color-secondary)]/70 rounded"></div>
              <div className="h-2 w-12 bg-[var(--color-secondary)]/70 rounded"></div>
              <div className="h-8 w-12 bg-[var(--color-secondary)]/70 rounded"></div>
              <div className="w-8 h-8 bg-[var(--color-secondary)]/70 rounded-full"></div>
              <div className="flex gap-2">
                <div className="h-2 w-6 bg-[var(--color-secondary)]/70 rounded"></div>
                <div className="h-2 w-6 bg-[var(--color-secondary)]/70 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========== Current Weather Skeleton ========== */}
      <div className="bg-[var(--color-secondary)] p-4 rounded-md animate-pulse">
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <div className="w-5 h-5 bg-[var(--color-secondary)]/70 rounded"></div>
            <div className="h-4 w-28 bg-[var(--color-secondary)]/70 rounded"></div>
          </div>
          <div className="h-4 w-20 bg-[var(--color-secondary)]/70 rounded"></div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 bg-[var(--color-secondary)]/70 rounded-full"></div>
            <div className="h-8 w-16 bg-[var(--color-secondary)]/70 rounded"></div>
            <div className="h-3 w-14 bg-[var(--color-secondary)]/70 rounded"></div>
          </div>
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="h-3 w-20 bg-[var(--color-secondary)]/70 rounded"></div>
                <div className="h-3 w-12 bg-[var(--color-secondary)]/70 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== Spinner Overlay ========== */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-2 text-[var(--color-text-secondary)] text-sm font-medium animate-pulse">
          Loading forecast...
        </p>
      </div>
    </div>
  );
}

export default React.memo(HourlyForecastSkeleton);
