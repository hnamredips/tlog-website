import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import logo from "../../assets/logo.svg";
import "./Footer.css";

const Footer = () => {
  return (
    // <footer className="footer">
    //   <div className="footer-content">
    //     <div className="footer-section">
    //       <h3>TLog</h3>
    //       <p>© 2024 TLog - Bản quyền đã được bảo hộ</p>
    //     </div>
    //     <div className="footer-section">
    //       <h3>Mạng xã hội</h3>
    //       <div className="social-icons">
    //         <a href="#">
    //           <FaFacebook />
    //         </a>
    //         <a href="#">
    //           <FaTwitter />
    //         </a>
    //         <a href="#">
    //           <FaInstagram />
    //         </a>
    //       </div>
    //     </div>
    //     <div className="footer-section">
    //       <h3>Liên kết</h3>
    //       <ul>
    //         <li>
    //           <a href="#">Career</a>
    //         </li>
    //         <li>
    //           <a href="#">Support</a>
    //         </li>
    //         <li>
    //           <a href="#">Privacy policy</a>
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="footer-section">
    //       <h3>Liên hệ</h3>
    //       <p>Hỗ trợ khách hàng 24/7</p>
    //       <p>tlogsoftware@gmail.com</p>
    //       <p>0979798888</p>
    //       <p>
    //         Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Hồ Chí
    //         Minh
    //       </p>
    //     </div>
    //   </div>
    // </footer>
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Logo Section */}
          <div className="footer-logo">
            <img src={logo} alt="TLOG Dental Care" className="logo-image" />
          </div>

          {/* Links Section */}
          <div className="footer-links">
            <div className="links-column">
              <h3>Mạng xã hội</h3>
              <ul>
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
              </ul>
            </div>
            <div className="links-column">
              <ul>
                <li>
                  <a href="#">Career</a>
                </li>
                <li>
                  <a href="#">Support</a>
                </li>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Section */}
          <div className="footer-contact">
            <h3>Liên hệ: Hỗ trợ khách hàng 24/7</h3>
            <p className="email">tlogsoftware@gmail.com</p>
            <div className="address">
              <h4>Địa chỉ</h4>
              <p>
                Lô E2a-7, Đường D1, Đ. D1,
                <br />
                Long Thạnh Mỹ, Thành
                <br />
                Phố Thủ Đức, Hồ Chí Minh
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p>© 2024 TLog - Bản quyền đã được bảo hộ</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
