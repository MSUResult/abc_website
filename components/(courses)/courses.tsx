"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "../../data/course.json";
import ContactComing from "../(Homepage)/ContactComing";

const TABS = [
  { label: "JEE", value: "JEE" },
  { label: "NEET", value: "NEET" },
  { label: "Foundation", value: "Foundation" },
  { label: "Class 6-12", value: ["6-8", "9-10", "11-12"] },
  { label: "Crash Course", value: "NEET Crash Course" },
];

export default function Courses() {
  const [choose, setChoose] = useState("JEE");
  const [open, setOpen] = useState(false);

  // Updated filter logic to handle array values (for Class 6-12 tab)
  const filteredCourses = data.filter((it) =>
    Array.isArray(choose) ? choose.includes(it.type) : it.type === choose,
  );

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 px-4 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <ContactComing close={() => setOpen(false)} />
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <header className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Academic <span className="text-red-600">Programs</span>
          </h1>
          <p className="text-slate-600 text-base md:text-lg font-medium">
            Expert-led courses in Saharanpur designed to help students excel in
            national exams.
          </p>
        </header>

        {/* FILTER TABS */}
        <nav className="flex justify-center mb-12">
          <div className="inline-flex flex-wrap justify-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl md:rounded-full shadow-sm">
            {TABS.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setChoose(tab.value)}
                className={`relative px-5 py-2 rounded-xl md:rounded-full text-xs md:text-sm font-bold transition-all duration-200 ${
                  JSON.stringify(choose) === JSON.stringify(tab.value)
                    ? "bg-red-600 text-white shadow-md shadow-blue-200"
                    : "text-slate-500 hover:bg-red-50 hover:text-red-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* COURSE GRID */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((it) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={it.Heading}
                className="flex flex-col bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-blue-400 hover:shadow-xl transition-all duration-300"
              >
                <div className="p-6 flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-[10px] uppercase font-bold rounded-lg border border-blue-100">
                        {it.type}
                      </span>
                      {it.batch && (
                        <span className="px-2.5 py-1 bg-red-900 text-white text-[10px] uppercase font-bold rounded-lg">
                          {it.batch} Batch
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-red-900 mb-4 leading-tight min-h-[3rem]">
                    {it.Heading}
                  </h3>

                  {/* Info Grid - Updated for Score/Eligibility */}
                  <div className="grid grid-cols-2 gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <InfoItem label="For Class" value={it.class} />
                    <InfoItem label="Duration" value={it.Duration} />
                    <div className="col-span-2 pt-2 border-t border-slate-200/60">
                      <p className="text-[9px] uppercase tracking-wider text-blue-500 font-black mb-0.5">
                        Target / Eligibility
                      </p>
                      <p className="text-xs font-bold text-red-800">
                        {it.eligibility || "Open Enrollment"}
                      </p>
                    </div>
                  </div>

                  {/* Results Section */}
                  {it.why && it.why.length > 0 && (
                    <div className="pt-4 border-t border-slate-100">
                      {it.why.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-10 h-10 object-top rounded-full bg-red-100 object-cover"
                          />
                          <div className="overflow-hidden">
                            <div className="flex items-center gap-2">
                              <p className="text-xs font-bold text-red-900 truncate">
                                {item.name}
                              </p>
                              <span className="text-emerald-600 text-[10px] font-black px-1.5 py-0.5 bg-emerald-50 rounded border border-emerald-100">
                                {item.Rank}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 truncate mt-0.5">
                              {item.info}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-6 pb-6 mt-auto">
                  <button
                    onClick={() => setOpen(true)}
                    className="w-full bg-red-900 text-white py-3 rounded-xl font-bold hover:bg-red-400 transition-all active:scale-95"
                  >
                    Enroll Now
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}

function InfoItem({ label, value }) {
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wider text-slate-400 font-bold mb-0.5">
        {label}
      </p>
      <p className="text-xs font-bold text-red-800 truncate">{value}</p>
    </div>
  );
}
