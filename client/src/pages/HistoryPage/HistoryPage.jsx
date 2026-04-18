import { useEffect, useMemo, useState } from "react";
import { deleteAttempt, getAttempts } from "../../services/attemptsApi";
import styles from "./HistoryPage.module.css";

function formatDateTime(value) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString();
}

function HistoryPage() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const data = await getAttempts();
        if (cancelled) return;
        setAttempts(Array.isArray(data) ? data : []);
      } catch (e) {
        if (cancelled) return;
        setError(e?.message || "Failed to fetch attempts");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleDeleteAttempt(id) {
    try {
      await deleteAttempt(id);
      setAttempts((prev) => prev.filter((attempt) => attempt._id !== id));
    } catch (e) {
      console.error("Error deleting attempt:", e);
      setError("Failed to delete attempt");
    }
  }

  const stats = useMemo(() => {
    const total = attempts.length;
    const correct = attempts.reduce(
      (acc, a) => acc + (a?.isCorrect ? 1 : 0),
      0
    );
    const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
    return { total, correct, accuracy };
  }, [attempts]);

  return (
    <div className={`container ${styles.page}`}>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>History</h1>
              <p className={styles.subtitle}>
                Review your recent attempts and track your progress over time.
              </p>
            </div>

            <div className="d-flex gap-2 flex-wrap">
              <span className="badge bg-secondary">Total: {stats.total}</span>
              <span className="badge bg-success">Correct: {stats.correct}</span>
              <span className="badge bg-primary">
                Accuracy: {stats.accuracy}%
              </span>
            </div>
          </div>

          {loading && <div className="alert alert-info">Loading...</div>}

          {!loading && error && (
            <div className="alert alert-danger mb-0">{error}</div>
          )}

          {!loading && !error && attempts.length === 0 && (
            <div className={`card p-4 text-center ${styles.emptyState}`}>
              No attempts yet. Try the Quiz tab and answer a few questions.
            </div>
          )}

          {!loading && !error && attempts.length > 0 && (
            <div className="d-grid gap-3">
              {attempts.map((a) => (
                <div
                  key={
                    a?._id ||
                    `${a?.questionId || "unknown"}-${a?.answeredAt || "unknown"}`
                  }
                  className={`card ${styles.historyCard}`}
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                      <div>
                        <div className={styles.resultText}>
                          {a?.isCorrect ? "✅ Correct" : "❌ Incorrect"}
                        </div>
                        <div className={styles.timestamp}>
                          {formatDateTime(a?.answeredAt)}
                        </div>
                      </div>

                      <div className="d-flex gap-2 flex-wrap">
                        {a?.topic ? (
                          <span className="badge bg-info text-dark">
                            Topic: {a.topic}
                          </span>
                        ) : null}
                        {a?.difficulty ? (
                          <span className="badge bg-warning text-dark">
                            Difficulty: {a.difficulty}
                          </span>
                        ) : null}
                        {a?.questionId ? (
                          <span className="badge bg-light text-dark">
                            QID: {a.questionId}
                          </span>
                        ) : null}
                      </div>
                    </div>

                    {a?.questionText ? (
                      <div className={styles.questionBlock}>
                        <div className={styles.sectionLabel}>Question</div>
                        <div className={styles.questionText}>
                          {a.questionText}
                        </div>
                      </div>
                    ) : null}

                    <div className="row mt-3 g-2">
                      <div className="col-md-6">
                        <div className={styles.sectionLabel}>Selected</div>
                        <div>{a?.selectedAnswer || "-"}</div>
                      </div>
                      <div className="col-md-6">
                        <div className={styles.sectionLabel}>Correct</div>
                        <div>{a?.correctAnswer || "-"}</div>
                      </div>
                    </div>

                    {a?._id && (
                      <div className="mt-3">
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDeleteAttempt(a._id)}
                        >
                          Delete Attempt
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HistoryPage;
