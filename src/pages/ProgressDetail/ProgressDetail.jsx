import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Steps,
  Spin,
  Card,
  Tag,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
} from "antd";
import "antd/dist/reset.css"; // Reset CSS để tránh xung đột
import "./ProgressDetail.css"; // File CSS riêng

const { Step } = Steps;

const STATUS_MAP = {
  NotStart: { label: "Chưa bắt đầu", color: "default", value: 0 },
  InProcess: { label: "Đang thực hiện", color: "blue", value: 1 },
  Completed: { label: "Hoàn thành", color: "green", value: 2 },
  Cancelled: { label: "Đã hủy", color: "red", value: 3 },
  Skiped: { label: "Bỏ qua", color: "orange", value: 4 },
};

// Chỉ cho phép cập nhật 3 trạng thái này
const UPDATEABLE_STATUS = [
  STATUS_MAP.Completed,
  STATUS_MAP.Cancelled,
  STATUS_MAP.Skiped,
];

const ProgressDetail = () => {
  const { progressID } = useParams(); // Lấy progressID từ URL
  const [progressDetails, setProgressDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [selectedProgress, setSelectedProgress] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(""); // Trạng thái được chọn từ dropdown
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal hiển thị form tạo mới
  const [form] = Form.useForm();

  // 🟢 Gọi API lấy danh sách progress detail
  const fetchProgressDetails = async () => {
    if (!progressID) {
      console.error("⚠️ Không có progressID!");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("⚠️ Không có token, vui lòng đăng nhập!");
        return;
      }

      const response = await axios.get(
        `https://backend.tlog.website/api/v1/progress/patient/detail?progressID=${progressID}&page=1&size=20`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.isSuccess) {
        setProgressDetails(
          response.data.responseRequestModel.progressDetailResponse.items
        );
      }
    } catch (error) {
      console.error("❌ Lỗi lấy chi tiết lộ trình:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Gọi API tạo mới Progress Detail
  const handleCreateProgressDetail = async (values) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        message.error("⚠️ Không có token, vui lòng đăng nhập!");
        return;
      }

      const existingStep = progressDetails.find(
        (detail) => detail.name.toLowerCase() === values.name.toLowerCase()
      );

      if (existingStep) {
        message.error("⚠️ Bước điều trị này đã tồn tại, không thể tạo trùng!");
        return;
      }

      const requestBody = {
        progressID,
        name: values.name,
        description: values.description || "",
        progressStatus: STATUS_MAP.NotStart.value, // Luôn là NotStart khi tạo mới
        startedAt: values.startedAt.format("YYYY-MM-DD"),
      };

      const response = await axios.post(
        `https://backend.tlog.website/api/v1/progress/detail`,
        requestBody,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.isSuccess) {
        message.success("✅ Tạo bước điều trị thành công!");
        setIsModalVisible(false);
        form.resetFields();
        fetchProgressDetails();
      } else {
        message.error("⚠️ Tạo bước điều trị thất bại!");
      }
    } catch (error) {
      console.error("❌ Lỗi tạo bước điều trị:", error);
      message.error(
        `Đã xảy ra lỗi: ${error.response?.data?.message || "Vui lòng thử lại!"}`
      );
    }
  };

  // 🟢 Bắt đầu một bước điều trị (chuyển từ NotStart -> InProcess)
  const handleStartProgress = async (progressDetailID) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        message.error("⚠️ Không có token, vui lòng đăng nhập!");
        return;
      }

      const requestBody = { progressDetailID, progressID };

      const response = await axios.put(
        `https://backend.tlog.website/api/v1/progress/detail/start`,
        requestBody,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.isSuccess) {
        message.success("✅ Bắt đầu bước điều trị thành công!");
        fetchProgressDetails();
      } else {
        message.error("⚠️ Không thể bắt đầu bước điều trị!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi bắt đầu bước điều trị:", error);
      message.error("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  // 🟢 Hiển thị modal cập nhật trạng thái
  const showUpdateModal = (progressDetail) => {
    setSelectedProgress(progressDetail);
    setSelectedStatus("");
    setUpdateModalVisible(true);
  };

  // 🟢 Cập nhật trạng thái của bước điều trị
  const handleUpdateProgress = async () => {
    if (!selectedStatus) {
      message.warning("⚠️ Vui lòng chọn trạng thái cập nhật!");
      return;
    }

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        message.error("⚠️ Không có token, vui lòng đăng nhập!");
        return;
      }

      const requestBody = {
        progressDetailID: selectedProgress.progressDetailID,
        progressID,
        progressStatus: parseInt(selectedStatus),
      };

      const response = await axios.put(
        `https://backend.tlog.website/api/v1/progress/detail/update`,
        requestBody,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.isSuccess) {
        message.success("✅ Cập nhật trạng thái thành công!");
        setUpdateModalVisible(false);
        fetchProgressDetails();
      } else {
        message.error("⚠️ Không thể cập nhật trạng thái!");
      }
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật trạng thái:", error);
      message.error("Đã xảy ra lỗi, vui lòng thử lại!");
    }
  };

  // 🔄 Gọi API khi component mount
  useEffect(() => {
    fetchProgressDetails();
  }, [progressID]);

  return (
    <div className="progress-container">
      <h2>Chi tiết lộ trình</h2>

      {/* Nút Thêm Bước Điều Trị */}
      <button
        className="add-progress-button"
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: "20px" }}
      >
        Thêm Bước Điều Trị
      </button>

      {/* Hiển thị danh sách Steps */}
      {loading ? (
        <Spin size="large" />
      ) : (
        <Steps direction="vertical" current={progressDetails.length - 1}>
          {progressDetails.map((detail) => {
            const status = STATUS_MAP[detail.progressStatusDisplay] || {
              label: "Không xác định",
              color: "black",
            };

            return (
              <Step
                key={detail.progressDetailID}
                title={
                  <span>
                    <strong>Bước {detail.step}:</strong> {detail.name}
                  </span>
                }
                status={
                  detail.progressStatusDisplay === "Completed"
                    ? "finish"
                    : detail.progressStatusDisplay === "InProcess"
                    ? "process"
                    : "wait"
                }
                description={
                  <Card className="progress-card">
                    <p>
                      <strong>Trạng thái:</strong>{" "}
                      <Tag color={status.color}>{status.label}</Tag>
                    </p>
                    <p>
                      <strong>Mô tả:</strong> {detail.description}
                    </p>
                    <p>
                      <strong>Bắt đầu:</strong> {detail.startedAt}
                    </p>
                    <p>
                      <strong>Hoàn thành:</strong>{" "}
                      {detail.completedAt
                        ? detail.completedAt
                        : "Đang thực hiện"}
                    </p>

                    {/* Hiển thị nút điều khiển */}
                    {detail.progressStatusDisplay === "NotStart" ? (
                      <Button
                        type="primary"
                        onClick={() =>
                          handleStartProgress(detail.progressDetailID)
                        }
                      >
                        Bắt đầu
                      </Button>
                    ) : detail.progressStatusDisplay === "InProcess" ? (
                      <Button
                        type="default"
                        onClick={() => showUpdateModal(detail)}
                      >
                        Cập nhật
                      </Button>
                    ) : null}
                  </Card>
                }
              />
            );
          })}
        </Steps>
      )}

      {/* Modal Thêm Bước Điều Trị */}
      <Modal
        title="Thêm Bước Điều Trị"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleCreateProgressDetail}
        >
          <Form.Item
            name="name"
            label="Tên bước"
            rules={[{ required: true, message: "Vui lòng nhập tên bước!" }]}
          >
            <Input placeholder="Nhập tên bước điều trị" />
          </Form.Item>
          <Form.Item name="description" label="Mô tả bước điều trị">
            <Input.TextArea placeholder="Nhập mô tả" />
          </Form.Item>
          <Form.Item
            name="startedAt"
            label="Ngày bắt đầu"
            rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!" }]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal cập nhật trạng thái */}
      <Modal
        title="Cập nhật trạng thái"
        open={updateModalVisible}
        onCancel={() => setUpdateModalVisible(false)}
        onOk={handleUpdateProgress}
      >
        <p>Chọn trạng thái mới:</p>
        {UPDATEABLE_STATUS.length > 0 ? (
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{ width: "100%", padding: "10px", display: "block" }}
          >
            <option value="">-- Chọn trạng thái --</option>
            {UPDATEABLE_STATUS.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        ) : (
          <p>Không có trạng thái nào để cập nhật.</p>
        )}
      </Modal>
    </div>
  );
};

export default ProgressDetail;
