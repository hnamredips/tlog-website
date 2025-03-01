import { Menu, Modal } from "antd"; // Thêm Modal từ Ant Design
import "./MenuList.css";
import { Link, useNavigate } from "react-router-dom";
import { PATH_NAME } from "../../constant/pathname";
import { RxDashboard, RxCalendar } from "react-icons/rx";
import { PiUsersThree } from "react-icons/pi";
import { MdOutlineTopic } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const MenuList = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Xử lý hiển thị popup khi bấm Đăng xuất
  const showLogoutConfirm = () => {
    setIsModalVisible(true);
  };

  // Xác nhận đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("Authen");
    setAuth(null);
    navigate(PATH_NAME.LOGIN);
  };

  return (
    <>
      {/* Popup Xác nhận Đăng xuất */}
      <Modal
        title="Xác nhận đăng xuất"
        open={isModalVisible}
        onOk={handleLogout}
        onCancel={() => setIsModalVisible(false)}
        okText="Đăng xuất"
        cancelText="Hủy"
        className="custom-logout-modal" // Áp dụng CSS
        style={{ top: "50%" }}
      >
        <p>Bạn có chắc chắn muốn đăng xuất không?</p>
      </Modal>

      {/* Menu chính */}
      <Menu mode="inline" className="menu-bar bar">
        <Menu.Item key="dashboard" icon={<RxDashboard />}>
          <Link to={PATH_NAME.DASHBOARD}>Thống kê</Link>
        </Menu.Item>

        <Menu.Item key="courses" icon={<PiUsersThree />}>
          <Link to={PATH_NAME.PATIENT_ADMIN}>Quản lí khách hàng</Link>
        </Menu.Item>

        <Menu.Item key="topic_area" icon={<MdOutlineTopic />}>
          <Link to={PATH_NAME.PROGRESS}>Nhật kí điều trị</Link>
        </Menu.Item>

        <Menu.Item key="calendar" icon={<RxCalendar />}>
          <Link to={PATH_NAME.CALENDAR_ADMIN}>Lịch hẹn</Link>
        </Menu.Item>

        <Menu.Item key="logout" icon={<CiLogout />} onClick={showLogoutConfirm}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </>
  );
};

export default MenuList;
