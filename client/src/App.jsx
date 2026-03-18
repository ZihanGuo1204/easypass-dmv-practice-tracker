import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import SavedQuestionsPage from "./pages/SavedQuestionsPage/SavedQuestionsPage";
import MistakeNotebookPage from "./pages/MistakeNotebookPage/MistakeNotebookPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<SavedQuestionsPage />} />
        <Route path="/mistakes" element={<MistakeNotebookPage />} />
      </Routes>
    </Router>
  );
}

export default App;