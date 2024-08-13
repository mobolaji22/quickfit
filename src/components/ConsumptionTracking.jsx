import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import "../styles/ConsumptionTracking.css";

const ConsumptionTracking = () => {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [consumptions, setConsumptions] = useState(() => {
    const savedConsumptions = localStorage.getItem("consumptions");
    return savedConsumptions ? JSON.parse(savedConsumptions) : {};
  });
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split("T")[0] // Using ISO format for date input compatibility
  );
  const [dailyTotalCalories, setDailyTotalCalories] = useState(0);

  const { userData, updateUserData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Update local storage and calculate daily totals
    localStorage.setItem("consumptions", JSON.stringify(consumptions));
    calculateDailyTotalCalories(currentDate);
  }, [consumptions, currentDate]);

  const calculateDailyTotalCalories = (date) => {
    const total =
      consumptions[date]?.reduce((acc, entry) => acc + entry.calories, 0) || 0;
    setDailyTotalCalories(total);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (food && calories) {
      const newEntry = {
        id: Date.now(),
        food,
        calories: parseInt(calories),
        date: currentDate,
        time: new Date().toLocaleTimeString(),
      };

      setConsumptions((prevConsumptions) => {
        const updatedConsumptions = { ...prevConsumptions };
        if (!updatedConsumptions[currentDate]) {
          updatedConsumptions[currentDate] = [];
        }
        // Check if the entry already exists for today
        const existingEntryIndex = updatedConsumptions[currentDate].findIndex(
          (entry) =>
            entry.food === newEntry.food && entry.time === newEntry.time
        );
        if (existingEntryIndex === -1) {
          updatedConsumptions[currentDate].push(newEntry);
        }
        return updatedConsumptions;
      });

      const updatedUserData = {
        ...userData,
        caloriesGained: userData.caloriesGained + parseInt(calories),
      };
      updateUserData(updatedUserData);

      setFood("");
      setCalories("");
    }
  };

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
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

      <div className="date-navigation">
        <input type="date" value={currentDate} onChange={handleDateChange} />
      </div>

      <div className="daily-total">
        <h3>
          Total Calories for {new Date(currentDate).toLocaleDateString()}:{" "}
          {dailyTotalCalories} kcal
        </h3>
      </div>

      {consumptions[currentDate] && consumptions[currentDate].length > 0 ? (
        <div className="consumption-entries">
          <h3>
            Tracked Consumptions for{" "}
            {new Date(currentDate).toLocaleDateString()}
          </h3>
          <ul className="entries-list">
            {consumptions[currentDate].map((entry) => (
              <li key={entry.id} className="entry-item">
                <strong>{entry.food}</strong> - {entry.calories} Calories
                <div className="entry-details">
                  {new Date(entry.date).toLocaleDateString()} at {entry.time}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="no-entries">
          No entries found for {new Date(currentDate).toLocaleDateString()}
        </div>
      )}

      <button onClick={handleNavigateToDashboard} className="dashboard-button">
        Back to Dashboard
      </button>
    </div>
  );
};

export default ConsumptionTracking;
