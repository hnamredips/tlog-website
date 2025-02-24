import React from "react";
import { ShieldCheck, Phone, Calendar, Plus } from "lucide-react";
import dentist2 from "../../assets/dentist2.svg";
import "./Features.css";

function Features() {
  const contactMethods = [
    { icon: <Phone className="w-6 h-6" />, text: "0979798888" },
    { icon: <Calendar className="w-6 h-6" />, text: "Đặt lịch" },
    { icon: <Plus className="w-6 h-6" />, text: "Trao đổi" },
  ];

  const features = [
    "Video và hình ảnh răng 3D",
    "Xem phác đồ điều trị",
    "Đặt lịch khám",
    "Tính năng nhắc lịch tự động",
  ];

  return (
    <section className="features">
      <div className="contact-section">
        <div className="contact-header">
          <h2>Liên hệ với chúng tôi qua:</h2>
          <p>Theo các phương thức sau</p>
        </div>
        <div className="contact-cards">
          {contactMethods.map((method, index) => (
            <div key={index} className="contact-card">
              {method.icon}
              <span>{method.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="features-content">
        <div className="features-text">
          <h2>
            <span className="brand">TLog</span> - Ứng dụng chăm sóc nụ cười của
            bạn!
          </h2>
          <p>
            TLog là ứng dụng tiên phong dành cho bệnh nhân niềng răng. Với TLog,
            bạn có thể dễ dàng theo dõi tiến trình điều trị của mình mà không
            cần đến nha khoa thường xuyên.
          </p>
        </div>

        <div className="features-illustration">
          <img
            src={dentist2}
            alt="Doctor illustration"
            className="illustration-image"
          />
        </div>

        <div className="features-list">
          <h3>Tính năng chính của TLog:</h3>
          <ul>
            {features.map((feature, index) => (
              <li key={index}>
                <ShieldCheck className="feature-icon" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Features;
