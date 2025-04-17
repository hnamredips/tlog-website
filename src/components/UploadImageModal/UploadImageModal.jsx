import { useState } from "react";
import { Modal, Upload, Button, Form, Input, Switch, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

const UploadImageModal = ({ patientCAID }) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleUpload = async ({ file, onSuccess, onError }) => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append("ImageFile", file);
      const token = localStorage.getItem("accessToken");

      const url = `https://backend.tlog.website/api/v1/file/image?PatientCAID=${patientCAID}&ImageName=${encodeURIComponent(
        values.ImageName
      )}&Description=${encodeURIComponent(values.Description)}&IsXquang=${
        values.IsXquang
      }`;

      await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Upload thành công!");
      onSuccess();
      setVisible(false);
      form.resetFields();
    } catch (error) {
      console.error("Upload thất bại:", error);
      message.error("Upload thất bại!");
      onError(error);
    }
  };

  return (
    <>
      <button
        className="image_add"
        type="primary"
        onClick={() => setVisible(true)}
      >
        Upload ảnh
      </button>
      <Modal
        title="Upload ảnh niềng răng"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="ImageName"
            label="Tên ảnh"
            rules={[{ required: true, message: "Vui lòng nhập tên ảnh" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="Description"
            label="Mô tả"
            rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="IsXquang"
            label="Là ảnh X-quang?"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch />
          </Form.Item>
          <Form.Item label="Chọn ảnh">
            <Upload
              customRequest={handleUpload}
              showUploadList={false}
              accept="image/*"
            >
              <button className="image_add" icon={<UploadOutlined />}>Chọn ảnh</button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UploadImageModal;
