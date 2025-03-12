import { useState } from "react";

export default function Question({
  question,
  options,
  correctAnswer,
  onAnswer,
  progress,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onAnswer(selectedOption === correctAnswer, selectedOption);
      setSelectedOption(null);
    } else {
      alert("Please select an answer.");
    }
  };

  return (
    <div className="panel flex flex-col justify-between gap-3 relative">

      <h3 className="text-xl font-semibold my-4 h-10">{question}</h3>

      <div className="flex flex-col gap-3 mb-7">
        {options.map((option, index) => (
          <label key={index} className="flex cursor-pointer">
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="appearance-none peer"
            />
            <div className="px-2.5 py-5 rounded w-full duration-500 ease-in-out bg-[#131319] peer-checked:bg-blue-300">
              {option}
            </div>
          </label>
        ))}
      </div>

      <div className="bg-[#131319] rounded flex justify-between items-center h-15 ">
        <div className="bg-white progressBarContainer">
          <div className="bg-green-400 progressBar" style={{ width: `${progress}%` }}></div>
        </div>
        <button onClick={handleSubmit} className="cursor-pointer flex-grow-1 w-[130px]">
          {(progress === 100) ? 'View Score' : 'Next Question'}
        </button>
      </div>

    </div>
  );
}
