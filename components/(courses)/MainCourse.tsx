"use client";

import { useState } from "react";
import data from "@/data/course.json";
import Image from "next/image";
import ContactComing from "../(Homepage)/ContactComing";

const UpcomingCourse = [
  {
    Heading: "🚨 Last 5 Seats Left – NEET 2026 Crash Course",
    Content:
      "Final revision program designed for serious NEET aspirants. Boost your score with rapid concept clarity, smart test strategy, and exam-focused preparation under Shahid Ansari Sir.",
  },
];

const MainCourse = () => {
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState(false);

  const FilterData =
    filter && filter !== "All"
      ? data.filter((dat) => dat.type === filter)
      : data;

  const buttons = ["All", "NEET", "JEE", "Foundation", "NEET Crash Course"];

  return (
    <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 md:px-10 bg-gray-50">
      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />
          <ContactComing close={() => setOpen(false)} />
        </div>
      )}

      {/* Hero / Upcoming Course Banner */}
      <section className="max-w-7xl mx-auto bg-gradient-to-br from-red-600 to-red-800 rounded-3xl shadow-xl overflow-hidden mb-16">
        {UpcomingCourse.map((course, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-stretch gap-0 py-4"
          >
            {/* Left Side - Image Container with correct aspect ratio */}
            <div className="relative w-full md:w-1/2 min-h-[300px] md:min-h-[200px] overflow-hidden ">
              <Image
                src="/courosol/abcinst.jpeg"
                alt="NEET Crash Course"
                fill
                className="object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Right Side - Content */}
            <div className="w-full md:w-1/2 text-white p-8 md:p-12 flex flex-col justify-center">
              <span className="self-start mb-4 bg-yellow-400 text-red-900 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                Starting 5 March
              </span>

              <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                {course.Heading}
              </h2>

              <p className="text-lg text-red-100 leading-relaxed mb-8">
                {course.Content}
              </p>

              <button
                onClick={() => setOpen(true)}
                className="self-start bg-white text-red-700 font-bold px-8 py-3.5 rounded-xl shadow-md hover:bg-gray-100 transition-colors focus:ring-4 focus:ring-red-400"
              >
                Secure Your Seat Now
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* Courses Section */}
      <div className="max-w-7xl mx-auto">
        <section className="max-w-3xl mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Explore Our Courses
          </h1>
          <p className="text-gray-600 text-lg mt-4 leading-relaxed">
            Join the ranks of our top-performing students. Our courses feature
            expert faculty, optimized schedules, and a proven curriculum.
          </p>
        </section>

        {/* Filter Buttons */}
        <section className="mb-12 flex flex-wrap gap-3">
          {buttons.map((but, index) => (
            <button
              key={index}
              onClick={() => setFilter(but)}
              className={`py-2 px-6 rounded-full font-semibold transition-colors duration-200 text-sm md:text-base shadow-sm border
                ${
                  filter === but
                    ? "bg-blue-600 border-blue-600 text-white"
                    : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600"
                }`}
            >
              {but}
            </button>
          ))}
        </section>

        {/* Courses Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FilterData.map((course, index) => (
            <div
              key={index}
              className="flex flex-col bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6 flex-grow">
                {/* Badge placed ABOVE heading to prevent text collision */}
                <div className="mb-4">
                  <span className="inline-block bg-blue-50 text-blue-700 border border-blue-100 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wide">
                    {course.type}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 leading-snug mb-6 line-clamp-2">
                  {course.Heading}
                </h2>

                {/* Grid layout for details instead of clumsy long lists */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Class
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {course.class}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Duration
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {course.Duration}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Language
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {course.Language}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium mb-1">
                      Batches
                    </p>
                    <p className="text-sm font-semibold text-gray-900">
                      {course.Batches}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-gray-50 p-4 rounded-xl border border-gray-100 mb-6">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Starts From
                  </span>
                  <span className="font-bold text-gray-900">
                    {course.starting_from}
                  </span>
                </div>

                {/* Testimonial Section - Compacted so cards stay neat */}
                {course.why && course.why.length > 0 && (
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Student Success
                    </p>
                    {course.why.slice(0, 1).map((student, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <img
                          src={student.img}
                          alt={student.name}
                          className="w-10 h-10 rounded-full object-cover shadow-sm ring-1 ring-gray-200"
                        />
                        <div>
                          <p className="font-bold text-gray-900 text-sm">
                            {student.name}
                          </p>
                          <p className="text-xs text-blue-600 font-semibold mb-0.5 line-clamp-1">
                            {student.Rank} • {student.info}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Enroll Button locked to the bottom without extreme scaling */}
              <div className="p-6 pt-0 mt-auto">
                <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md transition-all flex justify-center items-center gap-2">
                  Enroll Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
            </div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default MainCourse;
