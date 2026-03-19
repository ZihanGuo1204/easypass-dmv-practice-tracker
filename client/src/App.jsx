import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SavedQuestionsPage from "./pages/SavedQuestionsPage/SavedQuestionsPage";
import MistakeNotebookPage from "./pages/MistakeNotebookPage/MistakeNotebookPage";
import AddQuestionPage from "./pages/AddQuestionPage/AddQuestionPage";
import FavoritePage from "./pages/FavoritePage/FavoritePage";
import QuizPage from "./pages/QuizPage/QuizPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SavedQuestionsPage />} />
        <Route path="/mistakes" element={<MistakeNotebookPage />} />
        <Route path="/add-question" element={<AddQuestionPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;