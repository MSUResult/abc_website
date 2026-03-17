"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Atom,
  Cpu,
  GraduationCap,
  ArrowUpRight,
} from "lucide-react";

const CardContent = [
  {
    icon: <Stethoscope size={32} />,
    heading: "NEET Prep",
    para: "Specialized coaching for medical aspirants with top-tier faculty.",
    color: "text-red-600",
    shadow: "hover:shadow-red-500/20",
    border: "group-hover:border-red-200",
    bg: "bg-red-50",
  },
  {
    icon: <Cpu size={32} />,
    heading: "JEE Main",
    para: "Master the fundamentals of engineering with interactive modules.",
    color: "text-blue-600",
    shadow: "hover:shadow-blue-500/20",
    border: "group-hover:border-blue-200",
    bg: "bg-blue-50",
  },
  {
    icon: <Atom size={32} />,
    heading: "JEE Advanced",
    para: "Elite problem-solving techniques for the toughest IIT entrance.",
    color: "text-purple-600",
    shadow: "hover:shadow-purple-500/20",
    border: "group-hover:border-purple-200",
    bg: "bg-purple-50",
  },
  {
    icon: <GraduationCap size={32} />,
    heading: "Foundation",
    para: "Building logical thinking and strong basics for junior classes.",
    color: "text-emerald-600",
    shadow: "hover:shadow-emerald-500/20",
    border: "group-hover:border-emerald-200",
    bg: "bg-emerald-50",
  },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const TrustSection = () => {
  return (
    <section className="bg-[#f8fafc] py-24 relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4"
          >
            A Platform Trusted by{" "}
            <span className="text-blue-600">Future Leaders</span>
          </motion.h2>
          <p className="text-lg text-slate-600">
            Empowering students with personalized learning paths and proven
            results.
          </p>
        </div>

        {/* Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {CardContent.map((it, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`group relative bg-white p-8 rounded-3xl border border-slate-200 transition-all duration-300 shadow-sm ${it.shadow} ${it.border}`}
            >
              {/* Icon Container */}
              <div
                className={`w-14 h-14 rounded-2xl ${it.bg} ${it.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                {it.icon}
              </div>

              {/* Text Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  {it.heading}
                </h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {it.para}
                </p>
              </div>

              {/* Action Button (Visible on Hover) */}
              <div className="mt-6 flex items-center text-sm font-semibold text-slate-400 group-hover:text-slate-900 transition-colors">
                <span>Learn more</span>
                <ArrowUpRight size={16} className="ml-1 translate-y-0.5" />
              </div>

              {/* Subtle Gradient Glow */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl bg-gradient-to-br from-transparent to-white pointer-events-none -z-10`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSection;
