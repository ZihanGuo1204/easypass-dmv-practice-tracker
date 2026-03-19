// Save quiz attempt
export async function createAttempt(attemptData) {
  try {
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
  } catch (error) {
    console.error("Error saving attempt:", error);
    throw error;
  }
}

// Get all attempts
export async function getAttempts() {
  try {
    const response = await fetch("/api/attempts");

    if (!response.ok) {
      throw new Error("Failed to fetch attempts");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching attempts:", error);
    throw error;
  }
}
