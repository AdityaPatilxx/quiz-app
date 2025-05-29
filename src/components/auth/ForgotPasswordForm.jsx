"use client";

import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AlertCircle, Check, ArrowLeft } from "lucide-react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(email);
      setMessage("Check your email for password reset instructions");
    } catch (error) {
      console.error("Password reset error:", error);
      setError(
        error.code === "auth/user-not-found"
          ? "No account found with this email"
          : error.code === "auth/invalid-email"
          ? "Invalid email address"
          : "Failed to reset password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-background border border-border rounded-xl shadow-sm">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <p className="text-muted-foreground mt-1">
          Enter your email and we'll send you a reset link
        </p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {message && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start gap-2">
          <Check className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors disabled:opacity-70"
        >
          {loading ? <span className="animate-spin">◌</span> : "Reset Password"}
        </button>
      </form>

      <div className="mt-6 text-center">
        <Link
          to="/login"
          className="inline-flex items-center gap-1 text-accent hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to login
        </Link>
      </div>
    </div>
  );
}
