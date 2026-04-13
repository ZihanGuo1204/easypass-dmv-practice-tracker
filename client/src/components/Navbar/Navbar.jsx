import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary px-4"
      aria-label="Main navigation"
    >
      <span className="navbar-brand">EasyPass DMV Practice Tracker</span>

      <div className="ms-auto d-flex gap-2 flex-wrap">
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "btn btn-light"
              : "btn btn-outline-light"
          }
          aria-current={location.pathname === "/" ? "page" : undefined}
        >
          Saved
        </Link>

        <Link
          to="/mistakes"
          className={
            location.pathname === "/mistakes"
              ? "btn btn-warning"
              : "btn btn-outline-light"
          }
          aria-current={location.pathname === "/mistakes" ? "page" : undefined}
        >
          Mistakes
        </Link>

        <Link
          to="/favorites"
          className={
            location.pathname === "/favorites"
              ? "btn btn-success"
              : "btn btn-outline-light"
          }
          aria-current={location.pathname === "/favorites" ? "page" : undefined}
        >
          Favorites
        </Link>

        <Link
          to="/history"
          className={
            location.pathname === "/history"
              ? "btn btn-secondary"
              : "btn btn-outline-light"
          }
          aria-current={location.pathname === "/history" ? "page" : undefined}
        >
          History
        </Link>

        <Link
          to="/questions"
          className={
            location.pathname === "/questions"
              ? "btn btn-secondary"
              : "btn btn-outline-light"
          }
          aria-current={location.pathname === "/questions" ? "page" : undefined}
        >
          Browse
        </Link>

        <Link
          to="/add-question"
          className={
            location.pathname === "/add-question"
              ? "btn btn-info"
              : "btn btn-outline-light"
          }
          aria-current={
            location.pathname === "/add-question" ? "page" : undefined
          }
        >
          Add
        </Link>

        <Link
          to="/quiz"
          className={
            location.pathname === "/quiz"
              ? "btn btn-dark"
              : "btn btn-outline-light"
          }
          aria-current={location.pathname === "/quiz" ? "page" : undefined}
        >
          Quiz
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;