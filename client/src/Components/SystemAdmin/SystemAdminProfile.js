import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import SemesterRegistration from "./SemesterRegistration";
import "./Styles.css";

const EditProfile = ({
  step,
  faculty,
  setEdit,
  edit,
  handleInputChange,
  handleSubmit,
}) => {
  console.log(step);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmitAchievement = async (e) => {
    e.preventDefault();

    console.log(faculty.email, title, description);

    const res = await fetch("/faculty-achievements", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: faculty.email,
        achievements: [{ title: title, description: description }],
      }),
    });
  };

  switch (step) {
    case 1:
      return (
        <>
          <div className="editpersonalInformation">
            <button onClick={() => setEdit(!edit)}>
              <span className="editprofilebutton">&#10000;</span>
            </button>
            <label className="dataBlock">
              Phone No:
              <input
                type="text"
                name="phoneNo"
                className="editprofileinput"
                placeholder={faculty.phoneNo}
                onChange={handleInputChange}
                value={faculty.phoneNo}
              ></input>
            </label>
            <label className="dataBlock">
              Qualification:
              <input
                type="text"
                name="Qualification"
                className="editprofileinput"
                placeholder={faculty.Qualification}
                onChange={handleInputChange}
                value={faculty.Qualification}
              ></input>
            </label>
            <label className="dataBlock">
              Designation:
              <input
                type="text"
                name="Designation"
                className="editprofileinput"
                // placeholder={faculty.gender}
                onChange={handleInputChange}
                value={faculty.Designation}
              ></input>
            </label>
            <label className="dataBlock">
              Expertise:
              <input
                type="text"
                name="Expertise"
                className="editprofileinput"
                // placeholder={faculty.nationality}
                onChange={handleInputChange}
                value={faculty.Expertise}
              ></input>
            </label>
            <button
              type="submit"
              className="facultySubmit"
              onClick={handleSubmit}
            >
              Change
            </button>
          </div>
        </>
      );
  }
};

const Steps = ({ step, facultyData, setEdit, edit }) => {
  switch (step) {
    case 1:
      return (
        <>
          <div className="personalInformation">
            <button onClick={() => setEdit(!edit)}>
              <span className="editprofilebutton">&#10000;</span>
            </button>
            {/* <h5 className="dataBlock">
             Faculty's Name: <span> {facultyData.name}</span>
           </h5>
           <h5 className="dataBlock">
             Email: <span> {facultyData.email}</span>
           </h5> */}
            <h5 className="dataBlock">
              Phone No: <span>{facultyData.phoneNo}</span>
            </h5>
            <h5 className="dataBlock">
              Qualification: <span>{facultyData.Qualification}</span>
            </h5>
            <h5 className="dataBlock">
              Designation: <span>{facultyData.Designation}</span>
            </h5>
            <h5 className="dataBlock">
              Expertise: <span> {facultyData.Expertise}</span>
            </h5>
            {/* <h5 className="dataBlock">
             Pincode: <span>{facultyData.pinCode}</span>
           </h5> */}
          </div>
        </>
      );

    case 2:
      return (
        <>
          <div className="AchievementsCardsBlock">
            <button onClick={() => setEdit(!edit)}>
              <span className="editprofilebutton">&#10000;</span>
            </button>
            {facultyData ? (
              facultyData.achievements.map((element) => {
                return (
                  <div className="AchievementsCards">
                    <h1>{element.title}</h1>
                    <h5>{element.description}</h5>
                  </div>
                );
              })
            ) : (
              <h1>Loading</h1>
            )}

            <div className="AchievementsCards"></div>
            <div className="AchievementsCards"></div>
          </div>
        </>
      );

    case 3:
      return (
        <>
          <div className="AcademicQualification">
            <h5 className="dataBlock">
              Phd.: <span>{facultyData.phoneNo}</span>
            </h5>

            <h5 className="dataBlock">
              Post Graduation: <span>{facultyData.phoneNo}</span>
            </h5>
            <h5 className="dataBlock">
              Graduation: <span>{facultyData.phoneNo}</span>
            </h5>
          </div>
        </>
      );
  }
};

const EditBasicDetial = ({ handleInputChange, faculty, handleSubmit }) => {
  return (
    <>
      <label className="dataBlock">
        Name:
        <input
          type="text"
          name="name"
          className="editprofileinput"
          // placeholder={faculty.fathersName}
          value={faculty.name}
          onChange={handleInputChange}
        ></input>
      </label>
      <label className="dataBlock">
        Email:
        <input
          type="text"
          name="email"
          className="editprofileinput"
          // placeholder={faculty.fathersName}
          value={faculty.email}
          onChange={handleInputChange}
        ></input>
      </label>
      <button className="facultySubmit" onClick={handleSubmit}>
        Change
      </button>
    </>
  );
};

