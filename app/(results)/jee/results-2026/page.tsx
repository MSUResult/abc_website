import React from "react";
import results from "@/data/toppers.json";
import Image from "next/image";

const Page = () => {
  return (
    <main className="min-h-screen flex mt-16 md:mt-6 items-center justify-center bg-slate-100 p-6">
      <section className="flex md:flex-row flex-col max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
        {/* Left Badge Section */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 md:w-32 flex items-center justify-center py-8 px-4">
          <p className="font-black text-white uppercase tracking-widest md:-rotate-90 whitespace-nowrap text-xl">
            JEE Advanced
          </p>
        </div>

        {/* Content Section */}
        <div className="flex-1 py-8 px-8 md:px-12">
          <h1 className="text-2xl md:text-3xl text-slate-800 font-extrabold leading-tight mb-8">
            500+ hours of <span className="text-blue-600">LIVE classes</span>,
            <br className="hidden md:block" /> specially for fast-paced JEE Main
            prep
          </h1>

          <div className="flex gap-6 flex-wrap  items-center">
            {results.slice(0, 5).map((res, index) => (
              <div
                className="flex flex-col items-center gap-3 group cursor-pointer"
                key={index}
              >
                <div className="relative h-20 w-20 rounded-full p-1 bg-gradient-to-tr from-blue-500 to-cyan-400 shadow-md transform transition-transform group-hover:scale-110">
                  <div className="relative h-full w-full rounded-full overflow-hidden border-2 border-white">
                    <Image
                      src={res.img}
                      alt={res.name}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <p className="font-semibold text-slate-700 text-sm group-hover:text-blue-600 transition-colors">
                  {res.name}
                </p>
              </div>
            ))}

            {/* Enhanced "More" Badge */}
            <div className="h-20 w-20 bg-amber-400 rounded-full flex flex-col items-center justify-center text-center shadow-lg border-2 border-white transform transition-transform hover:scale-105">
              <p className="text-2xl font-black text-amber-900 leading-none">
                +7
              </p>
              <p className="text-[10px] font-bold text-amber-900 uppercase tracking-tighter">
                In Top <br /> 10,000
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
