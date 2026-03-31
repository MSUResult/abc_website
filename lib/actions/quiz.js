"use server";

import { connectDB } from "@/lib/db/db";
import { QuizResult } from "@/lib/models/quiz";
import { LeaderboardStats } from "@/lib/models/LeaderBoard";
import { auth, currentUser } from "@clerk/nextjs/server";
import resources from "@/data/testSeries";

export async function saveFirstAttemptOnly(testId, userAnswers) {
  try {
    const { userId } = await auth();
    const user = await currentUser(); // Fetches name and profile image

    // 1. Silent ignore if not logged in
    if (!userId || !user) {
      return { success: false, message: "User not authenticated" };
    }

    await connectDB();

    // 2. Check if this is truly the first attempt (Speed check)
    const existing = await QuizResult.findOne({
      userId: userId,
      testId: Number(testId),
    }).lean();

    if (existing) {
      return { success: true, message: "Already saved." };
    }

    // 3. Find test data and calculate score
    const testData = resources.find((item) => item.id === Number(testId));
    if (!testData) return { success: false, message: "Test not found" };

    // Normalize answers (handling both array and object formats)
    let cleanAnswers = Array.isArray(userAnswers)
      ? userAnswers.map(Number)
      : Object.values(userAnswers).map(Number);

    let score = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    testData.questions.forEach((question, index) => {
      const userAnswer = cleanAnswers[index];
      if (
        userAnswer === undefined ||
        userAnswer === null ||
        isNaN(userAnswer)
      ) {
        unattemptedCount++;
      } else if (userAnswer === question.correctAnswer) {
        correctCount++;
        score += 4;
      } else {
        incorrectCount++;
        score -= 1;
      }
    });

    const maxScore = testData.questions.length * 4;

    // 4. PARALLEL EXECUTION (This makes it fast 🚀)
    // We run the Result Creation and Leaderboard Update at the same time
    await Promise.all([
      // A. Save the individual result
      QuizResult.create({
        userId,
        testId: Number(testId),
        testTitle: testData.title,
        score,
        maxScore,
        correctCount,
        incorrectCount,
        unattemptedCount,
        userAnswers: cleanAnswers,
      }),

      // B. Update/Create Leaderboard Stats
      updateLeaderboardLogic(userId, user, score, maxScore),
    ]);

    return { success: true };
  } catch (error) {
    console.error("Critical Error in saveFirstAttemptOnly:", error);
    return { success: false }; // Silent fail to avoid crashing UI
  }
}

// Helper function to keep the main action clean
async function updateLeaderboardLogic(userId, user, score, maxScore) {
  let stats = await LeaderboardStats.findOne({ userId });

  if (!stats) {
    stats = new LeaderboardStats({
      userId,
      name:
        `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Anonymous",
      imageUrl: user.imageUrl,
      totalScore: 0,
      totalMaxScore: 0,
      quizzesAttempted: 0,
    });
  }

  // Update stats
  stats.totalScore += score;
  stats.totalMaxScore += maxScore;
  stats.quizzesAttempted += 1;
  stats.lastAttemptAt = new Date();

  // Calculate average
  stats.averageScore = parseFloat(
    (stats.totalScore / stats.quizzesAttempted).toFixed(2),
  );

  return stats.save();
}
