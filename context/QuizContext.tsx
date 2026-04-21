"use client";
import React, { createContext, useContext, useState } from "react";

// Define what our Quiz data looks like based on your MongoDB structure
interface QuizContextType {
  quizData: any | null;
  loading: boolean;
  error: string | null;
  fetchQuiz: (id: string) => Promise<void>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: React.ReactNode }) => {
  const [quizData, setQuizData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchQuiz = async (id: string) => {
    // If we already have the data for this ID, don't fetch again (Saves Cost!)
    if (quizData?._id === id) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/quiz/${id}`);
      if (!response.ok) throw new Error("Failed to fetch quiz");
      const data = await response.json();
      setQuizData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <QuizContext.Provider value={{ quizData, loading, error, fetchQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within a QuizProvider");
  return context;
};