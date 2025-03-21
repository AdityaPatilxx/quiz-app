import { Link } from "react-router-dom";
import { Atom, BookOpen, Earth, Video, Play } from "lucide-react";
import QuizSettings from "./QuizSettings";

const Home = () => {
  return (
    <main className="grid grid-rows-[auto_1fr] gap-y-5">
      <QuizSettings></QuizSettings>
      <div>
        <div className=" grid grid-cols-1 lg:grid-cols-4 gap-10 mb-10">
          <div className="card">
            <Atom className="w-20 h-20" />
            Science
          </div>
          <div className="card">
            <BookOpen className="w-20 h-20" />
            History
          </div>
          <div className="card">
            <Earth className="w-20 h-20" />
            Geography
          </div>
          <div className="card">
            <Video className="w-20 h-20" />
            Films
          </div>
        </div>
        <Link to="/quiz">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Start Quiz
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Home;
