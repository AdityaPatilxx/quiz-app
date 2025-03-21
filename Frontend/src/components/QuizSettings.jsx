import { useState } from "react";

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
    <div className="flex flex-col items-center gap-10">
      <div
        className="flex w-min items-center gap-3 rounded-xl bg-(--color-accent1)"
        id="content-bar"
      >
        <div className="flex">
          <div
            className={`btn ${mode === "standard" ? "active" : ""}`}
            onClick={() => handleModeChange("standard")}
          >
            standard
          </div>
          <div
            className={`btn ${mode === "timed" ? "active" : ""}`}
            onClick={() => handleModeChange("timed")}
          >
            timed
          </div>
        </div>
        <div className="spacer"></div>
        <div className="flex">
          <div
            className={`btn ${difficulty === "easy" ? "active" : ""}`}
            onClick={() => handleDifficultyChange("easy")}
          >
            easy
          </div>
          <div
            className={`btn ${difficulty === "medium" ? "active" : ""}`}
            onClick={() => handleDifficultyChange("medium")}
          >
            medium
          </div>
          <div
            className={`btn ${difficulty === "hard" ? "active" : ""}`}
            onClick={() => handleDifficultyChange("hard")}
          >
            hard
          </div>
        </div>
        <div className="spacer"></div>
        <div className="flex">
          <div
            className={`btn ${questionCount === 10 ? "active" : ""}`}
            onClick={() => handleQuestionCountChange(10)}
          >
            10
          </div>
          <div
            className={`btn ${questionCount === 20 ? "active" : ""}`}
            onClick={() => handleQuestionCountChange(20)}
          >
            20
          </div>
          <div
            className={`btn ${questionCount === 30 ? "active" : ""}`}
            onClick={() => handleQuestionCountChange(30)}
          >
            30
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizSettings;
