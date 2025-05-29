"use client";

import { useState, useCallback, useMemo } from "react";
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
  Info,
} from "lucide-react";
import QuizSettings from "./QuizSettings";

const Home = () => {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    mode: "standard",
    difficulty: "easy",
    questionCount: 10,
    category: "Science",
  });

  // Memoized category data to prevent recreating on each render
  const categories = useMemo(
    () => [
      {
        id: "Science",
        name: "Science",
        icon: Atom,
        description: "Physics, Chemistry, Biology and more",
        color: "text-blue-500",
        bgColor: "bg-blue-50",
      },
      {
        id: "History",
        name: "History",
        icon: BookOpen,
        description: "Ancient civilizations to modern times",
        color: "text-amber-500",
        bgColor: "bg-amber-50",
      },
      {
        id: "Geography",
        name: "Geography",
        icon: Earth,
        description: "Countries, capitals, and landmarks",
        color: "text-green-500",
        bgColor: "bg-green-50",
      },
      {
        id: "Film",
        name: "Films",
        icon: Video,
        description: "Movies, directors, and cinema history",
        color: "text-purple-500",
        bgColor: "bg-purple-50",
      },
    ],
    []
  );

  const features = useMemo(
    () => [
      {
        icon: Brain,
        title: "Knowledge Challenge",
        description: "Test your knowledge across various subjects and topics",
      },
      {
        icon: Lightbulb,
        title: "Learn As You Play",
        description: "Discover new facts and information with each question",
      },
      {
        icon: Sparkles,
        title: "Track Progress",
        description: "See your scores and improvement over time",
      },
    ],
    []
  );

  const handleSettingsChange = useCallback((newSettings) => {
    setSettings((prevSettings) => ({ ...prevSettings, ...newSettings }));
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSettings((prevSettings) => ({ ...prevSettings, category }));
  }, []);

  const getCategoryClass = useCallback(
    (category) => {
      return settings.category === category ? "active" : "";
    },
    [settings.category]
  );

  const handleStartQuiz = useCallback(() => {
    const queryString = new URLSearchParams({
      mode: settings.mode,
      difficulty: settings.difficulty,
      questionCount: settings.questionCount.toString(),
      category: settings.category,
    }).toString();

    navigate(`/quiz?${queryString}`);
  }, [navigate, settings]);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 tracking-tight">
          Test Your Knowledge
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Challenge yourself with our quiz app. Select your preferred category,
          difficulty, and settings to get started.
        </p>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Info className="w-4 h-4" />
          <span>Powered by Open Trivia Database</span>
        </div>
      </section>

      {/* Quiz Settings */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Quiz Settings</h2>
        <QuizSettings onSettingsChange={handleSettingsChange} />
      </section>

      {/* Category Selection */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Select Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div
                key={category.id}
                className={`category-card group ${getCategoryClass(
                  category.id
                )}`}
                onClick={() => handleCategoryChange(category.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCategoryChange(category.id);
                  }
                }}
                aria-pressed={settings.category === category.id}
              >
                <div
                  className={`w-16 h-16 rounded-full ${category.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className={`w-8 h-8 ${category.color}`} />
                </div>
                <h3 className="text-lg font-medium mb-2">{category.name}</h3>
                <p className="text-sm text-muted-foreground text-center">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Start Quiz Button */}
      <div className="flex justify-center mb-16">
        <button
          onClick={handleStartQuiz}
          className="flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full text-lg font-medium transition-all hover:shadow-lg hover:scale-105"
        >
          <Play className="w-5 h-5" />
          Start Quiz ({settings.questionCount} questions)
        </button>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg border border-border hover:shadow-md transition-shadow"
            >
              <IconComponent className="w-10 h-10 text-accent mb-4" />
              <h3 className="text-lg font-medium mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Current Settings Display */}
      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h4 className="font-medium mb-2">Current Settings:</h4>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="px-2 py-1 bg-background rounded">
            {settings.category}
          </span>
          <span className="px-2 py-1 bg-background rounded">
            {settings.difficulty.charAt(0).toUpperCase() +
              settings.difficulty.slice(1)}
          </span>
          <span className="px-2 py-1 bg-background rounded">
            {settings.questionCount} questions
          </span>
          <span className="px-2 py-1 bg-background rounded">
            {settings.mode.charAt(0).toUpperCase() + settings.mode.slice(1)}{" "}
            mode
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
