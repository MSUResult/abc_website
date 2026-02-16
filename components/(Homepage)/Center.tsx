"use client";
import { motion } from "framer-motion";
import localities from "@/data/location.json";
import Image from "next/image";
import { MapPin } from "lucide-react"; // Added for a pro look

export default function CenterVid() {
  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-20">
      {/* SECTION 1: HERO VIDEO */}
      <div className="relative h-[60vh] w-full  md:h-screen overflow-hidden">
        <video
          src="https://res.cloudinary.com/dkfe8naf5/video/upload/f_auto,q_auto,vc_auto/wncrfn2rkvv0idrt2iom.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/center/abc.png"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* PRO TIP: Use a Red-tinted gradient overlay for brand consistency */}

        {/* <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-6"
        >
          <h1 className="text-4xl md:text-7xl font-black text-white mb-4 tracking-tighter uppercase">
            Tech Enabled <span className="text-primary italic">ABC</span>
          </h1>
          <p className="text-base md:text-xl text-white/80 font-medium max-w-2xl mx-auto leading-relaxed">
            Revolutionizing education in Saharanpur with India's most advanced
            learning centers.
          </p>
        </motion.div> */}
      </div>

      {/* SECTION 2: THE OVERLAP CARD */}
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
          className="relative z-20 -mt-20 md:-mt-32 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(220,38,38,0.15)] p-6 md:p-12 border border-gray-100"
        >
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div className="text-left">
              <span className="text-primary font-bold uppercase tracking-widest text-xs mb-2 block">
                Our Presence
              </span>
              <h2 className="text-2xl md:text-4xl font-black text-gray-900">
                Find an ABC Center <br /> Near You
              </h2>
            </div>
            <div className="bg-red-50 px-6 py-3 rounded-2xl border border-red-100">
              <p className="text-sm font-bold text-gray-600">
                Currently in{" "}
                <span className="text-primary text-lg">
                  {localities.length}
                </span>{" "}
                Localities
              </p>
            </div>
          </div>

          {/* Locations Grid with Staggered Animation */}
          <motion.div
            variants={containerVars}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {localities.map((locality, index) => (
              <motion.div
                key={index}
                variants={itemVars}
                whileHover={{ y: -5 }}
                className="group flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer"
              >
                <div className="relative h-16 w-16 md:h-20 md:w-20 shrink-0 overflow-hidden rounded-xl border-2 border-transparent group-hover:border-primary/20 transition-all">
                  <Image
                    src={locality.image || "/center/abc.png"}
                    fill
                    alt={locality.Location}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-1 text-primary mb-1">
                    <MapPin
                      size={14}
                      fill="currentColor"
                      className="opacity-80"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">
                      Saharanpur
                    </span>
                  </div>

                  <p className="font-extrabold text-gray-900 group-hover:text-primary transition-colors">
                    {locality.Area}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
