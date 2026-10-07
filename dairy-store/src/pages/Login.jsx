import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/v1/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const result = await response.json();

      if (!response.ok) {               
        alert(result.message || "Login failed");
        return;
      }

      localStorage.setItem("loggedInUser", JSON.stringify(result.data));
      localStorage.setItem("token", result.token);
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Server se connect nahi ho paya");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Welcome</h1>
        <p className="login-subtitle">Login to your FreshDairy account</p>

        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          <div className="login-form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;