import React from "react";

export function AppLogo({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div
      className={`relative rounded-full overflow-hidden shrink-0 flex items-center justify-center ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo.png"
        alt="Data Science - Data Visualization Logo"
        className="w-full h-full object-contain select-none pointer-events-none"
      />
    </div>
  );
}

// Retain alias for seamless backwards compatibility
export { AppLogo as SpotifyLogo };
