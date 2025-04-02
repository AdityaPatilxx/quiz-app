import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Question from "./Questions";
import Result from "./Result";
import axios from "axios";

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

    // Fetch new questions with the same settings
    fetchQuestions();
  };

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (!questions || questions.length === 0) {
    return <h1>No questions available for the selected criteria</h1>;
  }

  const totalQuestions = questions.length;
  const progress = parseInt(((currentQuestion + 1) / totalQuestions) * 100);

  return (
    <div className="mx-auto flex flex-col justify-center gap-10 p-2 w-full ">
      {!showResult ? (
        <Question
          question={questions[currentQuestion].question}
          options={questions[currentQuestion].options}
          correctAnswer={questions[currentQuestion].correctAnswer}
          progress={progress}
          onAnswer={handleAnswer}
        />
      ) : (
        <Result
          score={score}
          totalQuestions={questions.length}
          questions={questions}
          userAnswers={userAnswers}
          handleRestartQuiz={handleRestartQuiz}
          handleNextQuiz={handleNextQuiz} // Pass the new function to Result
        />
      )}
    </div>
  );
};

export default Quiz;
