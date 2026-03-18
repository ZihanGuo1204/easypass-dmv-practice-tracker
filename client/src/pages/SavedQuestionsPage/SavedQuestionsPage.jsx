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

  // Fetching Data Upon Page Load
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

  // delete
  async function handleDelete(id) {
    try {
      await deleteSavedQuestion(id);

      // Update frontend state
      setSavedQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  // Mark as Reviewed
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

  // Loading State
  if (loading) {
    return <div className="saved-questions-page">Loading...</div>;
  }

  // Error Status
  if (errorMessage) {
    return <div className="saved-questions-page error-text">{errorMessage}</div>;
  }

  // Render Page
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