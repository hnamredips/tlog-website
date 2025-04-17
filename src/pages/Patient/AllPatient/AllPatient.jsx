import { useEffect, useState } from "react";
import { Button, Table, Form, Radio } from "antd";
import Popup from "reactjs-popup";
import { SlArrowRight } from "react-icons/sl";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import qs from "qs";
import { PATH_NAME } from "../../../constant/pathname";
import "reactjs-popup/dist/index.css";
import "./AllPatient.css";
import axios from "axios";

const AllPatient = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // 🟢 Gọi API lấy danh sách bệnh nhân
  const fetchPatients = async (page = 1, size = 50) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken"); // 🟢 Lấy token từ localStorage

      if (!token) {
        console.error("⚠️ Token không tồn tại. Vui lòng đăng nhập lại!");
        return;
      }

      const response = await axios.get(
        `https://backend.tlog.website/api/v1/account/patient?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // 🟢 Gửi token lên API
          },
        }
      );

      if (response.data.isSuccess) {
        const { items, totalItems } =
          response.data.responseRequestModel.patientResponse;
        setData(items);
        setTableParams((prev) => ({
          ...prev,
          pagination: { ...prev.pagination, total: totalItems },
        }));
      }
    } catch (error) {
      console.error("❌ Error fetching patients:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔄 Lấy dữ liệu khi component mount hoặc thay đổi page
  useEffect(() => {
    fetchPatients(
      tableParams.pagination.current,
      tableParams.pagination.pageSize
    );
  }, [tableParams.pagination.current, tableParams.pagination.pageSize]);

  // 📊 Xử lý thay đổi trang
  const handleTableChange = (pagination) => {
    setTableParams({ pagination });
  };

  // 🗂️ Cấu hình cột của bảng
  const columns = [
    {
      title: "No.",
      sorter: true,
      width: "7%",
      render: (_, __, index) =>
        (tableParams.pagination.current - 1) * tableParams.pagination.pageSize +
        index +
        1,
    },
    {
      title: "Họ và Tên",
      dataIndex: "fullName",
      sorter: (a, b) => (a.fullName || "").localeCompare(b.fullName || ""),
      width: "15%",
    },
    {
      title: "Giới Tính",
      dataIndex: "genderDisplay",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      render: (genderDisplay) => (
        <span
          className={
            genderDisplay.toLowerCase() === "male"
              ? "status-online"
              : "status-offline"
          }
        >
          {genderDisplay.toLowerCase()}
        </span>
      ),
      width: "8%",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      sorter: true,
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      width: "15%",
    },
    {
      title: "Phòng Khám",
      dataIndex: "clinicName",
      sorter: true,
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      width: "8%",
      render: (isActive) => (
        <span
          className={`course_status_indicator ${
            isActive ? "active" : "inactive"
          }`}
        />
      ),
    },
  ];

  return (
    <div className="course">
      <div className="course_title_container">
        <div className="course_title_left">
          <div className="course_title">Quản lí bệnh nhân</div>
        </div>
        <div className="course_course_right">
          <div className="course_course">Quản lí bệnh nhân</div>
          <SlArrowRight className="course_icon_right" />
          <div className="course_all_courses">Tất cả bệnh nhân</div>
        </div>
      </div>

      <div className="course_table_container">
        <Link to={PATH_NAME.ADD_PATIENT}>
          <button className="course_add">Tạo bệnh nhân</button>
        </Link>

        <Table
          columns={columns}
          rowKey={(record) => record.clinicAccountID}
          dataSource={data}
          loading={loading}
          pagination={{
            ...tableParams.pagination,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
          }}
          onChange={handleTableChange}
        />
      </div>
    </div>
  );
};

export default AllPatient;
