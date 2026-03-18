import { useEffect, useState } from "react";

import {
  getSavedQuestions,
  deleteSavedQuestion,
  markAsReviewed,
  createSavedQuestion,
} from "../../services/savedQuestionsApi";

import SavedQuestionCard from "../../components/SavedQuestionCard/SavedQuestionCard";
import "./SavedQuestionsPage.css";

function SavedQuestionsPage() {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [newQuestion, setNewQuestion] = useState({
    questionId: "",
    questionText: "",
    topic: "",
    difficulty: "easy",
    source: "favorite",
    personalNote: "",
  });

  useEffect(() => {
    async function loadSavedQuestions() {
      try {
        const data = await getSavedQuestions();
        setSavedQuestions(data);
      } catch (error) {
        setErrorMessage("Failed to load saved questions.");
      } finally {
        setLoading(false);
      }
    }

    loadSavedQuestions();
  }, []);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setNewQuestion((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleDelete(id) {
    try {
      await deleteSavedQuestion(id);
      setSavedQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  async function handleMarkReviewed(id) {
    try {
      await markAsReviewed(id);

      setSavedQuestions((prev) =>
        prev.map((q) =>
          q._id === id ? { ...q, isReviewed: true } : q
        )
      );
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  async function handleAddQuestion(event) {
    event.preventDefault();

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

      const result = await createSavedQuestion(payload);

      const createdQuestion = {
        ...payload,
        _id: result.insertedId,
      };

      setSavedQuestions((prev) => [createdQuestion, ...prev]);

      setNewQuestion({
        questionId: "",
        questionText: "",
        topic: "",
        difficulty: "easy",
        source: "favorite",
        personalNote: "",
      });
    } catch (error) {
      console.error("Create failed:", error);
    }
  }

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  if (errorMessage) {
    return <div className="container mt-4 error-text">{errorMessage}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Saved Questions</h1>

          <form className="card shadow-sm mb-4 p-3" onSubmit={handleAddQuestion}>
            <h4 className="mb-3">Add a Saved Question</h4>

            <div className="mb-3">
              <label className="form-label">Question ID</label>
              <input
                type="text"
                className="form-control"
                name="questionId"
                value={newQuestion.questionId}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Question Text</label>
              <textarea
                className="form-control"
                name="questionText"
                value={newQuestion.questionText}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Topic</label>
              <input
                type="text"
                className="form-control"
                name="topic"
                value={newQuestion.topic}
                onChange={handleInputChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Difficulty</label>
              <select
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
              <label className="form-label">Source</label>
              <select
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
              <label className="form-label">Personal Note</label>
              <input
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
          </form>

          {savedQuestions.length === 0 ? (
            <p className="text-center">No saved questions found.</p>
          ) : (
            savedQuestions.map((question) => (
              <SavedQuestionCard
                key={question._id}
                question={question}
                onDelete={handleDelete}
                onMarkReviewed={handleMarkReviewed}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default SavedQuestionsPage;