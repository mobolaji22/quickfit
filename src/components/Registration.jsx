import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import "../styles/Registration.css";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [strengthLevel, setStrengthLevel] = useState("");
  const [fitnessGoal, setFitnessGoal] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const determineFitnessStage = (age, weight, bodyFat, strengthLevel) => {
    if (strengthLevel === "Beginner" && bodyFat > 20) {
      return "Beginner";
    } else if (
      strengthLevel === "Intermediate" &&
      bodyFat <= 20 &&
      bodyFat > 15
    ) {
      return "Intermediate";
    } else {
      return "Advanced";
    }
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    if (
      !username ||
      !password ||
      !age ||
      !height ||
      !weight ||
      !fitnessGoal ||
      !bodyFat ||
      !strengthLevel
    ) {
      setError("Please fill out all fields.");
      return;
    }

    const fitnessStage = determineFitnessStage(
      age,
      weight,
      bodyFat,
      strengthLevel
    );

    const userData = {
      username,
      password,
      age,
      height,
      weight,
      bodyFat,
      strengthLevel,
      fitnessGoal,
      fitnessStage,
    };

    const result = registerUser(userData);

    if (result.success) {
      navigate("/dashboard", { state: { userData } });
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="number"
          placeholder="Height (e.g., 170 cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight (e.g., 70 kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Body Fat Percentage (e.g., 18%)"
          value={bodyFat}
          onChange={(e) => setBodyFat(e.target.value)}
        />
        <input
          type="text"
          placeholder="Strength Level (e.g., Beginner, Intermediate, Advanced)"
          value={strengthLevel}
          onChange={(e) => setStrengthLevel(e.target.value)}
        />
        <input
          type="text"
          placeholder="Fitness Goal (e.g., Lose 5 kg, Run a marathon)"
          value={fitnessGoal}
          onChange={(e) => setFitnessGoal(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
  );
};

export default Registration;
