"use client";

import React, { useState, useEffect } from "react";
import analysisData from "@/data/enrollment_analysis.json";

interface ProgramMeta {
  key: string;
  label: string;
  color: string;
}

const PROGRAMS: ProgramMeta[] = [
  { key: "BS_CS", label: "BSCS", color: "#1DB954" },
  { key: "BS_ChE", label: "BSChE", color: "#3E434D" },
  { key: "BS_IE", label: "BSIE", color: "#22252B" },
  { key: "BS_ME", label: "BSME", color: "#666B75" },
  { key: "BS_ECE", label: "BSECE", color: "#B3B3B3" },
];

export function HeatMapView() {
  const [viewMode, setViewMode] = useState<"correlation" | "figmaTemplate">("correlation");
  const [hoveredCell, setHoveredCell] = useState<{ row: string; col: string; val: number } | null>(null);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(false);
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 40);
    return () => clearTimeout(timer);
  }, [viewMode]);

  const corrPrograms = analysisData.correlation_matrix.programs;
  const corrValues = analysisData.correlation_matrix.values;

  // Figma template placeholder values for visual fidelity parity
  const figmaTemplateData = [
    { row: "BSCS", color: "#1DB954", cols: [28.0, 28.6, 82.0, 91.3, 76.2, 1.2] },
    { row: "BSChE", color: "#3E434D", cols: [34.8, 12.5, 86.6, 58.7, 71.5, 11.0] },
    { row: "BSIE", color: "#22252B", cols: [97.7, 68.3, 65.0, 77.8, 63.2, 52.9] },
    { row: "BSME", color: "#666B75", cols: [80.0, 75.0, 85.0, 90.0, 82.0, 70.0] },
    { row: "BSECE", color: "#B3B3B3", cols: [60.0, 65.0, 70.0, 75.0, 80.0, 85.0] },
  ];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  // Helper for background color intensity on correlation (-1 to +1)
  const getCorrelationColor = (val: number, isBSCS: boolean) => {
    if (val >= 0.95) return "#1DB954"; // Perfect match
    if (val >= 0.70) return "#158c3f"; // Strong positive correlation in Spotify green
    if (val >= 0.40) return "#474b54"; // Moderate positive
    if (val >= 0.10) return "#2c2f36"; // Weak positive
    if (val >= -0.10) return "#1e2025"; // Near zero
    return "#17181c"; // Negative correlation
  };

  const getTemplateCellColor = (rowIdx: number, val: number) => {
    if (rowIdx === 0) {
      // BSCS row in green shades matching Figma
      if (val > 80) return "#1DB954";
      if (val > 60) return "#189443";
      if (val > 25) return "#115e2b";
      return "#0a3619";
    }
    // Other rows in gray shades matching Figma
    if (val > 85) return "#A0A4AC";
    if (val > 70) return "#757A84";
    if (val > 50) return "#555A63";
    if (val > 25) return "#343840";
    return "#222429";
  };

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Top Header matching Figma */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-medium text-white">Heat Map</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#888888] font-mono mr-2 hidden sm:inline">
            {viewMode === "correlation" ? "11-Year Correlation Matrix" : "Figma Demo Grid"}
          </span>
          <button
            type="button"
            onClick={() => setViewMode(viewMode === "correlation" ? "figmaTemplate" : "correlation")}
            className="text-xs px-2.5 py-1 rounded bg-[#16181F] border border-white/10 hover:border-[#1DB954] text-[#CCCCCC] transition-colors"
          >
            Switch to {viewMode === "correlation" ? "Template View" : "Correlation Matrix"}
          </button>
        </div>
      </div>

      {/* Matrix Grid */}
      <div className="w-full overflow-x-auto py-2">
        {viewMode === "correlation" ? (
          /* Pearson Correlation Matrix */
          <div className="min-w-[500px] w-full flex flex-col gap-1.5">
            {/* Header Columns */}
            <div className="grid grid-cols-6 gap-1.5 items-center text-xs font-mono text-[#888888] text-center mb-1">
              <span className="text-left pl-3 text-[#666666]">Prog / Prog</span>
              {corrPrograms.map((p) => (
                <span key={p} className="font-semibold text-[#CCCCCC]">
                  {p}
                </span>
              ))}
            </div>

            {/* Matrix Rows */}
            {PROGRAMS.map((prog, rIdx) => (
              <div key={prog.key} className="grid grid-cols-6 gap-1.5 items-center">
                {/* Row label */}
                <div className="flex items-center gap-2 pl-2 text-xs font-mono text-[#CCCCCC]">
                  <span
                    className="w-2.5 h-2.5 rounded-xs shrink-0"
                    style={{ backgroundColor: prog.color }}
                  />
                  <span>{prog.label}</span>
                </div>

                {/* Cells with ripple animation */}
                {corrPrograms.map((colProg, cIdx) => {
                  const val = corrValues[rIdx][cIdx];
                  const isHovered =
                    hoveredCell?.row === prog.label && hoveredCell?.col === colProg;
                  const bg = getCorrelationColor(val, prog.key === "BS_CS");

                  return (
                    <div
                      key={colProg}
                      style={{
                        backgroundColor: bg,
                        opacity: isAnimated ? 1 : 0,
                        transform: isAnimated
                          ? isHovered
                            ? "scale(1.05)"
                            : "scale(1)"
                          : "scale(0.8)",
                        transition: `opacity 0.4s ease ${(rIdx * 5 + cIdx) * 25}ms, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${(rIdx * 5 + cIdx) * 25}ms`,
                      }}
                      onMouseEnter={() =>
                        setHoveredCell({ row: prog.label, col: colProg, val })
                      }
                      onMouseLeave={() => setHoveredCell(null)}
                      className={`h-11 rounded-sm flex items-center justify-center font-mono text-xs sm:text-sm font-semibold cursor-pointer ${
                        val >= 0.70 ? "text-white" : "text-[#E0E0E0]"
                      } ${isHovered ? "ring-2 ring-white z-10" : ""}`}
                    >
                      {val > 0 ? `+${val.toFixed(2)}` : val.toFixed(2)}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        ) : (
          /* Figma Mockup Template View (Jan - Jun) */
          <div className="min-w-[500px] w-full flex flex-col gap-1.5">
            {figmaTemplateData.map((row, rIdx) => (
              <div key={row.row} className="grid grid-cols-7 gap-1.5 items-center">
                <div className="flex items-center gap-2 pl-2 text-xs font-mono text-[#CCCCCC]">
                  <span
                    className="w-2.5 h-2.5 rounded-xs shrink-0"
                    style={{ backgroundColor: row.color }}
                  />
                  <span>{row.row}</span>
                </div>
                {row.cols.map((val, cIdx) => (
                  <div
                    key={cIdx}
                    style={{
                      backgroundColor: getTemplateCellColor(rIdx, val),
                      opacity: isAnimated ? 1 : 0,
                      transform: isAnimated ? "scale(1)" : "scale(0.8)",
                      transition: `opacity 0.4s ease ${(rIdx * 6 + cIdx) * 20}ms, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${(rIdx * 6 + cIdx) * 20}ms`,
                    }}
                    className="h-11 rounded-sm flex items-center justify-center font-mono text-xs sm:text-sm font-semibold text-white/90"
                  >
                    {val}
                  </div>
                ))}
              </div>
            ))}
            {/* Column Months */}
            <div className="grid grid-cols-7 gap-1.5 text-xs font-mono text-[#888888] text-center mt-2">
              <span />
              {months.map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Intensity Legend matching Figma */}
      <div className="w-full flex items-center justify-center gap-3 pt-4 border-t border-white/5 text-xs font-mono text-[#888888]">
        <span>Value intensity</span>
        <span>{viewMode === "correlation" ? "-1.0" : "0"}</span>
        <div className="flex items-center gap-1">
          <span className="w-3.5 h-2.5 rounded-xs bg-[#17181c]" />
          <span className="w-3.5 h-2.5 rounded-xs bg-[#2c2f36]" />
          <span className="w-3.5 h-2.5 rounded-xs bg-[#474b54]" />
          <span className="w-3.5 h-2.5 rounded-xs bg-[#158c3f]" />
          <span className="w-3.5 h-2.5 rounded-xs bg-[#1DB954]" />
        </div>
        <span>{viewMode === "correlation" ? "+1.0" : "100"}</span>
        <span className="text-[#CCCCCC] ml-2">· BSCS in green</span>
      </div>
    </div>
  );
}
