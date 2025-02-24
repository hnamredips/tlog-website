import { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import { Table, Modal } from "antd";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdModeEditOutline } from "react-icons/md";
import axios from "axios";
import Popup from "reactjs-popup";
import { PATH_NAME } from "../../../constant/pathname";
import "reactjs-popup/dist/index.css";
import { Link, useNavigate } from "react-router-dom";
import "./AllProgress.css";

const AllProgress = () => {
  const [patients, setPatients] = useState([]); // Danh sách bệnh nhân
  const [progressData, setProgressData] = useState([]); // Lộ trình bệnh nhân
  const [loading, setLoading] = useState(false);
  const [progressLoading, setProgressLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal hiển thị lộ trình
  const [selectedPatient, setSelectedPatient] = useState(null); // Lưu bệnh nhân được chọn
  const [pagination, setPagination] = useState({ current: 1, pageSize: 20 });
  const navigate = useNavigate();

  // 🟢 Hàm gọi API danh sách bệnh nhân
  const fetchPatients = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("⚠️ Không có token, vui lòng đăng nhập!");
        return;
      }

      const response = await axios.get(
        `https://backend.tlog.website/api/v1/account/patient?page=${pagination.current}&size=${pagination.pageSize}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.isSuccess) {
        setPatients(response.data.responseRequestModel.patientResponse.items);
      }
    } catch (error) {
      console.error("❌ Lỗi lấy danh sách bệnh nhân:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Hàm gọi API lộ trình của bệnh nhân
  const fetchProgress = async (clinicAccountID) => {
    setProgressLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("⚠️ Không có token, vui lòng đăng nhập!");
        return;
      }

      const response = await axios.get(
        `https://backend.tlog.website/api/v1/progress/patient?patientCAID=${clinicAccountID}&page=${pagination.current}&size=${pagination.pageSize}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.isSuccess) {
        setProgressData(
          response.data.responseRequestModel.progressResponse.items
        );
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error("❌ Lỗi lấy lộ trình bệnh nhân:", error);
    } finally {
      setProgressLoading(false);
    }
  };

  const patientColumns = [
    {
      title: "No.",
      sorter: true,
      width: "7%",
      render: (_, __, index) =>
        (pagination.current - 1) * pagination.pageSize + index + 1,
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
    {
      title: "Hành động",
      render: (_, record) => (
        <button
          className="topic_button_edit"
          onClick={() => {
            setSelectedPatient(record);
            fetchProgress(record.clinicAccountID);
          }}
          loading={progressLoading}
        >
          Xem lộ trình
        </button>
      ),
      width: "10%",
    },
  ];

  // 🗂️ Cột danh sách lộ trình bệnh nhân
  const progressColumns = [
    { title: "Dịch Vụ", dataIndex: "serviceName", sorter: true, width: "10%" },
    { title: "Bác Sĩ", dataIndex: "doctorName", sorter: true, width: "10%" },
    {
      title: "Bước hiện tại",
      dataIndex: "currentStep",
      sorter: true,
      width: "7%",
    },
    { title: "Tổng Bước", dataIndex: "totalStep", sorter: true, width: "7%" },
    { title: "Ghi chú", dataIndex: "note", sorter: true, width: "20%" },
    { title: "Bắt đầu", dataIndex: "startedAt", sorter: true, width: "15%" },
    {
      title: "Chi tiết",
      render: (_, record) => (
        <Link to={`/progress-detail/${record.patientProgressID}`}>
          <button className="detail-button">Xem chi tiết</button>
        </Link>
      ),
      width: "10%",
    },
  ];

  // 🔄 Gọi API khi component mount
  useEffect(() => {
    fetchPatients();
  }, [pagination.current, pagination.pageSize]);

  return (
    <div className="topic-area">
      <div className="topic_title_container">
        <div className="topic_title_left">
          <div className="topic_title">Nhật kí điều trị</div>
        </div>
        <div className="topic_area_right">
          <div className="topic_topic">Nhật kí điều trị</div>
          <SlArrowRight className="topic_icon_right" />
          <div className="topic_all_topics">Xem tất cả</div>
        </div>
      </div>

      <div className="topic_table_container">
        {/* <Link to={PATH_NAME.ADD_TOPIC}>
          <button className="topic_add">Tạo mới</button>
        </Link> */}
        <Table
          columns={patientColumns}
          rowKey={(record) => record.id}
          dataSource={patients}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            onChange: (page, pageSize) =>
              setPagination({ current: page, pageSize }),
          }}
        />
      </div>

      {/* Modal hiển thị lộ trình */}
      <Modal
        title={
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            Lộ trình của {selectedPatient?.fullName}
          </span>
        }
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800} // Điều chỉnh độ rộng Modal
      >
        <div className="progress-table-container">
          <Table
            columns={progressColumns}
            rowKey={(record) => record.patientProgressID}
            dataSource={progressData}
            loading={progressLoading}
            pagination={false}
            bordered
          />
        </div>
      </Modal>
    </div>
  );
};

export default AllProgress;
