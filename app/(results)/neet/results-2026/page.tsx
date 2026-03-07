import React from "react";
import results from "@/data/toppers.json";
import Image from "next/image";
import Link from "next/link"; // Added for the CTA button

const Page = () => {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-200">
      {/* 1. HERO SECTION */}
      <section className="w-full flex justify-center px-4 pt-16 md:pt-24 pb-20 relative overflow-hidden">
        {/* Optional: Subtle background blob for a modern feel */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="flex flex-col md:flex-row max-w-6xl w-full bg-white rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] overflow-hidden border border-slate-100 z-10">
          {/* Left Badge Section */}
          <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-slate-900 md:w-32 flex items-center justify-center py-6 md:py-12 px-4 shadow-inner">
            <p className="font-black text-white/90 uppercase tracking-[0.2em] md:-rotate-90 whitespace-nowrap text-2xl drop-shadow-md">
              JEE Results
            </p>
          </div>

          {/* Content Section */}
          <div className="flex-1 py-10 px-8 md:py-16 md:px-14 flex flex-col justify-center">
            {/* Small top label */}
            <span className="text-blue-600 font-bold tracking-wider text-sm uppercase mb-3">
              🔥 Batch Starting Soon
            </span>

            <h1 className="text-3xl md:text-5xl text-slate-900 font-extrabold leading-[1.2] mb-6">
              500+ hours of{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                LIVE classes
              </span>
              ,
              <br className="hidden md:block" /> specially for fast-paced prep.
            </h1>

            <p className="text-slate-500 text-lg mb-10 max-w-2xl leading-relaxed">
              Join thousands of top rankers. Get access to premium study
              material, mock tests, and personalized doubt solving from India's
              top educators.
            </p>

            {/* Toppers & CTA Row */}
            <div className="flex flex-col xl:flex-row gap-10 xl:items-center justify-between">
              {/* Toppers Group */}
              <div className="flex gap-4 md:gap-6 flex-wrap items-center">
                {results.slice(0, 5).map((res, index) => (
                  <div
                    className="flex flex-col items-center gap-3 group cursor-pointer"
                    key={index}
                  >
                    <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-lg transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-blue-400/50">
                      <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-white bg-white">
                        <Image
                          src={res.img}
                          alt={res.name}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>
                    <p className="font-semibold text-slate-700 text-xs md:text-sm group-hover:text-blue-600 transition-colors">
                      {res.name}
                    </p>
                  </div>
                ))}

                {/* Enhanced "More" Badge */}
                <div className="h-16 w-16 md:h-20 md:w-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex flex-col items-center justify-center text-center shadow-lg border-2 border-white transform transition-transform hover:scale-105 cursor-pointer hover:shadow-orange-400/40">
                  <p className="text-xl md:text-2xl font-black text-white leading-none drop-shadow-sm">
                    +7
                  </p>
                  <p className="text-[8px] md:text-[10px] font-bold text-white uppercase tracking-wider mt-1 opacity-90">
                    Top 10k
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button className="bg-slate-900 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 shadow-xl hover:shadow-blue-600/30 whitespace-nowrap w-full md:w-auto text-center">
                Enroll Now →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HALL OF FAME / RESULTS SECTION */}
      <section className="w-full bg-slate-900 py-20 px-4 sm:px-6 lg:px-8 border-t-4 border-blue-500 flex flex-col items-center">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              Our Legacy of <span className="text-amber-400">Excellence</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Consistent top ranks in JEE Advanced and NEET. Our results speak
              louder than words.
            </p>
          </div>

          {/* Big Grid for Banners */}
          {/* Big Grid for Banners */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            {/* Banner 1 */}
            <div className="group rounded-2xl overflow-hidden  transition-all duration-500 hover:-translate-y-2 hover:shadow-blue-500/30">
              <Image
                src="/result/neet.jpeg"
                alt="NEET Results Banner"
                width={1200}
                height={1600}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>

            {/* Banner 2 */}
            <div className="group rounded-2xl overflow-hidden   transition-all duration-500 hover:-translate-y-2 hover:shadow-cyan-500/30">
              <Image
                src="/result/neet.jpeg"
                alt="JEE Advanced Results Banner"
                width={1200}
                height={160}
                className="w-full h-auto transition-transform duration-700 group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
