import { useState } from "react";
import "../styles/QuestionBank.css";

function QuestionBank() {
  const [selectedTrait, setSelectedTrait] = useState("Leadership");

  const traitValues = {
    Leadership: [
      "Decision Making",
      "Responsibility",
      "Initiative",
    ],
    Communication: [
      "Clarity",
      "Active Listening",
      "Confidence",
    ],
    Teamwork: [
      "Collaboration",
      "Cooperation",
      "Conflict Management",
    ],
    "Problem Solving": [
      "Critical Thinking",
      "Analysis",
      "Decision Making",
    ],
    Adaptability: [
      "Flexibility",
      "Openness to Change",
      "Learning Agility",
    ],
    Creativity: [
      "Innovation",
      "Idea Generation",
      "Original Thinking",
    ],
    "Time Management": [
      "Planning",
      "Prioritization",
      "Organization",
    ],
    "Decision Making": [
      "Judgment",
      "Risk Assessment",
      "Problem Analysis",
    ],
  };

  const [selectedValue, setSelectedValue] = useState(
    traitValues["Leadership"][0]
  );

  const [questions, setQuestions] = useState([
    {
      id: 1,
      text: "How do you make important decisions when you have limited information?",
    },
    {
      id: 2,
      text: "How comfortable are you making decisions under pressure?",
    },
    {
      id: 3,
      text: "How do you evaluate different options before making a decision?",
    },
  ]);

  const [newQuestion, setNewQuestion] = useState("");

  const handleTraitChange = (e) => {
    const trait = e.target.value;

    setSelectedTrait(trait);

    const firstValue = traitValues[trait][0];
    setSelectedValue(firstValue);

    // Temporary demo questions
    setQuestions([]);
  };

  const handleValueChange = (e) => {
    setSelectedValue(e.target.value);

    // Temporary demo questions
    setQuestions([]);
  };

  const addQuestion = () => {
    if (!newQuestion.trim()) {
      alert("Please enter a question.");
      return;
    }

    if (questions.length >= 100) {
      alert("Maximum 100 questions allowed for one value.");
      return;
    }

    const question = {
      id: Date.now(),
      text: newQuestion.trim(),
    };

    setQuestions([...questions, question]);
    setNewQuestion("");
  };

  const deleteQuestion = (id) => {
    setQuestions(
      questions.filter((question) => question.id !== id)
    );
  };

  const editQuestion = (id) => {
    const question = questions.find(
      (question) => question.id === id
    );

    const updatedText = prompt(
      "Edit Question:",
      question.text
    );

    if (updatedText && updatedText.trim()) {
      setQuestions(
        questions.map((q) =>
          q.id === id
            ? { ...q, text: updatedText.trim() }
            : q
        )
      );
    }
  };

  return (
    <div className="question-bank-page">

      {/* Header */}
      <div className="question-bank-header">
        <div>
          <h1>Question Bank</h1>
          <p>
            Manage assessment questions for each personality
            value.
          </p>
        </div>

        <div className="question-bank-count">
          {questions.length} / 100 Questions
        </div>
      </div>

      {/* Filters */}
      <div className="question-bank-filters">

        <div className="filter-group">
          <label>Personality Trait</label>

          <select
            value={selectedTrait}
            onChange={handleTraitChange}
          >
            {Object.keys(traitValues).map((trait) => (
              <option key={trait} value={trait}>
                {trait}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Personality Value</label>

          <select
            value={selectedValue}
            onChange={handleValueChange}
          >
            {traitValues[selectedTrait].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Current Value */}
      <div className="selected-value-section">

        <div>
          <span className="value-label">
            Selected Value
          </span>

          <h2>{selectedValue}</h2>

          <p>
            Add up to 100 questions for this personality value.
          </p>
        </div>

        <div className="value-progress">
          <strong>{questions.length}</strong>
          <span>/ 100</span>
        </div>

      </div>

      {/* Add Question */}
      <div className="add-question-section">

        <h3>Add New Question</h3>

        <div className="add-question-box">

          <textarea
            value={newQuestion}
            onChange={(e) =>
              setNewQuestion(e.target.value)
            }
            placeholder="Write your assessment question here..."
            rows="3"
          />

          <button
            className="add-question-btn"
            onClick={addQuestion}
          >
            + Add Question
          </button>

        </div>

      </div>

      {/* Questions */}
      <div className="questions-section">

        <div className="questions-section-header">
          <div>
            <h3>Questions</h3>
            <p>
              Questions for <strong>{selectedValue}</strong>
            </p>
          </div>

          <span>
            {questions.length} Questions
          </span>
        </div>

        {questions.length === 0 ? (
          <div className="empty-questions">
            <div className="empty-icon">?</div>

            <h3>No Questions Yet</h3>

            <p>
              Add questions for this personality value
              using the field above.
            </p>
          </div>
        ) : (
          <div className="questions-list">

            {questions.map((question, index) => (
              <div
                className="question-card"
                key={question.id}
              >

                <div className="question-number">
                  {index + 1}
                </div>

                <div className="question-text">
                  {question.text}
                </div>

                <div className="question-actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      editQuestion(question.id)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteQuestion(question.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default QuestionBank;