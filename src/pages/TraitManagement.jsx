import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChartLine,
  faMagnifyingGlass,
  faPlus,
  faTrash,
  faXmark,
  faCircleCheck,
  faCircleXmark,
  faListCheck,
  faLayerGroup,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/TraitManagement.css";

const initialTraits = [
  {
    id: 1,
    name: "Leadership",
    description:
      "Measures the ability to guide, motivate, take responsibility, and lead others effectively.",
    subTraits: ["Decision Making", "Responsibility", "Initiative"],
    questions: 12,
    active: true,
  },
  {
    id: 2,
    name: "Communication",
    description:
      "Evaluates how clearly a candidate communicates ideas, listens, and interacts with others.",
    subTraits: ["Clarity", "Active Listening", "Confidence"],
    questions: 12,
    active: true,
  },
  {
    id: 3,
    name: "Teamwork",
    description:
      "Measures collaboration, cooperation, and the ability to work effectively within a team.",
    subTraits: ["Collaboration", "Cooperation", "Conflict Management"],
    questions: 12,
    active: true,
  },
  {
    id: 4,
    name: "Problem Solving",
    description:
      "Evaluates critical thinking, analysis, and the ability to solve challenging situations.",
    subTraits: ["Critical Thinking", "Analysis", "Decision Making"],
    questions: 12,
    active: true,
  },
  {
    id: 5,
    name: "Adaptability",
    description:
      "Measures how effectively a candidate responds to change, uncertainty, and new situations.",
    subTraits: ["Flexibility", "Openness to Change", "Learning Agility"],
    questions: 12,
    active: true,
  },
  {
    id: 6,
    name: "Creativity",
    description:
      "Evaluates innovation, original thinking, and the ability to generate new ideas.",
    subTraits: ["Innovation", "Idea Generation", "Original Thinking"],
    questions: 12,
    active: true,
  },
  {
    id: 7,
    name: "Time Management",
    description:
      "Measures planning, prioritization, organization, and the ability to manage time effectively.",
    subTraits: ["Planning", "Prioritization", "Organization"],
    questions: 12,
    active: true,
  },
  {
    id: 8,
    name: "Decision Making",
    description:
      "Evaluates judgment, risk assessment, and the ability to make effective decisions.",
    subTraits: ["Judgment", "Risk Assessment", "Problem Analysis"],
    questions: 12,
    active: true,
  },
];

