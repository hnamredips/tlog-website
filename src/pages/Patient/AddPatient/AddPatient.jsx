import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SlArrowRight } from "react-icons/sl";
import axios from "axios"; // Thêm axios
import { PATH_NAME } from "../../../constant/pathname";
import "./AddPatient.css";

const AddPatient = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    password: "",
    phoneNumber: "",
    email: "",
    gender: "", // UI hiển thị Nam/Nữ nhưng sẽ convert thành 0/1 khi submit
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Xử lý thay đổi input
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // Xử lý submit form
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    let { fullName, username, password, phoneNumber, email, gender } = formData;

    // 🔥 Kiểm tra fullName chỉ chứa chữ cái và dấu cách
    const nameRegex = /^[A-Za-zÀ-ỹ\s]+$/; // Hỗ trợ tiếng Việt có dấu

    if (!nameRegex.test(fullName)) {
      setError("Họ và Tên chỉ được chứa chữ cái và dấu cách.");
      setLoading(false);
      return;
    }

    if (
      !fullName ||
      !username ||
      !password ||
      !phoneNumber ||
      !email ||
      !gender
    ) {
      setError("Vui lòng điền đầy đủ thông tin.");
      setLoading(false);
      return;
    }

    const convertedGender = gender === "Male" ? 0 : 1;
    const requestData = {
      fullName: fullName.trim(), // Loại bỏ khoảng trắng thừa
      username,
      password,
      phoneNumber,
      email,
      gender: convertedGender,
    };

    const token = localStorage.getItem("accessToken");

    try {
      const response = await axios.post(
        "https://backend.tlog.website/api/v1/account/sign-up-patient",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        alert("Thêm bệnh nhân thành công!");
        navigate(PATH_NAME.PATIENT_ADMIN);
      }
    } catch (error) {
      console.error("Lỗi khi thêm bệnh nhân:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);

        if (error.response.status === 400) {
          const errorMsg =
            error.response.data.errors?.FullName?.[0] || "Có lỗi xảy ra.";
          setError(`Lỗi 400: ${errorMsg}`);
        } else {
          setError("Có lỗi xảy ra khi thêm bệnh nhân.");
        }
      } else {
        setError("Không kết nối được đến server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="add_patient">
      <div className="add_patient_title_container">
        <div className="add_patient_title_left">
          <div className="add_patient_title">Thêm bệnh nhân</div>
        </div>
        <div className="add_patient_patient_right">
          <div className="add_patient_patient">Bệnh nhân</div>
          <SlArrowRight className="add_patient_icon_right" />
          <div className="add_patient_add_patients">Thêm bệnh nhân</div>
        </div>
      </div>

      <div className="add_patient_form_container">
        <div className="add_patient_label">Thông tin cơ bản</div>
        <form className="add_patient_form" onSubmit={handleSubmit}>
          <div className="add_patient_input_row">
            <div className="add_patient_input_colum">
              <label>Họ và Tên</label>
              <input
                type="text"
                name="fullName"
                placeholder="Nhập họ và tên"
                value={formData.fullName}
                onChange={(e) => {
                  const value = e.target.value.replace(/[^A-Za-zÀ-ỹ\s]/g, ""); // Loại bỏ ký tự sai
                  setFormData({ ...formData, fullName: value });
                }}
              />
            </div>
            <div className="add_patient_input_colum">
              <label>Giới tính</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Chọn giới tính
                </option>
                <option value="Male">Nam</option>
                <option value="Female">Nữ</option>
              </select>
            </div>
          </div>
          <div className="add_patient_input_row">
            <div className="add_patient_input_colum">
              <label>Tên đăng nhập</label>
              <input
                type="text"
                name="username"
                placeholder="Nhập tên đăng nhập"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="add_patient_input_colum">
              <label>Mật khẩu</label>
              <input
                type="password"
                name="password"
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="add_patient_input_row">
            <div className="add_patient_input_colum">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                placeholder="Nhập số điện thoại"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            <div className="add_patient_input_colum">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Nhập email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
          <button
            className="add_patient_button_submit"
            type="submit"
            disabled={loading}
          >
            {loading ? "Đang tạo..." : "Tạo mới"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
