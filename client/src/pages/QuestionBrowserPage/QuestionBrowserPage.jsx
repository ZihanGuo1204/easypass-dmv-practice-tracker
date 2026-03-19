import { useEffect, useMemo, useState } from "react";
import { getQuestionMeta, getQuestions } from "../../services/questionsApi";

const DEFAULT_LIMIT = 20;

function QuestionBrowserPage() {
  const [meta, setMeta] = useState({ topics: [], difficulties: [] });
  const [metaLoading, setMetaLoading] = useState(true);
  const [metaError, setMetaError] = useState("");

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState("");

  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    items: [],
    total: 0,
    page: 1,
    limit: DEFAULT_LIMIT,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const activeFiltersLabel = useMemo(() => {
    const parts = [];
    if (topic) parts.push(`Topic: ${topic}`);
    if (difficulty) parts.push(`Difficulty: ${difficulty}`);
    if (appliedSearch) parts.push(`Search: "${appliedSearch}"`);
    return parts.length ? parts.join(" • ") : "No filters applied";
  }, [topic, difficulty, appliedSearch]);

  useEffect(() => {
    let cancelled = false;

    async function loadMeta() {
      setMetaLoading(true);
      setMetaError("");

      try {
        const result = await getQuestionMeta();

        if (!cancelled) {
          setMeta({
            topics: Array.isArray(result?.topics) ? result.topics : [],
            difficulties: Array.isArray(result?.difficulties)
              ? result.difficulties
              : [],
          });
        }
      } catch (err) {
        if (!cancelled) {
          setMetaError("Failed to load filter options.");
        }
      } finally {
        if (!cancelled) {
          setMetaLoading(false);
        }
      }
    }

    loadMeta();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadQuestions() {
      setLoading(true);
      setError("");

      try {
        const result = await getQuestions({
          topic,
          difficulty,
          q: appliedSearch,
          page,
          limit: DEFAULT_LIMIT,
        });

        if (!cancelled) {
          setData({
            items: Array.isArray(result?.items) ? result.items : [],
            total: Number(result?.total) || 0,
            page: Number(result?.page) || 1,
            limit: Number(result?.limit) || DEFAULT_LIMIT,
            totalPages: Number(result?.totalPages) || 1,
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError("Failed to load questions.");
          setData({
            items: [],
            total: 0,
            page: 1,
            limit: DEFAULT_LIMIT,
            totalPages: 1,
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadQuestions();

    return () => {
      cancelled = true;
    };
  }, [topic, difficulty, appliedSearch, page]);

  function applyFilters(event) {
    event.preventDefault();
    setPage(1);
    setAppliedSearch(searchInput.trim());
  }

  function clearFilters() {
    setTopic("");
    setDifficulty("");
    setSearchInput("");
    setAppliedSearch("");
    setPage(1);
  }

  const canPrev = page > 1 && !loading;
  const canNext = page < (data.totalPages || 1) && !loading;

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="d-flex justify-content-between align-items-start flex-wrap gap-2 mb-3">
            <div>
              <h1 className="mb-1">Question Browser</h1>
              <div className="text-muted">{activeFiltersLabel}</div>
            </div>

            <button className="btn btn-outline-secondary" onClick={clearFilters}>
              Clear filters
            </button>
          </div>

          <form className="card shadow-sm p-3 mb-3" onSubmit={applyFilters}>
            <div className="row g-2 align-items-end">
              <div className="col-12 col-md-5">
                <label className="form-label mb-1">Search</label>
                <input
                  className="form-control"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search question text..."
                />
              </div>

              <div className="col-6 col-md-3">
                <label className="form-label mb-1">Topic</label>
                <select
                  className="form-select"
                  value={topic}
                  onChange={(e) => {
                    setTopic(e.target.value);
                    setPage(1);
                  }}
                  disabled={metaLoading}
                >
                  <option value="">All topics</option>
                  {meta.topics.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-6 col-md-2">
                <label className="form-label mb-1">Difficulty</label>
                <select
                  className="form-select"
                  value={difficulty}
                  onChange={(e) => {
                    setDifficulty(e.target.value);
                    setPage(1);
                  }}
                  disabled={metaLoading}
                >
                  <option value="">All</option>
                  {(meta.difficulties.length
                    ? meta.difficulties
                    : ["easy", "medium", "hard"]
                  ).map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-2 d-grid">
                <button className="btn btn-primary" type="submit">
                  Apply
                </button>
              </div>
            </div>

            {metaError && <div className="text-danger mt-2">{metaError}</div>}
          </form>

          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
            <div className="text-muted">
              {loading ? (
                "Loading..."
              ) : (
                <>
                  Showing {(data.items || []).length} of {data.total} questions
                  {data.totalPages ? ` • Page ${page} / ${data.totalPages}` : ""}
                </>
              )}
            </div>

            <div className="btn-group">
              <button
                className="btn btn-outline-primary"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={!canPrev}
                type="button"
              >
                Prev
              </button>

              <button
                className="btn btn-outline-primary"
                onClick={() => setPage((prev) => prev + 1)}
                disabled={!canNext}
                type="button"
              >
                Next
              </button>
            </div>
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          {!loading && !error && data.items.length === 0 && (
            <div className="card p-4 text-center text-muted">
              No questions match your filters.
            </div>
          )}

          <div className="d-grid gap-3">
            {data.items.map((item) => (
              <div key={item._id || item.questionId} className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                    <div>
                      <div className="text-muted small mb-1">
                        <span className="me-2">
                          <strong>ID:</strong> {item.questionId}
                        </span>
                        <span className="me-2">
                          <strong>Topic:</strong> {item.topic || "—"}
                        </span>
                        <span>
                          <strong>Difficulty:</strong> {item.difficulty || "—"}
                        </span>
                      </div>

                      <div className="fw-semibold">{item.questionText}</div>
                    </div>
                  </div>

                  {Array.isArray(item.options) && item.options.length > 0 && (
                    <div className="mt-3">
                      <div className="row g-2">
                        {item.options.map((option, index) => (
                          <div
                            key={`${item.questionId}-${index}`}
                            className="col-12 col-md-6"
                          >
                            <div className="border rounded p-2 bg-light">
                              {option}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionBrowserPage;