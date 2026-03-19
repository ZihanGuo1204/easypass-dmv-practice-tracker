import PropTypes from "prop-types";
import "./SavedQuestionCard.css";

function SavedQuestionCard({ question, onDelete, onMarkReviewed }) {
  return (
    <div
      className="card shadow-sm mb-3"
      style={{ maxWidth: "600px", margin: "0 auto" }}
    >
      <div className="card-body">
        <h5 className="card-title">{question.questionText}</h5>

        <p className="card-text">
          <strong>Question ID:</strong> {question.questionId}
          <br />
          <strong>Topic:</strong> {question.topic}
          <br />
          <strong>Difficulty:</strong> {question.difficulty}
          <br />
          <strong>Source:</strong> {question.source}
          <br />
          <strong>Reviewed:</strong>{" "}
          <span
            className={question.isReviewed ? "text-success" : "text-danger"}
          >
            {question.isReviewed ? "Yes" : "No"}
          </span>
          <br />
          <strong>Note:</strong> {question.personalNote || "No note yet"}
        </p>

        <button
          className="btn btn-success me-2"
          onClick={() => onMarkReviewed(question._id)}
        >
          Mark as Reviewed
        </button>

        <button
          className="btn btn-danger"
          onClick={() => onDelete(question._id)}
        >
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
