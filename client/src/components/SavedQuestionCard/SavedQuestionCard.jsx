import "./SavedQuestionCard.css";
import PropTypes from "prop-types";

function SavedQuestionCard({ question, onDelete, onMarkReviewed }) {
  return (
    <div className="saved-question-card">
      <h3>{question.questionText}</h3>

      <p><strong>Question ID:</strong> {question.questionId}</p>
      <p><strong>Topic:</strong> {question.topic}</p>
      <p><strong>Difficulty:</strong> {question.difficulty}</p>
      <p><strong>Source:</strong> {question.source}</p>
      <p><strong>Reviewed:</strong> {question.isReviewed ? "Yes" : "No"}</p>
      <p><strong>Note:</strong> {question.personalNote || "No note yet"}</p>

      <div className="button-group">
        <button onClick={() => onMarkReviewed(question._id)}>
          Mark as Reviewed
        </button>

        <button className="delete-btn" onClick={() => onDelete(question._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

SavedQuestionCard.propTypes = {
  question: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    questionId: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    topic: PropTypes.string,
    difficulty: PropTypes.string,
    source: PropTypes.string,
    isReviewed: PropTypes.bool,
    personalNote: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onMarkReviewed: PropTypes.func.isRequired,
};

export default SavedQuestionCard;