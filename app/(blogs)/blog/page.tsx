import React from "react";
import Link from "next/link";
import BlogSection from "@/components/(BlogSection)/BlogSection";
import { connectDB } from "@/lib/db/db"; // Import your DB connection
import Blog from "@/lib/models/BlogSchema"; // Import your Model

// ✅ Instead of fetching via URL, we go straight to the Database
export const revalidate = 3600; // 1 hour

async function getBlogs() {
  try {
    await connectDB();
    // Fetch from MongoDB directly
    const blogs = await Blog.find({}).sort({ publishedAt: -1 }).lean();
    
    // Convert MongoDB _id to string so Next.js doesn't complain
    return JSON.parse(JSON.stringify(blogs));
  } catch (err) {
    // console.error("❌ DATABASE ERROR:", err.message);
    return [];
  }
}

const Page = async ({ searchParams }) => {
  const params = await searchParams;
  const rawTag = params?.tag || null;
  const selectedTag = rawTag ? decodeURIComponent(rawTag) : null;

  // This is now a direct DB call! No 404 possible.
  const blogs = await getBlogs();
  // console.log("💎 MONGODB DATA LOADED:", blogs.length);

  const uniqueTags = Array.from(new Set(blogs.map((blog) => blog.tag))).filter(Boolean);

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-800 via-red-600 to-red-500 text-white pt-28 pb-12 px-4">
      {/* ... Your UI remains exactly the same ... */}
      <div className="max-w-4xl mx-auto text-center mt-10">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">ABC Blog</h1>
        <p className="text-lg md:text-2xl font-medium mt-6 leading-relaxed">
          How we Transform <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-white font-bold">Saharanpur</span> Education Industry
        </p>
      </div>

      <section className="flex flex-wrap justify-center items-center gap-4 py-12 max-w-5xl mx-auto">
        <Link href="/blog" className={`px-5 py-2 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg ${!selectedTag ? "bg-white text-red-600 border-white" : "bg-white/10 border-white/30 hover:bg-white hover:text-red-600"}`}>All</Link>
        {uniqueTags.map((tag, index) => (
          <Link key={index} href={`/blog?tag=${encodeURIComponent(tag)}`} className={`px-5 py-2 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg ${selectedTag === tag ? "bg-white text-red-600 border-white" : "bg-white/10 border-white/30 hover:bg-white hover:text-red-600"}`}>
            {tag}
          </Link>
        ))}
      </section>

      <section className="mt-6">
        <BlogSection selectedTag={selectedTag} blogs={blogs} />
      </section>
    </main>
  );
};

export default Page;