import { useState } from "react";
import he from "he";
import { ChevronRight } from "lucide-react";

export default function Question({
  question,
  options,
  correctAnswer,
  onAnswer,
  progress,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption !== null) {
      onAnswer(selectedOption === correctAnswer, selectedOption);
      setSelectedOption(null);
    } else {
      alert("Please select an answer.");
    }
  };

  const getOptionClass = (option) => {
    if (selectedOption === option) {
      return "text-accent1 bg-accent2 ";
    }
    return "bg-accent1 text-font hover:bg-accent2";
  };

  return (
    <>
      <h3 className="col-span-2 text-3xl text-accent2 min-h-[80px]">
        {he.decode(question)}
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        {options.map((option, index) => (
          <div
            key={index}
            onClick={() => handleOptionChange(option)}
            className={` text-lg hover:text-accent1 cursor-pointer flex justify-center items-center p-4 rounded-lg transition-colors duration-300 ${getOptionClass(
              option
            )}`}
          >
            {option}
          </div>
        ))}
      </div>

      <ChevronRight
        onClick={handleSubmit}
        className="h-10 w-10 mx-auto text-secondary hover:text-font"
      />
    </>
  );
}
