// CREATE: save a new quiz attempt
export async function createAttempt(attemptData) {
  try {
    const response = await fetch("/api/attempts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

// READ: get all attempts for the current logged-in user
export async function getAttempts() {
  try {
    const response = await fetch("/api/attempts", {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch attempts");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching attempts:", error);
    throw error;
  }
}

// UPDATE: update an existing attempt
export async function updateAttempt(id, updatedData) {
  try {
    const response = await fetch(`/api/attempts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error("Failed to update attempt");
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating attempt:", error);
    throw error;
  }
}

// DELETE: remove an attempt
export async function deleteAttempt(id) {
  try {
    const response = await fetch(`/api/attempts/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error("Failed to delete attempt");
    }

    return await response.json();
  } catch (error) {
    console.error("Error deleting attempt:", error);
    throw error;
  }
}