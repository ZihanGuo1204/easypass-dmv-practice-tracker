import { useEffect, useState } from "react";
import { getSavedQuestions } from "../../services/savedQuestionsApi";
import SavedQuestionCard from "../../components/SavedQuestionCard/SavedQuestionCard";
import "./SavedQuestionsPage.css";

function SavedQuestionsPage() {
  const [savedQuestions, setSavedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

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

  if (loading) {
    return <div className="saved-questions-page">Loading saved questions...</div>;
  }

  if (errorMessage) {
    return <div className="saved-questions-page error-text">{errorMessage}</div>;
  }

  return (
    <div className="saved-questions-page">
      <h1>Saved Questions</h1>
      {savedQuestions.length === 0 ? (
        <p>No saved questions found.</p>
      ) : (
        savedQuestions.map((question) => (
          <SavedQuestionCard key={question._id} question={question} />
        ))
      )}
    </div>
  );
}

export default SavedQuestionsPage;