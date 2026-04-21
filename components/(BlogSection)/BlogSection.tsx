"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogSection = ({ selectedTag, blogs = [] }) => {
  // 1. Safety Check: Ensure blogs is always an array
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  const filteredBlogs = selectedTag
    ? safeBlogs.filter((blog) => {
        return blog.tag?.toLowerCase().trim() === selectedTag.toLowerCase().trim();
      })
    : safeBlogs;

  return (
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 p-6">
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog, index) => {
          const displayTitle = blog.title || "Untitled Post";
          
          // FIX: Better image fallback logic
          const displayImage = (blog.featuredImage && blog.featuredImage.trim() !== "") 
            ? blog.featuredImage 
            : "/er.webp"; 

          const blogSlug = blog.slug || "#";
          const displayCategory = blog.category || "general";

          // FIX: Content preview safety
          const previewText = blog.excerpt || 
            blog.content?.find((item) => item.type === "text")?.text || 
            "Read more about this update...";

          return (
            <Link
              href={`/blog/${displayCategory}/${blogSlug}`}
              key={blog._id || index}
              className="bg-red-50 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-red-100 flex flex-col min-h-[400px]"
            >
              <div className="relative w-full h-56 bg-gray-200">
                <Image
                  src={displayImage}
                  alt={displayTitle}
                  fill
                  className="object-cover object-top"
                  unoptimized // Add this if you're using external images or empty strings to prevent loader errors
                />
              </div>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">
                    {displayTitle}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {previewText}
                  </p>
                </div>

                <div className="mt-4">
                  <span className="text-xs uppercase tracking-wide bg-red-100 text-red-600 px-3 py-1 rounded-full font-semibold">
                    {blog.tag || "Update"}
                  </span>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="col-span-full py-20 text-center">
          <p className="text-white text-lg">
            No blogs found {selectedTag ? `for "${selectedTag}"` : "in database"}.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogSection;