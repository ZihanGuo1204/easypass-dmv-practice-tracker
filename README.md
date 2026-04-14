# EasyPass DMV Practice Tracker

**Authors**: Zihan Guo, Fanchao Yu  
**Course**: CS5610 Web Development  
**Project Type**: Full Stack Web Application

---

## Project Overview

EasyPass is a client-side rendered React application built with a Node.js/Express backend and MongoDB database.

The system helps users practice DMV-style questions, track learning progress, and organize study materials using features like Favorites and a Mistake Notebook.

---

## Live Demo

Frontend (Vercel):  
https://easypass-dmv-practice-tracker.vercel.app

Backend (Render):  
https://easypass-dmv-practice-tracker.onrender.com

---

## Demo Thumbnail

![Thumbnail](assets/screenshots/thumbnail.png)

---

## Screenshots

Saved Questions  
![Saved Questions](assets/screenshots/saved-questions.png)

Quiz Mode  
![Quiz](assets/screenshots/quiz.png)

Add Question  
![Add Question](assets/screenshots/add-question.png)

Question Browser  
![Browser](assets/screenshots/question-browser.png)

History  
![History](assets/screenshots/history.png)

Favorites  
![Favorites](assets/screenshots/favorites.png)

Mistake Notebook  
![Mistakes](assets/screenshots/mistake-notebook.png)

---

## Features

- Random DMV-style quiz with immediate feedback
- Question browser with filtering and search
- Save questions to Favorites
- Mistake Notebook for incorrect questions
- Attempt history tracking
- Mark questions as reviewed
- Delete attempts and saved questions

---

## System Design

### MongoDB Collections

We use three collections:

questions

- Stores DMV question bank (1000+ synthetic records)
- Read-only collection used for browsing and quiz

savedQuestions

- Stores user-saved questions
- Full CRUD supported

attempts

- Stores user attempt history
- Full CRUD supported

---

## API Endpoints

### Questions

GET /api/questions  
GET /api/questions/random  
GET /api/questions/meta

### Saved Questions (Full CRUD)

GET /api/saved-questions  
POST /api/saved-questions  
PUT /api/saved-questions/:id/review  
DELETE /api/saved-questions/:id

### Attempts (Full CRUD)

GET /api/attempts  
POST /api/attempts  
PUT /api/attempts/:id  
DELETE /api/attempts/:id

---

## Tech Stack

Frontend

- React (Hooks)
- React Router
- Vite
- Bootstrap
- PropTypes
- CSS Modules

Backend

- Node.js
- Express

Database

- MongoDB (native driver)

Other

- Fetch API
- ESLint
- Prettier

---

## Project Structure

client/  
 src/  
 components/  
 pages/  
 services/

server/  
 routes/  
 config/  
 seedQuestions.js

---

## Setup Instructions

### Prerequisites

- Node.js
- MongoDB

---

### Backend Setup

cd server  
npm install

Create .env file:

MONGO_URI="your-mongodb-connection-string"  
PORT=4000

Run:

node server.js

---

### Seed Database

cd server  
node seedQuestions.js

---

### Frontend Setup

cd client  
npm install

Run:

npm run dev

---

## Code Quality

ESLint  
npx eslint .

Prettier  
npx prettier --write .

---

## User Personas

Busy commuter (Alex, 24)  
Needs quick practice sessions

First-time driver (Mei, 17)  
Needs repetition and mistake tracking

Test retaker (Jordan, 31)  
Wants to track improvement

---

## User Stories

- Browse and filter questions
- Practice random questions
- Save favorites
- Track mistakes
- View attempt history
- Mark reviewed questions

---

## Accessibility

- Semantic HTML structure
- Keyboard navigation supported
- Accessible form labels
- High contrast UI
- Lighthouse Accessibility Score: 100

---

## Course Link

https://neu-seattle.github.io/cs5610/

---

## License

MIT License
