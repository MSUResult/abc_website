"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import blogs from "@/data/tags.json";

const BlogSection = ({ selectedTag }) => {
  // ✅ Now that selectedTag is safely decoded in the parent, this filter will work perfectly

  console.log("Selected Tag:", selectedTag);
  console.log(
    "All blog tags:",
    blogs.map((b) => b.tag),
  );
  const filteredBlogs = selectedTag
    ? blogs.filter((blog) => {
        const matches =
          blog.tag?.toLowerCase().trim() === selectedTag.toLowerCase().trim();
        console.log(`Comparing "${blog.tag}" with "${selectedTag}":`, matches);
        return matches;
      })
    : blogs;

  console.log("Filtered blogs:", filteredBlogs.length);

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 p-6">
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog, index) => {
          const displayTitle = blog.title || "Untitled Post";
          const displayContent = blog.content || [];
          const displayTag = blog.tag || "General";
          const displayImage = blog.featuredImage || "/er.webp";
          const blogSlug = blog.slug;
          const displayCategory = blog.category || "";

          const previewText =
            displayContent.find((item) => item.type === "text")?.text || "";

          return (
            <Link
              href={`/blog/${displayCategory}/${blogSlug}`}
              key={index}
              className="bg-red-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-red-100 flex flex-col"
            >
              <div className="relative w-full h-48">
                <Image
                  src={displayImage}
                  alt={displayTitle}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {displayTitle}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {previewText}
                  </p>
                </div>

                <div className="mt-4">
                  <span className="text-xs uppercase tracking-wide bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                    {displayTag}
                  </span>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="col-span-full py-20 text-center">
          {/* ✅ FIX: Removed the hyphen replacer since your data uses spaces */}
          <p className="text-gray-200 text-lg">
            No blogs found for "{selectedTag}"
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogSection;
