import BASE_URL from "./config";

export async function getRandomQuestion() {
  const response = await fetch(`${BASE_URL}/api/questions/random`);

  if (!response.ok) {
    throw new Error("Failed to fetch random question");
  }

  return await response.json();
}