import React from "react";
import { FileText, Download, Eye, Calendar } from "lucide-react";

// Sample Data - You can fetch this from your DB later
const resources = [
  {
    id: 1,
    title: "JEE Main Full Mock Test - 01",
    type: "Upcoming",
    date: "March 10, 2026",
    pdfUrl: "/files/test1.pdf",
  },
  {
    id: 2,
    title: "Monthly Class Schedule - March",
    type: "Upcoming",
    date: "March 01, 2026",
    pdfUrl: "/files/timetable.pdf",
  },
  {
    id: 3,
    title: "NEET Practice Test - Biology",
    type: "Test Series",
    date: "March 10, 2026",
    pdfUrl: "/biology_TestSeries.pdf",
    // New ABC Ramban Test Series.pdf
  },
];

export default function TestSeriesPage() {
  return (
    <div className="min-h-screen mt-22 bg-gray-50 p-8">
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-blue-900">ABC Institute</h1>
        <p className="text-gray-600 mt-2">
          Access your Test Series and Timetables below
        </p>
      </header>

      {/* Grid Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${item.type === "Test Series" ? "bg-orange-100 text-orange-700" : "bg-green-100 text-green-700"}`}
              >
                {item.type}
              </span>
              <FileText className="text-gray-400" size={20} />
            </div>

            <h3 className="text-lg font-bold text-gray-800 mb-2">
              {item.title}
            </h3>

            <div className="flex items-center text-sm text-gray-500 mb-6">
              <Calendar size={14} className="mr-2" />
              {item.date}
            </div>

            <div className="flex gap-3">
              {/* Embed View Link */}
              <a
                href={item.pdfUrl}
                target="_blank"
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Eye size={16} /> View
              </a>

              {/* Direct Download Link */}
              <a
                href={item.pdfUrl}
                download
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
              >
                <Download size={16} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
