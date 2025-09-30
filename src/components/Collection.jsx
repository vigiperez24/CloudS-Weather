import React from "react";
import WeatherOverview from "./WeatherOverview";
import { WeatherProvider } from "./WeatherContext";
import HourlyForeCast from "./HourlyForeCast";
import Footer from "./Footer";

function Collection() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center min-h-screen md:p-5 bg-[var(--color-main-bg)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 bg-[var(--color-bg)] p-5 rounded-md">
          <WeatherProvider>
            <WeatherOverview />
            <HourlyForeCast />
          </WeatherProvider>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Collection;
