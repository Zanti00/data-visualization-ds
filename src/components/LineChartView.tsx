"use client";

import React, { useState, useEffect } from "react";
import analysisData from "@/data/enrollment_analysis.json";

interface LineSeriesConfig {
  key: string;
  label: string;
  color: string;
}

const SERIES_CONFIG: LineSeriesConfig[] = [
  { key: "BS_CS", label: "BSCS", color: "#1DB954" },
  { key: "BS_ChE", label: "BSChE", color: "#3E434D" },
  { key: "BS_IE", label: "BSIE", color: "#22252B" },
  { key: "BS_ME", label: "BSME", color: "#666B75" },
  { key: "BS_ECE", label: "BSECE", color: "#B3B3B3" },
];

export function LineChartView() {
  const [hoveredYear, setHoveredYear] = useState<number | null>(2024);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(false);
    const timer = setTimeout(() => {
      setIsAnimated(true);
    }, 40);
    return () => clearTimeout(timer);
  }, []);

  const yearlyData = analysisData.yearly_data;

  // Real dataset bounds
  const minVal = 300;
  const maxVal = 650;
  const years = yearlyData.map((d) => d.Year);

  // SVG dimensions
  const svgWidth = 840;
  const svgHeight = 260;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const getX = (year: number) => {
    const index = years.indexOf(year);
    const usableWidth = svgWidth - paddingLeft - paddingRight;
    return paddingLeft + (index / (years.length - 1)) * usableWidth;
  };

  const getY = (val: number) => {
    const usableHeight = svgHeight - paddingTop - paddingBottom;
    const ratio = (val - minVal) / (maxVal - minVal);
    return svgHeight - paddingBottom - ratio * usableHeight;
  };

  const hoveredData = hoveredYear
    ? yearlyData.find((d) => d.Year === hoveredYear)
    : null;

  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* Top Chart Header matching Figma */}
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-sm font-medium text-white">Line Chart</h2>
        <span className="text-xs text-[#888888] font-mono">
          2016 – 2026 · Yearly trend
        </span>
      </div>

      {/* SVG Line Chart Canvas */}
      <div className="relative w-full h-[280px] sm:h-[310px] flex items-center justify-center">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-full select-none"
        >
          {/* Y-axis grid lines and labels */}
          {[600, 500, 400, 300].map((tick) => {
            const yPos = getY(tick);
            return (
              <g key={tick}>
                <text
                  x={paddingLeft - 10}
                  y={yPos + 4}
                  textAnchor="end"
                  className="fill-[#666666] text-[10px] font-mono"
                >
                  {tick}
                </text>
                <line
                  x1={paddingLeft}
                  y1={yPos}
                  x2={svgWidth - paddingRight}
                  y2={yPos}
                  stroke="rgba(255, 255, 255, 0.07)"
                  strokeDasharray="4 4"
                />
              </g>
            );
          })}

          {/* Vertical grid lines for each year */}
          {years.map((year) => {
            const xPos = getX(year);
            const isHovered = hoveredYear === year;
            return (
              <g key={year}>
                <line
                  x1={xPos}
                  y1={paddingTop}
                  x2={xPos}
                  y2={svgHeight - paddingBottom}
                  stroke={
                    isHovered
                      ? "rgba(29, 185, 84, 0.35)"
                      : "rgba(255, 255, 255, 0.04)"
                  }
                  strokeDasharray="3 3"
                />
                <text
                  x={xPos}
                  y={svgHeight - 10}
                  textAnchor="middle"
                  className={`text-[10px] font-mono transition-colors ${
                    isHovered
                      ? "fill-[#1DB954] font-bold"
                      : "fill-[#888888]"
                  }`}
                >
                  {year}
                </text>
              </g>
            );
          })}

          {/* Path lines with progressive draw animation */}
          {SERIES_CONFIG.map((series, sIdx) => {
            const pathData = yearlyData
              .map((d, i) => `${i === 0 ? "M" : "L"} ${getX(d.Year)} ${getY((d as any)[series.key])}`)
              .join(" ");

            return (
              <g key={series.key}>
                <path
                  d={pathData}
                  fill="none"
                  stroke={series.color}
                  strokeWidth={series.key === "BS_CS" ? "2.5" : "1.8"}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray={2000}
                  strokeDashoffset={isAnimated ? 0 : 2000}
                  style={{
                    transition: `stroke-dashoffset 1.3s cubic-bezier(0.16, 1, 0.3, 1) ${sIdx * 100}ms`,
                  }}
                />
                {/* Node dots with pop-in animation */}
                {yearlyData.map((d, dIdx) => {
                  const val = (d as any)[series.key];
                  const cx = getX(d.Year);
                  const cy = getY(val);
                  const isHovered = hoveredYear === d.Year;

                  return (
                    <circle
                      key={`${series.key}-${d.Year}`}
                      cx={cx}
                      cy={cy}
                      r={isHovered ? (series.key === "BS_CS" ? 4.5 : 3.5) : 2.5}
                      fill={series.color}
                      stroke="#0B0C0E"
                      strokeWidth="1.5"
                      style={{
                        opacity: isAnimated ? 1 : 0,
                        transform: isAnimated ? "scale(1)" : "scale(0)",
                        transformOrigin: `${cx}px ${cy}px`,
                        transition: `opacity 0.3s ease ${600 + dIdx * 40}ms, transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${600 + dIdx * 40}ms`,
                      }}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* Interactive touch/hover overlay rectangles */}
          {years.map((year, i) => {
            const x = getX(year);
            const prevX = i > 0 ? getX(years[i - 1]) : paddingLeft;
            const nextX =
              i < years.length - 1 ? getX(years[i + 1]) : svgWidth - paddingRight;
            const colWidth = (nextX - prevX) / 2;

            return (
              <rect
                key={year}
                x={x - colWidth / 2}
                y={paddingTop}
                width={colWidth}
                height={svgHeight - paddingTop - paddingBottom}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredYear(year)}
              />
            );
          })}
        </svg>

        {/* Hover Tooltip Overlay */}
        {hoveredData && (
          <div className="absolute top-2 right-4 bg-[#14171E] border border-white/10 rounded px-3 py-2 shadow-2xl text-xs z-20 pointer-events-none">
            <div className="font-bold text-white mb-1">
              Year {hoveredData.Year}{" "}
              <span className="font-normal text-[#888888]">
                (Total: {hoveredData.Total.toLocaleString()})
              </span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-0.5 font-mono text-[11px]">
              <span className="text-[#1DB954]">BSCS: {hoveredData.BS_CS}</span>
              <span className="text-[#B3B3B3]">BSECE: {hoveredData.BS_ECE}</span>
              <span className="text-[#888888]">BSChE: {hoveredData.BS_ChE}</span>
              <span className="text-[#888888]">BSIE: {hoveredData.BS_IE}</span>
              <span className="text-[#888888]">BSME: {hoveredData.BS_ME}</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Legend strictly matching Figma */}
      <div className="w-full flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-5 border-t border-white/5 text-xs font-mono">
        {SERIES_CONFIG.map((prog) => (
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
