"use client";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { sendCallbackMail } from "@/lib/actions/sendCallbackMail";

const ContactComing = ({ close }) => {
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return alert("Enter mobile number");

    const res = await sendCallbackMail(input);

    if (res.success) {
      alert("We Will Call You Shortly ✅");
      setInput("");
    } else {
      alert("Something went wrong ❌");
    }
  };

  return (
    <motion.main
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="relative z-50 max-w-md w-full bg-white shadow-2xl rounded-3xl p-8 flex flex-col items-center space-y-8"
    >
      {/* Main Card */}
      <div className="max-w-md w-full bg-white/90 backdrop-blur-md shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-3xl p-8 flex flex-col items-center space-y-10 border border-white/20">
        {/* Animated Logo Section */}
        <div className="relative group">
          {/* Glowing Background Effect */}
          <div className="absolute -inset-1 bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

          <div className="relative w-28 h-28 bg-white rounded-full p-2 shadow-inner flex items-center justify-center">
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gray-50">
              <Image
                src="/logo.jpeg"
                alt="Logo"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            Get Started
          </h1>
          <p className="text-gray-500 text-sm">
            Enter your mobile number to receive a callback.
          </p>
        </div>

        {/* Input Group */}
        <div className="w-full space-y-6">
          <div className="space-y-2">
            <div className="flex items-center border-2 border-gray-100 focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-500/10 rounded-2xl transition-all duration-300 bg-gray-50/50">
              {/* Country Code */}
              <div className="pl-4 pr-3 py-4 text-gray-500 font-medium border-r border-gray-200">
                +91
              </div>

              {/* Input */}
              <input
                type="tel"
                placeholder="00000-00000"
                className="flex-1 py-4 px-4 outline-none bg-transparent text-gray-800 font-medium placeholder:text-gray-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            {/* Call Guarantee Notice */}
            <div className="flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <p className="text-xs font-semibold text-gray-500">
                We'll call you back within 60 minutes
              </p>
            </div>
          </div>

          <button
            onClick={handleSend}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 transition-all duration-300 active:scale-[0.98]"
          >
            Request Callback
          </button>
        </div>
      </div>
    </motion.main>
  );
};

export default ContactComing;
