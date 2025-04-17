import React, { useEffect, useState } from "react";
import "./DashBoard.css";
import { PiUsersThree, PiGraduationCap, PiCoinsLight } from "react-icons/pi";
import { BsPerson } from "react-icons/bs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";

const DashBoard = () => {
  const [stats, setStats] = useState({
    totalAppointmentToday: 0,
    totalAppointmentThisWeek: 0,
    totalAppointmentThisMonth: 0,
    totalPatient: 0,
    totalDoctor: 0,
    monday: 0,
    tuesday: 0,
    wednesday: 0,
    thursday: 0,
    friday: 0,
    saturday: 0,
    sunday: 0,
  });

  const [loading, setLoading] = useState(true);

  const data = [
    {
      name: "Thứ 2",
      Tổng: 10,
      amt: 2400,
    },
    {
      name: "Thứ 3",
      Tổng: 20,
      amt: 2210,
    },
    {
      name: "Thứ 4",
      Tổng: 40,
      amt: 2290,
    },
    {
      name: "Thứ 5",
      Tổng: 35,
      amt: 2000,
    },
    {
      name: "Thứ 6",
      Tổng: 10,
      amt: 2181,
    },
    {
      name: "Thứ 7",
      Tổng: 16,
      amt: 2500,
    },
    {
      name: "Chủ Nhật",
      Tổng: 19,
      amt: 2100,
    },
  ];

  // 🟢 Hàm gọi API
  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken"); // Lấy token từ localStorage
      if (!token) {
        console.error("⚠️ Không tìm thấy accessToken. Vui lòng đăng nhập lại!");
        return;
      }

      const response = await axios.post(
        "https://backend.tlog.website/api/v1/clinic/statistic",
        {}, // Body có thể bỏ trống nếu không cần gửi dữ liệu
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.isSuccess) {
        setStats(response.data.responseRequestModel);
      } else {
        console.error("❌ API response error:", response.data.message);
      }
    } catch (error) {
      console.error("❌ Lỗi khi gọi API thống kê:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Gọi API khi component được mount
  useEffect(() => {
    fetchStatistics();
  }, []);

  return (
    <div className="dashboard">
      {/* 🟢 Widget */}
      <div className="dashboard-widget-wrapper">
        <div className="dashboard-widget">
          <div className="dashboard-widget-card">
            <div className="dashboard-widget-card-body">
              <span className="dashboard-widget-icon-1">
                <PiUsersThree />
              </span>
              <div className="dashboard-widget-card-text">
                <h4 className="dashboard-number">
                  {stats.totalAppointmentThisMonth}
                </h4>
                <p className="dashboard-text">Tổng lịch hẹn</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-widget">
          <div className="dashboard-widget-card">
            <div className="dashboard-widget-card-body">
              <span className="dashboard-widget-icon-2">
                <BsPerson />
              </span>
              <div className="dashboard-widget-card-text">
                <h4 className="dashboard-number">{stats.totalDoctor}</h4>
                <p className="dashboard-text">Nha sĩ</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-widget">
          <div className="dashboard-widget-card">
            <div className="dashboard-widget-card-body">
              <span className="dashboard-widget-icon-3">
                <PiGraduationCap />
              </span>
              <div className="dashboard-widget-card-text">
                <h4 className="dashboard-number">{stats.totalPatient}</h4>
                <p className="dashboard-text">Khách hàng mới</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-chart-calender">
        {/* Chart */}
        <div className="dashboard-chart">
          <div className="dashboard-chart-title">
            <h3>Thống kê bệnh nhân</h3>
            <div className="dashboard-note">
              <div className="dashboard-note-study">
                <span className="dashboard-point-blue"></span>
                <div className="dashboard-text-study">Bệnh nhân</div>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
  <AreaChart
    data={[
      { name: "Thứ 2", LịchHẹn: stats.monday },
      { name: "Thứ 3", LịchHẹn: stats.tuesday },
      { name: "Thứ 4", LịchHẹn: stats.wednesday },
      { name: "Thứ 5", LịchHẹn: stats.thursday },
      { name: "Thứ 6", LịchHẹn: stats.friday },
      { name: "Thứ 7", LịchHẹn: stats.saturday },
      { name: "CN", LịchHẹn: stats.sunday },
    ]}
    margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
  >
    <defs>
      <linearGradient id="colorLichHen" x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor="#1e88e5" stopOpacity={0.8} />
        <stop offset="95%" stopColor="#1e88e5" stopOpacity={0} />
      </linearGradient>
    </defs>
    <XAxis dataKey="name" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Area
      type="monotone"
      dataKey="LịchHẹn"
      stroke="#1e88e5"
      fillOpacity={1}
      fill="url(#colorLichHen)"
    />
  </AreaChart>
</ResponsiveContainer>
        </div>

        {/* Calendar */}
        <div className="dashboard-calender">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar />
          </LocalizationProvider>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
