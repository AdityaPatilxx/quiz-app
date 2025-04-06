

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Question from "./Questions";
import Result from "./Result";
import axios from "axios";
import { Loader2 } from "lucide-react";

const Quiz = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");
  const difficulty = queryParams.get("difficulty");
  const questionCount = queryParams.get("questionCount");
  const category = queryParams.get("category");

  const [questions, setQuestions] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchQuestions = () => {
    setLoading(true);
    axios
      .get(
        `http://localhost:3001/questions/filter?limit=${questionCount}&difficulty=${difficulty}&category=${category}`
      )
      .then((response) => {
        setQuestions(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchQuestions();
  }, [questionCount, difficulty, category]);

  const handleAnswer = (isCorrect, selectedOption) => {
    if (isCorrect) {
      setScore(score + 1);
    }
    setUserAnswers([...userAnswers, selectedOption]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
  };

  const handleNextQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
    fetchQuestions();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
        <p className="text-lg">Loading questions...</p>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-semibold mb-4">No Questions Available</h2>
        <p className="text-muted-foreground mb-6">
          We couldn't find any questions matching your selected criteria.
        </p>
        <button
          onClick={() => window.history.back()}
          className="px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-medium transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  const totalQuestions = questions.length;
  const progress = Number.parseInt(
    ((currentQuestion + 1) / totalQuestions) * 100
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{category} Quiz</h1>
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
          <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
            {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
          </span>
        </div>
      </div>

      {!showResult ? (
        <Question
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          correctAnswer={questions[currentQuestion].correctAnswer}
          progress={progress}
          onAnswer={handleAnswer}
          mode={mode}
        />
      ) : (
        <Result
          score={score}
          totalQuestions={questions.length}
          questions={questions}
          userAnswers={userAnswers}
          handleRestartQuiz={handleRestartQuiz}
          handleNextQuiz={handleNextQuiz}
          category={category}
          difficulty={difficulty}
        />
      )}
    </div>
  );
};

export default Quiz;
