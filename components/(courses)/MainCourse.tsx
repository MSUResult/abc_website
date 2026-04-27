"use client";

import { useState, useMemo } from "react";
import data from "@/data/course.json";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, Globe, MonitorPlay, Calendar, ArrowRight } from "lucide-react";
import ContactComing from "../(Homepage)/ContactComing";

const UpcomingCourse = [
  {
    Heading: "🚨 Last 5 Seats Left – NEET 2026 Crash Course",
    Content:
      "Final revision program designed for serious NEET aspirants. Boost your score with rapid concept clarity and smart test strategy.",
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

  const getShortEligibility = (text) => {
    if (!text) return "Open Entry";
    if (text.includes("400")) return "Score 400+";
    if (text.includes("300")) return "Score 300+";
    if (
      text.toLowerCase().includes("every") ||
      text.toLowerCase().includes("all")
    )
      return "Open to All";
    return text;
  };

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 md:px-10 bg-gray-50/50">
      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-3"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <div className="relative z-10">
              <ContactComing close={() => setOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Banner */}
      <section className="max-w-7xl mx-auto bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-[2rem] shadow-2xl overflow-hidden mb-16 border border-red-500/30">
        {UpcomingCourse.map((course, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-stretch gap-0 py-4 relative"
          >
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[400px] overflow-hidden">
              <Image
                src="/courosol/fdg.jpeg"
                alt="NEET Crash Course"
                fill
                className="object-contain object-center drop-shadow-2xl"
              />
            </div>

            <div className="w-full md:w-1/2 text-white p-8 md:p-14 flex flex-col justify-center relative z-10">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="self-start mb-6 bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-black px-5 py-2 rounded-full uppercase tracking-widest"
              >
                Starting 2 March
              </motion.span>
              <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
                {course.Heading}
              </h2>
              <p className="text-lg text-red-100/90 leading-relaxed mb-10 font-medium">
                {course.Content}
              </p>
              <button
                onClick={() => setOpen(true)}
                className="self-start group bg-white text-red-700 font-bold px-8 py-4 rounded-xl shadow-[0_8px_30px_rgb(255,255,255,0.2)] hover:shadow-[0_8px_30px_rgb(255,255,255,0.4)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-3"
              >
                Secure Your Seat Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto">
        <section className="mb-14 flex flex-wrap gap-3 justify-center md:justify-start">
          {buttons.map((but, index) => (
            <button
              key={index}
              onClick={() => setFilter(but)}
              className={`relative px-7 py-3 rounded-full font-bold text-sm transition-colors duration-300 ${
                filter === but
                  ? "text-white"
                  : "text-gray-600 hover:text-red-600 bg-white shadow-sm border border-gray-200"
              }`}
            >
              {filter === but && (
                <motion.div
                  layoutId="activeFilterBubble"
                  className="absolute inset-0 bg-red-600 rounded-full shadow-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{but}</span>
            </button>
          ))}
        </section>

        {/* Course Grid */}
        <motion.section layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {FilterData.map((course, index) => (
              <motion.div
                key={course.slug || index}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, type: "spring", bounce: 0.3 }}
              >
                <Link
                  href={`/courses/${course.slug}`}
                  className="group flex flex-col h-full bg-white rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden hover:shadow-[0_20px_40px_rgb(220,38,38,0.08)] hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="p-7 flex-grow">
                    <div className="mb-6 flex justify-between items-center">
                      <span className="bg-red-50 text-red-600 border border-red-100 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wide">
                        {course.type}
                      </span>
                      {course.eligibility && (
                        <span className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full tracking-wide uppercase shadow-sm">
                          {getShortEligibility(course.eligibility)}
                        </span>
                      )}
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-8 group-hover:text-red-600 transition-colors line-clamp-2">
                      {course.Heading}
                    </h2>

                    <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Class</p>
                          <p className="text-sm font-semibold text-gray-800">{course.class}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                          <Clock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Duration</p>
                          <p className="text-sm font-bold text-red-600">{course.Duration}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                          <Globe className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Language</p>
                          <p className="text-sm font-semibold text-gray-800">{course.Language}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                          <MonitorPlay className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase mb-0.5">Mode</p>
                          <p className="text-sm font-semibold text-gray-800">{course.Batches}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 bg-gray-50/80 p-4 rounded-2xl border border-gray-100">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <span className="block text-[10px] font-bold text-gray-500 uppercase">Starts From</span>
                        <span className="block font-bold text-gray-900 text-sm">{course.starting_from}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-7 pt-0 mt-auto">
                    {/* onClick removed so it follows the Link parent naturally */}
                    <div
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl shadow-md flex justify-center items-center gap-2 transition-all duration-300 group-hover:shadow-lg"
                    >
                      Enroll Now
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>
      </div>
    </main>
  );
};

export default MainCourse;