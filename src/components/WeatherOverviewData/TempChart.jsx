import React from "react";
import {
  WiDaySunny,
  WiCloudy,
  WiRaindrops,
  WiThunderstorm,
  WiRain,
} from "weather-icons-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// ========== Weather Icon Utility ==========
// Returns appropriate weather icon based on condition string.
// Used inside tooltip to visually represent weather per hour.
function getWeatherIcon(condition) {
  const lower = condition.toLowerCase();
  if (lower.includes("rain")) return <WiRaindrops size={40} color="#00bfff" />;
  if (lower.includes("sun") || lower.includes("clear"))
    return <WiDaySunny size={40} color="orange" />;
  if (lower.includes("cloud")) return <WiCloudy size={40} color="#ffffff" />;
  if (lower.includes("thunder"))
    return <WiThunderstorm size={40} color="#ff4c4c" />;
  if (lower.includes("snow")) return <WiShowers size={40} color="blue" />;
  return <WiRaindrops size={40} color="#00bfff" />;
}

// ========== TempChart Component ==========
// Displays a responsive line chart of hourly temperature data.
// Includes custom tooltip with weather icon and condition.
const TempChart = ({ hourly }) => {
  return (
    <div
      style={{
        width: "100%",
        height: 200,
        backgroundColor: "transparent",
        borderRadius: "12px",
        padding: "1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ResponsiveContainer>
        <LineChart data={hourly}>
          {/* ========== Grid Background ========== */}
          <CartesianGrid stroke="var(--color-text)" strokeDasharray="3 3" />

          {/* ========== X Axis (Time) ========== */}
          <XAxis
            fontSize={10}
            dataKey="time"
            stroke="var(--color-text)"
            tick={{ fontSize: 10 }}
          />

          {/* ========== Y Axis (Temperature) ========== */}
          <YAxis
            fontSize={10}
            width={15}
            stroke="var(--color-text)"
            domain={[22, 34]} // Customize based on expected temp range
          />

          {/* ========== Tooltip ========== */}
          {/* Shows time, temperature, condition, and icon on hover */}
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const index = hourly.findIndex((item) => item.time === label);
                const condition = hourly[index]?.condition;
                const icon = getWeatherIcon(condition);

                return (
                  <div
                    style={{
                      backgroundColor: "#1c2333",
                      padding: "8px",
                      borderRadius: "6px",
                      color: "#fff",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {icon}
                    <div>
                      <p>{label}</p>
                      <p>{payload[0].value}°C</p>
                      <p>{condition}</p>
                    </div>
                  </div>
                );
              }
              return null;
            }}
            contentStyle={{
              backgroundColor: "#1c2333",
              border: "none",
              color: "#fff",
            }}
            labelStyle={{ color: "var(--color-text)" }}
          />

          {/* ========== Line Graph ========== */}
          {/* Plots temperature data with custom styling */}
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#00bfff"
            strokeWidth={3}
            dot={{ r: 4, stroke: "#00bfff", strokeWidth: 2, fill: "#0b0f1a" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TempChart;
