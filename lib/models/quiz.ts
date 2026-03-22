import mongoose, { Schema } from "mongoose";
import { string } from "zod";
import { required } from "zod/mini";

const quizResultSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    testId: {
      type: Number,
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
      type: [Number],
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

quizResultSchema.index({userId:1 , testId:1}, {unique:true})

export  const QuizResult =  mongoose.models.QuizResult || mongoose.model("QuizResult", quizResultSchema );