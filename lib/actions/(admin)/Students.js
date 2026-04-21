// /lib/actions/(admin)/Students.ts

import { connectDB } from "@/lib/db/db";
import { LeaderboardStats } from "@/lib/models/LeaderBoard";

export async function AllStudents() {
  await connectDB();

  const users = await LeaderboardStats.find({})
    .sort({ totalScore: -1 })
    .limit(100)
    .lean();

  return users; // ✅ return plain data
}