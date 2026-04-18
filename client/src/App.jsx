import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar/Navbar";
import SavedQuestionsPage from "./pages/SavedQuestionsPage/SavedQuestionsPage";
import MistakeNotebookPage from "./pages/MistakeNotebookPage/MistakeNotebookPage";
import AddQuestionPage from "./pages/AddQuestionPage/AddQuestionPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import QuizPage from "./pages/QuizPage/QuizPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import QuestionBrowserPage from "./pages/QuestionBrowserPage/QuestionBrowserPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { getCurrentUser, logoutUser } from "./services/authApi";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    async function checkAuth() {
      try {
        const result = await getCurrentUser();
        setUser(result.user);
      } catch {
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }

    checkAuth();
  }, []);

  useEffect(() => {
    if (!user) return;

    const main = document.getElementById("main-content");
    if (main) {
      main.focus();
    }
  }, [location, user]);

  async function handleLogout() {
    try {
      await logoutUser();
      setUser(null);
      setAuthMode("login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  if (authLoading) {
    return <div className="container mt-4">Loading...</div>;
  }

  if (!user) {
    if (authMode === "register") {
      return <RegisterPage onSwitchToLogin={() => setAuthMode("login")} />;
    }

    return (
      <LoginPage
        onLoginSuccess={setUser}
        onSwitchToRegister={() => setAuthMode("register")}
      />
    );
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <Navbar user={user} onLogout={handleLogout} />

      <main id="main-content" tabIndex="-1">
        <Routes>
          <Route path="/" element={<QuizPage />} />
          <Route path="/saved" element={<SavedQuestionsPage />} />
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
