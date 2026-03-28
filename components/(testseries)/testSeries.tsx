"use client";
import React from "react";
import { Calendar, Eye, Lock, Clock } from "lucide-react";
import Link from "next/link";
import resources from "@/data/testSeries";

const TestSeries = () => {
  const now = new Date();

  // Helper for full date (e.g., 17 Mar 2026)
  const formatFullDate = (dateString: string) => {
    if (!dateString) return "TBD";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Helper for button date (e.g., 17 Mar) - keeps it "little"
  const formatShortDate = (dateString: string) => {
    if (!dateString) return "Soon";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 max-w-6xl mx-auto">
      {resources?.map((item) => {
        const startDate = new Date(item.startDate);
        const isValidDate = !isNaN(startDate.getTime());
        const isUpcoming = now < startDate;
        const isLive = now >= startDate;

        return (
          <div
            key={item.id}
            className={`group relative bg-white rounded-2xl border transition-all duration-300 ${
              isLive
                ? "border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1"
                : "border-gray-100 bg-gray-50/30"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`flex h-2 w-2 rounded-full ${isLive ? "bg-emerald-500 animate-pulse" : "bg-gray-300"}`}
                  />
                  <span
                    className={`text-[11px] font-bold uppercase tracking-widest ${isLive ? "text-emerald-600" : "text-gray-400"}`}
                  >
                    {isLive ? "Live Now" : "Upcoming"}
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-white text-gray-500 border border-gray-100 shadow-sm uppercase">
                  {item.type || "Mock Test"}
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-gray-900 mb-2 line-clamp-1 group-hover:text-red-600 transition-colors">
                {item.title}
              </h3>

              <div className="flex items-center text-sm text-gray-500 mb-8">
                <Clock size={14} className="mr-2 text-gray-400" />
                <span className="font-medium">
                  Scheduled: {formatFullDate(item.startDate)}
                </span>
              </div>

              {isLive ? (
                <Link
                  href={`/test-series/${item.id}`}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 text-white py-3.5 rounded-xl hover:bg-red-700 transition-all font-bold shadow-md hover:shadow-red-200 active:scale-95"
                >
                  <Eye size={18} />
                  Start Test Now
                </Link>
              ) : (
                <div className="w-full flex items-center justify-center gap-2 bg-gray-100 text-gray-400 py-3.5 rounded-xl font-bold border border-gray-200 cursor-not-allowed">
                  <Lock size={16} />
                  Unlocks on {formatShortDate(item.startDate)}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TestSeries;
