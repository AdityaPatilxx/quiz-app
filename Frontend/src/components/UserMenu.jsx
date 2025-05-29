"use client";

import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";

export default function UserMenu() {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!currentUser) {
    return (
      <div className="flex items-center gap-2">
        <Link to="/login">
          <button className="px-4 py-2 rounded-lg bg-accent/90 hover:bg-accent/70 transition-colors">
            Login
          </button>
        </Link>
        <Link to="/signup">
          <button className="px-4 py-2 bg-accent/90  hover:bg-accent/70 text-accent-foreground rounded-lg transition-colors">
            Sign Up
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-accent/10 transition-colors"
      >
        <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-accent" />
        </div>
        <span className="max-w-[100px] truncate">
          {currentUser.displayName || currentUser.email.split("@")[0]}
        </span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-border">
            <p className="font-medium truncate">
              {currentUser.displayName || currentUser.email.split("@")[0]}
            </p>
            <p className="text-sm text-muted-foreground truncate">
              {currentUser.email}
            </p>
          </div>
          <div className="p-1">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent/10 w-full text-left"
              onClick={() => setIsOpen(false)}
            >
              <Settings className="w-4 h-4" />
              Profile Settings
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm rounded-md hover:bg-accent/10 w-full text-left text-red-500"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
