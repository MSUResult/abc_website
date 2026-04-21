"use server"

import { connectDB } from "@/lib/db/db"; 
import Blog from "@/lib/models/BlogSchema";
import { revalidatePath } from "next/cache";
import { json, success } from "zod";

// 1. GET ALL BLOGS (Simple title and excerpt)
export async function getAllBlogs() {
  try {
    await connectDB();
    const blogs = await Blog.find({}, "title excerpt slug").sort({ publishedAt: -1 }).lean();
    return { success: true, blogs: JSON.parse(JSON.stringify(blogs)) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// 2. DELETE BLOG BY ID
export async function deleteBlog(id) {
  try {
    await connectDB();
    await Blog.findByIdAndDelete(id);
    revalidatePath("/admin/blogs"); // Update the list
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}