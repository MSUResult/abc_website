"use client";

import React, { useEffect } from "react";
import { useQuiz } from "@/context/QuizContext";
import { useParams, useRouter } from "next/navigation";
import { Clock, CheckCircle2, Play, Loader2, BookOpen, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function QuizSessionPage() {
  const { id } = useParams();
  const router = useRouter();
  const { quizData, loading, fetchQuiz } = useQuiz();

  useEffect(() => {
    if (id) {
      fetchQuiz(id as string);
    }
  }, [id, fetchQuiz]);

  // 1. Premium Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50">
        <Loader2 className="w-10 h-10 text-red-600 animate-spin mb-4" />
        <p className="font-bold text-gray-500 animate-pulse">Loading Test Data...</p>
      </div>
    );
  }

  // 2. Handle missing data
  if (!quizData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-900">Quiz not found</h2>
        <p className="text-gray-500 mt-2">The test you are looking for does not exist or has been removed.</p>
        <button 
          onClick={() => router.back()} 
          className="mt-6 px-6 py-2 bg-gray-900 text-white rounded-xl font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    // Increased top padding (pt-32) to prevent the navbar from hiding the content
    <div className="min-h-screen bg-white/80 pt-32 pb-16 px-4 sm:px-6">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100/50 ring-1 ring-black/5"
      >
        {/* Header Section with Gradient */}
        <div className="bg-gradient-to-br from-red-600 to-red-800 p-10 sm:p-12 text-white relative overflow-hidden">
          {/* Decorative background circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl"></div>
          <div className="absolute bottom-0 right-32 -mb-16 w-40 h-40 rounded-full bg-black opacity-10 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-6 shadow-sm border border-white/20">
              <BookOpen size={16} />
              <span>Test Series</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight tracking-tight">
              {quizData.title}
            </h1>
            <p className="opacity-90 text-lg max-w-xl leading-relaxed">
              {quizData.overview}
            </p>
          </div>
        </div>

        <div className="p-8 sm:p-12">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-5 mb-10">
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
              <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Duration</p>
              <div className="flex items-center gap-3 text-gray-900 font-extrabold text-xl">
                <div className="p-2.5 bg-red-50 text-red-600 rounded-xl group-hover:scale-110 transition-transform">
                  <Clock size={22} />
                </div>
                {quizData.duration} Mins
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
              <p className="text-gray-400 text-xs uppercase font-bold tracking-wider mb-2">Total Marks</p>
              <div className="flex items-center gap-3 text-gray-900 font-extrabold text-xl">
                <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl group-hover:scale-110 transition-transform">
                  <CheckCircle2 size={22} />
                </div>
                {quizData.totalMarks} Points
              </div>
            </div>
          </div>

          {/* Instructions List */}
          <div className="mb-10">
            <h2 className="text-xl font-extrabold text-gray-900 mb-6 flex items-center gap-2">
               Important Instructions
            </h2>
            <motion.ul 
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
              className="space-y-4"
            >
              {quizData.instructions?.map((inst: string, index: number) => (
                <motion.li variants={itemVariants} key={index} className="flex gap-4 text-gray-600 leading-relaxed bg-gray-50/50 p-4 rounded-xl border border-gray-100/50">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-red-100 text-red-700 flex items-center justify-center text-sm font-bold shadow-sm">
                    {index + 1}
                  </span>
                  <span className="pt-0.5">{inst}</span>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          {/* Action Button */}
          <motion.button
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push(`/test-series/${id}/quiz`)}
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white py-5 rounded-2xl font-extrabold text-xl shadow-xl shadow-red-600/20 transition-all flex items-center justify-center gap-3 border border-red-500/20"
          >
            <Play size={24} fill="currentColor" />
            I am ready to Begin
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}