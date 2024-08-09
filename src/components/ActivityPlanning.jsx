import { useState } from "react";
// import "./ActivityPlanning.css";

const ActivityPlanning = () => {
  const [activity, setActivity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement activity planning logic here
  };

  return (
    <div className="activity-planning-container">
      <h2>Plan Your Daily Activities</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <button type="submit" className="plan-button">
          Plan
        </button>
      </form>
    </div>
  );
};

export default ActivityPlanning;
