import mongoose from "mongoose";

const leaderboardStatsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    totalScore: {
      type: Number,
      default: 0,
      index: true,
    },

    totalMaxScore: {
      type: Number,
      default: 0,
    },

    quizzesAttempted: {
      type: Number,
      default: 0,
    },

    averageScore: {
      type: Number,
      default: 0,
    },

    lastAttemptAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

leaderboardStatsSchema.index({ totalScore: -1, lastAttemptAt: 1 }); 


export const LeaderboardStats = mongoose.models.LeaderboardStats ||
  mongoose.model("LeaderboardStats", leaderboardStatsSchema);