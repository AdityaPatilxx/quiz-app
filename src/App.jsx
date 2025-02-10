import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Quiz from "./components/Quiz";

function App() {
  return (
    <>
      <nav>
        
      </nav>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/quiz" element={<Quiz></Quiz>}></Route>
      </Routes>
    </>
  );
}

export default App;
