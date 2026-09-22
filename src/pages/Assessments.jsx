import { useState } from "react";
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
  faPlus,
  faEye,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";

import { useAuth } from "../context/AuthContext.jsx";

import "../styles/AdminDashboard.css";
import "../styles/Assessments.css";

function Assessments() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  // =========================================
  // USER INFORMATION
  // SAME AS DASHBOARD
  // =========================================

  const userName = user?.fullName || "Admin";
  const userEmail = user?.email || "";
  const profileImage = user?.profileImage || null;
  const userInitial = userName.charAt(0).toUpperCase();

  // =========================================
  // LOGOUT
  // SAME AS DASHBOARD
  // =========================================

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    navigate("/", { replace: true });
  };

  // =========================================
  // EDIT PROFILE
  // SAME AS DASHBOARD
  // =========================================

  const handleEditProfile = () => {
    setProfileOpen(false);
    navigate("/admin/profile");
  };

  // =========================================
  // ASSESSMENTS DATA
  // =========================================

  const assessments = [
    {
      id: 1,
      title: "Software Engineer",
      description:
        "Behavioral assessment for software engineering candidates.",
      jobRole: "Software Engineer",
      questions: 30,
      traits: 8,
      candidates: 24,
      created: "2 days ago",
      status: "Active",
    },

    {
      id: 2,
      title: "Marketing Intern",
      description:
        "Personality and workplace behavior assessment.",
      jobRole: "Marketing Intern",
      questions: 20,
      traits: 6,
      candidates: 15,
      created: "3 days ago",
      status: "Active",
    },

    {
      id: 3,
      title: "Product Designer",
      description:
        "Assessment focused on creativity and collaboration.",
      jobRole: "Product Designer",
      questions: 25,
      traits: 7,
      candidates: 32,
      created: "5 days ago",
      status: "Closed",
    },

    {
      id: 4,
      title: "Backend Developer",
      description:
        "Behavioral assessment for backend engineering roles.",
      jobRole: "Backend Developer",
      questions: 28,
      traits: 8,
      candidates: 18,
      created: "6 days ago",
      status: "Active",
    },

    {
      id: 5,
      title: "Graduate Trainee",
      description:
        "Entry-level behavioral and personality assessment.",
      jobRole: "Graduate Trainee",
      questions: 25,
      traits: 7,
      candidates: 41,
      created: "1 week ago",
      status: "Active",
    },
  ];

  // =========================================
  // FILTER ASSESSMENTS
  // =========================================

  const filteredAssessments = assessments.filter((assessment) => {
    const matchesSearch =
      assessment.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      assessment.jobRole
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" ||
      assessment.status === statusFilter;

    const matchesRole =
      roleFilter === "All Roles" ||
      assessment.jobRole === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="dashboard">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside className="sidebar">

        {/* LOGO */}

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


        {/* NAVIGATION */}

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
            className="nav-link active"
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


        {/* SIDEBAR BOTTOM */}

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
      ===================================================== */}

      <main className="main-content">

        {/* ===================================================
            TOPBAR
        =================================================== */}

        <header className="topbar">

          {/* SEARCH */}

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

            {/* NOTIFICATION */}

            <button
              type="button"
              className="notification-btn"
            >
              <FontAwesomeIcon icon={faBell} />

              <span></span>
            </button>


            {/* =================================================
                PROFILE
                CONNECTED TO AUTH CONTEXT
            ================================================= */}

            <div className="profile-wrapper">

              <button
                type="button"
                className="admin-profile"
                onClick={() =>
                  setProfileOpen((prev) => !prev)
                }
              >

                {/* PROFILE IMAGE */}

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


                {/* PROFILE DETAILS */}

                <div className="profile-details">

                  <strong>
                    {userName}
                  </strong>

                  <small>
                    Hiring Manager
                  </small>

                </div>


                {/* ARROW */}

                <span className="profile-arrow">

                  <FontAwesomeIcon
                    icon={faChevronDown}
                  />

                </span>

              </button>


              {/* =================================================
                  PROFILE DROPDOWN
              ================================================= */}

              {profileOpen && (

                <div className="profile-dropdown">

                  {/* USER INFO */}

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


                  {/* MY PROFILE */}

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


                  {/* EDIT PROFILE */}

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


                  {/* LOGOUT */}

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


        {/* =====================================================
            ASSESSMENTS CONTENT
        ===================================================== */}

        <div className="assessments-content">

          {/* PAGE HEADER */}

          <section className="assessments-header">

            <div>

              <h1>
                Assessments
              </h1>

              <p>
                Create, manage and monitor your behavioral assessments.
              </p>

            </div>


            <Link
              to="/admin/create-assessment"
              className="create-assessment-btn"
            >

              <FontAwesomeIcon icon={faPlus} />

              Create Assessment

            </Link>

          </section>


          {/* FILTER BAR */}

          <section className="filter-bar">

            <div className="assessment-search">

              <FontAwesomeIcon
                icon={faMagnifyingGlass}
              />

              <input
                type="text"
                placeholder="Search assessments..."
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
              />

            </div>


            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
            >

              <option>
                All Status
              </option>

              <option>
                Active
              </option>

              <option>
                Closed
              </option>

              <option>
                Draft
              </option>

            </select>


            <select
              value={roleFilter}
              onChange={(e) =>
                setRoleFilter(e.target.value)
              }
            >

              <option>
                All Roles
              </option>

              <option>
                Software Engineer
              </option>

              <option>
                Backend Developer
              </option>

              <option>
                Marketing Intern
              </option>

              <option>
                Product Designer
              </option>

              <option>
                Graduate Trainee
              </option>

            </select>

          </section>


          {/* SUMMARY CARDS */}

          <section className="assessment-summary">

            <div className="summary-card">

              <span>
                Total Assessments
              </span>

              <strong>
                24
              </strong>

            </div>


            <div className="summary-card">

              <span>
                Active
              </span>

              <strong>
                18
              </strong>

            </div>


            <div className="summary-card">

              <span>
                Completed
              </span>

              <strong>
                121
              </strong>

            </div>


            <div className="summary-card">

              <span>
                Drafts
              </span>

              <strong>
                3
              </strong>

            </div>

          </section>


          {/* ASSESSMENTS PANEL */}

          <section className="assessments-panel">

            {/* PANEL HEADER */}

            <div className="panel-top">

              <div>

                <h2>
                  All Assessments
                </h2>

                <p>
                  Manage your existing assessments
                </p>

              </div>


              <span className="assessment-count">

                {filteredAssessments.length}{" "}
                {filteredAssessments.length === 1
                  ? "assessment"
                  : "assessments"}

              </span>

            </div>


            {/* TABLE */}

            <div className="assessment-table">

              {/* TABLE HEADER */}

              <div className="table-header">

                <span>
                  Assessment
                </span>

                <span>
                  Job Role
                </span>

                <span>
                  Questions
                </span>

                <span>
                  Candidates
                </span>

                <span>
                  Status
                </span>

                <span>
                  Action
                </span>

              </div>


              {/* TABLE ROWS */}

              {filteredAssessments.length > 0 ? (

                filteredAssessments.map((assessment) => (

                  <div
                    className="assessment-table-row"
                    key={assessment.id}
                  >

                    {/* ASSESSMENT */}

                    <div className="assessment-name">

                      <div className="assessment-logo">
                        {assessment.title.charAt(0)}
                      </div>

                      <div>

                        <strong>
                          {assessment.title}
                        </strong>

                        <small>
                          Created {assessment.created}
                        </small>

                      </div>

                    </div>


                    {/* JOB ROLE */}

                    <div className="role-cell">
                      {assessment.jobRole}
                    </div>


                    {/* QUESTIONS */}

                    <div className="questions-cell">

                      <strong>
                        {assessment.questions}
                      </strong>

                      <small>
                        {assessment.traits} traits
                      </small>

                    </div>


                    {/* CANDIDATES */}

                    <div className="candidate-cell">

                      <strong>
                        {assessment.candidates}
                      </strong>

                      <small>
                        candidates
                      </small>

                    </div>


                    {/* STATUS */}

                    <div>

                      <span
                        className={`assessment-status ${
                          assessment.status.toLowerCase()
                        }`}
                      >
                        {assessment.status}
                      </span>

                    </div>


                    {/* ACTIONS */}

                    <div className="assessment-actions">

                      <button
                        type="button"
                        title="View Assessment"
                      >
                        <FontAwesomeIcon
                          icon={faEye}
                        />
                      </button>


                      <button
                        type="button"
                        title="More Options"
                      >
                        <FontAwesomeIcon
                          icon={faEllipsisVertical}
                        />
                      </button>

                    </div>

                  </div>

                ))

              ) : (

                <div className="no-assessments">

                  <FontAwesomeIcon
                    icon={faFileLines}
                  />

                  <h3>
                    No assessments found
                  </h3>

                  <p>
                    Try changing your search or filters.
                  </p>

                </div>

              )}

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

export default Assessments;