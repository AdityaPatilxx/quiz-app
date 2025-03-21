function QuizSettings() {
  return (
    <>
      <div className="flex flex-col items-center gap-10 mb-10">
        <div
          class=" flex w-min items-center gap-3 rounded-xl bg-(--color-accent1)"
          id="content-bar"
        >
          <div class="flex">
            <div class="btn active">standard</div>
            <div class="btn">timed</div>
          </div>
          <div class="spacer"></div>
          <div class="flex">
            <div class="btn active">easy</div>
            <div class="btn">medium</div>
            <div class="btn">hard</div>
          </div>
          <div class="spacer"></div>
          <div class="flex">
            <div class="btn active">10</div>
            <div class="btn">20</div>
            <div class="btn">30</div>
            <div class="btn">@</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default QuizSettings;
