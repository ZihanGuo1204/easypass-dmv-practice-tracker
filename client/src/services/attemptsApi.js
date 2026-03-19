import { API_BASE } from "./config";

// Save quiz attempt
export async function createAttempt(attemptData) {
  try {
    const response = await fetch(`${API_BASE}/api/attempts`, {
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
  } catch (error) {
    console.error("Error saving attempt:", error);
    throw error;
  }
}