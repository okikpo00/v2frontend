import QuestionCard from "./QuestionCard";

export default function QuestionFeed({
  questions,
  onYes,
  onNo
}) {

  if (!questions?.length)
    return null;

  return (

    <div className="question-feed">

      {questions.map(q => (

        <QuestionCard
          key={q.uuid}
          q={q}
          onYes={onYes}
          onNo={onNo}
        />

      ))}

    </div>

  );

}