import { useState } from "react";

function Signup() {
    const [name, setName] = useState("");
 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password and Confirm Password do not match!");
      return;
    }
     const user = {
    name: name,
    email: email,
    password: password,
  };

  localStorage.setItem("user", JSON.stringify(user));

    alert("Account created successfully!");
  }

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h1>Create Account</h1>

        <p className="signup-subtitle">
          Sign up to continue to FreshDairy
        </p>

        <form onSubmit={handleSubmit}>
          <div className="signup-form-group">
            <label>Name</label>
            <input
              type="text"
             placeholder="Enter your name"
                 value={name}
          onChange={(event) => setName(event.target.value)}
            required
            />
          </div>

          <div className="signup-form-group">
            <label>Email</label>
            <input
            type="email"
           placeholder="Enter your email"
           value={email}
           onChange={(event) => setEmail(event.target.value)}
            required
           />
          </div>

          <div className="signup-form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>

          <div className="signup-form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(event.target.value)
              }
              required
            />
          </div>

          <button type="submit">
            Sign Up
          </button>
        </form>

        <p className="signup-footer">
          Already have an account?{" "}
          <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;