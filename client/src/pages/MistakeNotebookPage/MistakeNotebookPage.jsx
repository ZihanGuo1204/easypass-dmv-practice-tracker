import { useEffect, useState } from "react";
import {
  getSavedQuestions,
  deleteSavedQuestion,
  markAsReviewed,
} from "../../services/savedQuestionsApi";
import SavedQuestionCard from "../../components/SavedQuestionCard/SavedQuestionCard";
import "./MistakeNotebookPage.css";

function MistakeNotebookPage() {
  const [mistakeQuestions, setMistakeQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadMistakeQuestions() {
      try {
        const data = await getSavedQuestions();
        const mistakesOnly = data.filter(
          (question) => question.source === "mistake"
        );
        setMistakeQuestions(mistakesOnly);
      } catch (error) {
        setErrorMessage("Failed to load mistake notebook.");
      } finally {
        setLoading(false);
      }
    }

    loadMistakeQuestions();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteSavedQuestion(id);
      setMistakeQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  async function handleMarkReviewed(id) {
    try {
      await markAsReviewed(id);
      setMistakeQuestions((prev) =>
        prev.map((q) => (q._id === id ? { ...q, isReviewed: true } : q))
      );
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  if (loading) {
    return <div className="container mt-4">Loading mistake notebook...</div>;
  }

  if (errorMessage) {
    return <div className="container mt-4 error-text">{errorMessage}</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Mistake Notebook</h1>

          {mistakeQuestions.length === 0 ? (
            <p className="text-center">No mistake questions found.</p>
          ) : (
            mistakeQuestions.map((question) => (
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

export default MistakeNotebookPage;
