export async function createAttempt(attemptData) {
  const response = await fetch("/api/attempts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(attemptData),
  });

  if (!response.ok) {
    throw new Error("Failed to save attempt");
  }

  return await response.json();
}