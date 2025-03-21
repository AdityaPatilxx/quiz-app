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
    <>
      <h3 className="col-span-2 text-3xl text-accent2">
        {he.decode(question)}
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        {options.map((option, index) => (
          <label key={index} className="cursor-pointer flex justify-center  ">
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="appearance-none peer"
            />
            <div className="option w-full h-full">{option}</div>
          </label>
        ))}
      </div>

      <ChevronRight
        onClick={handleSubmit}
        className="h-10 w-10 mx-auto text-secondary hover:text-font"
      />
    </>
  );
}
