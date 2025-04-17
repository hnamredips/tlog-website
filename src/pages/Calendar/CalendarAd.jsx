import { useState, useEffect } from "react";
import moment from "moment";
import { momentLocalizer, Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { SlArrowRight } from "react-icons/sl";
import Popup from "reactjs-popup";
import axios from "axios";

// Set up moment localization
moment.locale("vi");
const localizer = momentLocalizer(moment);

const CalendarAd = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [appointments, setAppointments] = useState([]); // 🟢 State lưu lịch hẹn
  const [loading, setLoading] = useState(true);

  // 🟢 Hàm gọi API lấy lịch hẹn
  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("⚠️ Không tìm thấy accessToken. Vui lòng đăng nhập lại!");
        return;
      }

      const response = await axios.get(
        "https://backend.tlog.website/api/v1/schedule/staff/all?fromDate=2025-04-10&toDate=2025-04-30&page=1&size=50",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.isSuccess) {
        const apiData =
          response.data.responseRequestModel.allAppointmentResponse.items;

        // Chuyển đổi dữ liệu từ API sang định dạng react-big-calendar
        const formattedAppointments = apiData.map((item) => ({
          id: item.appointmentID,
          title: `${item.patientName} - ${item.serviceDetailName}`,
          start: new Date(`${item.appointmentDate}T${item.from}`),
          end: new Date(`${item.appointmentDate}T${item.to}`),
          description: item.serviceDetailName,
          status: item.appointmentStatus,
          patientName: item.patientName,
          startTime: item.from,
          endTime: item.to,
        }));

        setAppointments(formattedAppointments);
      } else {
        console.error("❌ API response error:", response.data.message);
      }
    } catch (error) {
      console.error("❌ Lỗi khi gọi API lịch hẹn:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Gọi API khi component được mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  // 🟢 Click vào event để mở popup
  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  // 🟢 Xử lý màu cho từng trạng thái
  const eventStyleGetter = (event) => {
    let backgroundColor;
    if (event.status === "Confirmed") {
      backgroundColor = "#295895db"; // Màu xanh dương
    } else if (event.status === "Completed") {
      backgroundColor = "#5cb85c"; // Màu xanh lá
    } else if (event.status === "Canceled") {
      backgroundColor = "#d9534f"; // Màu đỏ
    }

    return {
      style: {
        backgroundColor,
        color: "#fff",
        borderRadius: "5px",
        border: "none",
      },
    };
  };

  return (
    <div className="calendar">
      <div className="course_title_container">
        <div className="course_title_left">
          <div className="course_title">Xem lịch hẹn</div>
        </div>
        <div className="course_course_right">
          <div className="course_course">Lịch hẹn</div>
          <SlArrowRight className="course_icon_right" />
          <div className="course_all_courses">Xem tất cả</div>
        </div>
      </div>

      {/* 🟢 Legend */}
      <div className="calendar-legend">
        <div className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: "#295895db" }}
          ></span>
          <span>Lịch hẹn</span>
        </div>
        <div className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: "#5cb85c" }}
          ></span>
          <span>Đã hoàn thành</span>
        </div>
        <div className="legend-item">
          <span
            className="legend-color"
            style={{ backgroundColor: "#d9534f" }}
          ></span>
          <span>Bị hủy/Nghỉ</span>
        </div>
      </div>

      {/* 🟢 Calendar */}
      <div className="calendar-container">
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : (
          <Calendar
            views={["day", "week", "month"]}
            selectable
            localizer={localizer}
            defaultDate={new Date()}
            events={appointments}
            style={{ height: "100vh" }}
            onSelectEvent={handleEventClick}
            eventPropGetter={eventStyleGetter}
          />
        )}
      </div>

      {/* 🟢 Popup hiển thị thông tin sự kiện */}
      <Popup
        open={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
      >
        <div className="popup-content-1">
          {selectedEvent && (
            <>
              <h3>
                {selectedEvent.patientName} - {selectedEvent.description}
              </h3>
              <p>
                <strong>Dịch vụ:</strong> {selectedEvent.description}
              </p>
              <p>
                <strong>Thời gian:</strong> {selectedEvent.startTime} -{" "}
                {selectedEvent.endTime}
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedEvent.status}
              </p>
              <div className="popup_button_1">
                <button onClick={() => setSelectedEvent(null)}>Đóng</button>
              </div>
            </>
          )}
        </div>
      </Popup>
    </div>
  );
};

export default CalendarAd;
