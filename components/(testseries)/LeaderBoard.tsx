import React from "react";
import { Trophy, Medal, TrendingUp, TrendingDown, Minus } from "lucide-react";
import Link from "next/link";

// Sample Data upgraded with 'trend' and simulating a 'isCurrentUser' flag
const leaderboardData = [
  {
    id: 1,
    rank: 1,
    name: "Ayush Singh",
    score: 295,
    trend: "up",
    image: "https://ui-avatars.com/api/?name=Ayush+Singh&background=random",
  },
  {
    id: 2,
    rank: 2,
    name: "Riya Sharma",
    score: 288,
    trend: "down",
    image: "https://ui-avatars.com/api/?name=Riya+Sharma&background=random",
  },
  {
    id: 3,
    rank: 3,
    name: "Karan Verma",
    score: 275,
    trend: "up",
    image: "https://ui-avatars.com/api/?name=Karan+Verma&background=random",
  },
  {
    id: 4,
    rank: 4,
    name: "Sneha Patel",
    score: 260,
    trend: "same",
    isCurrentUser: true,
    image: "https://ui-avatars.com/api/?name=Sneha+Patel&background=random",
  },
  {
    id: 5,
    rank: 5,
    name: "Rahul Gupta",
    score: 255,
    trend: "up",
    image: "https://ui-avatars.com/api/?name=Rahul+Gupta&background=random",
  },
];

const TrendIcon = ({ trend }) => {
  if (trend === "up")
    return <TrendingUp size={14} className="text-green-500" />;
  if (trend === "down")
    return <TrendingDown size={14} className="text-red-500" />;
  return <Minus size={14} className="text-gray-400" />;
};

const LeaderBoard = () => {
  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden max-w-md w-full">
      {/* Header - Made more engaging */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex items-center justify-between relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Trophy className="text-yellow-300" size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Weekly Top 5</h2>
            <p className="text-indigo-100 text-sm font-medium">
              Reset in 2 days
            </p>
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* List container */}
      <div className="p-5 flex flex-col gap-3 bg-gray-50/50">
        {leaderboardData.map((user) => (
          <div
            key={user.id}
            className={`group relative flex items-center justify-between p-3 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${
              user.rank === 1
                ? "bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 shadow-[0_0_15px_rgba(250,204,21,0.15)] py-4"
                : user.rank === 2
                  ? "bg-gradient-to-r from-gray-50 to-slate-100 border border-gray-200"
                  : user.rank === 3
                    ? "bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200"
                    : user.isCurrentUser
                      ? "bg-indigo-50 border border-indigo-200 shadow-sm"
                      : "bg-white border border-gray-100 hover:border-gray-200"
            }`}
          >
            {/* Rank & User Info */}
            <div className="flex items-center gap-4">
              <div className="w-8 flex flex-col items-center justify-center font-bold text-gray-500 gap-1">
                {user.rank === 1 ? (
                  <Medal size={28} className="text-yellow-500 drop-shadow-sm" />
                ) : user.rank === 2 ? (
                  <Medal size={24} className="text-slate-400" />
                ) : user.rank === 3 ? (
                  <Medal size={24} className="text-orange-500" />
                ) : (
                  <span className="text-lg text-gray-400">#{user.rank}</span>
                )}

                {/* Trend Indicator directly under rank */}
                {user.rank > 3 && <TrendIcon trend={user.trend} />}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={user.image}
                    alt={user.name}
                    className={`object-cover rounded-full border-2 shadow-sm ${
                      user.rank === 1
                        ? "w-12 h-12 border-yellow-400"
                        : "w-10 h-10 border-white"
                    }`}
                  />
                  {user.rank <= 3 && (
                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-sm border border-gray-100">
                      <TrendIcon trend={user.trend} />
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <p
                    className={`font-bold ${user.isCurrentUser ? "text-indigo-700" : "text-gray-800"} text-sm flex items-center gap-2`}
                  >
                    {user.name}
                    {user.isCurrentUser && (
                      <span className="bg-indigo-100 text-indigo-700 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
                        You
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    {user.score} XP
                  </p>
                </div>
              </div>
            </div>

            {/* Score Highlight */}
            <div
              className={`font-black text-lg px-4 py-2 rounded-xl shadow-sm border ${
                user.rank === 1
                  ? "bg-yellow-400 text-yellow-900 border-yellow-500"
                  : user.rank === 2
                    ? "bg-gray-200 text-gray-700 border-gray-300"
                    : user.rank === 3
                      ? "bg-orange-200 text-orange-800 border-orange-300"
                      : user.isCurrentUser
                        ? "bg-indigo-600 text-white border-indigo-700"
                        : "bg-gray-100 text-gray-700 border-gray-200 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors"
              }`}
            >
              {user.score}
            </div>
          </div>
        ))}
      </div>

      {/* Footer / View All */}
      <div className="p-4 bg-white border-t border-gray-100">
        {/* If using Next.js, import Link from 'next/link' */}
        <Link href="/saharanpur-toppers" className="block w-full">
          <button className="w-full py-2 cursor-pointer text-sm font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors focus:ring-4 focus:ring-indigo-100">
            Explore Full Rankings
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LeaderBoard;
