import { useState } from "react";
import "./Login.css";
import logo from "../../assets/logo_2.png";
import { FaRegUser } from "react-icons/fa";
import { TfiKey } from "react-icons/tfi";
import axios from "axios";
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
  const [authen, setAuthen] = useState(null);

  // Hàm xử lý đăng nhập
  const handleLogin = async (event) => {
    event.preventDefault();

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
        throw new Error(data.message || "Đăng nhập thất bại.");
      }

      const access_token = data.responseRequestModel.jwtToken.accessToken;
      const refresh_token = data.responseRequestModel.jwtToken.refreshToken;
      if (!access_token) {
        throw new Error("Thiếu accessToken trong phản hồi của server.");
      }

      const decodedToken = jwtDecode(access_token);

      // 🛠 Trích xuất role chính xác từ token
      const role =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];

      // Lưu token vào localStorage
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("refreshToken", refresh_token);

      // Chuyển hướng dựa trên role (cập nhật lại theo dữ liệu đúng)
      if (role === "Staff") {
        navigate(PATH_NAME.DASHBOARD);
      } else if (role === "Doctor") {
        navigate(PATH_NAME.CALENDAR);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  return (
    <div className="login">
      <div className="login-logo-container">
        <img src={logo} alt="SAP Logo" className="login-logo" />
      </div>
      <div className="login-form-container">
        <h2>Welcome Back</h2>
        <p className="login-banner">Log In to Your Account!</p>
        {loginError && <p className="error-message">{loginError}</p>}
        <form onSubmit={handleLogin}>
          <div className="login-input-wrapper">
            <FaRegUser className="login-input-icon" />
            <input
              type="text"
              placeholder="Username"
              className="login-input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login-input-wrapper">
            <TfiKey className="login-input-icon" />
            <input
              type="password"
              placeholder="Password"
              className="login-input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
