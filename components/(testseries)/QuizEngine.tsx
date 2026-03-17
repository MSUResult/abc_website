"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Flag, Clock } from "lucide-react";

import { useRouter } from "next/navigation";

// Inside the QuizEngine component, add this function:


const QuizEngine = ({ testData }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { questionIndex: optionIndex }
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();

  const currentQuestion = testData.questions[currentIndex];
  const totalQuestions = testData.questions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleOptionSelect = (optionIndex) => {
    setSelectedAnswers({ ...selectedAnswers, [currentIndex]: optionIndex });
  };

  const nextQuestion = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(currentIndex + 1);
  };

  const prevQuestion = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };


 // Inside your QuizEngine.tsx, add these imports at the top:


const handleSubmitTest = () => {
  let score = 0;
  let correctCount = 0;
  let incorrectCount = 0;

  // Calculate the score
  testData.questions.forEach((q, index) => {
    const userAnswer = selectedAnswers[index];
    if (userAnswer === q.correctAnswer) {
      score += 4; // +4 for correct
      correctCount++;
    } else if (userAnswer !== undefined) {
      score -= 1; // -1 for incorrect
      incorrectCount++;
    }
  });

  // 1. Pack the data into an object
  const resultData = {
    score,
    correctCount,
    incorrectCount,
    unattemptedCount: totalQuestions - (correctCount + incorrectCount),
    totalQuestions,
    maxScore: totalQuestions * 4,
    userAnswers: selectedAnswers,
  };

  // 2. Save to Session Storage so the next page can read it instantly
  sessionStorage.setItem(`testResult-${testData.id}`, JSON.stringify(resultData));

  // 3. Send the user to the Result page
  router.replace(`/test-series/${testData.id}/result`);
};

  return (
    <section className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Main Quiz Area */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            
            {/* Progress Bar */}
            <div className="h-1.5 w-full bg-slate-100">
              <div 
                className="h-full bg-indigo-600 transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="p-6 md:p-10">
              {/* Header Info */}
              <div className="flex justify-between items-center mb-8">
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                  {currentQuestion.subject}
                </span>
                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                  <Clock size={16} />
                  <span>Time Remaining: 178:45</span>
                </div>
              </div>

              {/* Question Text */}
              <div className="mb-10">
                <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
                  <span className="text-indigo-600 mr-2">Q{currentIndex + 1}.</span>
                  {currentQuestion.text}
                </h2>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 gap-4 mb-10">
                {currentQuestion.options.map((opt, i) => {
                  const isSelected = selectedAnswers[currentIndex] === i;
                  return (
                    <button
                      key={i}
                      onClick={() => handleOptionSelect(i)}
                      className={`group flex items-center p-4 rounded-xl border-2 transition-all text-left ${
                        isSelected 
                        ? "border-indigo-600 bg-indigo-50/50" 
                        : "border-slate-100 hover:border-indigo-200 hover:bg-slate-50"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold mr-4 border ${
                        isSelected ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-slate-400 border-slate-200"
                      }`}>
                        {String.fromCharCode(65 + i)}
                      </div>
                      <span className={`font-medium ${isSelected ? "text-indigo-900" : "text-slate-600"}`}>
                        {opt}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                <button 
                  onClick={prevQuestion}
                  disabled={currentIndex === 0}
                  
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 disabled:opacity-0 transition-all"
                >
                  <ChevronLeft size={20} /> Previous
                </button>
                
                {currentIndex === totalQuestions - 1 ? (
                  <button onClick={handleSubmitTest} className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-200 transition-all">
                    Submit Test <CheckCircle size={20} />
                  </button>
                ) : (
                  <button 
                    onClick={nextQuestion}
                    className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
                  >
                    Save & Next <ChevronRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Question Palette */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-28">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              Question Palette
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {testData.questions.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-10 w-full rounded-lg flex items-center justify-center text-xs font-bold transition-all border ${
                    currentIndex === i ? "border-indigo-600 ring-2 ring-indigo-100" : "border-transparent"
                  } ${
                    selectedAnswers[i] !== undefined 
                    ? "bg-green-500 text-white" 
                    : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
               <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                  <div className="w-4 h-4 rounded bg-green-500" /> Answered
               </div>
               <div className="flex items-center gap-3 text-xs font-semibold text-slate-500">
                  <div className="w-4 h-4 rounded bg-slate-100" /> Not Answered
               </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default QuizEngine;