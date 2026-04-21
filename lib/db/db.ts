import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// 🔴 1. Check if URI exists
if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in .env.local");
}

// 🔴 2. Global cache (Next.js hot reload fix)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

// 🔴 3. Main connection function
export async function connectDB() {
  // If already connected → reuse
  if (cached.conn) {
    return cached.conn;
  }

  // If no promise → create one
  if (!cached.promise) {
    cached.promise = (async () => {
      try {
        const conn = await mongoose.connect(MONGODB_URI, {
          bufferCommands: false,
        });

        console.log("MongoDB Connected");
        return conn;
      } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        throw error;
      }
    })();
  }

  // Wait for connection
  cached.conn = await cached.promise;
  return cached.conn;
}