import React, { createContext, useContext, useEffect, useState } from "react";

// ========== Create Theme Context ==========
// Provides global access to theme state (light/dark) across the app.
const ThemeContext = createContext();

// ========== Theme Provider Component ==========
// Wraps app with theme context and handles theme persistence + toggling.
export const ThemeProvider = ({ children }) => {
  // ========== State Initialization ==========
  // Reads saved theme from localStorage on first load.
  // Defaults to "light" if no value is stored.
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem("theme");
    return stored === "dark" ? "dark" : "light";
  });

  // ========== Side Effect: Apply Theme ==========
  // Updates <html> attribute and saves theme to localStorage whenever it changes.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // ========== Toggle Function ==========
  // Switches between light and dark themes.
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // ========== Provide Context to Children ==========
  // Makes theme state and toggle function available to all nested components.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// ========== Custom Hook ==========
/**
 * Allows components to easily access theme context.
 * Usage: const { theme, toggleTheme } = useTheme();
 */
export const useTheme = () => useContext(ThemeContext);
