"use client";

import React from "react";
import { BarChartView } from "./BarChartView";
import { LineChartView } from "./LineChartView";
import { PieChartView } from "./PieChartView";
import { HeatMapView } from "./HeatMapView";
import analysisData from "@/data/enrollment_analysis.json";

export function DashboardView() {
  const data2026 = analysisData.data_2026;
  const interpretations = analysisData.interpretations;

  return (
    <div className="w-full flex flex-col gap-6 pb-8 min-w-0">
      {/* Executive Header - Clean without explanation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1DB954] tracking-tight">
            Data Science - Data Visualization
          </h1>
        </div>
        <div className="text-xs font-mono text-[#888888] shrink-0 text-left md:text-right">
          <div>UP Diliman • OUR Data (2016–2026)</div>
          <div className="text-[#1DB954] font-semibold mt-0.5">5 Degree Programs Monitored</div>
        </div>
      </div>

      {/* KPI Stat Cards (Spotify Themed) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#121418] border border-white/10 hover:border-[#1DB954] rounded-sm p-4 transition-colors">
          <div className="text-xs font-mono text-[#888888] uppercase tracking-wider mb-1">
            2026 Total Students
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {data2026.total.toLocaleString()}
          </div>
          <div className="text-xs font-mono text-[#1DB954] mt-1">
            Across 5 Programs
          </div>
        </div>

        <div className="bg-[#121418] border border-white/10 hover:border-[#1DB954] rounded-sm p-4 transition-colors">
          <div className="text-xs font-mono text-[#888888] uppercase tracking-wider mb-1">
            Top Program (2026)
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1DB954]">
            BS CS (538)
          </div>
          <div className="text-xs font-mono text-[#B3B3B3] mt-1">
            23.5% of total enrollment
          </div>
        </div>

        <div className="bg-[#121418] border border-white/10 hover:border-[#1DB954] rounded-sm p-4 transition-colors">
          <div className="text-xs font-mono text-[#888888] uppercase tracking-wider mb-1">
            Post-Trough Rebound
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            +15.7%
          </div>
          <div className="text-xs font-mono text-[#888888] mt-1">
            From 1,977 (2018) to 2,287
          </div>
        </div>

        <div className="bg-[#121418] border border-white/10 hover:border-[#1DB954] rounded-sm p-4 transition-colors">
          <div className="text-xs font-mono text-[#888888] uppercase tracking-wider mb-1">
            Strongest Correlation
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-[#1DB954]">
            r = 0.84
          </div>
          <div className="text-xs font-mono text-[#B3B3B3] mt-1">
            BS ChE with BS ECE
          </div>
        </div>
      </div>

      {/* Grid of All Visual Graphs - Only Visual Graphs and Titles */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 min-w-0">
        {/* Graph 1: Bar Chart */}
        <section
          aria-label={interpretations.bar.title}
          className="border border-[#1DB954] rounded-sm bg-[#0A0B0E]/95 p-4 sm:p-5 flex flex-col justify-between shadow-xl min-w-0 overflow-hidden"
        >
          <div className="mb-2">
            <h2 className="text-base sm:text-lg font-bold text-[#1DB954]">
              {interpretations.bar.title}
            </h2>
          </div>
          <div className="min-w-0">
            <BarChartView />
          </div>
        </section>

        {/* Graph 2: Pie Chart */}
        <section
          aria-label={interpretations.pie.title}
          className="border border-[#1DB954] rounded-sm bg-[#0A0B0E]/95 p-4 sm:p-5 flex flex-col justify-between shadow-xl min-w-0 overflow-hidden"
        >
          <div className="mb-2">
            <h2 className="text-base sm:text-lg font-bold text-[#1DB954]">
              {interpretations.pie.title}
            </h2>
          </div>
          <div className="min-w-0">
            <PieChartView />
          </div>
        </section>

        {/* Graph 3: Line Chart */}
        <section
          aria-label={interpretations.line.title}
          className="border border-[#1DB954] rounded-sm bg-[#0A0B0E]/95 p-4 sm:p-5 flex flex-col justify-between shadow-xl min-w-0 overflow-hidden"
        >
          <div className="mb-2">
            <h2 className="text-base sm:text-lg font-bold text-[#1DB954]">
              {interpretations.line.title}
            </h2>
          </div>
          <div className="min-w-0">
            <LineChartView />
          </div>
        </section>

        {/* Graph 4: Heat Map */}
        <section
          aria-label={interpretations.heatmap.title}
          className="border border-[#1DB954] rounded-sm bg-[#0A0B0E]/95 p-4 sm:p-5 flex flex-col justify-between shadow-xl min-w-0 overflow-hidden"
        >
          <div className="mb-2">
            <h2 className="text-base sm:text-lg font-bold text-[#1DB954]">
              {interpretations.heatmap.title}
            </h2>
          </div>
          <div className="min-w-0">
            <HeatMapView />
          </div>
        </section>
      </div>
    </div>
  );
}
