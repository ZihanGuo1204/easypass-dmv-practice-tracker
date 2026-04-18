import { useEffect, useState } from "react";
import { getRandomQuestion } from "../../services/questionsApi";
import { createAttempt } from "../../services/attemptsApi";
import {
  createSavedQuestion,
  getSavedQuestions,
} from "../../services/savedQuestionsApi";
import styles from "./QuizPage.module.css";

function QuizPage() {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);

  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  const [actionMessage, setActionMessage] = useState("");

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

  async function handleAnswerClick(option) {
    if (showResult || !question) {
      return;
    }

    setSelectedAnswer(option);
    setShowResult(true);
    setAnsweredCount((prev) => prev + 1);

    const isCorrect = option === question.correctAnswer;

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    try {
      await createAttempt({
        questionId: question.questionId,
        questionText: question.questionText,
        selectedAnswer: option,
        correctAnswer: question.correctAnswer,
        isCorrect,
        topic: question.topic,
        difficulty: question.difficulty,
      });
    } catch (error) {
      console.error("Failed to save attempt:", error);
    }
  }

  async function handleAddToFavorite() {
    if (!question || isFavorited) return;

    try {
      const payload = {
        questionId: question.questionId,
        questionText: question.questionText,
        topic: question.topic,
        difficulty: question.difficulty,
        correctAnswer: question.correctAnswer,
        source: "favorite",
        isFavorite: true,
        isReviewed: false,
        personalNote: "Added from quiz page.",
        savedAt: new Date().toISOString(),
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
        questionId: question.questionId,
        questionText: question.questionText,
        topic: question.topic,
        difficulty: question.difficulty,
        correctAnswer: question.correctAnswer,
        source: "mistake",
        isFavorite: false,
        isReviewed: false,
        personalNote: "Added from quiz page.",
        savedAt: new Date().toISOString(),
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
    <div className={`container ${styles.page}`}>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className={styles.header}>
            <h1 className={styles.title}>Practice Quiz</h1>
            <p className={styles.subtitle}>
              Answer a random DMV-style question and get instant feedback.
            </p>
          </div>

          <div className={`card ${styles.quizCard}`}>
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                <div>
                  <span className="badge bg-success me-2">
                    Correct: {correctCount}
                  </span>
                  <span className="badge bg-secondary">
                    Total Answered: {answeredCount}
                  </span>
                </div>

                <button
                  className="btn btn-warning"
                  onClick={handleRestartQuiz}
                  type="button"
                >
                  Restart Quiz
                </button>
              </div>

              <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap gap-3">
                <div className={styles.metaBlock}>
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

                <div className="d-flex gap-2 flex-wrap">
                  <button
                    className={
                      isFavorited
                        ? "btn btn-warning"
                        : "btn btn-outline-warning"
                    }
                    onClick={handleAddToFavorite}
                    disabled={isFavorited}
                    type="button"
                  >
                    ⭐ {isFavorited ? "Favorited" : "Favorite"}
                  </button>

                  <button
                    className={
                      isMistake ? "btn btn-secondary" : "btn btn-outline-danger"
                    }
                    onClick={handleAddToMistake}
                    disabled={isMistake}
                    type="button"
                  >
                    ❌ {isMistake ? "Added" : "Mistake"}
                  </button>
                </div>
              </div>

              <h2 className={styles.questionText}>{question.questionText}</h2>

              <div className="mt-4">
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
                      className={`${buttonClass} ${styles.answerButton}`}
                      onClick={() => handleAnswerClick(option)}
                      disabled={showResult}
                      type="button"
                    >
                      {option}
                    </button>
                  );
                })}
              </div>

              {showResult && (
                <div className={`mt-3 ${styles.feedback}`}>
                  {selectedAnswer === question.correctAnswer ? (
                    <p className="text-success mb-2">✅ Correct!</p>
                  ) : (
                    <>
                      <p className="text-danger mb-2">❌ Incorrect.</p>
                      <p className="text-success mb-0">
                        Correct answer:{" "}
                        <strong>{question.correctAnswer}</strong>
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

              <button
                className={`btn btn-primary mt-4 ${styles.nextButton}`}
                onClick={loadQuestion}
                type="button"
              >
                Next Question
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
