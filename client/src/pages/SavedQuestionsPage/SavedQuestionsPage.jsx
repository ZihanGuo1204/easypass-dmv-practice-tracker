import { useEffect, useState } from "react";
import {
  getSavedQuestions,
  deleteSavedQuestion,
  markAsReviewed,
} from "../../services/savedQuestionsApi";
import SavedQuestionCard from "../../components/SavedQuestionCard/SavedQuestionCard";
import styles from "./SavedQuestionsPage.module.css";

function SavedQuestionsPage() {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadSavedQuestions() {
      try {
        const data = await getSavedQuestions();
        const sorted = [...data].sort(
          (a, b) =>
            new Date(b.savedAt || b.updatedAt || b.createdAt || 0) -
            new Date(a.savedAt || a.updatedAt || a.createdAt || 0)
        );
        setSavedQuestions(sorted);
      } catch {
        setErrorMessage("Failed to load saved questions.");
      } finally {
        setLoading(false);
      }
    }

    loadSavedQuestions();
  }, []);

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
        prev.map((q) => (q._id === id ? { ...q, isReviewed: true } : q))
      );
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  if (loading) {
    return <div className="container mt-4">Loading...</div>;
  }

  if (errorMessage) {
    return (
      <div className={`container mt-4 ${styles.errorText}`}>{errorMessage}</div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className={styles.header}>
            <h1 className={styles.title}>Saved Questions</h1>
            <p className={styles.subtitle}>
              Review questions you saved for later study.
            </p>
          </div>

          {savedQuestions.length === 0 ? (
            <div className={`card p-4 text-center ${styles.emptyState}`}>
              No saved questions found.
            </div>
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
