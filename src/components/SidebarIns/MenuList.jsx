import { PATH_NAME } from "../../constant/pathname";
import { Link, useNavigate } from "react-router-dom";
import { RxCalendar } from "react-icons/rx";
import { LiaGraduationCapSolid } from "react-icons/lia";
import { Menu } from "antd";
import { PiUsersThree } from "react-icons/pi";
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
      key: "calender",
      icon: <RxCalendar />,
      label: <Link to={PATH_NAME.CALENDAR}>Lịch khám</Link>,
    },
    // {
    //   key: "courses",
    //   icon: <PiUsersThree />,
    //   label: <Link to={PATH_NAME.COURSE_INSTRUCTOR}>Quản lí khách hàng</Link>,
    // },
    {
      key: "courses",
      icon: <PiUsersThree />,
      label: <Link to={PATH_NAME.PATIENT}>Quản lí khách hàng</Link>,
    },
    {
      key: "logout",
      icon: <CiLogout />,
      label: "Đăng xuất",
      onClick: handleLogout,
    },
  ];
  return <Menu items={items} mode="inline" className="menu-bar"></Menu>;
};

export default MenuList;
