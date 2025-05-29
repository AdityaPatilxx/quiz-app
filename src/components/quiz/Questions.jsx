"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronRight, Timer } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Question({
  question,
  options,
  correctAnswer,
  onAnswer,
  progress,
  mode,
}) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [timeLeft, setTimeLeft] = useState(mode === "timed" ? 30 : null);

  const handleTimeUp = useCallback(() => {
    onAnswer(false, null);
  }, [onAnswer]);

  useEffect(() => {
    setSelectedOption(null);
    if (mode === "timed") {
      setTimeLeft(30);
    }
  }, [question, mode]);

  useEffect(() => {
    let timer;
    if (mode === "timed" && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (mode === "timed" && timeLeft === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, mode, handleTimeUp]);

  const handleOptionChange = useCallback((option) => {
    setSelectedOption(option);
  }, []);

  const handleSubmit = useCallback(() => {
    if (selectedOption !== null) {
      onAnswer(selectedOption === correctAnswer, selectedOption);
      setSelectedOption(null);
    } else if (mode === "timed" && timeLeft === 0) {
      onAnswer(false, null);
    } else if (mode !== "timed") {
      alert("Please select an answer.");
    }
  }, [selectedOption, correctAnswer, onAnswer, mode, timeLeft]);

  const getOptionClass = useCallback((option) => {
    return selectedOption === option ? "selected" : "";
  }, [selectedOption]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (mode === "timed" && timeLeft === 0) return;

      switch (event.key) {
        case '1':
        case '2':
        case '3':
        case '4':
          const index = parseInt(event.key) - 1;
          if (options[index]) {
            setSelectedOption(options[index]);
          }
          break;
        case 'Enter':
          if (selectedOption) {
            handleSubmit();
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [options, selectedOption, handleSubmit, mode, timeLeft]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question} // Triggers animation on question change
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
        className="space-y-8"
      >
        <div className="flex justify-between items-center">
          <div className="w-full max-w-md bg-muted rounded-full h-2.5">
            <div
              className="bg-accent h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {mode === "timed" && (
            <div className="flex items-center gap-2 ml-4">
              <Timer
                className={`w-5 h-5 ${
                  timeLeft < 10
                    ? "text-destructive animate-pulse"
                    : "text-muted-foreground"
                }`}
              />
              <span
                className={`font-mono text-lg ${
                  timeLeft < 10 ? "text-destructive font-bold" : ""
                }`}
              >
                {timeLeft}s
              </span>
            </div>
          )}
        </div>

        <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
          <h3 className="text-2xl font-medium mb-8 leading-relaxed">
            {question}
          </h3>

          <div className="grid gap-4 md:grid-cols-2">
            {options.map((option, index) => (
              <div
                key={`${index}-${option}`}
                onClick={() => handleOptionChange(option)}
                className={`quiz-option ${getOptionClass(option)} ${
                  mode === "timed" && timeLeft === 0
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOptionChange(option);
                  }
                }}
                aria-pressed={selectedOption === option}
              >
                <div className="flex items-center  gap-3">
                  {/* <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 text-accent text-sm font-medium flex items-center justify-center">
                    {index + 1}
                  </span> */}
                  <span className="text-lg">{option}</span>
                </div>
              </div>
            ))}
          </div>

          {mode !== "timed" && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Use number keys (1-4) or click to select • Press Enter to submit
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            disabled={mode === "timed" && timeLeft === 0}
            className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-medium transition-all hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {mode === "timed" && timeLeft === 0 ? (
              "Time's Up!"
            ) : (
              <>
                Next Question
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
