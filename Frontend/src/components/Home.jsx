"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Atom,
  BookOpen,
  Earth,
  Video,
  Play,
  Brain,
  Lightbulb,
  Sparkles,
} from "lucide-react";
import QuizSettings from "./QuizSettings";

const Home = () => {
  const [settings, setSettings] = useState({
    mode: "standard",
    difficulty: "easy",
    questionCount: 10,
    category: "Science",
  });

  const handleSettingsChange = (newSettings) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  };

  const handleCategoryChange = (category) => {
    setSettings((prevSettings) => ({ ...prevSettings, category }));
  };

  const getCategoryClass = (category) => {
    return settings.category === category ? "active" : "";
  };

  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(
      `/quiz?mode=${settings.mode}&difficulty=${settings.difficulty}&questionCount=${settings.questionCount}&category=${settings.category}`
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          Test Your Knowledge
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Challenge yourself with our quiz app. Select your preferred category,
          difficulty, and settings to get started.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Quiz Settings</h2>
        <QuizSettings onSettingsChange={handleSettingsChange} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Select Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            className={`category-card ${getCategoryClass("Science")}`}
            onClick={() => handleCategoryChange("Science")}
          >
            <Atom className="w-12 h-12 mb-4 icon" />
            <h3 className="text-lg font-medium">Science</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Physics, Chemistry, Biology and more
            </p>
          </div>
          <div
            className={`category-card ${getCategoryClass("History")}`}
            onClick={() => handleCategoryChange("History")}
          >
            <BookOpen className="w-12 h-12 mb-4 icon" />
            <h3 className="text-lg font-medium">History</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Ancient civilizations to modern times
            </p>
          </div>
          <div
            className={`category-card ${getCategoryClass("Geography")}`}
            onClick={() => handleCategoryChange("Geography")}
          >
            <Earth className="w-12 h-12 mb-4 icon" />
            <h3 className="text-lg font-medium">Geography</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Countries, capitals, and landmarks
            </p>
          </div>
          <div
            className={`category-card ${getCategoryClass("Film")}`}
            onClick={() => handleCategoryChange("Film")}
          >
            <Video className="w-12 h-12 mb-4 icon" />
            <h3 className="text-lg font-medium">Films</h3>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Movies, directors, and cinema history
            </p>
          </div>
        </div>
      </section>

      <div className="flex justify-center">
        <button
          onClick={handleStartQuiz}
          className="flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full text-lg font-medium transition-all hover:shadow-lg"
        >
          <Play className="w-5 h-5" />
          Start Quiz
        </button>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border">
          <Brain className="w-10 h-10 text-accent mb-4" />
          <h3 className="text-lg font-medium mb-2">Knowledge Challenge</h3>
          <p className="text-sm text-muted-foreground">
            Test your knowledge across various subjects and topics
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border">
          <Lightbulb className="w-10 h-10 text-accent mb-4" />
          <h3 className="text-lg font-medium mb-2">Learn As You Play</h3>
          <p className="text-sm text-muted-foreground">
            Discover new facts and information with each question
          </p>
        </div>
        <div className="flex flex-col items-center text-center p-6 rounded-lg border border-border">
          <Sparkles className="w-10 h-10 text-accent mb-4" />
          <h3 className="text-lg font-medium mb-2">Track Progress</h3>
          <p className="text-sm text-muted-foreground">
            See your scores and improvement over time
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
