export default function Result({
  score,
  totalQuestions,
  questions,
  userAnswers,
}) {
  const progressIs = parseInt((score / totalQuestions) * 100);
  let barColor;
  let barBgColor;
  if (progressIs <= 50) {
    barColor = "bg-red-500";
    barBgColor = "bg-red-300";
  } else if (progressIs <= 75) {
    barColor = "bg-orange-500";
    barBgColor = "bg-orange-300";
  } else {
    barColor = "bg-green-500";
    barBgColor = "bg-green-300";
  }
  return (
    <div className="panel flex flex-col justify-between gap-3 relative">
      <h2 className="text-2xl font-semibold mb-4">Quiz Summary</h2>

      <div className="bg-[#131319] rounded-xl flex flex-col h-15 flex-grow overflow-auto">
        {questions.map((currentQuestion, questionIndex) => (
          <div className="mb-4 p-3" key={currentQuestion.id}>
            <h4 className="text-lg font-semibold">
              {currentQuestion.question}
            </h4>
            <ul className="list-disc ml-3">
              {currentQuestion.options.map((currentOption, index) => (
                <li
                  key={index}
                  className={`${
                    currentOption === currentQuestion.correctAnswer
                      ? "text-green-300"
                      : ""
                  }`}
                >
                  {currentOption}
                  {userAnswers[questionIndex] === currentOption && (
                    <span className="ml-2 text-amber-500">✔</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="bg-[#131319] rounded flex justify-between items-center h-15 ">
        <div className={`${barBgColor} progressBarContainer`}>
          <div
            className={`${barColor} progressBar`}
            style={{ width: `${progressIs}%` }}
          ></div>
        </div>
        <p className="flex-grow-1 text-center">
          {score} / {totalQuestions} points
        </p>
      </div>
    </div>
  );
}
