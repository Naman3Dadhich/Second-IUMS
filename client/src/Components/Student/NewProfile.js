import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SemesterRegistration from "./SemesterRegistration";

const EditProfile = ({
  step,
  student,
  setEdit,
  edit,
  handleInputChange,
  handleSubmit,
}) => {
  console.log(step);

  switch (step) {
    case 1:
      return (
        <>
          <div className="editpersonalInformation">
            <button onClick={() => setEdit(!edit)}>
              <span className="editprofilebutton">Back</span>
            </button>
            <label className="dataBlock">
              Father's Name:
              <input
                type="text"
                className="editprofileinput"
                name="fathersName"
                // placeholder={student.fathersName}
                onChange={handleInputChange}
                value={student.fathersName}
              />
            </label>
            <label className="dataBlock">
              Mother's Name:
              <input
                type="text"
                name="mothersName"
                className="editprofileinput"
                // placeholder={student.mothersName}
                onChange={handleInputChange}
                value={student.mothersName}
              ></input>
            </label>
            <label className="dataBlock">
              Phone No:
              <input
                type="text"
                name="phoneNo"
                className="editprofileinput"
                // placeholder={student.phoneNo}
                onChange={handleInputChange}
                value={student.phoneNo}
              ></input>
            </label>
            <label className="dataBlock">
              Address:
              <input
                type="text"
                name="address"
                className="editprofileinput"
                // placeholder={student.address}
                onChange={handleInputChange}
                value={student.address}
              ></input>
            </label>
            <label className="dataBlock">
              gender:
              <input
                type="text"
                name="gender"
                className="editprofileinput"
                // placeholder={student.gender}
                onChange={handleInputChange}
                value={student.gender}
              ></input>
            </label>
            <label className="dataBlock">
              Nationality:
              <input
                type="text"
                name="nationality"
                className="editprofileinput"
                // placeholder={student.nationality}
                onChange={handleInputChange}
                value={student.nationality}
              ></input>
            </label>
            <label className="dataBlock">
              Pincode:
              <input
                type="text"
                name="pinCode"
                className="editprofileinput"
                // placeholder={student.pinCode}
                onChange={handleInputChange}
                value={student.pinCode}
              ></input>
            </label>
            <label className="dataBlock">
              Aadhaar No:
              <input
                type="text"
                name="pinCode"
                className="editprofileinput"
                // placeholder={student.pinCode}
                onChange={handleInputChange}
                value={student.aadhaarNo}
              ></input>
            </label>
            <label className="dataBlock">
              Socially Challenged:
              <input
                type="text"
                name="pinCode"
                className="editprofileinput"
                // placeholder={student.pinCode}
                onChange={handleInputChange}
                value={student.sociallyChallenged}
              ></input>
            </label>
            <label className="dataBlock">
              Economically Backward:
              <input
                type="text"
                name="pinCode"
                className="editprofileinput"
                // placeholder={student.pinCode}
                onChange={handleInputChange}
                value={student.economicallyBackward}
              ></input>
            </label>
            <button
              type="submit"
              className="StudentSubmit"
              onClick={handleSubmit}
            >
              Change
            </button>
          </div>
        </>
      );

    case 2:
      return (
        <>
          <div className="editacademicInformation">
            <button onClick={() => setEdit(!edit)}>
              <span className="editprofilebutton">Back</span>
            </button>
            <label className="dataBlock">
              Year:{" "}
              <input
                type="text"
                name="year"
                // placeholder="student.year"

                value={student.year}
              ></input>
            </label>
            <label className="dataBlock">
              Semester:
              <input
                type="text"
                name="semester"
                // placeholder="{student.semester}"

                value={student.semester}
              ></input>
            </label>
            <label className="dataBlock">
              Branch:{" "}
              <input
                type="text"
                name="branch"
                // placeholder="{student.branch}"
                onChange={handleInputChange}
                value={student.branch}
              ></input>
            </label>
            <label className="dataBlock">
              Section:
              <input
                type="text"
                name="section"
                // placeholder="{student.section}"
                onChange={handleInputChange}
                value={student.section}
              ></input>
            </label>
            <label className="dataBlock">
              Batch:{" "}
              <input
                type="text"
                name="batch"
                // placeholder="{student.batch}"
                onChange={handleInputChange}
                value={student.batch}
              ></input>
            </label>
            <label className="dataBlock">
              Roll No.:
              <input
                type="text"
                name="rollNo"
                // placeholder="{student.rollNo}"
                onChange={handleInputChange}
                value={student.rollNo}
              ></input>
            </label>
            <label className="dataBlock">
              Enroll. No.:
              <input
                type="text"
                name="enRollNo"
                // placeholder="{student.enRollNo}"
                onChange={handleInputChange}
                value={student.enRollNo}
              ></input>
            </label>
            <label className="dataBlock">
              jeeRank:
              <input
                type="text"
                name="enRollNo"
                // placeholder="{student.enRollNo}"
                onChange={handleInputChange}
                value={student.jeeRank}
              ></input>
            </label>
            <label className="dataBlock">
              reapRank:
              <input
                type="text"
                name="enRollNo"
                // placeholder="{student.enRollNo}"
                onChange={handleInputChange}
                value={student.reapRank}
              ></input>
            </label>
            <label className="dataBlock">
              other:
              <input
                type="text"
                name="enRollNo"
                // placeholder="{student.enRollNo}"
                onChange={handleInputChange}
                value={student.other}
              ></input>
            </label>
            <label className="dataBlock">
              TFWS:
              <input
                type="text"
                name="enRollNo"
                // placeholder="{student.enRollNo}"
                onChange={handleInputChange}
                value={student.feeWaiver}
              ></input>
            </label>

            <button
              type="submit"
              className="StudentSubmit"
              onClick={handleSubmit}
            >
              Change
            </button>
          </div>
        </>
      );

    case 3:
      return (
        <>
          <div className="editbankInformation">
            <button onClick={() => setEdit(!edit)}>
              <span className="editprofilebutton">Back</span>
            </button>
            <label className="dataBlock">
              Account Holder:{" "}
              <input
                type="text"
                name="accHolder"
                // placeholder="{student.accHolder}"
                onChange={handleInputChange}
                value={student.accHolder}
              ></input>
            </label>
            <label className="dataBlock">
              Account No:
              <input
                type="text"
                name="accountNo"
                // placeholder="{student.accHolder}"
                onChange={handleInputChange}
                value={student.accountNo}
              ></input>
            </label>
            <label className="dataBlock">
              IFSC :{" "}
              <input
                type="text"
                name="ifsc"
                // placeholder="{student.ifsc}"
                onChange={handleInputChange}
                value={student.ifsc}
              ></input>
            </label>
            <label className="dataBlock">
              Bank Branch:{" "}
              <input
                type="text"
                name="bankBranch"
                // placeholder="{student.bankBranch}"
                onChange={handleInputChange}
                value={student.bankBranch}
              ></input>
            </label>
            <label className="dataBlock">
              Branch Address:{" "}
              <input
                type="text"
                name="branchAddress"
                // placeholder="{student.branchAddress}"
                onChange={handleInputChange}
                value={student.branchAddress}
              ></input>
            </label>
            <button
              type="submit"
              className="StudentSubmit"
              onClick={handleSubmit}
            >
              Change
            </button>
          </div>
        </>
      );

    case 4:
      return (
        <>
          <div className="editfeeStatus">
            <button onClick={() => setEdit(!edit)}>
              <span className="editprofilebutton">Back</span>
            </button>
            <label className="dataBlock">
              Challan No.:
              <input
                type="text"
                name="challanNo"
                // placeholder="{student.challanNo}"
                // onChange={handleInputChange}
                value={student.challanNo}
              ></input>
            </label>
            <button
              type="submit"
              className="StudentSubmit"
              onClick={handleSubmit}
            >
              Change
            </button>
          </div>
        </>
      );
  }
};

