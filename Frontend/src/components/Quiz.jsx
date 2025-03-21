import { useEffect, useState } from "react";
import Question from "./Questions";
import Result from "./Result";
import axios from "axios"; 


const Quiz = () => {

  // const [questions, setQuestions] = useState(null);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/questions/filter?limit=5")
  //     .then((response) => setQuestions(response.data))
  //     .catch((error) => {
  //       console.error("Error fetching questions:", error);
  //     });
  // }, []);

  const questions = [
    {
      question: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi voluptas, ducimus pariatur obcaecati enim facere vero eum, impedit odit sit?",
      options: ["Berlin", "Paris", "Madrid", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Jupiter", "Mars", "Venus", "Saturn"],
      correctAnswer: "Mars",
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);

  if(!questions){
    return <h1>Loading</h1>
  }

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
    <div className="mx-auto flex flex-col gap-10 p-2 w-full">
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
        />
      )}

      
    </div>
  );
};

export default Quiz;
