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
  const [selectedKey, setSelectedKey] = useState("calender"); // Mặc định là mục đầu tiên

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

  // Hàm xử lý click vào menu item
  const handleMenuClick = (key, onClick) => {
    setSelectedKey(key); // Cập nhật trạng thái selectedKey
    if (onClick) onClick();
  };

  const items = [
    {
      key: "calender",
      icon: <RxCalendar />,
      label: <Link to={PATH_NAME.CALENDAR}>Quản lý Lịch hẹn</Link>,
    },
    {
      key: "courses",
      icon: <PiUsersThree />,
      label: <Link to={PATH_NAME.PATIENT}>Quản lý Bệnh nhân</Link>,
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

      {/* Menu với selectedKeys */}
      <Menu
        items={items}
        mode="inline"
        className="menu-bar"
        selectedKeys={[selectedKey]} // Gán selectedKey
      />
    </>
  );
};

export default MenuList;
