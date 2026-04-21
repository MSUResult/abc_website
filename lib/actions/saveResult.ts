"use server";

import { auth, currentUser } from "@clerk/nextjs/server"; // Import currentUser to get Name/Image
import { connectDB } from "@/lib/db/db";
import { QuizResult } from "@/lib/models/QuizResult";
import { LeaderboardStats } from "@/lib/models/LeaderBoard";

export async function saveTestResultAction(testId: string, resultData: any, testTitle: string) {
  try {
    const { userId } = await auth();
    const user = await currentUser(); // Get the latest name and profile pic from Clerk

    if (!userId || !user) {
      return { success: true, message: "Guest user. Result not saved." };
    }

    await connectDB();

    // 1. FIRST ATTEMPT CHECK
    const existingAttempt = await QuizResult.findOne({ userId, testId }).lean();
    if (existingAttempt) {
      return { success: true, message: "Not the first attempt." };
    }

    // 2. SAVE INDIVIDUAL RESULT
    await QuizResult.create({
      userId,
      testId,
      score: resultData.score,
      maxScore: resultData.maxScore,
      testTitle,
      correctCount: resultData.correctCount,
      incorrectCount: resultData.incorrectCount,
      unattemptedCount: resultData.unattemptedCount,
      userAnswers: resultData.userAnswers,
    });

    // 3. UPDATE LEADERBOARD (The Magic Part)
    // findOneAndUpdate with "upsert: true" creates the record if it doesn't exist
    await LeaderboardStats.findOneAndUpdate(
      { userId: userId },
      {
        $set: { 
          name: `${user.firstName} ${user.lastName || ""}`.trim(),
          imageUrl: user.imageUrl,
          lastAttemptAt: new Date()
        },
        $inc: { 
          totalScore: resultData.score, 
          totalMaxScore: resultData.maxScore,
          quizzesAttempted: 1 
        }
      },
      { upsert: true, new: true }
    );

    return { success: true, message: "Result and Leaderboard updated!" };
    
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "Server error." };
  }
}