const Steps = ({ step, studentData, setEdit, edit }) => {
  const [semRegistrationData, setSemRegistrationData] = useState([0]);

  useEffect(() => {
    setSemRegistrationData(studentData.semRegistration);
    console.log(studentData.semRegistration);
    console.log(semRegistrationData);
  }, [studentData]);

  switch (step) {
    case 1:
      return (
        <>
          <h3>Personal Details</h3>
          <div className="personalInformation">
            <button onClick={() => setEdit(!edit)}>
              <span className="editprofilebutton">&#10000;</span>
            </button>
            <h5 className="dataBlock">
              Father's Name: <span> {studentData.fathersName}</span>
            </h5>
            <h5 className="dataBlock">
              Mother's Name: <span> {studentData.mothersName}</span>
            </h5>
            <h5 className="dataBlock">
              Phone No: <span>{studentData.phoneNo}</span>
            </h5>
            <h5 className="dataBlock">
              Address: <span>{studentData.address}</span>
            </h5>
            <h5 className="dataBlock">
              Gender: <span>{studentData.gender}</span>
            </h5>
            <h5 className="dataBlock">
              Nationality: <span>{studentData.nationality}</span>
            </h5>
            <h5 className="dataBlock">
              Pincode: <span>{studentData.pinCode}</span>
            </h5>
          </div>
        </>
      );

    case 2:
      return (
        <>
          <h3>Academic Details</h3>
          <div className="academicInfomation">
            <button onClick={() => setEdit(!edit)}>
              <span className="editprofilebutton">&#10000;</span>
            </button>
            <h5 className="dataBlock">
              Year: <span>{studentData.year}</span>
            </h5>
            <h5 className="dataBlock">
              Semester: <span>{studentData.semester}</span>
            </h5>
            <h5 className="dataBlock">
              Branch: <span>{studentData.branch}</span>
            </h5>
            <h5 className="dataBlock">
              Section: <span>{studentData.section}</span>
            </h5>
            <h5 className="dataBlock">
              Batch: <span>{studentData.batch}</span>
            </h5>
            <h5 className="dataBlock">
              Roll No.: <span>{studentData.rollNo}</span>
            </h5>
            <h5 className="dataBlock">
              Enroll. No.: <span>{studentData.enRollNo}</span>
            </h5>
          </div>
        </>
      );

    case 3:
      return (
        <>
          <h3>Bank Details</h3>
          <div className="bankInformation">
            <button onClick={() => setEdit(!edit)}>
              <span className="editprofilebutton">&#10000;</span>
            </button>
            <h5 className="dataBlock">
              Account Holder: <span>{studentData.accHolder}</span>
            </h5>
            <h5 className="dataBlock">
              Account No: <span>{studentData.accountNo}</span>
            </h5>
            <h5 className="dataBlock">
              IFSC : <span>{studentData.ifsc}</span>
            </h5>
            <h5 className="dataBlock">
              Bank Branch: <span>{studentData.bankBranch}</span>
            </h5>
            <h5 className="dataBlock">
              Branch Address: <span>{studentData.branchAddress}</span>
            </h5>
          </div>
        </>
      );

    case 4:
      return (
        <>
          <h3>Fee Verification</h3>
          <div className="feeStatus">
            <button onClick={() => setEdit(!edit)}>
              <span className="editprofilebutton">&#10000;</span>
            </button>
            <h5 className="dataBlock">
              Challan No.:
              <h6>
                If Not Registered for This Semester , Register Through Semester
                Registration
              </h6>
            </h5>
            {semRegistrationData !== 0 ? (
              <SemesterRegistration
                semRegistration={semRegistrationData}
                email={studentData.email}
              />
            ) : (
              <h3>Loading.....</h3>
            )}
          </div>
        </>
      );
  }
};

