"use client";

import React, { useState } from "react";
import analysisData from "@/data/enrollment_analysis.json";

export function DatasetView() {
  const [viewMode, setViewMode] = useState<"raw" | "clean">("raw");

  const rawLines = analysisData.raw_csv.trim().split("\n");
  const yearlyData = analysisData.yearly_data;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Sub-nav Raw / Clean strictly matching Figma */}
      <div className="flex items-center gap-6 mb-5">
        <button
          type="button"
          onClick={() => setViewMode("raw")}
          className={`pb-1 text-sm font-medium transition-colors ${
            viewMode === "raw"
              ? "text-white border-b-2 border-[#1DB954]"
              : "text-[#888888] hover:text-white"
          }`}
        >
          Raw
        </button>
        <button
          type="button"
          onClick={() => setViewMode("clean")}
          className={`pb-1 text-sm font-medium transition-colors ${
            viewMode === "clean"
              ? "text-white border-b-2 border-[#1DB954]"
              : "text-[#888888] hover:text-white"
          }`}
        >
          Clean
        </button>
      </div>

      {/* Content inside the container */}
      <div className="w-full h-full flex flex-col justify-center items-start overflow-x-auto py-2">
        {viewMode === "raw" ? (
          <pre className="font-mono text-sm sm:text-[15px] text-[#E0E0E0] leading-relaxed tracking-wide select-all whitespace-pre pl-2 sm:pl-6">
            {rawLines.map((line, idx) => (
              <div key={idx} className="hover:bg-white/5 px-2 rounded">
                {line}
              </div>
            ))}
          </pre>
        ) : (
          <div className="w-full">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-[#282828] text-[#B3B3B3] text-xs uppercase tracking-wider">
                  <th className="py-2.5 px-3">Year</th>
                  <th className="py-2.5 px-3 text-[#1DB954]">BS CS</th>
                  <th className="py-2.5 px-3">BS ChE</th>
                  <th className="py-2.5 px-3">BS IE</th>
                  <th className="py-2.5 px-3">BS ME</th>
                  <th className="py-2.5 px-3">BS ECE</th>
                  <th className="py-2.5 px-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1C1F24] font-mono text-xs sm:text-sm">
                {yearlyData.map((row) => (
                  <tr
                    key={row.Year}
                    className={`hover:bg-white/5 transition-colors ${
                      row.Year === 2026 ? "bg-[#1DB954]/10 font-bold" : ""
                    }`}
                  >
                    <td className="py-2.5 px-3 text-white font-semibold">
                      {row.Year} {row.Year === 2026 ? "(Latest)" : ""}
                    </td>
                    <td className="py-2.5 px-3 text-[#1DB954]">{row.BS_CS}</td>
                    <td className="py-2.5 px-3 text-[#B3B3B3]">{row.BS_ChE}</td>
                    <td className="py-2.5 px-3 text-[#B3B3B3]">{row.BS_IE}</td>
                    <td className="py-2.5 px-3 text-[#B3B3B3]">{row.BS_ME}</td>
                    <td className="py-2.5 px-3 text-[#B3B3B3]">{row.BS_ECE}</td>
                    <td className="py-2.5 px-3 text-right text-white font-semibold">
                      {row.Total.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 pt-3 border-t border-[#222] text-xs text-[#888888] flex flex-wrap justify-between gap-2">
              <span>Source: Office of the University Registrar (OUR), UP Diliman</span>
              <span>11-Year Period: 2016 – 2026</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
