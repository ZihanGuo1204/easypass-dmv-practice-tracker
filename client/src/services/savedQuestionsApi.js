const API_BASE_URL = "/api/saved-questions";

export async function getSavedQuestions() {
  const response = await fetch(API_BASE_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch saved questions");
  }

  return await response.json();
}