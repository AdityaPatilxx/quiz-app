import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Nav from "./components/Nav";
import Error404 from "./components/Error404";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Nav />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </main>
      <footer className="py-4 text-center text-sm text-muted-foreground">
        <p>Aditya © {new Date().getFullYear()} Quiz App</p>
      </footer>
    </div>
  );
}

export default App;
