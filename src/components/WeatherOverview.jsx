/**
 * WeatherOverview Component
 *
 * Main component for displaying comprehensive weather information.
 * Handles user location search, displays current weather conditions,
 * and provides detailed weather metrics including temperature, precipitation,
 * visibility, humidity, pressure, UV index, cloud cover, and sun times.
 *
 * Features:
 * - City-based weather search
 * - Dynamic background based on weather conditions
 * - Theme toggle (light/dark mode)
 * - Responsive grid layout for weather cards
 * - Loading states and error handling
 *
 * @component
 * @author vigiperez24
 * @version 1.0.0
 */

import { useTheme } from "./ThemeContext";
import React, { useContext, useState } from "react";
import { WeatherContext } from "./WeatherContext";
import UVIndex from "./WeatherOverviewData/UVIndex";
import ErrorMsg from "./WeatherOverviewData/ErrorMsg";

// Weather condition background images
import rainy from "../assets/background/rainy.png";
import sunny from "../assets/background/sunny.png";
import cloudy from "../assets/background/cloudy.png";
import thunderStorm from "../assets/background/thunderStorm.png";
import snow from "../assets/background/snow.png";
import Logo from "../assets/Logo/Logo.png";

// Components
import WeatherSkeleton from "./LoadingSkeleton/WeatherSkeleton";

// Weather icons library
import {
  WiRain,
  WiDayFog,
  WiRaindrops,
  WiBarometer,
  WiDaySunny,
  WiSunrise,
  WiSunset,
  WiCloudy,
} from "weather-icons-react";

function WeatherOverview() {
  // ========================================
  // Context & State Management
  // ========================================

  /**
   * Theme context for managing light/dark mode
   * @type {Object} theme - Current theme state
   * @type {Function} toggleTheme - Function to toggle between themes
   */
  const { theme, toggleTheme } = useTheme();

  /**
   * Weather context for managing weather data state
   * Contains weather data, loading states, error states, and update functions
   */
  const {
    weatherData,
    loading,
    error,
    setWeatherData,
    setLoading,
    setError,
    setHourly,
    setDaily,
    daily,
    hourly,
  } = useContext(WeatherContext);

  /**
   * Local state for search input
   * @type {string} city - User input for city search
   */
  const [city, setCity] = useState("");

  // ========================================
  // API Functions
  // ========================================

  /**
   * Fetches weather data from backend API based on city name
   *
   * Makes a GET request to the backend API endpoint with the city parameter.
   * Updates the weather context with the fetched data including current weather,
   * hourly forecast, and daily forecast.
   *
   * @async
   * @function fetchWeather
   * @throws {Error} Network error or server connection issues
   * @returns {Promise<void>}
   */
  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch(`http://localhost:5000/api/weather/${city}`);
      const data = await response.json();

      if (response.ok) {
        setWeatherData(data);
        setHourly(data.hourly);
        setDaily(data.daily);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Network error or server is down");
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // Utility Functions
  // ========================================

  /**
   * Determines and returns the appropriate background image based on weather condition
   *
   * Analyzes the weather condition string and returns the corresponding
   * background image. Defaults to cloudy if no match is found.
   *
   * @function getBackgroundImage
   * @param {string} condition - Weather condition text (e.g., "Rainy", "Sunny", "Cloudy")
   * @returns {string} Image path for the background
   */
  function getBackgroundImage(condition = "") {
    const cond = condition.toLowerCase();
    if (cond.includes("rain")) return rainy;
    if (cond.includes("sunny") || cond.includes("clear")) return sunny;
    if (cond.includes("cloud")) return cloudy;
    if (cond.includes("thunder")) return thunderStorm;
    if (cond.includes("snow")) return snow;
    return cloudy; // default fallback
  }

  // ========================================
  // Component Render
  // ========================================

  return (
    <div className="flex flex-col gap-5">
      {/* ========================================
          Header Section
          ========================================
          Contains logo, search bar, search button, and theme toggle
      */}
      <div className="flex w-full space-x-5 items-center z-10">
        {/* Application Logo */}
        <img className=" w-17" src={Logo} alt="Logo " />

        {/* Search Input Field */}
        <div className="flex relative w-full">
          <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-[var(--color-text)]">
            search
          </span>
          <input
            className="bg-[var(--color-secondary)] pl-10 py-3 w-full text-[var(--color-text)] rounded-md placeholder-clamp"
            type="text"
            placeholder="Search your State / Province / City / Country"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* Search Submit Button */}
        <button
          onClick={fetchWeather}
          className="text-[var(--color-text)] bg-[var(--color-secondary)] p-3 rounded-md cursor-pointer hover:bg-[var(--color-card-hover)]"
        >
          Search
        </button>

        {/* Theme Toggle Button - Switches between light and dark mode */}
        <span
          className="material-symbols-outlined text-[var(--color-text)] bg-[var(--color-secondary)] p-3 rounded-md cursor-pointer hover:bg-[var(--color-card-hover)] "
          onClick={toggleTheme}
        >
          {theme === "light" ? "dark_mode" : "light_mode"}
        </span>
      </div>

      {/* ========================================
          Loading State
          ========================================
          Displays skeleton loader while fetching data
      */}
      {loading && <WeatherSkeleton />}

      {/* ========================================
          Main Weather Display
          ========================================
          Renders when data is successfully loaded
      */}
      {!error && weatherData && !loading && (
        <div
          style={{
            backgroundImage: `url(${getBackgroundImage(
              weatherData?.condition
            )})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="p-6 flex flex-col gap-15.5 rounded-md relative overflow-hidden"
        >
          {/* Gradient Overlay - Improves text readability over background */}
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--gradient-start)] via-[var(--gradient-mid)] to-transparent" />

          {/* Location Information Display */}
          <div className="flex items-center gap-8 text-[var(--color-text)] z-10">
            <div className=" flex items-center justify-between w-full">
              <div className=" flex items-center">
                <span className="material-symbols-outlined">location_on</span>
                <p className="text-2xl">{weatherData.location} </p>
              </div>
              <p>{weatherData.country}</p>
            </div>
          </div>

          {/* Current Temperature and Condition Display */}
          <div className="z-10">
            <p className="text-7xl font-bold text-center text-[var(--color-text)] ">
              {weatherData.temperature}°C
            </p>
            <p className="text-2xl text-[var(--color-text)] text-center">
              {weatherData.condition}
            </p>
          </div>

          {/* ========================================
              Weather Metrics Grid
              ========================================
              Responsive grid displaying various weather parameters
          */}
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 z-10">
              {/* Precipitation Card - Shows current and 24hr precipitation */}
              <div className="bg-[var(--color-secondary)]/90 p-3 rounded-md text-[var(--color-text)] space-y-1">
                <div className="flex items-start gap-1">
                  <WiRain size={25} />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                    Precipitation
                  </p>
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                  {weatherData.precipitation}"
                </p>
                <p className="tracking-wide text-[var(--color-secondary-text)] text-[10px] sm:text-[11px]">
                  {weatherData.forecastPrecipitation} mm in Last 24 Hours
                </p>
              </div>

              {/* Visibility Card - Shows visibility distance in kilometers */}
              <div className="bg-[var(--color-secondary)]/90 p-3 rounded-md text-[var(--color-text)] space-y-3">
                <div className="flex items-start gap-1">
                  <WiDayFog size={24} />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                    Visibility
                  </p>
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                  {weatherData.visibility} km
                </p>
              </div>

              {/* Humidity Card - Shows humidity percentage and dew point */}
              <div className="bg-[var(--color-secondary)]/90 p-3 rounded-md text-[var(--color-text)] space-y-1">
                <div className="flex items-start gap-1">
                  <WiRaindrops size={27} />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                    Humidity
                  </p>
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                  82%
                </p>
                <p className="tracking-wide text-[var(--color-secondary-text)] text-[10px] sm:text-[11px]">
                  The dew point is {weatherData.dewPoint}°
                </p>
              </div>

              {/* Pressure Card - Shows atmospheric pressure in hPa */}
              <div className="bg-[var(--color-secondary)]/90 p-3 rounded-md text-[var(--color-text)] space-y-3">
                <div className="flex items-start gap-1">
                  <WiBarometer size={24} />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                    Pressure
                  </p>
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                  {weatherData.pressure} hPa
                </p>
              </div>

              {/* UV Index Card - Shows UV index with color-coded indicator */}
              <div className="bg-[var(--color-secondary)]/90 p-3 rounded-md text-[var(--color-text)] space-y-3">
                <div className="flex items-start gap-1">
                  <WiDaySunny size={25} />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                    UV Index
                  </p>
                </div>
                <UVIndex uvIndex={weatherData.uvIndex} />
              </div>

              {/* Cloud Cover Card - Shows cloud coverage percentage */}
              <div className="bg-[var(--color-secondary)]/90 p-3 rounded-md text-[var(--color-text)] space-y-3">
                <div className="flex items-start gap-1">
                  <WiCloudy size={25} />
                  <p className="text-sm sm:text-base md:text-lg  font-semibold">
                    Cloud Cover
                  </p>
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                  {weatherData.cloudCover}%
                </p>
              </div>

              {/* Sunrise Card - Shows sunrise time */}
              <div className="bg-[var(--color-secondary)]/90 p-3 rounded-md text-[var(--color-text)] space-y-3">
                <div className="flex items-start gap-1">
                  <WiSunrise size={25} />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                    Sunrise
                  </p>
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                  {weatherData.sunrise}
                </p>
              </div>

              {/* Sunset Card - Shows sunset time */}
              <div className="bg-[var(--color-secondary)]/90 p-3 rounded-md text-[var(--color-text)] space-y-3">
                <div className="flex items-start gap-1">
                  <WiSunset size={25} />
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold">
                    Sunset
                  </p>
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold">
                  {weatherData.sunset}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================
          Error State
          ========================================
          Displays error message when fetch fails
      */}
      {error && !loading && <ErrorMsg errorMessage={error} />}
    </div>
  );
}

export default WeatherOverview;
