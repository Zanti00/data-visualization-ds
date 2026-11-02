"use client";

import React, { useState, useEffect } from "react";
import analysisData from "@/data/enrollment_analysis.json";

interface SliceData {
  program: string;
  label: string;
  name: string;
  count: number;
  share_pct: number;
  color: string;
}

const PIE_SLICES: SliceData[] = [
  { program: "BS_CS", label: "BSCS", name: "BS Computer Science", count: 538, share_pct: 23.5, color: "#1DB954" },
  { program: "BS_ChE", label: "BSChE", name: "BS Chemical Engineering", count: 447, share_pct: 19.5, color: "#3E434D" },
  { program: "BS_IE", label: "BSIE", name: "BS Industrial Engineering", count: 479, share_pct: 20.9, color: "#22252B" },
  { program: "BS_ME", label: "BSME", name: "BS Mechanical Engineering", count: 319, share_pct: 13.9, color: "#666B75" },
  { program: "BS_ECE", label: "BSECE", name: "BS Electronics Engineering", count: 504, share_pct: 22.0, color: "#B3B3B3" },
];

export function PieChartView() {
  const [hoveredSlice, setHoveredSlice] = useState<string | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(false);
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 40);
    return () => clearTimeout(timer);
  }, []);

  const total = 2287;
  const radius = 105;
  const centerX = 130;
  const centerY = 130;

  // Compute SVG arc paths
  let currentAngle = -90; // Start at 12 o'clock

  const slicesWithAngles = PIE_SLICES.map((slice) => {
    const angleSpan = (slice.count / total) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angleSpan;
    currentAngle = endAngle;

    // Convert polar coordinates to cartesian
    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const largeArcFlag = angleSpan > 180 ? 1 : 0;

    const pathData = `
      M ${centerX} ${centerY}
      L ${x1} ${y1}
      A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}
      Z
    `;

    return {
      ...slice,
      pathData,
      startAngle,
      endAngle,
    };
  });

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Top Header matching Figma */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-sm font-medium text-white">Pie Chart</h2>
        <span className="text-xs text-[#888888] font-mono">
          2026 · Share of total
        </span>
      </div>

      {/* Main 2-Column Content Area */}
      <div className="w-full flex-1 flex flex-col md:flex-row items-center justify-between gap-6 py-2 px-2 sm:px-6">
        {/* Left Column: Pie Graphic with expand animation */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative w-[260px] h-[260px]">
            <svg
              viewBox="0 0 260 260"
              className="w-full h-full select-none"
            >
              {slicesWithAngles.map((slice, idx) => {
                const isHovered = hoveredSlice === slice.label;
                return (
                  <path
                    key={slice.label}
                    d={slice.pathData}
                    fill={slice.color}
                    stroke="#0B0C0E"
                    strokeWidth="2.5"
                    style={{
                      opacity: isAnimated ? 1 : 0,
                      transform: isAnimated
                        ? isHovered
                          ? "scale(1.05)"
                          : "scale(1)"
                        : "scale(0.15)",
                      transformOrigin: `${centerX}px ${centerY}px`,
                      transition: `opacity 0.5s ease ${idx * 80}ms, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 80}ms`,
                    }}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredSlice(slice.label)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  />
                );
              })}
            </svg>
          </div>
          <span className="text-[11px] font-mono text-[#777777] mt-1">
            2026 UP Diliman Student Share
          </span>
        </div>

        {/* Right Column: Breakdown Table matching Figma with slide-in animation */}
        <div className="w-full max-w-md flex flex-col justify-center">
          <div className="w-full">
            <div className="grid grid-cols-3 text-xs text-[#888888] font-mono pb-2 border-b border-white/5">
              <span>Series</span>
              <span className="text-right">2026 total</span>
              <span className="text-right">Share</span>
            </div>

            <div className="divide-y divide-white/5">
              {PIE_SLICES.map((slice, idx) => {
                const isHovered = hoveredSlice === slice.label;
                return (
                  <div
                    key={slice.label}
                    style={{
                      opacity: isAnimated ? 1 : 0,
                      transform: isAnimated ? "translateX(0)" : "translateX(20px)",
                      transition: `opacity 0.45s ease ${150 + idx * 70}ms, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${150 + idx * 70}ms`,
                    }}
                    className={`grid grid-cols-3 items-center py-2.5 text-xs font-mono transition-colors rounded px-1 cursor-pointer ${
                      isHovered ? "bg-white/5" : ""
                    }`}
                    onMouseEnter={() => setHoveredSlice(slice.label)}
                    onMouseLeave={() => setHoveredSlice(null)}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-xs shrink-0"
                        style={{
                          backgroundColor: slice.color,
                          border: "1px solid rgba(255, 255, 255, 0.15)",
                        }}
                      />
                      <span className="text-[#E0E0E0]">{slice.label}</span>
                    </div>
                    <span className="text-right text-[#CCCCCC]">
                      {slice.count.toLocaleString()}
                    </span>
                    <span
                      className={`text-right font-semibold ${
                        slice.program === "BS_CS"
                          ? "text-[#1DB954]"
                          : "text-[#B3B3B3]"
                      }`}
                    >
                      {slice.share_pct.toFixed(1)}%
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Total Row */}
            <div
              style={{
                opacity: isAnimated ? 1 : 0,
                transition: "opacity 0.5s ease 550ms",
              }}
              className="grid grid-cols-3 items-center pt-3 mt-1 border-t border-white/10 text-xs font-mono font-bold"
            >
              <span className="text-white">All series</span>
              <span className="text-right text-white">
                {total.toLocaleString()}
              </span>
              <span className="text-right text-white">100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legend */}
      <div className="w-full flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-5 border-t border-white/5 text-xs font-mono">
        {PIE_SLICES.map((prog) => (
          <div key={prog.label} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-xs shrink-0"
              style={{
                backgroundColor: prog.color,
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}
            />
            <span className="text-[#CCCCCC]">{prog.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
