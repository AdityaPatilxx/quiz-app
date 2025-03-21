import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="mx-auto grid min-h-screen w-full max-w-screen-xl grid-rows-[auto_1fr_auto] gap-y-8 overflow-hidden px-8 py-8">
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/quiz" element={<Quiz></Quiz>}></Route>
      </Routes>
    </div>
  );
}

export default App;
