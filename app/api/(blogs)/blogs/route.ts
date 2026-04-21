import { connectDB } from "@/lib/db/db";
import Blog from "@/lib/models/BlogSchema";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    // Case 1: Get a single blog by slug
    if (slug) {
      const blog = await Blog.findOne({ slug });
      if (!blog) return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      return NextResponse.json(blog);
    }

    // Case 2: Get all blogs (sorted by newest first)
    const blogs = await Blog.find({}).sort({ publishedAt: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}