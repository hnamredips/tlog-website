import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { PATH_NAME } from "../../constant/pathname"; // Import PATH_NAME
import "./BillPage.css";

export default function BillPage() {
  const [billingPeriod, setBillingPeriod] = useState("month");
  const navigate = useNavigate(); // Hook điều hướng

  const handleGoHome = () => {
    navigate(PATH_NAME.HOMEPAGE); // Điều hướng về trang chủ
  };

  const monthlyFeatures = [
    "Chăm sóc khách hàng tự động",
    "Mô phỏng 3D",
    "Hỗ trợ quảng cáo",
  ];

  const yearlyFeatures = [
    "Scan đồ liệu thông minh",
    "Chăm sóc khách hàng tự động",
    "Mô phỏng 3D",
    "Hỗ trợ quảng cáo",
    "Miễn phí bảo trì",
  ];

  const freeFeatures = [
    "Quản lý hồ sơ bệnh nhân",
    "Quản lý lịch hẹn",
    "Chatbox",
    "Thống kê bệnh nhân",
    "Mô phỏng 3D",
  ];

  return (
    <div className="bill-container">
      <div className="bill-card">
        <h1 className="bill-title">
          Giải Pháp Toàn Diện Về Chỉnh Nha Cho{" "}
          <span className="highlight">Cộng Đồng Bác Sĩ Chỉnh Nha</span>
        </h1>

        <p className="bill-subtitle">
          Trải nghiệm Tlog trong <span className="bold">14</span> ngày{" "}
          <span className="highlight">miễn phí</span> và sau đó chọn gói dịch vụ
          phù hợp với nhu cầu của bạn nhất
        </p>

        {/* Nút quay lại trang chủ */}
        <button className="home-button" onClick={handleGoHome}>
          <svg
            className="home-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Quay Lại Trang Chủ
        </button>

        <div className="bill-selector">
          <span className="selector-label">Lựa chọn của bạn</span>

          <div className="toggle-container">
            <button
              onClick={() => setBillingPeriod("month")}
              className={`toggle-button left ${
                billingPeriod === "month" ? "active-green" : ""
              }`}
            >
              THÁNG
            </button>
            <button
              onClick={() => setBillingPeriod("year")}
              className={`toggle-button right ${
                billingPeriod === "year" ? "active-green" : ""
              }`}
            >
              NĂM
            </button>
            <div className="discount-badge">
              <div className="discount-text">giảm 5%</div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="discount-arrow"
              >
                <path
                  d="M5 12H19M19 12L12 5M19 12L12 19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="promo-container">
            <input
              type="text"
              placeholder="Mã giảm giá"
              className="promo-input"
            />
            <button className="promo-button">OK</button>
          </div>
        </div>

        <div className="plans-container">
          {/* Paid Plan */}
          <div className="plan-card">
            <h2 className="plan-title orange">
              {billingPeriod === "month" ? "Theo Tháng" : "Theo Năm"}
            </h2>
            <div className="plan-price-detail">1,200,000 VND x 12 tháng</div>
            <div className="plan-discount">- 750,000 (Giảm 5%)</div>

            <div className="plan-total">
              <span className="equals">=</span>
              <span className="amount">
                {billingPeriod === "month" ? "1,200,000" : "13,680,000"}
              </span>
              <span className="period">
                /{billingPeriod === "month" ? "tháng" : "năm"}
              </span>
            </div>

            <div className="payment-info">
              Trả tự động theo {billingPeriod === "month" ? "tháng" : "năm"}
            </div>

            <div className="join-text">Tham gia với chúng tôi</div>

            <button className="join-button blue">THAM GIA NGAY</button>

            <div className="plan-description">
              Giải pháp toàn thể cho phần tích phác đồ và quản lí bệnh nhân
            </div>

            <div className="features-title">
              Mọi chức năng trong gói "Free" và:
            </div>

            <div className="features-list">
              {(billingPeriod === "month"
                ? monthlyFeatures
                : yearlyFeatures
              ).map((feature, index) => (
                <div key={index} className="feature-item">
                  <span>{feature}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="chevron-icon"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* Free Plan */}
          <div className="plan-card">
            <h2 className="plan-title">Miễn Phí</h2>
            <div className="plan-price-detail">0 VND x 30 ngày</div>

            <div className="plan-total">
              <span className="equals">=</span>
              <span className="amount">0 VND</span>
              <span className="period">/năm</span>
            </div>

            <div className="payment-info"></div>

            <div className="join-text">Tham gia với chúng tôi</div>

            <button className="join-button-free blue">THAM GIA MIỄN PHÍ</button>

            <div className="features-title">Gói "Free" bao gồm:</div>

            <div className="features-list">
              {freeFeatures.map((feature, index) => (
                <div key={index} className="feature-item">
                  <div className="feature-with-check">
                    <svg
                      className="check-icon"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    <span>{feature}</span>
                  </div>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="chevron-icon"
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
