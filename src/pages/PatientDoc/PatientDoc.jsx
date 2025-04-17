import { useEffect, useState } from "react";
import { Table } from "antd";
import { SlArrowRight } from "react-icons/sl";
import { Link } from "react-router-dom";
import axios from "axios";
import UploadImageModal from "../../components/UploadImageModal/UploadImageModal";
import { useNavigate } from "react-router-dom";
import "./PatientDoc.css";

const DoctorPatientList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchDoctorPatients = async (page = 1, size = 10) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("⚠️ Token không tồn tại. Vui lòng đăng nhập lại!");
        return;
      }

      const response = await axios.get(
        `https://backend.tlog.website/api/v1/account/patient?page=${page}&size=${size}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
      console.error("❌ Lỗi khi lấy danh sách bệnh nhân:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorPatients(
      tableParams.pagination.current,
      tableParams.pagination.pageSize
    );
  }, [tableParams.pagination.current, tableParams.pagination.pageSize]);

  const handleTableChange = (pagination) => {
    setTableParams({ pagination });
  };

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
      width: "10%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "15%",
    },
    {
      title: "Phòng Khám",
      dataIndex: "clinicName",
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "isActive",
      render: (isActive) => (
        <span
          className={`status-indicator ${isActive ? "active" : "inactive"}`}
        />
      ),
      width: "8%",
    },
    {
      title: "Hành động",
      dataIndex: "clinicAccountID",
      key: "action",
      render: (clinicAccountID) => (
        <UploadImageModal patientCAID={clinicAccountID} />
      ),
      width: "15%",
    },
  ];

  return (
    <div className="doctor-patient-list">
      <div className="patient_title_container">
        <div className="patient_title_left">
          <div className="patient_title">Quản lí bệnh nhân</div>
        </div>
        <div className="patient_patient_right">
          <div className="patient_patient">Quản lí bệnh nhân</div>
          <SlArrowRight className="patient_icon_right" />
          <div className="patient_all_patients">Tất cả bệnh nhân</div>
        </div>
      </div>

      <div className="table-container">
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

export default DoctorPatientList;
