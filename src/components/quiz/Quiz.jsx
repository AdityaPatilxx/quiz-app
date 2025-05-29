import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import Question from "./Questions";
import Result from "./Result";
import axios from "axios";
import { Loader2, AlertCircle, RefreshCcw } from "lucide-react";
import { auth } from "../../firebase";
import { saveQuizProgress } from "../../progressUtils";

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
  const [error, setError] = useState(null);
  const [sessionToken, setSessionToken] = useState(null);

  const hasFetchedRef = useRef(false);
  const lastApiCallRef = useRef(0);
  const API_COOLDOWN = 5000;

  const categoryMap = {
    Science: 17,
    History: 23,
    Geography: 22,
    Film: 11,
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("trivia_token");
    if (savedToken) {
      setSessionToken(savedToken);
    }
  }, []);

  const getSessionToken = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://opentdb.com/api_token.php?command=request"
      );
      if (response.data.response_code === 0) {
        localStorage.setItem("trivia_token", response.data.token);
        setSessionToken(response.data.token);
        return response.data.token;
      }
    } catch (error) {
      console.warn("Failed to get session token:", error);
    }
    return null;
  }, []);

  const transformQuestionData = (triviaQuestions) => {
    return triviaQuestions.map((q) => {
      const allAnswers = [...q.incorrect_answers, q.correct_answer];
      const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

      return {
        question: q.question,
        options: shuffledAnswers,
        correctAnswer: q.correct_answer,
        category: q.category,
        difficulty: q.difficulty,
        type: q.type,
      };
    });
  };

  const makeRateLimitedApiCall = useCallback(async (apiCall) => {
    const now = Date.now();
    const timeSinceLastCall = now - lastApiCallRef.current;

    if (timeSinceLastCall < API_COOLDOWN) {
      const waitTime = API_COOLDOWN - timeSinceLastCall;
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }

    lastApiCallRef.current = Date.now();
    return await apiCall();
  }, []);

  const fetchQuestions = useCallback(async () => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
    setLoading(true);
    setError(null);

    try {
      let token = sessionToken;
      if (!token) {
        token = await getSessionToken();
      }

      const categoryId = categoryMap[category];
      let apiUrl = `https://opentdb.com/api.php?amount=${questionCount}&difficulty=${difficulty}&type=multiple`;

      if (categoryId) apiUrl += `&category=${categoryId}`;
      if (token) apiUrl += `&token=${token}`;
      apiUrl += "&encode=url3986";

      console.log("Fetching from Open Trivia DB:", apiUrl);

      const response = await makeRateLimitedApiCall(() => axios.get(apiUrl));

      switch (response.data.response_code) {
        case 0:
          if (response.data.results && response.data.results.length > 0) {
            const decodedResults = response.data.results.map((q) => ({
              ...q,
              question: decodeURIComponent(q.question),
              correct_answer: decodeURIComponent(q.correct_answer),
              incorrect_answers: q.incorrect_answers.map((ans) =>
                decodeURIComponent(ans)
              ),
            }));
            const transformedQuestions = transformQuestionData(decodedResults);
            setQuestions(transformedQuestions);
          } else {
            throw new Error("No questions returned from API");
          }
          break;

        case 1:
          setError({
            title: "No Questions Available",
            message: `Sorry, there aren't enough ${difficulty} ${category} questions available. Try different settings.`,
            canRetry: false,
          });
          break;

        case 2:
          setError({
            title: "Configuration Error",
            message:
              "There was an issue with the quiz settings. Please try again.",
            canRetry: true,
          });
          break;

        case 3:
        case 4:
          localStorage.removeItem("trivia_token");
          setSessionToken(null);
          await new Promise((resolve) => setTimeout(resolve, 3000));
          hasFetchedRef.current = false;
          return fetchQuestions();

        case 5:
          setError({
            title: "Too Many Requests",
            message:
              "You've made too many requests. Please wait a bit and try again.",
            canRetry: true,
          });
          break;

        default:
          throw new Error(
            `API returned unknown code: ${response.data.response_code}`
          );
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
      if (error.code === "NETWORK_ERROR" || !navigator.onLine) {
        setError({
          title: "Connection Error",
          message: "Check your internet connection and try again.",
          canRetry: true,
        });
      } else {
        setError({
          title: "Failed to Load Questions",
          message: "Something went wrong while loading the quiz.",
          canRetry: true,
        });
      }
    } finally {
      setLoading(false);
    }
  }, [
    questionCount,
    difficulty,
    category,
    sessionToken,
    getSessionToken,
    makeRateLimitedApiCall,
    categoryMap,
  ]);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  const handleAnswer = async (isCorrect, selectedOption) => {
    const updatedScore = isCorrect ? score + 1 : score;
    if (isCorrect) setScore(updatedScore);
    setUserAnswers((prev) => [...prev, selectedOption]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
      const user = auth.currentUser;
      if (user) {
        console.log("Attempting to save quiz progress for user:", user.uid);
        console.log("Quiz data:", {
          category,
          difficulty,
          questionCount: parseInt(questionCount),
          mode,
          score: updatedScore,
        });
        try {
          await saveQuizProgress(user.uid, {
            category,
            difficulty,
            questionCount: parseInt(questionCount),
            mode,
            score: updatedScore,
          });
          console.log("Progress saved successfully!");
        } catch (error) {
          console.error("Failed to save progress:", error.message, error.code);
        }
      } else {
        console.warn("No authenticated user found. Progress not saved.");
      }
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
    hasFetchedRef.current = false;
  };

  const handleNextQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
    hasFetchedRef.current = false;
    fetchQuestions();
  };

  const handleRetry = () => {
    setError(null);
    hasFetchedRef.current = false;
    fetchQuestions();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
        <p className="text-lg">Loading questions...</p>
        <p className="text-sm text-muted-foreground mt-2">
          Fetching from Open Trivia Database...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <AlertCircle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold mb-2">{error.title}</h2>
        <p className="text-muted-foreground mb-8 max-w-md">{error.message}</p>
        <div className="flex gap-4">
          {error.canRetry && (
            <button
              onClick={handleRetry}
              className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-medium transition-all"
            >
              <RefreshCcw className="w-4 h-4" />
              Try Again
            </button>
          )}
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 border border-border hover:bg-muted rounded-full font-medium transition-all"
          >
            Go Back
          </button>
        </div>
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
  const progress = Math.round(((currentQuestion + 1) / totalQuestions) * 100);

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
          <span className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm text-xs">
            Powered by Open Trivia DB
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
