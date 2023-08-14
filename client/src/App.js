import React from "react";
import { Routes, Route } from "react-router-dom";
import FacultyLogin from "./Components/Faculty/FacultyLogin";
import StudentLogin from "./Components/Student/StudentLogin";
import Functionality from "./Components/Fuctionality";
import StudentProfile from "./Components/Student/StudentProfile";
// import Profile from "./Components/Faculty/Profile";
// import "./SystemProfile.css";
import "./App.css";
import FacultyRegistration from "./Components/Faculty/FacultyRegistration";
import StudentRegistration from "./Components/Student/StudentRegistration";
import NewVerification from "./Components/Student/NewVerification";
import SystemAdminLogin from "./Components/SystemAdmin/SystemAdminLogin";
import SuperAdminLogin from "./Components/SuperAdmin/SuperAdminLogin";
import Home from "./Components/Home";
import AboutUs from "./Components/AboutUs";
import Navbar from "./Components/Navbar";
import SystemNavbar from "./Components/SystemAdmin/SystemAdminHome";
import FacultyHome from "./Components/Faculty/facultyHome";
import StudentHome from "./Components/Student/StudentHome";
import SuperUserHome from "./Components/SuperAdmin/SuperAdminHome";
import EditStudentDetials from "./Components/SystemAdmin/EditStudentDetails";
import SuperUserProfile from "./Components/SuperAdmin/SuperUserProfile";
// import UploadTimeTable from "./Components/SystemAdmin/UploadTimeTable";

import StudentRegistrationForm from "./Components/Student/StudentRegistrationForm";
import PrintingForm from "./Components/Student/RegistrationForm/PrintingForm";
import MarkATd from "./Components/Faculty/MarkAtd";
import NewProfile from "./Components/Student/NewProfile";
import StudentAcademicReport from "./Components/Student/StudentAcademicReport";
import Try from "./Try";
import Tryasure from "./Tryasure";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Student/StudentLogin" element={<StudentLogin />} />
        <Route path="/Faculty/FacultyLogin" element={<FacultyLogin />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/#feelingid" element={<Functionality />} />
        <Route
          path="SystemAdmin/SystemAdminHome/#EditStudent"
          element={<EditStudentDetials />}
        />

        <Route
          path="/SuperAdmin/SuperAdminLogin"
          element={<SuperAdminLogin />}
        />
        <Route
          path="/SystemAdmin/SystemAdminLogin"
          element={<SystemAdminLogin />}
        />
        <Route
          path="/Student/StudentRegistration"
          element={<StudentRegistration />}
        />
        <Route
          path="/Faculty/FacultyRegistration"
          element={<FacultyRegistration />}
        />

        <Route path="/SuperUser/SuperUserHome" element={<SuperUserHome />} />
        {/* <Route path="/" element={<Navbar />} /> */}

        <Route path="/Student/StudentHome" element={<StudentHome />} />

        <Route path="/Faculty/FacultyHome" element={<FacultyHome />} />

        <Route path="/SystemAdmin/SystemAdminHome" element={<SystemNavbar />} />

        <Route exact path="/NewVerification" element={<NewVerification />} />

        <Route path="/Student/StudentProfile" element={<StudentProfile />} />

        <Route
          path="/Student/StudentRegistrationForm"
          element={<StudentRegistrationForm />}
        />

        {/* <Route
          path="/SystemAdmin/UploadTimeTable"
          element={<UploadTimeTable />}
        /> */}

        {/* <Route path="/Faculty/Profile" element={<Profile />} /> */}

        <Route
          exact
          path="/Student/Registration/PrintingForm"
          element={<PrintingForm />}
        />

        <Route path="/report" element={<StudentAcademicReport />} />
        <Route path="/try" element={<Try />} />
        <Route path="/tryasure" element={<Tryasure />} />

        <Route path="/Faculty/MarkAttendance" element={<MarkATd />} />
      </Routes>

      {/* <Route path="/Faculty/TakeReport" element={<TakeReport />} />
      <Route /> */}
    </>
  );
}

export default App;
