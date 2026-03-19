import { useEffect, useState } from "react";
import {
  getSavedQuestions,
  deleteSavedQuestion,
  markAsReviewed,
} from "../../services/savedQuestionsApi";
import SavedQuestionCard from "../../components/SavedQuestionCard/SavedQuestionCard";

function FavoritePage() {
  const [favoriteQuestions, setFavoriteQuestions] = useState([]);

  useEffect(() => {
    async function loadFavorites() {
      try {
        const data = await getSavedQuestions();
        const favoritesOnly = data.filter((q) => q.source === "favorite");
        setFavoriteQuestions([...favoritesOnly].reverse());
      } catch (error) {
        console.error("Failed to load favorites:", error);
      }
    }

    loadFavorites();
  }, []);

  async function handleDelete(id) {
    await deleteSavedQuestion(id);
    setFavoriteQuestions((prev) => prev.filter((q) => q._id !== id));
  }

  async function handleMarkReviewed(id) {
    await markAsReviewed(id);
    setFavoriteQuestions((prev) =>
      prev.map((q) => (q._id === id ? { ...q, isReviewed: true } : q))
    );
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Favorite Questions</h1>

          {favoriteQuestions.length === 0 ? (
            <p className="text-center">No favorite questions found.</p>
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
