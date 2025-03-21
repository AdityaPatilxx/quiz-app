import { House, ChevronRight, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import QuizSettings from "./QuizSettings";

export default function Result({
  score,
  totalQuestions,
  questions,
  userAnswers,
  handleRestartQuiz,
  handleNextQuiz, // Add the new prop
}) {
  const progressIs = parseInt((score / totalQuestions) * 100);
  return (
    <>
      <div className="grid grid-cols-[1fr_8fr] gap-15 px-3">
        <div>
          <h3 className="text-3xl ">score</h3>
          <div className="text-center">
            <div className="text-7xl font-semibold text-accent2">{score}</div>
            <div className="w-12 border-b border-gray-400 mx-auto my-1"></div>
            <div className="text-7xl font-semibold text-accent2">
              {totalQuestions}
            </div>
          </div>
          <h3 className="text-3xl ">acc</h3>
          <div className="text-7xl font-semibold text-accent2">
            {progressIs}%
          </div>
        </div>

        <div className="bg-accent1 rounded-xl flex flex-col max-h-[300px] overflow-auto">
          {questions.map((currentQuestion, questionIndex) => (
            <div className="mb-4 p-3" key={currentQuestion.id}>
              <h4 className="text-lg font-semibold">
                {currentQuestion.question}
              </h4>
              <ul className="list-disc ml-3">
                {currentQuestion.options.map((currentOption, index) => (
                  <li
                    key={index}
                    className={`${
                      currentOption === currentQuestion.correctAnswer
                        ? "text-green-300"
                        : ""
                    }`}
                  >
                    {currentOption}
                    {userAnswers[questionIndex] === currentOption && (
                      <span className="ml-2 text-amber-500">✔</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-20 col-span-2">
          <Link to="/">
            <House className="h-9 w-9 text-secondary hover:text-font" />
          </Link>

          <RefreshCcw
            className="h-9 w-9 text-secondary hover:text-font"
            onClick={handleRestartQuiz}
          />

          {/* Use the handleNextQuiz function instead of Link */}
          <ChevronRight
            className="h-9 w-9 text-secondary hover:text-font cursor-pointer"
            onClick={handleNextQuiz}
          />
        </div>
      </div>
    </>
  );
}
