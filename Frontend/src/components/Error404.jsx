import { Link } from "react-router-dom";
import { Home } from "lucide-react";

function Error404() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-9xl font-bold text-accent mb-4">404</h1>
      <p className="text-2xl mb-8">Page not found</p>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link to="/">
        <button className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-accent-foreground rounded-full font-medium transition-all">
          <Home className="w-5 h-5" />
          Back to Home
        </button>
      </Link>
    </div>
  );
}

export default Error404;
