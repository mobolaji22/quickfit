import { useState, useEffect } from "react";
import "../styles/ActivityPlanning.css";

const ActivityPlanning = () => {
  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState({});
  const [currentDate, setCurrentDate] = useState(
    new Date().toLocaleDateString()
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [view, setView] = useState("all"); // 'all', 'completed', 'incomplete'

  useEffect(() => {
    const storedActivities = JSON.parse(localStorage.getItem("activities"));
    if (storedActivities) {
      setActivities(storedActivities);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [activities]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleTimeString();

    const newActivities = { ...activities };

    if (isEditing) {
      newActivities[currentDate][editIndex].activity = activity;
      setIsEditing(false);
      setEditIndex(null);
    } else {
      newActivities[currentDate] = [
        ...(activities[currentDate] || []),
        { time: currentTime, activity, completed: false },
      ];
    }

    setActivities(newActivities);
    setActivity("");
  };

  const handleDateChange = (e) => {
    setCurrentDate(e.target.value);
  };

  const handleEdit = (index) => {
    setActivity(activities[currentDate][index].activity);
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const newActivities = { ...activities };
    newActivities[currentDate].splice(index, 1);
    if (newActivities[currentDate].length === 0) {
      delete newActivities[currentDate];
    }
    setActivities(newActivities);
  };

  const handleToggleComplete = (index) => {
    const newActivities = { ...activities };
    newActivities[currentDate][index].completed =
      !newActivities[currentDate][index].completed;
    setActivities(newActivities);
  };

  return (
    <div className="activity-planning-container">
      <h2>Plan Your Daily Activities</h2>
      <input type="date" value={currentDate} onChange={handleDateChange} />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Activity"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <button type="submit" className="plan-button">
          {isEditing ? "Update" : "Plan"}
        </button>
      </form>

      <div className="view-buttons">
        <button
          className={view === "all" ? "active" : ""}
          onClick={() => setView("all")}
        >
          All
        </button>
        <button
          className={view === "completed" ? "active" : ""}
          onClick={() => setView("completed")}
        >
          Completed
        </button>
        <button
          className={view === "incomplete" ? "active" : ""}
          onClick={() => setView("incomplete")}
        >
          Incomplete
        </button>
      </div>

      {view === "all" && (
        <>
          <h3>Activities for {currentDate}</h3>
          <ul>
            {(activities[currentDate] || []).map((entry, index) => (
              <li key={index}>
                <input
                  type="checkbox"
                  checked={entry.completed}
                  onChange={() => handleToggleComplete(index)}
                />
                {entry.completed ? <s>{entry.activity}</s> : entry.activity} at{" "}
                {entry.time}
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      )}

      {view === "completed" && (
        <>
          <h3>Completed Activities for {currentDate}</h3>
          <ul>
            {(activities[currentDate] || [])
              .filter((entry) => entry.completed)
              .map((entry, index) => (
                <li key={index}>
                  {entry.activity} at {entry.time}
                </li>
              ))}
          </ul>
        </>
      )}

      {view === "incomplete" && (
        <>
          <h3>Incomplete Activities for {currentDate}</h3>
          <ul>
            {(activities[currentDate] || [])
              .filter((entry) => !entry.completed)
              .map((entry, index) => (
                <li key={index}>
                  {entry.activity} at {entry.time}
                </li>
              ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ActivityPlanning;
