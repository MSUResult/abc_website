import React from "react";
import { AllStudents } from "@/lib/actions/(admin)/Students";

const Page = async () => {
  const students = await AllStudents();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Students</h1>

      <div className="grid gap-4">
        {students.map((user, index) => (
          <div
            key={user.userId}
            className="flex items-center justify-between bg-gray-700 p-4 rounded-xl shadow"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              <span className="text-lg font-bold text-gray-400">
                #{index + 1}
              </span>

              <img
                src={user.imageUrl}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />

              <div>
                <p className="text-white font-semibold">{user.name}</p>
                <p className="text-gray-400 text-sm">
                  Attempts: {user.quizzesAttempted}
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="text-right">
              <p className="text-green-400 font-bold">
                {user.totalScore}
              </p>
              <p className="text-gray-400 text-sm">Score</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;