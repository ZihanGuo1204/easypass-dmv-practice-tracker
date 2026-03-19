import { useEffect, useState } from "react";
import { getRandomQuestion } from "../../services/questionsApi";
import {
  createSavedQuestion,
  getSavedQuestions,
} from "../../services/savedQuestionsApi";
import "./QuizPage.css";

function QuizPage() {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);

  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const [actionMessage, setActionMessage] = useState("");

  // ⭐ 新增状态
  const [isFavorited, setIsFavorited] = useState(false);
  const [isMistake, setIsMistake] = useState(false);

  useEffect(() => {
    loadQuestion();
  }, []);

  async function loadQuestion() {
    try {
      const data = await getRandomQuestion();
      setQuestion(data);
      setSelectedAnswer("");
      setShowResult(false);
      setActionMessage("");

      // ⭐ 每次加载题目时检查状态
      const existingQuestions = await getSavedQuestions();

      const fav = existingQuestions.some(
        (item) =>
          item.questionId === data.questionId && item.source === "favorite"
      );

      const mistake = existingQuestions.some(
        (item) =>
          item.questionId === data.questionId && item.source === "mistake"
      );

      setIsFavorited(fav);
      setIsMistake(mistake);
    } catch (error) {
      console.error("Failed to load question:", error);
    }
  }

  function handleAnswerClick(option) {
    if (showResult || !question) return;

    setSelectedAnswer(option);
    setShowResult(true);
    setAnsweredCount((prev) => prev + 1);

    if (option === question.correctAnswer) {
      setCorrectCount((prev) => prev + 1);
    }
  }

  async function handleAddToFavorite() {
    if (!question || isFavorited) return;

    try {
      const payload = {
        userId: "demo-user-1",
        questionId: question.questionId,
        questionText: question.questionText,
        topic: question.topic,
        difficulty: question.difficulty,
        source: "favorite",
        isFavorite: true,
        isReviewed: false,
        personalNote: "Added from quiz page.",
      };

      await createSavedQuestion(payload);

      setIsFavorited(true);
      setActionMessage("Added to Favorites.");
    } catch (error) {
      console.error(error);
      setActionMessage("Failed to add to Favorites.");
    }
  }

  async function handleAddToMistake() {
    if (!question || isMistake) return;

    try {
      const payload = {
        userId: "demo-user-1",
        questionId: question.questionId,
        questionText: question.questionText,
        topic: question.topic,
        difficulty: question.difficulty,
        source: "mistake",
        isFavorite: false,
        isReviewed: false,
        personalNote: "Added from quiz page.",
      };

      await createSavedQuestion(payload);

      setIsMistake(true);
      setActionMessage("Added to Mistake Notebook.");
    } catch (error) {
      console.error(error);
      setActionMessage("Failed to add to Mistake Notebook.");
    }
  }

  function handleRestartQuiz() {
    setCorrectCount(0);
    setAnsweredCount(0);
    setSelectedAnswer("");
    setShowResult(false);
    setActionMessage("");
    loadQuestion();
  }

  if (!question) {
    return <div className="container mt-4">Loading...</div>;
  }

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h1 className="text-center mb-4">Practice Quiz</h1>

          <div className="card p-4 shadow-sm">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <div>
                <span className="badge bg-success me-2">
                  Correct: {correctCount}
                </span>
                <span className="badge bg-secondary">
                  Total Answered: {answeredCount}
                </span>
              </div>

              <button
                className="btn btn-outline-secondary"
                onClick={handleRestartQuiz}
              >
                Restart Quiz
              </button>
            </div>

            <div className="d-flex justify-content-between align-items-start mb-3 flex-wrap gap-2">
              <div>
                <p className="mb-1">
                  <strong>Question ID:</strong> {question.questionId}
                </p>
                <p className="mb-1">
                  <strong>Topic:</strong> {question.topic}
                </p>
                <p className="mb-0">
                  <strong>Difficulty:</strong> {question.difficulty}
                </p>
              </div>

              {/* ⭐ 状态按钮 */}
              <div className="d-flex gap-2">
                <button
                  className={
                    isFavorited
                      ? "btn btn-warning"
                      : "btn btn-outline-warning"
                  }
                  onClick={handleAddToFavorite}
                  disabled={isFavorited}
                >
                  ⭐ {isFavorited ? "Favorited" : "Favorite"}
                </button>

                <button
                  className={
                    isMistake
                      ? "btn btn-secondary"
                      : "btn btn-outline-danger"
                  }
                  onClick={handleAddToMistake}
                  disabled={isMistake}
                >
                  ❌ {isMistake ? "Added" : "Mistake"}
                </button>
              </div>
            </div>

            <h4 className="mb-3">{question.questionText}</h4>

            {question.options.map((option, index) => {
              let buttonClass =
                "btn btn-outline-primary w-100 mb-2 text-start";

              if (showResult) {
                if (option === question.correctAnswer) {
                  buttonClass = "btn btn-success w-100 mb-2 text-start";
                } else if (option === selectedAnswer) {
                  buttonClass = "btn btn-danger w-100 mb-2 text-start";
                }
              }

              return (
                <button
                  key={index}
                  className={buttonClass}
                  onClick={() => handleAnswerClick(option)}
                  disabled={showResult}
                >
                  {option}
                </button>
              );
            })}

            {showResult && (
              <div className="mt-3">
                {selectedAnswer === question.correctAnswer ? (
                  <p className="text-success mb-2">✅ Correct!</p>
                ) : (
                  <>
                    <p className="text-danger mb-2">❌ Incorrect.</p>
                    <p className="text-success mb-0">
                      Correct answer: <strong>{question.correctAnswer}</strong>
                    </p>
                  </>
                )}
              </div>
            )}

            {actionMessage && (
              <div className="alert alert-info mt-3 mb-0">
                {actionMessage}
              </div>
            )}

            <button className="btn btn-primary mt-4" onClick={loadQuestion}>
              Next Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;