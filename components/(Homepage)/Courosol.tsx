"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "NEET Crash Course",
    highlight: "Complete Preparation",
    subtitle: "ABC Provides the best batch in sahranpur .",
    description: "Join the most trusted batch with India's top educators.",
    cta: "Join Now",
    src: "/courosol/Neet.png",
    bgColor: "bg-gradient-to-r from-red-600 to-red-800", // Standardized to Tailwind colors
    accentColor: "text-white",
  },
  {
    id: 2,
    title: "Test Series Launching",
    highlight: "NEET BATCHES",
    subtitle: "For JEE, NEET Student",
    description: "Unlock your potential with affordable learning solutions.",
    cta: "Explore Batches",
    src: "/courosol/test.png",
    bgColor: "bg-red-600",
    accentColor: "text-red-100",
  },
  // {
  //   id: 3,
  //   title: "New Batches Starting",
  //   highlight: "ADMISSIONS OPEN",
  //   subtitle: "IIT , JEE , NEET New Batches Started ",
  //   description: "Get up to 90% scholarship on our classroom courses.",
  //   cta: "Apply Now",
  //   src: "/courosol/abc3.jpg",
  //   bgColor: "bg-red-950",
  //   accentColor: "text-red-200",
  // },
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full mt-[84px] px-4 md:px-8 py-6 flex justify-center">
      {/* FIX 1: Adjusted Heights. 
        h-[650px] for mobile (gives room for text + image stacking)
        md:h-[450px] for laptop (shorter because they sit side-by-side)
      */}
      <div className="relative w-full max-w-7xl h-[650px] md:h-[450px] rounded-[2rem] overflow-hidden shadow-2xl">
        {/* Slider Track */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              /* FIX 2: min-w-full prevents shrinking. 
                flex-col for mobile, md:flex-row for laptop 
              */
              className={`min-w-full h-full flex flex-col md:flex-row items-center px-6 pt-12 md:pt-0 md:px-16 ${slide.bgColor} relative`}
            >
              {/* Background Decorations */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

              {/* LEFT SIDE: TEXT CONTENT */}
              {/* FIX 3: Centered text on mobile (items-center, text-center), Left-aligned on laptop (md:items-start, md:text-left) */}
              <div className="w-full md:w-[40%] z-10 flex flex-col items-center text-center md:items-start md:text-left space-y-4">
                <span
                  className={`font-bold tracking-wider uppercase text-xs md:text-sm ${slide.accentColor} bg-white/20 px-4 py-1.5 rounded-full`}
                >
                  {slide.highlight}
                </span>

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                  {slide.title}
                </h2>

                <p className="text-base md:text-xl text-red-50 font-medium">
                  {slide.subtitle}
                </p>

                <button className="mt-4 bg-white text-red-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 hover:scale-105 transition-all flex items-center gap-2 shadow-lg">
                  {slide.cta}
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* RIGHT SIDE: IMAGE */}
              {/* FIX 4: Image takes up remaining space and scales dynamically instead of fixed hardcoded pixels */}
              {/* RIGHT SIDE: IMAGE */}
              {/* RIGHT SIDE: IMAGE CONTAINER */}
              {/* RIGHT SIDE: IMAGE CONTAINER */}
              {/* RIGHT SIDE: IMAGE CONTAINER */}
              {/* RIGHT SIDE: IMAGE CONTAINER (The Column) */}
              <div className="w-full md:w-[60%] h-[300px] md:h-full relative flex items-end md:items-center justify-center z-10 p-4 pb-12 md:pb-0">
                {/* --- THE PICTURE FRAME (The box itself) --- */}
                <div
                  className="
    relative 
    /* MOBILE WIDTH: Controlled by w-full. 
       To make it 'feel' wider, ensure the parent has less horizontal padding. */
    w-full 
    
    /* LAPTOP WIDTH: We use md:w-[95%] to make it fill almost the whole 60% column. */
    md:w-[95%] 

    aspect-[16/9] md:aspect-auto 
    md:h-[85%] /* Increase this from 80% to 85% to make it bigger on laptop */
    rounded-2xl 
    border-2 border-white 
    shadow-2xl 
    overflow-hidden 
    bg-black/10
    translate-y-2 md:translate-y-0 
  "
                >
                  <Image
                    src={slide.src}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* NAVIGATION DOTS */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
