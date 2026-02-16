import BlogSection from "@/components/(BlogSection)/BlogSection";

// Generate metadata

export async function generateMetadata({ params }) {
  const { tagSlug } = await params;

  const readableTag = tagSlug.replace(/-/g, " ");

  return {
    title: `${readableTag} Blogs `,
    description: `Read all blogs related to ${readableTag} by ABC Institute Saharanpur.`,
    keywords: `${readableTag}, ABC Institute, coaching blogs, Saharanpur education`,
  };
}

export default async function TagName({ params }) {
  console.log("🚀 Tag Page Loaded");
  console.log("📦 Params Received:", params);

  const { tagSlug } = await params;

  console.log("🏷 Extracted tagSlug:", tagSlug);

  return <BlogSection selectedTag={tagSlug} />;
}
