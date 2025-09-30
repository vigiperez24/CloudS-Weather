const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// ✅ CORS setup
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ✅ Dew Point Calculator
function getDewPoint(tempC, humidity) {
  const a = 17.27;
  const b = 237.7;
  const alpha = (a * tempC) / (b + tempC) + Math.log(humidity / 100);
  return parseFloat(((b * alpha) / (a - alpha)).toFixed(1));
}

// ✅ Format helpers
function formatHour(timeStr) {
  return new Date(timeStr).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

// ✅ Updated daily formatter (split weekday, month, day)
function formatDaily(dateStr, dayData) {
  const dateObj = new Date(dateStr);

  const weekday = dateObj.toLocaleDateString("en-US", { weekday: "short" }); // e.g. Mon
  const month = dateObj.toLocaleDateString("en-US", { month: "short" }); // e.g. Sep
  const day = String(dateObj.getDate()).padStart(2, "0"); // e.g. 29

  return {
    weekday, // "Mon"
    month, // "Sep"
    day, // "29"
    high: dayData.maxtemp_c,
    low: dayData.mintemp_c,
    condition: dayData.condition.text,
    icon: dayData.condition.icon,
  };
}
// Wind Direction
function expandWindDirection(dir) {
  const windMap = {
    N: "North",
    NNE: "North-Northeast",
    NE: "Northeast",
    ENE: "East-Northeast",
    E: "East",
    ESE: "East-Southeast",
    SE: "Southeast",
    SSE: "South-Southeast",
    S: "South",
    SSW: "South-Southwest",
    SW: "Southwest",
    WSW: "West-Southwest",
    W: "West",
    WNW: "West-Northwest",
    NW: "Northwest",
    NNW: "North-Northwest",
  };
  return windMap[dir] || dir || "Unknown";
}

// Format Time
function formatLocalTime(localTimeStr) {
  const date = new Date(localTimeStr);

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }); // "12:14 PM"
  return `${timePart}`;
}

// Wind Direction
// function expandWindDirection(dir) {
//   const map = {
//     N: "North",
//     NNE: "North-Northeast",
//     NE: "Northeast",
//     ENE: "East-Northeast",
//     E: "East",
//     ESE: "East-Southeast",
//     SE: "Southeast",
//     SSE: "South-Southeast",
//     S: "South",
//     SSW: "South-Southwest",
//     SW: "Southwest",
//     WSW: "West-Southwest",
//     : "West",
//     WNW: "West-Northwest",
//     NW: "Northwest",
//     NNW: "North-Northwest",
//   };
//   return map[dir] || dir || "Unknown";
// }

// ✅ Weather by city
app.get("/api/weather/:city", async (req, res) => {
  try {
    const { city } = req.params;

    const response = await axios.get(
      "http://api.weatherapi.com/v1/forecast.json",
      {
        params: { key: process.env.API_KEY, q: city, days: 15, aqi: "yes" },
      }
    );

    const data = response.data;
    const current = data.current;
    const forecastDay = data.forecast.forecastday[0];

    const hourly = forecastDay.hour.map((hour) => ({
      time: formatHour(hour.time),
      temperature: hour.temp_c,
      condition: hour.condition.text,
      icon: hour.condition.icon,
    }));

    const daily = data.forecast.forecastday.map((day) =>
      formatDaily(day.date, day.day)
    );

    res.json({
      location: data.location.name,
      localTime: formatLocalTime(data.location.localtime),

      country: data.location.country,
      temperature: current.temp_c,
      condition: current.condition.text,
      humidity: current.humidity,
      dewPoint: getDewPoint(current.temp_c, current.humidity),
      icon: current.condition.icon,
      precipitation: current.precip_mm,
      forecastPrecipitation: forecastDay.day.totalprecip_mm,
      visibility: current.vis_km,
      pressure: current.pressure_mb,
      uvIndex: current.uv,
      sunrise: forecastDay.astro.sunrise,
      sunset: forecastDay.astro.sunset,
      realFeelShade: current.feelslike_c,

      windSpeed: current.wind_kph,
      windGusts: current.gust_kph,
      airQuality: current.air_quality?.us_epa_index || "N/A",
      realFeel: current.feelslike_c,
      cloudCover: current.cloud,
      windDirection: current.wind_dir,
      windDirectionFull: expandWindDirection(current.wind_dir),
      hourly,
      daily,
    });
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    console.error("Full error:", error.response?.data || error.message);
    res.status(400).json({
      error:
        "City not found. Try checking your spelling or using a nearby city.",
    });
  }
});

// ✅ Weather by LAT/LON
app.get("/api/weather", async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing lat or lon query params." });
  }

  try {
    const response = await axios.get(
      "http://api.weatherapi.com/v1/forecast.json",
      {
        params: {
          key: process.env.API_KEY,
          q: `${lat},${lon}`,
          days: 15,
          aqi: "yes",
        },
      }
    );

    const data = response.data;
    const current = data.current;
    const forecastDay = data.forecast.forecastday[0];

    const hourly = forecastDay.hour.map((hour) => ({
      time: formatHour(hour.time),
      temperature: hour.temp_c,
      condition: hour.condition.text,
      icon: hour.condition.icon,
    }));

    const daily = data.forecast.forecastday.map((day) =>
      formatDaily(day.date, day.day)
    );

    res.json({
      location: data.location.name,
      localTime: formatLocalTime(data.location.localtime),
      country: data.location.country,
      temperature: current.temp_c,
      condition: current.condition.text,
      humidity: current.humidity,
      dewPoint: getDewPoint(current.temp_c, current.humidity),
      icon: current.condition.icon,
      precipitation: current.precip_mm,
      forecastPrecipitation: forecastDay.day.totalprecip_mm,
      visibility: current.vis_km,
      pressure: current.pressure_mb,
      uvIndex: current.uv,
      sunrise: forecastDay.astro.sunrise,
      sunset: forecastDay.astro.sunset,
      realFeelShade: current.feelslike_c,
      windSpeed: current.wind_kph,
      windGusts: current.gust_kph,
      airQuality: current.air_quality?.us_epa_index || "N/A",
      realFeel: current.feelslike_c,
      cloudCover: current.cloud,
      windDirection: current.wind_dir,
      windDirectionFull: expandWindDirection(current.wind_dir),

      hourly,
      daily,
    });
  } catch (error) {
    console.error("Error fetching weather by coordinates:", error.message);
    console.error("Full error:", error.response?.data || error.message);
    res.status(400).json({
      error: "Location not found or WeatherAPI request failed.",
    });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});
