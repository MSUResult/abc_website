"use client"; // Required for useRef and onClick functions
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Install lucide-react or use SVG

const Timeline = () => {
  const scrollRef = useRef(null);
  const timelineYears = [
    "2003",
    "2008",
    "2012",
    "2017",
    "2020",
    "2021",
    "2022",
    "2024",
    "2026",
  ];

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (current) {
      const scrollAmount = 300;
      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-24 px-4 relative group">
      {/* 1. NAVIGATION ARROWS */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 p-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full shadow-lg hover:bg-blue-600 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
      >
        <ChevronRight size={24} />
      </button>

      {/* 2. THE RULER SCROLL CONTAINER */}
      <div
        ref={scrollRef}
        className="relative border-b-2 border-gray-200 pb-8 flex items-end overflow-x-auto no-scrollbar gap-16 md:gap-24 px-10"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {/* BACKGROUND RULER TICKS (Small decorative lines) */}
        <div className="absolute bottom-0 left-0 w-[200%] h-3 flex justify-between pointer-events-none opacity-20">
          {[...Array(100)].map((_, i) => (
            <div
              key={i}
              className={`w-[1px] bg-slate-900 ${i % 5 === 0 ? "h-full" : "h-1/2"}`}
            />
          ))}
        </div>

        {/* 3. THE ACTUAL YEARS */}
        {timelineYears.map((year) => (
          <div
            key={year}
            className="flex flex-col items-center shrink-0 w-24 z-10 scroll-snap-align-center cursor-pointer group/year"
          >
            {/* Year Label */}
            <span className="text-xl md:text-3xl font-black text-slate-500 group-hover/year:text-blue-600 group-hover/year:scale-110 transition-all duration-300 mb-4">
              {year}
            </span>

            {/* Main Ruler Indicator */}
            <div className="w-1 h-6 bg-slate-400 group-hover/year:bg-red-600 group-hover/year:h-10 transition-all duration-300 rounded-t-full" />

            {/* Dot on the line */}
            <div className="absolute bottom-[-5px] w-2 h-2 bg-white border-2 border-slate-400 group-hover/year:border-red-600 rounded-full" />
          </div>
        ))}
      </div>

      {/* 4. GRADIENT FADE EDGES (Makes it look premium) */}
      <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[#fafcff] to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#fafcff] to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default Timeline;
