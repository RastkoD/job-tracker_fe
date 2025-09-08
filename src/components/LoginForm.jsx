import { useState } from "react";
import "./AddJobForm.css";

function LoginForm({ onLogin }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password == import.meta.env.VITE_APP_PASSWORD) {
      onLogin();
    } else {
      setError("Incorrect password");
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
