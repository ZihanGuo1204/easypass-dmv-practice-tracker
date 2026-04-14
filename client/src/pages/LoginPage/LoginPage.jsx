import PropTypes from "prop-types";
import { useState } from "react";
import { loginUser } from "../../services/authApi";
import styles from "./LoginPage.module.css";

function LoginPage({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const result = await loginUser(formData);
      onLoginSuccess(result.user);
    } catch (error) {
      setErrorMessage(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`container ${styles.page}`}>
      <div className="row justify-content-center w-100">
        <div className="col-12 col-sm-10 col-md-8 col-lg-6">
          <div className={`card shadow-sm ${styles.card}`}>
            <div className="card-body p-4 p-md-5">
              <h1 className={styles.title}>EasyPass Login</h1>
              <p className={styles.subtitle}>
                Sign in to access your DMV practice dashboard, saved questions,
                and quiz history.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className="form-control"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </form>

              {errorMessage && (
                <div className="alert alert-danger mt-3 mb-0">
                  {errorMessage}
                </div>
              )}

              <div className={styles.demoInfo}>
                <strong>Demo Account</strong>
                <div>Username: demo</div>
                <div>Password: easypass123</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;