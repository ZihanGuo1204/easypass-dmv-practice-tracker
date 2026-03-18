import { useState } from "react";
import SavedQuestionsPage from "./pages/SavedQuestionsPage/SavedQuestionsPage";
import MistakeNotebookPage from "./pages/MistakeNotebookPage/MistakeNotebookPage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("saved");

  return (
    <div>
      <nav className="app-nav">
        <button onClick={() => setCurrentPage("saved")}>Saved Questions</button>
        <button onClick={() => setCurrentPage("mistakes")}>Mistake Notebook</button>
      </nav>

      {currentPage === "saved" ? <SavedQuestionsPage /> : <MistakeNotebookPage />}
    </div>
  );
}

export default App;