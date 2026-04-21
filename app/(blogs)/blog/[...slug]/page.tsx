import React from "react";
import BlogPage from "@/components/(BlogSection)/BlogPage";
import { connectDB } from "@/lib/db/db";
import Blog from "@/lib/models/BlogSchema";
import { notFound } from "next/navigation";

// --- HELPER TO GET BLOG FROM DB ---
async function getSingleBlog(slugArray) {
  try {
    await connectDB();
    // Get the last part of the slug array
    const blogSlug = Array.isArray(slugArray) ? slugArray[slugArray.length - 1] : slugArray;
    
    // Find in MongoDB and convert to plain object
    const blog = await Blog.findOne({ slug: blogSlug }).lean();
    
    if (!blog) return null;
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

// --- GENERATE METADATA (SEO) ---
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);

  if (!blog) return { title: "Post Not Found" };

  return {
    title: blog.seo?.metaTitle || blog.title,
    description: blog.seo?.metaDescription || blog.excerpt,
    keywords: blog.seo?.keywords,
    openGraph: {
      title: blog.seo?.metaTitle,
      description: blog.seo?.metaDescription,
      images: [blog.featuredImage],
      type: "article",
      publishedTime: blog.publishedAt,
      authors: [blog.author?.name],
    },
  };
}

// --- MAIN PAGE COMPONENT ---
const Page = async ({ params }) => {
  const { slug } = await params;
  const blog = await getSingleBlog(slug);

  if (!blog) {
    return notFound(); // Shows the Next.js default 404 or your not-found.js
  }

  // Schema.org Logic
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.seo?.metaDescription,
    image: blog.featuredImage,
    author: {
      "@type": "Person",
      name: blog.author?.name || "ABC Institute",
    },
    datePublished: blog.publishedAt,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* UI Remains exactly as you provided */}
      <BlogPage data={blog} />
    </>
  );
};

export default Page;