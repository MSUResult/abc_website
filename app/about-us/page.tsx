import About from "@/components/(about-us)/About";
import Timeline from "@/components/(BlogSection)/Timeline";
import Image from "next/image";
import React from "react";

const Page = () => {
  const timelineYears = ["2017", "2020", "2021", "2022", "2024"];

  return (
    <main>
      <section className="min-h-screen bg-[#fafcff] flex flex-col items-center pt-32 pb-16 overflow-hidden">
        {/* 1. TOP HEADING SECTION */}
        <div className="text-center px-4 flex flex-col items-center z-10 w-full">
          <p className="text-slate-500 text-lg md:text-xl font-medium mb-2 md:mb-3">
            Celebrating 23 years of
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-[5rem] font-extrabold text-slate-900 tracking-tight leading-tight">
            ABC’s academic excellence.
          </h1>
          {/* Minimalist Blue Underline */}
          <div className="h-[3px] w-16 bg-blue-600 mt-6" />
        </div>

        {/* 2. THE HERO ILLUSTRATION */}
        {/* We use standard natural flow (not absolute) so the image takes up its own space naturally without squishing text */}
        <div className="relative w-full max-w-6xl h-[350px] md:h-[550px] my-6 md:my-4 flex justify-center z-0">
          <Image
            src="/about/photo.png"
            alt="ABC Institute Campus Illustration"
            fill
            className="object-contain scale-105 md:scale-110"
            priority
          />
        </div>

        {/* 3. FOUNDATION INFO SECTION */}
        {/* Negative margin (mt-[-20px]) pulls the text slightly UP over the bottom of the image for a cohesive look */}
        <div className="text-center z-10 px-4 mt-[-20px] md:mt-[-40px]">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
            Founded in Saharanpur
          </h2>
          <p className="text-slate-500 mt-2 text-base md:text-lg">
            ABC started on April 18, 2003
          </p>
          <p className="text-slate-400 text-sm font-medium mt-1">
            Batch of 8 Students
          </p>
        </div>

        {/* 4. RULER-STYLE TIMELINE */}
        {/* Designed to look like the bottom ruler in the reference image */}
        <Timeline />
      </section>
      <section>
        <About />
      </section>
    </main>
  );
};

export default Page;
