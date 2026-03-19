export async function getSavedQuestions() {
  const response = await fetch("/api/saved-questions");

  if (!response.ok) {
    throw new Error("Failed to fetch saved questions");
  }

  return await response.json();
}

export async function createSavedQuestion(newQuestion) {
  const response = await fetch("/api/saved-questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newQuestion),
  });

  if (!response.ok) {
    throw new Error("Failed to create saved question");
  }

  return await response.json();
}

export async function deleteSavedQuestion(id) {
  const response = await fetch(`/api/saved-questions/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete saved question");
  }

  return await response.json();
}

export async function markAsReviewed(id) {
  const response = await fetch(`/api/saved-questions/${id}/review`, {
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Failed to update question");
  }

  return await response.json();
}
