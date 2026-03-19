import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <span className="navbar-brand">EasyPass DMV Practice Tracker</span>

      <div className="ms-auto d-flex gap-2 flex-wrap">
        {/* Saved */}
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "btn btn-light"
              : "btn btn-outline-light"
          }
        >
          Saved
        </Link>

        {/* Mistakes */}
        <Link
          to="/mistakes"
          className={
            location.pathname === "/mistakes"
              ? "btn btn-warning"
              : "btn btn-outline-light"
          }
        >
          Mistakes
        </Link>

        {/* Favorites */}
        <Link
          to="/favorites"
          className={
            location.pathname === "/favorites"
              ? "btn btn-success"
              : "btn btn-outline-light"
          }
        >
          Favorites
        </Link>

        {/* History */}
        <Link
          to="/history"
          className={
            location.pathname === "/history"
              ? "btn btn-secondary"
              : "btn btn-outline-light"
          }
        >
          History
        </Link>

        {/* ⭐ NEW: Browse */}
        <Link
          to="/questions"
          className={
            location.pathname === "/questions"
              ? "btn btn-secondary"
              : "btn btn-outline-light"
          }
        >
          Browse
        </Link>

        {/* Add */}
        <Link
          to="/add-question"
          className={
            location.pathname === "/add-question"
              ? "btn btn-info"
              : "btn btn-outline-light"
          }
        >
          Add
        </Link>

        {/* Quiz */}
        <Link
          to="/quiz"
          className={
            location.pathname === "/quiz"
              ? "btn btn-dark"
              : "btn btn-outline-light"
          }
        >
          Quiz
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;