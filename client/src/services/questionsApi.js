// ===============================
// Get one random question
// ===============================
export async function getRandomQuestion() {
  try {
    const response = await fetch("/api/questions/random");

    if (!response.ok) {
      throw new Error("Failed to fetch random question");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching question:", error);
    throw error;
  }
}

// ===============================
// Get question metadata (topics + difficulties)
// ===============================
export async function getQuestionMeta() {
  try {
    const response = await fetch("/api/questions/meta");

    if (!response.ok) {
      throw new Error("Failed to fetch metadata");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching metadata:", error);
    throw error;
  }
}

// ===============================
// Get filtered questions (with search + pagination)
// ===============================
export async function getQuestions({
  topic = "",
  difficulty = "",
  q = "",
  page = 1,
  limit = 20,
} = {}) {
  try {
    const params = new URLSearchParams();

    if (topic) params.append("topic", topic);
    if (difficulty) params.append("difficulty", difficulty);
    if (q) params.append("q", q);

    params.append("page", page);
    params.append("limit", limit);

    const response = await fetch(`/api/questions?${params.toString()}`);

    if (!response.ok) {
      throw new Error("Failed to fetch questions");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
}