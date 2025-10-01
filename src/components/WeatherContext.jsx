import React, { createContext, useState, useEffect } from "react";
export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [weatherData, setWeatherData] = useState(null);
  const [hourly, setHourly] = useState([]);
  const [daily, setDaily] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [locationFetched, setLocationFetched] = useState(false);

  const fallbackCoords = {
    latitude: 14.5995,
    longitude: 120.9842,
  };

  const fetchWeather = async (latitude, longitude, isUserLocation = false) => {
    try {
      const res = await fetch(
        `https://clouds-weather-gno6.onrender.com/api/weather?lat=${latitude}&lon=${longitude}`
      );
      const data = await res.json();

      if (res.ok) {
        setWeatherData(data);
        setHourly(data.hourly || []);
        setDaily(data.daily || []);
        setLoading(false);
        if (isUserLocation) setLocationFetched(true);
      } else {
        setError(data.error || "Something went wrong");
        setLoading(false);
      }
    } catch {
      setError("Network error or server is down");
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check permission first
    const requestLocation = async () => {
      if ("geolocation" in navigator) {
        // This will trigger the browser permission prompt
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const { latitude, longitude } = pos.coords;
            fetchWeather(latitude, longitude, true);
          },
          (err) => {
            // User denied or error - fallback to Manila
            console.log("Location denied, using Manila fallback");
            setError("Location access denied. Showing Manila weather.");
            fetchWeather(fallbackCoords.latitude, fallbackCoords.longitude);
          },
          { enableHighAccuracy: true, timeout: 5000 }
        );
      } else {
        // No geolocation support - use Manila
        fetchWeather(fallbackCoords.latitude, fallbackCoords.longitude);
      }
    };

    requestLocation();
  }, []);

  return (
    <WeatherContext.Provider
      value={{
        weatherData,
        setWeatherData,
        hourly,
        setHourly,
        daily,
        setDaily,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}
