"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Eye, EyeOff, UserPlus, AlertCircle, Check } from "lucide-react";

export default function SignupForm() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { signup, googleSignIn } = useAuth();
  const navigate = useNavigate();

  // Password strength indicators
  const hasMinLength = password.length >= 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const passwordStrength = [
    hasMinLength,
    hasUpperCase,
    hasLowerCase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length;

  async function handleSubmit(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    if (passwordStrength < 3) {
      return setError("Password is not strong enough");
    }

    try {
      setError("");
      setLoading(true);
      await signup(email, password, displayName);
      setSuccess(true);
    } catch (error) {
      console.error("Signup error:", error);
      setError(
        error.code === "auth/email-already-in-use"
          ? "An account with this email already exists"
          : error.code === "auth/invalid-email"
          ? "Invalid email address"
          : error.code === "auth/weak-password"
          ? "Password is too weak"
          : "Failed to create an account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleSignIn() {
    try {
      setError("");
      setLoading(true);
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="max-w-md w-full mx-auto p-6 bg-background border border-border rounded-xl shadow-sm">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check className="w-6 h-6 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold">Verification Email Sent</h1>
          <p className="text-muted-foreground mt-3">
            We've sent a verification email to <strong>{email}</strong>. Please
            check your inbox and click the verification link to complete your
            registration.
          </p>
        </div>
        <div className="mt-6">
          <Link to="/login">
            <button className="w-full px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors">
              Go to Login
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-background border border-border rounded-xl shadow-sm">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground mt-1">
          Sign up to start taking quizzes
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="displayName" className="block text-sm font-medium">
            Name
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
            placeholder="Your name"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Password strength meter */}
          {password.length > 0 && (
            <div className="mt-2">
              <div className="flex gap-1 mb-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-1.5 flex-1 rounded-full ${
                      passwordStrength >= level
                        ? passwordStrength < 3
                          ? "bg-red-400"
                          : passwordStrength < 4
                          ? "bg-yellow-400"
                          : "bg-green-400"
                        : "bg-muted"
                    }`}
                  ></div>
                ))}
              </div>
              <div className="text-xs text-muted-foreground space-y-1 mt-2">
                <div
                  className={`flex items-center gap-1 ${
                    hasMinLength ? "text-green-600" : ""
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      hasMinLength ? "bg-green-400" : "bg-muted"
                    }`}
                  ></div>
                  <span>At least 8 characters</span>
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    hasUpperCase && hasLowerCase ? "text-green-600" : ""
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      hasUpperCase && hasLowerCase ? "bg-green-400" : "bg-muted"
                    }`}
                  ></div>
                  <span>Upper & lowercase letters</span>
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    hasNumber ? "text-green-600" : ""
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      hasNumber ? "bg-green-400" : "bg-muted"
                    }`}
                  ></div>
                  <span>At least one number</span>
                </div>
                <div
                  className={`flex items-center gap-1 ${
                    hasSpecialChar ? "text-green-600" : ""
                  }`}
                >
                  <div
                    className={`w-3 h-3 rounded-full ${
                      hasSpecialChar ? "bg-green-400" : "bg-muted"
                    }`}
                  ></div>
                  <span>At least one special character</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium"
          >
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors disabled:opacity-70"
        >
          {loading ? (
            <span className="animate-spin">◌</span>
          ) : (
            <UserPlus className="w-5 h-5" />
          )}
          Sign Up
        </button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-background text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-background hover:bg-muted border border-border rounded-lg transition-colors disabled:opacity-70"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 h-5"
        >
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign up with Google
      </button>

      <div className="mt-6 text-center text-sm">
        <span className="text-muted-foreground">Already have an account? </span>
        <Link to="/login" className="text-accent hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}
