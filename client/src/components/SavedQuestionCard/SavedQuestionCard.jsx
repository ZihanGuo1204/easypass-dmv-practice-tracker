import "./SavedQuestionCard.css";

function SavedQuestionCard({ question }) {
  return (
    <div className="saved-question-card">
      <h3>{question.questionText}</h3>
      <p>
        <strong>Question ID:</strong> {question.questionId}
      </p>
      <p>
        <strong>Topic:</strong> {question.topic}
      </p>
      <p>
        <strong>Difficulty:</strong> {question.difficulty}
      </p>
      <p>
        <strong>Source:</strong> {question.source}
      </p>
      <p>
        <strong>Reviewed:</strong> {question.isReviewed ? "Yes" : "No"}
      </p>
      <p>
        <strong>Note:</strong> {question.personalNote || "No note yet"}
      </p>
    </div>
  );
}

export default SavedQuestionCard;