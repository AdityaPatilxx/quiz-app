"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { AlertCircle, Check, User } from "lucide-react";

export default function ProfileForm() {
  const { currentUser, updateUserProfile, resendVerificationEmail } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    if (currentUser?.displayName) {
      setDisplayName(currentUser.displayName);
    }
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await updateUserProfile({ displayName });
      setMessage("Profile updated successfully");
    } catch (error) {
      console.error("Profile update error:", error);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResendVerification() {
    try {
      setError("");
      setVerificationSent(false);
      await resendVerificationEmail();
      setVerificationSent(true);
    } catch (error) {
      console.error("Verification email error:", error);
      setError("Failed to send verification email. Please try again later.");
    }
  }

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-background border border-border rounded-xl shadow-sm">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-accent" />
        </div>
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account information
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

      {!currentUser?.emailVerified && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg">
          <p className="mb-2">Your email is not verified.</p>
          {verificationSent ? (
            <p className="text-sm">
              Verification email sent! Check your inbox.
            </p>
          ) : (
            <button
              onClick={handleResendVerification}
              className="text-sm font-medium underline"
            >
              Resend verification email
            </button>
          )}
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
            value={currentUser?.email || ""}
            disabled
            className="w-full px-3 py-2 border border-border rounded-lg bg-muted"
          />
          <p className="text-xs text-muted-foreground">
            Email cannot be changed
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="displayName" className="block text-sm font-medium">
            Display Name
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/50"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-accent hover:bg-accent/90 text-accent-foreground rounded-lg transition-colors disabled:opacity-70"
        >
          {loading ? <span className="animate-spin">◌</span> : "Update Profile"}
        </button>
      </form>
    </div>
  );
}
