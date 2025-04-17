import { PATH_NAME } from "../../constant/pathname";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxCalendar } from "react-icons/rx";
import { PiUsersThree } from "react-icons/pi";
import { CiLogout } from "react-icons/ci";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { Menu, Modal } from "antd";

const MenuList = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const getSelectedKey = () => {
    if (location.pathname.includes(PATH_NAME.CALENDAR)) return "calendar";
    if (location.pathname.includes(PATH_NAME.PATIENT)) return "courses";
    return "";
  };

  const selectedKey = getSelectedKey();

  const showLogoutConfirm = () => setIsModalVisible(true);

  const handleLogout = () => {
    localStorage.removeItem("Authen");
    setAuth(null);
    navigate(PATH_NAME.LOGIN);
  };

  const items = [
    {
      key: "calendar",
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

      <Menu
        items={items}
        mode="inline"
        className="menu-bar"
        selectedKeys={[selectedKey]}
        onClick={({ key, domEvent }) => {
          if (key === "logout") {
            domEvent.preventDefault();
          }
        }}
      />
    </>
  );
};

export default MenuList;
