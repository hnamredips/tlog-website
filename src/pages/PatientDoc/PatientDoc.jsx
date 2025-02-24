import React, { useState } from "react";
import { Table, Button } from "antd";
import PatientDetail from "../PatientDetail/PatientDetail";
import "./PatientDoc.css";

const mockData = [
  {
    id: "123456",
    gender: "Nam",
    yearOfBirth: 2003,
    service: "Niềng răng",
    startDate: "2024-01-02",
    endDate: null,
    visits: 12,
    treatmentProgress: 1,
    treatmentSteps: [
      {
        title: "Đánh giá tình trạng răng miệng",
        description: "Kiểm tra ban đầu.",
      },
      { title: "Lập kế hoạch điều trị", description: "Lên kế hoạch chi tiết." },
      { title: "Gắn mắc cài", description: "Tiến hành gắn mắc cài." },
      { title: "Theo dõi định kỳ", description: "Kiểm tra sau điều trị." },
      { title: "Tái khám định kỳ", description: "Đánh giá tiến trình." },
      { title: "Kết thúc điều trị", description: "Hoàn thành quá trình." },
    ],
  },
];

const PatientDoc = () => {
  const [data, setData] = useState(mockData);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleUpdateProgress = (patientId, newProgress) => {
    setData((prevData) =>
      prevData.map((patient) =>
        patient.id === patientId
          ? { ...patient, treatmentProgress: newProgress }
          : patient
      )
    );
  };

  const columns = [
    { title: "Mã số", dataIndex: "id" },
    { title: "Giới tính", dataIndex: "gender" },
    { title: "Năm sinh", dataIndex: "yearOfBirth" },
    { title: "Dịch vụ", dataIndex: "service" },
    {
      title: "Tiến trình",
      render: (_, record) => (
        <span>{`${record.treatmentProgress}/${record.treatmentSteps.length}`}</span>
      ),
    },
    {
      title: "Hành động",
      render: (_, record) => (
        <button
          className="detail-button"
          type="primary"
          onClick={() => setSelectedPatient(record)}
        >
          Chi tiết
        </button>
      ),
    },
  ];

  return (
    <div className="patient-doc-container">
      {selectedPatient ? (
        <PatientDetail
          patient={selectedPatient}
          onBack={() => setSelectedPatient(null)}
          onUpdateProgress={handleUpdateProgress}
        />
      ) : (
        <Table
          columns={columns}
          dataSource={data}
          rowKey={(record) => record.id}
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default PatientDoc;
