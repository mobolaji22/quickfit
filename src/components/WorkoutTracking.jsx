import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/WorkoutTracking.css";
import { UserContext } from "../context/UserContext";

const WorkoutTracking = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useContext(UserContext);

  const [workouts, setWorkouts] = useState(() => {
    const savedWorkouts = localStorage.getItem("workouts");
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });

  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [suggestedWorkouts] = useState([
    "Cycling - 30 mins",
    "Swimming - 45 mins",
    "HIIT - 20 mins",
    "Pilates - 40 mins",
    "Dancing - 50 mins",
  ]);

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const toggleCompletion = (id) => {
    const updatedWorkouts = workouts.map((workout) =>
      workout.id === id
        ? { ...workout, completed: !workout.completed }
        : workout
    );

    setWorkouts(updatedWorkouts);

    const completedWorkout = updatedWorkouts.find(
      (workout) => workout.id === id
    );

    const workoutDurationInMinutes = parseInt(completedWorkout.duration);

    if (completedWorkout && completedWorkout.completed) {
      // If the workout is completed, update user data
      updateUserData({
        ...userData,
        workoutsCompleted: userData.workoutsCompleted + 1,
        totalWorkoutTime: userData.totalWorkoutTime + workoutDurationInMinutes,
        caloriesBurned:
          userData.caloriesBurned +
          calculateCaloriesBurned(workoutDurationInMinutes),
        activeMinutes: userData.activeMinutes + workoutDurationInMinutes,
      });
    } else if (completedWorkout && !completedWorkout.completed) {
      // If the workout is unchecked (marked as not completed), subtract the values
      updateUserData({
        ...userData,
        workoutsCompleted: Math.max(userData.workoutsCompleted - 1, 0),
        totalWorkoutTime: Math.max(
          userData.totalWorkoutTime - workoutDurationInMinutes,
          0
        ),
        caloriesBurned: Math.max(
          userData.caloriesBurned -
            calculateCaloriesBurned(workoutDurationInMinutes),
          0
        ),
        activeMinutes: Math.max(
          userData.activeMinutes - workoutDurationInMinutes,
          0
        ),
      });
    }

    // Stop the timer if the workout is marked as completed
    if (isTimerRunning && completedWorkout?.completed) {
      setIsTimerRunning(false);
      setTimer(0);
    }
  };

  const addWorkout = (newWorkout) => {
    setWorkouts([...workouts, { id: Date.now(), ...newWorkout }]);
  };

  const removeWorkout = (id) => {
    const workoutToRemove = workouts.find((workout) => workout.id === id);

    const workoutDurationInMinutes = parseInt(workoutToRemove.duration);

    if (workoutToRemove.completed) {
      const updatedUserData = {
        ...userData,
        workoutsCompleted: Math.max(userData.workoutsCompleted - 1, 0),
        totalWorkoutTime: Math.max(
          userData.totalWorkoutTime - workoutDurationInMinutes,
          0
        ),
        caloriesBurned: Math.max(
          userData.caloriesBurned -
            calculateCaloriesBurned(workoutDurationInMinutes),
          0
        ),
        activeMinutes: Math.max(
          userData.activeMinutes - workoutDurationInMinutes,
          0
        ),
      };

      updateUserData(updatedUserData);
    }

    setWorkouts(workouts.filter((workout) => workout.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("workouts");
    navigate("/");
  };

  const startTimer = (duration) => {
    const minutes = parseInt(duration);
    if (!isNaN(minutes)) {
      setTimer(minutes * 60);
      setIsTimerRunning(true);
      setIsTimerPaused(false);
    }
  };

  const pauseTimer = () => {
    setIsTimerRunning(false);
    setIsTimerPaused(true);
  };

  const resumeTimer = () => {
    setIsTimerRunning(true);
    setIsTimerPaused(false);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setIsTimerPaused(false);
    setTimer(0);
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const addWorkoutFromSuggestion = (suggestion) => {
    const [name, duration] = suggestion.split(" - ");
    addWorkout({ name, duration, completed: false });
  };

  // Function to calculate calories burned based on duration
  const calculateCaloriesBurned = (duration) => {
    const minutes = parseInt(duration);
    // Assuming a basic rate of 10 calories per minute as an example
    return minutes * 10;
  };

  return (
    <div className="workout-tracking-container">
      <h2>Workout Tracking</h2>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <div className="workout-plan">
        <h3>Today&apos;s Workout Plan</h3>
        <ul>
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <li key={workout.id}>
                <input
                  type="checkbox"
                  checked={workout.completed}
                  onChange={() => toggleCompletion(workout.id)}
                />
                <input
                  type="text"
                  value={workout.name}
                  onChange={(e) =>
                    setWorkouts(
                      workouts.map((w) =>
                        w.id === workout.id ? { ...w, name: e.target.value } : w
                      )
                    )
                  }
                  style={{
                    textDecoration: workout.completed ? "line-through" : "none",
                  }}
                />
                -
                <input
                  type="text"
                  value={workout.duration}
                  onChange={(e) =>
                    setWorkouts(
                      workouts.map((w) =>
                        w.id === workout.id
                          ? { ...w, duration: e.target.value }
                          : w
                      )
                    )
                  }
                  style={{
                    textDecoration: workout.completed ? "line-through" : "none",
                  }}
                />
                <button
                  onClick={() => startTimer(workout.duration)}
                  disabled={workout.completed}
                >
                  Start Timer
                </button>
                <button onClick={() => removeWorkout(workout.id)}>
                  Remove
                </button>
              </li>
            ))
          ) : (
            <p>No workouts planned for today. Add some workouts below!</p>
          )}
        </ul>
        <div className="timer">
          {timer > 0 ? (
            <div>
              <p>Time Remaining: {formatTime(timer)}</p>
              {isTimerRunning ? (
                <button onClick={pauseTimer}>Pause Timer</button>
              ) : isTimerPaused ? (
                <button onClick={resumeTimer}>Resume Timer</button>
              ) : null}
              <button onClick={resetTimer}>Reset Timer</button>
            </div>
          ) : (
            <p>No active workout timer.</p>
          )}
        </div>
        <button onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
        <button onClick={() => navigate("/consumption-tracking")}>
          Go to Consumption Tracking
        </button>
      </div>
      <div className="add-workout">
        <h3>Add New Workout</h3>
        <AddWorkoutForm addWorkout={addWorkout} />
      </div>
      <div className="suggested-workouts">
        <h3>Suggested Workouts</h3>
        <ul>
          {suggestedWorkouts.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => addWorkoutFromSuggestion(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AddWorkoutForm = ({ addWorkout }) => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [error, setError] = useState("");

  const handleDurationChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (inputValue) {
      inputValue = `${inputValue} mins`; // Append "mins"
    }
    setDuration(inputValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !duration) {
      setError("Please fill out both the workout name and duration.");
      return;
    }
    addWorkout({ name, duration, completed: false });
    setName("");
    setDuration("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Workout Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter workout name"
        />
      </div>
      <div>
        <label>Duration:</label>
        <input
          type="text"
          value={duration}
          onChange={handleDurationChange}
          placeholder="Enter duration (e.g., 30)"
        />
      </div>
      {error && <p className="error-message">{error}</p>}
      <button type="submit">Add Workout</button>
    </form>
  );
};

export default WorkoutTracking;