//middleware

// const navigate = useNavigate();

// const callMiddleware = async () => {
//   try {
//     const res = await fetch("/m1", {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       credentials: "include",
//     });
//     const data = await res.json();
//     console.log(data);

//     if (!res.status === 200) {
//       const error = new Error(res.error);
//       throw error;
//     }
//   } catch (err) {
//     console.log(err);
//     navigate("/Student/StudentLogin");
//   }
// };

// useEffect(() => {
//   callMiddleware();
// }, []);

function FacultyProfile({ ansData }) {
  const [markStep, setMarkStep] = useState(0);
  const [step, setStep] = useState(1);
  const [edit, setEdit] = useState(false);
  const [editBasicDetails, setEditBasicDetails] = useState(false);

  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  const [faculty, setfaculty] = useState({
    name: "",
    email: "",
    phoneNo: "",
    Qualification: "",
    Designation: "",
    Expertise: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [facultyData, setfacultyData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    Qualification: "",
    Designation: "",
    Expertise: "",
    qualificationData: [],
    achievements: [],
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setfaculty({ ...faculty, [name]: value });
    console.log(faculty);
  };

  const handleEditProfileClick = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("faculty details change :", faculty);
    const res = await fetch("/profile/systemadmin/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faculty),
    });

    const data = await res.json();
    if (data.message === "Your details updated successfully") {
      window.alert("Fields changed successfully");
      console.log("Fields changed successfully");
    } else {
      window.alert("Failed to change fields");
      console.log("Failed to change fields");
    }
  };

  const getProfileData = async (ansData) => {
    setIsLoading(true);

    // Assuming the following line is not required anymore and can be removed:
    // document.querySelector("#facultyProfileButton").addEventListener("click", () => {
    //   document.querySelector("#profileContaienrid").classList.add("myClass");
    // });

    console.log(ansData);

    setfacultyData({
      name: ansData.name,
      email: ansData.email,
      phoneNo: ansData.phoneNo,
      Qualification: ansData.Qualification,
      Designation: ansData.Designation,
      Expertise: ansData.Expertise,
      achievements: ansData.achievements,
      qualificationData: ansData.qualificationData,
    });
    // setfaculty(facultyData);

    setIsLoading(false);
  };

  useEffect(() => {
    setfaculty(facultyData);
  }, [facultyData]);

  useEffect(() => {
    getProfileData(ansData);
  }, []);

  // middleware
  // const navigate = useNavigate();

  // const callMiddleware = async () => {
  //   try {
  //     const res = await fetch("/m2", {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //     });
  //     const data = await res.json();
  //     console.log(data);

  //     if (!res.status === 200) {
  //       const error = new Error(res.error);
  //       throw error;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     navigate("/Faculty/FacultyLogin");
  //   }
  // };

  // useEffect(() => {
  //   callMiddleware();
  // }, []);

  return (
    <>
      <div className="systemAdminProfileOutermost">
        <div className="newProfileContainer systemAdminProfile">
          <div className="tabs">
            <p>
              <button
                type="button"
                className="profileContentButton"
                onClick={() => {
                  setStep(1);
                }}
              >
                Personal
              </button>

              <button
                type="button"
                className="profileContentButton"
                onClick={() => {
                  setStep(3);
                }}
              >
                Academic Qualification
              </button>
            </p>

            <span className="utilityButtonspan">
              <button
                className="utilityButton back"
                onClick={() => setStep((step) => (step > 1 ? step - 1 : 1))}
              >
                Back
              </button>

              <button
                className="utilityButton next"
                onClick={() => setStep((step) => (step < 4 ? step + 1 : 4))}
              >
                Next
              </button>
              <button
                className="utilityButton home"
                onClick={() => window.location.reload()}
              >
                Home
              </button>
            </span>
          </div>

          <div className="BasicDetails">
            {editBasicDetails ? (
              <EditBasicDetial
                handleInputChange={handleInputChange}
                faculty={faculty}
                handleSubmit={handleSubmit}
              />
            ) : (
              <>
                <p style={{ fontSize: 1.7 + "em" }}>
                  Name:{" "}
                  <span style={{ color: "white" }}>{facultyData.name}</span>
                </p>
                <p style={{ fontSize: 1.2 + "em" }}>
                  Email:{" "}
                  <span style={{ color: "white" }}>{facultyData.email}</span>
                </p>
              </>
            )}
          </div>
          {edit ? (
            <EditProfile
              step={step}
              faculty={faculty}
              setEdit={setEdit}
              edit={edit}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            <Steps
              step={step}
              facultyData={facultyData}
              setEdit={setEdit}
              edit={edit}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default FacultyProfile;
