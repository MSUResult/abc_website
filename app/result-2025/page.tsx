import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <main className="min-h-screen py-28 md:py-28   bg-gray-50">
      <h1 className="font-extrabold text-3xl md:text-5xl text-center mb-10 text-slate-800">
        ABC Saharanpur me padhai ka
        <span className="text-yellow-500  md:inline-block border-b-4 border-yellow-500  md:ml-4 ml-4">
          asli Leader
        </span>
      </h1>

      <div className="px-2 max-w-7xl mx-auto">
        {/* 1. The Container defines the height */}
        <div className="relative w-full h-[70vh] md:h-[320vh] rounded-2xl overflow-hidden shadow-2xl border-4 border-white">
          <Image
            src="/result/result.jpeg"
            alt="The result Image"
            fill // 2. This makes it fill the relative div above
            priority // 3. Good for images "above the fold"
            className="object-cover object-top" // 4. Cover fills the space; Top ensures faces aren't cut off
          />
        </div>
      </div>
    </main>
  );
};

export default Page;
