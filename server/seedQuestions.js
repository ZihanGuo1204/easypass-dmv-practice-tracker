const connectDB = require("./config/db");

const baseQuestions = [
  {
    questionText: "What should you do at a stop sign?",
    options: [
      "Stop completely before the limit line or crosswalk",
      "Slow down and continue if the road looks clear",
      "Honk and proceed carefully",
      "Only stop if another vehicle is coming",
    ],
    correctAnswer: "Stop completely before the limit line or crosswalk",
    topic: "Traffic Rules",
    difficulty: "easy",
  },
  {
    questionText: "What does a solid red traffic light mean?",
    options: [
      "Stop and wait until the light turns green",
      "Proceed if no pedestrians are nearby",
      "Turn left without stopping",
      "Speed up before cross traffic moves",
    ],
    correctAnswer: "Stop and wait until the light turns green",
    topic: "Traffic Signals",
    difficulty: "easy",
  },
  {
    questionText: "What does a yellow traffic light mean?",
    options: [
      "The light is about to turn red",
      "The intersection is closed",
      "You must speed up",
      "Pedestrians must always stop",
    ],
    correctAnswer: "The light is about to turn red",
    topic: "Traffic Signals",
    difficulty: "easy",
  },
  {
    questionText: "When must you yield to pedestrians?",
    options: [
      "At all crosswalks and intersections where pedestrians are present",
      "Only at traffic lights",
      "Only in school zones",
      "Only when a police officer is present",
    ],
    correctAnswer:
      "At all crosswalks and intersections where pedestrians are present",
    topic: "Right of Way",
    difficulty: "medium",
  },
  {
    questionText:
      "What should you do when an emergency vehicle with siren is approaching?",
    options: [
      "Move to the right edge of the road and stop",
      "Keep driving at the same speed",
      "Stop in the middle of the lane",
      "Race through the intersection",
    ],
    correctAnswer: "Move to the right edge of the road and stop",
    topic: "Safety",
    difficulty: "medium",
  },
  {
    questionText: "What is the safest way to change lanes?",
    options: [
      "Check mirrors, signal, check blind spot, then move",
      "Signal after entering the next lane",
      "Quickly move over before other drivers react",
      "Only use the rearview mirror",
    ],
    correctAnswer: "Check mirrors, signal, check blind spot, then move",
    topic: "Lane Changes",
    difficulty: "medium",
  },
  {
    questionText:
      "If a school bus is stopped with flashing red lights, what must you do?",
    options: [
      "Stop until the lights stop flashing",
      "Pass slowly on the left",
      "Honk and continue",
      "Drive around it if children are not visible",
    ],
    correctAnswer: "Stop until the lights stop flashing",
    topic: "School Bus Rules",
    difficulty: "easy",
  },
  {
    questionText:
      "Why is it dangerous to drive too closely behind another vehicle?",
    options: [
      "It reduces your ability to stop in time",
      "It improves fuel economy too much",
      "It makes lane changes easier",
      "It improves reaction time",
    ],
    correctAnswer: "It reduces your ability to stop in time",
    topic: "Safety",
    difficulty: "easy",
  },
  {
    questionText:
      "When parking uphill with a curb, which way should you turn your front wheels?",
    options: [
      "Away from the curb",
      "Toward the curb",
      "Keep them straight",
      "It does not matter",
    ],
    correctAnswer: "Away from the curb",
    topic: "Parking",
    difficulty: "hard",
  },
  {
    questionText: "What should you do before backing up your vehicle?",
    options: [
      "Look over your shoulder and check behind the vehicle",
      "Only use the rearview mirror",
      "Honk twice and reverse immediately",
      "Rely only on the backup camera",
    ],
    correctAnswer: "Look over your shoulder and check behind the vehicle",
    topic: "Parking",
    difficulty: "easy",
  },
  {
    questionText: "When entering a freeway, you should:",
    options: [
      "Match the speed of traffic when safe",
      "Stop at the end of the ramp",
      "Drive slower than freeway traffic",
      "Immediately move to the far-left lane",
    ],
    correctAnswer: "Match the speed of traffic when safe",
    topic: "Freeway Driving",
    difficulty: "medium",
  },
  {
    questionText: "What is the purpose of wearing a seat belt?",
    options: [
      "To reduce injury in a collision",
      "To improve fuel economy",
      "To make steering easier",
      "To avoid using mirrors",
    ],
    correctAnswer: "To reduce injury in a collision",
    topic: "Safety",
    difficulty: "easy",
  },
  {
    questionText: "What should you do if you miss your freeway exit?",
    options: [
      "Go to the next exit",
      "Back up on the shoulder",
      "Stop and wait for a break in traffic",
      "Make a U-turn immediately",
    ],
    correctAnswer: "Go to the next exit",
    topic: "Freeway Driving",
    difficulty: "easy",
  },
  {
    questionText: "Before making a right turn, you should:",
    options: [
      "Signal and move into the correct lane",
      "Drive in the left lane",
      "Ignore pedestrians in the crosswalk",
      "Turn without slowing down",
    ],
    correctAnswer: "Signal and move into the correct lane",
    topic: "Turning",
    difficulty: "easy",
  },
  {
    questionText: "What should you do if your vehicle starts to skid?",
    options: [
      "Steer in the direction you want the front wheels to go",
      "Brake as hard as possible",
      "Turn the wheel sharply in the opposite direction",
      "Accelerate immediately",
    ],
    correctAnswer: "Steer in the direction you want the front wheels to go",
    topic: "Safety",
    difficulty: "hard",
  },
  {
    questionText: "When are you allowed to pass another vehicle on the right?",
    options: [
      "When it is safe and the vehicle ahead is making a left turn",
      "Any time traffic is slow",
      "Only on a one-lane road",
      "Whenever the shoulder is wide enough",
    ],
    correctAnswer:
      "When it is safe and the vehicle ahead is making a left turn",
    topic: "Passing",
    difficulty: "medium",
  },
  {
    questionText: "What does a double solid yellow line mean?",
    options: [
      "Passing is not allowed in either direction",
      "Passing is allowed at any time",
      "Traffic flows in one direction only",
      "The road is about to end",
    ],
    correctAnswer: "Passing is not allowed in either direction",
    topic: "Road Markings",
    difficulty: "easy",
  },
  {
    questionText:
      "If you see a pedestrian using a white cane or guide dog, you must:",
    options: [
      "Yield the right-of-way",
      "Honk to warn them",
      "Drive around them quickly",
      "Proceed if traffic is light",
    ],
    correctAnswer: "Yield the right-of-way",
    topic: "Pedestrian Safety",
    difficulty: "medium",
  },
  {
    questionText: "What should you do at a flashing red traffic signal?",
    options: [
      "Stop completely, then proceed when safe",
      "Slow down and continue",
      "Treat it like a green light",
      "Ignore it if the intersection is empty",
    ],
    correctAnswer: "Stop completely, then proceed when safe",
    topic: "Traffic Signals",
    difficulty: "easy",
  },
  {
    questionText: "What should you do at a flashing yellow traffic signal?",
    options: [
      "Slow down and proceed with caution",
      "Stop completely before entering",
      "Turn around immediately",
      "Speed up through the intersection",
    ],
    correctAnswer: "Slow down and proceed with caution",
    topic: "Traffic Signals",
    difficulty: "easy",
  },
  {
    questionText:
      "What is the legal speed limit in a school zone when children are present?",
    options: [
      "Follow the posted reduced speed limit",
      "Always drive 45 mph",
      "Drive the same speed as freeway traffic",
      "Ignore school zone signs",
    ],
    correctAnswer: "Follow the posted reduced speed limit",
    topic: "Speed Limits",
    difficulty: "easy",
  },
  {
    questionText: "When driving in fog, you should use:",
    options: [
      "Low-beam headlights",
      "High-beam headlights",
      "Hazard lights only",
      "No headlights during daytime",
    ],
    correctAnswer: "Low-beam headlights",
    topic: "Weather Driving",
    difficulty: "medium",
  },
  {
    questionText: "What should you do if a tire suddenly blows out?",
    options: [
      "Hold the steering wheel firmly and slow down gradually",
      "Brake hard immediately",
      "Turn sharply to the shoulder",
      "Accelerate to stabilize the car",
    ],
    correctAnswer: "Hold the steering wheel firmly and slow down gradually",
    topic: "Emergency Situations",
    difficulty: "hard",
  },
  {
    questionText: "Before turning left, you should:",
    options: [
      "Yield to oncoming traffic and pedestrians",
      "Assume oncoming drivers will stop",
      "Turn before signaling",
      "Accelerate through the turn without checking",
    ],
    correctAnswer: "Yield to oncoming traffic and pedestrians",
    topic: "Turning",
    difficulty: "medium",
  },
  {
    questionText: "A broken white line on the road means:",
    options: [
      "You may change lanes when safe",
      "You may never change lanes",
      "Traffic moves in opposite directions",
      "Parking is prohibited",
    ],
    correctAnswer: "You may change lanes when safe",
    topic: "Road Markings",
    difficulty: "easy",
  },
  {
    questionText: "When should you use your turn signal?",
    options: [
      "Any time you plan to turn or change lanes",
      "Only when another driver is directly behind you",
      "Only at night",
      "Only when making left turns",
    ],
    correctAnswer: "Any time you plan to turn or change lanes",
    topic: "Signals",
    difficulty: "easy",
  },
  {
    questionText:
      "If two vehicles arrive at a four-way stop at the same time, who has the right-of-way?",
    options: [
      "The vehicle on the right",
      "The larger vehicle",
      "The faster vehicle",
      "The vehicle that honks first",
    ],
    correctAnswer: "The vehicle on the right",
    topic: "Right of Way",
    difficulty: "medium",
  },
  {
    questionText: "What should you do if you are feeling tired while driving?",
    options: [
      "Pull over in a safe place and rest",
      "Open the window and keep driving",
      "Drive faster to get home sooner",
      "Turn up the music and continue",
    ],
    correctAnswer: "Pull over in a safe place and rest",
    topic: "Safety",
    difficulty: "easy",
  },
  {
    questionText:
      "What is the safest following distance in good driving conditions?",
    options: [
      "At least three seconds behind the vehicle ahead",
      "One second behind the vehicle ahead",
      "As close as possible to avoid other cars merging",
      "Half a car length at all times",
    ],
    correctAnswer: "At least three seconds behind the vehicle ahead",
    topic: "Safety",
    difficulty: "medium",
  },
  {
    questionText:
      "What should you do if traffic signals are not working at an intersection?",
    options: [
      "Treat the intersection as a four-way stop",
      "Drive through without stopping",
      "Only yield to large trucks",
      "Use your horn instead of stopping",
    ],
    correctAnswer: "Treat the intersection as a four-way stop",
    topic: "Traffic Rules",
    difficulty: "medium",
  },
  {
    questionText:
      "When parking downhill with a curb, which way should you turn your front wheels?",
    options: [
      "Toward the curb",
      "Away from the curb",
      "Keep them straight",
      "Toward the center of the road",
    ],
    correctAnswer: "Toward the curb",
    topic: "Parking",
    difficulty: "hard",
  },
  {
    questionText: "What does a solid white line between lanes mean?",
    options: [
      "Lane changes should be avoided",
      "You must always change lanes",
      "Passing is encouraged",
      "Traffic is moving in opposite directions",
    ],
    correctAnswer: "Lane changes should be avoided",
    topic: "Road Markings",
    difficulty: "medium",
  },
];

function rotateOptions(options, shift) {
  const rotated = [...options];
  for (let i = 0; i < shift; i += 1) {
    rotated.push(rotated.shift());
  }
  return rotated;
}

function generateQuestion(index) {
  const template = baseQuestions[index % baseQuestions.length];
  const shift = index % template.options.length;
  const rotatedOptions = rotateOptions(template.options, shift);

  return {
    questionId: `Q${String(index + 1).padStart(4, "0")}`,
    questionText: template.questionText,
    options: rotatedOptions,
    correctAnswer: template.correctAnswer,
    topic: template.topic,
    difficulty: template.difficulty,
  };
}

async function seedDatabase() {
  try {
    const db = await connectDB();
    const collection = db.collection("questions");

    await collection.deleteMany({});

    const questions = [];
    for (let i = 0; i < 1000; i += 1) {
      questions.push(generateQuestion(i));
    }

    const result = await collection.insertMany(questions);
    console.log(`Inserted ${result.insertedCount} questions successfully.`);
    process.exit(0);
  } catch (error) {
    console.error("Error inserting questions:", error);
    process.exit(1);
  }
}

seedDatabase();
