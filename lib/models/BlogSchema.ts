import { Schema } from "mongoose";

import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: String,
  tag: String,
  excerpt: String,
  featuredImage: String,
  author: {
    name: { type: String, default: "Academic Team" },
    role: { type: String, default: "Expert" },
    image: { type: String, default: "/authors/team.jpg" }
  },
  publishedAt: { type: Date, default: Date.now },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  content: [{
    type: { type: String, enum: ['heading', 'text', 'pdf', 'qa', 'ad'] },
    text: String,
    url: String,
    title: String,
    question: String,
    answer: String
  }]
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);