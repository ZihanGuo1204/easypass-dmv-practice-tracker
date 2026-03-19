import { useEffect, useState } from "react";
import {
  getSavedQuestions,
  deleteSavedQuestion,
  markAsReviewed,
} from "../../services/savedQuestionsApi";
import SavedQuestionCard from "../../components/SavedQuestionCard/SavedQuestionCard";
import "./SavedQuestionsPage.css";

function SavedQuestionsPage() {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  // Load data
  useEffect(() => {
    async function loadSavedQuestions() {
      try {
        const data = await getSavedQuestions();
        setSavedQuestions([...data].reverse()); // 最新在上面
      } catch (error) {
        setErrorMessage("Failed to load saved questions.");
      } finally {
        setLoading(false);
      }
    }

    loadSavedQuestions();
  }, []);

  // Delete
  async function handleDelete(id) {
    try {
      await deleteSavedQuestion(id);
      setSavedQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  // Mark as reviewed
  async function handleMarkReviewed(id) {
    try {
      await markAsReviewed(id);

      setSavedQuestions((prev) =>
        prev.map((q) => (q._id === id ? { ...q, isReviewed: true } : q))
      );
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  // Loading state
  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  // Error state
  if (errorMessage) {
    return <div className="container mt-4 error-text">{errorMessage}</div>;
  }

  // Render
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Saved Questions</h1>

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
