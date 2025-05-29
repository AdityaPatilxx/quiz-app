"use client";

import { Settings, Info, Crown, FileQuestion, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserMenu from "./UserMenu";

function Nav() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="bg-accent/20 p-2 rounded-lg">
            <FileQuestion className="text-accent w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">QuizMaster</h1>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-accent/10"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button className="nav-item flex items-center gap-1 hover:text-accent transition-colors">
            <Info className="w-5 h-5" />
            <span>About</span>
          </button>
          <button className="nav-item flex items-center gap-1 hover:text-accent transition-colors">
            <Crown className="w-5 h-5" />
            <span>Leaderboard</span>
          </button>
          <button className="nav-item flex items-center gap-1 hover:text-accent transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <div className="h-8 w-px bg-border"></div>
          <UserMenu />
        </nav>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-background border-b border-border md:hidden">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
              <button className="flex items-center gap-2 p-2 hover:bg-accent/10 rounded-md">
                <Info className="w-5 h-5" />
                <span>About</span>
              </button>
              <button className="flex items-center gap-2 p-2 hover:bg-accent/10 rounded-md">
                <Crown className="w-5 h-5" />
                <span>Leaderboard</span>
              </button>
              <button className="flex items-center gap-2 p-2 hover:bg-accent/10 rounded-md">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <div className="p-2">
                <UserMenu />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Nav;
