"use client";

import React from "react";

interface ChartContainerProps {
  title: string;
  description: string;
  children: React.ReactNode;
  headerRight?: React.ReactNode;
}

export function ChartContainer({
  title,
  description,
  children,
  headerRight,
}: ChartContainerProps) {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-center">
      {/* Header section matching Dashboard bold styling */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="max-w-4xl">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1DB954] tracking-tight leading-snug mb-2">
            {title}
          </h1>
          <p className="text-sm sm:text-base italic text-[#CCCCCC] font-normal leading-relaxed">
            {description}
          </p>
        </div>
        {headerRight && <div className="shrink-0">{headerRight}</div>}
      </div>

      {/* Main bordered container strictly following Figma */}
      <section
        aria-label={title}
        className="w-full min-h-[460px] border border-[#1DB954] rounded-sm bg-[#0A0B0E]/95 p-4 sm:p-7 relative flex flex-col justify-between shadow-2xl backdrop-blur-sm"
      >
        {children}
      </section>
    </div>
  );
}
