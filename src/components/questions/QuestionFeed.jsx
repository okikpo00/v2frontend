import QuestionCard from "./QuestionCard";

export default function QuestionFeed({ questions }) {

  if (!questions?.length) {
    return (
      <div className="empty-state empty-state--feed">
        <div className="empty-title">
          No trending questions right now
        </div>

        <div className="empty-sub">
          New questions appear daily.  
          Check back soon.
        </div>
      </div>
    );
  }

  return (
    <div className="question-feed">
      {questions.map(q => (
        <QuestionCard key={q.uuid} q={q} />
      ))}
    </div>
  );
}
