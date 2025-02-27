import { Menu } from "antd";
import "./MenuList.css";
import { Link, useNavigate } from "react-router-dom";
import { PATH_NAME } from "../../constant/pathname";
import { RxDashboard, RxCalendar } from "react-icons/rx";
import { PiUsersThree, PiCoinsLight } from "react-icons/pi";
import { MdOutlineTopic } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import useAuth from "../hooks/useAuth";

const MenuList = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("Authen");
    setAuth(null);
    navigate(PATH_NAME.LOGIN);
  };
  const items = [
    {
      key: "dashboard",
      icon: <RxDashboard />,
      label: <Link to={PATH_NAME.DASHBOARD}>Thống kê</Link>,
    },
    {
      key: "courses",
      icon: <PiUsersThree />,
      label: <Link to={PATH_NAME.PATIENT_ADMIN}>Quản lí khách hàng</Link>,
    },
    {
      key: "topic_area",
      icon: <MdOutlineTopic />,
      label: <Link to={PATH_NAME.PROGRESS}> Nhật kí điều trị</Link>,
    },
    {
      key: "calendar",
      icon: <RxCalendar />,
      label: <Link to={PATH_NAME.CALENDAR_ADMIN}>Lịch hẹn</Link>,
    },
    {
      key: "logout",
      icon: <CiLogout />,
      label: "Đăng xuất",
      onClick: handleLogout,
    },
  ];
  return <Menu items={items} mode="inline" className="menu-bar bar"></Menu>;
};

export default MenuList;
