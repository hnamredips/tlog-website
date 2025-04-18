import { useEffect, useState } from "react";
import moment from "moment";
import { momentLocalizer, Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { SlArrowRight } from "react-icons/sl";
import axios from "axios";
import Popup from "reactjs-popup";

moment.locale("vi");
const localizer = momentLocalizer(moment);

const CalendarIns = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [note, setNote] = useState("");
  const [precriptionNotes, setPrecriptionNotes] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTodayAppointments = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      console.error("⚠️ Không tìm thấy accessToken. Vui lòng đăng nhập lại!");
      return;
    }

    try {
      const response = await axios.get(
        "https://backend.tlog.website/api/v1/schedule/doctor/today?page=1&size=50",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const items =
        response.data?.responseRequestModel?.todayAppointmentResponse?.items ||
        [];

      const mappedEvents = items.map((item) => {
        const fromTime = item.from ? item.from.slice(0, 5) : "00:00";
        const toTime = item.to ? item.to.slice(0, 5) : "00:00";
        const statusText =
          item.appointmentStatus === "Completed"
            ? "Đã hoàn thành"
            : item.appointmentStatus === "Canceled"
            ? "Bị hủy/Nghỉ"
            : "Lịch hẹn";

        return {
          id: item.appointmentID,
          title: `${item.patientName} - ${item.serviceDetailName}`,
          start: new Date(`${item.appointmentDate}T${item.from || "00:00:00"}`),
          end: new Date(`${item.appointmentDate}T${item.to || "00:00:00"}`),
          description: item.reason || "Không có mô tả",
          startTime: fromTime,
          endTime: toTime,
          course: item.serviceDetailName,
          status: statusText,
          hasDetail: item.appointmentStatus === "Completed",
        };
      });

      setEventsData(mappedEvents);
    } catch (error) {
      console.error("❌ Lỗi khi gọi API lịch hẹn hôm nay:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  };

  useEffect(() => {
    fetchTodayAppointments();
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCreateScheduleDetail = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("❗ Vui lòng đăng nhập lại để tạo chi tiết lịch hẹn.");
      return;
    }

    if (!note || !precriptionNotes || !followUpDate) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin trước khi gửi.");
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(
        "https://backend.tlog.website/api/v1/schedule/doctor/appointment-detail",
        {
          appointmentDetailID: selectedEvent.id,
          note,
          precriptionNotes,
          followUpDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Tạo chi tiết lịch hẹn thành công!");

      // Ẩn form bằng cách set hasDetail
      setSelectedEvent((prev) => ({
        ...prev,
        hasDetail: true,
      }));

      setNote("");
      setPrecriptionNotes("");
      setFollowUpDate("");
    } catch (err) {
      console.error("❌ Lỗi tạo chi tiết lịch:", err);
      alert("❌ Lỗi tạo chi tiết lịch hẹn. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const eventStyleGetter = (event) => {
    let backgroundColor;
    switch (event.status) {
      case "Lịch hẹn":
        backgroundColor = "#295895db";
        break;
      case "Đã hoàn thành":
        backgroundColor = "#5cb85c";
        break;
      case "Bị hủy/Nghỉ":
        backgroundColor = "#d9534f";
        break;
      default:
        backgroundColor = "#888";
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
          <div className="course_title">Lịch hẹn hôm nay</div>
        </div>
        <div className="course_course_right">
          <div className="course_course">Lịch hẹn</div>
          <SlArrowRight className="course_icon_right" />
          <div className="course_all_courses">Xem tất cả</div>
        </div>
      </div>

      {/* Legend */}
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

      {/* Calendar */}
      <div className="calendar-container">
        <Calendar
          views={["day"]}
          defaultView="day"
          localizer={localizer}
          date={new Date()}
          toolbar={false}
          events={eventsData}
          style={{ height: "85vh" }}
          onSelectEvent={handleEventClick}
          eventPropGetter={eventStyleGetter}
        />
      </div>

      {/* Popup */}
      <Popup
        open={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
        modal
      >
        <div className="popup-content-1">
          {selectedEvent && (
            <>
              <h2>{selectedEvent.title}</h2>
              <p>
                <strong>Tiêu đề:</strong> {selectedEvent.course}
              </p>
              <p>
                <strong>Mô tả:</strong> {selectedEvent.description}
              </p>
              <p>
                <strong>Ngày khám:</strong>{" "}
                {moment(selectedEvent.start).format("dddd, DD/MM/YYYY")}
              </p>
              <p>
                <strong>Thời gian:</strong> {selectedEvent.startTime} -{" "}
                {selectedEvent.endTime}
              </p>
              <p>
                <strong>Trạng thái:</strong> {selectedEvent.status}
              </p>

              {!selectedEvent.hasDetail && (
                <>
                  <hr />
                  <div style={{ marginTop: "20px" }}>
                    <h3>Thêm chi tiết lịch hẹn</h3>

                    <label>Ghi chú</label>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Nhập ghi chú cho cuộc hẹn..."
                      rows={3}
                      style={{ width: "100%", marginBottom: 10 }}
                    />

                    <label>Ghi chú thuốc</label>
                    <textarea
                      value={precriptionNotes}
                      onChange={(e) => setPrecriptionNotes(e.target.value)}
                      placeholder="VD: Paracetamol 500mg..."
                      rows={3}
                      style={{ width: "100%", marginBottom: 10 }}
                    />

                    <label>Ngày tái khám</label>
                    <input
                      type="date"
                      value={followUpDate}
                      onChange={(e) => setFollowUpDate(e.target.value)}
                      style={{ width: "100%", padding: 8, marginBottom: 20 }}
                    />

                    <div className="popup-button-row">
                      <button
                        onClick={handleCreateScheduleDetail}
                        disabled={isSubmitting}
                        className="btn-create"
                      >
                        {isSubmitting ? "Đang gửi..." : "Tạo chi tiết lịch hẹn"}
                      </button>

                      <button
                        className="btn-cancel"
                        onClick={() => setSelectedEvent(null)}
                      >
                        Đóng
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </Popup>
    </div>
  );
};

export default CalendarIns;
