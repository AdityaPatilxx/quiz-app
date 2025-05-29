import { Link } from "react-router-dom";
import { Construction } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
      <Construction className="w-16 h-16 text-accent mb-4" />
      <h2 className="text-2xl font-bold mb-2">Coming Soon!</h2>
      <p className="text-muted-foreground mb-6 max-w-md">
        The leaderboard feature is under construction. Check back soon to see
        how you stack up against other quiz enthusiasts!
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-medium transition-all"
      >
        Back to Home
      </Link>
    </div>
  );
}