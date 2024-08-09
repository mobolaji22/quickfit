// import "./Dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Welcome to Your Dashboard</h2>
      <div className="stats">
        <div className="stat-item">
          <h3>Calories Burned</h3>
          <p>450 kcal</p>
        </div>
        <div className="stat-item">
          <h3>Steps Taken</h3>
          <p>10,000 steps</p>
        </div>
        <div className="stat-item">
          <h3>Active Hours</h3>
          <p>2 hours</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
