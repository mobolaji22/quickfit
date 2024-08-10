import { useState } from "react";
import { useNavigate } from "react-router-dom";

const WorkoutTracking = () => {
  const navigate = useNavigate();

  const [workouts, setWorkouts] = useState([
    { id: 1, name: "Running", duration: "5km", completed: false },
    { id: 2, name: "Strength Training", duration: "30 mins", completed: false },
    { id: 3, name: "Yoga", duration: "20 mins", completed: false },
  ]);

  const toggleCompletion = (id) => {
    setWorkouts(
      workouts.map((workout) =>
        workout.id === id
          ? { ...workout, completed: !workout.completed }
          : workout
      )
    );
  };

  const addWorkout = (newWorkout) => {
    setWorkouts([...workouts, { id: Date.now(), ...newWorkout }]);
  };

  const removeWorkout = (id) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  return (
    <div className="workout-tracking-container">
      <h2>Workout Tracking</h2>
      <div className="workout-plan">
        <h3>Today&apos;s Workout Plan</h3>
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              <input
                type="checkbox"
                checked={workout.completed}
                onChange={() => toggleCompletion(workout.id)}
              />
              {workout.name} - {workout.duration}
              <button onClick={() => removeWorkout(workout.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
        <button onClick={() => navigate("/consumption-tracking")}>
          Go to Consumption Tracking
        </button>
        {/* Add more navigation buttons as needed */}
      </div>
      <div className="add-workout">
        <h3>Add New Workout</h3>
        <AddWorkoutForm addWorkout={addWorkout} />
      </div>
    </div>
  );
};

const AddWorkoutForm = ({ addWorkout }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && duration) {
      addWorkout({ name, duration, completed: false });
      setName("");
      setDuration("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Workout Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Duration:</label>
        <input
          type="text"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
      </div>
      <button type="submit">Add Workout</button>
    </form>
  );
};

export default WorkoutTracking;
