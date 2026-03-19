import { useEffect, useMemo, useState } from "react";
import { getAttempts } from "../../services/attemptsApi";

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

  const demoUserAttempts = useMemo(
    () =>
      attempts.filter((a) => (a?.userId || "demo-user-1") === "demo-user-1"),
    [attempts]
  );

  const stats = useMemo(() => {
    const total = demoUserAttempts.length;
    const correct = demoUserAttempts.reduce(
      (acc, a) => acc + (a?.isCorrect ? 1 : 0),
      0
    );
    const accuracy = total === 0 ? 0 : Math.round((correct / total) * 100);
    return { total, correct, accuracy };
  }, [demoUserAttempts]);

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <h1 className="mb-0">History</h1>
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

          {!loading && !error && demoUserAttempts.length === 0 && (
            <div className="alert alert-secondary mb-0">
              No attempts yet. Try the Quiz tab and answer a few questions.
            </div>
          )}

          {!loading && !error && demoUserAttempts.length > 0 && (
            <div className="d-grid gap-3">
              {demoUserAttempts.map((a) => (
                <div
                  key={
                    a?._id ||
                    `${a?.questionId || "unknown"}-${a?.answeredAt || "unknown"}`
                  }
                  className="card shadow-sm"
                >
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                      <div>
                        <div className="fw-semibold">
                          {a?.isCorrect ? "✅ Correct" : "❌ Incorrect"}
                        </div>
                        <div className="text-muted small">
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
                      <div className="mt-3">
                        <div className="fw-semibold">Question</div>
                        <div>{a.questionText}</div>
                      </div>
                    ) : null}

                    <div className="row mt-3 g-2">
                      <div className="col-md-6">
                        <div className="fw-semibold">Selected</div>
                        <div>{a?.selectedAnswer || "-"}</div>
                      </div>
                      <div className="col-md-6">
                        <div className="fw-semibold">Correct</div>
                        <div>{a?.correctAnswer || "-"}</div>
                      </div>
                    </div>
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
