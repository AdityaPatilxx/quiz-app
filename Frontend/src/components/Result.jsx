"use client";

import { Home, RefreshCcw, ChevronRight, Trophy, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import he from "he";

export default function Result({
  score,
  totalQuestions,
  questions,
  userAnswers,
  handleRestartQuiz,
  handleNextQuiz,
  category,
  difficulty,
}) {
  const progressPercentage = Math.round((score / totalQuestions) * 100);

  // Determine result message based on score
  const getResultMessage = () => {
    if (progressPercentage >= 80) return "Excellent!";
    if (progressPercentage >= 60) return "Good job!";
    if (progressPercentage >= 40) return "Nice try!";
    return "Keep practicing!";
  };

  return (
    <div className="fade-in">
      <div className="bg-background border border-border rounded-xl p-6 shadow-sm mb-8">
        <div className="text-center mb-8">
          <Trophy className="w-16 h-16 text-accent mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">{getResultMessage()}</h2>
          <p className="text-muted-foreground">
            You scored {score} out of {totalQuestions}
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-accent">{score}</div>
            <p className="text-sm text-muted-foreground">Correct</p>
          </div>

          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="text-muted stroke-current"
                strokeWidth="10"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
              ></circle>
              <circle
                className="text-accent stroke-current"
                strokeWidth="10"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="40"
                fill="transparent"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * progressPercentage) / 100}
                transform="rotate(-90 50 50)"
              ></circle>
              <text
                x="50"
                y="50"
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-2xl font-bold"
              >
                {progressPercentage}%
              </text>
            </svg>
          </div>

          <div className="text-center">
            <div className="text-5xl font-bold text-muted-foreground">
              {totalQuestions - score}
            </div>
            <p className="text-sm text-muted-foreground">Incorrect</p>
          </div>
        </div>
      </div>

      <div className="bg-background border border-border rounded-xl shadow-sm mb-8">
        <div className="p-4 border-b border-border">
          <h3 className="font-medium">Question Review</h3>
        </div>
        <div className="max-h-[400px] overflow-y-auto p-4">
          {questions.map((currentQuestion, questionIndex) => (
            <div
              key={questionIndex}
              className="mb-6 pb-6 border-b border-border last:mb-0 last:pb-0 last:border-0"
            >
              <div className="flex items-start gap-3 mb-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                    userAnswers[questionIndex] === currentQuestion.correctAnswer
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {userAnswers[questionIndex] ===
                  currentQuestion.correctAnswer ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <X className="w-4 h-4" />
                  )}
                </div>
                <h4 className="text-base font-medium">
                  {he.decode(currentQuestion.question)}
                </h4>
              </div>
              <div className="ml-9">
                <div className="grid gap-2">
                  {currentQuestion.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`px-3 py-2 rounded-md text-sm ${
                        option === currentQuestion.correctAnswer
                          ? "bg-green-100 text-green-700 border border-green-200"
                          : option === userAnswers[questionIndex] &&
                            option !== currentQuestion.correctAnswer
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : "bg-muted"
                      }`}
                    >
                      {he.decode(option)}
                      {option === currentQuestion.correctAnswer && (
                        <span className="ml-2 text-xs font-medium">
                          (Correct Answer)
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/">
          <button className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors">
            <Home className="w-5 h-5" />
            Home
          </button>
        </Link>

        <button
          onClick={handleRestartQuiz}
          className="flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors"
        >
          <RefreshCcw className="w-5 h-5" />
          Retry Quiz
        </button>

        <button
          onClick={handleNextQuiz}
          className="flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors"
        >
          New Quiz
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
