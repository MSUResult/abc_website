import React from "react";
import data from "@/data/tags.json";
import BlogPage from "@/components/(BlogSection)/BlogPage";

const page = async ({ params }) => {
  // 1. Next.js 15+ requires awaiting params
  const { slug } = await params;

  // 2. SMART SLUG LOGIC:
  // We need to handle if 'slug' is an array (from [...slug]) or a string (from [slug])
  let blogSlug;

  if (Array.isArray(slug)) {
    // If it's an array like ['category', 'post-name'], take the last item
    blogSlug = slug[slug.length - 1];
  } else {
    // If it's just a string like 'post-name'
    blogSlug = slug;
  }

  // 3. Find the blog post
  const blog = data.find((item) => item.slug === blogSlug);

  // 4. Handle 404 (Not Found)
  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-500">
          Blog Post Not Found
        </h1>
      </div>
    );
  }

  // 5. RETURN ONLY THE COMPONENT
  // Do not wrap this in a <main> or <div>.
  // Let BlogPage handle the full-screen layout.
  return <BlogPage data={blog} />;
};

export default page;
