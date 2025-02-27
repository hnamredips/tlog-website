import "./Navbar.css";
import { useState, useRef, useEffect } from "react";
import { Layout } from "antd";

import { GoSearch } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import logo from "../../assets/logo_2.png";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const { Header } = Layout;
const Navbar = () => {
  const { auth } = useAuth();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const [userData, setUserData] = useState(null);

  const handleClickOutside = (event) => {
    if (
      profileDropdownRef.current &&
      !profileDropdownRef.current.contains(event.target)
    ) {
      setIsProfileDropdownOpen(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        "https://swdsapelearningapi.azurewebsites.net/api/User/api/users"
      );
      const users = response.data.$values;
      const currentUser = users.find((user) => user.id === auth.userId); // Đối chiếu với userId từ auth
      if (currentUser) {
        setUserData(currentUser); // Lưu thông tin user vào state
      } else {
        console.error("User not found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (auth && auth.userId) {
      fetchUserData();
    }
  }, [auth]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  return (
    <Layout>
      <Header className="header">
        <div className="navbar">
          <div className="sidebar-logo">
            <div className="sidebar-logo-icon">
              <img src={logo} alt="Logo" className="sidebar-logo-img" />
            </div>
          </div>
        </div>
        <div className="navbar-right">
          <button className="navbar-noti-button" type="button">
            <IoNotificationsOutline className="navbar-noti-icon" />
            <span className="navbar-point"></span>
          </button>
          {/* Profile Button */}
          <button
            className="navbar-profile-button"
            onClick={toggleProfileDropdown}
          >
            {userData && userData.avatar ? (
              <img
                src={userData.avatar}
                alt="User Avatar"
                className="navbar-profile-avatar"
              />
            ) : (
              <span className="navbar-profile-initials">
                {userData?.fullName?.charAt(0) || "U"}
              </span>
            )}
          </button>
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
