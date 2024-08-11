import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
// import { logoutUser, getCurrentUser } from "../services/authService";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      <h2>Welcome, {userData.username}</h2>
      <p>Your Fitness Stage: {userData.fitnessStage}</p>
      <p>Your Fitness Goal: {userData.fitnessGoal}</p>
      <div className="stats">
        <div className="stat-item">
          <h3>Calories Burned</h3>
          <p>{userData.caloriesBurned} kcal</p>
        </div>
        <div className="stat-item">
          <h3>Steps Taken</h3>
          <p>{userData.stepsTaken} steps</p>
        </div>
        <div className="stat-item">
          <h3>Active Mins</h3>
          <p>{userData.activeHours} mins</p>
        </div>
        <div className="stat-item">
          <h3>Workouts Completed</h3>
          <p>{userData.workoutsCompleted}</p>
        </div>
        <div className="stat-item">
          <h3>Goal Progress</h3>
          <p>{userData.goalProgress}%</p>
        </div>
        <div className="stat-item">
          <h3>Weight Progress</h3>
          <p>
            {userData.startWeight} kg → {userData.currentWeight} kg
          </p>
        </div>
        <div className="stat-item">
          <h3>Body Fat Progress</h3>
          <p>
            {userData.startBodyFat}% → {userData.currentBodyFat}%
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
