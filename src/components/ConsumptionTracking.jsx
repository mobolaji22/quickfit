import { useState } from "react";
// import "./ConsumptionTracking.css";

const ConsumptionTracking = () => {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement consumption tracking logic here
  };

  return (
    <div className="consumption-tracking-container">
      <h2>Consumption Tracking</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Food Item"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />
        <input
          type="number"
          placeholder="Calories"
          value={calories}
          onChange={(e) => setCalories(e.target.value)}
        />
        <button type="submit" className="track-button">
          Track
        </button>
      </form>
    </div>
  );
};

export default ConsumptionTracking;
