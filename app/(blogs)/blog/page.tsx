import React from "react";
import blogs from "@/data/tags.json"; // I renamed 'tags' to 'blogs' here so it makes more sense!
import Link from "next/link";
import BlogSection from "@/components/(BlogSection)/BlogSection";

const Page = async ({ searchParams }) => {
  // ✅ AWAIT the searchParams
  const params = await searchParams;
  const rawTag = params?.tag || null;
  const selectedTag = rawTag ? decodeURIComponent(rawTag) : null;

  // ✅ FIX 2: Extract UNIQUE tags from your data so buttons don't duplicate
  const uniqueTags = Array.from(new Set(blogs.map((blog) => blog.tag))).filter(
    Boolean,
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-800 via-red-600 to-red-500 text-white pt-28 pb-12 px-4">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mt-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          ABC Blog
        </h1>

        <p className="text-lg md:text-2xl font-medium mt-6 leading-relaxed">
          How we Transform{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-white font-bold">
            Saharanpur
          </span>{" "}
          Education Industry
        </p>
      </div>

      {/* Tags Section */}
      <section className="flex flex-wrap justify-center items-center gap-4 py-12 max-w-5xl mx-auto">
        {/* Added an "All" button to easily clear the filter */}
        <Link
          href="/blog"
          className={`px-5 py-2 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg ${
            !selectedTag
              ? "bg-white text-red-600 border-white"
              : "bg-white/10 border-white/30 hover:bg-white hover:text-red-600"
          }`}
        >
          All
        </Link>

        {uniqueTags.map((tag, index) => {
          // ✅ FIX 3: Safely encode the URL for the Link
          const generatedLink = `/blog?tag=${encodeURIComponent(tag)}`;
          const isActive = selectedTag === tag; // Check if this tag is currently selected

          return (
            <Link
              href={generatedLink}
              key={index}
              className={`px-5 py-2 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg ${
                isActive
                  ? "bg-white text-red-600 border-white"
                  : "bg-white/10 border-white/30 hover:bg-white hover:text-red-600"
              }`}
            >
              {tag}
            </Link>
          );
        })}
      </section>

      <section className="mt-6">
        <BlogSection selectedTag={selectedTag} />
      </section>
    </main>
  );
};

export default Page;
