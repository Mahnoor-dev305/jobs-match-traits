import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  faChartLine,
  faBookOpen,
  faUser,
  faPenToSquare,
  faUsersViewfinder,
  faCircleCheck,
  faStar,
  faTriangleExclamation,
  faDownload,
  faEye,
  faTrash,
  faXmark,
  faArrowUpRightFromSquare,
  faPaste,
  faRobot,
  faShieldHalved,
  faClock,
  faChartColumn,
  faRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../context/AuthContext.jsx";

import "../styles/AdminDashboard.css";
import "../styles/Results.css";

const initialResults = [
  {
    id: 1,
    candidate: "Ayesha Khan",
    email: "ayesha.khan@gmail.com",
    role: "Frontend Developer",
    assessment: "Frontend Developer Assessment",
    score: 87,
    integrity: 96,
    status: "Completed",
    aiRisk: "Low",
    tabSwitches: 1,
    copyPaste: 0,
    completedAt: "12 Sep 2026",
    timeSpent: "24 min 18 sec",
    timeLimit: "30 minutes",
    totalQuestions: 30,
    answeredQuestions: 30,
    responseConsistency: 94,
    traits: {
      Leadership: 84,
      Communication: 92,
      Teamwork: 89,
      "Problem Solving": 91,
      Adaptability: 86,
      Creativity: 88,
      "Time Management": 83,
      "Decision Making": 90,
    },
  },
  {
    id: 2,
    candidate: "Hamza Ali",
    email: "hamza.ali@gmail.com",
    role: "Software Engineer",
    assessment: "Software Engineer Assessment",
    score: 79,
    integrity: 88,
    status: "Completed",
    aiRisk: "Medium",
    tabSwitches: 3,
    copyPaste: 1,
    completedAt: "11 Sep 2026",
    timeSpent: "27 min 42 sec",
    timeLimit: "30 minutes",
    totalQuestions: 30,
    answeredQuestions: 30,
    responseConsistency: 82,
    traits: {
      Leadership: 76,
      Communication: 81,
      Teamwork: 85,
      "Problem Solving": 88,
      Adaptability: 78,
      Creativity: 74,
      "Time Management": 80,
      "Decision Making": 82,
    },
  },
  {
    id: 3,
    candidate: "Sara Ahmed",
    email: "sara.ahmed@gmail.com",
    role: "UI/UX Designer",
    assessment: "Creative & Design Assessment",
    score: 92,
    integrity: 99,
    status: "Completed",
    aiRisk: "Low",
    tabSwitches: 0,
    copyPaste: 0,
    completedAt: "10 Sep 2026",
    timeSpent: "21 min 35 sec",
    timeLimit: "30 minutes",
    totalQuestions: 25,
    answeredQuestions: 25,
    responseConsistency: 97,
    traits: {
      Leadership: 88,
      Communication: 95,
      Teamwork: 91,
      "Problem Solving": 94,
      Adaptability: 90,
      Creativity: 98,
      "Time Management": 89,
      "Decision Making": 93,
    },
  },
  {
    id: 4,
    candidate: "Usman Tariq",
    email: "usman.tariq@gmail.com",
    role: "Backend Developer",
    assessment: "Backend Developer Assessment",
    score: 68,
    integrity: 72,
    status: "Flagged",
    aiRisk: "High",
    tabSwitches: 8,
    copyPaste: 4,
    completedAt: "09 Sep 2026",
    timeSpent: "29 min 51 sec",
    timeLimit: "30 minutes",
    totalQuestions: 28,
    answeredQuestions: 28,
    responseConsistency: 61,
    traits: {
      Leadership: 65,
      Communication: 70,
      Teamwork: 72,
      "Problem Solving": 81,
      Adaptability: 67,
      Creativity: 62,
      "Time Management": 58,
      "Decision Making": 74,
    },
  },
  {
    id: 5,
    candidate: "Maham Raza",
    email: "maham.raza@gmail.com",
    role: "Product Manager",
    assessment: "Product Manager Assessment",
    score: 89,
    integrity: 94,
    status: "Completed",
    aiRisk: "Low",
    tabSwitches: 1,
    copyPaste: 0,
    completedAt: "08 Sep 2026",
    timeSpent: "26 min 09 sec",
    timeLimit: "30 minutes",
    totalQuestions: 25,
    answeredQuestions: 25,
    responseConsistency: 91,
    traits: {
      Leadership: 94,
      Communication: 96,
      Teamwork: 91,
      "Problem Solving": 89,
      Adaptability: 92,
      Creativity: 87,
      "Time Management": 90,
      "Decision Making": 95,
    },
  },
  {
    id: 6,
    candidate: "Bilal Hassan",
    email: "bilal.hassan@gmail.com",
    role: "Software Engineer",
    assessment: "Software Engineer Assessment",
    score: 74,
    integrity: 91,
    status: "Completed",
    aiRisk: "Low",
    tabSwitches: 2,
    copyPaste: 0,
    completedAt: "07 Sep 2026",
    timeSpent: "25 min 27 sec",
    timeLimit: "30 minutes",
    totalQuestions: 30,
    answeredQuestions: 30,
    responseConsistency: 86,
    traits: {
      Leadership: 72,
      Communication: 76,
      Teamwork: 83,
      "Problem Solving": 86,
      Adaptability: 73,
      Creativity: 70,
      "Time Management": 78,
      "Decision Making": 80,
    },
  },
];

