import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Login from "./components/Login";
import Registration from "./components/Registration";
import Dashboard from "./components/Dashboard";
import WorkoutTracking from "./components/WorkoutTracking";
import ConsumptionTracking from "./components/ConsumptionTracking";
import ActivityPlanning from "./components/ActivityPlanning";
import DailyJournal from "./components/DailyJournal";
import PrivateRoute from "./components/PrivateRoute";
import "./styles/variables.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={Dashboard} />}
          />
          <Route
            path="/workout-tracking"
            element={<PrivateRoute element={WorkoutTracking} />}
          />
          <Route
            path="/consumption-tracking"
            element={<PrivateRoute element={ConsumptionTracking} />}
          />
          <Route
            path="/activity-planning"
            element={<PrivateRoute element={ActivityPlanning} />}
          />
          <Route
            path="/daily-journal"
            element={<PrivateRoute element={DailyJournal} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
