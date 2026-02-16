"use client";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle2, Users, Rocket, Award } from "lucide-react";

const founders = [
  {
    name: "Mr. Shahid Ansari",
    title: "Founder of ABC Institutes",
    src: "/sirji.png",
    bio: "Visionary leader dedicated to transforming the educational landscape of Saharanpur through innovative teaching methodologies and excellence.",
  },
  {
    name: "Mr. Shakir Ansari",
    title: "Manager of ABC Institutes",
    src: "/sirji.png",
    bio: "Expert in operational strategy and governance, ensuring that the institution maintains the highest standards of student welfare and administrative efficiency.",
  },
];

const About = () => {
  return (
    <main className="bg-slate-50 min-h-screen overflow-hidden">
      {/* ===== Inspiration Section ===== */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-blue-600 font-bold tracking-[0.2em] uppercase text-sm mb-4 block">
            Our Mentors
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter">
            Honouring Our{" "}
            <span className="text-blue-600 italic">Inspiration</span>
          </h1>
          <div className="w-24 h-2 bg-blue-600 mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {founders.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group flex flex-col md:flex-row items-center gap-8 bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 border border-slate-100"
            >
              <div className="relative w-44 h-44 md:w-48 md:h-48 shrink-0">
                <div className="absolute inset-0 bg-blue-600 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform duration-500 opacity-10" />
                <Image
                  src={founder.src}
                  alt={founder.name}
                  fill
                  className="object-cover rounded-[2rem] shadow-inner border-2 border-white relative z-10"
                />
              </div>

              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-1">
                  {founder.name}
                </h3>
                <p className="text-blue-600 font-bold text-sm uppercase tracking-wide mb-4">
                  {founder.title}
                </p>
                <p className="text-slate-500 text-sm leading-relaxed italic">
                  "{founder.bio}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== Vision Section (Polished & Aligned) ===== */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-slate-900 rounded-[3.5rem] p-10 md:p-20 relative overflow-hidden shadow-2xl shadow-blue-900/20">
            {/* Artistic background elements */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-600/10 blur-[80px] rounded-full" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                  <Target className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 text-xs font-bold tracking-widest uppercase">
                    The Future
                  </span>
                </div>

                <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] mb-8">
                  Our Vision for <br />
                  <span className="text-blue-500 italic font-serif">
                    Education
                  </span>
                </h2>

                <div className="space-y-8">
                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <Rocket className="w-6 h-6 text-blue-400 group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xl mb-2">
                        Democratizing Access
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Breaking geographical and financial boundaries to ensure
                        every corner of India has access to premium learning
                        tools.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5 group">
                    <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300">
                      <Award className="w-6 h-6 text-blue-400 group-hover:text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-xl mb-2">
                        Uncompromising Quality
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Delivering a standard of education that competes
                        globally, while remaining the most affordable option
                        locally.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10">
                  <Image
                    src="/courosol/abc4.avif"
                    alt="Students Learning"
                    width={600}
                    height={600}
                    className="object-cover aspect-square hover:scale-105 transition-transform duration-700"
                  />
                </div>
                {/* Visual Accent */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-600 rounded-3xl -z-0 blur-2xl opacity-40" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Leadership Summary ===== */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-8">
              Leadership & Governance
            </h2>
            <p className="text-slate-500 text-lg md:text-xl leading-relaxed font-medium">
              We operate with total transparency. Our board ensures we stay true
              to our primary mission:
              <span className="text-blue-600 underline decoration-blue-200 underline-offset-4 ml-2">
                Empowering the next generation.
              </span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== Contact Form Section ===== */}
      <section className="pb-24 px-6 bg-slate-50">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-white rounded-[3rem] shadow-2xl shadow-slate-200 p-8 md:p-12 border border-slate-100"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900 mb-2">
              Join the Mission
            </h2>
            <p className="text-slate-500 font-medium">
              Have questions? We're here to help.
            </p>
          </div>

          <form className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
            </div>
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.01, backgroundColor: "#1e40af" }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-200 transition-all"
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
