import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUsers,
  faCircleCheck,
  faClock,
  faEnvelope,
  faTriangleExclamation,
  faMagnifyingGlass,
  faCircleInfo,
  faXmark,
  faTrash,
  faEye,
  faRotateLeft,
  faArrowLeft,
  faChartLine,
  faShieldHalved,
  faArrowUpRightFromSquare,
  faClipboardCheck,
  faPaste,
  faArrowRight,
  faCircleExclamation,
  faRobot,
  faListCheck,
  faUserClock,
  faCalendarCheck,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/Candidates.css";

const initialCandidates = [
  {
    id: 1,
    name: "Ayesha Khan",
    email: "ayesha.khan@gmail.com",
    phone: "+92 300 1234567",
    role: "Frontend Developer",
    assessment: "Frontend Developer Assessment",
    status: "Completed",
    score: 87,
    integrity: 96,
    experience: "2 Years",
    location: "Lahore, Pakistan",
    appliedDate: "12 Sep 2026",
    completedDate: "12 Sep 2026",

    assessmentDetails: {
      timeLimit: "30 Minutes",
      timeSpent: "24m 18s",
      questionsTotal: 30,
      questionsAnswered: 30,
      responseConsistency: 94,
      tabSwitches: 1,
      copyEvents: 0,
      pasteEvents: 0,
      aiGenerated: "Low",
      flaggedEvents: 1,
    },

    traits: [
      { name: "Leadership", score: 84 },
      { name: "Communication", score: 91 },
      { name: "Teamwork", score: 88 },
      { name: "Problem Solving", score: 86 },
      { name: "Adaptability", score: 82 },
      { name: "Decision Making", score: 90 },
    ],

    responses: [
      {
        question: "Your team has a tight deadline. What would you do?",
        answer:
          "I would first understand the remaining work, divide responsibilities and communicate priorities clearly.",
        trait: "Leadership",
        score: 92,
        consistency: "Strong",
      },
      {
        question:
          "A teammate disagrees with your approach. How do you respond?",
        answer:
          "I would listen to their reasoning and compare both approaches before deciding.",
        trait: "Teamwork",
        score: 89,
        consistency: "Strong",
      },
      {
        question:
          "You discover a bug shortly before release. What is your response?",
        answer:
          "I would assess the impact, communicate the issue and prioritize fixing the critical path.",
        trait: "Problem Solving",
        score: 86,
        consistency: "Good",
      },
    ],

    timeline: [
      {
        time: "10:02 AM",
        title: "Assessment Started",
        description: "Candidate opened the assessment.",
        type: "normal",
      },
      {
        time: "10:15 AM",
        title: "Tab Switch Detected",
        description: "Candidate switched browser tab once.",
        type: "warning",
      },
      {
        time: "10:26 AM",
        title: "Assessment Completed",
        description: "All 30 questions were submitted.",
        type: "success",
      },
      {
        time: "10:27 AM",
        title: "Assessment Evaluated",
        description: "Trait and integrity analysis completed.",
        type: "success",
      },
    ],
  },

  {
    id: 2,
    name: "Hamza Ali",
    email: "hamza.ali@gmail.com",
    phone: "+92 301 9876543",
    role: "Software Engineer",
    assessment: "Software Engineer Assessment",
    status: "Completed",
    score: 79,
    integrity: 88,
    experience: "1 Year",
    location: "Islamabad, Pakistan",
    appliedDate: "10 Sep 2026",
    completedDate: "11 Sep 2026",

    assessmentDetails: {
      timeLimit: "35 Minutes",
      timeSpent: "32m 41s",
      questionsTotal: 30,
      questionsAnswered: 30,
      responseConsistency: 81,
      tabSwitches: 3,
      copyEvents: 1,
      pasteEvents: 1,
      aiGenerated: "Medium",
      flaggedEvents: 4,
    },

    traits: [
      { name: "Leadership", score: 74 },
      { name: "Communication", score: 79 },
      { name: "Teamwork", score: 83 },
      { name: "Problem Solving", score: 88 },
      { name: "Adaptability", score: 76 },
      { name: "Decision Making", score: 80 },
    ],

    responses: [
      {
        question: "A production issue appears during a busy sprint.",
        answer:
          "I would investigate the issue, identify the root cause and communicate with the team.",
        trait: "Problem Solving",
        score: 88,
        consistency: "Strong",
      },
      {
        question:
          "How would you handle disagreement with another developer?",
        answer:
          "I would explain my technical reasoning and try to reach a decision together.",
        trait: "Communication",
        score: 78,
        consistency: "Good",
      },
      {
        question:
          "Your priorities suddenly change. What would you do?",
        answer:
          "I would adjust the plan and focus on the most important tasks first.",
        trait: "Adaptability",
        score: 76,
        consistency: "Moderate",
      },
    ],

    timeline: [
      {
        time: "02:10 PM",
        title: "Assessment Started",
        description: "Candidate opened the assessment.",
        type: "normal",
      },
      {
        time: "02:21 PM",
        title: "Tab Switch Detected",
        description: "Browser tab switch detected.",
        type: "warning",
      },
      {
        time: "02:24 PM",
        title: "Copy Event Detected",
        description: "One copy event was recorded.",
        type: "warning",
      },
      {
        time: "02:42 PM",
        title: "Assessment Completed",
        description: "All questions were submitted.",
        type: "success",
      },
    ],
  },

  {
    id: 3,
    name: "Sara Ahmed",
    email: "sara.ahmed@gmail.com",
    phone: "+92 302 4567890",
    role: "UI/UX Designer",
    assessment: "Creative & Design Assessment",
    status: "Completed",
    score: 92,
    integrity: 99,
    experience: "3 Years",
    location: "Karachi, Pakistan",
    appliedDate: "08 Sep 2026",
    completedDate: "10 Sep 2026",

    assessmentDetails: {
      timeLimit: "30 Minutes",
      timeSpent: "21m 52s",
      questionsTotal: 25,
      questionsAnswered: 25,
      responseConsistency: 97,
      tabSwitches: 0,
      copyEvents: 0,
      pasteEvents: 0,
      aiGenerated: "Very Low",
      flaggedEvents: 0,
    },

    traits: [
      { name: "Leadership", score: 88 },
      { name: "Communication", score: 94 },
      { name: "Teamwork", score: 91 },
      { name: "Problem Solving", score: 93 },
      { name: "Adaptability", score: 90 },
      { name: "Creativity", score: 96 },
    ],

    responses: [
      {
        question: "A client rejects your initial design concept.",
        answer:
          "I would ask for detailed feedback and use it to iterate on the design.",
        trait: "Adaptability",
        score: 94,
        consistency: "Strong",
      },
      {
        question: "How do you approach solving a difficult UX problem?",
        answer:
          "I would understand the users first, identify pain points and test possible solutions.",
        trait: "Problem Solving",
        score: 96,
        consistency: "Strong",
      },
      {
        question: "How do you collaborate with developers?",
        answer:
          "I communicate design decisions clearly and work with developers throughout implementation.",
        trait: "Teamwork",
        score: 92,
        consistency: "Strong",
      },
    ],

    timeline: [
      {
        time: "11:03 AM",
        title: "Assessment Started",
        description: "Candidate opened the assessment.",
        type: "normal",
      },
      {
        time: "11:25 AM",
        title: "Assessment Completed",
        description: "All 25 questions were submitted.",
        type: "success",
      },
      {
        time: "11:26 AM",
        title: "Assessment Evaluated",
        description: "Trait and integrity analysis completed.",
        type: "success",
      },
    ],
  },

  {
    id: 4,
    name: "Usman Tariq",
    email: "usman.tariq@gmail.com",
    phone: "+92 303 5551234",
    role: "Backend Developer",
    assessment: "Backend Developer Assessment",
    status: "Flagged",
    score: 68,
    integrity: 72,
    experience: "2 Years",
    location: "Faisalabad, Pakistan",
    appliedDate: "07 Sep 2026",
    completedDate: "09 Sep 2026",

    assessmentDetails: {
      timeLimit: "35 Minutes",
      timeSpent: "34m 12s",
      questionsTotal: 30,
      questionsAnswered: 30,
      responseConsistency: 62,
      tabSwitches: 7,
      copyEvents: 3,
      pasteEvents: 2,
      aiGenerated: "High",
      flaggedEvents: 9,
    },

    traits: [
      { name: "Leadership", score: 61 },
      { name: "Communication", score: 70 },
      { name: "Teamwork", score: 73 },
      { name: "Problem Solving", score: 77 },
      { name: "Adaptability", score: 64 },
      { name: "Decision Making", score: 68 },
    ],

    responses: [
      {
        question: "How would you approach a critical backend failure?",
        answer:
          "I would check logs and identify the issue before communicating with the team.",
        trait: "Problem Solving",
        score: 77,
        consistency: "Moderate",
      },
      {
        question: "A teammate challenges your technical decision.",
        answer:
          "I would defend my approach and explain why I think it is better.",
        trait: "Communication",
        score: 65,
        consistency: "Weak",
      },
      {
        question:
          "You receive an unexpected change in project requirements.",
        answer:
          "I would continue with the existing implementation and handle the change later.",
        trait: "Adaptability",
        score: 51,
        consistency: "Weak",
      },
    ],

    timeline: [
      {
        time: "04:01 PM",
        title: "Assessment Started",
        description: "Candidate opened the assessment.",
        type: "normal",
      },
      {
        time: "04:10 PM",
        title: "Multiple Tab Switches",
        description: "Several browser tab switches were detected.",
        type: "warning",
      },
      {
        time: "04:22 PM",
        title: "Copy/Paste Activity",
        description: "Copy and paste events were recorded.",
        type: "warning",
      },
      {
        time: "04:35 PM",
        title: "Assessment Flagged",
        description: "Assessment was flagged for review.",
        type: "danger",
      },
    ],
  },

  {
    id: 5,
    name: "Maham Raza",
    email: "maham.raza@gmail.com",
    phone: "+92 304 1112233",
    role: "Product Manager",
    assessment: "Product Manager Assessment",
    status: "Completed",
    score: 89,
    integrity: 94,
    experience: "4 Years",
    location: "Lahore, Pakistan",
    appliedDate: "06 Sep 2026",
    completedDate: "08 Sep 2026",

    assessmentDetails: {
      timeLimit: "30 Minutes",
      timeSpent: "25m 09s",
      questionsTotal: 25,
      questionsAnswered: 25,
      responseConsistency: 91,
      tabSwitches: 1,
      copyEvents: 0,
      pasteEvents: 0,
      aiGenerated: "Low",
      flaggedEvents: 1,
    },

    traits: [
      { name: "Leadership", score: 91 },
      { name: "Communication", score: 93 },
      { name: "Teamwork", score: 90 },
      { name: "Problem Solving", score: 88 },
      { name: "Adaptability", score: 87 },
      { name: "Decision Making", score: 94 },
    ],

    responses: [
      {
        question: "Two stakeholders disagree on product priorities.",
        answer:
          "I would understand both perspectives and use product goals and data to align priorities.",
        trait: "Decision Making",
        score: 94,
        consistency: "Strong",
      },
      {
        question: "Your product team misses an important milestone.",
        answer:
          "I would identify the blockers, communicate clearly and create a revised plan.",
        trait: "Leadership",
        score: 91,
        consistency: "Strong",
      },
      {
        question: "Customer requirements change unexpectedly.",
        answer:
          "I would evaluate the impact and adjust the roadmap where appropriate.",
        trait: "Adaptability",
        score: 88,
        consistency: "Good",
      },
    ],

    timeline: [
      {
        time: "09:31 AM",
        title: "Assessment Started",
        description: "Candidate opened the assessment.",
        type: "normal",
      },
      {
        time: "09:56 AM",
        title: "Assessment Completed",
        description: "All questions were submitted.",
        type: "success",
      },
      {
        time: "09:57 AM",
        title: "Assessment Evaluated",
        description: "Results were generated successfully.",
        type: "success",
      },
    ],
  },

  {
    id: 6,
    name: "Bilal Hassan",
    email: "bilal.hassan@gmail.com",
    phone: "+92 305 7778899",
    role: "Software Engineer",
    assessment: "Software Engineer Assessment",
    status: "In Progress",
    score: null,
    integrity: null,
    experience: "Fresh Graduate",
    location: "Multan, Pakistan",
    appliedDate: "12 Sep 2026",
    completedDate: null,

    assessmentDetails: {
      timeLimit: "35 Minutes",
      timeSpent: "18m 42s",
      questionsTotal: 30,
      questionsAnswered: 17,
      responseConsistency: 86,
      tabSwitches: 1,
      copyEvents: 0,
      pasteEvents: 0,
      aiGenerated: "Not Available",
      flaggedEvents: 1,
    },

    traits: [],
    responses: [],
    timeline: [
      {
        time: "01:10 PM",
        title: "Assessment Started",
        description: "Candidate started the assessment.",
        type: "normal",
      },
      {
        time: "01:28 PM",
        title: "Assessment In Progress",
        description: "17 of 30 questions have been answered.",
        type: "normal",
      },
    ],
  },

  {
    id: 7,
    name: "Hina Malik",
    email: "hina.malik@gmail.com",
    phone: "+92 306 8887766",
    role: "Frontend Developer",
    assessment: "Frontend Developer Assessment",
    status: "Invited",
    score: null,
    integrity: null,
    experience: "1 Year",
    location: "Rawalpindi, Pakistan",
    appliedDate: "12 Sep 2026",
    completedDate: null,

    assessmentDetails: {
      timeLimit: "30 Minutes",
      timeSpent: "0m",
      questionsTotal: 30,
      questionsAnswered: 0,
      responseConsistency: 0,
      tabSwitches: 0,
      copyEvents: 0,
      pasteEvents: 0,
      aiGenerated: "Not Available",
      flaggedEvents: 0,
    },

    traits: [],
    responses: [],
    timeline: [
      {
        time: "09:00 AM",
        title: "Invitation Sent",
        description: "Assessment invitation was sent to the candidate.",
        type: "normal",
      },
    ],
  },
];

