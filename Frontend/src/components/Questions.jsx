"use client";

import { useState, useEffect } from "react";
import he from "he";
import { ChevronRight, Timer } from "lucide-react";

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
  const [animation, setAnimation] = useState(true);

  useEffect(() => {
    // Reset animation when question changes
    setAnimation(false);
    setTimeout(() => setAnimation(true), 10);

    // Reset selected option when question changes
    setSelectedOption(null);

    // Reset timer for timed mode
    if (mode === "timed") {
      setTimeLeft(30);
    }
  }, [question, mode]);

  useEffect(() => {
    let timer;
    if (mode === "timed" && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (mode === "timed" && timeLeft === 0) {
      handleSubmit();
    }

    return () => clearTimeout(timer);
  }, [timeLeft, mode]);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onAnswer(selectedOption === correctAnswer, selectedOption);
      setSelectedOption(null);
    } else if (mode === "timed" && timeLeft === 0) {
      // Time's up, submit with no selection
      onAnswer(false, null);
    } else {
      // Alert only in standard mode when no option is selected
      if (mode !== "timed") {
        alert("Please select an answer.");
      }
    }
  };

  const getOptionClass = (option) => {
    return selectedOption === option ? "selected" : "";
  };

  return (
    <div className={`space-y-8 ${animation ? "fade-in" : ""}`}>
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
              className={`font-mono ${
                timeLeft < 10 ? "text-destructive font-bold" : ""
              }`}
            >
              {timeLeft}s
            </span>
          </div>
        )}
      </div>

      <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
        <h3 className="text-2xl font-medium mb-8">{he.decode(question)}</h3>

        <div className="grid gap-4 md:grid-cols-2">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleOptionChange(option)}
              className={`quiz-option ${getOptionClass(option)}`}
            >
              <span className="text-lg">{he.decode(option)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-medium transition-all hover:shadow-md"
        >
          Next Question
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
