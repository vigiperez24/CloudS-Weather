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

// import React, { createContext, useState, useEffect } from "react";

// // ========== Create Weather Context ==========
// export const WeatherContext = createContext();

// // ========== Weather Provider Component ==========
// export function WeatherProvider({ children }) {
//   // ========== State Definitions ==========
//   const [weatherData, setWeatherData] = useState(null);
//   const [hourly, setHourly] = useState([]);
//   const [daily, setDaily] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [locationFetched, setLocationFetched] = useState(false); // Tracks if real location was used

//   // ========== Manila Fallback Coordinates ==========
//   const fallbackCoords = {
//     latitude: 14.5995,
//     longitude: 120.9842,
//   };

//   // ========== Reusable Weather Fetch Function ==========
//   const fetchWeather = async (latitude, longitude, override = false) => {
//     try {
//       const res = await fetch(
//         `https://clouds-weather-gno6.onrender.com/api/weather?lat=${latitude}&lon=${longitude}`
//       );
//       const data = await res.json();

//       if (res.ok) {
//         setWeatherData(data);
//         setHourly(data.hourly || []);
//         setDaily(data.daily || []);
//         if (override) setLocationFetched(true); // Mark override only if real location
//       } else {
//         setError(data.error || "Something went wrong");
//       }
//     } catch {
//       setError("Network error or server is down");
//     } finally {
//       // Stop loading only after fallback or location override
//       if (!locationFetched || override) {
//         setTimeout(() => setLoading(false), 800); // Slight delay for smoother UX
//       }
//     }
//   };

//   // ========== Fetch Manila Immediately ==========
//   useEffect(() => {
//     fetchWeather(fallbackCoords.latitude, fallbackCoords.longitude);
//   }, []);

//   // ========== Try Geolocation in Background ==========
//   useEffect(() => {
//     if (!("geolocation" in navigator)) {
//       setError("Geolocation not supported, showing Manila weather");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         fetchWeather(latitude, longitude, true); // Override Manila
//       },
//       () => {
//         setError("Location access denied, showing Manila weather");
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   }, []);

//   // ========== Provide Context to Children ==========
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


// import React, { createContext, useState, useEffect } from "react";

// export const WeatherContext = createContext();

// export function WeatherProvider({ children }) {
//   const [weatherData, setWeatherData] = useState(null);
//   const [hourly, setHourly] = useState([]);
//   const [daily, setDaily] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [locationFetched, setLocationFetched] = useState(false);

//   const fallbackCoords = {
//     latitude: 14.5995,
//     longitude: 120.9842,
//   };

//   const fetchWeather = async (latitude, longitude, override = false) => {
//     try {
//       const res = await fetch(
//         `https://clouds-weather-gno6.onrender.com/api/weather?lat=${latitude}&lon=${longitude}`
//       );
//       const data = await res.json();

//       if (res.ok) {
//         setWeatherData(data);
//         setHourly(data.hourly || []);
//         setDaily(data.daily || []);
//         if (override) setLocationFetched(true);
//       } else {
//         setError(data.error || "Something went wrong");
//       }
//     } catch {
//       setError("Network error or server is down");
//     } finally {
//       if (!locationFetched || override) {
//         setTimeout(() => setLoading(false), 800);
//       }
//     }
//   };

//   //  Fetch Manila immediately
//   useEffect(() => {
//     fetchWeather(fallbackCoords.latitude, fallbackCoords.longitude);
//   }, []);

//   //  Try geolocation in background
//   useEffect(() => {
//     if (!("geolocation" in navigator)) {
//       setError("Geolocation not supported, showing Manila weather");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (pos) => {
//         const { latitude, longitude } = pos.coords;
//         fetchWeather(latitude, longitude, true);
//       },
//       () => {
//         setError("Location access denied. Please enable location to view your current weather.");
//       },
//       { enableHighAccuracy: true, timeout: 10000 }
//     );
//   }, []);

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


// import React, { createContext, useState, useEffect } from "react";

// export const WeatherContext = createContext();

// export function WeatherProvider({ children }) {
//   const [weatherData, setWeatherData] = useState(null);
//   const [hourly, setHourly] = useState([]);
//   const [daily, setDaily] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [locationFetched, setLocationFetched] = useState(false);

//   const fallbackCoords = {
//     latitude: 14.5995,
//     longitude: 120.9842,
//   };

//   const fetchWeather = async (latitude, longitude, isUserLocation = false) => {
//     try {
//       const res = await fetch(
//         `https://clouds-weather-gno6.onrender.com/api/weather?lat=${latitude}&lon=${longitude}`
//       );
//       const data = await res.json();

//       if (res.ok) {
//         setWeatherData(data);
//         setHourly(data.hourly || []);
//         setDaily(data.daily || []);
//         setLoading(false); // Stop loading immediately
//         if (isUserLocation) setLocationFetched(true);
//       } else {
//         setError(data.error || "Something went wrong");
//         setLoading(false);
//       }
//     } catch {
//       setError("Network error or server is down");
//       setLoading(false);
//     }
//   };

//   // Fetch fallback first, then try geolocation
//   useEffect(() => {
//     // Load Manila immediately
//     fetchWeather(fallbackCoords.latitude, fallbackCoords.longitude);

//     // Try user location in background
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           // Only update if different from Manila
//           if (Math.abs(latitude - fallbackCoords.latitude) > 0.1 || 
//               Math.abs(longitude - fallbackCoords.longitude) > 0.1) {
//             fetchWeather(latitude, longitude, true);
//           }
//         },
//         () => {
//           setError("Location access denied. Showing Manila weather.");
//         },
//         { enableHighAccuracy: true, timeout: 5000 }
//       );
//     }
//   }, []); // Empty dependency - run once only

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


// import React, { createContext, useState, useEffect } from "react";

// export const WeatherContext = createContext();

// export function WeatherProvider({ children }) {
//   const [weatherData, setWeatherData] = useState(null);
//   const [hourly, setHourly] = useState([]);
//   const [daily, setDaily] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [locationFetched, setLocationFetched] = useState(false);

//   const fallbackCoords = {
//     latitude: 14.5995,
//     longitude: 120.9842,
//   };

//   const fetchWeather = async (latitude, longitude, isUserLocation = false) => {
//     try {
//       const res = await fetch(
//         `https://clouds-weather-gno6.onrender.com/api/weather?lat=${latitude}&lon=${longitude}`
//       );
//       const data = await res.json();

//       if (res.ok) {
//         setWeatherData(data);
//         setHourly(data.hourly || []);
//         setDaily(data.daily || []);
//         setLoading(false);
//         if (isUserLocation) setLocationFetched(true);
//       } else {
//         setError(data.error || "Something went wrong");
//         setLoading(false);
//       }
//     } catch {
//       setError("Network error or server is down");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // Load Manila immediately
//     fetchWeather(fallbackCoords.latitude, fallbackCoords.longitude);

//     // Try user location in background
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const { latitude, longitude } = pos.coords;
//           // Only update if different from Manila
//           if (Math.abs(latitude - fallbackCoords.latitude) > 0.1 || 
//               Math.abs(longitude - fallbackCoords.longitude) > 0.1) {
//             fetchWeather(latitude, longitude, true);
//           }
//         },
//         () => {
//           setError("Location access denied. Showing Manila weather.");
//         },
//         { enableHighAccuracy: true, timeout: 5000 }
//       );
//     }
//   }, []);

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
