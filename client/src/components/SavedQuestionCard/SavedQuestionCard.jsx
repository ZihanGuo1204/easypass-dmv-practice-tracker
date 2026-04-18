import PropTypes from "prop-types";
import styles from "./SavedQuestionCard.module.css";

function SavedQuestionCard({ question, onDelete, onMarkReviewed }) {
  return (
    <div className={`card ${styles.card}`}>
      <div className="card-body">
        <h5 className={styles.title}>{question.questionText}</h5>

        <div className={styles.meta}>
          <p>
            <strong>ID:</strong> {question.questionId}
          </p>
          <p>
            <strong>Topic:</strong> {question.topic || "—"}
          </p>
          <p>
            <strong>Difficulty:</strong> {question.difficulty || "—"}
          </p>
          <p>
            <strong>Source:</strong> {question.source}
          </p>
          <p>
            <strong>Reviewed:</strong>{" "}
            <span
              className={
                question.isReviewed ? styles.reviewedYes : styles.reviewedNo
              }
            >
              {question.isReviewed ? "Yes" : "No"}
            </span>
          </p>
          <p>
            <strong>Note:</strong> {question.personalNote || "No note yet"}
          </p>
          <p>
            <strong>Correct Answer:</strong>{" "}
            {question.correctAnswer ? (
              <span className={styles.correctAnswerText}>
                {question.correctAnswer}
              </span>
            ) : (
              <span className={styles.missingAnswerText}>
                Not available for older saved items
              </span>
            )}
          </p>
        </div>

        <div className={styles.actions}>
          <button
            className="btn btn-success"
            onClick={() => onMarkReviewed(question._id)}
            type="button"
          >
            Mark as Reviewed
          </button>

          <button
            className="btn btn-danger"
            onClick={() => onDelete(question._id)}
            type="button"
          >
            Delete
          </button>
        </div>
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
    correctAnswer: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onMarkReviewed: PropTypes.func.isRequired,
};

export default SavedQuestionCard;
