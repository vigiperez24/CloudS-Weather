// import React, { createContext, useState, useEffect } from "react";

// // ========== Create Weather Context ==========
// // Provides shared access to weather data across components.
// export const WeatherContext = createContext();

// // ========== Weather Provider Component ==========
// // Wraps children with context and handles weather data fetching.
// export function WeatherProvider({ children }) {
//   // ========== State Definitions ==========
//   const [weatherData, setWeatherData] = useState(null); // Full weather response
//   const [hourly, setHourly] = useState([]); // Hourly forecast data
//   const [daily, setDaily] = useState([]); // 14-day forecast data
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(""); // Error message

//   // ========== Auto-fetch Weather on Mount ==========
//   // Uses browser geolocation to get user's coordinates and fetch weather data.
//   useEffect(() => {
//     // Check if geolocation is supported
//     if (!("geolocation" in navigator)) {
//       setError("Geolocation not supported");
//       setLoading(false);
//       return;
//     }

//     // Request current position
//     navigator.geolocation.getCurrentPosition(
//       async (pos) => {
//         const { latitude, longitude } = pos.coords;

//         try {
//           // Fetch weather data from backend API using lat/lon
//           const res = await fetch(
//             `https://clouds-weather-gno6.onrender.com/api/weather?lat=${latitude}&lon=${longitude}`
//           );

//           const data = await res.json();

//           // If response is OK, update context states
//           if (res.ok) {
//             setWeatherData(data);
//             setHourly(data.hourly || []);
//             setDaily(data.daily || []);
//           } else {
//             // Handle API error response
//             setError(data.error || "Something went wrong");
//           }
//         } catch {
//           // Handle network/server error
//           setError("Network error or server is down");
//         } finally {
//           // Stop loading regardless of outcome
//           setLoading(false);
//         }
//       },
//       () => {
//         // Handle location access denial
//         setError("Location access denied");
//         setLoading(false);
//       },
//       { enableHighAccuracy: true, timeout: 10000 } // Optional config for better accuracy
//     );
//   }, []);

//   // ========== Provide Context to Children ==========
//   // Makes weather data and setters available to all nested components.
//   return (
//     <WeatherContext.Provider
//       value={{
//         weatherData,
//         setWeatherData,
//         hourly,
//         setHourly,
//         daily,
//         setDaily,
//         loading,
//         setLoading,
//         error,
//         setError,
//       }}
//     >
//       {children}
//     </WeatherContext.Provider>
//   );
// }

import React, { createContext, useState, useEffect } from "react";

// ========== Create Weather Context ==========
// Provides shared access to weather data across components.
export const WeatherContext = createContext();

// ========== Weather Provider Component ==========
// Wraps children with context and handles weather data fetching.
export function WeatherProvider({ children }) {
  // ========== State Definitions ==========
  const [weatherData, setWeatherData] = useState(null); // Full weather response
  const [hourly, setHourly] = useState([]); // Hourly forecast data
  const [daily, setDaily] = useState([]); // 14-day forecast data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error message

  // ========== Manila Fallback Coordinates ==========
  const fallbackCoords = {
    latitude: 14.5995, // Manila
    longitude: 120.9842,
  };

  // ========== Reusable Weather Fetch Function ==========
  const fetchWeather = async (latitude, longitude) => {
    try {
      const res = await fetch(
        `https://clouds-weather-gno6.onrender.com/api/weather?lat=${latitude}&lon=${longitude}`
      );
      const data = await res.json();

      if (res.ok) {
        setWeatherData(data);
        setHourly(data.hourly || []);
        setDaily(data.daily || []);
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch {
      setError("Network error or server is down");
    } finally {
      setLoading(false);
    }
  };

  // ========== Auto-fetch Weather on Mount ==========
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported, showing Manila weather");
      fetchWeather(fallbackCoords.latitude, fallbackCoords.longitude);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        fetchWeather(latitude, longitude);
      },
      () => {
        setError("Location access denied, showing Manila weather");
        fetchWeather(fallbackCoords.latitude, fallbackCoords.longitude);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // ========== Provide Context to Children ==========
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

