import { useState } from "react";
import "./AddJobForm.css";

function LoginForm({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "https://job-tracker-be.onrender.com/api/jobs/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      if (res.ok) {
        onLogin();
      } else {
        const data = await res.json();
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error: " + err.message);
    }
  };

  return (
    <div className="modal">
      <h1 className="loginContainer">Job Tracker</h1>
      <form onSubmit={handleSubmit}>
        <h2>Enter Password to Access</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button className="addJobFormBtn" type="submit">
          Login
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
