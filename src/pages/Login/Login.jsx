import { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo_2.png";
import { FaRegUser } from "react-icons/fa";
import { TfiKey } from "react-icons/tfi";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { PATH_NAME } from "../../constant/pathname";
import useAuth from "../../components/hooks/useAuth";

const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError(""); // Reset error message

    try {
      const response = await fetch(
        "https://backend.tlog.website/api/v1/auth/sign-in",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();
      if (!data.isSuccess) {
        throw new Error(data.message || "Login failed.");
      }

      const access_token = data.responseRequestModel.jwtToken.accessToken;
      const refresh_token = data.responseRequestModel.jwtToken.refreshToken;
      if (!access_token) {
        throw new Error("Access token missing from server response.");
      }

      const decodedToken = jwtDecode(access_token);
      const role =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      // Store tokens in localStorage
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);

      // Set auth context
      setAuth({ access_token, refresh_token, role });

      // Redirect based on role
      if (role === "Staff") {
        navigate(PATH_NAME.DASHBOARD);
      } else if (role === "Doctor") {
        navigate(PATH_NAME.CALENDAR);
      } else {
        navigate("/");
      }
    } catch (error) {
      setLoginError(error.message); // Display error to user
      console.error("Login error:", error);
    }
  };

  // Handler for logo click to navigate to homepage
  const handleLogoClick = () => {
    navigate(PATH_NAME.HOMEPAGE);
  };

  return (
    <div className="login">
      <div className="login-logo-container">
        <img
          src={logo}
          alt="SAP Logo"
          className="login-logo"
          onClick={handleLogoClick}
          style={{ cursor: "pointer" }} // Optional: Adds a pointer cursor to indicate clickability
        />
      </div>
      <div className="login-form-container">
        <h2>Welcome Back</h2>
        <p className="login-banner">Log In to Your Account</p>
        {loginError && <p className="error-message">{loginError}</p>}
        <form onSubmit={handleLogin}>
          <div className="login-input-wrapper">
            <FaRegUser className="login-input-icon" aria-hidden="true" />
            <input
              type="text"
              placeholder="Username"
              className="login-input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              aria-label="Username"
            />
          </div>
          <div className="login-input-wrapper">
            <TfiKey className="login-input-icon" aria-hidden="true" />
            <input
              type="password"
              placeholder="Password"
              className="login-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="Password"
            />
          </div>
          <div className="login-remember-me">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
          <button type="submit" className="login-btn sign-in">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
