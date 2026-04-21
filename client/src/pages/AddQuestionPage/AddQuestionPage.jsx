import { useState } from "react";
import { createSavedQuestion } from "../../services/savedQuestionsApi";
import styles from "./AddQuestionPage.module.css";

function AddQuestionPage() {
  const [newQuestion, setNewQuestion] = useState({
    questionId: "",
    questionText: "",
    topic: "",
    difficulty: "easy",
    source: "favorite",
    personalNote: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const payload = {
        userId: "demo-user-1",
        questionId: newQuestion.questionId,
        questionText: newQuestion.questionText,
        topic: newQuestion.topic,
        difficulty: newQuestion.difficulty,
        source: newQuestion.source,
        isFavorite: newQuestion.source === "favorite",
        isReviewed: false,
        personalNote: newQuestion.personalNote,
      };

      await createSavedQuestion(payload);

      setSuccessMessage("Question added successfully.");

      setNewQuestion({
        questionId: "",
        questionText: "",
        topic: "",
        difficulty: "easy",
        source: "favorite",
        personalNote: "",
      });
    } catch (error) {
      setErrorMessage("Failed to add question.");
      console.error("Create failed:", error);
    }
  }

  return (
    <div className={`container ${styles.page}`}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className={`text-center mb-4 ${styles.title}`}>Add Question</h1>

          <form
            className={`card shadow-sm p-4 ${styles.formCard}`}
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <label htmlFor="questionId" className="form-label">
                Question ID
              </label>
              <input
                id="questionId"
                type="text"
                className="form-control"
                name="questionId"
                value={newQuestion.questionId}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="questionText" className="form-label">
                Question Text
              </label>
              <textarea
                id="questionText"
                className="form-control"
                name="questionText"
                value={newQuestion.questionText}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="topic" className="form-label">
                Topic
              </label>
              <input
                id="topic"
                type="text"
                className="form-control"
                name="topic"
                value={newQuestion.topic}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="difficulty" className="form-label">
                Difficulty
              </label>
              <select
                id="difficulty"
                className="form-select"
                name="difficulty"
                value={newQuestion.difficulty}
                onChange={handleInputChange}
              >
                <option value="easy">easy</option>
                <option value="medium">medium</option>
                <option value="hard">hard</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="source" className="form-label">
                Source
              </label>
              <select
                id="source"
                className="form-select"
                name="source"
                value={newQuestion.source}
                onChange={handleInputChange}
              >
                <option value="favorite">favorite</option>
                <option value="mistake">mistake</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="personalNote" className="form-label">
                Personal Note
              </label>
              <input
                id="personalNote"
                type="text"
                className="form-control"
                name="personalNote"
                value={newQuestion.personalNote}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add Question
            </button>

            {successMessage && (
              <p className={`${styles.messageSuccess} mt-3 mb-0`}>
                {successMessage}
              </p>
            )}

            {errorMessage && (
              <p className={`${styles.messageError} mt-3 mb-0`}>
                {errorMessage}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddQuestionPage;
