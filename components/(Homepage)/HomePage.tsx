"use client";
import Image from "next/image";
import React, { useState } from "react";
import { ArrowRight } from "lucide-react";
import { FaVideo } from "react-icons/fa";
import TrustSection from "./TrustSection";
import Link from "next/link";

const CardContent = [
  {
    image: <FaVideo />,
    heading: "Daily Live",
    para: "Interactive Classes",
  },
  {
    image: <FaVideo />,
    heading: "5 Lakhs +",
    para: "Tests, sample papers & notes",
  },
  {
    image: <FaVideo />,
    heading: "24 x 7",
    para: "Doubt solving sessions",
  },
  {
    image: <FaVideo />,
    heading: "4 +",
    para: "Offline centres",
  },
];

const HomePage = () => {
  const [hover, setHover] = useState(false);

  return (
    // Added overflow-x-hidden to prevent horizontal scrolling on mobile from floating cards
    <main className="min-h-screen bg-white overflow-x-hidden">
      <section className="px-6 md:px-12 py-12 md:py-24">
        {/* Hero Section Container */}
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-16 md:gap-12">
          {/* Left Side: Text Content */}
          <div className="flex-1 space-y-6 text-center md:text-left mt-8 md:mt-0">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.2]">
                <span className="block">Saharanpur's Trusted &</span>
                {/* Red/Orange gradient for the highlighted text */}
                <span className="block bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent py-1">
                  Affordable
                </span>
                <span className="block">Learning Platform</span>
              </h1>
            </div>

            <p className="text-gray-600 font-medium max-w-lg mx-auto md:mx-0 leading-relaxed text-lg">
              Unlock your potential by signing up with
              <span className="text-gray-900 font-bold"> ABC Institute</span> —
              the most affordable learning solution for your bright future.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <Link
                href={"/"}
                className="group bg-red-600 hover:bg-red-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl shadow-red-200 flex items-center gap-2 hover:-translate-y-1"
              >
                Get Started
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Link>
            </div>
          </div>

          {/* Right Side: Image/Illustration */}
          <div className="flex-1 relative w-full flex items-center justify-center">
            {/* Background blob for styling */}
            <div className="absolute inset-0 bg-red-100 rounded-full filter blur-3xl opacity-50 animate-pulse scale-110" />

            {/* Main Image Container - Responsive sizing */}
            <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full border-8 border-white shadow-2xl z-10 bg-gray-50 flex items-center justify-center">
              <Image
                src="/sirpassport.png" // Ensure this path matches where you saved the image
                alt="ABC Institute Director"
                fill
                className="object-cover rounded-full drop-shadow-xl"
                priority
              />
            </div>

            {/* Floating Card 1: Existing (Bottom Left) */}
            <div className="absolute bottom-4 -left-2 md:-left-8 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-3 z-20 animate-bounce">
              <div className="bg-green-100 p-2 rounded-lg">
                <span className="text-green-600 font-bold text-sm md:text-base">
                  ✓
                </span>
              </div>
              <div className="text-left">
                <p className="text-[10px] md:text-xs text-gray-500 uppercase font-bold tracking-widest">
                  Quality Content
                </p>
                <p className="text-xs md:text-sm font-bold text-gray-900">
                  Admission Open for 2026
                </p>
              </div>
            </div>

            {/* Floating Card 2: NEW (Top Right - ABC is Best) */}
            <div className="absolute md:top-4 top-[-30px] -right-2 md:-right-10 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-3 z-20 hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                ✨
              </div>
              <div className="text-left">
                <p className="text-[10px] md:text-xs text-gray-800 uppercase font-bold tracking-widest">
                  Join 2,000+
                </p>
                <p className="text-xs md:text-sm font-bold text-gray-900">
                  Saharanpur students today!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustSection />
    </main>
  );
};

export default HomePage;
