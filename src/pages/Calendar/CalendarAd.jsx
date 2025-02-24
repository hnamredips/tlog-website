import { useState } from "react";
import moment from "moment";
import { momentLocalizer, Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.css";
import { SlArrowRight } from "react-icons/sl";
import Popup from "reactjs-popup";

// Set up moment localization
moment.locale("vi");
const localizer = momentLocalizer(moment);

const CalendarAd = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentView, setCurrentView] = useState("month"); // Default view is "month"

  // Mock data for events
  const eventsData = [
    {
      id: 1,
      title: "Meeting",
      start: new Date(2024, 8, 6, 10, 30),
      end: new Date(2024, 8, 6, 11, 30),
      description: "Team meeting to discuss project updates.",
      startTime: "10:30",
      endTime: "11:30",
      course: "Project Management",
      status: "Đã hoàn thành", // Trạng thái
    },
    {
      id: 2,
      title: "Nhổ răng",
      start: new Date(2024, 8, 7, 8, 0),
      end: new Date(2024, 8, 7, 9, 0),
      description: "Appointment for tooth extraction.",
      startTime: "08:00",
      endTime: "09:00",
      course: "Dental Appointment",
      status: "Lịch hẹn", // Trạng thái
    },
    {
      id: 3,
      title: "Meeting",
      start: new Date(2024, 8, 8, 9, 0),
      end: new Date(2024, 8, 8, 10, 0),
      description: "Client meeting for project demo.",
      startTime: "09:00",
      endTime: "10:00",
      course: "Client Meeting",
      status: "Bị hủy/Nghỉ", // Trạng thái
    },
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const eventStyleGetter = (event) => {
    let backgroundColor;
    if (event.status === "Lịch hẹn") {
      backgroundColor = "#295895db"; // Màu xanh dương
    } else if (event.status === "Đã hoàn thành") {
      backgroundColor = "#5cb85c"; // Màu xanh lá
    } else if (event.status === "Bị hủy/Nghỉ") {
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

      {/* Legend */}

      {/* Calendar */}
      <div className="calendar-container">
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
        <Calendar
          views={["day", "week", "month"]}
          selectable
          localizer={localizer}
          defaultDate={new Date(2024, 8, 6)} // Đặt ngày mặc định
          defaultView={currentView} // Kết hợp view động
          events={eventsData}
          style={{ height: "100vh" }}
          onSelectEvent={handleEventClick}
          eventPropGetter={eventStyleGetter} // Áp dụng màu sắc dựa trên trạng thái
        />
      </div>

      {/* Popup hiển thị thông tin sự kiện */}
      <Popup
        open={selectedEvent !== null}
        onClose={() => setSelectedEvent(null)}
      >
        <div className="popup-content-1">
          {selectedEvent && (
            <>
              <h3>{selectedEvent.title}</h3>
              <p>
                <strong>Course:</strong> {selectedEvent.course}
              </p>
              <p>
                <strong>Description:</strong> {selectedEvent.description}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {moment(selectedEvent.start).format("dddd, DD/MM/YYYY")}
              </p>
              <p>
                <strong>Time:</strong> {selectedEvent.startTime} -{" "}
                {selectedEvent.endTime}
              </p>
              <p>
                <strong>Status:</strong> {selectedEvent.status}
              </p>
              <div className="popup_button_1">
                <button onClick={() => setSelectedEvent(null)}>Close</button>
              </div>
            </>
          )}
        </div>
      </Popup>
    </div>
  );
};

export default CalendarAd;
