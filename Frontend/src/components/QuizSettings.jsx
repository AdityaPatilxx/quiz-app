function QuizSettings() {
  return (
    <>
      <div className="flex flex-col items-center gap-10 mb-10">
        <div
          className=" flex w-min items-center gap-3 rounded-xl bg-(--color-accent1)"
          id="content-bar"
        >
          <div className="flex">
            <div className="btn active">standard</div>
            <div className="btn">timed</div>
          </div>
          <div className="spacer"></div>
          <div className="flex">
            <div className="btn active">easy</div>
            <div className="btn">medium</div>
            <div className="btn">hard</div>
          </div>
          <div className="spacer"></div>
          <div className="flex">
            <div className="btn active">10</div>
            <div className="btn">20</div>
            <div className="btn">30</div>
            <div className="btn">@</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizSettings;
