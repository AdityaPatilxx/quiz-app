import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Quiz App</h1>
      <Link to="/quiz">
        <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Start Quiz
        </button>
      </Link>
    </div>
  );
};

export default Home;
