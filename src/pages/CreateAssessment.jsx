import { useState } from "react";
import "../styles/CreateAssessment.css";

function CreateAssessment() {
  const [step, setStep] = useState(1);

  const [jobRole, setJobRole] = useState("");
  const [selectedTraits, setSelectedTraits] = useState([]);
  const [questionCounts, setQuestionCounts] = useState({});
  const [generatedQuestions, setGeneratedQuestions] = useState([]);

  // =====================================================
  // TIMER SETTINGS
  // =====================================================

  const [timerEnabled, setTimerEnabled] = useState(false);
  const [timeLimit, setTimeLimit] = useState(30);

  // =====================================================
  // PERSONALITY TRAITS
  // =====================================================

  const traits = [
    "Leadership",
    "Communication",
    "Teamwork",
    "Problem Solving",
    "Adaptability",
    "Creativity",
    "Time Management",
    "Decision Making",
  ];

  // =====================================================
  // VALUES UNDER EACH TRAIT
  // =====================================================

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

  // =====================================================
  // TEMPORARY QUESTION BANK
  // Later this will come from MongoDB
  // =====================================================

  const questionBank = {
    "Decision Making": [
      "How do you handle difficult decisions at work?",
      "What factors do you consider before making an important decision?",
      "How do you react when you have limited information?",
      "Tell us about a time when you had to make a quick decision.",
      "How do you compare different options before choosing one?",
      "What would you do if your decision was challenged by your team?",
      "How do you handle the consequences of a wrong decision?",
      "How do you balance risk and reward when making decisions?",
      "What would you do when two solutions seem equally effective?",
      "How do you make decisions under pressure?",
      "How do you make sure your decisions are fair?",
      "How do you evaluate the possible consequences of a decision?",
    ],

    Responsibility: [
      "How do you take responsibility for your work?",
      "What do you do when you make a mistake?",
      "How do you ensure that you complete your assigned tasks?",
      "How do you handle a task when no one is monitoring you?",
      "What does responsibility mean to you?",
      "How do you react when a project fails?",
      "How do you manage your commitments?",
      "What would you do if a teammate depended on your work?",
      "How do you make sure deadlines are met?",
      "How do you handle accountability at work?",
      "How do you respond when someone points out your mistake?",
      "How do you take ownership of a difficult task?",
    ],

    Initiative: [
      "How do you identify tasks that need to be done without being asked?",
      "Tell us about a time when you took initiative.",
      "What do you do when you notice a problem no one is addressing?",
      "How do you approach new opportunities?",
      "Would you start a task before receiving detailed instructions?",
      "How do you contribute ideas beyond your assigned responsibilities?",
      "What motivates you to take initiative?",
      "How do you react when your idea is rejected?",
      "How do you improve a process on your own?",
      "What would you do if you noticed an inefficient workflow?",
      "How do you decide when to act independently?",
      "How do you take the first step in an unfamiliar situation?",
    ],

    Clarity: [
      "How do you make sure your message is clearly understood?",
      "How do you explain a complex idea to someone unfamiliar with it?",
      "What do you do when someone misunderstands your message?",
      "How do you organize your thoughts before communicating?",
      "How do you make technical information easy to understand?",
      "How do you ensure clarity in written communication?",
      "What makes communication effective?",
      "How do you avoid misunderstandings?",
      "How do you communicate instructions clearly?",
      "How do you simplify complicated information?",
      "How do you make an explanation easier for others to follow?",
      "How do you check whether someone understood your message?",
    ],

    "Active Listening": [
      "How do you show someone that you are listening?",
      "What do you do when you disagree with someone's opinion?",
      "How do you handle conversations with people who communicate differently?",
      "How do you remember important information from discussions?",
      "What do you do when someone needs to explain something multiple times?",
      "How do you avoid interrupting others?",
      "Why is active listening important at work?",
      "How do you respond when someone gives you feedback?",
      "How do you clarify information you did not understand?",
      "How do you handle difficult conversations?",
      "How do you show respect for another person's opinion?",
      "How do you make sure you understand someone's actual concern?",
    ],

    Confidence: [
      "How do you present your ideas to others?",
      "How do you react when your opinion is challenged?",
      "How do you handle speaking in front of a group?",
      "What helps you remain confident during difficult situations?",
      "How do you respond when you do not know an answer?",
      "How do you communicate with senior team members?",
      "How do you build confidence in a new environment?",
      "How do you handle criticism?",
      "How do you express disagreement professionally?",
      "How do you stay confident after making a mistake?",
      "How do you prepare yourself before an important presentation?",
      "How do you maintain confidence when facing uncertainty?",
    ],

    Collaboration: [
      "How do you contribute to a team project?",
      "How do you handle disagreements with teammates?",
      "What makes a team successful?",
      "How do you support a teammate who is struggling?",
      "How do you divide responsibilities in a team?",
      "How do you handle different working styles?",
      "What role do you usually take in a team?",
      "How do you build trust with teammates?",
      "How do you handle a teammate who is not contributing?",
      "How do you ensure everyone participates?",
      "How do you collaborate with someone who has a different opinion?",
      "How do you share responsibility within a team?",
    ],

    Cooperation: [
      "How do you cooperate with people who have different opinions?",
      "How do you support your coworkers?",
      "How do you handle shared responsibilities?",
      "What does good cooperation mean to you?",
      "How do you resolve disagreements within a team?",
      "How do you maintain positive working relationships?",
      "How do you respond when a teammate asks for help?",
      "How do you contribute to a cooperative environment?",
      "How do you handle competing priorities within a team?",
      "Why is cooperation important in the workplace?",
      "How do you work with someone whose style differs from yours?",
      "How do you encourage cooperation among team members?",
    ],

    "Conflict Management": [
      "How do you handle conflict with a coworker?",
      "What do you do when two team members disagree?",
      "How do you remain calm during workplace conflict?",
      "How do you resolve misunderstandings?",
      "What would you do if a conflict affected team performance?",
      "How do you listen to both sides of a disagreement?",
      "When should a manager become involved in a conflict?",
      "How do you prevent conflicts from escalating?",
      "How do you handle criticism during an argument?",
      "What approach do you use to find a compromise?",
      "How do you handle a disagreement professionally?",
      "How do you help two people reach an agreement?",
    ],

    "Critical Thinking": [
      "How do you analyze a difficult problem?",
      "How do you identify the root cause of a problem?",
      "What steps do you take before reaching a conclusion?",
      "How do you evaluate whether information is reliable?",
      "How do you approach unfamiliar problems?",
      "How do you challenge your own assumptions?",
      "How do you compare possible solutions?",
      "How do you handle incomplete information?",
      "How do you distinguish facts from opinions?",
      "How do you improve your problem-solving approach?",
      "How do you examine a problem from different perspectives?",
      "How do you test whether your conclusion is reasonable?",
    ],

    Analysis: [
      "How do you break a complex problem into smaller parts?",
      "How do you analyze information before making a decision?",
      "What methods do you use to identify patterns?",
      "How do you determine which information is important?",
      "How do you verify your analysis?",
      "How do you handle conflicting information?",
      "How do you prioritize data when solving a problem?",
      "How do you communicate analytical findings?",
      "How do you identify errors in your analysis?",
      "How do you approach a problem with limited data?",
      "How do you compare different pieces of information?",
      "How do you make an analysis more accurate?",
    ],

    Flexibility: [
      "How do you react when plans suddenly change?",
      "How do you handle unexpected responsibilities?",
      "How do you adapt to a new working environment?",
      "What do you do when your original plan no longer works?",
      "How do you handle changing priorities?",
      "How do you respond to unexpected feedback?",
      "How do you adjust when working with a new team?",
      "How do you deal with uncertainty?",
      "How do you stay productive during change?",
      "How do you approach unfamiliar situations?",
      "How do you adapt when a project takes an unexpected direction?",
      "How do you respond when your usual method is no longer effective?",
    ],

    "Openness to Change": [
      "How do you react when a familiar process changes?",
      "What is your attitude toward new technology?",
      "How do you respond to organizational changes?",
      "How do you convince yourself to try a new approach?",
      "How do you handle changes that you initially disagree with?",
      "What helps you adapt to new systems?",
      "How do you learn from changes?",
      "How do you respond when your responsibilities change?",
      "How do you deal with uncertainty during change?",
      "Why can change be valuable in an organization?",
      "How do you respond when your team adopts a new process?",
      "What helps you remain positive during change?",
    ],

    "Learning Agility": [
      "How do you learn a new skill quickly?",
      "How do you approach unfamiliar technology?",
      "What do you do when you do not know how to complete a task?",
      "How do you learn from your mistakes?",
      "How do you apply previous experience to new situations?",
      "How do you keep improving your skills?",
      "How do you respond to constructive feedback?",
      "How do you learn from other people?",
      "How do you handle a steep learning curve?",
      "What motivates you to learn something new?",
      "How do you adapt your learning approach when something is difficult?",
      "How do you apply something new that you have learned?",
    ],

    Innovation: [
      "How do you come up with new ideas?",
      "Tell us about a time you improved an existing process.",
      "How do you identify opportunities for innovation?",
      "How do you evaluate a new idea?",
      "What do you do when your idea is different from the usual approach?",
      "How do you encourage creativity in a team?",
      "How do you handle an innovative idea that fails?",
      "How do you turn an idea into a practical solution?",
      "How do you balance innovation with existing requirements?",
      "What inspires your creative thinking?",
      "How do you encourage others to suggest new ideas?",
      "How do you decide whether an innovative idea is practical?",
    ],

    "Idea Generation": [
      "How do you generate multiple solutions to a problem?",
      "What techniques help you develop new ideas?",
      "How do you brainstorm effectively?",
      "How do you build on someone else's idea?",
      "What do you do when you run out of ideas?",
      "How do you encourage different perspectives?",
      "How do you decide which idea deserves further development?",
      "How do you turn observations into ideas?",
      "How do you evaluate creative alternatives?",
      "How do you generate ideas under time pressure?",
      "How do you explore different approaches to a problem?",
      "How do you encourage yourself to think beyond the obvious?",
    ],

    "Original Thinking": [
      "How do you approach a problem differently from others?",
      "Tell us about a time you developed an unusual solution.",
      "How do you challenge conventional thinking?",
      "How do you avoid simply copying existing solutions?",
      "What helps you think independently?",
      "How do you evaluate unconventional ideas?",
      "How do you respond when others do not understand your approach?",
      "How do you develop your own perspective?",
      "How do you combine existing ideas in new ways?",
      "What encourages independent thinking?",
      "How do you look at a familiar problem from a new perspective?",
      "How do you decide whether an unusual solution is useful?",
    ],

    Planning: [
      "How do you plan your work before starting a project?",
      "How do you organize tasks for a busy week?",
      "How do you create realistic deadlines?",
      "How do you plan when requirements are unclear?",
      "How do you track progress toward your goals?",
      "How do you handle changes to your plan?",
      "How do you decide which tasks to complete first?",
      "How do you prepare for an important project?",
      "How do you avoid missing important tasks?",
      "How do you plan long-term goals?",
      "How do you break a large project into manageable tasks?",
      "How do you adjust your plan when unexpected work appears?",
    ],

    Prioritization: [
      "How do you decide which task is most important?",
      "What do you do when several tasks have the same deadline?",
      "How do you prioritize urgent and important work?",
      "How do you handle competing requests?",
      "How do you decide what can wait?",
      "How do you prioritize when your workload increases?",
      "How do you communicate priorities to others?",
      "How do you avoid spending too much time on low-priority tasks?",
      "How do you balance short-term and long-term priorities?",
      "How do you reassess priorities when circumstances change?",
      "How do you decide which task deserves your attention first?",
      "How do you manage priorities when everything seems urgent?",
    ],

    Organization: [
      "How do you keep track of your tasks?",
      "How do you organize project information?",
      "What tools do you use to stay organized?",
      "How do you manage multiple responsibilities?",
      "How do you organize your work environment?",
      "How do you prevent important information from getting lost?",
      "How do you maintain organized records?",
      "How do you prepare for a busy day?",
      "How do you handle a disorganized project?",
      "How does organization affect your productivity?",
      "How do you keep your work organized when handling multiple projects?",
      "How do you make sure important deadlines are not forgotten?",
    ],

    Judgment: [
      "How do you evaluate a situation before making a judgment?",
      "How do you avoid making assumptions?",
      "How do you make fair decisions?",
      "How do you handle situations where there is no obvious answer?",
      "How do you balance facts and intuition?",
      "How do you reconsider a judgment when new information appears?",
      "How do you make decisions involving different perspectives?",
      "How do you handle uncertainty when forming an opinion?",
      "How do you recognize potential bias in your judgment?",
      "How do you make responsible judgments?",
      "How do you evaluate whether your judgment was correct?",
      "How do you remain objective when making a judgment?",
    ],

    "Risk Assessment": [
      "How do you identify risks before starting a project?",
      "How do you decide whether a risk is acceptable?",
      "How do you handle uncertain outcomes?",
      "How do you balance potential benefits against risks?",
      "How do you prepare for possible problems?",
      "How do you prioritize different risks?",
      "What would you do if a project involved significant uncertainty?",
      "How do you communicate risks to others?",
      "How do you respond when a predicted risk becomes real?",
      "How do you reduce unnecessary risk?",
      "How do you evaluate the probability of a potential risk?",
      "How do you decide what action to take after identifying a risk?",
    ],

    "Problem Analysis": [
      "How do you identify the main problem in a complex situation?",
      "How do you separate symptoms from root causes?",
      "What steps do you follow when analyzing a problem?",
      "How do you collect information before solving a problem?",
      "How do you compare different explanations for a problem?",
      "How do you test whether your understanding is correct?",
      "How do you analyze a problem involving multiple factors?",
      "How do you handle conflicting evidence?",
      "How do you communicate your problem analysis?",
      "How do you improve your analysis after solving a problem?",
      "How do you determine which part of a problem needs attention first?",
      "How do you verify the actual cause of a problem?",
    ],
  };

  // =====================================================
  // SELECT / UNSELECT TRAIT
  // =====================================================

  const handleTraitChange = (trait) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(
        selectedTraits.filter((item) => item !== trait)
      );

      const updatedCounts = { ...questionCounts };

      traitValues[trait].forEach((value) => {
        delete updatedCounts[value];
      });

      setQuestionCounts(updatedCounts);
    } else {
      setSelectedTraits([...selectedTraits, trait]);
    }
  };

  // =====================================================
  // QUESTION COUNT
  // =====================================================

  const handleQuestionCount = (value, count) => {
    let newCount = Number(count);

    if (newCount < 0) {
      newCount = 0;
    }

    if (newCount > 100) {
      newCount = 100;
    }

    setQuestionCounts({
      ...questionCounts,
      [value]: newCount,
    });
  };

  // =====================================================
  // STEP 1 → STEP 2
  // =====================================================

  const goToStep2 = () => {
    if (!jobRole) {
      alert("Please select a job role.");
      return;
    }

    setStep(2);
  };

  // =====================================================
  // STEP 2 → STEP 3
  // =====================================================

  const goToStep3 = () => {
    if (selectedTraits.length === 0) {
      alert("Please select at least one personality trait.");
      return;
    }

    setStep(3);
  };

  // =====================================================
  // TOTAL QUESTIONS
  // =====================================================

  const totalQuestions = Object.values(questionCounts).reduce(
    (total, count) => total + Number(count || 0),
    0
  );

  // =====================================================
  // SHUFFLE ARRAY
  // =====================================================

  const shuffleArray = (array) => {
    const shuffled = [...array];

    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(
        Math.random() * (i + 1)
      );

      [shuffled[i], shuffled[randomIndex]] = [
        shuffled[randomIndex],
        shuffled[i],
      ];
    }

    return shuffled;
  };

  // =====================================================
  // GET RANDOM QUESTIONS
  // =====================================================

  const getRandomQuestions = (
    value,
    count,
    excludedQuestions = []
  ) => {
    const questions = questionBank[value] || [];

    const availableQuestions = questions.filter(
      (question) =>
        !excludedQuestions.includes(question)
    );

    const shuffledQuestions =
      shuffleArray(availableQuestions);

    return shuffledQuestions.slice(0, count);
  };

  // =====================================================
  // GENERATE QUESTIONS
  // =====================================================

  const generateQuestions = () => {
    if (totalQuestions === 0) {
      alert("Please select at least one question.");
      return;
    }

    const generated = [];

    selectedTraits.forEach((trait) => {
      traitValues[trait].forEach((value) => {
        const count = Number(
          questionCounts[value] || 0
        );

        if (count > 0) {
          const selectedQuestions =
            getRandomQuestions(
              value,
              count
            );

          selectedQuestions.forEach(
            (question) => {
              generated.push({
                id:
                  `${value}-${Date.now()}-${Math.random()}`,

                trait: trait,

                value: value,

                question: question,
              });
            }
          );
        }
      });
    });

    if (generated.length === 0) {
      alert("No questions could be generated.");
      return;
    }

    setGeneratedQuestions(generated);

    setStep(4);
  };

  // =====================================================
  // CHANGE INDIVIDUAL QUESTION
  // =====================================================

  const changeQuestion = (questionId) => {
    const currentQuestion =
      generatedQuestions.find(
        (item) => item.id === questionId
      );

    if (!currentQuestion) {
      return;
    }

    const existingQuestions =
      generatedQuestions
        .filter(
          (item) =>
            item.value === currentQuestion.value &&
            item.id !== questionId
        )
        .map((item) => item.question);

    const newQuestions =
      getRandomQuestions(
        currentQuestion.value,
        1,
        existingQuestions
      );

    if (newQuestions.length === 0) {
      alert(
        "No different question is available for this value."
      );
      return;
    }

    setGeneratedQuestions(
      (previousQuestions) =>
        previousQuestions.map((item) =>
          item.id === questionId
            ? {
                ...item,
                question: newQuestions[0],
              }
            : item
        )
    );
  };

  // =====================================================
  // REGENERATE ALL QUESTIONS
  // =====================================================

  const regenerateAll = () => {
    generateQuestions();
  };

  // =====================================================
  // SAVE ASSESSMENT
  // =====================================================

  const saveAssessment = () => {
    const assessment = {
      jobRole: jobRole,

      selectedTraits: selectedTraits,

      questionCounts: questionCounts,

      totalQuestions:
        generatedQuestions.length,

      questions: generatedQuestions,

      // TIMER DATA
      timerEnabled: timerEnabled,

      timeLimit: timerEnabled
        ? timeLimit
        : null,
    };

    console.log(
      "FINAL ASSESSMENT:",
      assessment
    );

    alert(
      "Assessment saved successfully!"
    );
  };

  // =====================================================
  // JSX
  // =====================================================

  return (
    <div className="create-assessment-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="assessment-header">

        <div>
          <h1>Create Assessment</h1>

          <p>
            Create a personality assessment
            for a specific job role.
          </p>
        </div>

        <div className="step-indicator">
          Step {step} of 4
        </div>

      </div>


      {/* =================================================
          STEP 1 - JOB ROLE
      ================================================= */}

      {step === 1 && (
        <div className="assessment-form">

          <div className="form-section">

            <h2>
              1. Select Job Role
            </h2>

            <p className="section-description">
              Choose the role for which you want
              to assess candidates.
            </p>

            <select
              value={jobRole}
              onChange={(e) =>
                setJobRole(e.target.value)
              }
            >

              <option value="">
                Select Job Role
              </option>

              <option value="Software Engineer">
                Software Engineer
              </option>

              <option value="Frontend Developer">
                Frontend Developer
              </option>

              <option value="Backend Developer">
                Backend Developer
              </option>

              <option value="Project Manager">
                Project Manager
              </option>

              <option value="UI/UX Designer">
                UI/UX Designer
              </option>

              <option value="Data Analyst">
                Data Analyst
              </option>

              <option value="Marketing Executive">
                Marketing Executive
              </option>

            </select>

          </div>


          <button
            className="create-assessment-btn"
            onClick={goToStep2}
          >
            Continue →
          </button>

        </div>
      )}


      {/* =================================================
          STEP 2 - TRAITS
      ================================================= */}

      {step === 2 && (
        <div className="assessment-form">

          <div className="form-section">

            <h2>
              2. Select Personality Traits
            </h2>

            <p className="section-description">
              Select the traits you want to
              evaluate in candidates.
            </p>

            <div className="traits-grid">

              {traits.map((trait) => (

                <label
                  key={trait}
                  className={`trait-card ${
                    selectedTraits.includes(trait)
                      ? "selected"
                      : ""
                  }`}
                >

                  <input
                    type="checkbox"
                    checked={selectedTraits.includes(
                      trait
                    )}
                    onChange={() =>
                      handleTraitChange(
                        trait
                      )
                    }
                  />

                  <span>
                    {trait}
                  </span>

                </label>

              ))}

            </div>

          </div>


          <div className="step-buttons">

            <button
              className="secondary-btn"
              onClick={() => setStep(1)}
            >
              ← Back
            </button>

            <button
              className="create-assessment-btn"
              onClick={goToStep3}
            >
              Continue →
            </button>

          </div>

        </div>
      )}


      {/* =================================================
          STEP 3 - CONFIGURE QUESTIONS
      ================================================= */}

      {step === 3 && (
        <div className="assessment-form">

          <div className="form-section">

            <h2>
              3. Configure Questions
            </h2>

            <p className="section-description">
              Select how many questions you want
              from each personality value.
            </p>


            {selectedTraits.map(
              (trait) => (

                <div
                  className="trait-values-section"
                  key={trait}
                >

                  <h3>
                    {trait}
                  </h3>


                  {traitValues[trait].map(
                    (value) => (

                      <div
                        className="value-question-row"
                        key={value}
                      >

                        <div>

                          <strong>
                            {value}
                          </strong>

                          <span>
                            Available Questions:{" "}
                            {questionBank[value]
                              ?.length || 0}
                          </span>

                        </div>


                        <input
                          type="number"
                          min="0"
                          max="100"
                          value={
                            questionCounts[
                              value
                            ] || 0
                          }
                          onChange={(e) =>
                            handleQuestionCount(
                              value,
                              e.target.value
                            )
                          }
                        />

                      </div>

                    )
                  )}

                </div>

              )
            )}

          </div>


          {/* =================================================
              ASSESSMENT SUMMARY
          ================================================= */}

          <div className="assessment-summary">

            <h2>
              Assessment Summary
            </h2>

            <div className="summary-item">

              <span>
                Job Role
              </span>

              <strong>
                {jobRole}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Selected Traits
              </span>

              <strong>
                {selectedTraits.length}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Total Questions
              </span>

              <strong>
                {totalQuestions}
              </strong>

            </div>


            {/* TIMER SUMMARY */}

            <div className="summary-item">

              <span>
                Timer
              </span>

              <strong>
                {timerEnabled
                  ? `${timeLimit} minutes`
                  : "No Timer"}
              </strong>

            </div>

          </div>


          {/* =================================================
              TIMER SETTINGS
          ================================================= */}

          <div className="timer-section">

            <div className="section-heading">

              <div>

                <h3>
                  Assessment Timer
                </h3>

                <p>
                  Choose whether candidates should
                  have a time limit.
                </p>

              </div>

            </div>


            <div className="timer-options">

              {/* NO TIMER */}

              <label
                className={`timer-option ${
                  !timerEnabled
                    ? "selected"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="timer"
                  checked={!timerEnabled}
                  onChange={() =>
                    setTimerEnabled(false)
                  }
                />

                <div className="timer-option-content">

                  <div className="timer-option-icon">
                    ∞
                  </div>

                  <div>

                    <strong>
                      No Timer
                    </strong>

                    <span>
                      Candidates can complete the
                      assessment without a time limit.
                    </span>

                  </div>

                </div>

              </label>


              {/* SET TIME LIMIT */}

              <label
                className={`timer-option ${
                  timerEnabled
                    ? "selected"
                    : ""
                }`}
              >

                <input
                  type="radio"
                  name="timer"
                  checked={timerEnabled}
                  onChange={() =>
                    setTimerEnabled(true)
                  }
                />

                <div className="timer-option-content">

                  <div className="timer-option-icon">
                    ◷
                  </div>

                  <div>

                    <strong>
                      Set Time Limit
                    </strong>

                    <span>
                      Candidates must complete the
                      assessment within the selected time.
                    </span>

                  </div>

                </div>

              </label>

            </div>


            {/* TIME SELECTOR */}

            {timerEnabled && (

              <div className="time-limit-box">

                <label htmlFor="timeLimit">
                  Time Limit
                </label>

                <div className="time-input-wrapper">

                  <select
                    id="timeLimit"
                    value={timeLimit}
                    onChange={(e) =>
                      setTimeLimit(
                        Number(e.target.value)
                      )
                    }
                  >

                    <option value={5}>
                      5 minutes
                    </option>

                    <option value={10}>
                      10 minutes
                    </option>

                    <option value={15}>
                      15 minutes
                    </option>

                    <option value={20}>
                      20 minutes
                    </option>

                    <option value={30}>
                      30 minutes
                    </option>

                    <option value={45}>
                      45 minutes
                    </option>

                    <option value={60}>
                      60 minutes
                    </option>

                    <option value={90}>
                      90 minutes
                    </option>

                    <option value={120}>
                      120 minutes
                    </option>

                  </select>

                </div>

                <small>
                  The assessment will automatically
                  end when the time limit is reached.
                </small>

              </div>

            )}

          </div>


          {/* =================================================
              STEP 3 BUTTONS
          ================================================= */}

          <div className="step-buttons">

            <button
              className="secondary-btn"
              onClick={() => setStep(2)}
            >
              ← Back
            </button>

            <button
              className="create-assessment-btn"
              onClick={generateQuestions}
            >
              Generate Questions →
            </button>

          </div>

        </div>
      )}


      {/* =================================================
          STEP 4 - REVIEW QUESTIONS
      ================================================= */}

      {step === 4 && (
        <div className="assessment-form">

          <div className="form-section">

            <div className="review-header">

              <div>

                <h2>
                  4. Review Questions
                </h2>

                <p className="section-description">
                  Review the randomly selected
                  questions before saving the
                  assessment.
                </p>

              </div>


              <div className="question-count-badge">

                {generatedQuestions.length}{" "}
                Questions

              </div>

            </div>


            {/* QUESTIONS */}

            {generatedQuestions.map(
              (item, index) => (

                <div
                  className="review-question-card"
                  key={item.id}
                >

                  <div className="question-number">
                    Q{index + 1}
                  </div>


                  <div className="question-content">

                    <div className="question-meta">

                      <span>
                        {item.trait}
                      </span>

                      <span>
                        {item.value}
                      </span>

                    </div>


                    <p>
                      {item.question}
                    </p>


                    <button
                      className="change-question-btn"
                      onClick={() =>
                        changeQuestion(
                          item.id
                        )
                      }
                    >
                      ↻ Change Question
                    </button>

                  </div>

                </div>

              )
            )}

          </div>


          {/* =================================================
              REVIEW SUMMARY
          ================================================= */}

          <div className="assessment-summary">

            <h2>
              Assessment Summary
            </h2>

            <div className="summary-item">

              <span>
                Job Role
              </span>

              <strong>
                {jobRole}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Traits
              </span>

              <strong>
                {selectedTraits.length}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Questions
              </span>

              <strong>
                {generatedQuestions.length}
              </strong>

            </div>


            <div className="summary-item">

              <span>
                Timer
              </span>

              <strong>
                {timerEnabled
                  ? `${timeLimit} minutes`
                  : "No Timer"}
              </strong>

            </div>

          </div>


          {/* =================================================
              BOTTOM ACTIONS
          ================================================= */}

          <div className="step-buttons">

            <button
              className="secondary-btn"
              onClick={() => setStep(3)}
            >
              ← Back
            </button>


            <div className="review-actions">

              <button
                className="secondary-btn"
                onClick={regenerateAll}
              >
                ↻ Regenerate All
              </button>


              <button
                className="create-assessment-btn"
                onClick={saveAssessment}
              >
                Save Assessment ✓
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default CreateAssessment;