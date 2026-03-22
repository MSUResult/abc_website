"use server";

import { connectDB } from "@/lib/db/db";
import { QuizResult } from "@/lib/models/quiz";
import { auth } from "@clerk/nextjs/server";
import resources from "@/data/testSeries";

export async function saveFirstAttemptOnly(testId, userAnswers) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { success: false, message: "Unauthorized" };
    }

    await connectDB();

    // Check if result already exists
    const existing = await QuizResult.findOne({
      userId: userId,
      testId: Number(testId),
    }).lean();

    if (existing) {
      return { success: true, message: "Attempt already exists. Skipped." };
    }

    // Find test data
    const testData = resources.find((item) => item.id === Number(testId));

    if (!testData) {
      return { success: false, message: "Test not found" };
    }

    // 1. Convert userAnswers to a clean array of numbers
    let cleanAnswers = [];

    if (Array.isArray(userAnswers)) {
      // If it's an array of one object, extract the object values
      if (typeof userAnswers[0] === "object" && userAnswers[0] !== null) {
        cleanAnswers = Object.values(userAnswers[0]).map(Number);
      } else {
        // If it's already a normal array, just ensure they are numbers
        cleanAnswers = userAnswers.map(Number);
      }
    } else if (typeof userAnswers === "object" && userAnswers !== null) {
      // If it's just an object, convert to array
      cleanAnswers = Object.values(userAnswers).map(Number);
    }

    // 2. Calculate score using cleanAnswers
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

    // 3. Save cleaned answers
    await QuizResult.create({
      userId: userId,
      testId: Number(testId),
      testTitle: testData.title,
      score,
      maxScore,
      correctCount,
      incorrectCount,
      unattemptedCount,
      userAnswers: cleanAnswers,
    });

    return { success: true };
  } catch (error) {
    console.error("Failed to save result:", error);
    return { success: false, message: "Internal Server Error" };
  }
}