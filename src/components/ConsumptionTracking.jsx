import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/ConsumptionTracking.css";

const ConsumptionTracking = () => {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [consumptions, setConsumptions] = useState(() => {
    const savedConsumptions = localStorage.getItem("consumptions");
    return savedConsumptions ? JSON.parse(savedConsumptions) : [];
  });

  const { userData, updateUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("consumptions", JSON.stringify(consumptions));
  }, [consumptions]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (food && calories) {
      const newEntry = {
        id: Date.now(),
        food,
        calories: parseInt(calories),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };

      setConsumptions([...consumptions, newEntry]);

      // Update calories gained in user data
      const updatedUserData = {
        ...userData,
        caloriesGained: userData.caloriesGained + newEntry.calories,
      };
      updateUserData(updatedUserData);

      setFood("");
      setCalories("");
    }
  };

  const handleNavigateToDashboard = () => {
    navigate("/dashboard");
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

      {consumptions.length > 0 && (
        <div className="consumption-entries">
          <h3>Tracked Consumptions</h3>
          <ul className="entries-list">
            {consumptions.map((entry) => (
              <li key={entry.id} className="entry-item">
                <strong>{entry.food}</strong> - {entry.calories} Calories
                <div className="entry-details">
                  {entry.date} at {entry.time}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button onClick={handleNavigateToDashboard} className="dashboard-button">
        Back to Dashboard
      </button>
    </div>
  );
};

export default ConsumptionTracking;
