"use server";
import { connectDB } from "@/lib/db/db"; 
import Blog from "@/lib/models/BlogSchema";
import { revalidatePath } from "next/cache";

export async function uploadBlog(data) {
  try {
    await connectDB();
    
    // 1. Clean the data
    const slug = data.slug || data.title.toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    
    // 2. Create in DB (The featuredImage is now just the Cloudinary URL string)
    const newBlog = await Blog.create({
      ...data,
      slug: slug,
      publishedAt: new Date(), // Always good to add a timestamp
    });

    revalidatePath("/blog");
    return { success: true, blog: JSON.parse(JSON.stringify(newBlog)) };
  } catch (error) {
    console.error("Upload Error:", error);
    return { success: false, error: error.message };
  }
}