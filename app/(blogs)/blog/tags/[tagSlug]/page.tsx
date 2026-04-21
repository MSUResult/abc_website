import BlogSection from "@/components/(BlogSection)/BlogSection";

// Re-use the fetcher
async function getBlogs() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/blogs`, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  return res.json();
}

export async function generateMetadata({ params }) {
  const { tagSlug } = await params;
  const readableTag = tagSlug.replace(/-/g, " ");
  return {
    title: `${readableTag} Blogs | ABC Institute`,
    description: `Read all blogs related to ${readableTag} by ABC Institute Saharanpur.`,
  };
}

export default async function TagName({ params }) {
  const { tagSlug } = await params;
  
  // 🛑 FIX: You MUST fetch the blogs here too!
  const blogs = await getBlogs();

  console.log(`🚀 Tag Page: ${tagSlug} | Blogs Loaded: ${blogs.length}`);

  return (
    <main className="min-h-screen bg-red-600 pt-32">
       {/* UI remains the same, but now it has DATA */}
      <BlogSection selectedTag={tagSlug} blogs={blogs} />
    </main>
  );
}