// app/test-series/[id]/result/page.js
import ResultClient from "@/components/(Result)/ResultClient";
import { connectDB } from "@/lib/db/db";
import { QuizResult } from "@/lib/models/quiz";
import { auth } from "@clerk/nextjs/server";

export default async function ResultPage({ params }) {
  const { userId } = await auth();
  const { id } = await params;

  let isAlreadySaved = false;

  // 🔥 Check DB ONLY if the user is logged in
  if (userId) {
    await connectDB();
    const existingAttempt = await QuizResult.findOne({
      userId: userId,
      testId: Number(id),
    }).lean();

    isAlreadySaved = Boolean(existingAttempt);
  }

  return (
    <ResultClient
      testId={id}
      isAlreadySaved={isAlreadySaved}
      isLoggedIn={Boolean(userId)} // Pass auth state to the client
    />
  );
}
