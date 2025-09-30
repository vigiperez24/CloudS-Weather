import React from "react";
import errorImg from "../../assets/NotFoundImg/notFound.svg";

// ========== ErrorMsg Component ==========
// Displays a friendly error message with image and helpful tip.
// Used when weather data fails to load or search returns no results.
function ErrorMsg({ errorMessage }) {
  return (
    <div className="w-full bg-[var(--color-secondary)] rounded-md shadow-md p-8 flex flex-col items-center justify-center min-h-[500px] gap-6">
      
      {/* ========== Error Icon/Image Section ========== */}
      {/* Visual cue to indicate something went wrong */}
      <div className="flex flex-col items-center gap-4">
        <img
          className="max-w-xs w-full h-auto opacity-80"
          src={errorImg}
          alt="Error"
        />

        {/* ========== Error Message Section ========== */}
        {/* Displays main error title and dynamic error message */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[var(--color-text)]">
            Oops! Something went wrong
          </h2>
          <p className="text-[var(--color-secondary-text)] text-lg">
            {errorMessage}
          </p>
        </div>
      </div>

      {/* ========== Helpful Tip Section ========== */}
      {/* Suggests user action to recover from error */}
      <div className="bg-[var(--color-card-hover)] p-4 rounded-md max-w-md">
        <p className="text-[var(--color-text)] text-sm text-center">
          <span className="font-semibold">Tip:</span> Try checking your spelling
          or search for a different location
        </p>
      </div>
    </div>
  );
}

export default ErrorMsg;
