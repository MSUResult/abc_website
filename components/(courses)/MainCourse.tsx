"use client";

import { useState, useMemo } from "react";
import data from "@/data/course.json";
import Image from "next/image";
import ContactComing from "../(Homepage)/ContactComing";
import Link from "next/link";

const UpcomingCourse = [
  {
    Heading: "🚨 Last 5 Seats Left – NEET 2026 Crash Course",
    Content:
      "Final revision program designed for serious NEET aspirants. Boost your score with rapid concept clarity and smart test strategy under Shahid Ansari Sir.",
  },
];

const MainCourse = () => {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);

  const buttons = useMemo(() => {
    const types = data.map((item) => item.type);
    return ["All", ...Array.from(new Set(types))];
  }, []);

  const FilterData =
    filter && filter !== "All"
      ? data.filter((dat) => dat.type === filter)
      : data;

  // TEACHING POINT: Helper function to keep the UI clean
  const getShortEligibility = (text) => {
    if (!text) return "Open Entry";
    if (text.includes("400")) return "Score 400+";
    if (text.includes("300")) return "Score 300+";
    if (
      text.toLowerCase().includes("every") ||
      text.toLowerCase().includes("all")
    )
      return "Open to All";
    return text; // Fallback
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 md:px-10 bg-white">
      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <ContactComing close={() => setOpen(false)} />
        </div>
      )}

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-3xl shadow-xl overflow-hidden mb-16">
        {UpcomingCourse.map((course, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-stretch gap-0 py-4"
          >
            <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[200px] overflow-hidden ">
              <Image
                src="/courosol/abcinst.jpeg"
                alt="NEET Crash Course"
                fill
                className="object-contain object-top"
              />
            </div>
            <div className="w-full md:w-1/2 text-white p-8 md:p-12 flex flex-col justify-center">
              <span className="self-start mb-4 bg-white text-red-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">
                Starting 2 March
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                {course.Heading}
              </h2>
              <p className="text-lg text-red-100 leading-relaxed mb-8">
                {course.Content}
              </p>
              <button
                onClick={() => setOpen(true)}
                className="self-start bg-white text-red-700 font-bold px-8 py-3.5 rounded-xl shadow-md"
              >
                Secure Your Seat Now
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Courses Grid */}
      <div className="max-w-7xl mx-auto">
        <section className="mb-12 flex flex-wrap gap-3">
          {buttons.map((but, index) => (
            <button
              key={index}
              onClick={() => setFilter(but)}
              className={`py-2.5 px-6 rounded-full font-bold text-sm border transition-all ${
                filter === but
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-white border-gray-200 text-gray-600"
              }`}
            >
              {but}
            </button>
          ))}
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FilterData.map((course, index) => (
            <Link
              key={index}
              href={`/courses/${course.slug}`}
              className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="p-6 flex-grow">
                <div className="mb-4 flex justify-between items-center">
                  <span className="bg-red-50 text-red-700 border border-red-100 text-[10px] font-bold px-3 py-1 rounded-md uppercase">
                    {course.type}
                  </span>

                  {/* TEACHING POINT: Eligibility Badge at the top right */}
                  {course.eligibility && (
                    <span className="bg-gray-900 text-white text-[9px] font-bold px-2 py-1 rounded tracking-tighter uppercase">
                      {getShortEligibility(course.eligibility)}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-900 leading-snug mb-6 h-14 line-clamp-2">
                  {course.Heading}
                </h2>

                <div className="grid grid-cols-2 gap-y-5 gap-x-2 mb-6">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                      Class
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {course.class}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                      Duration
                    </p>
                    <p className="text-sm font-bold text-red-600">
                      {getShortEligibility(course.Duration)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                      Language
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {course.Language}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase mb-1">
                      Mode
                    </p>
                    <p className="text-sm font-semibold text-gray-800">
                      {course.Batches}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">
                    Starts From
                  </span>
                  <span className="font-bold text-gray-900 text-sm">
                    {course.starting_from}
                  </span>
                </div>
              </div>

              <div className="p-6 pt-0 mt-auto">
                <button
                  onClick={() => setOpen(true)}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-md flex justify-center items-center gap-2"
                >
                  Enroll Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
};

export default MainCourse;
