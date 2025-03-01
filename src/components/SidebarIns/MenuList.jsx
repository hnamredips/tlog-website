import { PATH_NAME } from "../../constant/pathname";
import { Link, useNavigate } from "react-router-dom";
import { RxCalendar } from "react-icons/rx";
import { LiaGraduationCapSolid } from "react-icons/lia";
import { PiUsersThree } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { Menu, Modal } from "antd";

const MenuList = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");

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

  const items = [
    {
      key: "calender",
      icon: <RxCalendar />,
      label: "Lịch khám",
      onClick: () => navigate(PATH_NAME.CALENDAR),
    },
    {
      key: "courses",
      icon: <PiUsersThree />,
      label: "Quản lí khách hàng",
      onClick: () => navigate(PATH_NAME.PATIENT),
    },
    {
      key: "logout",
      icon: <CiLogout />,
      label: "Đăng xuất",
      onClick: showLogoutConfirm,
    },
  ];

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
      <Menu items={items} mode="inline" className="menu-bar"></Menu>;
    </>
  );
};

export default MenuList;
