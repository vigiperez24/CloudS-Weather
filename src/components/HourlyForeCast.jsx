import React, { useContext, useState } from "react";
import { WeatherContext } from "./WeatherContext";
import TempChart from "../components/WeatherOverviewData/TempChart";
import HourlyForecastSkeleton from "./LoadingSkeleton/HourlyForecastSkeleton";
import {
  WiRainMix,
  WiDaySunny,
  WiCloudy,
  WiThunderstorm,
  WiShowers,
} from "weather-icons-react";

// ========== Utility Function ==========
// Returns appropriate weather icon based on condition string.
// Used in 14-day forecast cards for visual clarity.
function getWeather(condition) {
  const lower = condition.toLowerCase();
  if (lower.includes("rain"))
    return <WiRainMix size={40} color="var(--color-text)" />;
  if (lower.includes("sun"))
    return <WiDaySunny size={40} color="var(--color-text)" />;
  if (lower.includes("cloud"))
    return <WiCloudy size={40} color="var(--color-text)" />;
  if (lower.includes("thunder"))
    return <WiThunderstorm size={40} color="var(--color-text)" />;
  if (lower.includes("snow"))
    return <WiShowers size={40} color="var(--color-text)" />;
  return <WiRainMix size={40} color="var(--color-text)" />;
}

// ========== Main Component ==========
// Displays hourly, daily, and current weather data.
// Uses context to access shared weather state across components.
function HourlyForeCast() {
  const { weatherData, hourly, daily, loading, error } =
    useContext(WeatherContext);

  // ========== Loading State ==========
  // Shows skeleton loader while fetching data.
  if (loading) {
    return <HourlyForecastSkeleton />;
  }

  // ========== Error State ==========
  // Displays error message if API call fails or data is invalid.
  if (error) {
    return (
      <div className="bg-[var(--color-secondary)] p-8 rounded-md shadow-md">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="material-symbols-outlined text-red-500 text-6xl">
            {" "}
            error{" "}
          </span>
          <p className="text-red-500 text-xl font-semibold">
            {" "}
            Oops! Something went wrong{" "}
          </p>
          <p className="text-[var(--color-secondary-text)]">{error}</p>
        </div>
      </div>
    );
  }

  // ========== Empty State ==========
  // Informs user to search for a location if no weather data is available.
  if (!weatherData || !hourly || !daily) {
    return (
      <div className="bg-[var(--color-secondary)] p-8 rounded-md shadow-md">
        <div className="flex flex-col items-center justify-center gap-4 text-center text-[var(--color-text)]">
          <span className="material-symbols-outlined text-6xl opacity-50">
            {" "}
            search{" "}
          </span>
          <p className="text-xl font-semibold">No weather data available</p>
          <p className="text-[var(--color-secondary-text)]">
            Please search for a location to view the forecast
          </p>
        </div>
      </div>
    );
  }

  // ========== Main Render ==========
  // Displays 24-hour chart, 14-day forecast, and current weather metrics.
  return (
    <div className="space-y-5">
      {/* ========== 24-Hour Forecast Section ========== */}
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        className="bg-[var(--color-secondary)] px-3 rounded-md shadow-md"
      >
        <div className="flex flex-col gap-2">
          {/* Section Header */}
          <div className="flex gap-2 items-center tracking-tight text-[var(--color-text)] py-3 border-b-1 border-gray-400">
            <span className="material-symbols-outlined">schedule</span>
            <p>24 Hours forecast</p>
          </div>
          {/* Chart Component */}
          <TempChart hourly={hourly} />
        </div>
      </div>

      {/* ========== 14-Day Forecast Section ========== */}
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        className="bg-[var(--color-secondary)] px-3 rounded-md shadow-md pb-5"
      >
        <div className="flex flex-col gap-2">
          {/* Section Header */}
          <div className="flex gap-2 items-center tracking-tight text-[var(--color-text)] py-3 border-b-1 border-gray-400">
            <span className="material-symbols-outlined">
              {" "}
              nest_clock_farsight_analog{" "}
            </span>
            <p>14 Day forecast</p>
          </div>
          {/* Scrollable Forecast Cards */}
          <div className="text-[var(--color-text)] flex gap-2 overflow-y-auto scrollbar-custom p-2">
            {daily.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center py-2 px-6 gap-2 mb-2 rounded-md shadow-md hover:bg-[var(--color-card-hover)] border-1 border-[var(--color-border)] cursor-pointer"
              >
                <p className="text-xs">{item.weekday}</p>
                <p className="text-[10px] text-[var(--color-secondary-text)]">
                  {item.month} {item.day}
                </p>
                <p className="text-3xl font-bold">{item.temp}</p>
                <i>{getWeather(item.condition)}</i>
                <div className="flex space-x-3">
                  <p className="text-[10px] text-[var(--color-text)]">
                    {item.high}°
                  </p>
                  <p className="text-[10px] text-[var(--color-text)]">
                    {item.low}°
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========== Current Weather Section ========== */}
      <div
        data-aos="fade-up"
        data-aos-duration="1500"
        className="p-4 bg-[var(--color-secondary)] rounded-md shadow-md"
      >
        {/* Section Header */}
        <div className="flex flex-row justify-between items-center border-b-1 border-gray-400 pb-2">
          <div className="flex gap-1 text-[var(--color-text)]">
            <span className="material-symbols-outlined">
              {" "}
              location_searching{" "}
            </span>
            <p>Current Weather</p>
          </div>
          <p className="text-[var(--color-text)]">{weatherData.localTime}</p>
        </div>

        {/* Two-column layout: icon + RealFeel on left, metrics on right */}
        <div className="grid grid-cols-1 py-2 md:grid-cols-2">
          {/* Left Column - RealFeel Icon + Temp */}
          <div className="flex space-x-2 items-center justify-center text-[var(--color-text)] flex-col">
            <i>
              <WiCloudy size={100} />
            </i>
            <div className="text-[var(--color-text)] text-center">
              <p className="font-bold text-5xl">{weatherData.realFeel}°</p>
              <p>RealFeel</p>
            </div>
          </div>

          {/* Right Column - Weather Metrics */}
          <div className="text-[var(--color-text)] ">
            <div className="flex justify-between items-center border-gray-400 border-b-1 py-2">
              <p className="tracking-wider">RealFeel Shade</p>
              <span className="font-bold">{weatherData.realFeelShade}°</span>
            </div>
            <div>
              <div className="flex justify-between items-center border-gray-400 border-b-1 py-2">
                <p className="tracking-wider">Wind</p>
                <span className="font-bold">
                  {" "}
                  {weatherData.windSpeed}° km/h NE{" "}
                </span>
              </div>
              <div className="flex justify-between items-center border-gray-400 border-b-1 py-2">
                <p className="tracking-wider">Wind Gusts</p>
                <span className="font-bold">{weatherData.windGusts} km/h</span>
              </div>
              <div className="flex justify-between items-center border-gray-400 border-b-1 py-2">
                <p className="tracking-wider">Wind Direction</p>
                <span className="font-bold text-green-500">
                  {weatherData.windDirectionFull}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HourlyForeCast;
