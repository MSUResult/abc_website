"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const founders = [
  {
    name: "Mr. Shahid Ansari",
    title: "Founder of ABC Institutes",
    src: "/sirji.png",
  },
  {
    name: "Mr. Shakir Ansari",
    title: "Manager of ABC Institutes",
    src: "/sirji.png",
  },
];

const About = () => {
  return (
    <main className="bg-slate-50 min-h-screen overflow-hidden">
      {/* ===== Inspiration Section ===== */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
            Honouring Our{" "}
            <span className="text-blue-600 italic">Inspiration</span>
          </h1>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-[2rem] shadow-xl shadow-blue-900/5 border border-blue-50/50"
            >
              {/* Image Container */}
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative w-48 h-48 md:w-56 md:h-56 shrink-0"
              >
                <div className="absolute inset-0 bg-blue-600 rounded-2xl rotate-6 -z-10 opacity-20" />
                <Image
                  src={founder.src}
                  alt={founder.name}
                  fill
                  className="object-cover rounded-2xl shadow-md border-4 border-white"
                />
              </motion.div>

              {/* Content */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900 leading-tight">
                  {founder.name}
                </h3>
                <p className="text-blue-600 font-semibold mb-3">
                  {founder.title}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Dedicated to transforming the educational landscape of
                  Saharanpur through innovation and excellence.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Leadership Section ===== */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white py-20 px-6 text-center border-y border-slate-100"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6">
            Leadership & Governance
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Driving clarity, accountability, and long-term direction across the
            organization. Our board ensures we stay true to our mission of
            affordable education.
          </p>
        </div>
      </motion.section>

      {/* ===== Contact Form Section ===== */}
      <section className="py-24 px-6 bg-slate-50">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 p-10 border border-slate-100"
        >
          <header className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900">Get in Touch</h2>
            <p className="text-slate-500 font-medium mt-2 text-lg">
              We&apos;d love to hear from you
            </p>
          </header>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="How can we help you?"
                className="w-full bg-slate-50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </section>
    </main>
  );
};

export default About;
