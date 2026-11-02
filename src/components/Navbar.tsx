"use client";

import React from "react";
import { SpotifyLogo } from "./SpotifyLogo";

export type TabType = "dashboard" | "dataset" | "bar" | "line" | "pie" | "heatmap";

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const navItems: { id: TabType; label: string }[] = [
  { id: "dashboard", label: "Dashboard" },
  { id: "dataset", label: "Dataset" },
  { id: "bar", label: "Bar Chart" },
  { id: "line", label: "Line Chart" },
  { id: "pie", label: "Pie Chart" },
  { id: "heatmap", label: "Heat Map" },
];

export function Navbar({ activeTab, onTabChange }: NavbarProps) {
  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 max-w-[95vw]">
      <nav
        aria-label="Main Navigation"
        className="flex items-center gap-3 sm:gap-6 px-4 sm:px-6 py-2.5 rounded-full bg-[#16181D]/90 border border-white/10 backdrop-blur-md shadow-2xl shadow-black/80 overflow-x-auto"
      >
        {/* Spotify Logo (Strictly the only icon) */}
        <button
          type="button"
          onClick={() => onTabChange("dashboard")}
          aria-label="Go to Dashboard"
          className="focus:outline-none focus:ring-2 focus:ring-[#1DB954] rounded-full transition-transform active:scale-95 shrink-0"
        >
          <SpotifyLogo className="w-6 h-6 sm:w-7 sm:h-7" />
        </button>

        {/* Tab links */}
        <div className="flex items-center gap-3 sm:gap-5 text-xs sm:text-sm font-medium whitespace-nowrap">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`transition-colors duration-150 relative py-1 focus:outline-none ${
                  isActive
                    ? "text-[#1DB954] font-semibold"
                    : "text-[#D1D5DB] hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
