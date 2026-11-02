import React from "react";
import { AppLogo } from "./SpotifyLogo";

export function Footer() {
  return (
    <footer className="w-full max-w-6xl mx-auto flex items-center justify-between pt-6 pb-10 text-xs font-mono">
      <div className="text-[#666666]">
        UP Diliman • Data Science Laboratory
      </div>
      <div className="flex items-center gap-2 select-none">
        <AppLogo className="w-4 h-4" />
        <span className="text-[#1DB954] font-bold text-sm tracking-tight">
          Data Science - Data Visualization
        </span>
      </div>
    </footer>
  );
}
