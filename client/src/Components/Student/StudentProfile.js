import React, { useEffect, useState } from "react";
import "./Student.css";
import { useNavigate } from "react-router-dom";

export let rollName;



const Header = () => {
  return <></>;
};

const Body = ({ ansData }) => {
  const [isEditProfileVisible, setIsEditProfileVisible] = useState(false);
  const [isProfileVisible, setIsProfileVisible] = useState(true);

  const [student, setStudent] = useState({
    name: "",
    email: "",
    fathersName: "",
    mothersName: "",
    gender: "",
    nationality: "",
    domicile: "",
    address: "",
    coaddress: "",
    pinCode: "",
    aadhaarNo: "",
    phoneNo: "",
    sociallyChallenged: "",
    economicallyBackward: "",
    year: "",
    semester: "",
    branch: "",
    section: "",
    batch: "",
    rollNo: "",
    enRollNo: "",
    jeeRank: "",
    reapRank: "",
    other: "",
    feeWaiver: "",
    accHolder: "",
    accountNo: "",
    ifsc: "",
    bankBranch: "",
    branchAddress: "",
    feeStatus: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [studentData, setStudentData] = useState({
    name: "",
    email: "",
    fathersName: "",
    mothersName: "",
    gender: "",
    nationality: "",
    domicile: "",
    address: "",
    coaddress: "",
    pinCode: "",
    aadhaarNo: "",
    phoneNo: "",
    sociallyChallenged: "",
    economicallyBackward: "",
    year: "",
    semester: "",
    branch: "",
    section: "",
    batch: "",
    rollNo: "",
    enRollNo: "",
    jeeRank: "",
    reapRank: "",
    other: "",
    feeWaiver: "",
    accHolder: "",
    accountNo: "",
    ifsc: "",
    bankBranch: "",
    branchAddress: "",
    feeStatus: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleEditProfileClick = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, phoneNo, email } = student;

    const res = await fetch("/profile/student/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phoneNo }),
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
    // document.querySelector("#studentProfileButton").addEventListener("click", () => {
    //   document.querySelector("#profileContaienrid").classList.add("myClass");
    // });

    console.log(ansData);

    setStudentData({
      name: ansData.name,
      email: ansData.email,
      fathersName: ansData.fathersName,
      mothersName: ansData.mothersName,
      gender: ansData.gender,

      rollNo: ansData.rollNo,
      enRollNo: ansData.enRollNo,

      phoneNo: ansData.phoneNo,
      address: ansData.address,
      year: ansData.year,
      semester: ansData.semester,
      branch: ansData.branch,
      section: ansData.section,
      batch: ansData.batch,
      jeeRank: ansData.jeeRank,
      reapRank: ansData.reapRank,
      other: ansData.other,
      accHolder: ansData.accHolder,
      accountNo: ansData.aadhaarNo,
      ifsc: ansData.ifsc,
      bankBranch: ansData.bankBranch,
      branchAddress: ansData.branchAddress,
      challanNo: ansData.challanNo,
    });

    rollName = ansData.name;
    console.log(rollName);

    setIsLoading(false);
  };

  useEffect(() => {
    getProfileData(ansData);
  }, []);

  return (
    <>
      <div className="profileContainer" id="profileContaienrid">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {isProfileVisible ? (
              <div className="profileInfo">
                <h2>{studentData.name}</h2>
                <p>Email: {studentData.email}</p>
                <p>rollNo: {studentData.rollNo}</p>
                <p>enRollNo: {studentData.enRollNo}</p>
                <p>address: {studentData.address}</p>
                <p>year: {studentData.year}</p>
                <p>semester: {studentData.semester}</p>
                <p>branch: {studentData.branch}</p>
                <p>section: {studentData.section}</p>
                <p>batch: {studentData.batch}</p>
              </div>
            ) : (
              <form
                method="POST"
                className="StudentProfileforum"
                id="studentEditForum"
                onSubmit={handleSubmit}
              >
                <div className="NameContainer">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder={studentData.name}
                    value={student.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="EmailContainer">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    autoComplete=""
                    placeholder="College mail id"
                    value={studentData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="phoneNo">
                  <label htmlFor="phoneNo">phoneNo</label>
                  <input
                    type="text"
                    name="phoneNo"
                    id="phoneNo"
                    placeholder={studentData.phoneNo}
                    value={student.phoneNo}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="rollNoContainer">
                  <label htmlFor="rollNo">RollNo</label>
                  <input
                    type="text"
                    name="rollNo"
                    id="rollNo"
                    placeholder="rollNo"
                    value={student.rollNo}
                    onChange={handleInputChange}
                  ></input>
                </div>

                <div className="universityRollNoContainer">
                  <label htmlFor="universityRollNo">Enrollment RollNo</label>
                  <input
                    type="text"
                    name="universityRollNo"
                    id="universityRollNo"
                    placeholder="Enrollment RollNo"
                    value={student.universityRollNo}
                    onChange={handleInputChange}
                  ></input>
                </div>

                <div className="address">
                  <label htmlFor="address">address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="address"
                    value={student.address}
                    onChange={handleInputChange}
                  ></input>
                </div>

                <div className="yearContainer">
                  <label htmlFor="year">year</label>
                  <select
                    name="year"
                    id="year"
                    onChange={handleInputChange}
                    value={student.year}
                    defaultValue={""}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>

                <div className="SemestorContainer">
                  <label htmlFor="semester">semester</label>
                  <select
                    name="semester"
                    id="semester"
                    value={student.semester}
                    onChange={handleInputChange}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>

                <div className="branchContainer">
                  <label htmlFor="branch">branch</label>
                  <input
                    type="text"
                    name="branch"
                    id="branch"
                    placeholder="branch"
                    value={student.branch}
                    onChange={handleInputChange}
                  ></input>
                </div>

                <div className="sectionContainer">
                  <label htmlFor="section">section</label>
                  <input
                    type="text"
                    name="section"
                    id="section"
                    value={student.section}
                    onChange={handleInputChange}
                    placeholder="section"
                  ></input>
                </div>

                <div className="batchContainer">
                  <label htmlFor="batch">batch</label>
                  <input
                    type="text"
                    name="batch"
                    id="batch"
                    placeholder="batch"
                    value={student.batch}
                    onChange={handleInputChange}
                  ></input>
                </div>

                <div className="challanNoContainer">
                  <label htmlFor="challanNo">challanNo</label>
                  <input
                    type="text"
                    name="challanNo"
                    id="challanNo"
                    placeholder="challanNo"
                    value={student.challanNo}
                    onChange={handleInputChange}
                  ></input>
                </div>

                <button type="submit" className="StudentSubmit">
                  Change
                </button>
              </form>
            )}
            {isProfileVisible ? (
              <button id="editProfileid" onClick={handleEditProfileClick}>
                Edit Profile
              </button>
            ) : (
              <button id="editProfileid" onClick={handleEditProfileClick}>
                Back to Profile
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
};

const Footer = () => {
  return <></>;
};

const StudentProfile = ({ props }) => {

  //middleware

const navigate = useNavigate();

const callMiddleware = async () => {
  try {
    const res = await fetch("/m1", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);

    if (!res.status === 200) {
      const error = new Error(res.error);
      throw error;
    }
  } catch (err) {
    console.log(err);
    navigate("/Student/StudentLogin");
  }
};

useEffect(() => {
  callMiddleware();
}, []);
  console.log(props);

  return (
    <>
      <Header />
      <Body ansData={props} />
      <Footer />
    </>
  );
};

export default StudentProfile;
