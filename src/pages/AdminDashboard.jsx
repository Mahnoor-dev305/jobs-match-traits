import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHouse,
  faFileLines,
  faUsers,
  faSquarePollHorizontal,
  faGear,
  faRightFromBracket,
  faMagnifyingGlass,
  faBell,
  faChevronDown,
  faClipboardCheck,
  faUserGroup,
  faCircleCheck,
  faPlus,
  faUserTie,
  faBookOpen,
  faTriangleExclamation,
  faCircleInfo,
  faBriefcase,
  faCode,
  faPalette,
  faChartLine,
  faUser,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);

  // ================================
  // USER INFORMATION
  // ================================

  const userName = user?.fullName || "Admin";

  const userEmail = user?.email || "";

  const profileImage = user?.profileImage || null;

  const userInitial = userName.charAt(0).toUpperCase();


  // ================================
  // LOGOUT
  // ================================

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/", { replace: true });
  };


  // ================================
  // PROFILE DROPDOWN
  // ================================

  const handleEditProfile = () => {
    setProfileOpen(false);
    navigate("/admin/profile");
  };


  return (
    <div className="dashboard">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <div className="logo">

          <div className="logo-icon">
            J
          </div>

          <div>
            <h2>Jobs Match Traits</h2>

            <span>
              Better People. Stronger Teams.
            </span>
          </div>

        </div>


        <nav className="sidebar-nav">

          <Link
            to="/admin/dashboard"
            className="nav-link active"
          >
            <FontAwesomeIcon icon={faHouse} />
            Dashboard
          </Link>


          <Link
            to="/admin/assessments"
            className="nav-link"
          >
            <FontAwesomeIcon icon={faFileLines} />
            Assessments
          </Link>


          <Link
            to="/admin/candidates"
            className="nav-link"
          >
            <FontAwesomeIcon icon={faUsers} />
            Candidates
          </Link>


          <Link
            to="/admin/results"
            className="nav-link"
          >
            <FontAwesomeIcon
              icon={faSquarePollHorizontal}
            />
            Results
          </Link>


          <Link
            to="/admin/traits"
            className="nav-link"
          >
            <FontAwesomeIcon icon={faChartLine} />
            Trait Management
          </Link>


          <Link
            to="/admin/question-bank"
            className="nav-link"
          >
            <FontAwesomeIcon icon={faBookOpen} />
            Question Bank
          </Link>

        </nav>


        <div className="sidebar-bottom">

          <Link
            to="/admin/settings"
            className="nav-link"
          >
            <FontAwesomeIcon icon={faGear} />
            Settings
          </Link>


          <button
            type="button"
            className="nav-link logout"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faRightFromBracket} />
            Logout
          </button>

        </div>

      </aside>


      {/* ================= MAIN ================= */}

      <main className="main-content">

        {/* ================= TOPBAR ================= */}

        <header className="topbar">

          <div className="search-box">

            <FontAwesomeIcon
              icon={faMagnifyingGlass}
            />

            <input
              type="text"
              placeholder="Search..."
            />

          </div>


          <div className="topbar-right">

            {/* Notification */}

            <button
              type="button"
              className="notification-btn"
            >
              <FontAwesomeIcon icon={faBell} />
              <span></span>
            </button>


            {/* ================= PROFILE ================= */}

            <div className="profile-wrapper">

              <button
                type="button"
                className="admin-profile"
                onClick={() =>
                  setProfileOpen((prev) => !prev)
                }
              >

                <div className="avatar">

                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt={userName}
                    />
                  ) : (
                    userInitial
                  )}

                </div>


                <div className="profile-details">

                  <strong>
                    {userName}
                  </strong>

                  <small>
                    Hiring Manager
                  </small>

                </div>


                <span className="profile-arrow">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                  />
                </span>

              </button>


              {/* ================= PROFILE DROPDOWN ================= */}

              {profileOpen && (

                <div className="profile-dropdown">

                  <div className="dropdown-user">

                    <div className="dropdown-avatar">

                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt={userName}
                        />
                      ) : (
                        userInitial
                      )}

                    </div>


                    <div>

                      <strong>
                        {userName}
                      </strong>

                      <span>
                        {userEmail}
                      </span>

                    </div>

                  </div>


                  <div className="dropdown-divider"></div>


                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={handleEditProfile}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                    />

                    <span>
                      My Profile
                    </span>
                  </button>


                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={handleEditProfile}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                    />

                    <span>
                      Edit Profile
                    </span>
                  </button>


                  <div className="dropdown-divider"></div>


                  <button
                    type="button"
                    className="dropdown-item dropdown-logout"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon
                      icon={faRightFromBracket}
                    />

                    <span>
                      Logout
                    </span>
                  </button>

                </div>

              )}

            </div>

          </div>

        </header>


        {/* ================= PAGE HEADER ================= */}

        <section className="welcome-section">

          <div>

            <h1>
              Welcome back, {userName} 👋
            </h1>

            <p>
              Here's what's happening with your
              assessments.
            </p>

          </div>


          <Link
            to="/admin/create-assessment"
            className="primary-action"
          >
            <FontAwesomeIcon icon={faPlus} />
            Create Assessment
          </Link>

        </section>


        {/* ================= STATS ================= */}

        <section className="stats-grid">

          <div className="stat-card">

            <div className="stat-top">

              <span>
                Total Assessments
              </span>

              <div className="stat-icon purple">
                <FontAwesomeIcon
                  icon={faClipboardCheck}
                />
              </div>

            </div>

            <h2>
              24
            </h2>

            <p className="positive">
              ↑ 4 this month
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-top">

              <span>
                Total Candidates
              </span>

              <div className="stat-icon blue">
                <FontAwesomeIcon
                  icon={faUserGroup}
                />
              </div>

            </div>

            <h2>
              156
            </h2>

            <p className="positive">
              ↑ 18 this month
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-top">

              <span>
                Completed
              </span>

              <div className="stat-icon green">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                />
              </div>

            </div>

            <h2>
              121
            </h2>

            <p className="positive">
              ↑ 12% this month
            </p>

          </div>


          <div className="stat-card">

            <div className="stat-top">

              <span>
                Pending
              </span>

              <div className="stat-icon orange">
                ◷
              </div>

            </div>

            <h2>
              35
            </h2>

            <p className="negative">
              ↓ 5% this month
            </p>

          </div>

        </section>


        {/* ================= DASHBOARD GRID ================= */}

        <section className="dashboard-grid">

          {/* CANDIDATE PROGRESS */}

          <div className="panel progress-panel">

            <div className="panel-header">

              <div>

                <h2>
                  Candidate Progress
                </h2>

                <p>
                  Assessment pipeline
                </p>

              </div>


              <select>

                <option>
                  This Month
                </option>

                <option>
                  This Week
                </option>

                <option>
                  This Year
                </option>

              </select>

            </div>


            <div className="progress-chart">

              <div className="chart-item">

                <span>
                  Applied
                </span>

                <div className="chart-bar">

                  <div
                    className="bar applied"
                    style={{ width: "100%" }}
                  >
                    156
                  </div>

                </div>

              </div>


              <div className="chart-item">

                <span>
                  Started
                </span>

                <div className="chart-bar">

                  <div
                    className="bar started"
                    style={{ width: "78%" }}
                  >
                    122
                  </div>

                </div>

              </div>


              <div className="chart-item">

                <span>
                  Completed
                </span>

                <div className="chart-bar">

                  <div
                    className="bar completed"
                    style={{ width: "62%" }}
                  >
                    98
                  </div>

                </div>

              </div>


              <div className="chart-item">

                <span>
                  Shortlisted
                </span>

                <div className="chart-bar">

                  <div
                    className="bar shortlisted"
                    style={{ width: "36%" }}
                  >
                    56
                  </div>

                </div>

              </div>


              <div className="chart-item">

                <span>
                  Hired
                </span>

                <div className="chart-bar">

                  <div
                    className="bar hired"
                    style={{ width: "18%" }}
                  >
                    28
                  </div>

                </div>

              </div>

            </div>

          </div>


          {/* RECENT ASSESSMENTS */}

          <div className="panel">

            <div className="panel-header">

              <div>

                <h2>
                  Recent Assessments
                </h2>

                <p>
                  Your latest assessments
                </p>

              </div>


              <Link to="/admin/assessments">
                View All
              </Link>

            </div>


            <div className="assessment-list">

              <div className="assessment-row">

                <div className="assessment-icon">
                  <FontAwesomeIcon icon={faCode} />
                </div>

                <div className="assessment-info">

                  <strong>
                    Software Engineer
                  </strong>

                  <span>
                    24 candidates • 2 days ago
                  </span>

                </div>

                <span className="status active">
                  Active
                </span>

              </div>


              <div className="assessment-row">

                <div className="assessment-icon">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                  />
                </div>

                <div className="assessment-info">

                  <strong>
                    Marketing Intern
                  </strong>

                  <span>
                    15 candidates • 3 days ago
                  </span>

                </div>

                <span className="status active">
                  Active
                </span>

              </div>


              <div className="assessment-row">

                <div className="assessment-icon">
                  <FontAwesomeIcon
                    icon={faPalette}
                  />
                </div>

                <div className="assessment-info">

                  <strong>
                    Product Designer
                  </strong>

                  <span>
                    32 candidates • 5 days ago
                  </span>

                </div>

                <span className="status closed">
                  Closed
                </span>

              </div>


              <div className="assessment-row">

                <div className="assessment-icon">
                  <FontAwesomeIcon icon={faCode} />
                </div>

                <div className="assessment-info">

                  <strong>
                    Backend Developer
                  </strong>

                  <span>
                    18 candidates • 6 days ago
                  </span>

                </div>

                <span className="status active">
                  Active
                </span>

              </div>

            </div>

          </div>

        </section>


        {/* ================= QUICK ACTIONS ================= */}

        <section className="panel quick-actions-panel">

          <div className="panel-header">

            <div>

              <h2>
                Quick Actions
              </h2>

              <p>
                Common tasks
              </p>

            </div>

          </div>


          <div className="quick-actions">

            <Link
              to="/admin/create-assessment"
              className="quick-action"
            >

              <div className="quick-icon">
                <FontAwesomeIcon icon={faPlus} />
              </div>

              <div>

                <strong>
                  Create Assessment
                </strong>

                <span>
                  Build a new behavioral assessment
                </span>

              </div>

            </Link>


            <Link
              to="/admin/candidates"
              className="quick-action"
            >

              <div className="quick-icon">
                <FontAwesomeIcon icon={faUserTie} />
              </div>

              <div>

                <strong>
                  View Candidates
                </strong>

                <span>
                  Review candidate performance
                </span>

              </div>

            </Link>


            <Link
              to="/admin/question-bank"
              className="quick-action"
            >

              <div className="quick-icon">
                <FontAwesomeIcon icon={faBookOpen} />
              </div>

              <div>

                <strong>
                  Question Bank
                </strong>

                <span>
                  Manage assessment questions
                </span>

              </div>

            </Link>

          </div>

        </section>


        {/* ================= RECENT ACTIVITY ================= */}

        <section className="panel activity-panel">

          <div className="panel-header">

            <div>

              <h2>
                Recent Activity
              </h2>

              <p>
                Latest system activity
              </p>

            </div>

            <Link to="/admin/reports">
              View Reports
            </Link>

          </div>


          <div className="activity-list">

            <div className="activity-item">

              <div className="activity-icon success">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                />
              </div>

              <div>

                <strong>
                  Ali completed Frontend Developer Assessment
                </strong>

                <span>
                  5 minutes ago
                </span>

              </div>

            </div>


            <div className="activity-item">

              <div className="activity-icon warning">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                />
              </div>

              <div>

                <strong>
                  Suspicious activity detected
                </strong>

                <span>
                  Candidate Sara • 18 minutes ago
                </span>

              </div>

            </div>


            <div className="activity-item">

              <div className="activity-icon info">
                <FontAwesomeIcon
                  icon={faCircleInfo}
                />
              </div>

              <div>

                <strong>
                  New assessment created
                </strong>

                <span>
                  Graduate Trainee Assessment • 1 hour ago
                </span>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;