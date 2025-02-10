import { useState } from "react";
import Question from "./Questions";
import Result from "./Result";

// Quiz Component
const Quiz = () => {
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Paris", "Madrid", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Jupiter", "Mars", "Venus", "Saturn"],
      correctAnswer: "Mars",
    },
    {
      question: "What is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Polar Bear", "Giraffe"],
      correctAnswer: "Blue Whale",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "NaCl", "O2"],
      correctAnswer: "H2O",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
      correctAnswer: "Leonardo da Vinci",
    },
    {
      question: "In what year did World War II begin?",
      options: ["1914", "1939", "1945", "1929"],
      correctAnswer: "1939",
    },
    {
      question: "What is the smallest country in the world?",
      options: ["Monaco", "Nauru", "Tuvalu", "Vatican City"],
      correctAnswer: "Vatican City",
    },
    {
      question: "What is the currency of Japan?",
      options: ["Won", "Yen", "Rupee", "Dollar"],
      correctAnswer: "Yen",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  const totalQuestions = questions.length;
  const progress = parseInt(((currentQuestion + 1) / totalQuestions) * 100);

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

  return (
    <div className="max-w-xl mx-auto mt-10">
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
        />
      )}

      {showResult && (
        <button
          onClick={handleRestartQuiz}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Restart Quiz
        </button>
      )}
    </div>
  );
};

export default Quiz;
