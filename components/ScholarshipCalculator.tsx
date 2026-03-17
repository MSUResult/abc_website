"use client";
import React, { useState, useEffect } from "react";
import scholarshipData from "../data/scholarships.json"; // Adjust path as needed

const ScholarshipCalculator = () => {
  const [programKey, setProgramKey] = useState("academic_senior");
  const [marks, setMarks] = useState("");
  const [result, setResult] = useState({ discount: 0, title: "" });

  useEffect(() => {
    const numericMarks = parseFloat(marks);
    if (!isNaN(numericMarks)) {
      const selected = scholarshipData[programKey];
      const tier = selected.tiers.find((t) => numericMarks >= t.min_marks);
      setResult({
        discount: tier ? tier.discount : 0,
        title: selected.title,
      });
    } else {
      setResult({ discount: 0, title: "" });
    }
  }, [marks, programKey]);

  return (
    <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
      <div className="bg-red-600 p-6 text-white">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <span>🎯</span> Instant Scholarship Check
        </h3>
        <p className="text-red-100 text-sm">
          Select your program and enter your marks
        </p>
      </div>

      <div className="p-8 space-y-6">
        {/* Step 1: Program */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2 block">
            Step 1: Choose Program
          </label>
          <div className="grid grid-cols-1 gap-2">
            {Object.keys(scholarshipData).map((key) => (
              <button
                key={key}
                onClick={() => setProgramKey(key)}
                className={`text-left p-4 rounded-xl border-2 transition-all ${
                  programKey === key
                    ? "border-red-600 bg-red-50 text-red-700"
                    : "border-slate-100 hover:border-slate-200 text-slate-600"
                }`}
              >
                <p className="font-bold">{scholarshipData[key].title}</p>
                <p className="text-xs opacity-70">
                  {scholarshipData[key].description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Marks */}
        <div>
          <label className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2 block">
            Step 2: Enter Percentage (%)
          </label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            placeholder="Enter your % (e.g. 92)"
            className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl focus:border-red-500 outline-none text-2xl font-bold text-red-900 transition-all"
          />
        </div>

        {/* Dynamic Result Area */}
        <div
          className={`p-6 rounded-2xl transition-all duration-500 text-center ${
            result.discount > 0
              ? "bg-yellow-400 shadow-lg scale-105"
              : "bg-slate-100 opacity-50"
          }`}
        >
          {result.discount > 0 ? (
            <>
              <p className="text-red-900 font-bold uppercase text-xs tracking-tighter">
                You Unlocked
              </p>
              <h4 className="text-5xl font-black text-red-900">
                {result.discount}% OFF
              </h4>
              <p className="text-red-800 text-sm mt-1 font-medium italic">
                Congratulations! Visit us to claim this.
              </p>
            </>
          ) : (
            <p className="text-slate-500 font-medium italic">
              Enter marks to see your discount
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCalculator;
