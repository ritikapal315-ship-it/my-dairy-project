
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (!savedUser) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (
      email === savedUser.email &&
      password === savedUser.password
    ) {
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(savedUser)
      );

      alert("Login successful!");

      window.location.reload();
    } else {
      alert("Invalid email or password!");
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Welcome</h1>

        <p className="login-subtitle">
          Login to your FreshDairy account
        </p>

        <form onSubmit={handleSubmit}>

          <div className="login-form-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          <div className="login-form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
            />
          </div>

          <button type="submit">
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;