const traitDescriptions = {
  Leadership:
    "Ability to take initiative, responsibility and guide others.",
  Communication:
    "Clarity, confidence and active listening in professional situations.",
  Teamwork:
    "Ability to collaborate, cooperate and handle conflicts.",
  "Problem Solving":
    "Analytical thinking and ability to solve difficult situations.",
  Adaptability:
    "Ability to adjust to change and learn new things.",
  Creativity:
    "Ability to generate innovative and original ideas.",
  "Time Management":
    "Ability to plan, prioritize and organize work.",
  "Decision Making":
    "Judgment, risk assessment and decision quality.",
};

function getScoreClass(score) {
  if (score >= 80) return "score-high";
  if (score >= 60) return "score-medium";
  return "score-low";
}

function getInitials(name) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getRiskClass(risk) {
  return `ai-${risk.toLowerCase()}`;
}

function Results() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [results, setResults] = useState(initialResults);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [scoreFilter, setScoreFilter] = useState("All");

  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);

  const [profileOpen, setProfileOpen] = useState(false);

  const userName = user?.fullName || "Admin";
  const userEmail = user?.email || "";
  const profileImage = user?.profileImage || null;
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/", { replace: true });
  };

  const handleEditProfile = () => {
    setProfileOpen(false);
    navigate("/admin/profile");
  };

  const filteredResults = useMemo(() => {
    return results.filter((candidate) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        candidate.candidate.toLowerCase().includes(searchValue) ||
        candidate.email.toLowerCase().includes(searchValue) ||
        candidate.role.toLowerCase().includes(searchValue) ||
        candidate.assessment.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        candidate.status === statusFilter;

      let matchesScore = true;

      if (scoreFilter === "High") {
        matchesScore = candidate.score >= 80;
      }

      if (scoreFilter === "Medium") {
        matchesScore =
          candidate.score >= 60 && candidate.score < 80;
      }

      if (scoreFilter === "Low") {
        matchesScore = candidate.score < 60;
      }

      return matchesSearch && matchesStatus && matchesScore;
    });
  }, [results, search, statusFilter, scoreFilter]);

  const totalCandidates = results.length;

  const completedCandidates = results.filter(
    (candidate) => candidate.status === "Completed"
  ).length;

  const flaggedCandidates = results.filter(
    (candidate) => candidate.status === "Flagged"
  ).length;

  const averageScore =
    results.length > 0
      ? Math.round(
          results.reduce(
            (total, candidate) => total + candidate.score,
            0
          ) / results.length
        )
      : 0;

  const deleteCandidate = () => {
    if (!candidateToDelete) return;

    setResults((current) =>
      current.filter(
        (candidate) => candidate.id !== candidateToDelete.id
      )
    );

    setCandidateToDelete(null);
    setShowDeleteModal(false);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setScoreFilter("All");
  };

  const exportResults = () => {
    const headers = [
      "Candidate",
      "Email",
      "Role",
      "Assessment",
      "Score",
      "Integrity",
      "AI Risk",
      "Tab Switches",
      "Copy/Paste",
      "Response Consistency",
      "Time Spent",
      "Completed At",
    ];

    const rows = filteredResults.map((candidate) => [
      candidate.candidate,
      candidate.email,
      candidate.role,
      candidate.assessment,
      candidate.score,
      candidate.integrity,
      candidate.aiRisk,
      candidate.tabSwitches,
      candidate.copyPaste,
      candidate.responseConsistency,
      candidate.timeSpent,
      candidate.completedAt,
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((row) =>
        row
          .map((value) =>
            `"${String(value).replace(/"/g, '""')}"`
          )
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "jobs-match-traits-results.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="dashboard">

      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">J</div>

          <div>
            <h2>Jobs Match Traits</h2>
            <span>Better People. Stronger Teams.</span>
          </div>
        </div>

        <nav className="sidebar-nav">

          <Link
            to="/admin/dashboard"
            className="nav-link"
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
            className="nav-link active"
          >
            <FontAwesomeIcon icon={faSquarePollHorizontal} />
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

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="main-content">

        {/* TOPBAR */}

        <header className="topbar">

          <div className="search-box">

            <FontAwesomeIcon icon={faMagnifyingGlass} />

            <input
              type="text"
              placeholder="Search..."
            />

          </div>

          <div className="topbar-right">

            <button
              type="button"
              className="notification-btn"
            >
              <FontAwesomeIcon icon={faBell} />
              <span></span>
            </button>

            <div className="profile-wrapper">

              <button
                type="button"
                className="admin-profile"
                onClick={() =>
                  setProfileOpen((previous) => !previous)
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
                  <strong>{userName}</strong>
                  <small>Hiring Manager</small>
                </div>

                <span className="profile-arrow">
                  <FontAwesomeIcon icon={faChevronDown} />
                </span>

              </button>

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
                      <strong>{userName}</strong>
                      <span>{userEmail}</span>
                    </div>

                  </div>

                  <div className="dropdown-divider"></div>

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={handleEditProfile}
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span>My Profile</span>
                  </button>

                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={handleEditProfile}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    <span>Edit Profile</span>
                  </button>

                  <div className="dropdown-divider"></div>

                  <button
                    type="button"
                    className="dropdown-item dropdown-logout"
                    onClick={handleLogout}
                  >
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <span>Logout</span>
                  </button>

                </div>
              )}

            </div>

          </div>

        </header>

        {/* =====================================================
            RESULTS CONTENT
        ====================================================== */}

        <div className="results-content">

          {/* PAGE HEADER */}

          <div className="results-header">

            <div>

              <div className="results-breadcrumb">

                <Link to="/admin/dashboard">
                  Dashboard
                </Link>

                <span>/</span>

                <span>Results</span>

              </div>

              <h1>Assessment Results</h1>

              <p>
                Review candidate performance, personality traits
                and integrity signals.
              </p>

            </div>

            <button
              className="export-btn"
              onClick={exportResults}
            >
              <FontAwesomeIcon icon={faDownload} />
              Export Results
            </button>

          </div>

          {/* =================================================
              STATISTICS
          ================================================== */}

          <div className="results-stats">

            <div className="result-stat-card">

              <div className="stat-icon purple">
                <FontAwesomeIcon icon={faUsersViewfinder} />
              </div>

              <div>
                <span>Total Candidates</span>
                <strong>{totalCandidates}</strong>
              </div>

            </div>

            <div className="result-stat-card">

              <div className="stat-icon green">
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>

              <div>
                <span>Completed</span>
                <strong>{completedCandidates}</strong>
              </div>

            </div>

            <div className="result-stat-card">

              <div className="stat-icon blue">
                <FontAwesomeIcon icon={faStar} />
              </div>

              <div>
                <span>Average Score</span>
                <strong>{averageScore}%</strong>
              </div>

            </div>

            <div className="result-stat-card">

              <div className="stat-icon red">
                <FontAwesomeIcon icon={faTriangleExclamation} />
              </div>

              <div>
                <span>Flagged</span>
                <strong>{flaggedCandidates}</strong>
              </div>

            </div>

          </div>

          {/* =================================================
              TOOLBAR
          ================================================== */}

          <div className="results-toolbar">

            <div className="results-search-box">

              <FontAwesomeIcon icon={faMagnifyingGlass} />

              <input
                type="text"
                placeholder="Search candidate, email, role..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

            </div>

            <div className="filter-group">

              <select
                value={statusFilter}
                onChange={(event) =>
                  setStatusFilter(event.target.value)
                }
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Flagged">Flagged</option>
              </select>

              <select
                value={scoreFilter}
                onChange={(event) =>
                  setScoreFilter(event.target.value)
                }
              >
                <option value="All">All Scores</option>
                <option value="High">
                  High Score 80%+
                </option>
                <option value="Medium">
                  Medium Score
                </option>
                <option value="Low">
                  Low Score
                </option>
              </select>

              <button
                type="button"
                className="results-reset-btn"
                onClick={resetFilters}
              >
                <FontAwesomeIcon icon={faRotateLeft} />
                Reset
              </button>

            </div>

          </div>

          {/* =================================================
              RESULTS TABLE
          ================================================== */}

          <div className="results-card">

            <div className="results-card-header">

              <div>
                <h2>Candidate Results</h2>

                <p>
                  {filteredResults.length} candidate
                  {filteredResults.length !== 1
                    ? "s"
                    : ""}{" "}
                  found
                </p>
              </div>

              <div className="results-header-info">
                <FontAwesomeIcon icon={faChartColumn} />
                Performance Overview
              </div>

            </div>

            {filteredResults.length === 0 ? (

              <div className="empty-results">

                <div className="empty-icon">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>

                <h3>No results found</h3>

                <p>
                  Try changing your search or filter settings.
                </p>

                <button onClick={resetFilters}>
                  Clear Filters
                </button>

              </div>

            ) : (

              <div className="table-wrapper">

                <table className="results-table">

                  <thead>

                    <tr>
                      <th>Candidate</th>
                      <th>Role</th>
                      <th>Score</th>
                      <th>Integrity</th>
                      <th>AI Risk</th>
                      <th>Activity</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>

                  </thead>

                  <tbody>

                    {filteredResults.map((candidate) => (

                      <tr key={candidate.id}>

                        <td>

                          <div className="candidate-cell">

                            <div className="candidate-avatar">
                              {getInitials(
                                candidate.candidate
                              )}
                            </div>

                            <div>
                              <strong>
                                {candidate.candidate}
                              </strong>

                              <small>
                                {candidate.email}
                              </small>
                            </div>

                          </div>

                        </td>

                        <td>

                          <div className="role-cell">

                            <strong>
                              {candidate.role}
                            </strong>

                            <small>
                              {candidate.completedAt}
                            </small>

                          </div>

                        </td>

                        <td>

                          <div
                            className={`table-score ${getScoreClass(
                              candidate.score
                            )}`}
                          >
                            {candidate.score}%
                          </div>

                        </td>

                        <td>

                          <div className="integrity-cell">

                            <div className="integrity-number">
                              {candidate.integrity}%
                            </div>

                            <div className="progress-bar">

                              <span
                                style={{
                                  width: `${candidate.integrity}%`,
                                }}
                              />

                            </div>

                          </div>

                        </td>

                        <td>

                          <span
                            className={`ai-badge ${getRiskClass(
                              candidate.aiRisk
                            )}`}
                          >

                            <span className="ai-dot"></span>

                            {candidate.aiRisk}

                          </span>

                        </td>

                        <td>

                          <div className="activity-cell">

                            <span>
                              <FontAwesomeIcon
                                icon={
                                  faArrowUpRightFromSquare
                                }
                              />
                              {candidate.tabSwitches}
                            </span>

                            <span>
                              <FontAwesomeIcon
                                icon={faPaste}
                              />
                              {candidate.copyPaste}
                            </span>

                          </div>

                        </td>

                        <td>

                          <span
                            className={`status-badge status-${candidate.status.toLowerCase()}`}
                          >
                            <span></span>
                            {candidate.status}
                          </span>

                        </td>

                        <td>

                          <div className="action-buttons">

                            <button
                              className="view-btn"
                              onClick={() =>
                                setSelectedCandidate(
                                  candidate
                                )
                              }
                            >
                              <FontAwesomeIcon
                                icon={faEye}
                              />
                              View
                            </button>

                            <button
                              className="delete-btn"
                              onClick={() => {
                                setCandidateToDelete(
                                  candidate
                                );
                                setShowDeleteModal(true);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                              />
                              Delete
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>

            )}

          </div>

        </div>

      </main>

      {/* =====================================================
          CANDIDATE REPORT MODAL
      ====================================================== */}

      {selectedCandidate && (

        <div
          className="modal-overlay"
          onClick={() => setSelectedCandidate(null)}
        >

          <div
            className="report-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>

                <span className="modal-label">
                  CANDIDATE REPORT
                </span>

                <h2>
                  {selectedCandidate.candidate}
                </h2>

                <p>
                  {selectedCandidate.role}
                  {" • "}
                  {selectedCandidate.assessment}
                </p>

              </div>

              <button
                className="close-modal"
                onClick={() =>
                  setSelectedCandidate(null)
                }
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>

            </div>

            {/* PROFILE */}

            <div className="report-profile">

              <div className="large-avatar">
                {getInitials(
                  selectedCandidate.candidate
                )}
              </div>

              <div>

                <h3>
                  {selectedCandidate.candidate}
                </h3>

                <p>
                  {selectedCandidate.email}
                </p>

                <span>
                  Completed on{" "}
                  {selectedCandidate.completedAt}
                </span>

              </div>

              <span
                className={`report-status status-${selectedCandidate.status.toLowerCase()}`}
              >
                {selectedCandidate.status}
              </span>

            </div>

            {/* SCORE CARDS */}

            <div className="report-score-grid">

              <div className="report-score-card">

                <div className="report-card-icon purple">
                  <FontAwesomeIcon icon={faStar} />
                </div>

                <span>Overall Score</span>

                <strong>
                  {selectedCandidate.score}%
                </strong>

                <small>
                  Assessment Performance
                </small>

              </div>

              <div className="report-score-card">

                <div className="report-card-icon green">
                  <FontAwesomeIcon
                    icon={faShieldHalved}
                  />
                </div>

                <span>Integrity Score</span>

                <strong>
                  {selectedCandidate.integrity}%
                </strong>

                <small>
                  Behavioral Integrity
                </small>

              </div>

              <div className="report-score-card">

                <div className="report-card-icon blue">
                  <FontAwesomeIcon icon={faRobot} />
                </div>

                <span>AI Risk</span>

                <strong
                  className={`ai-result ${getRiskClass(
                    selectedCandidate.aiRisk
                  )}`}
                >
                  {selectedCandidate.aiRisk}
                </strong>

                <small>
                  Generated-answer indicator
                </small>

              </div>

            </div>

            {/* ASSESSMENT OVERVIEW */}

            <div className="report-section">

              <div className="section-heading">

                <div>
                  <h3>Assessment Overview</h3>

                  <p>
                    Detailed information about the
                    candidate's assessment attempt.
                  </p>
                </div>

              </div>

              <div className="assessment-overview-grid">

                <div className="overview-item">
                  <div className="overview-icon">
                    <FontAwesomeIcon icon={faClock} />
                  </div>

                  <div>
                    <span>Time Spent</span>
                    <strong>
                      {selectedCandidate.timeSpent}
                    </strong>
                    <small>
                      Limit:{" "}
                      {selectedCandidate.timeLimit}
                    </small>
                  </div>
                </div>

                <div className="overview-item">
                  <div className="overview-icon">
                    <FontAwesomeIcon
                      icon={faSquarePollHorizontal}
                    />
                  </div>

                  <div>
                    <span>Questions</span>
                    <strong>
                      {
                        selectedCandidate.answeredQuestions
                      }{" "}
                      /{" "}
                      {selectedCandidate.totalQuestions}
                    </strong>
                    <small>
                      Questions answered
                    </small>
                  </div>
                </div>

                <div className="overview-item">
                  <div className="overview-icon">
                    <FontAwesomeIcon
                      icon={faChartLine}
                    />
                  </div>

                  <div>
                    <span>Response Consistency</span>
                    <strong>
                      {selectedCandidate.responseConsistency}%
                    </strong>
                    <small>
                      Response pattern consistency
                    </small>
                  </div>
                </div>

                <div className="overview-item">
                  <div className="overview-icon">
                    <FontAwesomeIcon
                      icon={faCircleCheck}
                    />
                  </div>

                  <div>
                    <span>Completion</span>
                    <strong>100%</strong>
                    <small>
                      Assessment completed
                    </small>
                  </div>
                </div>

              </div>

            </div>

            {/* TRAITS */}

            <div className="report-section">

              <div className="section-heading">

                <div>
                  <h3>
                    Personality & Trait Analysis
                  </h3>

                  <p>
                    Performance across selected
                    job-related traits.
                  </p>
                </div>

              </div>

              <div className="trait-list">

                {Object.entries(
                  selectedCandidate.traits
                ).map(([trait, score]) => (

                  <div
                    className="trait-item"
                    key={trait}
                  >

                    <div className="trait-info">

                      <div>

                        <strong>{trait}</strong>

                        <p>
                          {traitDescriptions[trait]}
                        </p>

                      </div>

                      <span>{score}%</span>

                    </div>

                    <div className="trait-progress">

                      <span
                        style={{
                          width: `${score}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* INTEGRITY */}

            <div className="report-section">

              <div className="section-heading">

                <div>
                  <h3>
                    Integrity & Monitoring
                  </h3>

                  <p>
                    Activity signals collected during
                    the assessment.
                  </p>
                </div>

              </div>

              <div className="monitor-grid">

                <div className="monitor-card">

                  <span className="monitor-icon">
                    <FontAwesomeIcon
                      icon={
                        faArrowUpRightFromSquare
                      }
                    />
                  </span>

                  <div>
                    <strong>
                      {selectedCandidate.tabSwitches}
                    </strong>
                    <p>Tab switches</p>
                  </div>

                </div>

                <div className="monitor-card">

                  <span className="monitor-icon">
                    <FontAwesomeIcon
                      icon={faPaste}
                    />
                  </span>

                  <div>
                    <strong>
                      {selectedCandidate.copyPaste}
                    </strong>
                    <p>Copy / Paste events</p>
                  </div>

                </div>

                <div className="monitor-card">

                  <span className="monitor-icon">
                    <FontAwesomeIcon
                      icon={faRobot}
                    />
                  </span>

                  <div>
                    <strong>
                      {selectedCandidate.aiRisk}
                    </strong>
                    <p>AI-generated answer risk</p>
                  </div>

                </div>

                <div className="monitor-card">

                  <span className="monitor-icon">
                    <FontAwesomeIcon
                      icon={faShieldHalved}
                    />
                  </span>

                  <div>
                    <strong>
                      {selectedCandidate.integrity}%
                    </strong>
                    <p>Integrity score</p>
                  </div>

                </div>

              </div>

            </div>

            {/* RESPONSE CONSISTENCY */}

            <div className="report-section">

              <div className="section-heading">

                <div>
                  <h3>Response Consistency</h3>

                  <p>
                    Measures consistency across the
                    candidate's assessment responses.
                  </p>
                </div>

                <strong className="consistency-score">
                  {selectedCandidate.responseConsistency}%
                </strong>

              </div>

              <div className="consistency-bar">

                <span
                  style={{
                    width: `${selectedCandidate.responseConsistency}%`,
                  }}
                />

              </div>

              <div className="consistency-footer">
                <span>Low consistency</span>
                <span>High consistency</span>
              </div>

            </div>

            {/* FOOTER */}

            <div className="report-footer">

              <button
                className="secondary-btn"
                onClick={() =>
                  setSelectedCandidate(null)
                }
              >
                Close
              </button>

              <button
                className="primary-btn"
                onClick={() =>
                  alert(
                    "Detailed report download will be connected to the backend later."
                  )
                }
              >
                <FontAwesomeIcon icon={faDownload} />
                Download Report
              </button>

            </div>

          </div>

        </div>

      )}

      {/* =====================================================
          DELETE MODAL
      ====================================================== */}

      {showDeleteModal &&
        candidateToDelete && (

          <div
            className="modal-overlay"
            onClick={() =>
              setShowDeleteModal(false)
            }
          >

            <div
              className="delete-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="delete-icon">
                <FontAwesomeIcon
                  icon={faTriangleExclamation}
                />
              </div>

              <h2>Delete Result?</h2>

              <p>
                Are you sure you want to remove the
                result of{" "}
                <strong>
                  {candidateToDelete.candidate}
                </strong>
                ? This action cannot be undone.
              </p>

              <div className="delete-actions">

                <button
                  className="secondary-btn"
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  className="danger-btn"
                  onClick={deleteCandidate}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Delete Result
                </button>

              </div>

            </div>

          </div>

        )}

    </div>
  );
}

export default Results;