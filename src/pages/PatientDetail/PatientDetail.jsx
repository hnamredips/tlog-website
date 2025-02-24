import React, { useState } from "react";
import { Card, Steps, Button, Modal, Form, Input, message } from "antd";
import "./PatientDetail.css";

const { Step } = Steps;

const PatientDetail = ({ patient, onBack, onUpdateProgress }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(patient.treatmentProgress);

  const handleUpdateProgress = () => {
    if (currentStep < 1 || currentStep > patient.treatmentSteps.length) {
      message.error("Bước tiến độ không hợp lệ!");
      return;
    }
    onUpdateProgress(patient.id, currentStep);
    message.success("Cập nhật tiến độ điều trị thành công!");
    setIsModalOpen(false);
  };

  return (
    <div className="patient-detail-container">
      <button className="back-button" onClick={onBack}>
        ← Quay lại
      </button>
      <div className="patient-info-container">
        <Card className="patient-card" title="Hồ sơ">
          <p>
            <strong>Mã số:</strong> {patient.id}
          </p>
          <p>
            <strong>Giới tính:</strong> {patient.gender}
          </p>
          <p>
            <strong>Năm sinh:</strong> {patient.yearOfBirth}
          </p>
          <p>
            <strong>Dịch vụ:</strong> {patient.service}
          </p>
          <p>
            <strong>Bắt đầu từ:</strong>{" "}
            {new Date(patient.startDate).toLocaleDateString("vi-VN")}
          </p>
          <p>
            <strong>Kết thúc:</strong> {patient.endDate || "..."}
          </p>
          <p>
            <strong>Số lần khám:</strong> {patient.visits}
          </p>
        </Card>

        <div className="treatment-progress">
          <h3>Tiến trình</h3>
          <Steps direction="vertical" current={currentStep - 1} size="small">
            {patient.treatmentSteps.map((step, index) => (
              <Step
                key={index}
                title={step.title}
                description={step.description}
              />
            ))}
          </Steps>

          <button
            type="button"
            className="update-progress-button"
            onClick={() => setIsModalOpen(true)}
          >
            Cập nhật tiến độ
          </button>
        </div>
      </div>

      {/* Modal không có nút OK và Cancel mặc định */}
      <Modal
        title="Cập nhật tiến độ điều trị"
        open={isModalOpen}
        footer={null} // Loại bỏ các nút mặc định của Modal
        onCancel={() => setIsModalOpen(false)}
      >
        <Form>
          <Form.Item label="Bước tiến độ hiện tại">
            <Input
              type="number"
              min={1}
              max={patient.treatmentSteps.length}
              value={currentStep}
              onChange={(e) => setCurrentStep(Number(e.target.value))}
            />
          </Form.Item>
          {/* Nút "Lưu" và "Hủy" thay thế cho OK & Cancel */}
          <div className="modal-footer">
            <button
              className="cancel-button"
              onClick={() => setIsModalOpen(false)}
            >
              Hủy
            </button>
            <button className="save-button" onClick={handleUpdateProgress}>
              Lưu
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default PatientDetail;
