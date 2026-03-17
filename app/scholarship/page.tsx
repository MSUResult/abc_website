import React from "react";
import ScholarshipCalculator from "@/components/ScholarshipCalculator";

const ScholarshipPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans mt-22">
      {/* Hero */}
      <header className="py-16 bg-red-700 text-white text-center">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-black mb-4">
            ABC Scholarship Program 2026
          </h1>
          <p className="text-red-100 text-lg max-w-2xl mx-auto">
            Supporting the bright students of Saharanpur with up to 60% fee
            waivers for our premium academic programs.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-black text-red-900 mb-4">
                Your Talent, Our Commitment.
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                At ABC Institute, we don't just teach; we invest in your future.
                Our scholarship program is designed to make world-class
                education accessible to everyone in Saharanpur.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex-1">
                <p className="text-2xl font-bold text-red-600">60%</p>
                <p className="text-xs text-slate-500 font-bold uppercase">
                  Max Discount
                </p>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex-1">
                <p className="text-2xl font-bold text-red-600">22+</p>
                <p className="text-xs text-slate-500 font-bold uppercase">
                  Years Excellence
                </p>
              </div>
            </div>

            <img
              src="/sholorship.jpeg"
              className="rounded-3xl shadow-xl w-full object-cover h-auto border-4 border-white"
              alt="ABC Saharanpur"
            />
          </div>

          {/* Calculator Section */}
          <div>
            <ScholarshipCalculator />
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 text-center">
          {["Verified Merit", "Saharanpur Roots", "Direct Admission"].map(
            (title, i) => (
              <div
                key={i}
                className="group p-8 bg-white rounded-3xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
              >
                <div className="w-12 h-12 bg-red-100 group-hover:bg-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-xl">⭐</span>
                </div>
                <h3 className="font-bold text-xl mb-2">{title}</h3>
                <p className="text-sm opacity-70">
                  Dedicated support system for every aspiring student at ABC
                  Institute.
                </p>
              </div>
            ),
          )}
        </div>
      </main>
    </div>
  );
};

export default ScholarshipPage;
