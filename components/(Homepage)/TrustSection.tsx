"use client";
import React from "react";
import { motion } from "framer-motion";
import { FaVideo, FaBook, FaUserGraduate, FaSchool } from "react-icons/fa";

const CardContent = [
  {
    icon: <FaVideo />,
    heading: "Daily Live",
    para: "Interactive Classes",
    // FIXED: Changed from hardcoded red-500 to our theme primary
    color: "text-primary",
  },
  {
    icon: <FaBook />,
    heading: "10 Million +",
    para: "Tests & Notes",
    // FIXED: Changed from blue to primary
    color: "text-primary",
  },
  {
    icon: <FaUserGraduate />,
    heading: "24 x 7",
    para: "Doubt Solving",
    // FIXED: Changed from orange to primary
    color: "text-primary",
  },
  {
    icon: <FaSchool />,
    heading: "100 +",
    para: "Offline Centres",
    // FIXED: Changed from green to primary
    color: "text-primary",
  },
];

const TrustSection = () => {
  return (
    // bg-gray-50 is perfect - it makes the white cards "pop"
    <section className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            // Text-gray-900 is the correct "Professional Black"
            className="text-3xl font-extrabold text-gray-900 mb-2"
          >
            A Platform Trusted by Students
          </motion.p>
          <p className="text-xl text-gray-500">
            ABC Institute provides results that speak louder than words.
          </p>
        </div>

        {/* The Card Container */}
        <div className="flex flex-col md:flex-row bg-white rounded-[2.5rem] shadow-xl shadow-red-100/50 overflow-hidden border border-gray-100">
          {CardContent.map((it, index) => (
            <motion.div
              key={index}
              className="relative flex-1 group cursor-pointer border-b md:border-b-0 md:border-r border-gray-100 last:border-0"
              whileHover="hover"
              initial="initial"
            >
              <div className="flex flex-col items-center justify-center p-12 text-center h-full relative z-10">
                {/* ICON ANIMATION */}
                <motion.div
                  variants={{
                    initial: { y: 0, scale: 1, opacity: 0.8 },
                    hover: { y: -10, scale: 1.2, opacity: 1 },
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`text-5xl mb-4 ${it.color} transition-colors`}
                >
                  {it.icon}
                </motion.div>

                {/* TEXT ANIMATION */}
                <motion.div
                  variants={{
                    initial: { y: 0 },
                    hover: { y: -5 },
                  }}
                >
                  <p className="text-2xl font-black text-gray-900 tracking-tight">
                    {it.heading}
                  </p>
                  <p className="text-sm text-primary font-bold uppercase tracking-widest mt-1">
                    {it.para}
                  </p>
                </motion.div>

                {/* HOVER BACKGROUND GLOW */}
                {/* Changed to a very light red glow on hover */}
                <motion.div
                  className="absolute inset-0 bg-red-50 opacity-0 -z-10"
                  variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1 },
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
