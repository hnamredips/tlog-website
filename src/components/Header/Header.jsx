import React from "react";
import { Link as RouterLink } from "react-router-dom"; // Ensure you have react-router-dom installed
import { Link as ScrollLink } from "react-scroll";
import { PATH_NAME } from "../../constant/pathname";
import logo from "../../assets/logo.svg";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="TLog Logo" className="logo" />
      <div className="nav-container">
        <nav>
          <ul className="nav-list">
            <li>
              <RouterLink to={PATH_NAME.HOMEPAGE}>Trang chủ</RouterLink>
            </li>
            <li>
              <RouterLink to={PATH_NAME.PRICING}>Bảng giá</RouterLink>
            </li>
            <li>
              <ScrollLink to="history" smooth={true} duration={500}>
                Về TLog
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="contact" smooth={true} duration={500}>
                Liên hệ
              </ScrollLink>
            </li>
          </ul>
        </nav>
        <RouterLink to={PATH_NAME.LOGIN}>
          <button className="login-button">Đăng nhập</button>
        </RouterLink>
      </div>
    </header>
  );
};

export default Header;
