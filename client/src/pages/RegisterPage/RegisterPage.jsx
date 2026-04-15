import PropTypes from "prop-types";
import { useState } from "react";
import { registerUser } from "../../services/authApi";
import styles from "./RegisterPage.module.css";

function RegisterPage({ onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
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
    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      await registerUser(formData);
      setSuccessMessage("Registration successful. You can now log in.");
      setFormData({
        name: "",
        username: "",
        password: "",
      });
    } catch (error) {
      setErrorMessage(error.message || "Registration failed");
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
              <h1 className={styles.title}>Create Account</h1>
              <p className={styles.subtitle}>
                Register a new account to use EasyPass DMV Practice Tracker.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="register-username" className="form-label">
                    Username
                  </label>
                  <input
                    id="register-username"
                    type="text"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="register-password" className="form-label">
                    Password
                  </label>
                  <input
                    id="register-password"
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
                  {loading ? "Registering..." : "Register"}
                </button>
              </form>

              {successMessage && (
                <div className="alert alert-success mt-3 mb-0">
                  {successMessage}
                </div>
              )}

              {errorMessage && (
                <div className="alert alert-danger mt-3 mb-0">
                  {errorMessage}
                </div>
              )}

              <div className={styles.switchBox}>
                Already have an account?{" "}
                <button
                  type="button"
                  className="btn btn-link p-0"
                  onClick={onSwitchToLogin}
                >
                  Go to Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

RegisterPage.propTypes = {
  onSwitchToLogin: PropTypes.func.isRequired,
};

export default RegisterPage;
