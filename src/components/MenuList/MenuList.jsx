import { Menu, Modal } from "antd";
import "./MenuList.css";
import { useNavigate } from "react-router-dom";
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
  const [selectedKey, setSelectedKey] = useState("dashboard"); // ✅ Lưu trạng thái menu được chọn

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
        className="custom-logout-modal"
        style={{ top: "50%" }}
      >
        <p>Bạn có chắc chắn muốn đăng xuất không?</p>
      </Modal>

      {/* Menu chính */}
      <Menu
        mode="inline"
        className="menu-bar bar"
        selectedKeys={[selectedKey]} // ✅ Giữ trạng thái menu được chọn
        onClick={(e) => setSelectedKey(e.key)} // ✅ Cập nhật trạng thái khi click
      >
        <Menu.Item
          key="dashboard"
          icon={<RxDashboard />}
          onClick={() => navigate(PATH_NAME.DASHBOARD)}
        >
          Thống kê
        </Menu.Item>

        <Menu.Item
          key="courses"
          icon={<PiUsersThree />}
          onClick={() => navigate(PATH_NAME.PATIENT_ADMIN)}
        >
          Quản lí khách hàng
        </Menu.Item>

        <Menu.Item
          key="topic_area"
          icon={<MdOutlineTopic />}
          onClick={() => navigate(PATH_NAME.PROGRESS)}
        >
          Nhật kí điều trị
        </Menu.Item>

        <Menu.Item
          key="calendar"
          icon={<RxCalendar />}
          onClick={() => navigate(PATH_NAME.CALENDAR_ADMIN)}
        >
          Lịch hẹn
        </Menu.Item>

        <Menu.Item key="logout" icon={<CiLogout />} onClick={showLogoutConfirm}>
          Đăng xuất
        </Menu.Item>
      </Menu>
    </>
  );
};

export default MenuList;
