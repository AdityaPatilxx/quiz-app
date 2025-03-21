import { useState } from "react";
import { Link } from "react-router-dom";
import { Atom, BookOpen, Earth, Video } from "lucide-react";
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

  return (
    <main className="grid grid-rows-[auto_1fr] gap-y-5">
      <QuizSettings onSettingsChange={handleSettingsChange} />
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-10">
          <div
            className={`card ${getCategoryClass("Science")}`}
            onClick={() => handleCategoryChange("Science")}
          >
            <Atom className="w-20 h-20" />
            Science
          </div>
          <div
            className={`card ${getCategoryClass("History")}`}
            onClick={() => handleCategoryChange("History")}
          >
            <BookOpen className="w-20 h-20" />
            History
          </div>
          <div
            className={`card ${getCategoryClass("Geography")}`}
            onClick={() => handleCategoryChange("Geography")}
          >
            <Earth className="w-20 h-20" />
            Geography
          </div>
          <div
            className={`card ${getCategoryClass("Film")}`}
            onClick={() => handleCategoryChange("Film")}
          >
            <Video className="w-20 h-20" />
            Films
          </div>
        </div>
        <Link
          to={`/quiz?mode=${settings.mode}&difficulty=${settings.difficulty}&questionCount=${settings.questionCount}&category=${settings.category}`}
        >
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Start Quiz
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
