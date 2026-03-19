const {
  createSavedQuestion,
  getAllSavedQuestions,
  deleteSavedQuestion,
  updateSavedQuestion,
} = require("../models/savedQuestionModel");

// CREATE
async function addSavedQuestion(req, res) {
  try {
    const { userId, questionId, questionText, topic, difficulty } = req.body;

    if (!questionId || !questionText) {
      return res.status(400).json({
        message: "questionId and questionText are required",
      });
    }

    const newSavedQuestion = {
      userId: userId || "demo-user-1",
      questionId,
      questionText,
      topic: topic || "",
      difficulty: difficulty || "",
      source: req.body.source || "favorite",
      isFavorite: req.body.isFavorite ?? true,
      isReviewed: req.body.isReviewed ?? false,
      personalNote: req.body.personalNote || "",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await createSavedQuestion(newSavedQuestion);

    res.status(201).json({
      message: "Saved question created successfully",
      insertedId: result.insertedId,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create saved question",
      error: error.message,
    });
  }
}

// READ
async function getSavedQuestions(req, res) {
  try {
    const { userId } = req.query;
    const savedQuestions = await getAllSavedQuestions(userId);

    res.status(200).json(savedQuestions);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get saved questions",
      error: error.message,
    });
  }
}

// UPDATE
async function editSavedQuestion(req, res) {
  try {
    const { id } = req.params;

    const updateData = {
      isReviewed: req.body.isReviewed,
      personalNote: req.body.personalNote,
      updatedAt: new Date(),
    };

    const result = await updateSavedQuestion(id, updateData);

    res.status(200).json({
      message: "Saved question updated successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update saved question",
      error: error.message,
    });
  }
}

// DELETE
async function removeSavedQuestion(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteSavedQuestion(id);

    res.status(200).json({
      message: "Saved question deleted successfully",
      result,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete saved question",
      error: error.message,
    });
  }
}

module.exports = {
  addSavedQuestion,
  getSavedQuestions,
  editSavedQuestion,
  removeSavedQuestion,
};
