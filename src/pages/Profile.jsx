import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import ProfileForm from "../components/auth/ProfileForm";
import RequireAuth from "../components/auth/RequireAuth";
import { getUserProgress } from "../progressUtils";
import { Loader2, AlertCircle, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  const { currentUser } = useAuth();
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchProgress = async () => {
        setLoading(true);
        try {
          const userProgress = await getUserProgress(currentUser.uid);
          setProgress(userProgress);
        } catch (err) {
          setError("Failed to load progress.");
        } finally {
          setLoading(false);
        }
      };
      fetchProgress();
    }
  }, [currentUser]);

  const calculateStats = (progress) => {
    const totalQuizzes = progress.length;
    const avgScore = progress.length
      ? (
          progress.reduce(
            (sum, attempt) => sum + attempt.score / attempt.questionCount,
            0
          ) / progress.length * 100
        ).toFixed(1)
      : 0;
    const bestScore = progress.length
      ? Math.max(
          ...progress.map((attempt) => (attempt.score / attempt.questionCount) * 100)
        ).toFixed(1)
      : 0;
    return { totalQuizzes, avgScore, bestScore };
  };

  return (
    <RequireAuth>
      <div className="max-w-4xl mx-auto py-8">
        <ProfileForm />
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6">Your Quiz Progress</h2>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-12 h-12 text-accent animate-spin mb-4" />
              <p className="text-lg">Loading progress...</p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <AlertCircle className="w-16 h-16 text-destructive mb-4" />
              <h3 className="text-xl font-semibold mb-2">Error</h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Link
                to="/"
                className="px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-medium transition-all"
              >
                Back to Home
              </Link>
            </div>
          ) : progress.length === 0 ? (
            <div className="text-center py-12">
              <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-6">
                No quiz attempts yet. Take a quiz to see your progress!
              </p>
              <Link
                to="/"
                className="px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-medium transition-all"
              >
                Start a Quiz
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold text-accent">
                    {calculateStats(progress).totalQuizzes}
                  </p>
                  <p className="text-sm text-muted-foreground">Quizzes Taken</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold text-accent">
                    {calculateStats(progress).avgScore}%
                  </p>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-2xl font-bold text-accent">
                    {calculateStats(progress).bestScore}%
                  </p>
                  <p className="text-sm text-muted-foreground">Best Score</p>
                </div>
              </div>
              <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
                <div className="grid gap-4">
                  {progress.map((attempt) => (
                    <div
                      key={attempt.id}
                      className="p-4 bg-muted rounded-lg flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-medium">{attempt.category} Quiz</h3>
                        <p className="text-sm text-muted-foreground">
                          {attempt.difficulty.charAt(0).toUpperCase() +
                            attempt.difficulty.slice(1)}{" "}
                          • {attempt.mode.charAt(0).toUpperCase() +
                            attempt.mode.slice(1)}{" "}
                          • {attempt.questionCount} Questions
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(attempt.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-accent">
                          {attempt.score}/{attempt.questionCount}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {Math.round((attempt.score / attempt.questionCount) * 100)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </RequireAuth>
  );
}