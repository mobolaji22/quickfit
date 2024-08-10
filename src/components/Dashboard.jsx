import { useNavigate } from "react-router-dom";
import { logoutUser, getCurrentUser } from "../services/authService";

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
          <h3>Active Hours</h3>
          <p>{userData.activeHours} hours</p>
        </div>
        <div className="stat-item">
          <h3>Workouts Completed</h3>
          <p>{userData.workoutsCompleted}</p>
        </div>
        <div className="stat-item">
          <h3>Goal Progress</h3>
          <p>{userData.goalProgress}%</p>
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
