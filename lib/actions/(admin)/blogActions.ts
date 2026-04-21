"use server";
import { connectDB } from "@/lib/db/db"; 
import Blog from "@/lib/models/BlogSchema";
import cloudinary from "@/lib/cloudinary/cloudinary"; // Path to your cloudinary config
import { revalidatePath } from "next/cache";

export async function uploadBlog(formData) {
  try {
    await connectDB();

    // 1. EXTRACT DATA FROM FORMDATA
    const title = formData.get("title");
    const imageFile = formData.get("featuredImage"); // This is a File object
    const content = JSON.parse(formData.get("content"));
    const category = formData.get("category");
    const tag = formData.get("tag");
    const excerpt = formData.get("excerpt");
    const seo = JSON.parse(formData.get("seo"));

    let imageUrl = "";

    // 2. UPLOAD TO CLOUDINARY (With Compression & Folder)
    if (imageFile && imageFile.size > 0) {
      const arrayBuffer = await imageFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: "ABC", // Your folder name
            resource_type: "image",
            transformation: [
              { width: 1200, crop: "limit" }, // Resize if too big
              { quality: "auto:low" },         // High compression
              { fetch_format: "webp" }        // Save as WebP for tiny size
            ]
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      imageUrl = uploadResponse.secure_url;
    }

    // 3. SAVE TO MONGODB
    const slug = title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
    
    const newBlog = await Blog.create({
      title,
      slug,
      featuredImage: imageUrl,
      content,
      category,
      tag,
      excerpt,
      seo,
      publishedAt: new Date(),
    });

    revalidatePath("/blog");
    return { success: true };
  } catch (error) {
    console.error("Upload Error:", error);
    return { success: false, error: error.message };
  }
}