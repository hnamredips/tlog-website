import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import DashBoard from "./pages/DashBoard/DashBoard";
import AllPatient from "./pages/Patient/AllPatient/AllPatient";
import AddPatient from "./pages/Patient/AddPatient/AddPatient";
import { PATH_NAME } from "./constant/pathname";
import AllProgress from "./pages/TopicArea/AllProgress/AllProgress";
import AddTopic from "./pages/TopicArea/AddTopic/AddTopic";
import Layout_1 from "./components/Layout/Layout_1";
import Layout_2 from "./components/Layout/Layout_2";
import CalendarAd from "./pages/Calendar/CalendarAd";
import Calendar from "./pages/Calendar/CalendarIns";
import HomePage from "./pages/HomePage/HomePage";
import BillPage from "./pages/BillPage/BillPage";
import PatientDoc from "./pages/PatientDoc/PatientDoc";
import ProgressDetail from "./pages/ProgressDetail/ProgressDetail";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={PATH_NAME.LOGIN} element={<Login />} />
        <Route path={PATH_NAME.HOMEPAGE} element={<HomePage />} />
        <Route path={PATH_NAME.BILL} element={<BillPage />} />

        {/* admin */}
        {/* <Route element={<RequireAuth allowedRoles={["staff"]} />}></Route>*/}
        <Route element={<Layout_1 />}>
          <Route path={PATH_NAME.DASHBOARD} element={<DashBoard />} />
          <Route path={PATH_NAME.PATIENT_ADMIN} element={<AllPatient />} />
          <Route path={PATH_NAME.ADD_PATIENT} element={<AddPatient />} />
          <Route path={PATH_NAME.PROGRESS} element={<AllProgress />} />
          <Route
            path="/progress-detail/:progressID"
            element={<ProgressDetail />}
          />
          <Route path={PATH_NAME.ADD_TOPIC} element={<AddTopic />} />
          <Route path={PATH_NAME.CALENDAR_ADMIN} element={<CalendarAd />} />
        </Route>

        {/* instructor */}

        <Route element={<Layout_2 />}>
          <Route path={PATH_NAME.CALENDAR} element={<Calendar />} />
          <Route path={PATH_NAME.PATIENT} element={<PatientDoc />} />
          {/* <Route path={PATH_NAME.COURSE_INSTRUCTOR} element={<CourseIns />} /> */}
        </Route>
      </Routes>
    </div>
  );
};

export default App;
