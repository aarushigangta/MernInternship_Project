import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignUp) {
      // Handle registration logic here if you have an API for registration
      if (!username || !email || !password) {
        setErrorMessage("Please fill all fields.");
        return;
      }
      
      // Here you could send a POST request to the backend to register the user
      console.log("New user registered:", { username, email, password });
      setErrorMessage("");
      navigate("/all-news"); // Redirect after registration
    } else {
      if (!username || !password) {
        setErrorMessage("Please enter username and password.");
        return;
      }

      // Perform login via API
      try {
        setIsLoading(true); // Set loading state to true while waiting for response
        const response = await fetch("http://localhost:5000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();
        setIsLoading(false); // Set loading state to false after response

        if (data.success) {
          setErrorMessage("");
          navigate("/all-news"); // Navigate to the news page if login is successful
        } else {
          setErrorMessage(data.message || "Invalid credentials");
        }
      } catch (error) {
        console.error("Login error:", error);
        setErrorMessage("Server error, please try again later.");
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    else if (name === "email") setEmail(value);
    else if (name === "password") setPassword(value);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>{isSignUp ? "📰 Join the News Feed" : "🔐 Welcome Back!"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Username"
            onChange={handleChange}
          />
          {isSignUp && (
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={handleChange}
            />
          )}
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={handleChange}
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Processing..." : isSignUp ? "Create Account" : "Sign In"}
          </button>
          <p className="switch-mode">
            {isSignUp ? "Already subscribed?" : "New to our platform?"}{" "}
            <span
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMessage("");
              }}
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </p>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Login;
