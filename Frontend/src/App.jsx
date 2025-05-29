import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Nav from "./components/Nav";
import Error404 from "./components/Error404";
import { AuthProvider } from "./contexts/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";
import VerifyEmailPage from "./pages/VerifyEmailPage";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Nav />
        <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/verify-email" element={<VerifyEmailPage />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </main>
        <footer className="py-4 text-center text-sm text-muted-foreground">
          <p>Aditya © {new Date().getFullYear()} Quiz App</p>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