function TraitManagement() {
  const [traits, setTraits] = useState(initialTraits);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrait, setEditingTrait] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    subTraits: [],
    active: true,
  });
  const [newSubTrait, setNewSubTrait] = useState("");

  const activeTraits = traits.filter((trait) => trait.active).length;

  const totalQuestions = traits.reduce(
    (total, trait) => total + Number(trait.questions || 0),
    0
  );

  const totalSubTraits = traits.reduce(
    (total, trait) => total + trait.subTraits.length,
    0
  );

  const filteredTraits = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return traits;
    }

    return traits.filter((trait) => {
      const traitName = trait.name.toLowerCase();
      const description = trait.description.toLowerCase();
      const subTraits = trait.subTraits.join(" ").toLowerCase();

      return (
        traitName.includes(search) ||
        description.includes(search) ||
        subTraits.includes(search)
      );
    });
  }, [traits, searchTerm]);

  const openAddModal = () => {
    setEditingTrait(null);
    setFormData({
      name: "",
      description: "",
      subTraits: [],
      active: true,
    });
    setNewSubTrait("");
    setIsModalOpen(true);
  };

  const openEditModal = (trait) => {
    setEditingTrait(trait);
    setFormData({
      name: trait.name,
      description: trait.description,
      subTraits: [...trait.subTraits],
      active: trait.active,
    });
    setNewSubTrait("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTrait(null);
    setNewSubTrait("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const addSubTrait = () => {
    const value = newSubTrait.trim();

    if (!value) return;

    const alreadyExists = formData.subTraits.some(
      (item) => item.toLowerCase() === value.toLowerCase()
    );

    if (alreadyExists) return;

    setFormData((previous) => ({
      ...previous,
      subTraits: [...previous.subTraits, value],
    }));

    setNewSubTrait("");
  };

  const handleSubTraitKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSubTrait();
    }
  };

  const removeSubTrait = (indexToRemove) => {
    setFormData((previous) => ({
      ...previous,
      subTraits: previous.subTraits.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const saveTrait = (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const description = formData.description.trim();

    if (!name) {
      alert("Please enter a trait name.");
      return;
    }

    if (!description) {
      alert("Please enter a trait description.");
      return;
    }

    if (formData.subTraits.length === 0) {
      alert("Please add at least one sub-trait.");
      return;
    }

    if (editingTrait) {
      setTraits((previousTraits) =>
        previousTraits.map((trait) =>
          trait.id === editingTrait.id
            ? {
                ...trait,
                name,
                description,
                subTraits: formData.subTraits,
                active: formData.active,
              }
            : trait
        )
      );
    } else {
      const newTrait = {
        id: Date.now(),
        name,
        description,
        subTraits: formData.subTraits,
        questions: 0,
        active: formData.active,
      };

      setTraits((previousTraits) => [...previousTraits, newTrait]);
    }

    closeModal();
  };

  const deleteTrait = (id) => {
    const trait = traits.find((item) => item.id === id);

    if (!trait) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete "${trait.name}"?`
    );

    if (!confirmed) return;

    setTraits((previousTraits) =>
      previousTraits.filter((item) => item.id !== id)
    );
  };

  const toggleStatus = (id) => {
    setTraits((previousTraits) =>
      previousTraits.map((trait) =>
        trait.id === id
          ? {
              ...trait,
              active: !trait.active,
            }
          : trait
      )
    );
  };

  return (
    <div className="trait-page">
      <main className="main-content">
        <div className="trait-management-content">
          <div className="trait-page-header">
            <div>
              <div className="page-breadcrumb">
                <Link to="/admin/dashboard" className="breadcrumb-link">
                  Dashboard
                </Link>
                <span>/</span>
                <span>Trait Management</span>
              </div>

              <h1>Trait Management</h1>

              <p>
                Create and manage personality traits and their sub-traits used
                in candidate assessments.
              </p>
            </div>

            <button
              className="add-trait-btn"
              onClick={openAddModal}
              type="button"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add New Trait
            </button>
          </div>

          <div className="trait-stats">
            <div className="trait-stat-card">
              <div className="trait-stat-icon purple">
                <FontAwesomeIcon icon={faLayerGroup} />
              </div>
              <div className="trait-stat-content">
                <strong>{traits.length}</strong>
                <span>Total Traits</span>
              </div>
            </div>

            <div className="trait-stat-card">
              <div className="trait-stat-icon green">
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
              <div className="trait-stat-content">
                <strong>{activeTraits}</strong>
                <span>Active Traits</span>
              </div>
            </div>

            <div className="trait-stat-card">
              <div className="trait-stat-icon blue">
                <FontAwesomeIcon icon={faListCheck} />
              </div>
              <div className="trait-stat-content">
                <strong>{totalQuestions}</strong>
                <span>Total Questions</span>
              </div>
            </div>

            <div className="trait-stat-card">
              <div className="trait-stat-icon orange">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <div className="trait-stat-content">
                <strong>{totalSubTraits}</strong>
                <span>Sub-Traits</span>
              </div>
            </div>
          </div>

          <div className="trait-toolbar">
            <div className="trait-search-box">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="trait-search-icon"
              />

              <input
                type="text"
                placeholder="Search traits or sub-traits..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="trait-result-count">
              {filteredTraits.length}{" "}
              {filteredTraits.length === 1 ? "trait" : "traits"} found
            </div>
          </div>

          <div className="traits-grid">
            {filteredTraits.length > 0 ? (
              filteredTraits.map((trait) => (
                <div className="trait-card" key={trait.id}>
                  <div className="trait-card-top">
                    <div className="trait-card-heading">
                      <div className="trait-card-icon">
                        <FontAwesomeIcon icon={faChartLine} />
                      </div>

                      <div>
                        <h2>{trait.name}</h2>

                        <span className="trait-question-label">
                          {trait.questions} questions
                        </span>
                      </div>
                    </div>

                    <span
                      className={`trait-status ${
                        trait.active ? "active" : "inactive"
                      }`}
                    >
                      <span className="status-dot" />
                      {trait.active ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="trait-description">{trait.description}</div>

                  <div className="sub-traits-section">
                    <div className="sub-traits-title">Sub-Traits</div>

                    <div className="sub-traits-list">
                      {trait.subTraits.map((subTrait, index) => (
                        <span
                          className="sub-trait-tag"
                          key={`${trait.id}-${index}`}
                        >
                          {subTrait}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="trait-card-footer">
                    <div className="trait-question-count">
                      <FontAwesomeIcon icon={faListCheck} />
                      <span>Question Bank</span>
                      <strong>{trait.questions}</strong>
                    </div>

                    <div className="trait-card-actions">
                      <button
                        className="trait-action-btn edit"
                        title="Edit Trait"
                        type="button"
                        onClick={() => openEditModal(trait)}
                      >
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>

                      <button
                        className="trait-action-btn delete"
                        title="Delete Trait"
                        type="button"
                        onClick={() => deleteTrait(trait.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>

                  <button
                    className={`trait-toggle-btn ${
                      trait.active ? "disable" : "enable"
                    }`}
                    onClick={() => toggleStatus(trait.id)}
                    type="button"
                  >
                    <FontAwesomeIcon
                      icon={trait.active ? faCircleXmark : faCircleCheck}
                    />
                    {trait.active ? "Disable Trait" : "Enable Trait"}
                  </button>
                </div>
              ))
            ) : (
              <div className="trait-empty-state">
                <div className="empty-state-icon">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>

                <h3>No traits found</h3>

                <p>Try changing your search or add a new trait.</p>

                <button type="button" onClick={openAddModal}>
                  <FontAwesomeIcon icon={faPlus} />
                  Add New Trait
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {isModalOpen && (
        <div
          className="trait-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              closeModal();
            }
          }}
        >
          <div
            className="trait-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="trait-modal-header">
              <div>
                <span className="modal-eyebrow">TRAIT MANAGEMENT</span>

                <h2>{editingTrait ? "Edit Trait" : "Add New Trait"}</h2>

                <p>Define the trait and its assessment sub-traits.</p>
              </div>

              <button
                className="trait-modal-close"
                onClick={closeModal}
                type="button"
                aria-label="Close"
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>

            <form className="trait-modal-form" onSubmit={saveTrait}>
              <div className="trait-form-group">
                <label htmlFor="trait-name">Trait Name</label>

                <input
                  id="trait-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Leadership"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="trait-form-group">
                <label htmlFor="trait-description">Description</label>

                <textarea
                  id="trait-description"
                  name="description"
                  placeholder="Describe what this trait measures..."
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              <div className="trait-form-group">
                <label htmlFor="new-sub-trait">Sub-Traits</label>

                <div className="sub-trait-input">
                  <input
                    id="new-sub-trait"
                    type="text"
                    placeholder="e.g. Responsibility"
                    value={newSubTrait}
                    onChange={(e) => setNewSubTrait(e.target.value)}
                    onKeyDown={handleSubTraitKeyDown}
                  />

                  <button
                    type="button"
                    className="sub-trait-add-btn"
                    onClick={addSubTrait}
                    aria-label="Add sub-trait"
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>

                {formData.subTraits.length > 0 && (
                  <div className="modal-sub-traits">
                    {formData.subTraits.map((subTrait, index) => (
                      <span
                        className="modal-sub-trait"
                        key={`${subTrait}-${index}`}
                      >
                        {subTrait}

                        <button
                          type="button"
                          onClick={() => removeSubTrait(index)}
                          title="Remove"
                          aria-label={`Remove ${subTrait}`}
                        >
                          <FontAwesomeIcon icon={faXmark} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="trait-form-group">
                <div className="trait-modal-status">
                  <div className="trait-modal-status-text">
                    <strong>Trait Status</strong>

                    <span>
                      Inactive traits will not appear during assessment
                      creation.
                    </span>
                  </div>

                  <label className="trait-switch">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) =>
                        setFormData((previous) => ({
                          ...previous,
                          active: e.target.checked,
                        }))
                      }
                    />

                    <span className="trait-slider" />
                  </label>
                </div>
              </div>

              <div className="trait-modal-actions">
                <button
                  type="button"
                  className="trait-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button type="submit" className="trait-save-btn">
                  <FontAwesomeIcon
                    icon={editingTrait ? faPenToSquare : faPlus}
                  />

                  {editingTrait ? "Update Trait" : "Create Trait"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TraitManagement;
