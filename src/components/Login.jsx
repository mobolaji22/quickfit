import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, getCurrentUser } from "../services/authService"; // Import necessary functions
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please fill out both fields.");
      return;
    }

    const result = loginUser(username, password);

    if (result.success) {
      const currentUser = getCurrentUser(); // Get the current logged-in user data
      navigate("/dashboard", { state: { userData: currentUser } }); // Pass user data to the dashboard
    } else {
      setError(result.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        Don&apos;t have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
