"use client";

import React, { useState, useEffect } from "react";
import analysisData from "@/data/enrollment_analysis.json";

interface ProgramMeta {
  key: string;
  label: string;
  name: string;
  color: string;
}

const PROGRAM_CONFIG: ProgramMeta[] = [
  { key: "BS_CS", label: "BSCS", name: "BS Computer Science", color: "#1DB954" },
  { key: "BS_ChE", label: "BSChE", name: "BS Chemical Engineering", color: "#2B2E35" },
  { key: "BS_IE", label: "BSIE", name: "BS Industrial Engineering", color: "#16171B" },
  { key: "BS_ME", label: "BSME", name: "BS Mechanical Engineering", color: "#535353" },
  { key: "BS_ECE", label: "BSECE", name: "BS Electronics Engineering", color: "#9E9E9E" },
];

export function BarChartView() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mode, setMode] = useState<"snapshot2026" | "multiYear">("snapshot2026");
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Trigger the filling-up animation on mount or mode change
    setIsAnimated(false);
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 40);
    return () => clearTimeout(timer);
  }, [mode]);

  const data2026 = analysisData.data_2026.breakdown;
  const total2026 = analysisData.data_2026.total;
  const yearlyData = analysisData.yearly_data;

  // Selected sample years for grouped comparison
  const sampleYears = [2016, 2018, 2020, 2022, 2024, 2026];

  const maxVal = 620;

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Mode Switcher */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs text-[#888888] font-mono">
          Y-Axis: Enrolled Student Count (Scale 0 – 600)
        </span>
        <div className="flex items-center gap-2 bg-[#14161C] p-1 rounded border border-white/5 text-xs">
          <button
            type="button"
            onClick={() => setMode("snapshot2026")}
            className={`px-2.5 py-1 rounded transition-colors ${
              mode === "snapshot2026"
                ? "bg-[#1DB954] text-black font-semibold"
                : "text-[#A0A0A0] hover:text-white"
            }`}
          >
            2026 Snapshot
          </button>
          <button
            type="button"
            onClick={() => setMode("multiYear")}
            className={`px-2.5 py-1 rounded transition-colors ${
              mode === "multiYear"
                ? "bg-[#1DB954] text-black font-semibold"
                : "text-[#A0A0A0] hover:text-white"
            }`}
          >
            Yearly Grouped
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative w-full h-[280px] sm:h-[320px] pt-4 pb-2 px-2 sm:px-6">
        {/* Horizontal gridlines */}
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pl-8 pr-2">
          {[100, 80, 60, 40, 20, 0].map((level) => {
            const studentEquiv = Math.round((level / 100) * 600);
            return (
              <div key={level} className="w-full flex items-center gap-2">
                <span className="text-[11px] text-[#666666] font-mono w-7 text-right">
                  {studentEquiv}
                </span>
                <div className="w-full border-b border-white/5 border-dashed" />
              </div>
            );
          })}
        </div>

        {/* Chart Bars */}
        {mode === "snapshot2026" ? (
          <div className="relative w-full h-full flex items-end justify-around pl-10 pr-4 z-10">
            {PROGRAM_CONFIG.map((prog, idx) => {
              const item = data2026.find((d) => d.program === prog.key);
              const count = item ? item.count : 0;
              const share = item ? item.share_pct : 0;
              const heightPct = (count / maxVal) * 100;
              const isHovered = hoveredIndex === idx;

              return (
                <div
                  key={prog.key}
                  className="flex flex-col items-center flex-1 max-w-[80px] h-full justify-end group cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {/* Tooltip on hover */}
                  <div
                    className={`transition-opacity duration-150 mb-2 px-2.5 py-1 rounded bg-[#181B22] border border-white/10 text-center shadow-xl text-xs z-30 ${
                      isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="text-white font-bold">{count} students</div>
                    <div className="text-[#1DB954]">{share}% share</div>
                  </div>

                  {/* Value tag above bar with fade-in / slide-up */}
                  <span
                    style={{
                      opacity: isAnimated ? 1 : 0,
                      transform: isAnimated ? "translateY(0)" : "translateY(8px)",
                      transition: `opacity 0.5s ease ${200 + idx * 90}ms, transform 0.5s ease ${200 + idx * 90}ms`,
                    }}
                    className="text-xs font-mono font-bold text-white mb-1.5 transition-colors group-hover:text-[#1DB954]"
                  >
                    {count}
                  </span>

                  {/* The bar with filling-up animation */}
                  <div
                    style={{
                      height: isAnimated ? `${heightPct}%` : "0%",
                      backgroundColor: prog.color,
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      transition: `height 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 90}ms, transform 0.2s ease, filter 0.2s ease`,
                    }}
                    className={`w-full rounded-t-sm origin-bottom ${
                      isHovered ? "scale-y-[1.03] brightness-125" : ""
                    }`}
                  />

                  {/* Program label */}
                  <span className="mt-3 text-xs font-mono text-[#CCCCCC] group-hover:text-white">
                    {prog.label}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="relative w-full h-full flex items-end justify-around pl-10 pr-2 z-10">
            {sampleYears.map((year, yIdx) => {
              const yearRow = yearlyData.find((r) => r.Year === year);
              return (
                <div key={year} className="flex flex-col items-center flex-1 h-full justify-end px-1">
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    {PROGRAM_CONFIG.map((prog, pIdx) => {
                      const count = yearRow ? (yearRow as any)[prog.key] : 0;
                      const heightPct = (count / maxVal) * 100;
                      return (
                        <div
                          key={prog.key}
                          title={`${prog.label} (${year}): ${count}`}
                          style={{
                            height: isAnimated ? `${heightPct}%` : "0%",
                            backgroundColor: prog.color,
                            border: "1px solid rgba(255, 255, 255, 0.08)",
                            transition: `height 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${(yIdx * 5 + pIdx) * 20}ms`,
                          }}
                          className="w-2.5 sm:w-3.5 rounded-t-xs hover:brightness-125 origin-bottom"
                        />
                      );
                    })}
                  </div>
                  <span className="mt-3 text-[11px] sm:text-xs font-mono text-[#CCCCCC]">
                    {year}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Legend strictly matching Figma */}
      <div className="w-full flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-5 border-t border-white/5 text-xs font-mono">
        {PROGRAM_CONFIG.map((prog) => (
          <div key={prog.key} className="flex items-center gap-2">
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
