"use client";
import React, { useMemo, useEffect, useState } from "react";
import { Trophy, Medal, TrendingUp, TrendingDown, Minus, Zap, Target } from "lucide-react";
import Link from "next/link";

// --- LOGIC FROM ARENA PRO ---
const calculateNearMiss = (data) => {
  const sorted = [...data].sort((a, b) => b.score - a.score);
  return sorted.map((user, i) => ({
    ...user,
    pointsToNext: i === 0 ? 0 : sorted[i - 1].score - user.score,
  }));
};

const getGapConfig = (points) => {
  if (points <= 5) return { bg: "bg-red-100", text: "text-red-700", label: "SO CLOSE" };
  if (points <= 15) return { bg: "bg-amber-100", text: "text-amber-700", label: `${points} XP AWAY` };
  return { bg: "bg-gray-100", text: "text-gray-500", label: `${points} XP BEHIND` };
};

const TrendIcon = ({ trend }) => {
  if (trend === "up") return <TrendingUp size={12} className="text-emerald-500" />;
  if (trend === "down") return <TrendingDown size={12} className="text-red-500" />;
  return <Minus size={12} className="text-gray-400" />;
};

const LeaderBoard = ({ currentUserId }) => {
  const [rawData, setRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- FETCHING DATA ---
  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        const dbData = await response.json();

        const formattedData = dbData.map((user) => ({
          id: user.userId,
          name: user.name,
          score: user.totalScore,
          trend: user.trend || "same",
          isCurrentUser: user.userId === currentUserId,
          image: user.imageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&bold=true`
        }));

        setRawData(formattedData);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLeaderboardData();
  }, [currentUserId]);

  const processedData = useMemo(() => calculateNearMiss(rawData).slice(0, 5), [rawData]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-gray-100 flex items-center justify-center shadow-lg">
        <div className="text-xs font-black text-indigo-600 animate-pulse uppercase tracking-widest">Loading Toppers...</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden max-w-md w-full">
      {/* --- YOUR ORIGINAL HEADER KEPT --- */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex items-center justify-between relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
            <Trophy className="text-yellow-300" size={28} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white uppercase tracking-tighter">Weekly Top 5</h2>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-indigo-100 text-[10px] font-black uppercase tracking-widest">Live Arena</p>
            </div>
          </div>
        </div>
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-white opacity-10 rounded-full blur-2xl"></div>
      </div>

      {/* --- LIST ITEMS WITH PRO LOGIC --- */}
      <div className="p-5 flex flex-col gap-3 bg-gray-50/50">
        {processedData.map((user, index) => {
          const rank = index + 1;
          const gap = getGapConfig(user.pointsToNext);

          return (
            <div
              key={user.id}
              className={`group relative flex items-center justify-between p-3 rounded-2xl transition-all duration-300 ${
                user.isCurrentUser 
                ? "bg-indigo-50 border border-indigo-200 shadow-sm" 
                : "bg-white border border-gray-100 hover:border-gray-200"
              }`}
            >
              {/* Rank & User Info */}
              <div className="flex items-center gap-4">
                <div className="w-8 flex flex-col items-center justify-center font-bold text-gray-500 gap-1">
                  {rank === 1 ? <Medal size={28} className="text-yellow-500" /> : 
                   rank === 2 ? <Medal size={24} className="text-slate-400" /> :
                   rank === 3 ? <Medal size={24} className="text-orange-500" /> :
                   <span className="text-lg text-gray-300">#{rank}</span>}
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={user.image}
                      alt={user.name}
                      className={`object-cover rounded-full border-2 ${rank === 1 ? "w-11 h-11 border-yellow-400" : "w-9 h-9 border-white shadow-sm"}`}
                    />
                    {rank === 1 && <Zap size={12} className="absolute -top-1 -right-1 text-yellow-500 fill-yellow-500" />}
                  </div>
                  <div className="flex flex-col">
                    <p className={`font-bold text-sm flex items-center gap-1.5 ${user.isCurrentUser ? "text-indigo-700" : "text-gray-800"}`}>
                      {user.name}
                      <TrendIcon trend={user.trend} />
                    </p>
                    {/* The "Overtake Goal" label under the name */}
                    {rank > 1 && (
                      <span className={`text-[8px] font-black w-fit px-1.5 py-0.5 rounded uppercase ${gap.bg} ${gap.text}`}>
                        {gap.label}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Score Box */}
              <div className={`font-black text-sm px-3 py-1.5 rounded-lg border shadow-sm ${
                rank === 1 ? "bg-yellow-400 text-yellow-900 border-yellow-500" :
                user.isCurrentUser ? "bg-indigo-600 text-white border-indigo-700" :
                "bg-white text-gray-700 border-gray-100"
              }`}>
                {user.score}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-gray-100">
        <Link href="/saharanpur-toppers" className="block w-full">
          <button className="w-full py-2 text-sm font-bold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors uppercase tracking-widest">
            Explore Full Rankings
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LeaderBoard;