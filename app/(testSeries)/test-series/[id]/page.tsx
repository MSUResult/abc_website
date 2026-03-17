
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  FileText, Share2, Bookmark, Clock, HelpCircle, 
  Trophy, CheckCircle2, Play, Info, Award 
} from 'lucide-react';
import resources from "@/data/testSeries"; // Your central data file

// Note: In Next.js 15/16, params is an async prop
export default async function TestDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Find the specific test data based on the URL slug
  const testData = resources.find((item) => item.id.toString() === id);

  if (!testData) {
    return notFound(); // Shows the 404 page if ID doesn't exist
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 pt-20">
      <div className="flex flex-col">
        {/* Header - Simplified logic */}
        <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-4 lg:px-40 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600">
              <FileText size={24} />
            </div>
            <h2 className="text-lg font-bold">Test Details</h2>
          </div>
          <div className="flex gap-3">
            <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-100 transition-colors">
              <Share2 size={20} />
            </button>
          </div>
        </header>

        <main className="flex-1 flex justify-center py-8 px-6 lg:px-40">
          <div className="max-w-[1100px] w-full flex flex-col gap-8">
            
            {/* Header Section - Now Dynamic */}
            <section className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 text-xs font-bold uppercase tracking-wider">
                  {testData.category || "Medical Entrance"}
                </span>
                <span className="px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 text-xs font-bold uppercase tracking-wider">
                  {testData.difficulty || "Moderate"}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white">
                  {testData.title}
                </h1>
                <p className="text-slate-500 text-lg">
                  {testData.description || "Comprehensive preparation based on the latest NTA pattern."}
                </p>
              </div>
            </section>

            {/* Stats Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatBox icon={Clock} label="Duration" val="180 Mins" />
              <StatBox icon={HelpCircle} label="Questions" val="200 MCQs" />
              <StatBox icon={Trophy} label="Total Marks" val="720 Marks" />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 flex flex-col gap-8">
                {/* Test Overview */}
                <section className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold border-l-4 border-indigo-600 pl-4">Test Overview</h3>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 leading-relaxed">
                    <p>{testData.overview || "This mock test is designed to simulate the actual exam environment."}</p>
                  </div>
                </section>

                {/* Instructions */}
                <section className="flex flex-col gap-4">
                  <h3 className="text-xl font-bold border-l-4 border-indigo-600 pl-4">Important Instructions</h3>
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                    <ul className="space-y-3">
                      <InstructionItem text="Correct answer: +4 marks; Incorrect answer: -1 mark." />
                      <InstructionItem text="The test will automatically submit when the timer reaches zero." />
                    </ul>
                  </div>
                </section>
              </div>

              {/* Sidebar / CTA Section */}
              <aside className="lg:col-span-1">
                <div className="sticky top-28 bg-white dark:bg-slate-900 p-6 rounded-2xl border-2 border-indigo-600 shadow-xl flex flex-col gap-6">
                  <div className="text-center">
                    <p className="text-sm text-slate-500">Ready to begin your attempt?</p>
                  </div>
                  
                  {/* NAVIGATION TO THE QUIZ */}
                  <Link 
                    href={`/test-series/${id}/quiz`}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all"
                  >
                    <Play size={20} fill="currentColor" />
                    Start Test
                  </Link>

                  <div className="flex flex-col gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Language:</span>
                      <span className="font-bold">English / Hindi</span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Use pt-20 okay always use thise here okay
// Small Sub-components
const StatBox = ({ icon: Icon, label, val }) => (
  <div className="rounded-xl p-6 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
    <div className="flex items-center gap-2 text-indigo-600 mb-1">
      <Icon size={18} />
      <p className="text-xs font-semibold uppercase">{label}</p>
    </div>
    <p className="text-2xl font-black">{val}</p>
  </div>
);

const InstructionItem = ({ text }) => (
  <li className="flex gap-3 text-slate-600 dark:text-slate-300 text-sm">
    <CheckCircle2 size={18} className="text-green-500 flex-shrink-0" />
    <span>{text}</span>
  </li>
);