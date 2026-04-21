
// import React from 'react';
// import Link from 'next/link';
// import { notFound } from 'next/navigation';
// import { 
//   FileText, Share2, Bookmark, Clock, HelpCircle, 
//   Trophy, CheckCircle2, Play, Info, Award 
// } from 'lucide-react';
// import resources from "@/data/testSeries"; // Your central data file

// // Note: In Next.js 15/16, params is an async prop
// export default async function TestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = await params;
  
//   // Find the specific test data based on the URL slug
//   const testData = resources.find((item) => item.id.toString() === id);

//   if (!testData) {
//     return notFound(); // Shows the 404 page if ID doesn't exist
//   }

//   return (
//     <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 pt-20">
//       <div className="flex flex-col">
//         {/* Header - Simplified logic */}
//         <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 lg:px-40 sticky top-0 z-10">
//           <div className="flex items-center gap-4">
//             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600">
//               <FileText size={24} />
//             </div>
//             <h2 className="text-lg font-bold">Test Details</h2>
//           </div>
//           <div className="flex gap-3">
//             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 transition-colors">
//               <Share2 size={20} />
//             </button>
//           </div>
//         </header>

//         <main className="flex-1 flex justify-center py-8 px-6 lg:px-40">
//           <div className="max-w-[1100px] w-full flex flex-col gap-8">
            
//             {/* Header Section - Now Dynamic */}
//             <section className="flex flex-col gap-4">
//               <div className="flex flex-wrap items-center gap-2">
//                 <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-bold uppercase tracking-wider">
//                   {testData.category || "Medical Entrance"}
//                 </span>
//                 <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-xs font-bold uppercase tracking-wider">
//                   {testData.difficulty || "Moderate"}
//                 </span>
//               </div>
//               <div className="flex flex-col gap-2">
//                 <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
//                   {testData.title}
//                 </h1>
//                 <p className="text-slate-500 text-lg">
//                   {testData.description || "Comprehensive preparation based on the latest NTA pattern."}
//                 </p>
//               </div>
//             </section>

//             {/* Stats Grid */}
//             <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <StatBox icon={Clock} label="Duration" val="180 Mins" />
//               <StatBox icon={HelpCircle} label="Questions" val="200 MCQs" />
//               <StatBox icon={Trophy} label="Total Marks" val="720 Marks" />
//             </section>

//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//               <div className="lg:col-span-2 flex flex-col gap-8">
//                 {/* Test Overview */}
//                 <section className="flex flex-col gap-4">
//                   <h3 className="text-xl font-bold border-l-4 border-indigo-600 pl-4">Test Overview</h3>
//                   <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
//                     <p>{testData.overview || "This mock test is designed to simulate the actual exam environment."}</p>
//                   </div>
//                 </section>

//                 {/* Instructions */}
//                 <section className="flex flex-col gap-4">
//                   <h3 className="text-xl font-bold border-l-4 border-indigo-600 pl-4">Important Instructions</h3>
//                   <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
//                     <ul className="space-y-3">
//                       <InstructionItem text="Correct answer: +4 marks; Incorrect answer: -1 mark." />
//                       <InstructionItem text="The test will automatically submit when the timer reaches zero." />
//                     </ul>
//                   </div>
//                 </section>
//               </div>

//               {/* Sidebar / CTA Section */}
//               <aside className="lg:col-span-1">
//                 <div className="sticky top-28 bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-indigo-600 shadow-xl flex flex-col gap-6">
//                   <div className="text-center">
//                     <p className="text-sm text-slate-500">Ready to begin your attempt?</p>
//                   </div>
                  
//                   {/* NAVIGATION TO THE QUIZ */}
//                   <Link 
//                     href={`/test-series/${id}/quiz`}
//                     className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
//                   >
//                     <Play size={20} fill="currentColor" />
//                     Start Test
//                   </Link>

//                   <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
//                     <div className="flex items-center justify-between text-sm">
//                       <span className="text-slate-500">Language:</span>
//                       <span className="font-bold">English / Hindi</span>
//                     </div>
//                   </div>
//                 </div>
//               </aside>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

// // Use pt-20 okay always use thise here okay
// // Small Sub-components
// const StatBox = ({ icon: Icon, label, val }) => (
//   <div className="rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
//     <div className="flex items-center gap-2 text-indigo-600 mb-1">
//       <Icon size={18} />
//       <p className="text-xs font-semibold uppercase">{label}</p>
//     </div>
//     <p className="text-2xl font-black">{val}</p>
//   </div>
// );

// const InstructionItem = ({ text }) => (
//   <li className="flex gap-3 text-slate-600 dark:text-slate-300 text-sm">
//     <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
//     <span>{text}</span>
//   </li>
// );

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