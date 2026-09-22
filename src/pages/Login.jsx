import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faArrowRight,
  faCircleCheck,
  faChartLine,
  faUsers,
  faShieldHalved,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../context/AuthContext.jsx";
import "../styles/Login.css";

function Login() {
  const navigate = useNavigate();

  // Authentication
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /* =========================================
     LOGIN
  ========================================= */

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const cleanEmail = email.trim().toLowerCase();

    // Basic validation
    if (!cleanEmail || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);

    // Small delay for a better UI experience
    setTimeout(() => {
      const result = login(cleanEmail, password);

      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
        return;
      }

      // Remember Me
      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      // Login successful
      navigate("/admin/dashboard");

      setIsLoading(false);
    }, 500);
  };

  /* =========================================
     GOOGLE LOGIN
  ========================================= */

  const handleGoogleLogin = () => {
    setError("");

    alert(
      "Google authentication will be connected when the backend is implemented."
    );
  };

  /* =========================================
     FORGOT PASSWORD
  ========================================= */

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  /* =========================================
     CLEAR ERROR
  ========================================= */

  const clearError = () => {
    if (error) {
      setError("");
    }
  };

  return (
    <div className="login-page">
      {/* =========================================
          BACKGROUND DECORATION
      ========================================= */}

      <div className="login-bg-shape shape-one"></div>
      <div className="login-bg-shape shape-two"></div>
      <div className="login-grid"></div>

      {/* =========================================
          MAIN CONTAINER
      ========================================= */}

      <div className="login-container">
        {/* =========================================
            LEFT INTRO SECTION
        ========================================= */}

        <div className="login-intro">
          {/* BRAND */}

          <div className="brand">
            <div className="brand-icon">J</div>

            <div>
              <h2>Jobs Match Traits</h2>

              <span>Smart Hiring • Better Teams</span>
            </div>
          </div>

          {/* INTRO CONTENT */}

          <div className="intro-content">
            <span className="welcome-badge">
              <span className="badge-star">✦</span>
              Intelligent Hiring Platform
            </span>

            <h1>
              Find the right people
              <span>for the right roles.</span>
            </h1>

            <p>
              Evaluate personality traits, behavioral
              strengths, and workplace compatibility to
              make smarter hiring decisions.
            </p>

            {/* FEATURES */}

            <div className="feature-list">
              {/* Feature 1 */}

              <div className="feature-item">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faChartLine} />
                </div>

                <div>
                  <h4>Personality Insights</h4>

                  <p>
                    Understand candidates beyond
                    technical skills.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}

              <div className="feature-item">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faCircleCheck} />
                </div>

                <div>
                  <h4>Smart Assessments</h4>

                  <p>
                    Create assessments based on
                    important job traits.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}

              <div className="feature-item">
                <div className="feature-icon">
                  <FontAwesomeIcon icon={faUsers} />
                </div>

                <div>
                  <h4>Data-Driven Hiring</h4>

                  <p>
                    Make better decisions using
                    candidate insights.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}

          <div className="login-footer">
            © 2026 Jobs Match Traits
          </div>
        </div>

        {/* =========================================
            RIGHT FORM SECTION
        ========================================= */}

        <div className="login-form-section">
          <div className="login-card">
            {/* MOBILE BRAND */}

            <div className="mobile-brand">
              <div className="brand-icon">J</div>

              <span>Jobs Match Traits</span>
            </div>

            {/* FORM HEADER */}

            <div className="form-header">
              <span className="form-label">WELCOME BACK</span>

              <h2>Sign in to your account</h2>

              <p>
                Enter your credentials to access
                your admin dashboard.
              </p>
            </div>

            {/* ERROR MESSAGE */}

            {error && (
              <div className="form-error">
                <div className="error-icon">
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                  />
                </div>

                <p>{error}</p>

                <button
                  type="button"
                  className="error-close"
                  onClick={clearError}
                  aria-label="Close error"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            )}

            {/* =========================================
                LOGIN FORM
            ========================================= */}

            <form onSubmit={handleLogin}>
              {/* EMAIL */}

              <div className="input-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <div className="input-wrapper">
                  <span className="input-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </span>

                  <input
                    id="email"
                    type="email"
                    placeholder="admin@jobsmatchtraits.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      clearError();
                    }}
                    autoComplete="email"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* PASSWORD */}

              <div className="input-group">
                <div className="password-label-row">
                  <label htmlFor="password">
                    Password
                  </label>

                  <button
                    type="button"
                    className="forgot-password"
                    onClick={handleForgotPassword}
                    disabled={isLoading}
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="input-wrapper">
                  <span className="input-icon">
                    <FontAwesomeIcon icon={faLock} />
                  </span>

                  <input
                    id="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearError();
                    }}
                    autoComplete="current-password"
                    disabled={isLoading}
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    disabled={isLoading}
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    <FontAwesomeIcon
                      icon={
                        showPassword
                          ? faEyeSlash
                          : faEye
                      }
                    />
                  </button>
                </div>
              </div>

              {/* REMEMBER ME */}

              <div className="form-options">
                <label className="remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    disabled={isLoading}
                  />

                  <span className="custom-checkbox">
                    <span className="check-mark">
                      ✓
                    </span>
                  </span>

                  <span>Remember me</span>
                </label>
              </div>

              {/* SIGN IN BUTTON */}

              <button
                type="submit"
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="button-spinner"></span>

                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>

                    <span className="button-arrow">
                      <FontAwesomeIcon
                        icon={faArrowRight}
                      />
                    </span>
                  </>
                )}
              </button>
            </form>

            {/* =========================================
                DIVIDER
            ========================================= */}

            <div className="auth-divider">
              <span></span>
              <p>OR</p>
              <span></span>
            </div>

            {/* =========================================
                GOOGLE LOGIN
            ========================================= */}

            <button
              type="button"
              className="google-button"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <span className="google-icon">
                <FontAwesomeIcon icon={faGoogle} />
              </span>

              <span>Continue with Google</span>
            </button>

            {/* =========================================
                CREATE ACCOUNT
            ========================================= */}

            <div className="switch-account">
              <span>Don't have an account?</span>

              <Link to="/signup">
                Create Account
              </Link>
            </div>

            {/* =========================================
                SECURITY NOTE
            ========================================= */}

            <div className="security-note">
              <span className="security-icon">
                <FontAwesomeIcon icon={faShieldHalved} />
              </span>

              <p>
                Your information is securely protected.
              </p>
            </div>

            {/* DEMO NOTE */}

            <div className="demo-note">
              <span>Demo</span>

              <p>
                Accounts are currently stored locally
                for frontend testing. Backend
                authentication will be connected later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;