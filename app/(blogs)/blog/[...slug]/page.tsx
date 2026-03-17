import React from "react";
import data from "@/data/tags.json";
import BlogPage from "@/components/(BlogSection)/BlogPage";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blogSlug = Array.isArray(slug) ? slug[slug.length - 1] : slug;
  const blog = data.find((item) => item.slug === blogSlug);

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

  // Define JSON-LD inside the component
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.seo?.metaDescription,
    image: blog.featuredImage,
    author: {
      "@type": "Person",
      name: blog.author?.name,
    },
    datePublished: blog.publishedAt,
  };

  // 5. RETURN ONLY THE COMPONENT
  // Do not wrap this in a <main> or <div>.
  // Let BlogPage handle the full-screen layout.
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogPage data={blog} />
    </>
  );
};

export default page;
