"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../../data/course.json";

export default function Courses() {
  const [choose, setChoose] = useState("JEE");
  const filteredCourses = data.filter((it) => it.type === choose);

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Courses chosen by{" "}
            <span className="text-red-600">our champions</span>
          </h1>
        </div>

        {/* FILTER TABS */}
        <section className="flex justify-center mb-12">
          <div className="inline-flex gap-3">
            {["JEE", "NEET", "Classes 6-10", "NEET CRASH COURSE"].map(
              (type) => (
                <button
                  key={type}
                  onClick={() =>
                    setChoose(type === "Classes 6-10" ? "Classes:6-10" : type)
                  }
                  className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all border ${
                    choose === type ||
                    (type === "Classes 6-10" && choose === "Classes:6-10")
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:border-blue-600"
                  }`}
                >
                  {type}
                </button>
              ),
            )}
          </div>
        </section>

        {/* COURSE GRID */}
        <motion.section layout className="grid md:grid-cols-2 gap-6 mb-12">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((it, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.1 }}
                key={it.Heading}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                {/* Top Badges */}
                <div className="flex gap-2 mb-4">
                  <span className="px-4 py-1.5 bg-purple-600 text-white text-xs font-medium rounded-full flex items-center gap-1">
                    {/* <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg> */}
                    Offline Courses
                  </span>
                  {index === 0 && (
                    <span className="px-4 py-1.5 bg-orange-100 text-orange-700 text-xs font-medium rounded-full">
                      Bestseller
                    </span>
                  )}
                </div>

                {/* Course Title */}
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  {it.Heading}
                </h3>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Class:</p>
                    <p className="text-base font-semibold text-gray-900">
                      {it.class}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Duration:</p>
                    <p className="text-base font-semibold text-gray-900">
                      {it.Duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Language:</p>
                    <p className="text-base font-semibold text-gray-900">
                      {it.Language}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Starting from:</p>
                    <p className="text-base font-semibold text-gray-900">
                      {it.starting_from}
                    </p>
                  </div>
                </div>

                {/* Enroll Button */}
                <button className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors mb-6">
                  Enrol now
                </button>

                {/* Student Testimonial */}
                <div className="pt-6 border-t border-gray-200">
                  {it.why.slice(0, 1).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img
                        src={`${item.img}`}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {item.name}
                          </p>
                          <span className="px-2 py-0.5 bg-emerald-600 text-white text-xs font-semibold rounded">
                            {item.Rank}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{item.info}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.section>

        {/* View All Button */}
        <div className="text-center">
          <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors">
            View all Courses
          </button>
        </div>
      </div>
    </main>
  );
}
