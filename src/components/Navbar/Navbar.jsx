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
              <img src={logo} alt="" className="sidebar-logo-img" />
            </div>
          </div>

          <form className="navbar-form">
            <div className="navbar-position">
              <button className="navbar-search-button" type="submit">
                <GoSearch className="navbar-search-icon" />
              </button>
              <input
                type="text"
                className="navbar-search"
                placeholder="Search..."
              />
            </div>
          </form>
        </div>
        <div className="navbar-right">
          <button className="navbar-noti-button" type="button">
            <IoNotificationsOutline className="navbar-noti-icon" />
            <span className="navbar-point"></span>
          </button>
          <button
            className="navbar-button-name"
            ref={profileDropdownRef}
            onClick={toggleProfileDropdown}
          >
            {userData ? userData.fullname : "User"}
          </button>
          {isProfileDropdownOpen && (
            <div className="navbar-dropdowns">
              <div className="navbar-dropdown-item">
                <div className="navbar-message">
                  <h6>
                    {userData.role.charAt(0).toUpperCase() +
                      userData.role.slice(1)}
                  </h6>
                  <p>{userData.email}</p>
                </div>
              </div>
              <div className="navbar-profile-wrapper">
                <IoSettingsOutline className="navbar-icon" />
                <div className="navbar-profile-item">Account Setting</div>
              </div>
            </div>
          )}
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
