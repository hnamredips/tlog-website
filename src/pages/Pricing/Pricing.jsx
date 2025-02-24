import React, { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import "./pricing.css";

function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [expandedItems, setExpandedItems] = useState({});

  const toggleExpand = (id) => {
    setExpandedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const monthlyFeatures = [
    {
      id: "smart-scan",
      title: "Scan dữ liệu thông minh",
      details: "Chi tiết về scan dữ liệu thông minh",
    },
    {
      id: "customer-service",
      title: "Chăm sóc khách hàng tự động",
      details: "Chi tiết về chăm sóc khách hàng tự động",
    },
    {
      id: "3d-modeling",
      title: "Mô phỏng 3D",
      details: "Chi tiết về mô phỏng 3D",
    },
    {
      id: "advertising",
      title: "Hỗ trợ quảng cáo",
      details: "Chi tiết về hỗ trợ quảng cáo",
    },
    {
      id: "maintenance",
      title: "Miễn phí bảo trì",
      details: "Chi tiết về bảo trì",
    },
  ];

  const freeFeatures = [
    {
      id: "patient-management",
      title: "Quản lý hồ sơ bệnh nhân",
      details: "Chi tiết về quản lý hồ sơ bệnh nhân",
    },
    {
      id: "schedule",
      title: "Quản lý lịch hẹn",
      details: "Chi tiết về quản lý lịch hẹn",
    },
    {
      id: "chatbox",
      title: "Chatbox",
      details: "Chi tiết về chatbox",
    },
    {
      id: "notifications",
      title: "Thông kê bệnh nhân",
      details: "Chi tiết về thông kê bệnh nhân",
    },
    {
      id: "3d",
      title: "Mô phỏng 3D",
      details: "Chi tiết về mô phỏng 3D",
    },
  ];

  return (
    <div className="pricing-page">
      <div className="pricing-container">
        <h1 className="pricing-title">
          Giải Pháp Toàn Diện Về Chỉnh Nha Cho{" "}
          <span className="highlight">Cộng Đồng Bác Sĩ Chỉnh Nha</span>
        </h1>

        <p className="pricing-subtitle">
          Trải nghiệm Tlog trong <span className="highlight">14</span> ngày{" "}
          <span className="highlight">miễn phí</span> và sau đó chọn gói dịch vụ
          phù hợp với nhu cầu của bạn nhất
        </p>

        <div className="pricing-controls">
          <div className="toggle-container">
            <span>Lựa chọn của bạn</span>
            <div className="toggle-buttons">
              <button
                className={!isYearly ? "active" : ""}
                onClick={() => setIsYearly(false)}
              >
                THÁNG
              </button>
              <button
                className={isYearly ? "active" : ""}
                onClick={() => setIsYearly(true)}
              >
                NĂM
                <span className="discount-badge">giảm 5%</span>
              </button>
            </div>
          </div>

          <div className="promo-code">
            <input
              type="text"
              placeholder="Mã giảm giá"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className="ok-button">OK</button>
          </div>
        </div>

        <div className="pricing-cards">
          <div className="pricing-card">
            <h2>{isYearly ? "Theo Năm" : "Theo Tháng"}</h2>
            <div className="price-info">
              <div className="price-calculation">
                <p>1,200,000 VNĐ x 12 tháng</p>
                <p className="discount">- 750,000 (Giảm 5%)</p>
              </div>
              <div className="final-price">
                = {isYearly ? "13,680,000" : "1,200,00"}
                <span className="period">{isYearly ? "/năm" : "/tháng"}</span>
              </div>
              <p className="billing-note">
                Trả tự động theo {isYearly ? "năm" : "tháng"}
              </p>
            </div>
            {/* <p className="join-text">với chúng tôi</p> */}
            <button className="signup-button">THAM GIA </button>
            <div className="benefits">
              <p className="features-title">
                Giải pháp toàn thể cho phân tích phác đồ và quản lí bệnh nhân
              </p>
              <p>Mọi chức năng trong gói "Free" và:</p>
              {monthlyFeatures
                .slice(0, isYearly ? monthlyFeatures.length : 3)
                .map((feature) => (
                  <div key={feature.id} className="feature-item">
                    <button
                      className="feature-toggle"
                      onClick={() => toggleExpand(feature.id)}
                    >
                      {feature.title}
                      <ChevronDown
                        className={`icon ${
                          expandedItems[feature.id] ? "rotated" : ""
                        }`}
                      />
                    </button>
                    {expandedItems[feature.id] && (
                      <div className="feature-details">{feature.details}</div>
                    )}
                  </div>
                ))}
            </div>
          </div>

          <div className="pricing-card">
            <h2>Miễn Phí</h2>
            <div className="price-info">
              <div className="price-calculation">
                <p>0 VNĐ x 30 ngày</p>
              </div>
              <div className="final-price">
                = 0 VND
                <span className="period">/năm</span>
              </div>
            </div>
            <p className="join-text">Tham gia với chúng tôi</p>
            <button className="signup-button">THAM GIA MIỄN PHÍ</button>
            <div className="benefits">
              <p className="features-title">Bắt đầu với Tlog</p>
              <p>Gói "Free" bao gồm:</p>
              {freeFeatures.map((feature) => (
                <div key={feature.id} className="feature-item">
                  <button
                    className="feature-toggle"
                    onClick={() => toggleExpand(feature.id)}
                  >
                    <Check className="check-icon" />
                    {feature.title}
                    <ChevronDown
                      className={`icon ${
                        expandedItems[feature.id] ? "rotated" : ""
                      }`}
                    />
                  </button>
                  {expandedItems[feature.id] && (
                    <div className="feature-details">{feature.details}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
