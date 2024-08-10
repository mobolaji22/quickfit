// components/Dashboard.js
import { useNavigate } from "react-router-dom";
import { logoutUser, getCurrentUser } from "../services/authService";
import "../styles/Dashboard.css";

const Dashboard = ({ userData }) => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {currentUser ? currentUser.username : "User"}</h2>
      <p>Your Fitness Stage: {userData.fitnessStage}</p>
      <p>Your Fitness Goal: {userData.fitnessGoal}</p>
      <div className="stats">
        <div className="stat-item">
          <h3>Calories Burned</h3>
          <p>{userData.caloriesBurned || 0} kcal</p>
        </div>
        <div className="stat-item">
          <h3>Steps Taken</h3>
          <p>{userData.stepsTaken || 0} steps</p>
        </div>
        <div className="stat-item">
          <h3>Active Hours</h3>
          <p>{userData.activeHours || 0} hours</p>
        </div>
        <div className="stat-item">
          <h3>Workouts Completed</h3>
          <p>{userData.workoutsCompleted || 0}</p>
        </div>
        <div className="stat-item">
          <h3>Goal Progress</h3>
          <p>{userData.goalProgress || 0}%</p>
        </div>
        <div className="stat-item">
          <h3>Weight Progress</h3>
          <p>
            {userData.startWeight || userData.weight} kg →{" "}
            {userData.currentWeight || userData.weight} kg
          </p>
        </div>
        <div className="stat-item">
          <h3>Body Fat Progress</h3>
          <p>
            {userData.startBodyFat || userData.bodyFat}% →{" "}
            {userData.currentBodyFat || userData.bodyFat}%
          </p>
        </div>
        <div className="stat-item">
          <h3>Strength Level</h3>
          <p>{userData.strengthLevel}</p>
        </div>
      </div>
      <div className="dashboard-buttons">
        <button onClick={() => navigate("/workout-tracking")}>
          Workout Tracking
        </button>
        <button onClick={() => navigate("/consumption-tracking")}>
          Consumption Tracking
        </button>
        <button onClick={() => navigate("/activity-planning")}>
          Activity Planning
        </button>
        <button onClick={() => navigate("/daily-journal")}>
          Daily Journal
        </button>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
