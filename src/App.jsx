import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/quiz/Quiz";
import Nav from "./components/Nav";
import Error404 from "./components/Error404";
import ComingSoon from "./components/ComingSoon";
import About from "./components/About";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import { Github } from "lucide-react";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Nav />
        <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/leaderboard" element={<ComingSoon />} />
            <Route path="/about" element={<About />} />
            <Route path="/settings" element={<ComingSoon />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
        <footer className="py-4 text-center text-sm text-muted-foreground  flex items-center justify-center ">
          <p className="">
            Aditya © {new Date().getFullYear()} Quiz App
            
          </p>
          <a
              href="https://github.com/AdityaPatilxx/quiz-app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 ml-2 hover:text-accent transition-colors "
              aria-label="View QuizMaster repository on GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;