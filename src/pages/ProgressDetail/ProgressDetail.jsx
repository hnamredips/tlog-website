import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Steps, Spin, Card } from "antd"; // Import Ant Design
import "antd/dist/reset.css"; // Reset CSS để tránh xung đột
import "./ProgressDetail.css"; // File CSS riêng

const { Step } = Steps;

const ProgressDetail = () => {
  const { progressID } = useParams(); // Lấy progressID từ URL
  console.log("🔍 progressID từ useParams:", progressID); // Kiểm tra xem có nhận được ID không

  const [progressDetails, setProgressDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!progressID) {
      console.error("⚠️ Không có progressID!");
      return;
    }

    const fetchProgressDetails = async () => {
      try {
        const token = localStorage.getItem("token");
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

    fetchProgressDetails();
  }, [progressID]);

  return (
    <div className="progress-container">
      <h2>Chi tiết lộ trình</h2>
      {loading ? (
        <Spin size="large" />
      ) : (
        <Steps direction="vertical" current={progressDetails.length - 1}>
          {progressDetails.map((detail) => (
            <Step
              key={detail.progressDetailID}
              title={detail.name}
              status={detail.progressStatusDisplay === "Completed" ? "finish" : "process"}
              description={
                <Card className="progress-card">
                  <p><strong>Mô tả:</strong> {detail.description}</p>
                  <p><strong>Bắt đầu:</strong> {detail.startedAt}</p>
                  <p><strong>Hoàn thành:</strong> {detail.completedAt ? detail.completedAt : "Đang thực hiện"}</p>
                </Card>
              }
            />
          ))}
        </Steps>
      )}
    </div>
  );
};

export default ProgressDetail;
