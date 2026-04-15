import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({ user, onLogout }) {
  const location = useLocation();

  function getNavButtonClass(pathname, dark = false) {
    if (location.pathname === pathname) {
      return dark ? "btn btn-dark" : "btn btn-light";
    }
    return "btn btn-outline-light";
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary px-4"
      aria-label="Main navigation"
    >
      <div className="d-flex flex-column">
        <span className="navbar-brand">EasyPass DMV Practice Tracker</span>
        <span className="text-white small">Signed in as: {user.name}</span>
      </div>

      <div className="ms-auto d-flex gap-2 flex-wrap">
        <Link
          to="/"
          className={getNavButtonClass("/")}
          aria-current={location.pathname === "/" ? "page" : undefined}
        >
          Saved
        </Link>

        <Link
          to="/mistakes"
          className={getNavButtonClass("/mistakes")}
          aria-current={location.pathname === "/mistakes" ? "page" : undefined}
        >
          Mistakes
        </Link>

        <Link
          to="/favorites"
          className={getNavButtonClass("/favorites")}
          aria-current={location.pathname === "/favorites" ? "page" : undefined}
        >
          Favorites
        </Link>

        <Link
          to="/history"
          className={getNavButtonClass("/history")}
          aria-current={location.pathname === "/history" ? "page" : undefined}
        >
          History
        </Link>

        <Link
          to="/questions"
          className={getNavButtonClass("/questions")}
          aria-current={location.pathname === "/questions" ? "page" : undefined}
        >
          Browse
        </Link>

        <Link
          to="/add-question"
          className={getNavButtonClass("/add-question")}
          aria-current={
            location.pathname === "/add-question" ? "page" : undefined
          }
        >
          Add
        </Link>

        <Link
          to="/quiz"
          className={getNavButtonClass("/quiz", true)}
          aria-current={location.pathname === "/quiz" ? "page" : undefined}
        >
          Quiz
        </Link>

        <button
          type="button"
          className="btn btn-outline-light"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
