import { useEffect, useState } from "react";
import {
  getSavedQuestions,
  deleteSavedQuestion,
  markAsReviewed,
} from "../../services/savedQuestionsApi";
import SavedQuestionCard from "../../components/SavedQuestionCard/SavedQuestionCard";
import styles from "./FavoritePage.module.css";

function FavoritePage() {
  const [favoriteQuestions, setFavoriteQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadFavorites() {
      try {
        const data = await getSavedQuestions();
        const favoritesOnly = data.filter((q) => q.source === "favorite");
        setFavoriteQuestions([...favoritesOnly].reverse());
      } catch {
        setErrorMessage("Failed to load favorite questions.");
      } finally {
        setLoading(false);
      }
    }

    loadFavorites();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteSavedQuestion(id);
      setFavoriteQuestions((prev) => prev.filter((q) => q._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  }

  async function handleMarkReviewed(id) {
    try {
      await markAsReviewed(id);
      setFavoriteQuestions((prev) =>
        prev.map((q) => (q._id === id ? { ...q, isReviewed: true } : q))
      );
    } catch (error) {
      console.error("Update failed:", error);
    }
  }

  if (loading) {
    return <div className="container mt-4">Loading favorites...</div>;
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
            <h1 className={styles.title}>Favorite Questions</h1>
            <p className={styles.subtitle}>
              Review questions you marked as important.
            </p>
          </div>

          {favoriteQuestions.length === 0 ? (
            <div className={`card p-4 text-center ${styles.emptyState}`}>
              No favorite questions found.
            </div>
          ) : (
            favoriteQuestions.map((question) => (
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

export default FavoritePage;
