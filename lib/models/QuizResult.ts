import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    testId: {
      type: String, // Changed from Number to String for MongoDB compatibility
      required: true,
      index: true,
    },
    testTitle: {
      type: String,
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    maxScore: {
      type: Number,
      required: true,
    },
    correctCount: {
      type: Number,
      required: true,
    },
    incorrectCount: {
      type: Number,
      required: true,
    },
    unattemptedCount: {
      type: Number,
      required: true,
    },
    userAnswers: {
      type: Map, // Using Map to handle { "0": 1, "1": 3 } format from state
      of: Number,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Ensure a user can only have ONE saved result per test
quizResultSchema.index({ userId: 1, testId: 1 }, { unique: true });

export const QuizResult = mongoose.models.QuizResult || mongoose.model("QuizResult", quizResultSchema);