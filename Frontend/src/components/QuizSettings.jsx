"use client";

import { useState } from "react";
import { Clock, Zap, Award } from "lucide-react";

function QuizSettings({ onSettingsChange }) {
  const [mode, setMode] = useState("standard");
  const [difficulty, setDifficulty] = useState("easy");
  const [questionCount, setQuestionCount] = useState(10);

  const handleModeChange = (newMode) => {
    setMode(newMode);
    onSettingsChange({ mode: newMode, difficulty, questionCount });
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    onSettingsChange({ mode, difficulty: newDifficulty, questionCount });
  };

  const handleQuestionCountChange = (newCount) => {
    setQuestionCount(newCount);
    onSettingsChange({ mode, difficulty, questionCount: newCount });
  };

  return (
    <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-accent" />
            <h3 className="font-medium">Mode</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className={`settings-button ${
                mode === "standard" ? "active" : ""
              }`}
              onClick={() => handleModeChange("standard")}
            >
              Standard
            </button>
            <button
              className={`settings-button ${mode === "timed" ? "active" : ""}`}
              onClick={() => handleModeChange("timed")}
            >
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Timed
              </div>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-5 h-5 text-accent" />
            <h3 className="font-medium">Difficulty</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className={`settings-button ${
                difficulty === "easy" ? "active" : ""
              }`}
              onClick={() => handleDifficultyChange("easy")}
            >
              Easy
            </button>
            <button
              className={`settings-button ${
                difficulty === "medium" ? "active" : ""
              }`}
              onClick={() => handleDifficultyChange("medium")}
            >
              Medium
            </button>
            <button
              className={`settings-button ${
                difficulty === "hard" ? "active" : ""
              }`}
              onClick={() => handleDifficultyChange("hard")}
            >
              Hard
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium">Questions</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              className={`settings-button ${
                questionCount === 10 ? "active" : ""
              }`}
              onClick={() => handleQuestionCountChange(10)}
            >
              10
            </button>
            <button
              className={`settings-button ${
                questionCount === 20 ? "active" : ""
              }`}
              onClick={() => handleQuestionCountChange(20)}
            >
              20
            </button>
            <button
              className={`settings-button ${
                questionCount === 30 ? "active" : ""
              }`}
              onClick={() => handleQuestionCountChange(30)}
            >
              30
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizSettings;
