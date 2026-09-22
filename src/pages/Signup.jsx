import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUser,
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
  faArrowRight,
  faCircleCheck,
  faShieldHalved,
  faTriangleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import { useAuth } from "../context/AuthContext.jsx";
import "../styles/Signup.css";

function Signup() {
  const navigate = useNavigate();

  // Authentication
  const { signup } = useAuth();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /* =========================================
     PASSWORD STRENGTH
  ========================================= */

  const getPasswordStrength = () => {
    if (!password) {
      return {
        score: 0,
        label: "",
      };
    }

    let score = 0;

    if (password.length >= 8) {
      score++;
    }

    if (/[A-Z]/.test(password)) {
      score++;
    }

    if (/[a-z]/.test(password)) {
      score++;
    }

    if (/[0-9]/.test(password)) {
      score++;
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
    }

    if (score <= 2) {
      return {
        score,
        label: "Weak",
      };
    }

    if (score <= 4) {
      return {
        score,
        label: "Medium",
      };
    }

    return {
      score,
      label: "Strong",
    };
  };

  const passwordStrength = getPasswordStrength();

  /* =========================================
     VALIDATION
  ========================================= */

  const validateForm = () => {
    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      return "Please enter your full name.";
    }

    if (cleanName.length < 3) {
      return "Full name must contain at least 3 characters.";
    }

    if (!cleanEmail) {
      return "Please enter your email address.";
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return "Please enter a valid email address.";
    }

    if (!password) {
      return "Please create a password.";
    }

    if (password.length < 8) {
      return "Password must contain at least 8 characters.";
    }

    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }

    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      return "Password must contain at least one special character.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    if (!agreeTerms) {
      return "Please accept the Terms & Conditions to continue.";
    }

    return "";
  };

  /* =========================================
     CREATE ACCOUNT
  ========================================= */

  const handleSignup = (e) => {
    e.preventDefault();

    setError("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    const cleanName = fullName.trim();
    const cleanEmail = email.trim().toLowerCase();

    setIsLoading(true);

    // Create account through AuthContext
    setTimeout(() => {
      const result = signup({
        fullName: cleanName,
        email: cleanEmail,
        password,
      });

      if (!result.success) {
        setError(result.message);
        setIsLoading(false);
        return;
      }

      // Account created successfully
      navigate("/admin/dashboard");

      setIsLoading(false);
    }, 600);
  };

  /* =========================================
     GOOGLE SIGNUP
  ========================================= */

  const handleGoogleSignup = () => {
    setError("");

    alert(
      "Google authentication will be connected when the backend is implemented."
    );
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
    <div className="signup-page">
      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div className="signup-bg-shape signup-shape-one"></div>

      <div className="signup-bg-shape signup-shape-two"></div>

      <div className="signup-grid"></div>

      {/* =========================================
          MAIN CONTAINER
      ========================================= */}

      <div className="signup-container">
        {/* =========================================
            LEFT INTRO
        ========================================= */}

        <div className="signup-intro">
          {/* BRAND */}

          <div className="signup-brand">
            <div className="signup-brand-icon">
              J
            </div>

            <div>
              <h2>Jobs Match Traits</h2>

              <span>
                Smart Hiring • Better Teams
              </span>
            </div>
          </div>

          {/* INTRO CONTENT */}

          <div className="signup-intro-content">
            <span className="signup-badge">
              <span>✦</span>
              Build better teams
            </span>

            <h1>
              Start hiring
              <span>smarter today.</span>
            </h1>

            <p>
              Create your account and start building
              smarter assessments that help you
              understand candidates beyond their
              technical skills.
            </p>

            {/* BENEFITS */}

            <div className="signup-benefits">
              <div className="signup-benefit">
                <div className="benefit-icon">
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                  />
                </div>

                <div>
                  <h4>
                    Trait-Based Assessments
                  </h4>

                  <p>
                    Evaluate the qualities that matter
                    for every role.
                  </p>
                </div>
              </div>

              <div className="signup-benefit">
                <div className="benefit-icon">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                  />
                </div>

                <div>
                  <h4>
                    Secure Hiring Workflow
                  </h4>

                  <p>
                    Keep candidate information organized
                    and protected.
                  </p>
                </div>
              </div>

              <div className="signup-benefit">
                <div className="benefit-icon">
                  <FontAwesomeIcon icon={faUser} />
                </div>

                <div>
                  <h4>
                    Candidate Insights
                  </h4>

                  <p>
                    Make better hiring decisions using
                    meaningful candidate data.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}

          <div className="signup-footer">
            © 2026 Jobs Match Traits
          </div>
        </div>

        {/* =========================================
            RIGHT FORM
        ========================================= */}

        <div className="signup-form-section">
          <div className="signup-card">
            {/* MOBILE BRAND */}

            <div className="signup-mobile-brand">
              <div className="signup-brand-icon">
                J
              </div>

              <span>
                Jobs Match Traits
              </span>
            </div>

            {/* FORM HEADER */}

            <div className="signup-header">
              <span className="signup-form-label">
                GET STARTED
              </span>

              <h2>
                Create your account
              </h2>

              <p>
                Set up your account to start managing
                smarter hiring assessments.
              </p>
            </div>

            {/* ERROR */}

            {error && (
              <div className="signup-error">
                <div className="signup-error-icon">
                  <FontAwesomeIcon
                    icon={faTriangleExclamation}
                  />
                </div>

                <p>{error}</p>

                <button
                  type="button"
                  className="signup-error-close"
                  onClick={clearError}
                  aria-label="Close error"
                >
                  <FontAwesomeIcon icon={faXmark} />
                </button>
              </div>
            )}

            {/* =========================================
                FORM
            ========================================= */}

            <form onSubmit={handleSignup}>
              {/* FULL NAME */}

              <div className="signup-input-group">
                <label htmlFor="fullName">
                  Full Name
                </label>

                <div className="signup-input-wrapper">
                  <span className="signup-input-icon">
                    <FontAwesomeIcon icon={faUser} />
                  </span>

                  <input
                    id="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      clearError();
                    }}
                    autoComplete="name"
                    disabled={isLoading}
                  />
                </div>
              </div>

              {/* EMAIL */}

              <div className="signup-input-group">
                <label htmlFor="signupEmail">
                  Email Address
                </label>

                <div className="signup-input-wrapper">
                  <span className="signup-input-icon">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                    />
                  </span>

                  <input
                    id="signupEmail"
                    type="email"
                    placeholder="you@company.com"
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

              <div className="signup-input-group">
                <label htmlFor="signupPassword">
                  Password
                </label>

                <div className="signup-input-wrapper">
                  <span className="signup-input-icon">
                    <FontAwesomeIcon icon={faLock} />
                  </span>

                  <input
                    id="signupPassword"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearError();
                    }}
                    autoComplete="new-password"
                    disabled={isLoading}
                  />

                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
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

                {/* PASSWORD STRENGTH */}

                {password && (
                  <div className="password-strength">
                    <div className="strength-top">
                      <span>
                        Password strength
                      </span>

                      <strong
                        className={`strength-${passwordStrength.label.toLowerCase()}`}
                      >
                        {passwordStrength.label}
                      </strong>
                    </div>

                    <div className="strength-bars">
                      {[1, 2, 3, 4, 5].map(
                        (bar) => (
                          <span
                            key={bar}
                            className={
                              bar <=
                              passwordStrength.score
                                ? `active strength-${passwordStrength.label.toLowerCase()}`
                                : ""
                            }
                          ></span>
                        )
                      )}
                    </div>

                    <p>
                      Use 8+ characters with uppercase,
                      numbers and special characters.
                    </p>
                  </div>
                )}
              </div>

              {/* CONFIRM PASSWORD */}

              <div className="signup-input-group">
                <label htmlFor="confirmPassword">
                  Confirm Password
                </label>

                <div className="signup-input-wrapper">
                  <span className="signup-input-icon">
                    <FontAwesomeIcon icon={faLock} />
                  </span>

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(
                        e.target.value
                      );
                      clearError();
                    }}
                    autoComplete="new-password"
                    disabled={isLoading}
                  />

                  <button
                    type="button"
                    className="signup-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    disabled={isLoading}
                    aria-label={
                      showConfirmPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    <FontAwesomeIcon
                      icon={
                        showConfirmPassword
                          ? faEyeSlash
                          : faEye
                      }
                    />
                  </button>
                </div>

                {/* PASSWORD MATCH */}

                {confirmPassword && (
                  <div
                    className={
                      password === confirmPassword
                        ? "password-match success"
                        : "password-match error"
                    }
                  >
                    <FontAwesomeIcon
                      icon={
                        password === confirmPassword
                          ? faCircleCheck
                          : faTriangleExclamation
                      }
                    />

                    <span>
                      {password === confirmPassword
                        ? "Passwords match"
                        : "Passwords do not match"}
                    </span>
                  </div>
                )}
              </div>

              {/* TERMS */}

              <label className="terms-checkbox">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(
                      e.target.checked
                    );
                    clearError();
                  }}
                  disabled={isLoading}
                />

                <span className="terms-box">
                  <span>✓</span>
                </span>

                <span className="terms-text">
                  I agree to the{" "}
                  <a
                    href="#terms"
                    onClick={(e) =>
                      e.preventDefault()
                    }
                  >
                    Terms & Conditions
                  </a>{" "}
                  and{" "}
                  <a
                    href="#privacy"
                    onClick={(e) =>
                      e.preventDefault()
                    }
                  >
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>

              {/* CREATE ACCOUNT */}

              <button
                type="submit"
                className="signup-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="signup-spinner"></span>

                    <span>
                      Creating account...
                    </span>
                  </>
                ) : (
                  <>
                    <span>
                      Create Account
                    </span>

                    <span className="signup-button-arrow">
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

            <div className="signup-divider">
              <span></span>

              <p>OR</p>

              <span></span>
            </div>

            {/* =========================================
                GOOGLE
            ========================================= */}

            <button
              type="button"
              className="signup-google-button"
              onClick={handleGoogleSignup}
              disabled={isLoading}
            >
              <span className="signup-google-icon">
                <FontAwesomeIcon icon={faGoogle} />
              </span>

              <span>
                Continue with Google
              </span>
            </button>

            {/* =========================================
                LOGIN
            ========================================= */}

            <div className="already-account">
              <span>
                Already have an account?
              </span>

              <Link to="/">
                Sign In
              </Link>
            </div>

            {/* SECURITY */}

            <div className="signup-security">
              <span>
                <FontAwesomeIcon
                  icon={faShieldHalved}
                />
              </span>

              <p>
                Your information is securely protected.
              </p>
            </div>

            {/* DEMO NOTE */}

            <div className="signup-demo-note">
              <span>Demo</span>

              <p>
                Account data is currently stored locally
                for frontend testing. Backend authentication
                will be connected later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;