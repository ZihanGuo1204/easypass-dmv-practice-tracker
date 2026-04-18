import PropTypes from "prop-types";
import styles from "./QuestionBrowserCard.module.css";

function QuestionBrowserCard({
  item,
  selectedAnswer,
  checked,
  onSelectAnswer,
  onCheckAnswer,
}) {
  const canCheckAnswer = Boolean(selectedAnswer) && !checked;

  return (
    <div className={`card ${styles.card}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
          <div>
            <div className={styles.meta}>
              <span className="me-2">
                <strong>ID:</strong> {item.questionId}
              </span>
              <span className="me-2">
                <strong>Topic:</strong> {item.topic || "—"}
              </span>
              <span>
                <strong>Difficulty:</strong> {item.difficulty || "—"}
              </span>
            </div>

            <div className={styles.questionText}>{item.questionText}</div>
          </div>
        </div>

        {Array.isArray(item.options) && item.options.length > 0 && (
          <div className="mt-3">
            <div className="row g-2">
              {item.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = item.correctAnswer === option;

                let className = "w-100 text-start border rounded p-2";

                if (!checked) {
                  className += isSelected
                    ? " bg-primary text-white"
                    : " bg-light text-dark";
                } else if (isCorrect) {
                  className += " bg-success text-white";
                } else if (isSelected && !isCorrect) {
                  className += " bg-danger text-white";
                } else {
                  className += " bg-light text-dark";
                }

                return (
                  <div
                    key={`${item.questionId}-${index}`}
                    className="col-12 col-md-6"
                  >
                    <button
                      type="button"
                      className={`${className} ${styles.answerButton}`}
                      onClick={() => {
                        if (!checked) {
                          onSelectAnswer(option);
                        }
                      }}
                      style={{
                        cursor: checked ? "default" : "pointer",
                      }}
                    >
                      {option}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-3 d-flex gap-2 flex-wrap align-items-center">
              <button
                type="button"
                className={`btn ${
                  !selectedAnswer
                    ? "btn-secondary"
                    : checked
                      ? "btn-success"
                      : "btn-primary"
                }`}
                onClick={onCheckAnswer}
                disabled={!canCheckAnswer}
              >
                Check Answer
              </button>

              {checked && (
                <div className={styles.feedback}>
                  {selectedAnswer === item.correctAnswer ? (
                    <span className="text-success">✅ Correct</span>
                  ) : (
                    <span className="text-danger">
                      ❌ Incorrect. Correct answer: {item.correctAnswer}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

QuestionBrowserCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    questionId: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    topic: PropTypes.string,
    difficulty: PropTypes.string,
    correctAnswer: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  selectedAnswer: PropTypes.string,
  checked: PropTypes.bool,
  onSelectAnswer: PropTypes.func.isRequired,
  onCheckAnswer: PropTypes.func.isRequired,
};

QuestionBrowserCard.defaultProps = {
  selectedAnswer: "",
  checked: false,
};

export default QuestionBrowserCard;
