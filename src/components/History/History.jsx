import React from "react";
import "./History.css";

function History() {
  return (
    <section className="history">
      <div className="history-container">
        <div className="history-header">
          <h2>
            Về <span className="brand">TLog</span>
          </h2>
          <h2 className="history-title">Lịch Sử Phát Triển</h2>
        </div>

        <div className="history-content">
          <div className="history-image-wrapper">
            <div className="history-image-container">
              <img
                src="https://www.shutterstock.com/image-photo/caucasian-dentist-examine-tooth-young-600nw-2381661233.jpg"
                alt="Doctor showing tablet to patient"
                className="history-image"
              />
              <div className="image-decoration"></div>
            </div>
          </div>

          <div className="history-text">
            <div className="history-card">
              <h3>Lịch Sử Phát Triển</h3>
              <p>
                TLog ra đời từ mong muốn mang lại trải nghiệm tốt hơn cho những
                người đang trong quá trình niềng răng. Vào năm 2024, đội ngũ của
                chúng tôi đã nhận ra rằng bệnh nhân niềng răng thường gặp khó
                khăn trong việc theo dõi tiến trình điều trị và phải đến nha
                khoa nhiều lần để kiểm tra. Với nền tảng công nghệ tiên tiến,
                chúng tôi quyết định tạo ra một giải pháp tiện lợi hơn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default History;