const EditBasicDetial = ({ handleInputChange, student, handleSubmit }) => {
  return (
    <>
      <label className="dataBlock">
        Name:
        <input
          type="text"
          name="name"
          className="editprofileinput"
          // placeholder={student.fathersName}
          value={student.name}
          onChange={handleInputChange}
        ></input>
      </label>
      <label className="dataBlock">
        Email:
        <input
          type="text"
          name="email"
          className="editprofileinput"
          // placeholder={student.fathersName}
          value={student.email}
          onChange={handleInputChange}
        ></input>
      </label>
      <button className="StudentSubmit" onClick={handleSubmit}>
        Change
      </button>
    </>
  );
};

function NewProfile({ ansData }) {
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

  const [step, setStep] = useState(1);
  const [edit, setEdit] = useState(false);
  const [editBasicDetails, setEditBasicDetails] = useState(false);

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
    academicProgress: [],
    semRegistration: [],
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
    academicProgress: [],
    semRegistration: [],
  });

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
    console.log(student);
  };

  const handleEditProfileClick = () => {
    setIsProfileVisible(!isProfileVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(student);
    const res = await fetch("/profile/student/edit", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
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
      nationality: ansData.nationality,
      rollNo: ansData.rollNo,
      enRollNo: ansData.enRollNo,

      phoneNo: ansData.phoneNo,
      address: ansData.address,
      year: ansData.year,
      pinCode: ansData.pinCode,
      semester: ansData.semester,
      branch: ansData.branch,
      section: ansData.section,
      batch: ansData.batch,
      jeeRank: ansData.jeeRank,
      reapRank: ansData.reapRank,
      other: ansData.other,

      accHolder: ansData.accHolder,
      accountNo: ansData.accountNo,
      ifsc: ansData.ifsc,
      bankBranch: ansData.bankBranch,
      branchAddress: ansData.branchAddress,
      challanNo: ansData.feeStatus,
      academicProgress: ansData.academicProgress,
      semRegistration: ansData.semRegistration,
    });
    // setStudent(studentData);

    setIsLoading(false);
  };

  useEffect(() => {
    setStudent(studentData);
  }, [studentData]);

  useEffect(() => {
    getProfileData(ansData);
  }, []);

  return (
    <>
      <div className="newProfileContainer">
        <div className="tabs">
          <p>
            <button className="profileContentButton" onClick={() => setStep(1)}>
              Personal Details
            </button>
          </p>

          <p>
            <button className="profileContentButton" onClick={() => setStep(2)}>
              Academic Details
            </button>
          </p>
          <p>
            <button className="profileContentButton" onClick={() => setStep(3)}>
              Bank Details
            </button>
          </p>
          <p>
            <button className="profileContentButton" onClick={() => setStep(4)}>
              Fee Status
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
              onClick={() => (window.location.href = "/Student/StudentHome")}
            >
              Home
            </button>
          </span>
        </div>

        <div>
          <div className="BasicDetails">
            {editBasicDetails ? (
              <>
                <button onClick={() => setEditBasicDetails(!editBasicDetails)}>
                  <span className="editprofilebutton">Back</span>
                </button>
                <EditBasicDetial
                  handleInputChange={handleInputChange}
                  student={student}
                  handleSubmit={handleSubmit}
                />
              </>
            ) : (
              <>
                <button onClick={() => setEditBasicDetails(!editBasicDetails)}>
                  <span className="editprofilebutton">&#10000;</span>
                </button>
                <p style={{ fontSize: 1.7 + "em" }}>
                  <span className="basicDetailsFont">
                    {" "}
                    Name: {studentData.name}
                  </span>
                </p>
                <p style={{ fontSize: 1.2 + "em" }}>
                  <span className="basicDetailsFont">
                    {" "}
                    Email: {studentData.email}
                  </span>
                  <span style={{ marginLeft: 2 + "em" }}>
                    Roll: {"  "} {studentData.rollNo}{" "}
                  </span>
                </p>
              </>
            )}
          </div>
          {edit ? (
            <EditProfile
              step={step}
              student={student}
              setEdit={setEdit}
              edit={edit}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          ) : (
            <Steps
              step={step}
              studentData={studentData}
              setEdit={setEdit}
              edit={edit}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default NewProfile;
