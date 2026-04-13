import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar/Navbar";
import SavedQuestionsPage from "./pages/SavedQuestionsPage/SavedQuestionsPage";
import MistakeNotebookPage from "./pages/MistakeNotebookPage/MistakeNotebookPage";
import AddQuestionPage from "./pages/AddQuestionPage/AddQuestionPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import QuizPage from "./pages/QuizPage/QuizPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import QuestionBrowserPage from "./pages/QuestionBrowserPage/QuestionBrowserPage";
import "./App.css";

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (main) {
      main.focus();
    }
  }, [location]);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar />

      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<SavedQuestionsPage />} />
          <Route path="/mistakes" element={<MistakeNotebookPage />} />
          <Route path="/add-question" element={<AddQuestionPage />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/questions" element={<QuestionBrowserPage />} />
        </Routes>
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;