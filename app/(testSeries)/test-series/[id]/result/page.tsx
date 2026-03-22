// app/test-series/[id]/result/page.js
import ResultClient from "@/components/(Result)/ResultClient";
import { connectDB } from "@/lib/db/db";
import { QuizResult } from "@/lib/models/quiz";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function ResultPage({ params }) {
  // Optimization: Use auth() here too for faster page loads
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");
  const { id } = await params;

  await connectDB();

  // 🔥 Check if result already exists (Fixed: changed quizId to testId)
  const existingAttempt = await QuizResult.findOne({
    userId: userId,
    testId: Number(id),
  }).lean();

  return (
    <ResultClient
      testId={id}
      isAlreadySaved={Boolean(existingAttempt)}
    />
  );
}