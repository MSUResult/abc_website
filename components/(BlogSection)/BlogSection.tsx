"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const BlogSection = ({ selectedTag, blogs = [] }) => {
  const safeBlogs = Array.isArray(blogs) ? blogs : [];

  const filteredBlogs = selectedTag
    ? safeBlogs.filter((blog) => blog.tag?.toLowerCase().trim() === selectedTag.toLowerCase().trim())
    : safeBlogs;

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
      {filteredBlogs.length > 0 ? (
        filteredBlogs.map((blog, index) => {
          const displayTitle = blog.title || "Untitled Post";
          const displayImage = (blog.featuredImage && blog.featuredImage.trim() !== "") 
            ? blog.featuredImage 
            : "/er.webp"; 
          const blogSlug = blog.slug || "#";
          const displayCategory = blog.category || "general";
          const previewText = blog.excerpt || 
            blog.content?.find((item) => item.type === "text")?.text || 
            "Read more about this update...";

          return (
            <Link
              href={`/blog/${displayCategory}/${blogSlug}`}
              key={blog._id || index}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full border border-white/20"
            >
              {/* IMAGE CONTAINER */}
              <div className="relative w-full aspect-[16/10] overflow-hidden">
                <Image
                  src={displayImage}
                  alt={displayTitle}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                {/* CATEGORY OVERLAY */}
                <div className="absolute top-4 left-4">
                   <span className="glass-morphism bg-white/80 backdrop-blur-md text-red-600 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full font-bold shadow-sm">
                    {blog.tag || "Update"}
                  </span>
                </div>
              </div>

              {/* TEXT CONTENT */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-bold text-xl text-slate-900 mb-3 leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
                  {displayTitle}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed line-clamp-3 mb-6">
                  {previewText}
                </p>
                
                {/* BOTTOM SECTION */}
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                   <span className="text-red-600 font-bold text-sm inline-flex items-center group-hover:gap-2 transition-all">
                    Read Article <span className="ml-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="col-span-full py-20 text-center">
          <p className="text-white/80 text-xl font-medium tracking-wide italic">
            No blogs found {selectedTag ? `for "${selectedTag}"` : "in database"}.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlogSection;