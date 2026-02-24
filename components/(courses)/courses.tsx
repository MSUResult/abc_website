"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../../data/course.json";
import ContactComing from "../(Homepage)/ContactComing";

const TABS = [
  { label: "JEE", value: "JEE" },
  { label: "NEET", value: "NEET" },
  { label: "Classes 6-10", value: "Classes:6-10" },
  { label: "NEET CRASH COURSE", value: "NEET Crash Course" },
];
export default function Courses() {
  const [choose, setChoose] = useState("JEE");

  const [open, setOpen] = useState(false);

  // Helper to handle the "Classes:6-10" naming inconsistency in your JSON
  const handleTabChange = (type) => {
    setChoose(type === "Classes 6-10" ? "Classes:6-10" : type);
  };

  const filteredCourses = data.filter((it) => it.type === choose);

  return (
    <main className="min-h-screen bg-[#f8fafc] py-20">
      {open && (
        <div className="fixed inset-0 z-50 px-3 flex items-center justify-center ">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          ></div>

          <ContactComing close={() => setOpen(false)} />
        </div>
      )}
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <header className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight"
          >
            Courses chosen by
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
              our champions
            </span>
          </motion.h1>
          <p className="text-gray-600 text-lg">
            Expert-led programs designed to help you ace your competitive exams.
          </p>
        </header>

        {/* FILTER TABS */}
        <nav className="flex justify-center mb-16">
          <div className="inline-flex p-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
            {TABS.map((tab) => {
              const isActive =
                choose === tab.value ||
                (tab.value === "Classes 6-10" && choose === "Classes:6-10");
              return (
                <button
                  key={tab.value}
                  onClick={() => handleTabChange(tab.value)}
                  className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-slate-600 hover:text-blue-600"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-blue-600 rounded-full"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* COURSE GRID */}
        <motion.section
          layout
          className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((it, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                key={it.Heading}
                className="group bg-white border border-slate-200 rounded-3xl p-8 hover:border-blue-300 hover:shadow-2xl hover:shadow-blue-500/10 transition-all"
              >
                {/* Top Badges */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 text-[10px] uppercase tracking-wider font-bold rounded-lg border border-purple-100 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-pulse" />
                      Offline
                    </span>
                    {index === 0 && (
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 text-[10px] uppercase tracking-wider font-bold rounded-lg border border-amber-100">
                        🔥 Bestseller
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-blue-600 transition-colors">
                  {it.Heading}
                </h3>

                {/* Info Grid - Modernized */}
                <div className="grid grid-cols-2 gap-6 mb-8 p-5 bg-slate-50 rounded-2xl">
                  <InfoItem label="Class" value={it.class} />
                  <InfoItem label="Duration" value={it.Duration} />
                  <InfoItem label="Language" value={it.Language} />
                  <InfoItem label="Batch Starts" value={it.starting_from} />
                </div>

                <button
                  onClick={() => setOpen(true)}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-blue-600 transform active:scale-[0.98] transition-all shadow-lg shadow-slate-200 hover:shadow-blue-200 mb-8"
                >
                  Enroll Now
                </button>

                {/* Student Testimonial */}
                <div className="pt-6 border-t border-slate-100">
                  {it.why.slice(0, 1).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={item.img}
                          alt={item.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-[8px] text-white font-bold px-1 rounded border border-white">
                          TOPPER
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <p className="text-sm font-bold text-slate-900">
                            {item.name}
                          </p>
                          <span className="text-emerald-600 text-xs font-bold">
                            {item.Rank}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 italic italic text-gray-500">
                          "{item.info}"
                        </p>
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
          <button className="px-10 py-4 bg-white border border-slate-200 text-slate-600 rounded-full font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
            Explore All Programs
          </button>
        </div>
      </div>
    </main>
  );
}

// Sub-component for clean code
function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">
        {label}
      </p>
      <p className="text-sm font-bold text-slate-800">{value}</p>
    </div>
  );
}
