# EasyPass DMV Practice Tracker – Design Document

## Project Description

EasyPass DMV Practice Tracker is a full-stack web application designed to help users prepare for DMV written tests more effectively. Unlike traditional practice apps, EasyPass focuses on tracking user mistakes, reviewing weak areas, and improving long-term retention.

The system provides features such as:

- Browsing and filtering questions
- Taking quizzes and checking answers
- Saving important questions
- Reviewing mistake history
- Tracking progress over time

The frontend is built using React with hooks and client-side rendering (CSR), while the backend uses Node.js with Express and a MongoDB database (native driver).

---

## System Architecture

Client (React - CSR)
↓ fetch API
Server (Node.js + Express)
↓
MongoDB (native driver)

---

## Personas

### Alex – Busy College Student

- Goal: Pass DMV test quickly
- Pain Point: Limited time
- Scenario: Uses short practice sessions daily

### Mei – International Student

- Goal: Understand traffic rules
- Pain Point: Language barrier
- Scenario: Reviews saved and mistake questions

### Jordan – Retake User

- Goal: Pass after failure
- Pain Point: Repeating mistakes
- Scenario: Uses mistake notebook

---

## User Stories

- Users can practice questions quickly
- Users can filter by topic/difficulty
- Users can save questions
- Users can review mistakes
- Users can track history

---

## Design Mockups

The following screenshots represent the actual UI design of the system and serve as the design mockups for this project.

### Saved Questions

![Saved Questions](assets/screenshots/saved-questions.png)

### Practice Quiz

![Practice Quiz](assets/screenshots/quiz.png)

### Add Question

![Add Question](assets/screenshots/add-question.png)

### Question Browser

![Question Browser](assets/screenshots/question-browser.png)

### History

![History](assets/screenshots/history.png)

### Favorite Questions

![Favorite Questions](assets/screenshots/favorites.png)

### Mistake Notebook

![Mistake Notebook](assets/screenshots/mistake-notebook.png)

---

## Wireframes

### Question Browser

- Filters (topic, difficulty, search)
- Question list
- Pagination

### Quiz Page

- Question
- Options
- Check answer button

### Saved Questions

- List of saved questions
- Delete / mark reviewed

### Mistake Notebook

- Only mistake questions
- Mark as reviewed

### History Page

- List of past attempts

---

## Technologies

- Frontend: React (hooks, CSR)
- Backend: Node.js + Express
- Database: MongoDB (native driver)
- Styling: CSS / Bootstrap
- Linting: ESLint + Prettier

---

## Conclusion

This system focuses on improving learning efficiency through tracking and reviewing, making it more effective than traditional quiz apps.
