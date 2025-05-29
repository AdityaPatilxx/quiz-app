"use client";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Check, AlertCircle, ArrowLeft } from "lucide-react";

export default function VerifyEmail() {
  const { currentUser, resendVerificationEmail } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already verified, redirect to home
    if (currentUser?.emailVerified) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  async function handleResendVerification() {
    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resendVerificationEmail();
      setMessage("Verification email sent! Check your inbox.");
    } catch (error) {
      console.error("Verification email error:", error);
      setError("Failed to send verification email. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  if (!currentUser) {
    return (
      <div className="max-w-md w-full mx-auto p-6 bg-background border border-border rounded-xl shadow-sm">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Email Verification</h1>
          <p className="text-muted-foreground mt-1">
            You need to be logged in to verify your email
          </p>
        </div>
        <div className="flex justify-center">
          <Link to="/login">
            <button className="px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors">
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
        <h1 className="text-2xl font-bold">Verify Your Email</h1>
        <p className="text-muted-foreground mt-1">
          We've sent a verification email to{" "}
          <strong>{currentUser.email}</strong>
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

      <div className="space-y-4">
        <p className="text-center">
          Please check your email and click on the verification link to complete
          your registration.
        </p>

        <p className="text-center text-sm text-muted-foreground">
          If you don't see the email, check your spam folder.
        </p>

        <div className="flex justify-center">
          <button
            onClick={handleResendVerification}
            disabled={loading}
            className="px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors disabled:opacity-70"
          >
            {loading ? (
              <span className="animate-spin">◌</span>
            ) : (
              "Resend Verification Email"
            )}
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-accent hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
