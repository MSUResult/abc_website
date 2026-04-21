"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaRegClock, FaRegCalendarAlt, FaChevronRight, FaDownload, FaGraduationCap } from "react-icons/fa";

const BlogPage = ({ data }) => {
  if (!data) return <div className="p-20 text-center">Loading...</div>;

  const displayImage = data.featuredImage || "/placeholder.jpg";


const dateString = data.publishedAt ? new Date(data.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  }) : "March 2026";




  return (
    <main className="min-h-screen bg-white antialiased font-sans mt-22">
      
      

      {/* 1. IMAGE FIRST */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="relative w-full h-[300px] md:h-[550px] rounded-[2rem] overflow-hidden shadow-xl">
          <Image 
            src={displayImage} 
            alt={data.title} 
            fill 
            className="object-cover object-top"
            priority
          />
        </div>
      </div>

      {/* 2. TITLE & META SECTION */}
      <header className="max-w-4xl mx-auto px-6 pt-10 pb-12 text-center">
        <span className="bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-red-100 mb-6 inline-block">
          {data.tag || "Academic"}
        </span>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
          {data.title}
        </h1>
        <div className="flex items-center justify-center gap-6 text-slate-500 text-sm">
          <span className="font-bold text-slate-800 underline decoration-red-500 underline-offset-4">
            By {data.author?.name || "ABC Institute"}
          </span>
          <div className="flex items-center gap-2">
            <FaRegCalendarAlt className="text-red-500" />
            <span>{dateString}</span>
          </div>
        </div>
      </header>

      {/* 3. CONTENT & SIDEBAR */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-20">
        
        <div className="lg:col-span-8">
          <article className="prose prose-slate prose-lg max-w-none">
            {data.content.map((item, index) => {
              if (item.type === "heading") {
                return <h2 key={index} className="text-3xl font-bold text-slate-900 mt-10 mb-6">{item.text}</h2>;
              }
              if (item.type === "text") {
                return <p key={index} className="text-slate-600 leading-[1.8] mb-6">{item.text}</p>;
              }
              
              // NEW: AD SECTION IN CONTENT
              if (item.type === "ad") {
                return (
                  <div key={index} className="my-10 p-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl">
                    <div className="bg-white p-6 rounded-xl text-center">
                      <p className="text-xs font-bold text-slate-400 uppercase mb-2">Sponsored Content</p>
                      <h4 className="text-xl font-bold text-slate-800">New JEE/NEET Batch Starts Monday!</h4>
                      <button className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg font-bold">Enroll Now</button>
                    </div>
                  </div>
                );
              }

              if (item.type === "qa") {
                return (
                  <div key={index} className="my-8 bg-slate-50 p-8 rounded-3xl border-l-8 border-red-600">
                    <p className="font-bold text-slate-900 text-xl mb-2">Q: {item.question}</p>
                    <p className="text-slate-600 italic">"{item.answer}"</p>
                  </div>
                );
              }
              if (item.type === "pdf") {
                return (
                  <div key={index} className="my-8 p-6 bg-slate-900 rounded-2xl flex items-center justify-between text-white">
                    <div>
                      <p className="font-bold">{item.title}</p>
                      <p className="text-xs text-slate-400">PDF Document • 2.4 MB</p>
                    </div>
                    <a href={item.url} className="bg-red-600 text-white px-5 py-2 rounded-xl font-bold hover:bg-red-700 transition-all">
                      <FaDownload className="inline mr-2" /> Download
                    </a>
                  </div>
                );
              }
              return null;
            })}
          </article>
        </div>

        {/* SIDEBAR FOR ABC INSTITUTE */}
        <aside className="lg:col-span-4">
          <div className="sticky top-10 space-y-6">
            <div className="bg-red-600 rounded-[2rem] p-8 text-white shadow-xl">
              <FaGraduationCap className="text-4xl mb-4" />
              <h3 className="text-2xl font-bold mb-2">ABC Institute</h3>
              <p className="text-red-100 text-sm mb-6">India's Leading Coaching for JEE, NEET, and Foundation Courses.</p>
              <Link href="/scholarship" className="block text-center bg-white text-red-600 font-bold py-3 rounded-xl hover:scale-105 transition-transform">
                Apply for Scholarship
              </Link>
            </div>
            
            <div className="bg-slate-100 rounded-[2rem] p-8">
              <h4 className="font-bold text-slate-900 mb-4">Latest Updates</h4>
              <ul className="space-y-4 text-sm text-slate-600">
                <li className="hover:text-red-600 cursor-pointer">• NEET 2026 Revised Syllabus</li>
                <li className="hover:text-red-600 cursor-pointer">• JEE Main Session 2 Admit Card</li>
                <li className="hover:text-red-600 cursor-pointer">• Top 10 Engineering Colleges</li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default BlogPage;