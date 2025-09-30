import React from "react";
import { Github } from "lucide-react";

// ========== Footer Component ==========
// Displays copyright, API attribution, and GitHub profile link.
// Adds credibility, branding, and external references to the dashboard.
function Footer() {
  return (
    <div className="--color-bg m-10">
      <div className="text-[var(--color-text)] space-y-2">
        {/* ========== Copyright Section ========== */}
        {/* Static year and project name for branding */}
        <div className=" text-sm ">
          <p>© 2025 Weather Dashboard. All rights reserved.</p>
        </div>

        {/* ========== API Attribution Section ========== */}
        {/* Credits WeatherAPI as the data source with link and description */}
        <div className=" text-sm text-center space-y-2">
          <p>
            Powered by{" "}
            <a
              href="https://www.weatherapi.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              WeatherAPI.com
            </a>
          </p>
          <p className="text-slate-500 text-xs">
            Real-time weather data and forecasts for locations worldwide
          </p>
        </div>

        {/* ========== GitHub Profile Link ========== */}
        {/* Personal branding and source code reference */}
        <div className="flex items-center gap-2 justify-center ">
          <a
            href="https://github.com/vigiperez24"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
          >
            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm">vigiperez24</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
