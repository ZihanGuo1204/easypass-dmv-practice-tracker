import { API_BASE } from "./config";

export async function getRandomQuestion() {
  const response = await fetch(`${API_BASE}/api/questions/random`);

  if (!response.ok) {
    throw new Error("Failed to fetch random question");
  }

  return await response.json();
}