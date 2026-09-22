import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import CreateAssessment from "./pages/CreateAssessment";
import QuestionBank from "./pages/QuestionBank";
import Assessments from "./pages/Assessments";
import TraitManagement from "./pages/TraitManagement";
import Results from "./pages/Results";
import Candidates from "./pages/Candidates";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/admin/create-assessment"
          element={<CreateAssessment />}
        />

        <Route
          path="/admin/question-bank"
          element={<QuestionBank />}
        />

        <Route
          path="/admin/assessments"
          element={<Assessments />}
        />

        <Route
          path="/admin/traits"
          element={<TraitManagement />}
        />

        <Route
          path="/admin/results"
          element={<Results />}
        />

        <Route
          path="/admin/candidates"
          element={<Candidates />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;