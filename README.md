# EasyPass DMV Practice Tracker

**Authors**: Zihan Guo, Fanchao Yu  
**Course**: CS5610 Web Development  
**Course Link**: https://johnguerra.co/classes/webDevelopment_online_spring_2026/

---

## Project Overview

EasyPass is a **client-side rendered React application** (using hooks, no server-side rendering) combined with a Node.js/Express backend and MongoDB database.

The system helps users practice DMV-style questions, track performance, and organize study materials using favorites and a mistake notebook.

---

## Project Objectives

- Enable focused practice by **topic and difficulty**
- Track user performance via **attempt history**
- Support personalized study through **Favorites and Mistake Notebook**

---

## Screenshots

![Saved Questions](assets/screenshots/saved-questions.png)  
![Practice Quiz](assets/screenshots/quiz.png)  
![Add Question](assets/screenshots/add-question.png)  
![Question Browser](assets/screenshots/question-browser.png)  
![History](assets/screenshots/history.png)  
![Favorite Questions](assets/screenshots/favorites.png)  
![Mistake Notebook](assets/screenshots/mistake-notebook.png)

---

## Live Demo

- **Frontend (Vercel)**: https://easypass-dmv-practice-tracker.vercel.app  
- **Backend (Render)**: https://easypass-dmv-practice-tracker.onrender.com  

---

## Features

- Random DMV-style quiz practice
- Question browser with filtering and search
- Save questions to Favorites
- Mistake Notebook for incorrect questions
- Attempt history tracking
- Mark questions as reviewed

---

## How to Use

### Browse Questions
- Navigate to `/questions`
- Filter by topic, difficulty, or keyword
- Use pagination controls

### Quiz Mode
- Navigate to `/quiz`
- Select an answer
- Immediate feedback (correct/incorrect)
- Move to next question or restart quiz

### Save Questions
- ⭐ Favorite → save to Favorites
- ❌ Mistake → save to Mistake Notebook

### Review Lists
- Access Saved / Favorites / Mistakes pages
- Mark questions as reviewed or delete them

### Attempt History
- View past attempts in `/history`

---

## Tech Stack

### Frontend
- React (hooks)
- React Router
- Vite
- Bootstrap
- PropTypes

### Backend
- Node.js
- Express

### Database
- MongoDB (native driver)

### Other
- Fetch API (no axios)
- ESLint
- Prettier

---

## Database Design

Database: `easypass`

Collections:

- `questions` → question bank (1000+ synthetic records)
- `savedQuestions` → favorites/mistakes with notes
- `attempts` → user attempt history

---

## API Endpoints

### Questions

- `GET /api/questions`
- `GET /api/questions/random`
- `GET /api/questions/meta`

Example response:

```json
{
  "items": [],
  "total": 1000,
  "page": 1,
  "totalPages": 50
}
```

### Saved Questions

- `GET /api/saved-questions`
- `POST /api/saved-questions`
- `DELETE /api/saved-questions/:id`
- `PUT /api/saved-questions/:id/review`

### Attempts

- `GET /api/attempts`
- `POST /api/attempts`

---

## Project Structure

```
client/
  src/
    components/
    pages/
    services/

server/
  routes/
  config/
  seedQuestions.js
```

CSS is organized per component (co-located with JSX files).

---

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB (Atlas or local)

---

### Backend Setup

```
cd server
npm install
```

Create `.env`:

```
MONGO_URI="your-mongodb-connection-string"
PORT=4000
```

Run server:

```
node server.js
```

---

### Seed Database

```
cd server
node seedQuestions.js
```

---

### Frontend Setup

```
cd client
npm install
```

Optional:

```
VITE_API_BASE_URL="http://localhost:4000"
```

Run frontend:

```
npm run dev
```

---

## Code Quality

### ESLint

```
cd client
npx eslint .
```

### Prettier

```
npx prettier --write .
```

---

## User Personas

**1. Busy commuter (Alex, 24)**  
Wants quick, focused practice sessions.

**2. First-time driver (Mei, 17)**  
Needs repetition and mistake tracking.

**3. Test retaker (Jordan, 31)**  
Wants to monitor improvement over time.

---

## User Stories

- Browse and filter questions
- Practice random questions
- Save favorites
- Track mistakes
- View attempt history
- Mark reviewed questions

---

## Design Notes

Design is based on a simple and clean layout:

- Navbar for navigation
- Question cards for interaction
- Filter panel for browsing
- Quiz interface with immediate feedback

Screenshots above serve as visual mockups.

---

## License

This project is licensed under the MIT License. See the LICENSE file for details.