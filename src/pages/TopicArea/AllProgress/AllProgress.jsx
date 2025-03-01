import { useEffect, useState } from "react";
import { SlArrowRight } from "react-icons/sl";
import {
  Table,
  Modal,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  message,
} from "antd";
import axios from "axios";
import { PATH_NAME } from "../../../constant/pathname";
import "reactjs-popup/dist/index.css";
import { Link, useNavigate } from "react-router-dom";
import CustomModal from "./CustomModal"; // Import Modal mới
import "./AllProgress.css";

const AllProgress = () => {
  const [patients, setPatients] = useState([]); // Danh sách bệnh nhân
  const [progressData, setProgressData] = useState([]); // Lộ trình bệnh nhân
  const [loading, setLoading] = useState(false);
  const [progressLoading, setProgressLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal hiển thị lộ trình
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false); // Modal thêm quá trình điều trị
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // Chứa patientCAID của bệnh nhân đã chọn
  const [doctorList, setDoctorList] = useState([]); // Danh sách bác sĩ
  const [serviceList, setServiceList] = useState([]); // Danh sách dịch vụ
  const [form] = Form.useForm();
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

  // 🟢 Lấy danh sách bác sĩ (đã sửa lỗi)
  const fetchDoctors = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("⚠️ Không có token, vui lòng đăng nhập!");
        return;
      }

      const response = await axios.get(
        `https://backend.tlog.website/api/v1/account/doctor?page=1&size=20`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.isSuccess) {
        const doctorItems =
          response.data.responseRequestModel?.doctorResponses?.items || [];
        setDoctorList(doctorItems);
      }
    } catch (error) {
      console.error("❌ Lỗi lấy danh sách bác sĩ:", error);
    }
  };

  // 🟢 Lấy danh sách dịch vụ (đã sửa lỗi)
  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("⚠️ Không có token, vui lòng đăng nhập!");
        return;
      }

      const response = await axios.get(
        `https://backend.tlog.website/api/v1/service?page=1&size=20`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.isSuccess) {
        const serviceItems =
          response.data.responseRequestModel?.serviceResponses?.items || [];
        setServiceList(serviceItems);
      }
    } catch (error) {
      console.error("❌ Lỗi lấy danh sách dịch vụ:", error);
    }
  };

  const handleCreateTreatment = async (values) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        message.error("⚠️ Không có token, vui lòng đăng nhập!");
        return;
      }

      if (!selectedRowKeys[0]) {
        message.error("⚠️ Vui lòng chọn bệnh nhân trước!");
        return;
      }

      // Chuẩn bị request body
      const requestBody = {
        patientCAID: selectedRowKeys[0], // ID bệnh nhân từ checkbox
        doctorCAID: values.doctorCAID, // ID bác sĩ từ dropdown
        serviceID: values.serviceID, // ID dịch vụ từ dropdown
        totalStep: 10, // Mặc định 10 bước
        note: values.note || "", // Nếu không có ghi chú, gửi chuỗi rỗng
        startedAt: values.startedAt
          ? values.startedAt.format("YYYY-MM-DD")
          : null, // Format ngày đúng
      };

      console.log("📤 Đang gửi request:", requestBody); // Debug kiểm tra request

      // Gửi API
      const response = await axios.post(
        `https://backend.tlog.website/api/v1/progress`,
        requestBody,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.isSuccess) {
        message.success("✅ Tạo quá trình điều trị thành công!");
        setIsCreateModalVisible(false);
        form.resetFields();
      } else {
        message.error("⚠️ Tạo quá trình điều trị thất bại!");
        console.error("❌ API Response:", response.data);
      }
    } catch (error) {
      console.error("❌ Lỗi tạo quá trình điều trị:", error);

      // Kiểm tra nếu lỗi là do bệnh nhân đã có quá trình điều trị
      if (
        error.response?.data?.message ===
        "The patient has this progress already"
      ) {
        message.error(
          "⚠️ Bệnh nhân đã có quá trình điều trị này, không thể tạo thêm!"
        );
      } else {
        message.error(
          `Đã xảy ra lỗi: ${
            error.response?.data?.message || "Vui lòng thử lại!"
          }`
        );
      }
    }
  };

  const patientColumns = [
    {
      title: "Chọn",
      dataIndex: "id",
      render: (_, record) => (
        <input
          type="checkbox"
          checked={selectedRowKeys.includes(record.clinicAccountID)}
          onChange={() => {
            if (selectedRowKeys.includes(record.clinicAccountID)) {
              setSelectedRowKeys([]);
            } else {
              setSelectedRowKeys([record.clinicAccountID]);
            }
          }}
        />
      ),
      width: "5%",
    },
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
    { title: "Bác Sĩ", dataIndex: "fullName", sorter: true, width: "10%" },
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
    fetchDoctors();
    fetchServices();
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
        <button
          type="primary"
          onClick={() => setIsCreateModalVisible(true)}
          disabled={selectedRowKeys.length === 0}
          className="topic_add"
        >
          Thêm Nhật kí điều trị
        </button>
        <Table
          columns={patientColumns}
          rowKey={(record) => record.clinicAccountID}
          dataSource={patients}
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            onChange: (page, pageSize) =>
              setPagination({ current: page, pageSize }),
          }}
        />

        {/* Modal Tạo Quá Trình Điều Trị */}
        <Modal
          title="Thêm Nhật kí điều trị"
          open={isCreateModalVisible}
          onCancel={() => setIsCreateModalVisible(false)}
          onOk={() => form.submit()}
        >
          <Form form={form} layout="vertical" onFinish={handleCreateTreatment}>
            <Form.Item
              name="doctorCAID"
              label="Bác Sĩ"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn bác sĩ">
                {doctorList.map((doc) => (
                  <Select.Option
                    key={doc.clinicAccountID}
                    value={doc.clinicAccountID}
                  >
                    {doc.fullName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="serviceID"
              label="Dịch Vụ"
              rules={[{ required: true }]}
            >
              <Select placeholder="Chọn dịch vụ">
                {serviceList.map((service) => (
                  <Select.Option
                    key={service.serviceID}
                    value={service.serviceID}
                  >
                    {service.serviceName}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="note" label="Ghi chú">
              <Input.TextArea placeholder="Nhập ghi chú" />
            </Form.Item>

            <Form.Item
              name="startedAt"
              label="Ngày bắt đầu"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </Modal>
      </div>

      <CustomModal
        title={`Lộ trình của ${selectedPatient?.fullName}`}
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      >
        <Table
          columns={progressColumns}
          rowKey={(record) => record.patientProgressID}
          dataSource={progressData}
          loading={progressLoading}
          pagination={false}
          bordered
        />
      </CustomModal>
    </div>
  );
};

export default AllProgress;
