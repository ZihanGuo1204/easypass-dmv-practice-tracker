import { useEffect, useState } from "react";
import {
  getSavedQuestions,
  deleteSavedQuestion,
  markAsReviewed,
} from "../../services/savedQuestionsApi";
import SavedQuestionCard from "../../components/SavedQuestionCard/SavedQuestionCard";
import styles from "./MistakeNotebookPage.module.css";

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
      } catch {
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
    return (
      <div className={`container mt-4 ${styles.errorText}`}>{errorMessage}</div>
    );
  }

  return (
    <div className={`container ${styles.page}`}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className={styles.header}>
            <h1 className={styles.title}>Mistake Notebook</h1>
            <p className={styles.subtitle}>
              Review questions you missed and track your weak areas.
            </p>
          </div>

          {mistakeQuestions.length === 0 ? (
            <div className={`card p-4 text-center ${styles.emptyState}`}>
              No mistake questions found.
            </div>
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
