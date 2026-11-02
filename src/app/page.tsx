"use client";

import React, { useState } from "react";
import { Navbar, TabType } from "@/components/Navbar";
import { ChartContainer } from "@/components/ChartContainer";
import { DashboardView } from "@/components/DashboardView";
import { DatasetView } from "@/components/DatasetView";
import { BarChartView } from "@/components/BarChartView";
import { LineChartView } from "@/components/LineChartView";
import { PieChartView } from "@/components/PieChartView";
import { HeatMapView } from "@/components/HeatMapView";
import { Footer } from "@/components/Footer";
import analysisData from "@/data/enrollment_analysis.json";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");

  const currentInterpretation =
    activeTab !== "dashboard" ? analysisData.interpretations[activeTab] : null;

  return (
    <main className="min-h-screen flex flex-col justify-between px-4 sm:px-8 pt-24 sm:pt-28">
      {/* Floating Pill Navbar with Spotify Icon */}
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-center my-auto w-full max-w-7xl mx-auto">
        {activeTab === "dashboard" ? (
          <DashboardView />
        ) : (
          currentInterpretation && (
            <ChartContainer
              title={currentInterpretation.title}
              description={currentInterpretation.description}
            >
              {activeTab === "dataset" && <DatasetView />}
              {activeTab === "bar" && <BarChartView />}
              {activeTab === "line" && <LineChartView />}
              {activeTab === "pie" && <PieChartView />}
              {activeTab === "heatmap" && <HeatMapView />}
            </ChartContainer>
          )
        )}
      </div>

      {/* Footer strictly with SpotiBai brand */}
      <Footer />
    </main>
  );
}
