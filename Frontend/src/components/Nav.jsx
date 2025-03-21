import { User, Settings, Info, Crown, FileQuestion } from "lucide-react";

function Nav() {
  return (
    <div className="flex items-center gap-5 justify-between">
      <div className="flex items-center gap-5">
        <h1 className="text-4xl font-bold text-font flex items-center gap-2">
          <FileQuestion className="text-accent2 w-10 h-10" />
          quiz
        </h1>
        <Crown />
        <Info />
        <Settings />
      </div>

      <User />
    </div>
  );
}

export default Nav;
