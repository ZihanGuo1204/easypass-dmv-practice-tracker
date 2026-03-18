import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <span className="navbar-brand">EasyPass DMV Practice Tracker</span>

      <div className="ms-auto d-flex gap-2">
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "btn btn-light"
              : "btn btn-outline-light"
          }
        >
          Saved Questions
        </Link>

        <Link
          to="/mistakes"
          className={
            location.pathname === "/mistakes"
              ? "btn btn-warning"
              : "btn btn-outline-light"
          }
        >
          Mistake Notebook
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;