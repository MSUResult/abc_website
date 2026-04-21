"use client";
import QuizEngine from "@/components/(testseries)/QuizEngine";
import { useQuiz } from "@/context/QuizContext";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function QuizPage() {
  const params = useParams();
  const id = params?.id; // Extract id safely
  const { quizData, fetchQuiz, loading } = useQuiz();

  useEffect(() => {
    // If user refreshes on this page, we must fetch the data again
  if (id && id !== "undefined" && !quizData) {
      fetchQuiz(id as string);
    }
  }, [id, quizData, fetchQuiz]);


  // Handle the case where the ID is missing from the URL
  if (!id || id === "undefined") {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-red-500">
        Invalid Quiz ID. Please return to the test series.
      </div>
    );
  }



  if (loading || !quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">
        Preparing Questions...
      </div>
    );
  }

  return <QuizEngine />;
}