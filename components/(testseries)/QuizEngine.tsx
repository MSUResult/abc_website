"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const QuizEngine = ({ testData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const router = useRouter();
  const { isSignedIn, user } = useUser();

  const totalQuestions = testData.questions.length;
  const totalTimeInSeconds = totalQuestions * 60;

  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);

  const latestAnswers = useRef(selectedAnswers);
  const hasSubmittedRef = useRef(false);
  const currentIndexRef = useRef(currentIndex);

  useEffect(() => {
    latestAnswers.current = selectedAnswers;
  }, [selectedAnswers]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const currentQuestion = testData.questions[currentIndex];
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins} min ${secs < 10 ? `0${secs}` : secs} sec`;
    }
    return `${secs} sec`;
  };

  const handleOptionSelect = (optionIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionIndex,
    }));
  };

  const nextQuestion = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleSubmitTest = (forceSubmit = false) => {
    if (hasSubmittedRef.current) return;

    if (!isSignedIn) {
      const confirmGuest = window.confirm(
        "You are not logged in. Your progress won't be saved to your profile, but you can still see your score. Continue as Guest?",
      );

      if (!confirmGuest) {
        return;
      }
    }

    hasSubmittedRef.current = true;

    const answersToProcess = latestAnswers.current;

    let correctCount = 0;
    let incorrectCount = 0;

    testData.questions.forEach((question, index) => {
      const selectedOption = answersToProcess[index];

      if (selectedOption !== undefined) {
        if (selectedOption === question.answer) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });

    const unattemptedCount = totalQuestions - (correctCount + incorrectCount);
    const score = correctCount * 4;

    const resultData = {
      score,
      correctCount,
      incorrectCount,
      unattemptedCount,
      totalQuestions,
      maxScore: totalQuestions * 4,
      userAnswers: answersToProcess,
      savedToDatabase: isSignedIn,
    };

    sessionStorage.setItem(
      `testResult-${testData.id}`,
      JSON.stringify(resultData),
    );

    if (isSignedIn) {
      console.log("Saving results to MongoDB for user:", user.id);
      // call your API route here
    }

    router.replace(`/test-series/${testData.id}/result`);
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmitTest(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);

    const handlePopState = () => {
      window.history.pushState(null, "", window.location.href);
      if (currentIndexRef.current > 0) {
        setCurrentIndex((prev) => prev - 1);
      } else {
        const leave = window.confirm(
          "Warning: Leaving now will instantly submit your quiz. Continue?",
        );
        if (leave) {
          handleSubmitTest(true);
        }
      }
    };

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue =
        "Are you sure you want to leave? Your test will be affected.";
    };

    const handleVisibilityChange = () => {
      if (document.hidden && !hasSubmittedRef.current) {
        alert(
          "Warning: You switched tabs or minimized the screen! Your test has been auto-submitted to prevent cheating.",
        );
        handleSubmitTest(true);
      }
    };

    window.addEventListener("popstate", handlePopState);
    window.addEventListener("beforeunload", handleBeforeUnload);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <section
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 pt-20 pb-12 px-4 sm:px-6 lg:px-8 select-none"
      onContextMenu={(e) => e.preventDefault()}
      onCopy={(e) => e.preventDefault()}
      onPaste={(e) => e.preventDefault()}
      onCut={(e) => e.preventDefault()}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
        <div className="lg:col-span-3 order-1 lg:order-none">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
            <div className="h-1.5 w-full bg-slate-100">
              <div
                className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-5 sm:p-8 md:p-10 flex-1 flex flex-col">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-700 bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100">
                  {currentQuestion.subject}
                </span>

                <div className="flex items-center gap-2 text-rose-600 bg-rose-50 px-4 py-1.5 rounded-full border border-rose-100 text-sm sm:text-base font-extrabold shadow-sm">
                  <Clock size={18} className="animate-pulse" />
                  <span>{formatTime(timeLeft)}</span>
                </div>
              </div>

              <div className="mb-8 sm:mb-10">
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800 leading-relaxed">
                  <span className="text-indigo-600 mr-2 text-xl sm:text-2xl md:text-3xl">
                    Q{currentIndex + 1}.
                  </span>
                  {currentQuestion.text}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:gap-4 mb-10 flex-1">
                {currentQuestion.options.map((opt, i) => {
                  const isSelected = selectedAnswers[currentIndex] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(i)}
                      className={`group w-full flex items-center p-3 sm:p-4 rounded-xl border-2 transition-all duration-200 ease-in-out transform active:scale-[0.99] text-left ${
                        isSelected
                          ? "border-indigo-600 bg-indigo-50/80 shadow-md shadow-indigo-100/50"
                          : "border-slate-100 hover:border-indigo-300 hover:bg-slate-50 hover:shadow-sm"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 shrink-0 rounded-lg flex items-center justify-center font-bold mr-4 border transition-colors ${
                          isSelected
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                            : "bg-white text-slate-400 border-slate-200 group-hover:border-indigo-300 group-hover:text-indigo-500"
                        }`}
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span
                        className={`font-medium text-sm sm:text-base ${
                          isSelected ? "text-indigo-900" : "text-slate-700"
                        }`}
                      >
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                <button
                  onClick={prevQuestion}
                  disabled={currentIndex === 0}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-slate-500 bg-slate-50 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
                >
                  <ChevronLeft size={20} /> Previous
                </button>

                {currentIndex === totalQuestions - 1 ? (
                  <button
                    onClick={() => handleSubmitTest(false)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-200 hover:shadow-xl hover:shadow-emerald-200 transition-all active:scale-[0.98]"
                  >
                    Submit Test <CheckCircle size={20} />
                  </button>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-[0.98]"
                  >
                    Save & Next <ChevronRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 order-2 lg:order-none">
          <div className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-6 lg:top-28">
            <h3 className="font-bold text-slate-800 mb-4 text-center lg:text-left">
              Question Palette
            </h3>

            <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-5 gap-2 sm:gap-2.5">
              {testData.questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-10 sm:h-11 w-full rounded-lg flex items-center justify-center text-sm font-bold transition-all transform hover:scale-105 active:scale-95 border ${
                    currentIndex === i
                      ? "border-indigo-600 ring-4 ring-indigo-100 shadow-sm"
                      : "border-transparent"
                  } ${
                    selectedAnswers[i] !== undefined
                      ? "bg-emerald-500 text-white shadow-sm shadow-emerald-200"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                <div className="w-5 h-5 rounded-md bg-emerald-500 shadow-sm shadow-emerald-200" />
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                <div className="w-5 h-5 rounded-md bg-slate-100 border border-slate-200" />
                <span>Not Answered</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizEngine;
