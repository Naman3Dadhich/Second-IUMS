import React, { useState, useEffect } from "react";

import StudentLogin from "./Student/StudentLogin";
import FacultyLogin from "./Faculty/FacultyLogin";
import SuperAdminLogin from "./SuperAdmin/SuperAdminLogin";
import SystemAdminLogin from "./SystemAdmin/SystemAdminLogin";
import Navbar from "./Navbar";

// import "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

// const FirstPart = ({ lost }) => {
//   switch (lost) {
//     case "0":
//       return (
//         <div className="homeheading" id="homeheadingid">
//           <img src={require("../student.jpg")} />
//           <h1 className="homeContent"></h1>
//           <p className="homepara">We are here to </p>
//         </div>
//       );

//     case "1":
//       return (
//         <>
//           <SuperAdminLogin />
//         </>
//       );
//     case "2":
//       return (
//         <>
//           <FacultyLogin />
//         </>
//       );

//     case "3":
//       return (
//         <>
//           <StudentLogin />
//         </>
//       );

//     case "4":
//       return (
//         <>
//           <SystemAdminLogin />
//         </>
//       );
//   }
// };

const RenderParagraphs = () => {
  const paragraphs = [
    "Say goodbye to manual tracking ",
    "With our automated attendance system",
    " Streamline the process, eliminate errors",
    "Save valuable time for teachers and administrators.",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % paragraphs.length);
    }, 2500); // Adjust the delay (in milliseconds) between each rendering

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div>
      <p className="homeparanew">{paragraphs[currentIndex]}</p>
    </div>
  );
};

const Header = () => {
  return (
    <>
      <div className="aboveNavbar"></div>

      <Navbar />
    </>
  );
};

const Body = () => {
  return (
    <>
      <div className="homeheading" id="homeheadingid">
        {/* <img src={require("../student.jpg")} /> */}

        <h1 className="homeContent"></h1>

        <p className="homepara">We are here to </p>
        <p className="homeparanew">
          <RenderParagraphs />
        </p>
        <div className="swiperImage">
          <Swiper
            spaceBetween={10}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            <SwiperSlide id="i1"></SwiperSlide>
            <SwiperSlide id="i2"></SwiperSlide>

            <SwiperSlide id="i4"></SwiperSlide>
          </Swiper>
        </div>
      </div>

      <div className="feeling" id="feelingid">
        <div className="feelingimage">
          <img src="iupk/a.jpeg" />
        </div>
        <div className="feelingcontent">
          <h1
            className="functionality-header"
            style={{
              fontSize: 40 + "px",
              paddingLeft: 10 + "px",
              paddingTop: 5 + "px",
              color: "white",
              display: "flex",

              justifyContent: "center",
            }}
          >
            Functions
          </h1>
          <ul className="functionality-list">
            <li className="functionality-item">
              <span className="functionality-icon">&#10000;</span>
              Enables faculties to record attendance.
            </li>
            <li className="functionality-item">
              <span className="functionality-icon">&#10000;</span>
              Allows new students to register semester-wise.
            </li>
            <li className="functionality-item">
              <span className="functionality-icon">&#10000;</span>
              Enables uploading, editing, and deletion of syllabus schemes.
            </li>
            <li className="functionality-item">
              <span className="functionality-icon">&#10000;</span>
              Allows uploading and editing of timetables.
            </li>
            <li className="functionality-item">
              <span className="functionality-icon">&#10000;</span>
              Allows students to view the status of their attendance for
              different subjects.
            </li>
            <li className="functionality-item">
              <span className="functionality-icon">&#10000;</span>
              Allows faculties to view the past attendance records of students
              for their class.
            </li>
            <li className="functionality-item">
              <span className="functionality-icon">&#10000;</span>
              Generates attendance reports, providing both subject-wise and
              month-wise summaries.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

const Footer = () => {
  return (
    <div
      className="happen"
      id="aboutusid"
      style={{
        background: "black",
        height: 300 + "px",
        width: 100 + "%",
      }}
    >
      <div className="aboutcontainer">
        <h4
          className="aboutheading"
          style={{
            color: "white",
            fontStyle: "none",
            textDecorationStyle: "none",
          }}
        >
          About Us
        </h4>
        <p className="aboutpara" style={{ color: "white" }}>
          We are a group of Computer Science students. With our programming
          knowledge and a shared passion for innovation, we are committed to
          developing an integrated solution that streamlines administrative
          tasks and enhances communication. We believe in the power of
          technology to transform lives and make a positive impact in the world.
          Thank you for choosing us. We look forward to serving you and
          exceeding your expectations.
        </p>

        <a
          href="https://www.rtu.ac.in/index"
          style={{ color: "white", textDecoration: "none" }}
        >
          <span>&#128279;</span>
          https://www.rtu.ac.in/index/
        </a>

        <a
          href="https://www.google.com/maps/place/Rajasthan+Technical+University,+Akelgarh,+Kota,+Rajasthan/@25.1413055,75.792375,14z/data=!4m16!1m9!3m8!1s0x396f835f077c3ccb:0x4bb166c16c662eea!2sRajasthan+Technical+University,+Akelgarh,+Kota,+Rajasthan!3b1!8m2!3d25.1413055!4d75.8040022!10e5!16s%2Fg%2F1jky_mcdc!3m5!1s0x396f835f077c3ccb:0x4bb166c16c662eea!8m2!3d25.1413055!4d75.8040022!16s%2Fg%2F1jky_mcdc?entry=ttu"
          style={{ color: "white", textDecoration: "none" }}
        >
          <i class="material-icons">&#xe55f;</i>
          Rajasthan Technical University, Rawatbhata Road, Kota - 324010
        </a>
      </div>
    </div>
  );
};

function Home() {
  // const { lost } = props;
  // console.log(lost);
  return (
    <>
      <div className="HomeBlock">
        <Header />
        <Body />
        <Footer />
      </div>
    </>
  );
}

export default Home;
