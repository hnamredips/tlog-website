const apiRequest = async (url, method = "GET", body = null) => {
  // Lấy token từ localStorage
  const token = localStorage.getItem("token");

  // Kiểm tra nếu chưa đăng nhập
  if (!token) {
    throw new Error("Bạn chưa đăng nhập!");
  }

  // Cấu hình headers với token
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`, // Đính kèm token vào request
  };

  // Cấu hình request
  const options = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  // Gửi request
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Lỗi API!"); // Xử lý lỗi nếu request thất bại
  }

  return response.json(); // Trả về dữ liệu từ API
};

export default apiRequest;