const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const getScoreClass = (score) => {
  if (score >= 80) return "score-good";
  if (score >= 60) return "score-average";
  return "score-low";
};

const getIntegrityClass = (score) => {
  if (score >= 90) return "integrity-good";
  if (score >= 75) return "integrity-average";
  return "integrity-low";
};

const getTraitClass = (score) => {
  if (score >= 85) return "trait-high";
  if (score >= 70) return "trait-medium";
  return "trait-low";
};

function Candidates() {
  const [candidates, setCandidates] = useState(initialCandidates);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [roleFilter, setRoleFilter] = useState("All");

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [deleteCandidateData, setDeleteCandidateData] = useState(null);

  const [showInviteModal, setShowInviteModal] = useState(false);

  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "Frontend Developer",
    assessment: "Frontend Developer Assessment",
  });

  const filteredCandidates = useMemo(() => {
    return candidates.filter((candidate) => {
      const searchValue = search.trim().toLowerCase();

      const matchesSearch =
        candidate.name.toLowerCase().includes(searchValue) ||
        candidate.email.toLowerCase().includes(searchValue) ||
        candidate.role.toLowerCase().includes(searchValue) ||
        candidate.assessment.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" ||
        candidate.status === statusFilter;

      const matchesRole =
        roleFilter === "All" ||
        candidate.role === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [candidates, search, statusFilter, roleFilter]);

  const stats = {
    total: candidates.length,
    completed: candidates.filter(
      (candidate) => candidate.status === "Completed"
    ).length,
    inProgress: candidates.filter(
      (candidate) => candidate.status === "In Progress"
    ).length,
    invited: candidates.filter(
      (candidate) => candidate.status === "Invited"
    ).length,
    flagged: candidates.filter(
      (candidate) => candidate.status === "Flagged"
    ).length,
  };

  const handleInviteChange = (event) => {
    const { name, value } = event.target;

    setInviteForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleInviteCandidate = (event) => {
    event.preventDefault();

    if (!inviteForm.name.trim() || !inviteForm.email.trim()) {
      return;
    }

    const newCandidate = {
      id: Date.now(),
      name: inviteForm.name,
      email: inviteForm.email,
      phone: "Not provided",
      role: inviteForm.role,
      assessment: inviteForm.assessment,
      status: "Invited",
      score: null,
      integrity: null,
      experience: "Not provided",
      location: "Not provided",
      appliedDate: "18 Sep 2026",
      completedDate: null,

      assessmentDetails: {
        timeLimit: "30 Minutes",
        timeSpent: "0m",
        questionsTotal: 30,
        questionsAnswered: 0,
        responseConsistency: 0,
        tabSwitches: 0,
        copyEvents: 0,
        pasteEvents: 0,
        aiGenerated: "Not Available",
        flaggedEvents: 0,
      },

      traits: [],
      responses: [],

      timeline: [
        {
          time: "Now",
          title: "Invitation Created",
          description:
            "Candidate was added and is waiting to start the assessment.",
          type: "normal",
        },
      ],
    };

    setCandidates((current) => [newCandidate, ...current]);

    setInviteForm({
      name: "",
      email: "",
      role: "Frontend Developer",
      assessment: "Frontend Developer Assessment",
    });

    setShowInviteModal(false);
  };

  const confirmDelete = () => {
    if (!deleteCandidateData) return;

    setCandidates((current) =>
      current.filter(
        (candidate) => candidate.id !== deleteCandidateData.id
      )
    );

    setDeleteCandidateData(null);
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setRoleFilter("All");
  };

  return (
    <div className="candidates-page">

      {/* ================= HEADER ================= */}

      <header className="candidates-header">
        <div>
          <div className="candidates-breadcrumb">
            <Link to="/admin/dashboard">Dashboard</Link>
            <span>/</span>
            <span>Candidates</span>
          </div>

          <h1>Candidates</h1>

          <p>
            Manage candidates and monitor assessment progress,
            performance and integrity activity.
          </p>
        </div>

        <button
          className="invite-candidate-button"
          onClick={() => setShowInviteModal(true)}
        >
          <span>+</span>
          Invite Candidate
        </button>
      </header>

      {/* ================= STATISTICS ================= */}

      <section className="candidate-stats">

        <div className="candidate-stat-card">
          <div className="stat-icon stat-purple">
            <FontAwesomeIcon icon={faUsers} />
          </div>

          <div>
            <span>Total Candidates</span>
            <strong>{stats.total}</strong>
          </div>
        </div>

        <div className="candidate-stat-card">
          <div className="stat-icon stat-green">
            <FontAwesomeIcon icon={faCircleCheck} />
          </div>

          <div>
            <span>Completed</span>
            <strong>{stats.completed}</strong>
          </div>
        </div>

        <div className="candidate-stat-card">
          <div className="stat-icon stat-blue">
            <FontAwesomeIcon icon={faClock} />
          </div>

          <div>
            <span>In Progress</span>
            <strong>{stats.inProgress}</strong>
          </div>
        </div>

        <div className="candidate-stat-card">
          <div className="stat-icon stat-orange">
            <FontAwesomeIcon icon={faEnvelope} />
          </div>

          <div>
            <span>Invited</span>
            <strong>{stats.invited}</strong>
          </div>
        </div>

        <div className="candidate-stat-card">
          <div className="stat-icon stat-red">
            <FontAwesomeIcon icon={faTriangleExclamation} />
          </div>

          <div>
            <span>Flagged</span>
            <strong>{stats.flagged}</strong>
          </div>
        </div>

      </section>

      {/* ================= MAIN CARD ================= */}

      <section className="candidates-main-card">

        <div className="candidates-toolbar">

          <div className="candidate-search-box">
            <FontAwesomeIcon icon={faMagnifyingGlass} />

            <input
              type="text"
              placeholder="Search candidates, email, role..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="candidate-filter-group">

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(event.target.value)
              }
            >
              <option value="All">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Invited">Invited</option>
              <option value="Flagged">Flagged</option>
            </select>

            <select
              value={roleFilter}
              onChange={(event) =>
                setRoleFilter(event.target.value)
              }
            >
              <option value="All">All Roles</option>
              <option value="Frontend Developer">
                Frontend Developer
              </option>
              <option value="Software Engineer">
                Software Engineer
              </option>
              <option value="UI/UX Designer">
                UI/UX Designer
              </option>
              <option value="Backend Developer">
                Backend Developer
              </option>
              <option value="Product Manager">
                Product Manager
              </option>
            </select>

            <button
              className="reset-filter-button"
              onClick={resetFilters}
            >
              <FontAwesomeIcon icon={faRotateLeft} />
              Reset
            </button>

          </div>
        </div>

        <div className="candidate-list-header">
          <div>
            <h2>Candidate List</h2>

            <p>
              Showing {filteredCandidates.length} of{" "}
              {candidates.length} candidates
            </p>
          </div>
        </div>

        {filteredCandidates.length > 0 ? (
          <div className="candidate-table-container">

            <table className="candidate-table">

              <thead>
                <tr>
                  <th>Candidate</th>
                  <th>Role</th>
                  <th>Assessment</th>
                  <th>Status</th>
                  <th>Score</th>
                  <th>Integrity</th>
                  <th>Applied</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {filteredCandidates.map((candidate) => (
                  <tr key={candidate.id}>

                    <td>
                      <div className="candidate-cell">

                        <div className="candidate-avatar">
                          {getInitials(candidate.name)}
                        </div>

                        <div className="candidate-name-info">
                          <strong>{candidate.name}</strong>
                          <span>{candidate.email}</span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="role-text">
                        {candidate.role}
                      </span>
                    </td>

                    <td>
                      <span className="assessment-text">
                        {candidate.assessment}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`status-badge status-${candidate.status
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                      >
                        <i></i>
                        {candidate.status}
                      </span>
                    </td>

                    <td>
                      {candidate.score !== null ? (
                        <span
                          className={`candidate-score ${getScoreClass(
                            candidate.score
                          )}`}
                        >
                          {candidate.score}%
                        </span>
                      ) : (
                        <span className="pending-text">
                          Pending
                        </span>
                      )}
                    </td>

                    <td>
                      {candidate.integrity !== null ? (
                        <div className="integrity-cell">

                          <div className="integrity-number">
                            {candidate.integrity}%
                          </div>

                          <div className="integrity-bar">
                            <span
                              className={getIntegrityClass(
                                candidate.integrity
                              )}
                              style={{
                                width: `${candidate.integrity}%`,
                              }}
                            ></span>
                          </div>

                        </div>
                      ) : (
                        <span className="pending-text">
                          Pending
                        </span>
                      )}
                    </td>

                    <td>
                      <span className="date-text">
                        {candidate.appliedDate}
                      </span>
                    </td>

                    <td>
                      <div className="candidate-action-buttons">

                        <button
                          className="view-button"
                          onClick={() =>
                            setSelectedCandidate(candidate)
                          }
                        >
                          <FontAwesomeIcon icon={faEye} />
                          View Details
                        </button>

                        <button
                          className="delete-button"
                          onClick={() =>
                            setDeleteCandidateData(candidate)
                          }
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        ) : (
          <div className="candidate-empty-state">

            <div className="empty-icon">
              <FontAwesomeIcon icon={faUsers} />
            </div>

            <h3>No candidates found</h3>

            <p>
              No candidates match your current search or filters.
            </p>

            <button onClick={resetFilters}>
              Clear Filters
            </button>

          </div>
        )}

      </section>

      {/* =====================================================
          CANDIDATE DETAILS MODAL
      ===================================================== */}

      {selectedCandidate && (
        <div
          className="candidate-overlay details-overlay"
          onClick={() => setSelectedCandidate(null)}
        >
          <div
            className="candidate-details-modal"
            onClick={(event) => event.stopPropagation()}
          >

            {/* MODAL TOP */}

            <div className="details-modal-top">

              <div className="details-profile">

                <div className="large-candidate-avatar">
                  {getInitials(selectedCandidate.name)}
                </div>

                <div>
                  <div className="modal-eyebrow">
                    CANDIDATE ASSESSMENT REPORT
                  </div>

                  <h2>{selectedCandidate.name}</h2>

                  <p>
                    {selectedCandidate.role} ·{" "}
                    {selectedCandidate.email}
                  </p>

                  <div className="details-status-row">

                    <span
                      className={`status-badge status-${selectedCandidate.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      <i></i>
                      {selectedCandidate.status}
                    </span>

                    <span className="candidate-location">
                      {selectedCandidate.location}
                    </span>

                  </div>
                </div>

              </div>

              <button
                className="modal-close"
                onClick={() => setSelectedCandidate(null)}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>

            </div>

            {/* ASSESSMENT HEADER */}

            <div className="assessment-detail-header">

              <div>
                <span>Assessment</span>

                <strong>
                  {selectedCandidate.assessment}
                </strong>
              </div>

              <div>
                <span>Completed</span>

                <strong>
                  {selectedCandidate.completedDate ||
                    "In Progress"}
                </strong>
              </div>

            </div>

            {/* OVERVIEW CARDS */}

            <section className="detail-section">

              <div className="detail-section-heading">
                <div>
                  <span className="section-label">
                    ASSESSMENT OVERVIEW
                  </span>

                  <h3>Performance Summary</h3>
                </div>
              </div>

              <div className="assessment-overview-grid">

                <div className="overview-card purple-card">
                  <div className="overview-card-icon">
                    <FontAwesomeIcon icon={faClipboardCheck} />
                  </div>

                  <div>
                    <span>Assessment Score</span>

                    <strong>
                      {selectedCandidate.score !== null
                        ? `${selectedCandidate.score}%`
                        : "Pending"}
                    </strong>

                    <small>Overall performance</small>
                  </div>
                </div>

                <div className="overview-card green-card">
                  <div className="overview-card-icon">
                    <FontAwesomeIcon icon={faShieldHalved} />
                  </div>

                  <div>
                    <span>Integrity Score</span>

                    <strong>
                      {selectedCandidate.integrity !== null
                        ? `${selectedCandidate.integrity}%`
                        : "Pending"}
                    </strong>

                    <small>Assessment integrity</small>
                  </div>
                </div>

                <div className="overview-card blue-card">
                  <div className="overview-card-icon">
                    <FontAwesomeIcon icon={faClock} />
                  </div>

                  <div>
                    <span>Time Spent</span>

                    <strong>
                      {
                        selectedCandidate.assessmentDetails
                          .timeSpent
                      }
                    </strong>

                    <small>
                      Limit:{" "}
                      {
                        selectedCandidate.assessmentDetails
                          .timeLimit
                      }
                    </small>
                  </div>
                </div>

                <div className="overview-card orange-card">
                  <div className="overview-card-icon">
                    <FontAwesomeIcon icon={faListCheck} />
                  </div>

                  <div>
                    <span>Questions</span>

                    <strong>
                      {
                        selectedCandidate.assessmentDetails
                          .questionsAnswered
                      }
                      /
                      {
                        selectedCandidate.assessmentDetails
                          .questionsTotal
                      }
                    </strong>

                    <small>Questions answered</small>
                  </div>
                </div>

              </div>

            </section>

            {/* TRAIT SCORES */}

            {selectedCandidate.traits.length > 0 && (
              <section className="detail-section">

                <div className="detail-section-heading">

                  <div>
                    <span className="section-label">
                      TRAIT ANALYSIS
                    </span>

                    <h3>Behavioral Trait Scores</h3>

                    <p>
                      Scores generated from the candidate's
                      assessment responses.
                    </p>
                  </div>

                  <div className="trait-average">
                    <span>Average</span>

                    <strong>
                      {Math.round(
                        selectedCandidate.traits.reduce(
                          (total, trait) =>
                            total + trait.score,
                          0
                        ) / selectedCandidate.traits.length
                      )}
                      %
                    </strong>
                  </div>

                </div>

                <div className="trait-grid">

                  {selectedCandidate.traits.map((trait) => (
                    <div
                      className="trait-score-card"
                      key={trait.name}
                    >

                      <div className="trait-score-top">

                        <div>
                          <strong>{trait.name}</strong>

                          <span>
                            {trait.score >= 85
                              ? "Strong"
                              : trait.score >= 70
                              ? "Good"
                              : "Needs Review"}
                          </span>
                        </div>

                        <b>{trait.score}%</b>

                      </div>

                      <div className="trait-progress">
                        <span
                          className={getTraitClass(
                            trait.score
                          )}
                          style={{
                            width: `${trait.score}%`,
                          }}
                        ></span>
                      </div>

                    </div>
                  ))}

                </div>

              </section>
            )}

            {/* INTEGRITY ANALYSIS */}

            <section className="detail-section">

              <div className="detail-section-heading">

                <div>
                  <span className="section-label">
                    INTEGRITY & ACTIVITY
                  </span>

                  <h3>Assessment Behavior</h3>

                  <p>
                    Activity signals recorded while the
                    candidate completed the assessment.
                  </p>
                </div>

              </div>

              <div className="behavior-grid">

                <div className="behavior-card">

                  <div className="behavior-icon behavior-blue">
                    <FontAwesomeIcon icon={faUserClock} />
                  </div>

                  <div>
                    <span>Response Consistency</span>

                    <strong>
                      {
                        selectedCandidate.assessmentDetails
                          .responseConsistency
                      }
                      %
                    </strong>
                  </div>

                  <div className="behavior-progress">
                    <span
                      style={{
                        width: `${selectedCandidate.assessmentDetails.responseConsistency}%`,
                      }}
                    ></span>
                  </div>

                </div>

                <div className="behavior-card">

                  <div className="behavior-icon behavior-orange">
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </div>

                  <div>
                    <span>Tab Switches</span>

                    <strong>
                      {
                        selectedCandidate.assessmentDetails
                          .tabSwitches
                      }
                    </strong>
                  </div>

                  <small>
                    Browser focus changes
                  </small>

                </div>

                <div className="behavior-card">

                  <div className="behavior-icon behavior-purple">
                    <FontAwesomeIcon icon={faClipboardCheck} />
                  </div>

                  <div>
                    <span>Copy Events</span>

                    <strong>
                      {
                        selectedCandidate.assessmentDetails
                          .copyEvents
                      }
                    </strong>
                  </div>

                  <small>
                    Content copied during assessment
                  </small>

                </div>

                <div className="behavior-card">

                  <div className="behavior-icon behavior-red">
                    <FontAwesomeIcon icon={faPaste} />
                  </div>

                  <div>
                    <span>Paste Events</span>

                    <strong>
                      {
                        selectedCandidate.assessmentDetails
                          .pasteEvents
                      }
                    </strong>
                  </div>

                  <small>
                    Content pasted during assessment
                  </small>

                </div>

                <div className="behavior-card">

                  <div className="behavior-icon behavior-green">
                    <FontAwesomeIcon icon={faRobot} />
                  </div>

                  <div>
                    <span>AI Answer Indicator</span>

                    <strong>
                      {
                        selectedCandidate.assessmentDetails
                          .aiGenerated
                      }
                    </strong>
                  </div>

                  <small>
                    Automated analysis signal
                  </small>

                </div>

                <div className="behavior-card">

                  <div className="behavior-icon behavior-red">
                    <FontAwesomeIcon icon={faCircleExclamation} />
                  </div>

                  <div>
                    <span>Flagged Events</span>

                    <strong>
                      {
                        selectedCandidate.assessmentDetails
                          .flaggedEvents
                      }
                    </strong>
                  </div>

                  <small>
                    Events requiring review
                  </small>

                </div>

              </div>

            </section>

            {/* RESPONSE ANALYSIS */}

            {selectedCandidate.responses.length > 0 && (
              <section className="detail-section">

                <div className="detail-section-heading">

                  <div>
                    <span className="section-label">
                      RESPONSE ANALYSIS
                    </span>

                    <h3>Question-by-Question Review</h3>

                    <p>
                      Review selected responses and the traits
                      they contributed to.
                    </p>
                  </div>

                </div>

                <div className="response-list">

                  {selectedCandidate.responses.map(
                    (response, index) => (
                      <div
                        className="response-card"
                        key={index}
                      >

                        <div className="response-number">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div className="response-content">

                          <h4>{response.question}</h4>

                          <p>
                            "{response.answer}"
                          </p>

                          <div className="response-meta">

                            <span>
                              <FontAwesomeIcon
                                icon={faChartLine}
                              />
                              {response.trait}
                            </span>

                            <span>
                              <FontAwesomeIcon
                                icon={faCheck}
                              />
                              {response.consistency}
                            </span>

                          </div>

                        </div>

                        <div className="response-score">

                          <strong>
                            {response.score}%
                          </strong>

                          <span>Trait Score</span>

                        </div>

                      </div>
                    )
                  )}

                </div>

              </section>
            )}

            {/* TIMELINE */}

            <section className="detail-section">

              <div className="detail-section-heading">

                <div>
                  <span className="section-label">
                    ACTIVITY TIMELINE
                  </span>

                  <h3>Assessment Activity</h3>

                  <p>
                    Important events recorded during the
                    assessment.
                  </p>
                </div>

              </div>

              <div className="activity-timeline">

                {selectedCandidate.timeline.map(
                  (event, index) => (
                    <div
                      className="timeline-item"
                      key={index}
                    >

                      <div
                        className={`timeline-dot timeline-${event.type}`}
                      >
                        {event.type === "success" ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : event.type === "warning" ||
                          event.type === "danger" ? (
                          <FontAwesomeIcon
                            icon={faTriangleExclamation}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faCircleInfo}
                          />
                        )}
                      </div>

                      <div className="timeline-content">

                        <div className="timeline-top">
                          <strong>{event.title}</strong>

                          <span>{event.time}</span>
                        </div>

                        <p>{event.description}</p>

                      </div>

                    </div>
                  )
                )}

              </div>

            </section>

            {/* FOOTER */}

            <div className="details-modal-footer">

              <button
                className="modal-secondary-button"
                onClick={() => setSelectedCandidate(null)}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
                Back to Candidates
              </button>

              <Link
                to="/admin/results"
                className="modal-primary-button"
              >
                View Full Results
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>

            </div>

          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}

      {deleteCandidateData && (
        <div
          className="candidate-overlay"
          onClick={() => setDeleteCandidateData(null)}
        >

          <div
            className="delete-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="delete-icon">!</div>

            <h2>Remove Candidate?</h2>

            <p>
              Are you sure you want to remove{" "}
              <strong>{deleteCandidateData.name}</strong>?
              This action cannot be undone.
            </p>

            <div className="delete-modal-actions">

              <button
                className="modal-secondary-button"
                onClick={() =>
                  setDeleteCandidateData(null)
                }
              >
                Cancel
              </button>

              <button
                className="confirm-delete-button"
                onClick={confirmDelete}
              >
                Delete Candidate
              </button>

            </div>

          </div>

        </div>
      )}

      {/* ================= INVITE MODAL ================= */}

      {showInviteModal && (
        <div
          className="candidate-overlay"
          onClick={() => setShowInviteModal(false)}
        >

          <div
            className="invite-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="modal-header">

              <div>
                <span className="modal-eyebrow">
                  NEW INVITATION
                </span>

                <h2>Invite Candidate</h2>

                <p>
                  Send an assessment invitation to a
                  candidate.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() =>
                  setShowInviteModal(false)
                }
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>

            </div>

            <form onSubmit={handleInviteCandidate}>

              <div className="invite-form-grid">

                <div className="form-field">

                  <label>Candidate Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter candidate name"
                    value={inviteForm.name}
                    onChange={handleInviteChange}
                    required
                  />

                </div>

                <div className="form-field">

                  <label>Email Address</label>

                  <input
                    type="email"
                    name="email"
                    placeholder="candidate@example.com"
                    value={inviteForm.email}
                    onChange={handleInviteChange}
                    required
                  />

                </div>

                <div className="form-field">

                  <label>Job Role</label>

                  <select
                    name="role"
                    value={inviteForm.role}
                    onChange={handleInviteChange}
                  >
                    <option>Frontend Developer</option>
                    <option>Software Engineer</option>
                    <option>UI/UX Designer</option>
                    <option>Backend Developer</option>
                    <option>Product Manager</option>
                  </select>

                </div>

                <div className="form-field">

                  <label>Assessment</label>

                  <select
                    name="assessment"
                    value={inviteForm.assessment}
                    onChange={handleInviteChange}
                  >
                    <option>
                      Frontend Developer Assessment
                    </option>

                    <option>
                      Software Engineer Assessment
                    </option>

                    <option>
                      Creative & Design Assessment
                    </option>

                    <option>
                      Backend Developer Assessment
                    </option>

                    <option>
                      Product Manager Assessment
                    </option>
                  </select>

                </div>

              </div>

              <div className="invite-note">
                <FontAwesomeIcon icon={faCircleInfo} />

                <span>
                  The candidate will receive an assessment
                  invitation after backend integration.
                </span>
              </div>

              <div className="modal-footer">

                <button
                  type="button"
                  className="modal-secondary-button"
                  onClick={() =>
                    setShowInviteModal(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="modal-primary-button"
                >
                  Send Invitation
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}

export default Candidates;