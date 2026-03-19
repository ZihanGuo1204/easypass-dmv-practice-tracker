require("dotenv").config(); 

const connectDB = require("./config/db"); 

function generateQuestion(index) {
  const topics = ["Traffic Rules", "Signs", "Safety", "Right of Way"];
  const difficulties = ["easy", "medium", "hard"];

  return {
    questionId: `Q${String(index).padStart(4, "0")}`, 
    questionText: `Sample DMV question number ${index}: What should you do in this situation?`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: "Option A",
    topic: topics[index % topics.length],
    difficulty: difficulties[index % difficulties.length],
  };
}

async function seedDatabase() {
  try {
    const db = await connectDB(); 
    const collection = db.collection("questions");

    const existingCount = await collection.countDocuments();

    if (existingCount >= 1000) {
      console.log("⚠️ questions already has 1000+ records, skipping insert.");
      process.exit(0);
    }

    const questions = [];

    for (let i = 1; i <= 1000; i++) {
      questions.push(generateQuestion(i));
    }

    const result = await collection.insertMany(questions);

    console.log(`✅ Inserted ${result.insertedCount} questions successfully`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error inserting questions:", error);
    process.exit(1);
  }
}

seedDatabase();